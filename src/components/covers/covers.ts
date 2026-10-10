// Posts that have a line-drawn cover in PostCover.astro.
// Each drawing is the post's own worked example, not decoration.
export const COVERED_POSTS = new Set([
	"coding-and-development/building-scalable-modular-monoliths-fastapi",
	"coding-and-development/structure-first-business-software",
	"coding-and-development/construct-binary-tree-from-preorder-and-inorder-traversal",
	"coding-and-development/how-this-sliding-window-problem-changed-my-approach-to-problem-solving",
	"coding-and-development/understanding-the-generalized-two-pointer-approach-for-removing-duplicates",
	"comfyui/faceswap-react-comfyui-guide",
]);

export const hasCover = (id: string) => COVERED_POSTS.has(id);
