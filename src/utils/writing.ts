import type { MarkdownHeading } from "astro";
import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

// Proper names that simple capitalization gets wrong.
const TOPIC_NAMES: Record<string, string> = {
	comfyui: "ComfyUI",
};

// "coding-and-development" -> "Coding and development"
export const topicLabel = (slug: string) => {
	if (TOPIC_NAMES[slug]) return TOPIC_NAMES[slug];
	const words = slug.replace(/-/g, " ");
	return words.charAt(0).toUpperCase() + words.slice(1);
};

// Posts live in a folder per topic: "comfyui/faceswap-guide" -> "comfyui"
export const topicSlug = (post: Post) => (post.id.includes("/") ? post.id.split("/")[0] : "writing");

export const readingMinutes = (post: Post) => {
	const words = (post.body ?? "").split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
};

// Older posts use a handle or first name as the author; show the full name.
const AUTHOR_ALIASES = new Set(["amal-babu-git", "amal", "amal babu"]);
export const authorNames = (authors: string[] | undefined) => {
	const names = (authors ?? []).map((author) =>
		AUTHOR_ALIASES.has(author.toLowerCase()) ? "Amal Babu" : author,
	);
	return [...new Set(names.length ? names : ["Amal Babu"])];
};

export const fullDate = (date: Date) =>
	date.toLocaleDateString("en-us", { month: "short", day: "numeric", year: "numeric" });

export const byNewest = (a: Post, b: Post) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

// Group posts by topic, topics ordered by their newest post.
export const groupByTopic = (posts: Post[]) => {
	const groups = new Map<string, Post[]>();
	for (const post of [...posts].sort(byNewest)) {
		const slug = topicSlug(post);
		groups.set(slug, [...(groups.get(slug) ?? []), post]);
	}
	return [...groups.entries()].map(([slug, items]) => ({ slug, label: topicLabel(slug), posts: items }));
};

// Contents entries for a rendered Markdown body, numbered the same way the
// CSS counters in paper.css number the headings: h2 as "n", h3 as "n.m".
export const numberedSections = (headings: MarkdownHeading[]) => {
	let h2 = 0;
	let h3 = 0;
	const sections: { id: string; n: string; label: string; depth: 2 | 3 }[] = [];
	for (const heading of headings) {
		if (heading.depth === 2) {
			h2 += 1;
			h3 = 0;
			sections.push({ id: heading.slug, n: String(h2), label: heading.text, depth: 2 });
		} else if (heading.depth === 3) {
			h3 += 1;
			sections.push({ id: heading.slug, n: `${h2}.${h3}`, label: heading.text, depth: 3 });
		}
	}
	return sections;
};
