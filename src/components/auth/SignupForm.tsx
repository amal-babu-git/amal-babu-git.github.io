import React, { useState } from "react";

const SignupForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match.");
			return;
		}
		const formData = { email, password, firstName, lastName };
		console.log("Signup attempt:", formData);
		alert("Signup functionality not implemented yet. Check console for data.");
		// Reset form or redirect user as needed
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

						<button
							type="submit"
							className="btn btn-soft btn-primary mt-4"
						>
							Sign Up
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
