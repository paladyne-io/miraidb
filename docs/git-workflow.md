# Git Workflow Guide

## When to Commit

1. **Logical Units**: Make commits when you complete a logical unit of work:
   - Implementing a new feature
   - Fixing a bug
   - Refactoring code
   - Updating documentation
   - Adding tests

2. **Working State**: Only commit when your code is in a working state
   - Code should compile/build successfully
   - Tests should pass (if applicable)
   - No debug code or console.logs left behind

3. **Frequency Guidelines**:
   - Commit at least once per task completion
   - Commit when ending a development session
   - Commit before making major changes
   - Aim for smaller, focused commits rather than large ones

## Commit Message Format

We use conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Example:
```
feat(auth): add user login functionality

- Implement JWT authentication
- Add login form component
- Create auth service

Closes #123
```

## Backup Strategy

1. **Local Backups**:
   - Use the provided backup script before major changes:
     ```bash
     ./backup_script.sh
     ```
   - This creates a timestamped backup of your working directory

2. **Git Branches**:
   - Create a new branch for each feature/task:
     ```bash
     git checkout -b feature/new-feature
     ```
   - Regular pushes to remote serve as cloud backup:
     ```bash
     git push origin feature/new-feature
     ```

3. **Version Tags**:
   - Tag significant versions:
     ```bash
     git tag -a v1.0.0 -m "First stable release"
     git push origin v1.0.0
     ```

## Daily Workflow

1. **Start of Day**:
   ```bash
   git pull origin main          # Get latest changes
   git checkout -b feature/task  # Create new branch for task
   ```

2. **During Development**:
   ```bash
   git add .                     # Stage changes
   git commit -m "type: message" # Commit changes
   ./backup_script.sh           # Create backup if making major changes
   ```

3. **End of Day**:
   ```bash
   git add .
   git commit -m "wip: end of day save"  # If work is incomplete
   git push origin feature/task
   ```

## Best Practices

1. **Branch Management**:
   - Keep branches short-lived (1-3 days)
   - Delete branches after merging
   - Use descriptive branch names (feature/, fix/, docs/)

2. **Commit Hygiene**:
   - Write clear, descriptive commit messages
   - Keep commits focused and atomic
   - Don't commit sensitive information

3. **Pull Requests**:
   - Create PR when feature is complete
   - Reference related issues in PR description
   - Request reviews from team members

4. **Backup Frequency**:
   - Run backup script before:
     - Major refactoring
     - Database migrations
     - Dependency updates
     - Complex feature implementations

## VS Code Git Integration

1. **Source Control Panel** (Ctrl+Shift+G):
   - View changed files
   - Stage changes
   - Create commits
   - Push/pull changes

2. **Useful Extensions**:
   - GitLens: Enhanced Git capabilities
   - Git History: Visual Git history
   - Git Graph: Visualize Git branches

3. **Keyboard Shortcuts**:
   - `Ctrl+Enter` in Source Control: Create commit
   - `Alt+Arrow` in diff view: Navigate changes
   - `Ctrl+Shift+G G`: Open source control
   - `Ctrl+Shift+P` then "Git": Access all Git commands

## Recovery and Troubleshooting

1. **Undo Last Commit** (not pushed):
   ```bash
   git reset --soft HEAD~1
   ```

2. **Recover Deleted Branch**:
   ```bash
   git reflog                    # Find branch hash
   git checkout -b branch-name hash
   ```

3. **Fix Wrong Branch**:
   ```bash
   git stash                     # Save changes
   git checkout correct-branch
   git stash pop                 # Apply changes
   ```

Remember: When in doubt, create a backup using the backup script before making significant changes.
