# ProjectFlow 

A comprehensive project management web application with Enterprise Admin features, BOQ management, and vendor onboarding capabilities.

## 🚀 Features

### Core Project Management
- **Project Overview Dashboard** - Comprehensive project tracking and analytics
- **Project Creation & Management** - Full project lifecycle management
- **Task & Phase Management** - Detailed task tracking with phases
- **Timeline & Gantt Charts** - Visual project timeline management
- **KPI & Reports** - Advanced analytics and reporting
- **Resource Allocation** - Team and resource management (Pro feature)
- **Budget Analysis** - Financial tracking and analysis (Pro feature)

### Enterprise Admin Features
- **Admin Dashboard** - System overview and administration
- **Onboarding Management** - Customer and vendor onboarding
- **BOQ Management** - Bill of Quantity creation, review, and approval
- **Purchase Management** - Purchase requests and order management
- **Approval System** - Configurable approval workflows
- **Template Manager** - Email and document template management
- **Link Generator** - Generate onboarding links for customers and vendors

### BOQ (Bill of Quantity) System
- **BOQ Creation & Management** - Create detailed bills of quantity
- **Vendor BOQ Submission** - Vendors can submit detailed quotations during onboarding
- **Approval Workflows** - HOD approval → Purchase Request creation
- **Cost Estimation** - Comprehensive cost breakdown and calculations
- **Integration** - Seamless integration between BOQ approval and purchase requests

### Authentication & Security
- **Professional Login System** - Form validation, session management
- **Demo Account** - Try the system with `sarah.chen@projectflow.com` / `demo123`
- **Session Persistence** - Remember me functionality with localStorage
- **Role-based Access** - Settings-controlled feature access

### Additional Features
- **Billing & Subscription Management** - SaaS billing and plan management
- **Organization Management** - Team, workspace, and org settings
- **Help & Support System** - Comprehensive help and support
- **Settings-based Navigation** - Configurable feature access
- **Responsive Design** - Works on desktop and mobile
- **Real-time Notifications** - Toast notifications and notification panel
- **Search & Shortcuts** - Global search and keyboard shortcuts

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 with design tokens
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **Build Tool**: Vite
- **Form Management**: React Hook Form

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/projectflow.git
   cd projectflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Getting Started

### 1. Login to the System
- **Demo Account**: Use the "Try Demo Account" button
- **Manual Login**: `sarah.chen@projectflow.com` / `demo123`
- **Remember Me**: Check to persist session

### 2. Enable Enterprise Features
1. Click **Settings** in the sidebar (or press `Cmd/Ctrl + ,`)
2. Toggle **"Enable Enterprise Admin"** 
3. Save settings
4. Access Enterprise Admin features in the sidebar

### 3. Test BOQ Management
1. **Enable Enterprise Admin** (see above)
2. Go to **Enterprise Admin** → **"BOQ Management"**
3. Create, edit, and manage Bills of Quantity
4. Test approval workflows and purchase request creation

### 4. Test Vendor BOQ Submission
1. Click **"Preview Onboarding"** in the header
2. Select **"Vendor Onboarding"**
3. Complete the multi-step onboarding process
4. Submit detailed BOQ in the "BOQ Submission" step

## 🔧 Configuration

### Settings-Based Features
The application uses a settings system to control feature access:

- **Resource Allocation**: Pro subscription feature
- **Budget Analysis**: Pro subscription feature  
- **Enterprise Admin**: Complete enterprise administration suite

### BOQ Workflow
1. **BOQ Creation**: User department creates BOQ
2. **HOD Approval**: Department head approves BOQ
3. **Purchase Request**: Create PR based on approved BOQ
4. **Vendor Integration**: Vendors submit BOQs during onboarding

### URL-based Onboarding
Test onboarding with these URL patterns:
```
# Customer Onboarding
?uid=test123&type=customer&inviter=Sarah%20Chen

# Vendor Onboarding
?uid=test456&type=vendor&inviter=Sarah%20Chen

# Demo Mode
?demo=onboarding&type=customer
```

## ⌨️ Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open search
- `Cmd/Ctrl + N` - New project
- `Cmd/Ctrl + T` - New task
- `Cmd/Ctrl + M` - New team member
- `Cmd/Ctrl + U` - Preview onboarding
- `Cmd/Ctrl + ,` - Open settings

## 🏗 Project Structure

```
src/
├── App.tsx                     # Main application component
├── components/
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   ├── data/                   # Data stores and mock data
│   ├── enterprise/             # Enterprise admin components
│   ├── modals/                 # Modal components
│   ├── forms/                  # Form components
│   └── kpi/                    # KPI and analytics components
├── styles/
│   └── globals.css             # Global styles and Tailwind config
└── tools/
    └── unsplash.ts             # Image utilities
```

## 🎨 Design System

The application uses a comprehensive design system with:
- **Color Tokens**: Consistent color palette with dark mode support
- **Typography**: Responsive typography system with base font size 14px
- **Components**: Accessible, reusable components
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and animations

## 📱 Responsive Design

- **Desktop-first**: Optimized for desktop workflows
- **Mobile-friendly**: Responsive design for mobile access
- **Touch-friendly**: Appropriate touch targets and interactions

## 🔐 Security Features

- **Role-based Access**: Settings-controlled feature access
- **Data Validation**: Comprehensive form validation
- **Secure Onboarding**: Verified invitation system
- **Enterprise Security**: Professional security standards

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the in-app Help & Support section
- Contact: support@projectflow.com

---

**ProjectFlow** - Streamline your project management and boost productivity! 🚀