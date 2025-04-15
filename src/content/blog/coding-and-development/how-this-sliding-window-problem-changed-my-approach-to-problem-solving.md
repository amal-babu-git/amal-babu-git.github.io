---
title: 'How this Sliding Window Problem Changed My Approach to Problem Solving'
description: 'Learning efficient problem-solving techniques through understanding the sliding window algorithm'
pubDate: 'Nov 20 2024'
heroImage: '/images/blog/dev/sliding-window.webp'
---

The sliding window technique is one of the most elegant and efficient approaches for solving array or string problems with contiguous elements. Let me share how understanding one sliding window problem completely changed my approach to algorithmic problem-solving.

## The Problem: Longest Substring Without Repeating Characters

Given a string `s`, find the length of the longest substring without repeating characters.

**Examples:**
- Input: `s = "abcabcbb"`
  - Output: `3` (The answer is "abc", with the length of 3)
- Input: `s = "bbbbb"`
  - Output: `1` (The answer is "b", with the length of 1)
- Input: `s = "pwwkew"`
  - Output: `3` (The answer is "wke", with the length of 3)

## The Brute Force Approach

Initially, like many beginners, I approached this problem by checking every possible substring:

```python
def lengthOfLongestSubstring(s: str) -> int:
    n = len(s)
    max_length = 0
    
    for i in range(n):
        char_set = set()
        for j in range(i, n):
            if s[j] in char_set:
                break
            char_set.add(s[j])
            max_length = max(max_length, j - i + 1)
    
    return max_length
```

This solution works but has a time complexity of O(n²), which isn't efficient for large inputs.

## The Sliding Window Revelation

Everything changed when I learned about the sliding window technique. Instead of checking every substring, I could dynamically grow and shrink a "window" as I moved through the string:

```python
def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}  # Character to its latest position mapping
    max_length = 0
    window_start = 0
    
    for window_end in range(len(s)):
        # If character is already in window, shrink window
        if s[window_end] in char_map and char_map[s[window_end]] >= window_start:
            window_start = char_map[s[window_end]] + 1
        
        # Update the character's position and maximum length
        char_map[s[window_end]] = window_end
        max_length = max(max_length, window_end - window_start + 1)
    
    return max_length
```

This solution has a time complexity of O(n) and space complexity of O(min(m,n)) where m is the size of the character set.

## The Conceptual Breakthrough

What made the sliding window technique so powerful for me was the realization that:

1. **Efficiency through Memory**: We can use extra memory (the hash map) to store information about what we've already seen, avoiding redundant calculations.

2. **Dynamic Window Management**: We can grow or shrink our window based on certain conditions, allowing us to consider only valid substrings.

3. **Linear Time Solution**: By processing each character exactly once, we achieve O(n) time complexity.

## Applying the Pattern to Other Problems

Once I grasped this pattern, I started seeing opportunities to apply sliding windows to many other problems:

- **Maximum Sum Subarray of Size K**: Find the maximum sum of any contiguous subarray of size k.
- **Fruits into Baskets**: You have two baskets, and each basket can carry any quantity of fruit, but only of one type. Find the maximum number of fruits you can collect.
- **Longest Substring with K Distinct Characters**: Find the length of the longest substring with at most K distinct characters.

## The Problem-Solving Framework

The sliding window pattern typically involves:

1. **Window Definition**: Define what constitutes your "window" (usually a subarray or substring).
2. **Window Movement**: Process the array from left to right, extending and shrinking the window as needed.
3. **Condition Checking**: Maintain a condition that your window must satisfy.
4. **Result Update**: Update your result based on valid windows.

## Impact on My Problem-Solving Approach

This problem fundamentally changed my approach to algorithmic problem-solving in several ways:

1. **Pattern Recognition**: I learned to identify problem patterns rather than treating each problem as entirely new.
2. **Space-Time Tradeoffs**: I became more conscious of using additional memory to improve time complexity.
3. **Optimization Mindset**: I started thinking about how to avoid redundant calculations by reusing previous results.

## Conclusion

The sliding window technique isn't just another algorithm to add to your toolkit—it's a paradigm shift in how you approach problems. By recognizing that many problems involve finding optimal subarrays or substrings, you can apply this powerful technique to solve them efficiently.

This pattern taught me that the most elegant solutions often come from understanding the structure of the problem deeply and avoiding unnecessary work. It's a lesson I carry with me whenever I approach a new algorithmic challenge.

Next time you encounter a problem involving arrays or strings where you need to find a contiguous subarray or substring with certain properties, consider whether the sliding window technique might be applicable. It might just change your problem-solving approach too.

## Problem Reference

[3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
