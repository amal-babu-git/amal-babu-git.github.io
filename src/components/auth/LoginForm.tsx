import React, { useState } from "react";
import { login } from "../../lib/api"; // Import the login function

const LoginForm = () => {
	// Use a single state object for form data
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState<string | null>(null); // Add error state
	const [loading, setLoading] = useState(false); // Add loading state

	// Generic handler to update form data state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[id]: value, // Use input id to determine which field to update
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		// Make handleSubmit async
		e.preventDefault();
		setError(null); // Clear previous errors
		setLoading(true); // Set loading state

		try {
			// The login function now handles token storage internally
			await login(formData.email, formData.password); // Call the login function
			console.log("Login successful!");
			window.location.href = "/profile"; // Redirect added
		} catch (err: any) {
			console.error("Login failed:", err);
			// Extract error message from API response if available
			const apiError =
				err.response?.data?.detail === "LOGIN_BAD_CREDENTIALS"
					? "Invalid email or password."
					: err.response?.data?.detail ||
					  "Login failed. Please check your credentials.";
			setError(apiError); // Set error message state
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	return (
		<div className="flex justify-center items-center py-8">
			<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
				<form
					onSubmit={handleSubmit}
					className="card-body"
				>
					<fieldset className="fieldset">
						<label
							className="label"
							htmlFor="email"
						>
							Email
						</label>
						<input
							type="email"
							id="email" // id is used by handleChange
							placeholder="Email"
							className="input input-bordered" // Added input-bordered for consistency
							value={formData.email} // Use formData state
							onChange={handleChange} // Use generic handler
							required
						/>

						<label
							className="label mt-4" // Added margin top
							htmlFor="password"
						>
							Password
						</label>
						<input
							type="password"
							id="password" // id is used by handleChange
							placeholder="Password"
							className="input input-bordered" // Added input-bordered for consistency
							value={formData.password} // Use formData state
							onChange={handleChange} // Use generic handler
							required
						/>

						<div className="flex justify-between text-sm mt-2 me-3">
							<a
								href="#" // TODO: Implement password reset link
								className="link link-hover"
							>
								Forgot password?
							</a>
							<a
								href="/auth/signup" // Correct link to signup page
								className="link link-hover"
							>
								Sign up
							</a>
						</div>

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
							className={`btn btn-soft btn-primary mt-6 w-full ${
								// Added w-full and mt-6
								loading ? "btn-disabled" : ""
							}`}
							disabled={loading}
						>
							{loading ? (
								<span className="loading loading-spinner"></span>
							) : (
								"Login"
							)}
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
