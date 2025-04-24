import React, { useState } from "react";
import { signup } from "../../lib/api"; // Import the signup function

const SignupForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [error, setError] = useState<string | null>(null); // Add error state
	const [loading, setLoading] = useState(false); // Add loading state
	const [successMessage, setSuccessMessage] = useState<string | null>(null); // Add success message state

	const handleSubmit = async (e: React.FormEvent) => {
		// Make handleSubmit async
		e.preventDefault();
		setError(null); // Clear previous errors
		setSuccessMessage(null); // Clear previous success message

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setLoading(true); // Set loading state

		try {
			const userData = { email, password, firstName, lastName };
			const result = await signup(userData); // Call the signup function
			console.log("Signup successful:", result);
			// Redirect to the email verification notice page
			window.location.href = "/auth/verify-email-notice";
			// No need to set success message here as we are redirecting
		} catch (err: any) {
			console.error("Signup failed:", err);
			// Extract error message from API response if available
			// Check for specific registration errors from openapi.json examples
			let apiError = "Signup failed. Please try again.";
			const detail = err.response?.data?.detail;
			if (detail === "REGISTER_USER_ALREADY_EXISTS") {
				apiError = "A user with this email already exists.";
			} else if (
				typeof detail === "object" &&
				detail?.code === "REGISTER_INVALID_PASSWORD"
			) {
				apiError = `Password validation failed: ${detail.reason}`;
			} else if (typeof detail === "string") {
				apiError = detail;
			}

			setError(apiError); // Set error message state
			alert(`Signup failed: ${apiError}`);
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	return (
		<div className="flex justify-center items-center py-8">
			<div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
				<form
					onSubmit={handleSubmit}
					className="card-body"
				>
					<fieldset className="fieldset grid grid-cols-1 gap-4">
						<legend className="fieldset-legend text-xl font-semibold mb-4">
							Create Account
						</legend>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<label className="input input-bordered flex items-center gap-2">
								<span className="label">First Name</span>
								<input
									type="text"
									id="firstName"
									placeholder="John"
									className="grow"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<span className="label">Last Name</span>
								<input
									type="text"
									id="lastName"
									placeholder="Doe"
									className="grow"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</label>
						</div>

						<label className="input input-bordered flex items-center gap-2">
							<span className="label">Email</span>
							<input
								type="email"
								id="email"
								placeholder="john.doe@example.com"
								className="grow"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>

						<label className="input input-bordered flex items-center gap-2">
							<span className="label">Password</span>
							<input
								type="password"
								id="password"
								placeholder="••••"
								className="grow"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								minLength={4} // Example: Enforce minimum length
							/>
						</label>

						<label className="input input-bordered flex items-center gap-2">
							<span className="label">Confirm Password</span>
							<input
								type="password"
								id="confirmPassword"
								placeholder="••••"
								className="grow"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>
						{password !== confirmPassword && confirmPassword && (
							<p className="text-error text-xs mt-1">Passwords do not match.</p>
						)}

						{/* Display error message */}
						{error && (
							<div
								role="alert"
								className="alert alert-error mt-4"
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
								<span>{error}</span>
							</div>
						)}

						<button
							type="submit"
							className={`btn btn-soft btn-primary mt-4 ${
								loading ? "btn-disabled" : ""
							}`} // Add loading state to button
							disabled={loading} // Disable button while loading
						>
							{loading ? (
								<span className="loading loading-spinner"></span>
							) : (
								"Sign Up"
							)}{" "}
							{/* Show spinner */}
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
