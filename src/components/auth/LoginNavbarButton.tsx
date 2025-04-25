import React from "react"; // Removed useEffect as initialization is in store
import { useStore } from "@nanostores/react";
// Import the shared store and the helper function
import {
	accessToken as accessTokenStore,
	clearTokens,
} from "../../store/auth/auth"; // Adjust path if needed

const LoginNavbarButton = () => {
	const token = useStore(accessTokenStore);
	const isLoggedIn = !!token;

	const handleLogout = () => {
		console.log("Logout clicked");
		clearTokens(); // Use the centralized function to clear tokens and update store
		window.location.href = "/"; // Redirect to home or login
	};

	return (
		<>
			{isLoggedIn ? (
				<a
					href="/profile" // Link to profile page when logged in
					className="btn btn-md rounded-full font-light me-1"
				>
					Profile {/* Or show user name/icon */}
				</a>
			) : (
				<a
					href="/auth/login"
					className="btn btn-md rounded-full font-light me-1"
				>
					Login
				</a>
			)}
			{/* Optionally add a logout button next to profile if logged in */}
			{isLoggedIn && (
				<button
					onClick={handleLogout} // Use the handler function
					className="btn btn-ghost btn-sm" // Style as needed
				>
					Logout
				</button>
			)}
		</>
	);
};

export default LoginNavbarButton;
