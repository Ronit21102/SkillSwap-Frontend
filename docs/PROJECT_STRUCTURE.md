# Project Structure

## Directory Overview

```
SkillSwap-Frontend/
├── src/
│   ├── pages/              # Route-level components
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   ├── store/              # Global state (Zustand)
│   ├── types/              # TypeScript type definitions
│   ├── assets/             # Static files
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles
│   └── App.css             # App styles
├── public/                 # Public assets
├── docs/                   # Documentation
├── .eslintrc.js            # ESLint configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
├── README.md               # Project readme
└── index.html              # HTML entry point
```

## Detailed Folder Breakdown

### `/src/pages`

Route-level components that correspond to application routes.

```
pages/
├── LandingPage.tsx         # /
├── LoginPage.tsx           # /login
├── SignupPage.tsx          # /signup
├── OnboardingPage.tsx      # /onboarding
├── SkillSetupPage.tsx      # /skills/setup
├── DashboardPage.tsx       # /dashboard
├── ProfilePage.tsx         # /profile
├── ExplorePage.tsx         # /explore
├── ChatPage.tsx            # /chat
├── SchedulePage.tsx        # /schedule
└── SettingsPage.tsx        # /settings
```

**Purpose**: Each page is a container component that:

- Manages route-specific logic
- Orchestrates custom hooks
- Manages page-level state
- Renders layout and child components

**Guidelines**:

- Keep pages focused on layout and orchestration
- Delegate UI to reusable components
- Extract complex logic to custom hooks

### `/src/components`

Reusable, self-contained UI components organized by category.

```
components/
├── aceternity/             # Third-party UI library components
│   ├── AuroraBackground.tsx
│   ├── BackgroundBeams.tsx
│   ├── BentoGrid.tsx
│   ├── CardHoverEffect.tsx
│   ├── FlipWords.tsx
│   ├── FloatingNav.tsx
│   ├── GlowingStars.tsx
│   ├── GridBackground.tsx
│   ├── InfiniteMovingCards.tsx
│   ├── LampEffect.tsx
│   ├── MovingBorder.tsx
│   ├── SparklesText.tsx
│   ├── SpotlightNew.tsx
│   ├── TextGenerateEffect.tsx
│   ├── TypewriterEffect.tsx
│   └── WobbleCard.tsx
├── auth/                   # Authentication components
│   └── ProtectedRoute.tsx
├── layout/                 # Layout components
│   ├── AppLayout.tsx       # Main app layout
│   ├── AuthLayout.tsx      # Auth pages layout
│   ├── MobileNav.tsx       # Mobile navigation
│   ├── Navbar.tsx          # Top navigation
│   └── Sidebar.tsx         # Sidebar navigation
├── skills/                 # Skill-related components
│   ├── SkillSelector.tsx   # Skill selection UI
│   └── SkillTag.tsx        # Individual skill tag
└── ui/                     # Basic UI components
    ├── Avatar.tsx
    ├── Badge.tsx
    ├── Button.tsx
    └── Card.tsx
```

**Purpose**: Reusable UI building blocks

**Guidelines**:

- Single responsibility principle
- Accept data via props
- No direct API calls (use hooks in parent)
- Fully self-contained styling

### `/src/hooks`

Custom React hooks for logic extraction and reusability.

```
hooks/
├── useSkills.ts            # Skill data fetching hooks
│   ├── useAllSkills()      - Fetch all skills
│   ├── useMySkills()       - Fetch user's skills
│   └── useAddUserSkill()   - Add skill mutation
└── useSkillSetup.ts        # Skill setup page logic
    ├── State management
    ├── Add/remove handlers
    └── Validation
```

**Purpose**: Encapsulate business logic and state management

**Guidelines**:

- Extract logic from components
- Reuse across multiple components
- Keep hooks focused on single responsibility
- Use TypeScript for type safety

### `/src/lib`

Pure functions, utilities, and configuration.

```
lib/
├── api.ts                  # Axios client configuration
├── cn.ts                   # Tailwind class utility
├── skillsApi.ts            # Skill API endpoints
├── validation/
│   └── signupSchema.ts     # Zod validation schemas
├── passwordStrength.ts     # Password strength calculator
└── inputStyles.ts          # Form input styling utilities
```

**Purpose**: Reusable utility functions and configurations

**Guidelines**:

- Pure functions (no side effects)
- Utility first approach
- Well-documented with JSDoc
- No component imports

### `/src/store`

Global state management using Zustand.

```
store/
└── authStore.ts            # Authentication state
    ├── signup()
    ├── login()
    ├── logout()
    ├── clearError()
    └── state: user, isLoading, error
```

**Purpose**: Centralized global state

**Guidelines**:

- Minimal, focused stores
- Use for truly global data
- Prefer React Query for server state
- Prefer local state for component state

### `/src/types`

TypeScript type definitions and interfaces.

```
types/
├── auth.ts                 # Auth-related types
│   ├── User
│   ├── AuthState
│   └── Credentials
├── skills.ts               # Skill-related types
│   ├── Skill
│   ├── UserSkills
│   └── AddUserSkillInput
└── api.ts                  # API response types
```

**Purpose**: Centralized type definitions

**Guidelines**:

- One type file per domain
- Export interfaces not types
- Well-documented with comments
- Reuse across codebase

### `/src/assets`

Static files like images, icons, fonts.

```
assets/
└── (static files)
```

## Import Path Aliases

TypeScript paths configured in `tsconfig.json`:

```typescript
// Instead of:
import { Button } from "../../../components/ui/Button";

// Use:
import { Button } from "@/components/ui/Button";
```

Available aliases:

- `@/` → `src/`
- `@/components` → `src/components`
- `@/hooks` → `src/hooks`
- `@/lib` → `src/lib`
- `@/store` → `src/store`
- `@/types` → `src/types`
- `@/pages` → `src/pages`

## Code Organization Principles

### Single Responsibility Principle

- Each file has one reason to change
- Each folder serves one purpose

### DRY (Don't Repeat Yourself)

- Extract reusable logic to hooks
- Extract reusable components
- Use utility functions

### Separation of Concerns

- Pages: Orchestration
- Components: UI rendering
- Hooks: Business logic
- Lib: Pure utilities
- Store: Global state
- Types: Data structures

### Dependency Direction

```
Pages ← Components ← Hooks ← Lib/Utils
         ↓
      Types/Store
```

Pages depend on everything, but utilities don't depend on anything.

---

See [CODE_STYLE.md](./CODE_STYLE.md) for naming conventions and best practices.
