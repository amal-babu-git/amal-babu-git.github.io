import React, { useState } from "react";

const LoginForm = () => {
	// Use a single state object for form data
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// Generic handler to update form data state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[id]: value, // Use input id to determine which field to update
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Log the entire formData object
		console.log("Login attempt:", formData);
		alert("Login functionality not implemented yet.");
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
							className="input"
							value={formData.email} // Use formData state
							onChange={handleChange} // Use generic handler
							required
						/>

						<label
							className="label"
							htmlFor="password"
						>
							Password
						</label>
						<input
							type="password"
							id="password" // id is used by handleChange
							placeholder="Password"
							className="input"
							value={formData.password} // Use formData state
							onChange={handleChange} // Use generic handler
							required
						/>

						<div className="flex justify-between text-sm mt-2 me-3">
							<a
								href="#"
								className="link link-hover"
							>
								Forgot password?
							</a>
							<a
								href="signup" // Assuming a signup route exists
								className="link link-hover"
							>
								Sign up
							</a>
						</div>

						<button
							type="submit"
							className="btn btn-soft btn-primary mt-4"
						>
							Login
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
