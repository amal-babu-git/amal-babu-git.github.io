import React from "react";

const EmailSubscribe = () => {
	return (
		<>
			{/* <!-- Newsletter section --> */}
			<section className="card bg-base-200 mb-16">
				<div className="card-body p-8 text-center">
					<div className="flex justify-center items-center gap-2 mb-2">
						<h2 className="text-2xl font-semibold">Get Practical Insights</h2>
						<div className="badge badge-secondary badge-outline">Coming Soon</div>
					</div>
					<p className="max-w-md mx-auto mb-6 text-base-content/80">
						Subscribe to receive new articles and coding tips from Amal Babu ·
						ABK Datalab directly in your inbox.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
						<input
							type="email"
							placeholder="Your email address"
							className="input input-bordered w-full"
							disabled
						/>
						<button
							className="btn btn-primary w-full sm:w-auto"
							disabled
						>
							Subscribe
						</button>
					</div>
					<p className="text-sm mt-2 text-base-content/70">
						This feature will be available soon!
					</p>
				</div>
			</section>
		</>
	);
};

export default EmailSubscribe;
