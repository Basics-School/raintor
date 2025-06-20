# Raintor Frontend Developer Technical Assessment

This repository contains a comprehensive technical assessment project demonstrating modern frontend development skills across three distinct tasks.

## Project Overview

This project showcases three different frontend implementations built with Next.js 15, Tailwind CSS v4, and modern React patterns. Each task demonstrates specific technical competencies:

- **Task 1**: Portfolio website with advanced UI components and animations
- **Task 2**: Real-time location sharing using SignalR WebSocket connections
- **Task 3**: Infinite scroll user feed with Zustand state management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Real-time Communication**: SignalR (@microsoft/signalr)
- **State Management**: Zustand
- **URL State Management**: nuqs (for server-side URL state)
- **Data Fetching**: Custom fetch with React Query patterns
- **Maps**: Leaflet & React-Leaflet
- **Virtualization**: react-window (optional with error handling)
- **Testing**: Jest + React Testing Library
- **Animation**: Framer Motion
- **Build System**: Turbo (monorepo)
- **Package Manager**: pnpm
- **Error Handling**: Next.js App Router error boundaries

## Project Structure

```
raintor/
├── apps/
│   ├── task-1/           # Portfolio Website
│   │   ├── components/   # UI components, sections, layout
│   │   ├── app/         # Next.js app router pages
│   │   └── fonts/       # Custom font files
│   ├── task-2/           # Real-time Location Sharing
│   │   ├── src/
│   │   │   ├── components/  # Map and UI components
│   │   │   ├── hooks/       # SignalR custom hook
│   │   │   └── __tests__/   # Unit tests
│   └── task-3/           # Infinite Scroll User Feed
│       ├── src/
│       │   ├── components/  # User cards and UI
│       │   ├── hooks/       # Infinite scroll logic
│       │   ├── services/    # API layer
│       │   ├── store/       # Zustand state management
│       │   └── __tests__/   # Unit tests
└── packages/
    ├── ui/               # Shared UI components & styles
    ├── eslint-config/    # Shared ESLint configuration
    └── typescript-config/ # Shared TypeScript configuration
```

## Setup Instructions

### Prerequisites

- Node.js 20 or higher
- pnpm 10.4.1 or higher

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd raintor
```

2. Install dependencies:

```bash
pnpm install
```

### Package Management

This project uses pnpm workspaces for monorepo management. You can manage packages for specific tasks using filters:

#### Adding Packages

```bash
# Add a package to a specific task
pnpm add <package-name> --filter task-1
pnpm add <package-name> --filter task-2
pnpm add <package-name> --filter task-3

# Add dev dependencies
pnpm add -D <package-name> --filter task-1

# Add packages to the UI workspace
pnpm add <package-name> --filter @workspace/ui

# Add packages to all workspaces
pnpm add <package-name> -w
```

#### Removing Packages

```bash
# Remove a package from a specific task
pnpm remove <package-name> --filter task-1
pnpm remove <package-name> --filter task-2
pnpm remove <package-name> --filter task-3

# Remove from UI workspace
pnpm remove <package-name> --filter @workspace/ui
```

#### Examples

```bash
# Add lodash to task-1 only
pnpm add lodash --filter task-1

# Add testing library to task-3
pnpm add -D @testing-library/user-event --filter task-3

