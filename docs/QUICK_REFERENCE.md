# Quick Reference

## Project Quick Links

| Topic               | Document                                       | Purpose                                |
| ------------------- | ---------------------------------------------- | -------------------------------------- |
| 🚀 Getting Started  | [SETUP.md](./SETUP.md)                         | Installation and environment setup     |
| 📋 Project Layout   | [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Folder organization and structure      |
| 🏗️ Architecture     | [ARCHITECTURE.md](./ARCHITECTURE.md)           | System design and patterns             |
| 📖 Code Standards   | [CODE_STYLE.md](./CODE_STYLE.md)               | Naming, formatting, conventions        |
| ⚛️ State Management | [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)   | Zustand, React Query, useState         |
| 🪝 Custom Hooks     | [HOOKS.md](./HOOKS.md)                         | Available hooks and how to create them |
| 🧩 Components       | [COMPONENTS.md](./COMPONENTS.md)               | UI components and usage                |
| 📄 Pages            | [PAGES.md](./PAGES.md)                         | Route pages and flows                  |
| 🛠️ Utilities        | [UTILITIES.md](./UTILITIES.md)                 | Helper functions and libraries         |
| 🔌 API Integration  | [API_INTEGRATION.md](./API_INTEGRATION.md)     | Backend communication                  |
| 🧪 Testing          | [TESTING.md](./TESTING.md)                     | Test strategies and examples           |
| 🚢 Deployment       | [DEPLOYMENT.md](./DEPLOYMENT.md)               | Build and deploy instructions          |
| ❓ Troubleshooting  | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)     | Common issues and solutions            |
| 🤝 Contributing     | [CONTRIBUTING.md](./CONTRIBUTING.md)           | How to contribute                      |

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code style
npm run preview      # Preview production build

# Git workflow
git checkout -b feature/name    # Create feature branch
git commit -m "feat: description"  # Commit with convention
git push origin feature/name    # Push to your fork
# Then open Pull Request on GitHub
```

## File Naming Quick Guide

| Type      | Format                             | Example           |
| --------- | ---------------------------------- | ----------------- |
| Component | `PascalCase.tsx`                   | `UserCard.tsx`    |
| Hook      | `camelCase.ts` (with `use` prefix) | `useSkills.ts`    |
| Utility   | `camelCase.ts`                     | `api.ts`          |
| Type      | `camelCase.ts`                     | `auth.ts`         |
| Folder    | `camelCase` or `kebab-case`        | `src/components/` |

## Import Path Aliases

```typescript
// Use these shortcuts in imports
@/components    → src/components
@/hooks         → src/hooks
@/lib           → src/lib
@/store         → src/store
@/types         → src/types
@/pages         → src/pages
@/assets        → src/assets
```

## Code Structure Template

### New Page

```typescript
/**
 * MyPage.tsx — /my-page-route
 *
 * Brief description of the page
 */

import { useNavigate } from 'react-router-dom'
import { useMyHook } from '@/hooks/useMyHook'
import { MyComponent } from '@/components/MyComponent'

export default function MyPage() {
  const navigate = useNavigate()
  const { data, isLoading } = useMyHook()

  return (
    <div>
      {/* Content */}
    </div>
  )
}
```

### New Component

```typescript
/**
 * MyComponent — Brief description
 */

interface MyComponentProps {
  title: string
  onClick?: () => void
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div onClick={onClick}>
      {title}
    </div>
  )
}
```

### New Hook

```typescript
/**
 * useMyHook — Hook description
 */

export function useMyHook() {
  const [state, setState] = useState(false);

  return { state, setState };
}
```

## API Workflow

```
Component
    ↓
useQuery/useMutation (custom hook)
    ↓
API function (lib/api.ts)
    ↓
Axios client
    ↓
Backend
```

### Example

```typescript
// 1. Create API function
export async function fetchSkills() {
  const response = await api.get('/skills')
  return response.data
}

// 2. Create React Query hook
export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills
  })
}

// 3. Use in component
function MyComponent() {
  const { data: skills } = useSkills()
  return <div>{skills?.map(s => s.name)}</div>
}
```

## State Management Decision Tree

```
Is it user authentication?
├─ Yes → useAuthStore (Zustand)
└─ No  → Continue

Is it data from API?
├─ Yes → useQuery/useMutation (React Query)
└─ No  → Continue

Is it temporary UI state?
├─ Yes → useState (local state)
└─ No  → useAppStore (new Zustand store)
```

## Type Safety Checklist

- ✅ No `any` types
- ✅ Function parameters typed
- ✅ Function return values typed
- ✅ Component props interface exported
- ✅ Zod schema for form validation
- ✅ React Query type generics

## Performance Checklist

- ✅ useCallback for event handlers
- ✅ useMemo for expensive computations
- ✅ React Query caching configured
- ✅ Code splitting on routes (if needed)
- ✅ Lazy loading for non-critical components

## Code Review Checklist

Before submitting a PR:

- ✅ Follows [CODE_STYLE.md](./CODE_STYLE.md)
- ✅ TypeScript with no `any`
- ✅ No console.log() left
- ✅ Meaningful variable names
- ✅ JSDoc for public APIs
- ✅ Commit messages follow convention
- ✅ Tests added/updated
- ✅ Documentation updated

## Environment Variables

Create `.env.local`:

```env
# Backend API
VITE_API_URL=http://localhost:3000/api

# Optional - Debug mode
VITE_DEBUG=false

# Optional - Analytics
VITE_ANALYTICS_ID=
```

## Useful Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Guide](https://reactrouter.com/en/main)
- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Zod Documentation](https://zod.dev)

## Need Help?

1. **Setup issues?** → [SETUP.md](./SETUP.md)
2. **Understanding structure?** → [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
3. **Code style questions?** → [CODE_STYLE.md](./CODE_STYLE.md)
4. **Component usage?** → [COMPONENTS.md](./COMPONENTS.md)
5. **Hook questions?** → [HOOKS.md](./HOOKS.md)
6. **API questions?** → [API_INTEGRATION.md](./API_INTEGRATION.md)
7. **Common issues?** → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
8. **Want to contribute?** → [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Last Updated**: March 14, 2026
