# State Management

## Overview

The SkillSwap frontend uses a hybrid state management approach:

- **Global State**: Zustand for authentication
- **Server State**: React Query for data from backend
- **Local State**: React useState for component-specific state

## Zustand Store

### `authStore.ts` - Authentication State

The central store for user authentication and authorization.

```typescript
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signup: (credentials: SignupCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signup: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/signup", credentials);
      set({ user: response.data.user, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  login: async (credentials) => {
    // Similar implementation
  },

  logout: () => {
    set({ user: null, error: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
```

### Usage in Components

```typescript
import { useAuthStore } from '@/store/authStore'

function LoginPage() {
  const { signup, isLoading, error, clearError } = useAuthStore()

  const onSubmit = async (data) => {
    try {
      await signup(data)
      navigate('/skills/setup')
    } catch {
      // Error already in store
    }
  }

  return (
    <>
      {error && (
        <div>
          {error}
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}
      {/* Form content */}
    </>
  )
}
```

### Best Practices for Stores

**Do:**

```typescript
// ✅ Keep stores focused on global state
// ✅ Use for truly application-wide data
// ✅ Actions for state modifications
// ✅ Proper error handling

const store = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

**Don't:**

```typescript
// ❌ Stores for component state
// ❌ Multiple stores for related data
// ❌ Storing data that comes from API
// ❌ Unstructured actions

const store = create((set) => ({
  modalOpen: false, // Use useState instead
  userData: {}, // Use React Query instead
  randomAction: () => {}, // Use proper naming
}));
```

## React Query (Server State)

### Overview

React Query manages data fetched from the backend API.

### Hooks Pattern

```typescript
// hooks/useSkills.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllSkills, addUserSkill } from "@/lib/skillsApi";

// Query keys for cache management
export const skillsKeys = {
  all: ["skills", "all"] as const,
  mine: ["skills", "mine"] as const,
};

// Fetching hook
export function useAllSkills() {
  return useQuery({
    queryKey: skillsKeys.all,
    queryFn: fetchAllSkills,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Mutation hook
export function useAddUserSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserSkill,
    onSuccess: () => {
      // Invalidate related queries to refetch
      queryClient.invalidateQueries({
        queryKey: skillsKeys.mine,
      });
    },
  });
}
```

### Usage in Components

```typescript
import { useAllSkills, useAddUserSkill } from '@/hooks/useSkills'

function SkillSelector() {
  // Queries
  const { data: skills, isLoading, error } = useAllSkills()

  // Mutations
  const addMutation = useAddUserSkill()

  const handleAddSkill = async (skill) => {
    try {
      await addMutation.mutateAsync({ skillId: skill.id, type: 'TEACH' })
    } catch (err) {
      console.error('Failed to add skill:', err)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading skills</div>

  return (
    <div>
      {skills?.map((skill) => (
        <button key={skill.id} onClick={() => handleAddSkill(skill)}>
          {skill.name}
        </button>
      ))}
    </div>
  )
}
```

### Query Key Convention

```typescript
// Organize query keys hierarchically
export const queryKeys = {
  // Skills
  skills: {
    all: ["skills"] as const,
    lists: () => [...queryKeys.skills.all, "list"] as const,
    list: (filters) => [...queryKeys.skills.lists(), { filters }] as const,
    detail: (id) => [...queryKeys.skills.all, "detail", id] as const,
  },

  // Users
  users: {
    all: ["users"] as const,
    detail: (id) => [...queryKeys.users.all, "detail", id] as const,
    profile: () => [...queryKeys.users.all, "profile"] as const,
  },
};
```

### Caching Strategy

```typescript
// Long-lived cache (skill catalog)
useQuery({
  queryKey: ["skills", "all"],
  queryFn: fetchSkills,
  staleTime: 1000 * 60 * 10, // 10 minutes
});

// Short-lived cache (user data)
useQuery({
  queryKey: ["users", "me"],
  queryFn: fetchCurrentUser,
  staleTime: 1000 * 60 * 1, // 1 minute
});

// Real-time cache (messages)
useQuery({
  queryKey: ["messages", conversationId],
  queryFn: () => fetchMessages(conversationId),
  staleTime: 0, // Always fresh
  refetchInterval: 5000, // Poll every 5 seconds
});
```

## Local Component State

### useState Patterns

```typescript
// Simple state
const [isOpen, setIsOpen] = useState(false);

// Complex state
const [formData, setFormData] = useState({
  name: "",
  email: "",
});

// State with previous value
const [count, setCount] = useState(0);
setCount((prev) => prev + 1);
```

### useCallback for Performance

```typescript
const handleClick = useCallback(() => {
  // Do something
}, [dependency])

// Pass to child components
<ChildComponent onClick={handleClick} />
```

### useMemo for Expensive Computations

```typescript
const memoizedList = useMemo(() => {
  return skills
    .filter((skill) => skill.name.includes(searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));
}, [skills, searchTerm]);
```

## State Flow Diagram

```
User Interaction
        ↓
Component State (useState)
        ↓
Custom Hook (useSkillSetup, useAuth)
        ↓
Store (Zustand) OR Query/Mutation (React Query)
        ↓
API Call
        ↓
Backend
        ↓
Response
        ↓
Cache Update / Store Update
        ↓
Component Re-render
```

## Best Practices

### Global State

- Keep minimal
- Only truly application-wide data
- Use for authentication and user preferences
- Consider React Query for everything else

### Server State

- Use React Query for all API data
- Query keys for efficient caching
- Mutations with automatic invalidation
- Proper loading and error states

### Local State

- Use useState for form inputs
- Use useCallback for event handlers
- Use useMemo for expensive computations
- Keep close to where it's used

## Common Patterns

### Form Submission

```typescript
const form = useForm({ resolver: zodResolver(schema) });
const mutation = useMutation({ mutationFn: submitForm });

const onSubmit = async (data) => {
  try {
    await mutation.mutateAsync(data);
    navigate("/success");
  } catch (err) {
    form.setError("root", { message: err.message });
  }
};
```

### Optimistic Updates

```typescript
const mutation = useMutation({
  mutationFn: updateSkill,
  onMutate: async (newData) => {
    // Cancel ongoing queries
    await queryClient.cancelQueries({ queryKey: ["skills"] });

    // Update cache optimistically
    queryClient.setQueryData(["skills"], (old) =>
      old.map((s) => (s.id === newData.id ? newData : s)),
    );
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(["skills"], context.previousSkills);
  },
});
```

---

See [HOOKS.md](./HOOKS.md) for custom hook patterns.
