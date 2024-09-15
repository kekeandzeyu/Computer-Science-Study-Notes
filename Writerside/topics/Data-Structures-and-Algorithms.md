<show-structure for="chapter" depth="3"></show-structure>

# Data Structures and Algorithms

<secondary-label ref="wip"></secondary-label>
<secondary-label ref="beta"></secondary-label>

<p>In the following sections, we will explore more about Data 
Structures and Algorithms.</p>

<p>In the meantime, these topics will also serve as an introductory 
part to Java Programming.</p>

## 1 Data Structures and Algorithms Overview

### 1.1 Data Storage & Logical Structures

#### 1.1.1 Data Storage Structures

<list type="alpha-lower">
<li>
<p><format color="Fuchsia">Sequential Storage Structures:</format> </p>
    <list type="bullet">
    <li>
        <p>Linear list</p>
    </li>
    <li>
        <p>Array</p>
    </li>
    <li>
        <p>Vector</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">Linked Storage Structure</format> </p>
    <list type="bullet">
    <li>
        <p>Linked list</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">Index Storage Structure</format> </p>
    <list>
    <li>
        <p>B-Tree/B+-Tree</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">Hashing Storage Structure</format> </p>
    <list>
    <li>
        <p>Hash table</p>
    </li>
    </list>
</li>
</list>

#### 1.1.2 Data Logical Structures

<list type="decimal">
<li>
    <p><format color="Fuchsia">Set</format> </p>
</li>
<li>
    <p><format color="Fuchsia">Linear</format> </p>
</li>
<li>
    <p><format color="Fuchsia">Tree</format> </p>
</li>
<li>
    <p><format color="Fuchsia">Graph</format> </p>
</li>
</list>

### 1.2 Mathematical Models

<p><format color = "BlueViolet">Simplifications:</format> </p>

<list type = "decimal">
<li>
<p><format color = "Fuchsia">Cost Model:</format> Use some 
basic operations as a proxy for running time.</p>

<table style="header-row">
<tr>
    <td>Operation</td>
    <td>Frequency</td>
</tr>
<tr>
    <td>Variable declaration</td>
    <td><math>N + 2</math></td>
</tr>
<tr>
    <td>Assignment statement</td>
    <td><math>N + 2</math></td>
</tr>
<tr>
    <td>Less than compare</td>
    <td><math>\frac {(N + 1)(N + 2)} {2}</math></td>
</tr>
<tr>
    <td>Equal to compare</td>
    <td><math>\frac {N(N - 1)} {2}</math></td>
</tr>
<tr>
    <td>Array access</td>
    <td><math>N(N - 1)</math></td>
</tr>
<tr>
    <td>Increment</td>
    <td><math>\frac {N(N - 1)} {2}</math> to <math>N(N - 1)</math></td>
</tr>
</table>

</li>

<li>
    <list type = "bullet">
    <li>
    <p>Estimate running time (or memory) as a function of input 
    size <math>N</math></p>
    </li>
    <li>
    <p>Ignore lower order terms.</p>
        <list type = "bullet">
        <li>
        <p>When <math>N</math> is large, terms are negligible.</p>
        </li>
        <li>
        <p>When <math>N</math> is small, we don't care.</p>
        </li>
        </list>
    </li>
    </list>
</li>
</list>

### 1.3 Order-of-Growth Classifications {id = "Growth"}

#### 1.3.1 Common Classifications

<table style="header-row">
<tr>
    <td>Order of growth</td>
    <td>Name</td>
    <td>Typical code Framework</td>
    <td>Decription</td>
    <td>Example</td>
    <td>T(2N)/T(N)</td>
</tr>
<tr>
    <td><math>1</math></td>
    <td>Constant</td>
    <td><code-block lang="C++">a = b + c;</code-block></td>
    <td>statement</td>
    <td>add two numbers</td>
    <td><math>1</math></td>
</tr>
<tr>
    <td><math>\log N</math></td>
    <td>Logarithmic</td>
    <td><code-block lang = "C++">
    while (N &gt; 1)
    {N = N / 2; ...}
    </code-block></td>
    <td>divide in half</td>
    <td>binary search</td>
    <td><math>- 1</math></td>
</tr>
<tr>
    <td><math>N</math></td>
    <td>Linear</td>
    <td><code-block lang = "C++" noinject = "true">
    for (int i = 0; i &lt; N; i++)
    {...}
    </code-block></td>
    <td>loop</td>
    <td>find the maximum</td>
    <td>2</td>
</tr>
<tr>
    <td><math>N \log N</math></td>
    <td>Linearithmatic</td>
    <td>see <a href="Data-Structures-and-Algorithms-1.md" anchor=
    "mergesort" summary="Mergesort">mergesort lecture</a></td>
    <td>divide and conquer</td>
    <td>mergesort</td>
    <td><math>- 2</math></td>
