import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import TripDetailPage from '../views/TripDetailPage.vue'
import MyTripsPage from '../views/MyTripsPage.vue'
import CreateTripPage from '../views/CreateTripPage.vue'
import EditTripPage from '../views/EditTripPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import { tokenService } from '../api.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/trip/:id',
    name: 'TripDetail',
    component: TripDetailPage,
  },
  {
    path: '/my-trips',
    name: 'MyTrips',
    component: MyTripsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/create-trip',
    name: 'CreateTrip',
    component: CreateTripPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-trip/:id',
    name: 'EditTrip',
    component: EditTripPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = tokenService.getToken()

  if (requiresAuth && !token) {
    // Redirect to login page with return URL
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
