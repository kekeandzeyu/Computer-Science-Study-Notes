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

<list type = "alpha-lower">
<li>
<format color = "Fuchsia">Sequential Storage Structure</format>
    <list type = "bullet">
    <li><p>Linear list</p></li>
    <li><p>Array</p></li>
    <li><p>Vector</p></li>
    </list>
</li>
<li>
<format color = "Fuchsia">Linked Storage Structure</format>
    <list type = "bullet">
    <li>Linked list</li>
    </list>
</li>
<li>
<format color = "Fuchsia">Index Storage Structure</format>
    <list>
    <li>B-Tree/B+-Tree</li>
    </list>
</li>
<li>
<format color = "Fuchsia">Hashing Storage Structure</format>
    <list>
    <li>Hash table</li>
    </list>
</li>
</list>

#### 1.1.2 Data Logical Structures

<list type = "decimal">
<li>Set</li>
<li>Linear</li>
<li>Tree</li>
<li>Graph</li>
</list>

### 1.2 Mathematical Models

<p><format color = "BlueViolet">Simplifications:</format> </p>

<list type = "decimal">
<li>
<p><format color = "Fuchsia">Cost Model</format>: Use some 
basic operations as a proxy for running time.</p>
<table>
<tr><td>Operation</td><td>Frequency</td></tr>
<tr><td>Variable declaration</td><td><math>N + 2</math></td></tr>
<tr><td>Assignment statement</td><td><math>N + 2</math></td></tr>
<tr><td>Less than compare</td><td><math>\frac {(N + 1)(N + 2)} {2}
</math></td></tr>
<tr><td>Equal to compare</td><td><math>\frac {N(N - 1)} {2}</math>
</td></tr>
<tr><td>Array access</td><td><math>N(N - 1)</math></td></tr>
<tr><td>Increment</td><td><math>\frac {N(N - 1)} {2}</math> to <math>
N(N - 1)</math></td></tr>
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

<table>
<tr><td>Order of growth</td><td>Name</td><td>Typical code 
Framework</td><td>Decription</td><td>Example</td><td>T(2N)/T(N)</td>
</tr>
<tr><td><math>1</math></td><td>constant</td>
<td><code-block lang = "C++">a = b + c;</code-block></td>
<td>statement</td><td>add two numbers</td><td>1</td></tr>
<tr><td><math>\log N</math></td><td>logarithmic</td>
<td><code-block lang = "C++">
while (N &gt; 1)
{N = N / 2; ...}
</code-block></td><td>divide in half</td><td>binary search</td><td>- 1</td></tr>
<tr><td><math>N</math></td><td>linear</td>
<td><code-block lang = "C++" noinject = "true">
for (int i = 0; i &lt; N; i++)
{...}
</code-block></td><td>loop</td><td>find the maximum</td><td>2</td></tr>
<tr><td><math>N \log N</math></td><td>linearithmatic</td>
<td>see <a href="Data-Structures-and-Algorithms-1.md" anchor = "mergesort" 
summary="Mergesort">mergesort lecture</a></td><td>divide and conquer
</td><td>mergesort</td>
<td>- 2</td></tr>
<tr><td><math>N ^ {2}</math></td><td>quadratic</td>
<td><code-block lang = "C++">
for (int i = 0; i &lt; N; i++)
    for (int j = 0; j &lt; N; j++)
        {...}
</code-block></td><td>double loop</td><td>check all pairs</td>
<td>4</td></tr>
<tr><td><math>N ^ {3}</math></td><td>cubic</td>
<td><code-block lang = "C++">
for (int i = 0; i &lt; N; i++)
    for (int j = 0; j &lt; N; j++)
        for (int k = 0; k &lt; N; k++)
            {...}
</code-block></td><td>triple loop</td><td>check all triples</td>
<td>8</td></tr>
<tr><td><math>2 ^ {N}</math></td><td>exponential</td>
<td>see combinational search lecture</td><td>exhaustive search</td>
<td>check all subsets</td><td>T(N)</td></tr>
</table>

#### 1.3.2 Binary Search

<p><format color = "BlueViolet">Properties:</format> Binary search 
uses at most &le; <math>1 + \log N</math> to search in a sorted array
of size <math>N</math>.</p>

<p><format color = "BlueViolet">Proof skectch:</format> </p>

