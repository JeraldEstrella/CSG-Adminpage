# Admin Dashboard Application

This is a responsive admin dashboard built with React, TypeScript, and Vite. It provides a comprehensive interface for managing various administrative tasks including user management, content moderation, analytics, and system settings.

## Technology Stack

- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM for client-side routing and URL parameter management
- **Styling**: Custom CSS with responsive design
- **Charts/Graphs**: Chart.js for data visualization
- **State Management**: React Query (@tanstack/react-query) for server state management

## Key Features Implemented

### 1. Authentication System
- **Login Page**: Secure admin login with form validation
- **Forgot Password**: Password recovery functionality
- **Protected Routes**: Route protection to ensure only authenticated users can access admin features

### 2. Dashboard Analytics
- **Interactive Charts**: Bar charts and line charts using Chart.js for data visualization
- **Recent Activity**: Display of recent user actions and system events
- **Key Metrics**: Overview of important statistics and KPIs

### 3. User Management
- **Contributors Management**: View and manage system contributors
- **User Profiles**: Avatar components for user representation
- **Access Control**: Modals for pausing user access

### 4. Content Management
- **Documents**: Document management interface
- **Announcements**: System-wide announcement management
- **Audit Logs**: Comprehensive logging of system activities

### 5. System Settings
- **General Settings**: Core system configuration
- **Whitelist Management**: Control access through whitelisting
- **Security Settings**: User permissions and access controls

### 6. Reusable Components
- **Modals**: Confirmation, deletion, and access control modals
- **Forms**: Reusable form components with validation
- **Filters**: Data filtering and search functionality
- **Sidebar Navigation**: Responsive navigation with panel switching

### 7. Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Layout**: Sidebar and content panels adjust to viewport
- **Touch-Friendly**: Interactive elements designed for touch devices

## Project Structure

```
src/
├── admin-loginpage/          # Authentication pages
│   ├── forgot/              # Password recovery
│   └── login/               # Admin login
├── components/              # Reusable UI components
│   ├── avatar/              # User avatar components
│   ├── charts/              # Chart components (bar, line, recents)
│   ├── filter/              # Data filtering
│   ├── form/                # Form components
│   ├── modals/              # Modal dialogs
│   ├── settings-form/       # Settings forms
│   └── sidebar/             # Navigation sidebar
├── contentPanel/            # Main content display
├── panel/                   # Feature panels
│   ├── announcement/        # Announcement management
│   ├── auditlog/            # Audit logging
│   ├── contributors/        # User management
│   ├── dashboard/           # Main dashboard
│   ├── documents/           # Document management
│   └── settings/            # System settings
├── App.tsx                  # Main application component
├── ProtectedRoute.tsx       # Route protection
└── main.tsx                 # Application entry point
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## Usage for Main Website Integration

This admin dashboard can be integrated into a main website by:

1. **Component Extraction**: Extract reusable components (charts, modals, forms) for use in other parts of the website
2. **Styling Adaptation**: Adapt the CSS styles to match the main website's design system
3. **Routing Integration**: Integrate the panel-based navigation with the main website's routing system
4. **Authentication Integration**: Connect the login system with the main website's user authentication
5. **API Integration**: Connect the dashboard components to the main website's backend APIs

## Third-Party Libraries Used

- **Chart.js**: For creating interactive charts and graphs
- **React Router DOM**: For client-side routing and URL management
- **React Query**: For efficient server state management and caching

## Responsive Design Features

- Flexible grid layouts
- Media queries for different screen sizes
- Collapsible sidebar for mobile devices
- Touch-optimized interactive elements
- Scalable typography and spacing

This admin interface provides a solid foundation for administrative functionality that can be extended and integrated into larger web applications.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