</tr>
<tr>
    <td><math>N ^ {2}</math></td>
    <td>Quadratic</td>
    <td><code-block lang = "C++">
    for (int i = 0; i &lt; N; i++)
        for (int j = 0; j &lt; N; j++)
            {...}
    </code-block></td>
    <td>double loop</td>
    <td>check all pairs</td>
    <td><math>4</math></td>
</tr>
<tr>
    <td><math>N ^ {3}</math></td>
    <td>Cubic</td>
    <td><code-block lang = "C++">
    for (int i = 0; i &lt; N; i++)
        for (int j = 0; j &lt; N; j++)
            for (int k = 0; k &lt; N; k++)
                {...}
    </code-block></td>
    <td>triple loop</td>
    <td>check all triples</td>
    <td>8</td>
</tr>
<tr>
    <td><math>2 ^ {N}</math></td>
    <td>Exponential</td>
    <td>see combinatorial search lecture</td>
    <td>exhaustive search</td>
    <td>check all subsets</td>
    <td>T(N)</td>
</tr>
</table>

#### 1.3.2 Binary Search

<p><format color="BlueViolet">Property:</format> Binary search 
uses at most <math>\leq 1 + \log N</math> to search in a sorted array
of size <math>N</math>.</p>

<p><format color = "BlueViolet">Proof:</format> </p>

<p><math>T (N) = </math> number of compares to binary search in a sorted 
subarray of size <math>\leq N</math>.</p>

<code-block lang = "tex">
T(N) \leq T\left(\frac{N}{2}\right) + 1, N > 1, T(1) = 1
</code-block>

<code-block lang = "tex">
\begin{align*}
T(N) &\leq T\left(\frac{N}{2}\right) + 1 \\
&\leq T\left(\frac{N}{4}\right) + 1 + 1 \\
&\leq T\left(\frac{N}{8}\right) + 1 + 1 + 1 \\
&... \\
&\leq T\left(\frac{N}{N}\right) + 1 + 1 + ... + 1 \\
&= 1 + \log N
\end{align*}
</code-block>

<procedure title="Binary Seach">
<step>
    <p>Compare key against middle entry.</p>
</step>
<step>
    <p>Too small, go left.</p>
</step>
<step>
    <p>Too big, go right.</p>
