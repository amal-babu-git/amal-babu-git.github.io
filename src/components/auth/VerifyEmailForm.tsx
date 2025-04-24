import React, { useState, useEffect } from "react"; // Import useEffect

const VerifyEmailForm = () => {
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	// Read token from URL query parameter on component mount
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const urlToken = params.get("token");
		if (urlToken) {
			setToken(urlToken);
		}
	}, []); // Empty dependency array ensures this runs only once on mount

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);
		setLoading(true);

		try {
			const response = await fetch(
				"http://127.0.0.1:8000/api/v1/auth/verify/verify",
				{
					method: "POST",
					headers: {
						accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token: token }),
				}
			);

			if (response.ok) {
				setSuccessMessage("Email verified successfully!");
				// Optionally redirect or update UI further
				// window.location.href = "/auth/login?verified=true";
			} else {
				const errorData = await response.json().catch(() => ({
					detail: "Verification failed. Invalid or expired token.",
				}));
				setError(
					`Verification failed: ${errorData.detail || response.statusText}`
				);
			}
		} catch (err) {
			console.error("Verification API call failed:", err);
			setError(
				"An error occurred while trying to verify your email. Please try again later."
			);
		} finally {
			setLoading(false);
		}
	};

	// Don't render the form if verification was successful via this form
	if (successMessage) {
		return (
			<div
				role="alert"
				className="alert  mb-6 shadow-md"
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
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{successMessage}</span>
				<div className="text-center mt-4">
					<a
						href="/auth/login"
						className="btn btn-sm btn-soft"
					>
						Proceed to Login
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center">
			<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
				<form
					onSubmit={handleSubmit}
					className="card-body"
				>
					<fieldset className="fieldset">
						<legend className="fieldset-legend mb-2 text-lg font-semibold">
							Enter Verification Token
						</legend>
						<label
							className="label"
							htmlFor="token"
						>
							Verification Token
						</label>
						<input
							type="text"
							id="token"
							placeholder="Paste your token here"
							className="input input-bordered w-full"
							value={token}
							onChange={handleChange}
							required
						/>

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
										d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>{error}</span>
							</div>
						)}

						<button
							type="submit"
							className={`btn btn-primary mt-6 w-full ${
								loading ? "btn-disabled" : ""
							}`}
							disabled={loading || !token}
						>
							{loading ? (
								<span className="loading loading-spinner"></span>
							) : (
								"Verify Email"
							)}
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default VerifyEmailForm;
