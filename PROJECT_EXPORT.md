# ProjectFlow - Complete Export for Bolt AI

## Project Overview
ProjectFlow is a comprehensive project management web application with Enterprise Admin features, BOQ management, vendor onboarding, and authentication system.

## 🚀 Key Features
- **Authentication System** - Complete login/logout with session management
- **Project Management** - Full project lifecycle management with tasks, timelines, and KPIs
- **Enterprise Admin Suite** - BOQ Management, Purchase Management, Onboarding, Approval System
- **Vendor Onboarding** - Multi-step onboarding with BOQ submission capabilities
- **Settings-based Navigation** - Configurable feature access (Pro/Enterprise features)
- **Responsive Design** - Modern UI with Tailwind CSS v4

## 🛠 Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)

## 📁 Project Structure
```
ProjectFlow/
├── App.tsx                     # Main application entry point
├── components/                 # React components
│   ├── ui/                     # shadcn/ui components (40+ components)
│   ├── data/                   # Mock data and stores
│   ├── enterprise/             # Enterprise admin components
│   ├── modals/                 # Modal components
│   ├── forms/                  # Form components
│   ├── kpi/                    # KPI and analytics components
│   └── utils/                  # Utility functions
├── styles/globals.css          # Tailwind v4 global styles + design tokens
└── tools/                      # Helper utilities
```

## 🔧 Setup Instructions for Bolt AI

### 1. Initialize Project
```bash
npm create vite@latest projectflow -- --template react-ts
cd projectflow
```

### 2. Install Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.445.0",
    "sonner": "^2.0.3",
    "motion": "^10.16.0",
    "recharts": "^2.10.0",
    "react-hook-form": "^7.55.0",
    "@radix-ui/react-*": "latest"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "@tailwindcss/vite": "^4.0.0-alpha.25",
    "tailwindcss": "^4.0.0-alpha.25"
  }
}
```

### 3. Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})
```

## 🎨 Design System
- **Base Font Size**: 14px
- **Colors**: Modern color palette with dark mode support
- **Typography**: Responsive typography system with consistent font weights
- **Components**: Accessible, reusable components with proper spacing
- **Animations**: Smooth transitions and micro-interactions

## 🔑 Key Components Overview

### Authentication
- `LoginPage.tsx` - Complete login system with form validation
- Session management with localStorage
- Demo account functionality

### Main Navigation
- Sidebar with collapsible functionality
- Settings-based feature visibility
- Enterprise admin section (when enabled)
- Quick actions and shortcuts

### Core Features
- **Project Overview** - Dashboard with project metrics
- **Task Management** - Task creation, phases, and tracking
- **Resource Allocation** - Team and resource management (Pro feature)
- **Budget Analysis** - Financial tracking (Pro feature)
- **Timeline/Gantt** - Visual project timelines

### Enterprise Features (Settings-controlled)
- **Admin Dashboard** - System overview
- **BOQ Management** - Bill of Quantity creation and approval
- **Purchase Management** - Purchase requests and orders
- **Onboarding Management** - Customer/vendor onboarding
- **Approval System** - Configurable workflows
- **Template Manager** - Document and email templates

### Data Management
- Mock data stores for development
- TypeScript interfaces for type safety
- Local state management with React hooks
- Notification system

## 🚦 Getting Started

### 1. Authentication Flow
- Login with demo credentials: `sarah.chen@projectflow.com` / `demo123`
- Or use the "Try Demo Account" button
- Session persists with "Remember me" option

### 2. Enable Enterprise Features
1. Go to Settings → Enable Enterprise Admin
2. Access Enterprise Admin features in sidebar
3. Test BOQ Management, Purchase Management, etc.

### 3. Test Onboarding System
- Use "Preview Onboarding" button in header
- Choose Customer or Vendor onboarding
- Test multi-step onboarding with BOQ submission

## 🔧 Configuration Options

### Settings System
The app uses a comprehensive settings system to control feature access:

```typescript
interface AppSettings {
  enableResourceAllocation: boolean;    // Pro feature
  enableBudgetAnalysis: boolean;        // Pro feature
  enableAdvancedFeatures: boolean;
  enableEnterpriseAdmin: boolean;       // Enterprise suite
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    sidebarCollapsed: boolean;
  };
}
```

### URL-based Onboarding
The app supports multiple onboarding URL patterns:
- Query params: `?uid=123&type=customer&inviter=Name`
- Demo mode: `?demo=onboarding&type=vendor`
- Path-based: `/user/customerview?uid=123`

## 🎯 Key Features to Highlight

### 1. BOQ (Bill of Quantity) System
- **Admin Interface**: Enterprise Admin → BOQ Management
- **Vendor Interface**: Integrated into vendor onboarding
- **Workflow**: Creation → HOD Approval → Purchase Request
- **Features**: Line items, cost calculations, document uploads

### 2. Comprehensive Onboarding
- **Multi-step Process**: Info → Documents → BOQ → Review
- **Type-specific**: Different flows for customers vs vendors
- **Integration**: BOQ submission built into vendor onboarding
- **URL Generation**: Generate invitation links with proper parameters

### 3. Modern UI/UX
- **Responsive Design**: Works on desktop and mobile
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: Optimized with proper React patterns
- **Animations**: Smooth transitions with Motion

## 🔍 Testing Scenarios

### Authentication
- Test login with demo credentials
- Test "Remember me" functionality
- Test logout and session clearing

### Project Management
- Create new projects and tasks
- Test resource allocation (when enabled)
- Test budget analysis (when enabled)
- View KPI dashboards and reports

### Enterprise Features
- Enable Enterprise Admin in settings
- Test BOQ creation and approval workflow
- Test purchase request creation
- Test onboarding management

### Onboarding System
- Generate onboarding links
- Test customer onboarding flow
- Test vendor onboarding with BOQ submission
- Test URL parameter detection

## 📝 Development Guidelines

### Code Quality
- TypeScript for type safety
- Consistent component structure
- Proper error handling
- Responsive design patterns

### State Management
- React hooks for local state
- localStorage for persistence
- Proper data flow patterns
- Type-safe interfaces

### UI/UX Best Practices
- Consistent spacing using Tailwind
- Proper loading states
- Error boundaries
- Accessibility considerations

## 🚀 Deployment Ready
- Vite build configuration
- TypeScript compilation
- Tailwind CSS optimization
- Asset optimization

---

**This export contains the complete ProjectFlow application with all features, components, and configurations needed to run and extend the application.**