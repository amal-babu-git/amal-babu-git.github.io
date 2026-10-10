// Shapes rendered markdown for the paper layout:
// - a paragraph holding only an image becomes a <figure>, captioned by its alt text
//   (figures are numbered with a CSS counter);
// - tables get a scroll wrapper so they never widen the page on phones;
// - hand-written numbers at the start of headings ("1. Separation of concerns")
//   are dropped, because sections are numbered automatically.

const isBlankText = (node) => node.type === "text" && !node.value.trim();

const element = (tagName, className, children) => ({
	type: "element",
	tagName,
	properties: className ? { className: [className] } : {},
	children,
});

function toFigure(paragraph) {
	const content = paragraph.children.filter((child) => !isBlankText(child));
	if (content.length !== 1) return null;
	const [image] = content;
	if (image.type !== "element" || image.tagName !== "img") return null;

	const alt = image.properties?.alt ? String(image.properties.alt) : "";
	const children = [image];
	if (alt) children.push(element("figcaption", null, [{ type: "text", value: alt }]));
	return element("figure", "paper-figure", children);
}

function stripLeadingNumber(heading) {
	const first = heading.children[0];
	if (first?.type === "text") {
		first.value = first.value.replace(/^\s*\d+(\.\d+)*[.)]\s+/, "");
	}
}

function transform(node) {
	if (!node.children) return;
	node.children = node.children.map((child) => {
		if (child.type !== "element") return child;

		if (child.tagName === "p") {
			const figure = toFigure(child);
			if (figure) return figure;
		}

		if (child.tagName === "table") {
			return element("div", "table-scroll", [child]);
		}

		if (/^h[2-4]$/.test(child.tagName)) {
			stripLeadingNumber(child);
		}

		transform(child);
		return child;
	});
}

export default function rehypePaper() {
	return (tree) => transform(tree);
}
