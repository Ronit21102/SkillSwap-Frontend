# API Integration

## Backend API Overview

The frontend communicates with a REST API backend for data and authentication.

### Base Configuration

**Environment Variable**: `VITE_API_URL`

```env
# Development
VITE_API_URL=http://localhost:3000/api

# Production
VITE_API_URL=https://api.skillswap.com/api
```

### Axios Client Setup

Located in `src/lib/api.ts`:

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
```

## API Endpoints

### Authentication

#### Sign Up

```typescript
POST /auth/signup

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "user": {
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### Login

```typescript
POST /auth/login

Request:
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "user": { ... },
  "token": "jwt_token_here"
}
```

#### Google OAuth

```typescript
GET / auth / google;
```

### Skills

#### Get All Skills

```typescript
GET /skills

Response:
[
  {
    "id": "skill-1",
    "name": "Guitar",
    "category": "Music",
    "description": "Learn to play guitar"
  },
  ...
]
```

#### Get User's Skills

```typescript
GET /users/me/skills

Response:
{
  "teach": ["skill-1", "skill-2"],
  "learn": ["skill-3"]
}
```

#### Add User Skill

```typescript
POST /users/me/skills

Request:
{
  "skillId": "skill-1",
  "type": "TEACH" | "LEARN"
}

Response:
{
  "success": true
}
```

#### Remove User Skill

```typescript
DELETE /users/me/skills/:skillId?type=TEACH|LEARN
```

### Users

#### Get Current User

```typescript
GET /users/me

Response:
{
  "id": "user-123",
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Passionate about learning",
  "skills": { ... }
}
```

#### Update Profile

```typescript
PUT /users/me

Request:
{
  "name": "John Doe",
  "bio": "Updated bio",
  "avatar": "url_to_avatar"
}
```

#### Get User by ID

```typescript
GET /users/:userId
```

### Making API Calls

#### Using the API Client Directly

```typescript
import api from "@/lib/api";

// GET request
const response = await api.get("/skills");
const skills = response.data;

// POST request
const response = await api.post("/users/me/skills", {
  skillId: "skill-123",
  type: "TEACH",
});

// PUT request
await api.put("/users/me", {
  name: "Updated Name",
});

// DELETE request
await api.delete("/users/me/skills/skill-123");
```

#### Using API Functions with React Query

Create API functions in `lib/skillsApi.ts`:

```typescript
import api from "./api";
import type { Skill } from "@/types/skills";

export async function fetchAllSkills(): Promise<Skill[]> {
  const response = await api.get("/skills");
  return response.data;
}

export async function addUserSkill(input: {
  skillId: string;
  type: "TEACH" | "LEARN";
}): Promise<void> {
  await api.post("/users/me/skills", input);
}
```

Use in hooks:

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAllSkills, addUserSkill } from "@/lib/skillsApi";

export function useAllSkills() {
  return useQuery({
    queryKey: ["skills", "all"],
    queryFn: fetchAllSkills,
    staleTime: 10 * 60 * 1000,
  });
}

export function useAddUserSkill() {
  return useMutation({
    mutationFn: addUserSkill,
  });
}
```

## Error Handling

### Error Types

```typescript
interface ApiError {
  response: {
    status: number;
    data: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
}
```

### Handling Errors

```typescript
import axios from "axios";

try {
  await api.post("/auth/signup", data);
} catch (error) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 400) {
      // Validation error
      console.error("Validation errors:", error.response?.data?.errors);
    } else if (status === 409) {
      // Conflict (e.g., email already exists)
      console.error("Email already registered");
    } else if (status === 500) {
      // Server error
      console.error("Server error:", message);
    }
  }
}
```

### Error Handling in Mutations

```typescript
const mutation = useMutation({
  mutationFn: addUserSkill,
  onError: (error) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      setError(message || "Failed to add skill");
    }
  },
});
```

## Status Codes

| Code | Meaning      | Action                                |
| ---- | ------------ | ------------------------------------- |
| 200  | OK           | Process success response              |
| 201  | Created      | Resource created successfully         |
| 400  | Bad Request  | Show validation errors                |
| 401  | Unauthorized | Redirect to login                     |
| 403  | Forbidden    | Show access denied message            |
| 404  | Not Found    | Handle missing resource               |
| 409  | Conflict     | Handle duplicate (e.g., email exists) |
| 500  | Server Error | Show generic error message            |

## Request/Response Examples

### Example: Sign Up

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '@/lib/validation/signupSchema'
import api from '@/lib/api'

function SignupForm() {
  const form = useForm({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/signup', {
        name: data.name,
        email: data.email,
        password: data.password
      })

      // Save token
      localStorage.setItem('auth_token', response.data.token)

      // Redirect
      navigate('/skills/setup')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        form.setError('email', {
          message: error.response?.data?.message
        })
      }
    }
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* ... */}</form>
}
```

### Example: Fetch Data with React Query

```typescript
import { useQuery } from '@tanstack/react-query'
import { fetchAllSkills } from '@/lib/skillsApi'

function SkillsList() {
  const { data: skills, isLoading, error } = useQuery({
    queryKey: ['skills', 'all'],
    queryFn: fetchAllSkills
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {skills?.map(skill => (
        <li key={skill.id}>{skill.name}</li>
      ))}
    </ul>
  )
}
```

## Authentication

### Token Storage

Tokens are stored in localStorage with key `auth_token`.

```typescript
// Get token
const token = localStorage.getItem("auth_token");

// Save token
localStorage.setItem("auth_token", token);

// Clear token (logout)
localStorage.removeItem("auth_token");
```

### Authorization Header

Automatically added by the request interceptor:

```
Authorization: Bearer <token>
```

### Refresh Token Flow

If the backend implements refresh tokens:

```typescript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/auth/refresh");
        localStorage.setItem("auth_token", data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
```

## Best Practices

### Do's

```typescript
// ✅ Use TypeScript types for API responses
interface SkillResponse {
  id: string
  name: string
  category: string
}

// ✅ Handle both success and error cases
try {
  const data = await api.get('/endpoint')
} catch (error) {
  // Handle error
}

// ✅ Use React Query for server state
const { data, isLoading, error } = useQuery(...)

// ✅ Validate response data
const parsedData = skillSchema.parse(response.data)
```

### Don'ts

```typescript
// ❌ Don't make API calls directly in components
function Bad() {
  api.get('/data')  // Don't do this
}

// ❌ Don't ignore error states
const { data } = useQuery(...)  // Missing error handling

// ❌ Don't mix concurrent API calls without proper handling
// Make sure to handle race conditions

// ❌ Don't store sensitive data in localStorage
localStorage.setItem('user_password', password)  // Never do this
```

---

See [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) for data management patterns.
