# Setup & Installation

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js**: 18.x or higher (check with `node --version`)
- **npm**: 9.x or higher (check with `npm --version`)
- **Git**: For cloning the repository
- **Code Editor**: VS Code recommended

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Ronit21102/SkillSwap-Frontend.git
cd SkillSwap-Frontend
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`.

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api

# Google OAuth (if applicable)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Optional: Enable debug mode
VITE_DEBUG=false
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

### Development

```bash
npm run dev
```

Starts Vite dev server with hot module replacement (HMR).

### Building

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

### Type Checking

```bash
npm run build
```

Runs TypeScript compiler before build (included in build command).

### Linting

```bash
npm run lint
```

Checks code style with ESLint.

### Preview

```bash
npm run preview
```

Previews the production build locally.

## Project Dependencies

### Core Framework

- **react**: ^19.2.0 - UI library
- **react-dom**: ^19.2.0 - React rendering engine
- **react-router-dom**: ^7.13.1 - Client-side routing

### State Management

- **zustand**: ^5.0.11 - Simple state management
- **@tanstack/react-query**: ^5.90.21 - Server state management

### Form Handling

- **react-hook-form**: ^7.71.2 - Form state management
- **@hookform/resolvers**: ^5.2.2 - Form resolver adapters
- **zod**: ^4.3.6 - TypeScript-first schema validation

### Styling

- **tailwindcss**: ^4.2.1 - Utility-first CSS framework
- **@tailwindcss/vite**: ^4.2.1 - Vite integration for Tailwind
- **tailwind-merge**: ^3.5.0 - Merge Tailwind classes
- **clsx**: ^2.1.1 - Conditional className helper

### UI & Animations

- **framer-motion**: ^12.35.0 - React animation library
- **lucide-react**: ^0.576.0 - Icon library
- **class-variance-authority**: ^0.7.1 - Variant component builder

### API & HTTP

- **axios**: ^1.13.6 - HTTP client

### Development Tools

- **typescript**: ~5.9.3 - TypeScript compiler
- **vite**: ^7.3.1 - Build tool
- **@vitejs/plugin-react**: ^5.1.1 - React plugin for Vite
- **eslint**: ^9.39.1 - Code linter
- **tailwindcss**: ^4.2.1 - CSS framework

## IDE Setup (VS Code Recommended)

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets**
   - Publisher: dsznajder.es7-react-js-snippets
   - Provides quick snippets for React components

2. **Tailwind CSS IntelliSense**
   - Publisher: bradlc.vscode-tailwindcss
   - Autocomplete for Tailwind classes

3. **TypeScript Vue Plugin (Volar)**
   - Publisher: Vue.official
   - Better TypeScript support

4. **ESLint**
   - Publisher: dbaeumer.vscode-eslint
   - Real-time linting

5. **Prettier**
   - Publisher: esbenp.prettier-vscode
   - Code formatter

### Settings (`.vscode/settings.json`)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Common Issues

### Issue: Port 5173 already in use

**Solution**:

```bash
npm run dev -- --port 3000
```

### Issue: Dependencies not installing

**Solution**:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors

**Solution**:

```bash
npm run build
```

Check the error output and fix according to TypeScript compiler messages.

### Issue: Vite cache issues

**Solution**:

```bash
rm -rf .vite
npm run dev
```

## Next Steps

1. Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) to understand folder organization
2. Check [CODE_STYLE.md](./CODE_STYLE.md) for development standards
3. Review [PAGES.md](./PAGES.md) to understand available routes
4. Start with modifying components in `src/components/`

---

For troubleshooting, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