# Remove a package from task-2
pnpm remove axios --filter task-2
```

3. Start all development servers:

```bash
pnpm dev
```

Or start individual tasks:

```bash
pnpm dev:task1  # Portfolio (http://localhost:3001)
pnpm dev:task2  # Location Sharing (http://localhost:3002)
pnpm dev:task3  # User Feed (http://localhost:3003)
```

### Running Tests

Execute all tests across the workspace:

```bash
pnpm test
```

Run tests for specific tasks:

```bash
cd apps/task-2 && pnpm test
cd apps/task-3 && pnpm test
```

### Building for Production

```bash
pnpm build
```

## How to Navigate Tasks

Each task runs on a different port and includes a floating task switcher button in the bottom-right corner. Click this button to quickly navigate between:

- **Task 1** (Portfolio): http://localhost:3001
- **Task 2** (Location Sharing): http://localhost:3002
- **Task 3** (User Feed): http://localhost:3003

The task switcher is implemented as a shared component in the UI package and provides seamless navigation for reviewers.

## Error Handling & User Experience

The application implements comprehensive error handling following Next.js App Router best practices:

### Application-Level Error Boundaries

- **Global Error Boundary**: `error.tsx` catches and displays application errors
- **Graceful Degradation**: Virtualization errors automatically fall back to grid view
- **Development vs Production**: Detailed error information in development, user-friendly messages in production
- **Error Recovery**: Multiple recovery options (retry, reload, fallback views)

### Loading States

- **Suspense Boundaries**: Proper loading states for async components
- **Skeleton Loaders**: Animated placeholders during data fetching
- **Progressive Loading**: Smooth transitions between loading and loaded states

### User Feedback

- **Real-time Status**: Live indicators for loading, error, and ready states
- **Visual Cues**: Color-coded status messages and error indicators
- **Keyboard Shortcuts**: Ctrl+R for refresh, accessible navigation
- **URL State Persistence**: User preferences saved in URL for better UX

## Task Details

### Task 1: Portfolio Website

A modern, responsive portfolio website featuring:

- Custom animations with Framer Motion
- Dark/light theme switching
- Custom carousel component
- Responsive design with mobile-first approach
- Custom font integration (Sporting Grotesque)

### Task 2: Real-time Location Sharing

Production-ready real-time location sharing interface with robust connection handling:

- **SignalR Hub**: `https://tech-test.raintor.com/Hub`
- **Custom Hook**: `useSignalR()` encapsulates all WebSocket logic with connection state management
- **Dual UI Modes**: User A (sender) and User B (receiver)
- **Interactive Map**: Leaflet-based with click-to-set coordinates
- **GPS Integration**: Browser geolocation API support
- **Real-time Updates**: Live marker updates on location changes
- **Production UX**: Connection status indicators, loading states, and error handling

#### Enhanced Production Features

**Connection Management**:

- **Reconnect Button**: Manual reconnection when SignalR is disconnected
- **Connection States**: Visual indicators for connected, connecting, and disconnected states
- **Error Handling**: Connection error display and recovery mechanisms
- **Demo Mode**: Automatic fallback to local demo mode if SignalR hub is unavailable

**Loading States**:

- **Send Location Loading**: Spinner animation while sending location data
- **Map Markers**: Red pin for sender's current location, blue pins for received locations
- **Connection Status**: Real-time status updates with color-coded indicators

#### Demo Mode

If the SignalR hub is unavailable (common in development or when the external service is down), the app automatically switches to **Demo Mode**:

- **Status**: Shows "Demo Mode" with orange badge
- **Functionality**: Location sharing works locally within the browser session
- **Demo Data**: Pre-populated with sample locations for testing
- **Reconnection**: "Try Reconnect" button attempts to restore SignalR connection

> **Note**: Demo mode allows full testing of UI features without requiring external SignalR connectivity.

#### SignalR Implementation

- **Send Method**: `SendLatLon(lat, lon, userName)`
- **Receive Method**: `ReceiveLatLon`
- **Connection Events**: Automatic reconnection handling with manual override
- **Payload Format**:

```json
{
  "userName": "Default",
  "lat": 25.73736464,
  "lon": 90.3644747
}
```

### Task 3: Infinite Scroll User Feed

Advanced user directory with infinite scrolling and modern UI features:

- **API Endpoint**: `https://tech-test.raintor.com/api/users/GetUsersList?take=10&skip=0`
- **State Management**: Zustand store for user data and UI state
- **URL State Management**: Server-side state with nuqs for URL parameters
- **Infinite Scrolling**: IntersectionObserver-based loading
- **Virtualization**: Optional react-window integration with error handling
- **Component Architecture**: Modular UserCard components with Suspense boundaries
- **Error Handling**: Comprehensive error states and retry mechanisms
- **Accessibility**: Keyboard navigation support (Ctrl+R to refresh)

#### Enhanced UI Features

**URL State Management**:

- Virtualization toggle: `?virtualization=true/false` (default: false)
- Items per page: `?limit=5,10,20,50` (default: 10)
- Current page: `?page=1,2,3...` (default: 1)
- Example: `?virtualization=true&page=2&limit=20`

**Virtualization with Error Handling**:

- Toggle between grid view and virtualized list
- Graceful error handling with fallback to grid view
- Visual error indicators that don't break the application
- Automatic error recovery options

**Error Boundaries**:

