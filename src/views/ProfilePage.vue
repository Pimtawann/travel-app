<template>
  <div class="flex min-h-screen bg-background">
    <!-- Sidebar -->
    <Sidebar />

    <main class="flex-1 p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-2">Profile</h1>
        <p class="text-xl text-secondary">Manage your account information</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
        <div class="text-center">
          <l-trio size="40" speed="1.3" color="#38220f"></l-trio>
          <p class="mt-4 text-secondary text-2xl">Loading profile...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex justify-center items-center min-h-[50vh]">
        <div class="text-center">
          <p class="text-2xl md:text-3xl font-semibold text-red-600">{{ error }}</p>
        </div>
      </div>

      <!-- Profile Form -->
      <div v-else class="max-w-2xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg border-2 border-cream-3 p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email (Read-only) -->
            <div>
              <label class="block text-sm font-semibold text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                :value="profile.email"
                disabled
                class="w-full px-4 py-3 border-2 border-cream-3 rounded-xl text-secondary bg-cream-1 cursor-not-allowed"
              />
              <p class="text-xs text-secondary mt-1">Email cannot be changed</p>
            </div>

            <!-- Display Name -->
            <div>
              <label for="displayName" class="block text-sm font-semibold text-primary mb-2">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                v-model="formData.displayName"
                placeholder="Enter your display name"
                class="w-full px-4 py-3 border-2 border-cream-3 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300 focus:border-secondary"
              />
            </div>

            <!-- Password Section -->
            <div>
              <label class="block text-sm font-semibold text-primary mb-2">
                Password
              </label>

              <!-- Password Display -->
              <div v-if="!isChangingPassword" class="flex items-center gap-3">
                <input
                  type="password"
                  value="........"
                  disabled
                  class="flex-1 px-4 py-3 border-2 border-cream-3 rounded-xl text-secondary bg-cream-1 cursor-not-allowed"
                />
                <button
                  type="button"
                  @click="startPasswordChange"
                  class="px-6 py-3 bg-secondary text-background rounded-xl hover:bg-primary transition-colors duration-200 font-semibold whitespace-nowrap">
                  Change Password
                </button>
              </div>

              <!-- Password Change Form (when changing) -->
              <div v-else class="space-y-4 p-4 bg-cream-1 rounded-xl border-2 border-cream-3">
                <!-- Current Password -->
                <div>
                  <label for="currentPassword" class="block text-sm font-semibold text-primary mb-2">
                    Current Password
                  </label>
                  <div class="relative">
                    <input
                      id="currentPassword"
                      :type="showCurrentPassword ? 'text' : 'password'"
                      v-model="formData.currentPassword"
                      placeholder="Enter your current password"
                      class="w-full px-4 py-3 border-2 border-cream-3 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300 focus:border-secondary"
                    />
                    <button
                      type="button"
                      @click="showCurrentPassword = !showCurrentPassword"
                      class="absolute right-3 top-1/2 -translate-y-1/2 !bg-cream-1 !text-primary hover:!text-secondary">
                      <svg v-if="!showCurrentPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- New Password -->
                <div>
                  <label for="newPassword" class="block text-sm font-semibold text-primary mb-2">
                    New Password
                  </label>
                  <div class="relative">
                    <input
                      id="newPassword"
                      :type="showNewPassword ? 'text' : 'password'"
                      v-model="formData.newPassword"
                      placeholder="Enter your new password"
                      class="w-full px-4 py-3 border-2 border-cream-3 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300 focus:border-secondary"
                    />
                    <button
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="absolute right-3 top-1/2 -translate-y-1/2 !bg-cream-1 !text-primary hover:!text-secondary">
                      <svg v-if="!showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    </button>
                  </div>
                  <p class="text-xs text-secondary mt-1">Minimum 6 characters</p>
                </div>

                <!-- Cancel Button -->
                <button
                  type="button"
                  @click="cancelPasswordChange"
                  class="w-full px-4 py-2 border-2 border-cream-3 text-secondary rounded-xl hover:bg-cream-2 transition-colors duration-200 font-medium">
                  Cancel
                </button>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="updateError" class="p-4 bg-red-50 border-2 border-red-500 rounded-xl">
              <p class="text-red-700 font-semibold">{{ updateError }}</p>
            </div>

            <!-- Buttons -->
            <div class="flex gap-4">
              <button
                type="button"
                @click="resetForm"
                class="flex-1 px-6 py-3 border-2 border-cream-3 text-primary rounded-xl hover:bg-cream-2 transition-colors duration-200 font-semibold">
                Reset
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 px-6 py-3 bg-primary text-background rounded-xl hover:bg-secondary transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <Toast
      :show="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="closeToast"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import Toast from '../components/Toast.vue'
