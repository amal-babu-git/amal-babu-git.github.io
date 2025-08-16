import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		authors: z.array(z.string()).optional().default(["amal-babu-git"]),
		heroImage: z.string().optional(),
		subcategory: z.string().optional(),
		featured: z.boolean().optional(),
	}),
});

const licenses = defineCollection({
	// Load Markdown and MDX files in the `src/content/licenses/` directory.
	loader: glob({ base: "./src/content/licenses", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		version: z.string(),
		// Transform string to Date object
		effectiveDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().default("Amal Babu"),
		licenseType: z.string().optional(),
		status: z.enum(["active", "deprecated", "draft"]).default("active"),
	}),
});

export const collections = { blog, licenses };
