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
- **Data Fetching**: Custom fetch with React Query patterns
- **Maps**: Leaflet & React-Leaflet
- **Virtualization**: react-window
- **Testing**: Jest + React Testing Library
- **Animation**: Framer Motion
- **Build System**: Turbo (monorepo)
- **Package Manager**: pnpm

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

## Task Details

### Task 1: Portfolio Website

A modern, responsive portfolio website featuring:

- Custom animations with Framer Motion
- Dark/light theme switching
- Custom carousel component
- Responsive design with mobile-first approach
- Custom font integration (Sporting Grotesque)

### Task 2: Real-time Location Sharing

Real-time location sharing interface with:

- **SignalR Hub**: `https://tech-test.raintor.com/Hub`
- **Custom Hook**: `useSignalR()` encapsulates all WebSocket logic
- **Dual UI Modes**: User A (sender) and User B (receiver)
- **Interactive Map**: Leaflet-based with click-to-set coordinates
- **GPS Integration**: Browser geolocation API support
- **Real-time Updates**: Live marker updates on location changes

#### SignalR Implementation

- **Send Method**: `SendLatLon(lat, lon, userName)`
- **Receive Method**: `ReceiveLatLon`
- **Payload Format**:

```json
{
  "userName": "Default",
  "lat": 25.73736464,
  "lon": 90.3644747
}
```

### Task 3: Infinite Scroll User Feed

Advanced user directory with infinite scrolling:

- **API Endpoint**: `https://tech-test.raintor.com/api/users/GetUsersList?take=10&skip=0`
- **State Management**: Zustand store for user data and UI state
- **Infinite Scrolling**: IntersectionObserver-based loading
- **Virtualization**: Optional react-window integration for performance
- **Component Architecture**: Modular UserCard components
- **Error Handling**: Comprehensive error states and retry mechanisms
- **Accessibility**: Keyboard navigation support (Ctrl+R to refresh)

#### Features

- Skeleton loading states
- Error boundaries with retry functionality
- Performance monitoring (virtualized vs. regular rendering)
- Responsive grid layout
- Real-time loading indicators

## Testing

Unit tests are implemented for core functionality:

- **Task 2**: SignalR hook testing with mocked WebSocket connections
- **Task 3**: Zustand store testing and UserCard component testing

Test coverage includes:

- Component rendering and props handling
- State management logic
- Hook functionality
- Error scenarios

## Known Limitations & Trade-offs

### Task 2 (Location Sharing)

- SignalR connection may require CORS configuration in production
- Geolocation requires HTTPS in production environments
- Map performance could be optimized for mobile devices with large datasets

### Task 3 (User Feed)

- API pagination relies on simple skip/take parameters
- Virtualization is optional due to potential accessibility trade-offs
- Real-time user count may not reflect actual API total due to API limitations

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
