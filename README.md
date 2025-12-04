# Travel App Frontend

A modern travel sharing platform built with Vue 3, Vite, and TailwindCSS. Share your travel experiences, discover amazing destinations, and connect with fellow travelers.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Vite** - Next generation frontend tooling
- **TailwindCSS 4** - Utility-first CSS framework
- **Vue Router** - Official router for Vue.js
- **Axios** - Promise-based HTTP client
- **ldrs** - Loading animations

## Features

### Public Features
- Browse all travel trips
- View trip details with photo galleries
- Search trips by destination or keywords
- Responsive design for all devices

### User Features (Authentication Required)
- User registration and login
- Create, edit, and delete your own trips
- Upload multiple photos for each trip
- Manage user profile
- View your personal trip collection

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone https://github.com/Pimtawann/travel-app.git
cd travel-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── api.js                 # API service layer and axios configuration
├── main.js                # Application entry point
├── App.vue                # Root component
├── style.css              # Global styles and TailwindCSS imports
├── router/
│   └── index.js           # Vue Router configuration with auth guards
├── views/
│   ├── HomePage.vue       # Landing page with all trips
│   ├── TripDetailPage.vue # Individual trip details
│   ├── MyTripsPage.vue    # User's personal trips
│   ├── CreateTripPage.vue # Create new trip
│   ├── EditTripPage.vue   # Edit existing trip
│   ├── ProfilePage.vue    # User profile management
│   ├── LoginPage.vue      # User login
│   └── RegisterPage.vue   # User registration
├── components/
│   ├── Navbar.vue         # Navigation bar
│   ├── Sidebar.vue        # Side navigation
│   ├── TripCard.vue       # Trip preview card
│   ├── PhotoGallery.vue   # Photo gallery viewer
│   ├── SearchBar.vue      # Search functionality
│   ├── Pagination.vue     # Pagination controls
│   ├── Toast.vue          # Toast notifications
│   ├── SuccessModal.vue   # Success message modal
│   └── DeleteConfirmationModal.vue # Delete confirmation
└── composables/
    └── useAuth.js         # Authentication composable

```

## Key Features Implementation

### Authentication
- JWT-based authentication
- Protected routes with navigation guards
- Automatic token management
- Token expiration handling with auto-redirect

### API Integration
- Centralized API service with axios
- 90-second timeout for handling cold starts
- Automatic retry logic for failed requests
- Interceptors for auth token and error handling
- Connected to backend API: `https://travel-app-api-4bil.onrender.com`

### Routing
Routes are configured in `src/router/index.js`:
- `/` - Home page (public)
- `/trip/:id` - Trip details (public)
- `/login` - Login page
- `/register` - Registration page
- `/my-trips` - User's trips (protected)
- `/create-trip` - Create new trip (protected)
- `/edit-trip/:id` - Edit trip (protected)
- `/profile` - User profile (protected)

### State Management
- Local storage for auth token and user display name
- Composable pattern for reusable authentication logic
- Vue 3 Composition API for reactive state

## API Endpoints

The app communicates with the following API endpoints:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### Trips
- `GET /api/trips` - Get all trips (with optional search query)
- `GET /api/trips/mine` - Get user's trips
- `GET /api/trips/:id` - Get trip by ID
- `POST /api/trips` - Create new trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Files
- `POST /api/files/upload` - Upload image file