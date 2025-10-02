document.addEventListener("DOMContentLoaded", () => {
    // --- Block A: Element Hooks ---
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const clearAllBtn = document.getElementById("clear-all-btn");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cityInput = document.getElementById("city-input");
    const searchWeatherBtn = document.getElementById("search-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const themeToggle = document.getElementById("theme-toggle");
    const yearSpan = document.getElementById("year");

    // --- Block B: Data Store ---
    let tasks = [];
    let currentFilter = "all";
    let weatherSearchTimeout = null;

    // --- Block B2: Local Storage Functions ---
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    }

    // --- Block C: Service Configuration ---
    const weatherApiKey = "YOUR_API_KEY_HERE";
    const DEBOUNCE_DELAY = 500; // 500ms delay

    // --- Block D: Utility Functions ---
    function debounce(func, delay) {
        return function (...args) {
            clearTimeout(weatherSearchTimeout);
            weatherSearchTimeout = setTimeout(
                () => func.apply(this, args),
                delay,
            );
        };
    }

    // --- Block E: Module 1 Functions (Task Management) ---
    function createTaskElement(task, index) {
        const li = document.createElement("li");
        li.className = "task-item";
        li.dataset.index = index;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.dataset.action = "toggle";

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add("completed");
        }
        taskText.dataset.action = "edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "🗑️";
        deleteBtn.dataset.action = "delete";

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        return li;
    }

    function renderTasks() {
        taskList.innerHTML = "";

        // Apply current filter
        const filteredTasks = tasks.filter((task) => {
            if (currentFilter === "active") return !task.completed;
            if (currentFilter === "completed") return task.completed;
            return true; // "all"
        });

        if (filteredTasks.length === 0) {
            const empty = document.createElement("li");
            empty.className = "task-empty-state";
            empty.setAttribute("aria-live", "polite");

            let emptyMessage;
            if (currentFilter === "active") {
                emptyMessage = "No active tasks — time to add some goals!";
            } else if (currentFilter === "completed") {
                emptyMessage = "No completed tasks yet — get started!";
            } else {
                emptyMessage = "No tasks yet — add one above to get started.";
            }

            empty.textContent = emptyMessage;
            taskList.appendChild(empty);
            return;
        }

        filteredTasks.forEach((task) => {
            const originalIndex = tasks.findIndex((t) => t === task);
            const taskElement = createTaskElement(task, originalIndex);
            taskList.appendChild(taskElement);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;

        const newTask = { text: text, completed: false };
        tasks.push(newTask);
        saveTasks();

        // Optimized rendering: only re-render if new task would be visible
        if (currentFilter === "all" || currentFilter === "active") {
            const emptyState = taskList.querySelector(".task-empty-state");
            if (emptyState) {
                emptyState.remove();
            }

            const newIndex = tasks.length - 1;
            const taskElement = createTaskElement(newTask, newIndex);
            taskList.appendChild(taskElement);
        }

        taskInput.value = "";
    }

    function deleteTask(index) {
        const taskElement = taskList.querySelector(`li[data-index='${index}']`);
        if (taskElement) {
            taskElement.remove();
        }

        tasks.splice(index, 1);
        saveTasks();

        // Show empty state if no tasks remain in current filter
        if (taskList.children.length === 0) {
            renderTasks();
        }
    }

    function clearAllTasks() {
        tasks = [];
        saveTasks();
        renderTasks();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        const taskElement = taskList.querySelector(`li[data-index='${index}']`);

        if (taskElement) {
            // Check if task should be hidden due to current filter
            if (
                (currentFilter === "active" && tasks[index].completed) ||
                (currentFilter === "completed" && !tasks[index].completed)
            ) {
                taskElement.remove();
                // Show empty state if no tasks remain
                if (taskList.children.length === 0) {
                    renderTasks();
                }
            } else {
                // Update visual state in place
                const taskText = taskElement.querySelector("span");
                taskText.classList.toggle("completed", tasks[index].completed);
                const checkbox = taskElement.querySelector(
                    "input[type='checkbox']",
                );
                checkbox.checked = tasks[index].completed;
            }
        }

        saveTasks();
    }

    function enableInlineEdit(index, spanEl) {
        // Prevent multiple edit inputs
        if (spanEl.parentElement.querySelector(".task-edit-input")) return;

        const originalText = tasks[index].text;
        const input = document.createElement("input");
        input.type = "text";
        input.value = originalText;
        input.className = "task-edit-input";
        input.setAttribute("aria-label", "Edit task");

        // Keep layout stable
        input.style.flex = "1 1 auto";
        input.style.padding = "0.25rem 0.5rem";
        input.style.fontSize = "1rem";

        spanEl.replaceWith(input);
        input.focus();
        input.setSelectionRange(0, input.value.length);

        const commit = () => {
            const newText = input.value.trim();
            tasks[index].text = newText || originalText; // revert if empty
            saveTasks();
            renderTasks();
        };

        const cancel = () => {
            renderTasks();
        };

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") cancel();
        });
        input.addEventListener("blur", commit);
    }

    function setFilter(filterType) {
        currentFilter = filterType;

        // Update filter button states
        filterBtns.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.filter === filterType);
        });

        renderTasks();
    }

    // --- Block F: Module 2 Functions (Weather) ---
    async function fetchWeather(city) {
        if (!city || city.trim() === "") {
            weatherInfo.innerHTML =
                '<p class="loading-text">Enter a city name to see the weather...</p>';
            return;
        }

        // Show loading state
        weatherInfo.innerHTML =
            '<p class="loading-text">Loading weather data...</p>';

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${weatherApiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed (${response.status})`);
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error("Weather service call failed:", error);
            weatherInfo.innerHTML =
                '<p class="error-text">Weather data unavailable. Please check the city name and try again.</p>';
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        weatherInfo.innerHTML = `
            <h3>${name}</h3>
            <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon">
            <p>Temperature: ${Math.round(main.temp)}°C</p>
            <p>Condition: ${weather[0].main}</p>
            <p>Description: ${weather[0].description}</p>
        `;
    }

    // Create debounced version of fetchWeather
    const debouncedFetchWeather = debounce(fetchWeather, DEBOUNCE_DELAY);

    function handleWeatherSearch() {
        const city = cityInput.value.trim();
        debouncedFetchWeather(city);
    }

    // --- Block G: Event Registry ---

    // Task management events using event delegation for better performance
    taskList.addEventListener("click", (e) => {
        const action = e.target.dataset.action;
        if (!action) return;

        const li = e.target.closest(".task-item");
        if (!li) return;

        const index = parseInt(li.dataset.index, 10);

        if (action === "delete") {
            deleteTask(index);
        }
    });

    taskList.addEventListener("change", (e) => {
        const action = e.target.dataset.action;
        if (action === "toggle" && e.target.type === "checkbox") {
            const li = e.target.closest(".task-item");
            if (!li) return;

            const index = parseInt(li.dataset.index, 10);
            toggleTaskCompletion(index);
        }
    });

    taskList.addEventListener("dblclick", (e) => {
        const action = e.target.dataset.action;
        if (action === "edit" && e.target.tagName === "SPAN") {
            const li = e.target.closest(".task-item");
            if (!li) return;

            const index = parseInt(li.dataset.index, 10);
            enableInlineEdit(index, e.target);
        }
    });

    // Direct task management events
    addTaskBtn.addEventListener("click", addTask);
    clearAllBtn.addEventListener("click", clearAllTasks);

    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Filter events
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            setFilter(btn.dataset.filter);
        });
    });

    // Weather search events with debouncing
    cityInput.addEventListener("input", handleWeatherSearch);
    searchWeatherBtn.addEventListener("click", () => {
        // Clear any pending debounced calls and search immediately
        clearTimeout(weatherSearchTimeout);
        const city = cityInput.value.trim();
        fetchWeather(city);
    });

    // Allow Enter key to trigger immediate search
    cityInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            clearTimeout(weatherSearchTimeout);
            const city = cityInput.value.trim();
            fetchWeather(city);
        }
    });

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });

    // Navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((navLink) => {
        navLink.addEventListener("click", (e) => {
            navLinks.forEach((allNavLinks) => {
                allNavLinks.classList.remove("active");
            });
            e.currentTarget.classList.add("active");
        });
    });

    // --- Block H: Application Entry Point ---
    function init() {
        loadTasks();
        renderTasks();

        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        // Load default weather for London
        fetchWeather("London");
    }

    init();
});
