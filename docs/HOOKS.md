# Hooks Guide

## Custom Hooks Overview

Custom hooks extract logic from components to make them reusable and testable.

## Hooks in the Project

### `useSkills.ts` - Skill Data Management

A collection of React Query hooks for skill-related operations.

#### `useAllSkills()`

Fetch all available skills from the catalog.

```typescript
import { useAllSkills } from '@/hooks/useSkills'

function SkillCatalog() {
  const { data: skills = [], isLoading, error } = useAllSkills()

  if (isLoading) return <div>Loading skills...</div>
  if (error) return <div>Error loading skills</div>

  return (
    <div>
      {skills.map(skill => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  )
}
```

**Properties**:

- `data`: Array of Skill objects
- `isLoading`: Loading state
- `error`: Error if fetch failed
- `refetch`: Manual refetch function

#### `useMySkills()`

Fetch the current user's skills (teach and learn lists).

```typescript
import { useMySkills } from '@/hooks/useSkills'

function MySkillsPage() {
  const { data: mySkills, isLoading } = useMySkills()

  return (
    <div>
      <h2>Teaching</h2>
      {mySkills?.teach.map(id => (
        <div key={id}>{id}</div>
      ))}

      <h2>Learning</h2>
      {mySkills?.learn.map(id => (
        <div key={id}>{id}</div>
      ))}
    </div>
  )
}
```

#### `useAddUserSkill()`

Mutation hook to add a skill to user's profile.

```typescript
import { useAddUserSkill } from '@/hooks/useSkills'

function AddSkillButton() {
  const mutation = useAddUserSkill()

  const handleAdd = async (skillId: string) => {
    try {
      await mutation.mutateAsync({ skillId, type: 'TEACH' })
      // Success - user's skills will be refetched
    } catch (err) {
      console.error('Failed to add skill:', err)
    }
  }

  return (
    <button
      onClick={() => handleAdd('skill-123')}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Adding...' : 'Add Skill'}
    </button>
  )
}
```

**States**:

- `isPending`: Mutation in progress
- `isSuccess`: Last mutation succeeded
- `isError`: Last mutation failed
- `error`: Error object

### `useSkillSetup.ts` - Skill Setup Logic

Comprehensive hook for the skill setup onboarding flow.

```typescript
import { useSkillSetup } from '@/hooks/useSkillSetup'

function SkillSetupPage() {
  const {
    teachSkills,
    learnSkills,
    handleAddTeach,
    handleAddLearn,
    handleRemoveTeach,
    handleRemoveLearn,
    handleSave,
    error,
    isSaving,
    saveSuccess,
    totalSelected,
  } = useSkillSetup()

  return (
    <div>
      {/* Teach Section */}
      <div>
        <h2>What can you teach?</h2>
        <SkillSelector
          selected={teachSkills}
          onAdd={handleAddTeach}
          onRemove={handleRemoveTeach}
        />
      </div>

      {/* Learn Section */}
      <div>
        <h2>What do you want to learn?</h2>
        <SkillSelector
          selected={learnSkills}
          onAdd={handleAddLearn}
          onRemove={handleRemoveLearn}
        />
      </div>

      {/* Controls */}
      {error && <div className="error">{error}</div>}
      <button onClick={handleSave} disabled={isSaving || saveSuccess}>
        {saveSuccess ? 'Saved!' : 'Save Skills'}
      </button>
    </div>
  )
}
```

**Return Object**:

```typescript
{
  // State
  teachSkills: Skill[]
  learnSkills: Skill[]
  removingTeachId: string | null
  removingLearnId: string | null
  error: string | null
  isSaving: boolean
  saveSuccess: boolean

  // Handlers
  handleAddTeach: (skill: Skill) => Promise<void>
  handleAddLearn: (skill: Skill) => Promise<void>
  handleRemoveTeach: (skill: Skill) => Promise<void>
  handleRemoveLearn: (skill: Skill) => Promise<void>
  handleSave: () => Promise<void>

  // Derived
  totalSelected: number
  canSkip: boolean
}
```

## Creating Custom Hooks

### Basic Pattern

```typescript
// hooks/useCounter.ts
import { useState, useCallback } from "react";

/**
 * Custom hook for counter state management
 * @returns Object with count and handlers
 */
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
}
```

### With Data Fetching

```typescript
// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api";

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // Only fetch if userId is provided
  });
}
```

### With Complex State

```typescript
// hooks/useForm.ts
import { useState, useCallback } from "react";

export function useFormState<T>(initialState: T) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors({});
  }, [initialState]);

  return {
    values,
    errors,
    handleChange,
    setError,
    reset,
  };
}
```

## Hook Rules (React Hooks API)

### Do's

```typescript
// ✅ Call hooks at the top level
function MyComponent() {
  const [count, setCount] = useState(0)
  const data = useQuery(...)
  const auth = useAuth()

  return <div>{count}</div>
}

// ✅ Only call hooks from React functions
function MyComponent() {
  const state = useMyHook()
}

// ✅ Use conditional logic after hooks
function MyComponent() {
  const data = useQuery(...)

  if (!data) return null
  return <div>{data.name}</div>
}
```

### Don'ts

```typescript
// ❌ Don't call hooks inside loops
function Bad() {
  const skills = [...]
  skills.forEach(skill => {
    const data = useQuery(...)  // Wrong!
  })
}

// ❌ Don't call hooks conditionally
function Bad({ shouldFetch }) {
  if (shouldFetch) {
    const data = useQuery(...)  // Wrong!
  }
}

// ❌ Don't call hooks from regular functions
function helper() {
  const state = useState()  // Wrong!
}
```

## Hook Testing

```typescript
// useCounter.test.ts
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("should increment count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should initialize with custom value", () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });
});
```

## Best Practices

### 1. Clear Naming

```typescript
// ✅ Good - immediately clear what the hook does
export function useUserProfile(userId: string) {}
export function useForm<T>(initialValues: T) {}

// ❌ Bad - unclear purpose
export function useData() {}
export function useHelper() {}
```

### 2. Return Consistent Types

```typescript
// ✅ Good - clear return type
export function useUserAuth(): {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
} {
  // ...
}
```

### 3. Proper Dependency Arrays

```typescript
// ✅ Good - includes all dependencies
const handleClick = useCallback(() => {
  setData(someValue);
}, [someValue]);

// ❌ Bad - missing dependency
const handleClick = useCallback(() => {
  setData(someValue);
}, []);
```

### 4. Document Parameters

```typescript
/**
 * Fetch user by ID with caching
 * @param userId The user's unique identifier
 * @param options Configuration options
 * @returns Query result with user data
 */
export function useUser(userId: string, options?: QueryOptions) {
  // ...
}
```

---

See [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) for store patterns.
