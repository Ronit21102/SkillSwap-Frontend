# Contributing Guide

Welcome to the SkillSwap Frontend project! This guide will help you contribute effectively.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/SkillSwap-Frontend.git
   cd SkillSwap-Frontend
   ```

3. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Start development**:
   ```bash
   npm run dev
   ```

## Development Workflow

### Before You Start

- Check [GitHub Issues](https://github.com/Ronit21102/SkillSwap-Frontend/issues) for existing work
- Read the [Architecture](./ARCHITECTURE.md) and [Project Structure](./PROJECT_STRUCTURE.md) docs
- Review [Code Style](./CODE_STYLE.md) guidelines

### Making Changes

1. **Create a new branch** from `main`

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/my-feature
   ```

2. **Make your changes** following [Code Style](./CODE_STYLE.md)

3. **Test locally**

   ```bash
   npm run build  # Type check and build
   npm run lint   # Check code style
   npm run dev    # Run dev server
   ```

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add skill filtering by category"
   ```

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without feature change
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Build, dependency, or tooling changes

**Examples**:

```
feat: add skill filtering by category
fix: resolve password validation regex issue
docs: update setup guide with env variables
refactor: extract skill selector logic to hook
```

### Pull Request Process

1. **Push to your fork**

   ```bash
   git push origin feature/my-feature
   ```

2. **Open a Pull Request** on GitHub
   - Clear title: "feat: add skill filtering"
   - Description: What changed and why
   - Link related issues: "Closes #123"

3. **Wait for review**
   - Maintainers will review your code
   - Respond to feedback and make requested changes

4. **Merge** once approved

## Code Quality Standards

### Type Safety

- ✅ Full TypeScript coverage
- ✅ No `any` types
- ✅ Proper type imports: `import type { User }`

### Code Style

- ✅ Follow [Code Style Guide](./CODE_STYLE.md)
- ✅ Use ESLint: `npm run lint`
- ✅ Consistent naming conventions

### Components

- ✅ Functional components only
- ✅ Props interface exported
- ✅ JSDoc comments for complex logic

### Hooks

- ✅ Follow [Hooks Guide](./HOOKS.md)
- ✅ Proper dependency arrays
- ✅ Clear return types

### Testing (When Applicable)

- ✅ Unit tests for utilities
- ✅ Component tests for UI elements
- ✅ Integration tests for flows

## File Structure Best Practices

When adding new files:

### New Page

```typescript
// pages/MyNewPage.tsx
/**
 * MyNewPage.tsx — /my-new-page
 *
 * Brief description of what this page does
 */

import { useNavigate } from "react-router-dom";
// ... other imports

export default function MyNewPage() {
  // Implementation
}
```

### New Component

```typescript
// components/MyComponent.tsx
/**
 * MyComponent — Reusable component description
 *
 * Used in: page1, page2
 */

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  // Implementation
}
```

### New Hook

```typescript
// hooks/useMyHook.ts
/**
 * useMyHook — Hook description
 *
 * @returns Object with state and handlers
 */

export function useMyHook() {
  // Implementation
}
```

### New Utility

```typescript
// lib/myUtility.ts
/**
 * myUtility.ts — Utility description
 *
 * Provides: function1, function2
 */

/**
 * Function description
 * @param param Description
 * @returns Return value description
 */
export function myFunction(param: string): boolean {
  // Implementation
}
```

## Documentation

### Update Documentation

When adding features, update relevant docs:

1. **Code comments** - JSDoc for public APIs
2. **README.md** - Update if it affects setup or architecture
3. **Inline comments** - Explain complex logic
4. **Type documentation** - Comment interfaces

Example:

```typescript
/**
 * Validates email format
 * @param email Email address to validate
 * @returns true if valid email, false otherwise
 * @example
 * validateEmail('user@example.com') // true
 * validateEmail('invalid') // false
 */
function validateEmail(email: string): boolean {
  // Implementation
}
```

## Common Tasks

### Adding a New Route

1. **Create page component** in `src/pages/MyPage.tsx`
2. **Add route** in `src/App.tsx` (update routing)
3. **Update navigation** if needed
4. **Document** the new route in [PAGES.md](./PAGES.md)

### Adding a New Component

1. **Create component file** in appropriate folder
2. **Export with clear props interface**
3. **Add JSDoc comment**
4. **Create stories if applicable**
5. **Update [COMPONENTS.md](./COMPONENTS.md)**

### Adding a New Hook

1. **Create hook file** in `src/hooks/`
2. **Follow naming convention** `useNameOfHook`
3. **Document parameters and return**
4. **Add usage example**
5. **Update [HOOKS.md](./HOOKS.md)**

### Adding a New Utility

1. **Create in `src/lib/`**
2. **Export as named exports**
3. **Add comprehensive JSDoc**
4. **Include examples**
5. **Update [UTILITIES.md](./UTILITIES.md)**

## Testing Your Changes

### Type Checking

```bash
npm run build  # Runs TypeScript compiler
```

### Linting

```bash
npm run lint   # Check code style
```

### Manual Testing

```bash
npm run dev    # Start dev server
# Test your changes in browser
```

## Reporting Issues

### Bug Report Template

```markdown
## Description

Brief description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Screenshots

If applicable

## Environment

- OS: [e.g. macOS]
- Node: [e.g. 18.0.0]
- Browser: [e.g. Chrome]
```

### Feature Request Template

```markdown
## Description

Clear description of the feature

## Motivation

Why this feature is needed

## Proposed Solution

How it should work

## Additional Context

Links, examples, etc.
```

## Getting Help

- 📚 Read the [documentation](./README.md)
- 🔍 Search [existing issues](https://github.com/Ronit21102/SkillSwap-Frontend/issues)
- 💬 Ask in issue/PR comments
- 📧 Contact maintainers

## Code Review

### What to Expect

- Constructive feedback on code quality
- Suggestions for improvements
- Request for clarifications
- Usually completed within 1-3 days

### Tips for Getting Approved

- ✅ Follow the code style guide
- ✅ Write clear commit messages
- ✅ Add descriptive PR description
- ✅ Keep changes focused and small
- ✅ Test thoroughly before submitting
- ✅ Respond promptly to feedback

## Recognition

Contributors are recognized in:

- 🏆 [CONTRIBUTORS.md](./CONTRIBUTORS.md) (when created)
- 📝 Release notes
- 👨‍💻 GitHub contributors page

## Questions?

If you have questions:

1. Check the [FAQ](./TROUBLESHOOTING.md)
2. Review relevant documentation
3. Open a discussion issue
4. Ask in PR comments

---

**Thank you for contributing to SkillSwap! 🎉**

We appreciate your time and effort to make this project better.
