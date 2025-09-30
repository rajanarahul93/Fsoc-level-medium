```markdown
<div align="center">

# 🚀 Hacktoberfest 2025 - FSOC Medium Challenge

**A beginner-friendly project to help you make your first pull request and learn the basics of web development and open-source contribution.**

![Languages](https://img.shields.io/static/v1?label=Languages&message=HTML%2C%20CSS%2C%20JS&color=blue&style=for-the-badge)
![Status](https://img.shields.io/static/v1?label=Status&message=Accepting%20PRs&color=brightgreen&style=for-the-badge)
![License](https://img.shields.io/static/v1?label=License&message=MIT&color=lightgrey&style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)

</div>

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [API Setup](#api-setup)
- [How to Contribute](#how-to-contribute)
- [Challenge Categories](#challenge-categories)
- [Contributing Guidelines](#contributing-guidelines)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Contact](#contact)

---

## 📋 About the Project

**DevDash** is a productivity dashboard application built for Hacktoberfest 2025. This project is specifically designed for beginners who want to:

- Learn the fundamentals of HTML, CSS, and JavaScript
- Understand how to work with APIs
- Practice Git and GitHub workflows
- Make meaningful contributions to open source
- Get their pull requests counted for Hacktoberfest

The application currently has intentional bugs and missing features that you'll help fix!

---

## ✨ Features

When complete, DevDash will have:

- **Task Management**
  - Add new tasks
  - Mark tasks as complete
  - Delete individual tasks
  - Clear all tasks at once
  - Filter tasks by status (All/Active/Completed)
  - Edit existing tasks
  - Add due dates to tasks

- **Weather Widget**
  - Search weather by city name
  - Display current temperature and conditions
  - Show weather icons
  - Use geolocation for default city
  - Handle API errors gracefully

- **Theme Customization**
  - Toggle between light and dark modes
  - Persist theme preference

- **Data Persistence**
  - Save tasks to localStorage
  - Maintain data across sessions

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Git** - [Download & Install Git](https://git-scm.com/downloads)
- **A code editor** - We recommend [VS Code](https://code.visualstudio.com/)
- **A modern web browser** - Chrome, Firefox, or Edge
- **Basic knowledge of HTML, CSS, and JavaScript**

### Installation

1. **Fork this repository**
   
   Click the "Fork" button at the top right of this page to create your own copy.

2. **Clone your forked repository**
   
   ```bash
   git clone https://github.com/<your-username>/fsoc-medium-challenge.git
   cd fsoc-medium-challenge
   ```

3. **Open the project**
   
   ```bash
   code .
   ```
   
   Or open the folder in your preferred code editor.

4. **Open `index.html` in your browser**
   
   You can use a local server extension like Live Server in VS Code, or simply open the file directly.

### API Setup

This project uses the **OpenWeatherMap API** for weather functionality.

#### Steps:

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Navigate to your API keys section
4. Copy your API key
5. Open `script.js` in your code editor
6. Find this line:
   ```javascript
   const API_KEY = "YOUR_API_KEY_HERE";
   ```
7. Replace `"YOUR_API_KEY_HERE"` with your actual API key:
   ```javascript
   const API_KEY = "abc123xyz456"; // Your actual key
   ```

**Note:** Keep your API key secure and never commit it to a public repository in production projects.

---

## 🤝 How to Contribute

### Step 1: Choose an Issue

Browse the [issues page](../../issues) or check the challenges listed below. Pick one that matches your skill level.

### Step 2: Claim the Issue

Comment on the issue to let maintainers and other contributors know you're working on it.

Example: "Hi! I'd like to work on this issue."

### Step 3: Create a Branch

```bash
git checkout -b fix/issue-name
```

Use descriptive branch names like:
- `fix/add-hover-effect`
- `feature/dark-mode`
- `fix/empty-task-validation`

### Step 4: Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Test your changes thoroughly
- Add comments where necessary

### Step 5: Commit Your Changes

```bash
git add .
git commit -m "Fix: Add hover effect to task buttons"
```

**Good commit message examples:**
- `Fix: Add hover effect to task buttons`
- `Feature: Implement dark mode toggle`
- `Fix: Prevent empty tasks from being added`
- `Refactor: Improve task rendering performance`

### Step 6: Push to Your Fork

```bash
git push origin fix/issue-name
```

### Step 7: Create a Pull Request

1. Go to your forked repository on GitHub
2. Click "Compare & pull request"
3. Fill in the PR template with:
   - Description of changes
   - Issue number (if applicable)
   - Screenshots (if UI changes)
4. Submit the pull request

### Step 8: Wait for Review

Maintainers will review your PR and may request changes. Be patient and responsive to feedback.

---

## 🎯 Challenge Categories

We have **30 issues** across three difficulty levels. Pick challenges that match your skill level, or challenge yourself with harder ones!

<details>
<summary><strong>👶 Easy Level (15 Issues)</strong></summary>

Perfect for beginners who are just getting started with web development.

1. **Add Hover Effect to Buttons** - Make buttons change appearance on hover
2. **Style the Active Nav Link** - Highlight the current navigation item
3. **Make Copyright Year Dynamic** - Use JavaScript to display current year
4. **Implement "Clear All"** - Add functionality to clear all tasks at once
5. **Enable Single Task Deletion** - Allow users to delete individual tasks
6. **Clear Input After Adding Task** - Reset the input field after task creation
7. **Display a "Remaining Tasks" Counter** - Show how many tasks are left
8. **Add Task with 'Enter' Key** - Submit tasks by pressing Enter
9. **Remove the Welcome alert()** - Remove or improve the initial popup
10. **Improve Input Placeholder Text** - Make placeholder text more descriptive
11. **Add Spacing Between Tasks** - Improve visual layout of task list
12. **Add Strikethrough for Completed Tasks** - Visually indicate completion
13. **Show a Message for Empty List** - Display text when no tasks exist
14. **Add a Proper Page Title** - Set an appropriate document title
15. **Increase Weather Icon Size** - Make weather icons more visible

</details>

<details>
<summary><strong>🧑‍💻 Medium Level (10 Issues)</strong></summary>

For contributors with some JavaScript experience who want to work on more complex features.

16. **Implement Task Filtering** - Add All/Active/Completed filter buttons
17. **Persist Tasks in localStorage** - Save tasks between sessions
18. **Move Completed Tasks to the Bottom** - Auto-sort task list
19. **Add Confirmation for "Clear All"** - Prevent accidental data loss
20. **Add "Sort by Name" Button** - Alphabetically sort tasks
21. **Use Geolocation for Default Weather** - Automatically detect user location
22. **Enable Weather Search with 'Enter' Key** - Submit weather search on Enter
23. **Improve "City Not Found" Message** - Better error handling for weather
24. **Prevent Adding Empty Tasks** - Validate input before adding
25. **Allow Editing a Task** - Enable users to modify existing tasks

</details>

<details>
<summary><strong>🔥 Hard Level (5 Issues)</strong></summary>

Advanced challenges that require deeper understanding of JavaScript, APIs, and optimization.

26. **Implement Robust API Error Handling** - Handle all weather API edge cases
27. **Implement Dark/Light Theme Toggle** - Full theme system with persistence
28. **Refactor Task Rendering for Performance** - Optimize DOM manipulation
29. **Debounce Weather API Calls** - Prevent excessive API requests
30. **Add Due Dates to Tasks** - Full date picker and sorting functionality

</details>

---

## 📜 Contributing Guidelines

### General Rules

- **One issue per PR** - Keep pull requests focused
- **No spam PRs** - Invalid PRs will be marked as spam and closed
- **Quality over quantity** - Focus on meaningful contributions
- **Be respectful** - Follow our Code of Conduct
- **Ask questions** - Don't hesitate to ask for help

### Code Standards

#### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Add appropriate `alt` text for images
- Use meaningful class and ID names

#### CSS
- Follow BEM naming convention where applicable
- Group related properties together
- Use CSS variables for colors and common values
- Ensure responsive design principles

#### JavaScript
- Use `const` and `let` instead of `var`
- Write descriptive variable and function names
- Add comments for complex logic
- Handle errors appropriately
- Use modern ES6+ syntax

### Testing Your Changes

Before submitting a PR:

1. **Test in multiple browsers** - Chrome, Firefox, Safari
2. **Test responsive design** - Mobile, tablet, desktop
3. **Test edge cases** - Empty states, long text, special characters
4. **Ensure no console errors** - Check browser console
5. **Verify existing features still work** - Don't break other functionality

### Pull Request Template

When creating a PR, include:

```markdown
## Description
Brief description of changes made

