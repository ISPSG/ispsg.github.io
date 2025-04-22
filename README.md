# ISPSG Website

This is the official website for the ISPSG (Information Systems Paper Sharing Group) built with React and Material-UI.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ispsg/ispsg.github.io.git
cd ispsg.github.io
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

## Add a New Feature

### 1. Sync Your Local Repository

Before starting new work, ensure your local `main` (or `master`) branch is up-to-date with the remote repository.

```bash
git checkout main
git pull origin main
```

**Example:**  
Run these commands to synchronize your local branch:

```bash
git checkout main
git pull origin main
```

---

### 2. Create a New Branch

Create a branch off `main` for your task, using a descriptive name.

```bash
git checkout -b feature/add-login-button
```

*(e.g., "feature/add-login-button")*

or

```bash
git checkout -b bugfix/fix-issue-1
```

*(e.g., "bugfix/fix-issue-1")*

**Example:**  
You want to add a login button, so create:

```bash
git checkout -b feature/add-login-button
```

---

### 3. Make Your Code Changes

Develop on your branch: write code, add tests, update documentation, etc.

**Example:**  
Add a login button in `App.js`:

```jsx
// App.js
function App() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <button>Login</button>
    </div>
  );
}
export default App;
```

---

### 4. Commit Your Changes

Stage and commit your updates with clear descriptions.

```bash
git add App.js
git commit -m "Add login button to homepage"
```

*(for features)*

or

```bash
git add Login.js
git commit -m "Fix null pointer error in login validation"
```

*(for bug fixes)*

**Example:**  
Commit the addition of the login button:

```bash
git add App.js
git commit -m "Add login button to homepage"
```

---

### 5. Push Your Branch to GitHub

Push your branch with:

```bash
git push origin feature/add-login-button
```

**Example:**  
For your feature branch:

```bash
git push origin feature/add-login-button
```

or for bugfix branch:

```bash
git push origin bugfix/fix-issue-1
```

---

### 6. Create a Pull Request (PR)

- Visit your GitHub repository.
- Click the “Compare & pull request” button OR go to the "Pull Requests" tab and select "New pull request".
- Set:

  - **Base branch:** `main`
  - **Compare branch:** your feature/bugfix branch

- Fill in:

  - **Title:** e.g., “Add login button to homepage”
  - **Description:** Describe what changes you made and why. Refer to issues if applicable (e.g., “Closes #123”).

- Assign reviewers, labels, etc., as needed.

- Click **"Create pull request"**.

---

### 7. Code Review

- Reviewers examine your PR, leave comments, and ask questions.

- If changes are requested:

  - Make updates locally:

    ```bash
    git add <files>
    git commit -m "Address review comments"
    git push origin feature/add-login-button
    ```

  - The PR updates automatically.

- Once approved, the reviewer merges your branch.

---

### 8. Merging the PR

- A team member with merge permission (often Austin) will merge the PR into `main`.
- **You do not need to review codes now.**

---

### 9. Deployment (Handled by Austin)

- After the PR is merged, **Austin will handle deploying**.

---

# Summary

This workflow ensures code quality through reviews and maintains centralized deployment management handled by Austin, promoting a clean and organized project process.

---

## Project Structure

- `src/pages/` — Contains main pages (Home, Events, Members)
- `public/data/` — JSON data files (`events.json`, `members.json`)
- `public/` — Static assets and `404.html` for GitHub Pages routing

## Important Notes

- The website is hosted on GitHub Pages.
- Client-side routing uses `react-router-dom`.
- All data files are stored in `public/data`.
- The `404.html` is essential for routing on GitHub Pages.

