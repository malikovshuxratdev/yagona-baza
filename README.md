# Yagona baza - React TypeScript Application

Yagona baza – React, TypeScript va Vite asosida qurilgan boshqaruv paneli. This project provides a comprehensive admin dashboard with authentication, routing, and state management capabilities.

## 🚀 Tech Stack

### Core Technologies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing

### UI & Styling
- **Ant Design (antd)** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Montserrat** - Custom font family

### State Management & Data Fetching
- **Redux Toolkit** - State management
- **TanStack Query (React Query)** - Server state management and data fetching
- **React Hook Form** - Form handling
- **Yup** & **Zod** - Form validation

### Additional Libraries
- **Axios** - HTTP client with interceptors
- **Firebase** - Backend services integration
- **i18next** - Internationalization
- **React Leaflet** - Maps integration
- **Recharts** & **@ant-design/plots** - Data visualization
- **React Quill** - Rich text editor
- **Moment.js** - Date manipulation

## 📁 Project Structure

```
src/
├── api/              # API client and helpers
├── assets/           # Static assets (fonts, images)
├── components/       # Reusable components
├── constants/        # Application constants
├── helpers/          # Utility functions
├── hooks/            # Custom React hooks
├── layout/           # Layout components
│   ├── admin-layout/ # Admin dashboard layout
│   └── home-layout/  # Home page layout
├── pages/            # Page components
│   ├── dashboard/    # Dashboard page
│   ├── home/         # Home page
│   └── not-found/    # 404 page
├── routes/           # Route configuration
├── utils/            # Utility functions
└── App.tsx           # Root component
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-loyiha
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_BASE_URL=your_api_base_url
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type check TypeScript files

## 🏗️ Features

### Layouts
- **Admin Layout**: Sidebar navigation with collapsible menu, navbar, and main content area
- **Home Layout**: Simple layout for public pages

### Routing
- Public routes (Home page)
- Protected admin routes (Dashboard)
- 404 Not Found page

### API Integration
- Axios-based HTTP client with interceptors
- Automatic token attachment to requests
- Error handling and token refresh logic
- Singleton pattern for API client

### State Management
- Redux Toolkit for global state
- React Query for server state and caching
- Local storage utilities for session management

## 🔧 Configuration

### Vite Configuration
- Path aliases configured (`@/` maps to `src/`)
- React plugin enabled
- Development server on port 5173

### TypeScript
- Strict type checking enabled
- Path aliases configured in `tsconfig.json`

### ESLint
- React hooks rules enabled
- React refresh plugin configured

## 📦 Key Dependencies

See `package.json` for the complete list of dependencies.

## 🌐 Internationalization

The project uses i18next for multi-language support with browser language detection.

## 🔐 Authentication

The application includes:
- Token-based authentication
- Automatic token refresh on 401 errors
- Token storage utilities
- Protected route handling

## 📝 Development Notes

- Uses lazy loading for route components to improve performance
- Suspense boundaries for loading states
- Custom hooks for common patterns
- Helper functions for data formatting and conversion

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and type checking
4. Submit a pull request

## 📄 License

This project is private and proprietary.
# yagona-baza
