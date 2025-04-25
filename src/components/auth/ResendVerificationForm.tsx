import React, { useState } from "react";
import { requestVerificationToken } from "../../lib/api"; // Adjust path as needed

const ResendVerificationForm = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);
		setLoading(true);

		try {
			await requestVerificationToken(email);
			setSuccessMessage(
				"If an account exists for this email, a new verification link has been sent."
			);
			setEmail(""); // Clear email field on success
		} catch (err: any) {
			console.error("Request verification token failed:", err);
			// Avoid revealing if an email exists or not for security
			setError(
				"Could not process the request. Please check the email address or try again later."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-8 p-6 card bg-base-200 shadow-md">
			<form onSubmit={handleSubmit}>
				<fieldset className="fieldset">
					<legend className="fieldset-legend mb-2 text-md font-semibold">
						Resend Verification Email
					</legend>
					<p className="text-sm mb-4 text-base-content/80">
						Enter your email address below and we'll send you another link.
					</p>

					{/* Display success message */}
					{successMessage && (
						<div
							role="alert"
							className="alert bg-base-300 mb-4"
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
						</div>
					)}

					{/* Display error message */}
					{error &&
						!successMessage && ( // Don't show error if success is shown
							<div
								role="alert"
								className="alert alert-error mb-4"
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

					<label
						className="label hidden"
						htmlFor="resend-email"
					>
						{" "}
						{/* Hidden label for accessibility */}
						Email Address
					</label>
					<input
						type="email"
						id="resend-email"
						placeholder="Enter your email"
						className="input input-bordered w-full"
						value={email}
						onChange={handleChange}
						required
						disabled={loading}
					/>

					<button
						type="submit"
						className={`btn btn-soft mt-4 w-full ${
							loading ? "btn-disabled" : ""
						}`}
						disabled={loading}
					>
						{loading ? (
							<span className="loading loading-spinner"></span>
						) : (
							"Resend Verification Link"
						)}
					</button>
				</fieldset>
			</form>
		</div>
	);
};

export default ResendVerificationForm;
