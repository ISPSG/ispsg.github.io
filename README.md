# ISPSG Website

This is the official website for the ISPSG (Information Systems Papaer Sharing Group) built with React and Material-UI.

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

## Add a new feature

All team members contribute code changes via Pull Requests. Deployment is handled exclusively by Austin after a PR is successfully merged.

**Steps:**

1.  **Sync Your Local Repository:**
    *   Before starting any new work, make sure your local main branch (or master, depending on your repository's naming convention) is up-to-date with the remote repository.
    *   `git checkout main`
    *   `git pull origin main`
2.  **Create a New Branch:**
    *   Create a new branch off the main branch for your specific task (e.g., a new feature, bug fix). Use a descriptive name.
    *   `git checkout -b feature/your-feature-name(e.g. git checkout -b feature/add-login-button)` 
    *   `git checkout -b bugfix/fix-description(e.g. git checkout -b bugfix/fix-issue-1)`
3.  **Make Your Code Changes:**
    *   Work on your task in this new branch. Write your code, add tests, update documentation, etc.

Sure! Here's the example-inclusive version in English:

---

### 4. **Commit Your Changes:**

After making some edits, commit your changes with clear, descriptive messages.

**Example:**

Suppose you added a login button in `App.js`. You would run:

```bash
git add App.js
git commit -m "Add login button to homepage"
```

If you fixed a bug in `Login.js`, you might do:

```bash
git add Login.js
git commit -m "Fix null pointer error in login validation"
```

**Summary:**  

- To stage specific files:  

  ```bash
  git add <filename>  # e.g., git add App.js
  ```

- To commit with a message:  

  ```bash
  git commit -m "Your descriptive message"
  ```

---

### 5. **Push Your Branch to GitHub:**

Suppose your branch name is `feature/add-login-button`. You push it with:

```bash
git push origin feature/add-login-button
```

**Another example:**  
If your branch is `bugfix/fix-login-error`, do:

```bash
git push origin bugfix/fix-login-error
```

---


6.  **Create a Pull Request (PR):**
    *   Go to your repository page on GitHub.
    *   GitHub will often show a prompt to create a PR for your recently pushed branch. Click that, or navigate to the "Pull requests" tab and click "New pull request".
    *   **Base Branch:** Ensure the `base` branch is the one you want to merge *into* (usually `main` or `master`).
    *   **Compare Branch:** Ensure the `compare` branch is your feature/bugfix branch.
    *   **Title & Description:** Write a clear, informative title for the PR. In the description, explain *what* changes you made and *why*. Reference any relevant issue numbers (e.g., "Closes #123").
    *   **Reviewers:** Assign appropriate team members to review your code.
    *   **Labels/Projects (Optional):** Add relevant labels (e.g., `bug`, `feature`, `enhancement`) or assign the PR to a project board if your team uses them.
    *   Click "Create pull request".

7.  **Code Review Process:**
    *   Your assigned reviewers will examine your code.
    *   They may leave comments, ask questions, or request changes directly on the PR page.
    *   Discuss the feedback within the PR comments.
    *   If changes are needed, make them in your local branch, commit them, and push the updates to the same branch on GitHub (`git push origin feature/your-feature-name`). The PR will automatically update with your new commits.
    *   Reviewers will re-review and eventually approve the PR when they are satisfied.

8.  **Merging the Pull Request:**
    *   Once the PR is approved and passes any required checks (like automated tests), a designated repository maintainer or lead (this might be Austin or someone else) will merge your branch into the main branch. **Team members typically do not merge their own PRs.**

9.  **Deployment (Handled by Austin):**
    *   **Important:** After your PR has been successfully reviewed, approved, and **merged into the main branch**, **Austin will handle the deployment process.**
    *   There is no need for individual team members to trigger or perform any deployment steps. Austin will take the updated code from the main branch and deploy it to the relevant environment(s) according to the team's deployment schedule or process.

10.  **Clean Up (Optional but Recommended):**
     *   After your PR is merged, you can delete your feature/bugfix branch from the remote repository (GitHub usually provides a button for this on the merged PR page).
     *   You can also delete the branch locally:
         *   `git checkout main`
         *   `git pull origin main` (to get the merged changes)
         *   `git branch -d feature/your-feature-name`

This process ensures that all code changes are reviewed before integration and that deployments are managed centrally and consistently by Austin.

## Project Structure

- `src/pages/` - Contains the main pages (Home, Events, Members)
- `public/data/` - Contains JSON data files (events.json, members.json)
- `public/` - Static assets and 404.html for GitHub Pages routing

## Important Notes

- The website uses GitHub Pages for hosting
- Client-side routing is handled by react-router-dom
- All data is stored in JSON files in the public/data directory
- The 404.html file is crucial for proper routing on GitHub Pages
