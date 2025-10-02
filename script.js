document.addEventListener("DOMContentLoaded", () => {
    // --- Block A: Element Hooks ---
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const clearAllBtn = document.getElementById("clear-all-btn");
    const getLocationBtn = document.getElementById("get-location-btn");
    const weatherInfo = document.getElementById("weather-info");
    const themeToggle = document.getElementById("theme-toggle");
    const yearSpan = document.getElementById("year");

    // --- Block B: Data Store ---
    let tasks = [];

    // --- Block C: Service Configuration ---
    const weatherApiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key

    // --- Block D: Utility Functions ---
    // Removed debounce function - not needed without city search

    // --- Block E: Module 1 Functions (Task Management) ---
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "task-item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () =>
                toggleTaskCompletion(index),
            );

            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add("completed");
            }

            taskText.addEventListener("dblclick", () =>
                enableInlineEdit(index, taskText),
            );

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "🗑️";
            deleteBtn.addEventListener("click", () => deleteTask(index));

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text: text, completed: false });
            renderTasks();
            taskInput.value = "";
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function clearAllTasks() {
        tasks = [];
        renderTasks();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function enableInlineEdit(index, spanEl) {
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

    // --- Block F: Module 2 Functions (Weather) ---
    
    // Function to get user's location and fetch weather
    function getUserLocationWeather() {
        if (navigator.geolocation) {
            weatherInfo.innerHTML = '<p class="loading-text">Getting your location...</p>';
            
            navigator.geolocation.getCurrentPosition(
                // Success callback
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherByCoords(lat, lon);
                },
                // Error callback
                (error) => {
                    handleLocationError(error);
                }
            );
        } else {
            weatherInfo.innerHTML = '<p class="error-text">Geolocation is not supported by your browser.</p>';
        }
    }

    // Fetch weather by coordinates
    async function fetchWeatherByCoords(lat, lon) {
        weatherInfo.innerHTML = '<p class="loading-text">Loading weather data...</p>';
        
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed (${response.status})`);
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error("Weather service call failed:", error);
            weatherInfo.innerHTML = '<p class="error-text">Failed to load weather data. Please try again.</p>';
        }
    }

    // Display weather information
    function displayWeather(data) {
        const { name, main, weather, sys } = data;
        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        weatherInfo.innerHTML = `
            <h3>${name}${sys.country ? ', ' + sys.country : ''}</h3>
            <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon">
            <p>Temperature: ${Math.round(main.temp)}°C</p>
            <p>Feels like: ${Math.round(main.feels_like)}°C</p>
            <p>Condition: ${weather[0].main}</p>
            <p>Description: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
        `;
    }

    // Handle location errors
    function handleLocationError(error) {
        let errorMessage = '';
        
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Location access denied. Please allow location access and try again.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information unavailable. Please try again.';
                break;
            case error.TIMEOUT:
                errorMessage = 'Location request timed out. Please try again.';
                break;
            default:
                errorMessage = 'An error occurred. Please try again.';
        }
        
        weatherInfo.innerHTML = `<p class="error-text">${errorMessage}</p>`;
    }

    // Removed fetchWeather() function - not needed without city search
    // Removed debouncedFetchWeather - not needed without city search
    // Removed handleWeatherSearch() - not needed without city search

    // --- Block G: Event Registry ---
    // Task management events
    addTaskBtn.addEventListener("click", addTask);
    clearAllBtn.addEventListener("click", clearAllTasks);

    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // NEW: Get location button click event
    getLocationBtn.addEventListener("click", () => {
        getUserLocationWeather();
    });

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });

    // Navigation links
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    navLinks.forEach((navLink) => {
        navLink.addEventListener("click", (e) => {
            navLinks.forEach((allNavLinks) => {
                allNavLinks.classList.remove("active");
            });
            e.target.classList.add("active");
        });
    });

    // Adding Task With Enter
    taskInput.addEventListener('keypress',(e)=>{
        if (e.key=="Enter"){
            addTask();   
        }
    })

    // --- Block H: Application Entry Point ---
    function init() {
        renderTasks();
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        // Removed auto-call to getUserLocationWeather() - now button-triggered only
    }

    init();
});