import { useAuth } from '../composables/useAuth.js'
import { userAPI } from '../api.js'
import { trio } from 'ldrs'

trio.register()

const router = useRouter()
const { isAuthenticated, user, setUser } = useAuth()

const profile = ref({
  email: '',
  displayName: '',
  createdAt: ''
})

const formData = ref({
  displayName: '',
  currentPassword: '',
  newPassword: ''
})

const isLoading = ref(false)
const error = ref(null)
const isSubmitting = ref(false)
const updateError = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const isChangingPassword = ref(false)

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  await fetchProfile()
})

const fetchProfile = async () => {
  try {
    isLoading.value = true
    error.value = null

    const data = await userAPI.getProfile()
    profile.value = data
    formData.value.displayName = data.displayName || ''
  } catch (err) {
    console.error('Failed to load profile:', err)
    error.value = err.message || 'Failed to load profile'
  } finally {
    isLoading.value = false
  }
}

const startPasswordChange = () => {
  isChangingPassword.value = true
  updateError.value = ''
  showToast.value = false
}

const cancelPasswordChange = () => {
  isChangingPassword.value = false
  formData.value.currentPassword = ''
  formData.value.newPassword = ''
  showCurrentPassword.value = false
  showNewPassword.value = false
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    showToast.value = false
    updateError.value = ''

    // Check if changing password
    if (isChangingPassword.value) {
      // Validate current password
      if (!formData.value.currentPassword) {
        updateError.value = 'Please enter your current password'
        return
      }

      // Validate new password
      if (!formData.value.newPassword) {
        updateError.value = 'Please enter a new password'
        return
      }

      if (formData.value.newPassword.length < 6) {
        updateError.value = 'New password must be at least 6 characters'
        return
      }

      // Update profile with new password
      await userAPI.updateProfile(
        formData.value.displayName,
        formData.value.newPassword
      )

      showSuccessToast('Profile and password updated successfully!')

      // Reset password change mode
      isChangingPassword.value = false
      formData.value.currentPassword = ''
      formData.value.newPassword = ''
    } else {
      // Only update displayName
      await userAPI.updateProfile(formData.value.displayName, null)

      showSuccessToast('Profile updated successfully!')
    }

    await fetchProfile()

    // Update user state in useAuth to refresh navbar
    const newDisplayName = formData.value.displayName || profile.value.email
    setUser({
      email: profile.value.email,
      displayName: newDisplayName
    })
    localStorage.setItem('displayName', newDisplayName)

    console.log('Updated user displayName:', newDisplayName)
  } catch (err) {
    console.error('Failed to update profile:', err)
    updateError.value = err.message || 'Failed to update profile'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value.displayName = profile.value.displayName || ''
  formData.value.currentPassword = ''
  formData.value.newPassword = ''
  isChangingPassword.value = false
  showToast.value = false
  updateError.value = ''
}

const showSuccessToast = (message) => {
  toastMessage.value = message
  toastType.value = 'success'
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const closeToast = () => {
  showToast.value = false
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