- Next.js App Router `error.tsx` for application-level errors
- Component-level error handling for virtualization failures
- Detailed error information in development mode
- User-friendly error messages in production

**Performance Controls**:

- Dynamic items per page selection (5, 10, 20, 50)
- Real-time performance indicators
- Memory-efficient virtualization
- Responsive grid layouts for all screen sizes

#### UI Components

- **UserDirectoryContent**: Main component wrapped in Suspense
- **UserCard**: Individual user display with contact information
- **UserCardSkeleton**: Loading state with animate-pulse
- **Error Boundary**: Application-level error handling
- **Loading Component**: Suspense fallback UI

#### Features

- Skeleton loading states with proper animation
- Error boundaries with retry functionality and development details
- Performance monitoring (virtualized vs. regular rendering)
- Responsive grid layout with mobile-first design
- Real-time loading indicators and status updates
- URL-based state persistence for better UX
- Keyboard shortcuts and accessibility features

## Testing

Unit tests are implemented for core functionality:

- **Task 2**: SignalR hook testing with mocked WebSocket connections
- **Task 3**: Zustand store testing and UserCard component testing

Test coverage includes:

- Component rendering and props handling
- State management logic
- Hook functionality
- Error scenarios and error boundary testing
- URL state management with nuqs
- Virtualization error handling

### Running Tests by Workspace

```bash
# Run tests for specific tasks
pnpm test --filter task-2
pnpm test --filter task-3

# Run all tests
pnpm test

# Run tests in watch mode
cd apps/task-3 && pnpm test --watch
```

## Known Limitations & Trade-offs

### Task 2 (Location Sharing)

- ~~SignalR connection may require CORS configuration in production~~ ✅ **Improved**: Added reconnection handling and connection status
- ~~Manual reconnection required on disconnection~~ ✅ **Fixed**: Automatic reconnection with manual override button
- Geolocation requires HTTPS in production environments
- Map performance could be optimized for mobile devices with large datasets

### Task 3 (User Feed)

- API pagination relies on simple skip/take parameters
- Virtualization is optional and disabled by default for better accessibility
- Real-time user count may not reflect actual API total due to API limitations
- URL state management requires JavaScript for full functionality
- Some virtualization features may have reduced performance on older devices

### General

- Development environment uses different ports for each task
- Some dependencies include TypeScript type mismatches due to rapid Next.js evolution
- Test coverage is focused on core functionality rather than comprehensive end-to-end testing

## Development Decisions

- **Monorepo Structure**: Turbo-based setup for shared components and configurations
- **UI Package**: Centralized design system with Tailwind v4 integration
- **TypeScript**: Strict typing throughout with proper interface definitions
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **Performance**: Conscious trade-offs between features and performance (virtualization, lazy loading)
- **Error Boundaries**: Next.js App Router error handling with graceful degradation
- **URL State Management**: Server-side state persistence using nuqs for better UX
- **Accessibility First**: Virtualization disabled by default, keyboard navigation support
- **Progressive Enhancement**: Features work without JavaScript where possible
- **Package Management**: pnpm workspace filters for targeted dependency management

## Troubleshooting

### Task 2: SignalR Connection Issues

**Problem**: "Failed to complete negotiation with the server: TypeError: Failed to fetch"

**Solutions**:

1. **Check Network**: Ensure internet connectivity to `https://tech-test.raintor.com/Hub`
2. **Demo Mode**: App automatically falls back to demo mode if SignalR is unavailable
3. **CORS Issues**: Use the "Try Reconnect" button or refresh the page
4. **Firewall/Proxy**: Corporate networks may block WebSocket connections

**Demo Mode Features**:

- Orange "Demo Mode" status badge
- Local location sharing (works within browser session)
- Pre-populated sample locations for testing
- All UI features remain functional

## Deployment

This project is optimized for deployment on platforms like Vercel or Netlify:

1. **Build**: `pnpm build` generates optimized production builds
2. **Static Export**: Each task can be deployed independently
3. **Environment Variables**: Configure API endpoints for production
4. **HTTPS**: Required for geolocation features in Task 2

### Live Demo

[Insert deployment URL here]

### Repository

[Insert GitHub repository URL here]

---

**Technical Assessment Completed for Raintor Ltd Frontend Developer Position**

_This project demonstrates proficiency in modern React development, real-time applications, state management, testing, and production-ready code architecture._
