---
title: 'Understanding the Generalized Two-Pointer Approach for Removing Duplicates'
description: 'A comprehensive guide to using the two-pointer technique for efficiently handling duplicates in sorted arrays'
pubDate: 'Jan 8 2024'
heroImage: '/images/blog/dev/two-pointer-approach.webp'
---

When dealing with sorted arrays, a common task is to limit how many times each element appears. This can be done efficiently using a two-pointer approach. Let's break down how this works and how you can adjust it to allow up to `k` occurrences of each element.

## Problem

Given a sorted array, remove duplicates in-place so that each element appears at most `k` times. Return the new length of the array after removing extra duplicates.

## The Two-Pointer Technique

This technique uses two pointers:

- `l`: Points to the position where the next valid element should go.
- `r`: Scans through the array to find the next unique element.

## General Algorithm

```python
def removeDuplicates(self, nums: List[int], k: int) -> int:
    if len(nums) <= k:
        return len(nums)
    
    l = k  # Allow up to k occurrences
    for r in range(k, len(nums)):
        if nums[r] != nums[l - k]:  # Compare with the element k places before
            nums[l] = nums[r]
            l += 1
    
    return l
```

## How It Works

1. **Initialization**: Set `l = k` because the first `k` elements are always valid.
2. **Loop**: Start from index `k`. For each element at `r`, compare it with the element `k` positions before. If it's different, copy it to `nums[l]` and increment `l`.
3. **Result**: The pointer `l` now shows the length of the array with each element appearing at most `k` times.

Think of it this way: we have a list of numbers, and we want to keep only up to `k` duplicates. Let's assume `k = 2`. We start by setting both the left (`l`) and right (`r`) pointers at index 2, because we assume that indices 0 and 1 are already valid, either as unique elements or as duplicates appearing only twice.

Starting from index 2, we compare each element at `r` with the element at `l - k` (i.e., `nums[l - k]`). Since we already know that the value at `l - k` is valid, if `nums[r]` is not equal to `nums[l - k]`, we assign `nums[r]` to `nums[l]` and then increment `l`.

That's it! This method ensures that each element appears at most `k` times in the list.

## Example

**Input**:
```
nums = [1, 1, 1, 2, 2, 3]
k = 2
```

**Output**:
```
[1, 1, 2, 2, 3]
```
The length is 5.

## Why It Works

- **In-place Modification**: It changes the array directly without extra space.
- **Efficiency**: It runs in O(n) time, making it suitable for large arrays.

## Flexibility

This algorithm can be adapted for any `k`:

- `k = 1`: Keeps only unique elements.
- `k = 3`: Allows each element to appear up to three times.

## Conclusion

The two-pointer technique is a simple yet powerful way to handle duplicates in sorted arrays. Adjusting `k` lets you control how many times each element can appear, making this approach flexible and efficient for various problems.

## Related Problems on LeetCode

1. [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
2. [Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)
