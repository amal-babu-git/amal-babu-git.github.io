---
title: 'Construct Binary Tree from Preorder and Inorder Traversal'
description: 'Understanding how to build a binary tree using preorder and inorder traversal data'
pubDate: 'Dec 14 2024'
heroImage: '/images/blog/dev/binary-tree-traversal.webp'
---

When working with binary trees, one of the interesting problems is constructing a tree from its traversals. Let's dive into how we can solve the problem "Construct Binary Tree from Preorder and Inorder Traversal."

## Problem Description

We are given two arrays:

1. `preorder` – the preorder traversal of a binary tree.
2. `inorder` – the inorder traversal of the same binary tree.

Our task is to construct the binary tree and return its root.

## Preorder and Inorder Traversals Explained

**Preorder Traversal**: Visit the root node, then traverse the left subtree, followed by the right subtree.

**Inorder Traversal**: Traverse the left subtree first, then visit the root node, and finally traverse the right subtree.

## Observations

1. The first element in `preorder` is always the root of the tree.
2. The position of this root in the `inorder` array divides the array into two parts:
   - The elements to the left are part of the left subtree.
   - The elements to the right are part of the right subtree.

## Solution Approach

```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder and not inorder:
            return None
            
        root = TreeNode(val = preorder[0])
        mid = inorder.index(preorder[0])
        root.left = self.buildTree(preorder[1:mid + 1], inorder[:mid])
        root.right = self.buildTree(preorder[mid + 1:], inorder[mid + 1:])
            
        return root
```

## How It Works

1. We check if `preorder` or `inorder` is empty. If so, return `None` (base case).
2. The first element of `preorder` is set as the root.
3. Locate the root's position in `inorder`. This splits `inorder` into left and right subtrees.
4. Using slicing, recursively build the left and right subtrees.
5. Finally, return the constructed root node.

## Example Walkthrough

Let's go through an example:

**Input**:
- `preorder = [3, 9, 20, 15, 7]`
- `inorder = [9, 3, 15, 20, 7]`

**Steps**:
1. The first element in `preorder` is `3` (root).
2. Find `3` in `inorder` (index = 1). Split `inorder` into:
   - Left subtree: `[9]`
   - Right subtree: `[15, 20, 7]`
3. Recursively construct:
   - Left subtree using `preorder = [9]` and `inorder = [9]`
   - Right subtree using `preorder = [20, 15, 7]` and `inorder = [15, 20, 7]`

The resulting tree would be:
```
    3
   / \
  9   20
     /  \
    15   7
```

## Complexity Analysis

- **Time Complexity**: O(n) due to the use of a hashmap for quick lookup of the root's index in `inorder`.
- **Space Complexity**: O(n) for the recursion stack.

## Optimizations

The current solution can be optimized by using a hashmap to store indices of `inorder` elements, ensuring more efficient lookups instead of calling `inorder.index()` repeatedly, which is an O(n) operation.

## Takeaway

This problem demonstrates how preorder and inorder traversals provide enough information to uniquely reconstruct a binary tree. While the above solution is straightforward, it can be optimized using a hashmap to store indices of `inorder` elements, ensuring efficient construction.

Try solving this problem yourself and experiment with the optimization ideas. Practice other traversal-related problems to strengthen your understanding of binary trees.

## Problem Reference

[105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
