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
		// Listed in the homepage's Writing section (up to three, newest first).
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

const projects = defineCollection({
	// Client projects. Clients are confidential: the title describes the system
	// and never names the client or the product, and neither does the file name.
	loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		// One or two sentences; shown as the abstract and in the index.
		description: z.string(),
		domain: z.string(),
		role: z.enum(["techLead", "techLeadCore"]),
		year: z.number(),
		// Higher is newer. Give a new project the next number.
		order: z.number(),
		stack: z.array(z.string()),
		// For ERP and CRM systems: each module and what it covers. Shown as
		// the first section of the project page.
		modules: z.array(z.object({ name: z.string(), covers: z.string() })).optional(),
	}),
});

export const collections = { blog, licenses, projects };
