import { atom } from "nanostores";

// Initialize atoms with null initially
export const accessToken = atom<string | null>(null);
export const refreshToken = atom<string | null>(null);

// Client-side check to load initial values from localStorage
if (typeof window !== "undefined") {
	const initialAccessToken = localStorage.getItem("accessToken");
	if (initialAccessToken) {
		accessToken.set(initialAccessToken);
	}
	const initialRefreshToken = localStorage.getItem("refreshToken");
	if (initialRefreshToken) {
		refreshToken.set(initialRefreshToken);
	}
}

export const user = atom<{
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	is_active: boolean;
	is_superuser: boolean;
	is_verified: boolean;
} | null>(null);

// Optional: Add functions to update store and localStorage together
export function setTokens(access: string | null, refresh?: string | null) {
	if (typeof window !== "undefined") {
		if (access) {
			localStorage.setItem("accessToken", access);
		} else {
			localStorage.removeItem("accessToken");
		}
		if (refresh) {
			localStorage.setItem("refreshToken", refresh);
		} else if (refresh === null) {
			// Explicitly remove if null is passed
			localStorage.removeItem("refreshToken");
		}
	}
	accessToken.set(access);
	if (refresh !== undefined) {
		// Only update refresh token store if provided
		refreshToken.set(refresh);
	}
}

export function clearTokens() {
	setTokens(null, null);
}