<p>
<math>T (N) = </math> number of compares to binary search in a sorted 
subarray of size <math>\leq N</math>.
</p>

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

<procedure title = "Basic Plan for Binary Seach">
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

Java

```Java
public static int binarySearch(int[] a, int key) {
    int lo = 0;
    int hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (key < a[mid]) {
            hi = mid - 1;
        } else if (key > a[mid]) {
            lo = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}
```

C++

```C++
int binarySearch(std::vector<int> arr, int x) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) {
            return m;
        }
        if (arr[m] < x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
}
```

Python

```Python
def binary_search(arr, x):
    l, r = 0, len(arr) - 1
    while l <= r:
        m = l + (r - l) // 2
        if arr[m] == x:
            return m
        if arr[m] < x:
            l = m + 1
        else:
            r = m - 1
    return -1
```

#### 1.3.3 3-Sum

<p><a href = "https://leetcode.com/problems/3sum/description/" 
summary = "Leetcode 15: 3Sum">Leetcode 15: 3Sum</a></p>

<p><format color = "BlueViolet">Description:</format> </p>

<p>Given an integer array nums, return all the triplets 
<code>[nums[i], nums[j], nums[k]]</code> such that 
<code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, 
and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>

<procedure title = "Basic Plan for 3-Sum">
<step>
Sort the <math>N</math> (distinct) numbers.
</step>
<step>
For each pair of numbers <code>a[i]</code> and <code>a[j]</code>,
<format color = "OrangeRed">binary search</format> for 
<code>-(a[i] + a[j])</code>.
</step>
</procedure>

<p>Analysis: Order of grwoth is <math>N ^ {2} \log N</math></p>

<list type = "bullet">
<li>
Step 1: <math>N ^ {2}</math> with insertion sort. (not necessarily!)
</li>
<li>
Step 2: <math>N ^ {2} \log N</math> with binary search.
</li>
</list>

### 1.4 Theory of Algorithms

<table>
<tr><td>Notion</td><td>Formal Definition</td><td>Provides</td><td>Example</td>
<td>Shorthand for</td><td>Used to</td></tr>
<tr><td><format color = "OrangeRed">Big Theta</format></td>
<td>
<code-block lang = "tex">
R(N) \in \Theta (f(N))
</code-block>
<p>means there are positive constants <math>k_1</math> and <math>k_2
</math> such that</p>
<code-block lang = "tex">
k_1 f(N) \leq R(N) \leq k_2 f(N)
</code-block>
</td>
<td>asymptotic order of growth</td><td><math>\Theta (N ^ {2})</math></td>
<td><code-block lang = "tex">
\begin{align*}
&\frac {N ^ {2}}{2} \\
&10 N ^ {2} \\
&5 N ^ {2} + 22 N \log N + 3 N \\
\text {...}
\end{align*}
</code-block></td><td>classify algorithms</td></tr>
<tr><td><format color = "OrangeRed">Big Oh</format></td>
<td>
<code-block lang = "tex">
R(N) \in O(f(N))
</code-block>
<p>means there is a positive constant <math>k_2
</math> such that</p>
<code-block lang = "tex">
R(N) \leq k_2 f(N)
</code-block>
</td>
<td><math>\Theta (N ^ {2})</math> and smaller</td><td><math>O(N ^ {2})</math></td>
<td><code-block lang = "tex">
\begin{align*}
&10 N ^ {2} \\
&100 N \\
&22 N \log N + 3 N \\
\text {...}
\end{align*}
</code-block></td><td>develop upper bounds</td></tr>
<tr><td><format color = "OrangeRed">Big Omega</format></td>
<td>
<code-block lang = "tex">
R(N) \in \Omega (f(N))
</code-block>
<p>means there is a positive constant <math>k_1</math> such that</p>
<code-block lang = "tex">
k_1 f(N) \leq R(N)
</code-block>
</td>
<td><math>\Theta (N ^ {2})</math> and larger</td><td><math>\Omega (N ^ {2})</math></td>
<td><code-block lang = "tex">
\begin{align*}
&\frac {N ^ {2}}{2} \\
&N ^ {5} \\
&N ^ {3} + 22 N \log N + 3 N \\
\text {...}
\end{align*}
</code-block></td><td>develop lower bounds</td></tr>
</table>