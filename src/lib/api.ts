import axios from "axios";

export const API_ENDPOINT = import.meta.env.PUBLIC_API_ENDPOINT;

const apiClient = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		"Content-Type": "application/json",
	},
});

// Function to set the auth token for subsequent requests
const setAuthToken = (token: string | null) => {
	if (token) {
		apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		localStorage.setItem("accessToken", token); // Store token
	} else {
		delete apiClient.defaults.headers.common["Authorization"];
		localStorage.removeItem("accessToken"); // Remove token
	}
};

// Function to get tokens from localStorage
const getAuthTokens = () => {
	if (typeof window !== "undefined") {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		return { accessToken, refreshToken };
	}
	return { accessToken: null, refreshToken: null };
};

// Function to set tokens in localStorage
const setAuthTokens = (accessToken: string, refreshToken: string) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("refreshToken", refreshToken);
	}
};

// Function to remove tokens from localStorage
const removeAuthTokens = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	}
};

// Request Interceptor: Add Authorization header
apiClient.interceptors.request.use(
	(config) => {
		const { accessToken } = getAuthTokens();
		if (accessToken && !config.url?.includes("/auth/jwt/")) {
			// Don't add token to auth endpoints like login/refresh
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh on 401
let isRefreshing = false;
let failedQueue: {
	resolve: (value: unknown) => void;
	reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const { refreshToken } = getAuthTokens();

		// Check if it's a 401 error, not for login/refresh endpoints, and we have a refresh token
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			refreshToken &&
			!originalRequest.url?.includes("/auth/jwt/refresh") &&
			!originalRequest.url?.includes("/auth/jwt/login")
		) {
			if (isRefreshing) {
				// If token is already refreshing, queue the request
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						return apiClient(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				console.log("Attempting to refresh token...");
				const refreshResponse = await axios.post(
					`${API_ENDPOINT}/api/v1/auth/jwt/refresh`,
					{ refresh_token: refreshToken } // Use refresh_token field as per openapi.json #/components/schemas/RefreshTokenRequest
				);
				const { access_token: newAccessToken, refresh_token: newRefreshToken } =
					refreshResponse.data; // Assuming refresh endpoint also returns new refresh token
				console.log("Token refreshed successfully.");
				setAuthTokens(newAccessToken, newRefreshToken || refreshToken); // Update tokens
				apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				processQueue(null, newAccessToken); // Process queued requests with the new token
				return apiClient(originalRequest); // Retry the original request
			} catch (refreshError: any) {
				console.error(
					"Token refresh failed:",
					refreshError?.response?.data || refreshError.message
				);
				removeAuthTokens(); // Clear tokens on refresh failure
				processQueue(refreshError, null); // Reject queued requests
				// Optional: Redirect to login page
				if (typeof window !== "undefined") {
					// window.location.href = '/auth/login';
					console.log("Redirecting to login is recommended here.");
				}
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

// --- Authentication API Functions ---

// Modified login function
export const login = async (
	email: string,
	password: string
): Promise<{ accessToken: string; refreshToken?: string }> => {
	// FastAPI expects form data for OAuth2PasswordBearer flow
	const params = new URLSearchParams();
	params.append("username", email);
	params.append("password", password);

	const response = await apiClient.post("/api/v1/auth/jwt/login", params, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	if (response.data.access_token) {
		setAuthToken(response.data.access_token); // Set and store the token
	}
	return response.data; // Return data which includes the token
};

export const signup = async (userData: {
	email: string;
	password?: string; // Password might be optional if using social login later
	firstName?: string;
	lastName?: string;
}) => {
	// Map frontend names to backend schema (UserCreate)
	const apiData = {
		email: userData.email,
		password: userData.password,
		first_name: userData.firstName,
		last_name: userData.lastName,
		// is_active, is_superuser, is_verified have defaults in UserCreate schema
	};
	const response = await apiClient.post(
		"/api/v1/auth/register/register",
		apiData
	);
	return response.data; // Returns UserRead schema
};

export const logout = async () => {
	// Call the backend logout endpoint if it exists and requires action (like invalidating tokens)
	try {
		// The openapi spec shows /api/v1/auth/jwt/logout exists
		await apiClient.post("/api/v1/auth/jwt/logout");
	} catch (error) {
		console.error(
			"Logout API call failed (might be expected if endpoint only clears cookies):",
			error
		);
	} finally {
		// Always remove tokens from localStorage regardless of API call success
		removeAuthTokens();
		// Optional: Redirect to login page
		if (typeof window !== "undefined") {
			// window.location.href = '/auth/login';
		}
	}
};

// New function to get user profile
export const getUserProfile = async () => {
	// Ensure token is set in headers before making the request
	const token = localStorage.getItem("accessToken");
	if (!token) {
		throw new Error("No access token found.");
	}
	// Set token for this specific request if not already set globally,
	// or rely on global setting if already done post-login.
	// Re-setting it here ensures it's present for direct calls after page load.
	setAuthToken(token);

	const response = await apiClient.get("/api/v1/users/me");
	return response.data;
};

// Example function for fetching protected data
export const fetchUserProfile = async () => {
	try {
		const response = await apiClient.get("/api/v1/users/me");
		return response.data;
	} catch (error) {
		console.error("Failed to fetch user profile:", error);
		throw error; // Re-throw to be handled by the caller
	}
};

// Initialize auth token on load if available
const token =
	typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
if (token) {
	setAuthToken(token);
}

export default apiClient;
