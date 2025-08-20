# Quick Setup Guide for Bolt AI

## 1. Core Files to Import

### Essential Files (Copy these first):
1. `App.tsx` - Main application component
2. `styles/globals.css` - Tailwind v4 configuration and design tokens
3. `components/LoginPage.tsx` - Authentication system
4. `components/data/dataStore.ts` - Mock data and TypeScript interfaces

### UI Components (Copy entire directory):
- `components/ui/` - All shadcn/ui components (40+ files)

### Main Feature Components:
- `components/ProjectOverview.tsx`
- `components/OnboardingLanding.tsx`
- `components/enterprise/BOQManagement.tsx`
- `components/Settings.tsx`

## 2. Package Dependencies

```bash
npm install react@18 react-dom@18 typescript
npm install lucide-react sonner motion recharts
npm install react-hook-form@7.55.0
# Add all @radix-ui components as needed
```

## 3. Vite + Tailwind v4 Setup

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## 4. Key Features to Test

1. **Login**: Demo credentials or "Try Demo Account"
2. **Settings**: Enable Enterprise Admin features
3. **BOQ System**: Enterprise Admin → BOQ Management
4. **Onboarding**: Preview Onboarding → Test flows
5. **Navigation**: Settings-based feature access

## 5. URL Parameters for Testing

```
# Customer Onboarding
?uid=test123&type=customer&inviter=Sarah%20Chen

# Vendor Onboarding  
?uid=test456&type=vendor&inviter=Sarah%20Chen

# Demo Mode
?demo=onboarding&type=customer
```

## 6. Important Notes

- **Tailwind v4**: Uses new @theme inline syntax
- **shadcn/ui**: Uses latest Radix UI components
- **TypeScript**: Strict mode enabled
- **State**: Local state + localStorage persistence
- **Mock Data**: All functionality works with mock data

---

**Start with App.tsx and globals.css, then add components as needed. The application is fully functional with mock data.**