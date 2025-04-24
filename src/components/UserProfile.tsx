import React, { useState, useEffect } from "react";
import { getUserProfile, logout } from "../lib/api"; // Import logout

interface UserProfileData {
	id: string;
	email: string;
	is_active: boolean;
	is_superuser: boolean;
	is_verified: boolean;
	first_name: string | null;
	last_name: string | null;
}

const UserProfile = () => {
	const [profile, setProfile] = useState<UserProfileData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true);
				const data = await getUserProfile();
				setProfile(data);
				setError(null);
			} catch (err: any) {
				console.error("Failed to fetch profile:", err);
				setError(
					err.message || "Failed to load profile. Please try logging in again."
				);
				if (
					err.response?.status === 401 ||
					err.message === "No access token found."
				) {
					logout(); // Use logout function to clear token
					setTimeout(() => {
						window.location.href = "/auth/login";
					}, 100);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	// Logout handler
	const handleLogout = () => {
		logout(); // Clear the token
		window.location.href = "/auth/login"; // Redirect to login page
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-32">
				<span className="loading loading-lg loading-spinner text-primary"></span>
			</div>
		);
	}

	if (error) {
		return (
			<div
				role="alert"
				className="alert alert-error"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>Error: {error}</span>
			</div>
		);
	}

	if (!profile) {
		return <p>No profile data found.</p>;
	}

	return (
		<div className="card bg-base-100 shadow-xl max-w-md mx-auto">
			<div className="card-body">
				<h2 className="card-title">User Profile</h2>
				<div className="divider my-1"></div>
				<p>
					<strong>Email:</strong> {profile.email}
				</p>
				<p>
					<strong>Name:</strong> {profile.first_name || "N/A"}{" "}
					{profile.last_name || ""}
				</p>
				<p>
					<strong>Status:</strong>{" "}
					<span
						className={`badge ${
							profile.is_active ? "badge-success" : "badge-error"
						}`}
					>
						{profile.is_active ? "Active" : "Inactive"}
					</span>
				</p>
				<p>
					<strong>Verified:</strong>{" "}
					<span
						className={`badge ${
							profile.is_verified ? "badge-info" : "badge-warning"
						}`}
					>
						{profile.is_verified ? "Verified" : "Not Verified"}
					</span>
				</p>
				{profile.is_superuser && (
					<p>
						<strong>Role:</strong>{" "}
						<span className="badge badge-primary">Admin</span>
					</p>
				)}
				<div className="card-actions justify-end mt-4">
					<button
						onClick={handleLogout}
						className="btn btn-outline btn-error btn-sm"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