</step>
<step>
    <p>Equal, found.</p>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public static int binarySearch(int[] a, int key) {
    int lo = 0;
    int hi = a.length - 1;
    while (lo &lt;= hi) {
        int mid = lo + (hi - lo) / 2;
        if (key &lt; a[mid]) {
            hi = mid - 1;
        } else if (key &gt; a[mid]) {
            lo = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;vector&gt;
\/
int binarySearch(std::vector&lt;int&gt; arr, int x) {
    int l = 0, r = arr.size() - 1;
    while (l &lt;= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) {
            return m;
        }
        if (arr[m] &lt; x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def binary_search(arr, x):
    l, r = 0, len(arr) - 1
    while l &lt;= r:
        m = l + (r - l) // 2
        if arr[m] == x:
            return m
        if arr[m] &lt; x:
            l = m + 1
        else:
            r = m - 1
    return -1
    </code-block>
    </tab>
</tabs>

#### 1.3.3 3-Sum

<p><a href="https://leetcode.com/problems/3sum/description/" 
summary="Leetcode 15: 3Sum">Leetcode 15: 3Sum</a></p>

<p><format color = "BlueViolet">Description:</format> </p>

<p>Given an integer array nums, return all the triplets 
<code>[nums[i], nums[j], nums[k]]</code> such that 
<code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, 
and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>

<procedure title = "3-Sum">
<step>
    <p>Sort the <math>N</math> (distinct) numbers.</p>
</step>
<step>
    <p>For each pair of numbers <code>a[i]</code> and <code>a[j]</code>,
    <format color = "OrangeRed">binary search</format> for <code>
    -(a[i] + a[j])</code>.</p>
</step>
</procedure>

<p><format color="BlueViolet">Analysis:</format> Order of growth is 
<math>N^{2} \log N</math></p>

<list type="bullet">
<li>
    <p>Step 1: <math>N^{2}</math> with insertion sort.</p>
</li>
<li>
    <p>Step 2: <math>N^{2} \log N</math> with binary search.</p>
</li>
</list>

<p><format color="BlueViolet">Better Algorithm:</format> Sorting & 
Two pointers =&gt; <math>O(N^{2})</math></p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
\/
public class Solution {
    public Solution() {
    }
\/
    public List&lt;List&lt;Integer&gt;&gt; threeSum(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);
        List&lt;List&lt;Integer&gt;&gt; answer = new ArrayList&lt;&gt;();
\/        
        for (int first = 0; first &lt; n; ++first) {
            if (first &gt; 0 && nums[first] == nums[first - 1]) {
                continue;
            }
            int third = n - 1;
            int target = -nums[first];
            for (int second = first + 1; second &lt; n; ++second) {
                if (second &gt; first + 1 && nums[second] == nums[second - 1]) {
                    continue;
                }
                while (second &lt; third && nums[second] + nums[third] &gt; target) {
                    --third;
                }
\/
                if (second == third) {
                    break;
                }
                if (nums[second] + nums[third] == target) {
                    List&lt;Integer&gt; list = new ArrayList&lt;&gt;();
                    list.add(nums[first]);
                    list.add(nums[second]);
                    list.add(nums[third]);
                    answer.add(list);
                }
            }
        }
        return answer;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;vector&gt;
#include &lt;algorithm&gt;
\/
std::vector&lt;std::vector&lt;int&gt;&gt; threeSum(std::vector&lt;int&gt;& nums) {
const int n = static_cast&lt;int&gt;(nums.size());
std::sort(nums.begin(), nums.end());
\/
    std::vector&lt;std::vector&lt;int&gt;&gt; answer;
\/
    for (int first = 0; first &lt; n; first++) {
        if (first &gt; 0 && nums[first] == nums[first - 1]) {
            continue;
        }
\/
        int third = n - 1;
        const int target = -nums[first];
\/
        for (int second = first + 1; second &lt; n; second++) {
            if (second &gt; first + 1 && nums[second] == nums[second - 1]) {
                continue;
            }
            while (second &lt; third && nums[second] + nums[third] &gt; target) {
                --third;
            }
\/           
            if (second == third) {
                break;
            }
            if (nums[second] + nums[third] == target) {
                answer.emplace_back(std::vector&lt;int&gt;{nums[first], nums[second], nums[third]});
            }
        }
    }
    return answer;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from typing import List
\/
\/
def threeSum(nums: List[int]) -&gt; List[List[int]]:
    n = len(nums)
    nums.sort()
    ans = list()
\/
    for first in range(n):
        if first &gt; 0 and nums[first] == nums[first - 1]:
            continue
        third = n - 1
        target = -nums[first]
        for second in range(first + 1, n):
            if second &gt; first + 1 and nums[second] == nums[second - 1]:
                continue
            while second &lt; third and nums[second] + nums[third] &gt; target:
                third -= 1
            if second == third:
                break
            if nums[second] + nums[third] == target:
                ans.append([nums[first], nums[second], nums[third]])
\/
    return ans
    </code-block>
    </tab>
</tabs>

### 1.4 Theory of Algorithms

<table style="header-row">
<tr>
    <td>Notion</td>
    <td>Formal Definition</td>
    <td>Provides</td>
    <td>Shorthand for</td>
    <td>Example</td>
    <td>Used to</td>
</tr>
<tr>
    <td><format color="OrangeRed">Big Theta</format></td>
    <td><code-block lang="tex">
    R(N) \in \Theta (f(N))
    </code-block>
    <p>means there are positive constants <math>k_1</math> and <math>
    k_2</math> such that</p>
    <code-block lang = "tex">
    k_1 f(N) \leq R(N) \leq k_2 f(N)
    </code-block>
    </td>
    <td>asymptotic order of growth</td>
    <td><math>\Theta (N ^ {2})</math></td>
    <td><code-block lang="tex">
    \begin{align*}
    &\frac {N ^ {2}}{2} \\
    &10 N^{2} \\
    &5 N^{2} + 22N \log N + 3N \\
    &\text {...} \\
    \end{align*}
    </code-block></td>
    <td>Classify Algorithms</td>
</tr>
<tr>
    <td><format color="OrangeRed">Big Oh</format></td>
    <td><code-block lang="tex">
    R(N) \in O(f(N))
    </code-block>
    <p>means there is a positive constant <math>k_2</math> such that</p>
    <code-block lang="tex">
    R(N) \leq k_2 f(N)
    </code-block></td>
    <td><math>\Theta (N ^ {2})</math> and smaller</td>
    <td><math>O(N ^ {2})</math></td>
    <td><code-block lang="tex">
    \begin{align*}
    &10 N ^ {2} \\
    &100 N \\
    &22 N \log N + 3 N \\
    &\text {...} \\
    \end{align*}
    </code-block></td>
    <td>Develop Upper Bounds</td>
</tr>
<tr>
    <td><format color="OrangeRed">Big Omega</format></td>
    <td><code-block lang="tex">
    R(N) \in \Omega (f(N))
    </code-block>
    <p>means there is a positive constant <math>k_1</math> such that</p>
    <code-block lang="tex">
    k_1 f(N) \leq R(N)
    </code-block></td>
    <td><math>\Theta (N ^ {2})</math> and larger</td>
    <td><math>\Omega (N ^ {2})</math></td>
    <td><code-block lang="tex">
    \begin{align*}
    &\frac {N ^ {2}}{2} \\
    &N ^ {5} \\
    &N ^ {3} + 22 N \log N + 3 N \\
    &\text {...} \\
    \end{align*}
    </code-block></td>
    <td>Develop Lower Bounds</td>
</tr>
</table>