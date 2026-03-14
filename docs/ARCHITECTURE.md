# Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React/TypeScript)              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │    Hooks     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Store     │  │   Utilities  │  │     Types    │      │
│  │  (Zustand)   │  │   (lib/*)    │  │   (types/*)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │      API Client (Axios + React Query)               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────┐
                    │  Backend API    │
                    │  (Node.js/REST) │
                    └─────────────────┘
```

## Layered Architecture

### 1. **Presentation Layer** (Pages & Components)

- React components for UI rendering
- Form handling with React Hook Form
- Animations with Framer Motion
- Styling with Tailwind CSS

### 2. **State Management Layer**

- **Zustand Store**: Authentication state
- **React Query**: Server state (skills, profiles)
- **Component Local State**: Form state, UI toggles

### 3. **Business Logic Layer**

- Custom hooks (useSkills, useSkillSetup, etc.)
- Validation schemas (Zod)
- Utility functions
- Data transformations

### 4. **Data Access Layer**

- Axios client configuration
- API endpoints
- Request/response interceptors
- Error handling

## Data Flow

### Authentication Flow

```
Sign Up Page
    ↓
useForm (React Hook Form)
    ↓
Validation (signupSchema - Zod)
    ↓
API Call (signup)
    ↓
Zustand Store (authStore)
    ↓
Update Local State
    ↓
Navigate to Skill Setup
```

### Data Fetching Flow

```
Component Mount
    ↓
useQuery Hook (React Query)
    ↓
API Call (axios)
    ↓
Cache & Update UI
    ↓
Handle Loading/Error States
```

## Key Architectural Patterns

### 1. **Custom Hooks Pattern**

Encapsulate logic into reusable hooks:

```typescript
// useSkillSetup.ts - Manages skill selection state
// useSkills.ts - Manages skill data fetching
// useAllSkills() - Fetch all available skills
// useAddUserSkill() - Mutation for adding skills
```

### 2. **Store-Based State Management**

```typescript
// authStore.ts
-signup(credentials) - login(credentials) - logout() - clearError();
```

### 3. **Validation & Type Safety**

```typescript
// Zod schemas define validation and types
const signupSchema = z.object({...})
type SignupFormValues = z.infer<typeof signupSchema>
```

### 4. **Separation of Concerns**

- **Pages**: Route handlers, high-level orchestration
- **Components**: Reusable UI elements
- **Hooks**: Business logic and state
- **Lib**: Utilities and pure functions
- **Types**: TypeScript definitions

## Folder Structure Philosophy

```
src/
├── pages/          → Route-specific containers
├── components/     → Reusable UI components
├── hooks/          → Custom React hooks
├── lib/            → Utilities & helpers
├── store/          → Global state (Zustand)
├── types/          → TypeScript definitions
└── assets/         → Static files
```

Each folder has a single responsibility and clear import boundaries.

## State Management Strategy

### Local State (useState)

- Form input values
- UI toggles (modals, sidebars)
- Temporary UI states

### Store State (Zustand)

- User authentication
- User profile
- Global preferences

### Server State (React Query)

- Skills catalog
- User skills
- Profiles
- Messages
- Any data from backend

## API Integration Strategy

### Request Flow

```
Component
    ↓
Hook (useQuery/useMutation)
    ↓
API Function (lib/api.ts)
    ↓
Axios Client
    ↓
Backend
    ↓
Response
    ↓
React Query Cache
    ↓
Component Update
```

### Error Handling

- 401: Redirect to login
- 403: Access denied
- 4xx: Show user message
- 5xx: Retry with backoff

## Performance Considerations

### Code Splitting

- Route-based code splitting with React Router
- Lazy loading for non-critical components

### Caching Strategy

- React Query handles server state caching
- Stale time configured per endpoint
- Invalidation on mutations

### Memoization

- useCallback for event handlers
- useMemo for expensive computations
- Prevent unnecessary re-renders

## Security Measures

### Authentication

- Token-based (JWT)
- Secure HTTP-only cookies
- Refresh token rotation

### Authorization

- Protected routes
- Role-based access (if needed)
- Backend validation

### Input Validation

- Client-side: Zod schemas
- Server-side: API validation

---

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed folder breakdown.
