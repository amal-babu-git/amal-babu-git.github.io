import type { CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;

// My role on every client project is technical lead. On some I also
// developed the core modules myself.
export const ROLES = {
	techLead: {
		name: "Technical lead",
		description:
			"Led the project and its system design, directed the team and made the key technical decisions.",
	},
	techLeadCore: {
		name: "Technical lead, developed core modules",
		description:
			"Led the project and its system design, directed the team, made the key technical decisions and developed the core modules.",
	},
} as const;

export type RoleKey = keyof typeof ROLES;

export const newestFirst = (a: Project, b: Project) => b.data.order - a.data.order;
