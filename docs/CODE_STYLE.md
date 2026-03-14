# Code Style & Conventions

## Naming Conventions

### Files and Folders

- **Component files**: `PascalCase.tsx`

  ```
  Button.tsx
  UserProfile.tsx
  SkillSelector.tsx
  ```

- **Hook files**: `camelCase.ts` with `use` prefix

  ```
  useSkills.ts
  useSkillSetup.ts
  useAuth.ts
  ```

- **Utility files**: `camelCase.ts`

  ```
  api.ts
  cn.ts
  inputStyles.ts
  ```

- **Type files**: `camelCase.ts`

  ```
  auth.ts
  skills.ts
  api.ts
  ```

- **Folders**: `camelCase` or `kebab-case` depending on content
  ```
  src/components/
  src/hooks/
  src/lib/
  src/types/
  ```

### Variables and Functions

- **Constants**: `UPPER_SNAKE_CASE`

  ```typescript
  const API_BASE_URL = "http://localhost:3000";
  const MAX_RETRIES = 3;
  ```

- **Functions**: `camelCase`

  ```typescript
  function calculateTotal() {}
  const getPasswordStrength = () => {};
  ```

- **React Components**: `PascalCase`

  ```typescript
  function UserCard() {}
  const SkillSelector = () => {};
  ```

- **Variables**: `camelCase`
  ```typescript
  const userData = {};
  let isLoading = false;
  ```

## TypeScript Guidelines

### Type Definitions

```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Use types for unions and advanced types
type Status = "pending" | "active" | "inactive";
type Optional<T> = T | undefined;
```

### Function Typing

```typescript
// Always type function parameters and return values
function greet(name: string): string {
  return `Hello, ${name}`
}

// For React components
interface ButtonProps {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}
```

### Generics

```typescript
// Use generics for reusable types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Generic hook
function useQuery<T>(url: string): ApiResponse<T> {
  // implementation
}
```

## React Component Conventions

### Functional Components

```typescript
// Always use functional components
function MyComponent() {
  return <div>Content</div>
}

// Or arrow function
const MyComponent = () => {
  return <div>Content</div>
}

// Export at the end
export default MyComponent
```

### Props Interface

```typescript
interface MyComponentProps {
  title: string
  onClick?: () => void
  children: React.ReactNode
}

function MyComponent({ title, onClick, children }: MyComponentProps) {
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

### Hooks Usage

```typescript
function MyComponent() {
  // Hooks at the top level
  const [state, setState] = useState(false)
  const { data } = useQuery()
  const router = useNavigate()

  // Event handlers
  const handleClick = useCallback(() => {
    setState(!state)
  }, [state])

  // Effects
  useEffect(() => {
    // side effect
  }, [dependency])

  // Render
  return <div onClick={handleClick}>{state ? 'On' : 'Off'}</div>
}
```

## Styling Conventions

### Tailwind CSS

```typescript
// Use className for Tailwind
<div className="flex items-center gap-4 p-4 rounded-lg bg-white">
  <span className="font-semibold text-gray-900">Title</span>
</div>

// For conditional classes use cn() utility
<div className={cn(
  'base styles',
  isActive && 'active styles',
  variant === 'primary' && 'primary styles'
)}>
  Content
</div>
```

### CSS Modules (if needed)

```typescript
// Import styles
import styles from './Button.module.css'

// Use with className
<button className={styles.primary}>Click me</button>
```

### Inline Styles (avoid)

```typescript
// Don't do this - use Tailwind instead
<div style={{ padding: '1rem', color: 'red' }}>
  Bad practice
</div>
```

## Comments and Documentation

### File Headers

```typescript
/**
 * UserCard.tsx — Display user profile information
 *
 * Shows user avatar, name, and skill count in a card layout.
 * Clicking the card navigates to the user's profile.
 */
```

### Function Documentation

```typescript
/**
 * Calculate the total price including tax
 * @param basePrice The price before tax
 * @param taxRate The tax rate as a decimal (e.g., 0.1 for 10%)
 * @returns The total price including tax
 */
function calculateTotal(basePrice: number, taxRate: number): number {
  return basePrice * (1 + taxRate);
}
```

### Complex Logic Comments

```typescript
// Brief, clear explanation of why this logic exists
// Don't explain what the code does, explain why
const validatePassword = (pwd: string) => {
  // Require at least one uppercase to meet security standards
  if (!/[A-Z]/.test(pwd)) return false;
  return true;
};
```

### TODO and FIXME

```typescript
// TODO: Implement skill recommendations algorithm
// FIXME: Handle edge case when user has no skills
// NOTE: API returns dates as ISO strings, remember to parse
```

## Error Handling

### Try-Catch for Async

```typescript
async function fetchUser(id: string) {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("API Error:", error.response?.data);
    }
    throw error;
  }
}
```

### Type Guard Errors

```typescript
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unknown error:", error);
  }
}
```

## Import Organization

```typescript
// 1. External packages (React, third-party)
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 2. Absolute imports (from @/)
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";
import type { User } from "@/types/auth";

// 3. Relative imports (if necessary)
import { ChildComponent } from "./ChildComponent";

// 4. Styles
import "./MyComponent.css";
```

## Commit Message Convention

```
<type>: <subject>

<body>

<footer>

# Types: feat, fix, docs, style, refactor, perf, test, chore
# Subject: imperative, lowercase, no period, max 50 chars
# Body: explain what and why, max 72 chars per line
# Footer: reference issues, breaking changes
```

Example:

```
feat: add skill filtering by category

Allow users to filter available skills by category to improve
discovery. Implements category dropdown in explore page with
real-time filtering.

Closes #123
```

## Testing Conventions

### Test File Naming

```
ComponentName.test.tsx
useHook.test.ts
utility.test.ts
```

### Test Structure

```typescript
describe('Button Component', () => {
  it('should render with label', () => {
    // Arrange
    const props = { label: 'Click me' }

    // Act
    const { getByText } = render(<Button {...props} />)

    // Assert
    expect(getByText('Click me')).toBeInTheDocument()
  })
})
```

---

See [COMPONENTS.md](./COMPONENTS.md) for specific component examples.
