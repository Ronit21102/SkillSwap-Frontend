# Utilities Guide

## `/lib` Directory Reference

### `api.ts` - Axios Configuration

Central HTTP client configuration with interceptors.

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  },
);

export default api;
```

**Usage**:

```typescript
import api from "@/lib/api";

const response = await api.get("/skills");
await api.post("/users/me/skills", payload);
```

### `cn.ts` - Class Name Utility

Merge Tailwind CSS classes intelligently.

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage**:

```typescript
import { cn } from '@/lib/cn'

<div className={cn(
  'base-class',
  isActive && 'active-class',
  error ? 'error-class' : 'success-class'
)}>
  Content
</div>
```

### `skillsApi.ts` - Skills Endpoints

API functions for skill-related requests.

```typescript
import api from "./api";
import type { Skill, UserSkills, AddUserSkillInput } from "@/types/skills";

export async function fetchAllSkills(): Promise<Skill[]> {
  const response = await api.get("/skills");
  return response.data;
}

export async function fetchMySkills(): Promise<UserSkills> {
  const response = await api.get("/users/me/skills");
  return response.data;
}

export async function addUserSkill(input: AddUserSkillInput) {
  const response = await api.post("/users/me/skills", input);
  return response.data;
}
```

**Usage**:

```typescript
import { fetchAllSkills } from "@/lib/skillsApi";

const skills = await fetchAllSkills();
```

### `validation/signupSchema.ts` - Zod Schemas

Validation schemas for form data.

```typescript
import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
```

**Usage**:

```typescript
import { signupSchema } from "@/lib/validation/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(signupSchema),
});
```

### `passwordStrength.ts` - Password Strength Calculator

Evaluate password quality with visual feedback.

```typescript
export function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { label: "", color: "bg-white/10" },
    { label: "Weak", color: "bg-red-500" },
    { label: "Fair", color: "bg-yellow-500" },
    { label: "Good", color: "bg-emerald-400" },
    { label: "Strong", color: "bg-emerald-500" },
  ];
  return { score, ...map[score] };
}
```

**Usage**:

```typescript
import { getPasswordStrength } from "@/lib/passwordStrength";

const strength = getPasswordStrength("MyPassword123!");
// Returns: { score: 4, label: 'Strong', color: 'bg-emerald-500' }
```

### `inputStyles.ts` - Form Input Styling

Consistent dark-themed input styling.

```typescript
import { cn } from "./cn";

export function inputCls(hasError: boolean): string {
  return cn(
    "w-full h-11 rounded-xl border bg-white/5 px-4 text-sm text-white",
    "placeholder:text-white/25 outline-none transition-all",
    "focus:bg-white/8 focus:ring-2",
    hasError
      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
      : "border-white/10 focus:border-emerald-500/60 focus:ring-emerald-500/20",
  );
}
```

**Usage**:

```typescript
import { inputCls } from '@/lib/inputStyles'

<input
  type="text"
  className={inputCls(!!errors.email)}
/>
```

## Creating New Utilities

### Guidelines

1. **Single responsibility** - One utility per file
2. **Pure functions** - No side effects
3. **Well-typed** - Full TypeScript coverage
4. **Documented** - JSDoc comments
5. **Testable** - Easy to unit test

### Example: New Utility Function

```typescript
// lib/dateFormatter.ts
/**
 * Format a date to readable string
 * @param date The date to format
 * @param format The format template
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  format: "short" | "long" = "short",
): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: format === "long" ? "long" : "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
}
```

## Best Practices

### Avoid

```typescript
// ❌ Importing components in utils
import { Button } from "@/components/ui/Button";

// ❌ API calls in utils
export function fetchData() {
  return axios.get("/api/data");
}

// ❌ Direct localStorage access
localStorage.setItem("key", value);
```

### Prefer

```typescript
// ✅ Pure functions
export function formatPrice(price: number): string {
  return `$${(price / 100).toFixed(2)}`;
}

// ✅ Type-safe utilities
export function isEmpty<T>(value: T | null | undefined): boolean {
  return value === null || value === undefined;
}

// ✅ Helper for localStorage with types
export function getStorageValue<T>(key: string, fallback: T): T {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}
```

---

See [API_INTEGRATION.md](./API_INTEGRATION.md) for API-specific utilities.
