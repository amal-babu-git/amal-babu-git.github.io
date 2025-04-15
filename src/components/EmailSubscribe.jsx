import React from "react";

const EmailSubscribe = () => {
	return (
		<>
			{/* <!-- Newsletter section --> */}
			<section class="card bg-base-200 mb-16">
				<div class="card-body p-8 text-center">
					<div class="flex justify-center items-center gap-2 mb-2">
						<h2 class="text-2xl font-semibold">Get Practical Insights</h2>
						<div class="badge badge-secondary badge-outline">Coming Soon</div>
					</div>
					<p class="max-w-md mx-auto mb-6 text-base-content/80">
						Subscribe to receive new articles and coding tips from Amal Babu ·
						ABK Datalab directly in your inbox.
					</p>
					<div class="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
						<input
							type="email"
							placeholder="Your email address"
							class="input input-bordered w-full"
							disabled
						/>
						<button
							class="btn btn-primary w-full sm:w-auto"
							disabled
						>
							Subscribe
						</button>
					</div>
					<p class="text-sm mt-2 text-base-content/70">
						This feature will be available soon!
					</p>
				</div>
			</section>
		</>
	);
};

export default EmailSubscribe;
