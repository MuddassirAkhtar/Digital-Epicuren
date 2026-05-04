import axios from "axios";

// Step 1: Create a custom axios instance
// All your API calls will use this instead of plain axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // sends refreshToken cookie when needed
});

// Step 2: Request interceptor
// Runs BEFORE every request is sent
// Attaches the access token from memory to the Authorization header
api.interceptors.request.use(
  (config) => {
    // We store the token on the api instance itself (explained below)
    const token = api.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Step 3: Response interceptor
// Runs AFTER every response comes back
// Watches for 401 (token expired) and handles it silently
api.interceptors.response.use(
  // If response is successful, just return it as normal
  (response) => response,

  // If response is an error, check if it's a 401
  async (error) => {
    const originalRequest = error.config;

    // Check if:
    // 1. It's a 401 (unauthorized — token expired)
    // 2. We haven't already retried this request (prevents infinite loop)
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Mark this request so we don't retry it again
      originalRequest._retry = true;

      try {
        // Call the refresh endpoint
        // withCredentials sends the refreshToken cookie automatically
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        // Update the token on the api instance
        api.accessToken = newAccessToken;

        // Update the failed request's header with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with new token
        // User never knew anything happened
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh token also expired — user must log in again
        // Clear the token from instance
        api.accessToken = null;

        // Redirect to login
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // For any other error (404, 500 etc), just reject normally
    return Promise.reject(error);
  }
);

export default api;