## Issue Number
Closes #[issue number]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have tested my changes
- [ ] I have commented my code where necessary
- [ ] I have updated documentation if needed
```

---

## 📝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone, regardless of:
- Age
- Body size
- Disability
- Ethnicity
- Gender identity and expression
- Level of experience
- Nationality
- Personal appearance
- Race
- Religion
- Sexual identity and orientation

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information
- Any conduct that could be considered inappropriate

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to [maintainer email].

---

## 🏆 Recognition

All contributors will be:
- Listed in our Contributors section
- Eligible for Hacktoberfest swag (if you complete 4 PRs)
- Part of the open-source community

### Top Contributors

Check out our amazing contributors on the [Contributors page](../../graphs/contributors).

---

## 📚 Resources

### Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web development documentation
- [freeCodeCamp](https://www.freecodecamp.org/) - Free coding tutorials
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [Git Documentation](https://git-scm.com/doc) - Learn Git

### Hacktoberfest Resources

- [Hacktoberfest Official Site](https://hacktoberfest.com/)
- [How to Create a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [Git and GitHub for Beginners](https://www.freecodecamp.org/news/git-and-github-for-beginners/)

---

## 📞 Contact

### Project Maintainers

- **Name** - [@username](https://github.com/username)
- **Email** - email@example.com

### Community

- **Issues** - [Report bugs or request features](../../issues)
- **Discussions** - [Join community discussions](../../discussions)
- **Discord** - [Join our Discord server](#)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What this means:

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ License and copyright notice required

---

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Hacktoberfest for promoting open source
- OpenWeatherMap for providing the weather API
- The open-source community for inspiration and support

---

<div align="center">

### Happy Hacking! 

**Made with ❤️ for Hacktoberfest 2025**

[⬆ Back to Top](#-hacktoberfest-2025---fsoc-medium-challenge)

---

**Questions?** Open an issue or reach out to the maintainers.

**Found this helpful?** Give us a ⭐ on GitHub!

</div>
```

This is a complete, professional README with all sections typically found in open-source projects. You can copy this directly and use it for your repository.
