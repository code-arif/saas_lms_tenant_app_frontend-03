# LMS Tenant Admin Portal

A modern, feature-rich administration dashboard for educational platform tenants. Built with React 19, TypeScript, and Vite, this application provides a comprehensive suite of tools for managing courses, students, instructors, and analytics.

## 🚀 Features

- **📊 Dashboard:** Real-time overview of revenue, enrollments, and platform activity.
- **📚 Course Management:** Full CRUD operations for courses, including status tracking (Draft, Published, Archived).
- **👥 User Management:** Manage both Students and Instructors with dedicated tables and invite systems.
- **📈 Analytics:** Deep insights into revenue trends, course performance, and student engagement using Recharts.
- **💳 Subscription & Billing:** Manage tenant plans and view billing history.
- **⚙️ Settings & Branding:** Customizable platform settings, including branding (logos, colors) and domain configuration.
- **🔐 Secure Auth:** Protected routes and session management using JWT.
- **🌓 Theme Support:** Built-in Dark and Light mode support via `next-themes`.

## 🛠️ Tech Stack

- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/) (custom implementation)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Routing:** [React Router 7](https://reactrouter.com/)

## 📂 Project Structure

The project follows a **feature-based architecture** to ensure scalability and maintainability:

```text
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Shared UI, layout, and common components
├── config/          # Global configurations (QueryClient, etc.)
├── constants/       # Enums, route paths, and static data
├── features/        # Feature-specific logic (The core of the app)
│   ├── [feature]/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
├── hooks/           # Shared custom hooks
├── pages/           # Page components (routing entry points)
├── routes/          # Route definitions and guards
├── services/        # Global API client and base services
├── store/           # Global state stores (Zustand)
├── types/           # Global TypeScript definitions
└── utils/           # Helper functions and utilities
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create a `.env` file in the root directory (refer to `.env.example` if available):
   ```env
   VITE_API_URL=http://api.lms.test/api/v1
   ```

### Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Lint the project:
```bash
npm run lint
```

## 🔧 API Integration

The application communicates with a backend API (defaulting to `http://api.lms.test/api/v1`). Authentication is handled via Bearer tokens stored in local storage. Interceptors are in place to handle token injection and automatic logout on 401 responses.

## 📝 License

This project is private and intended for use within the LMS platform ecosystem.
