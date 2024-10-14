# Part Ⅳ

## 25 Linear Programming

<p><format color="DarkOrange">Linear Programming:</format> A problem-solving 
model for optimal allocation of scarce resources.</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Agriculture:</format> Diet problem</p>
</li>
<li>
    <p><format color="Fuchsia">Computer science:</format> Compiler register
    allocation, data mining</p>
</li>
<li>
    <p><format color="Fuchsia">Electrical engineering:</format> VLSI design,
    optimal clocking</p>
</li>
<li>
    <p><format color="Fuchsia">Energy:</format> Blending petroleum products</p>
</li>
<li>
    <p><format color="Fuchsia">Economics:</format> Equilibrium theory, two-person 
    zero-sum games</p>
</li>
<li>
    <p><format color="Fuchsia">Environment:</format> Water quality management</p>
</li>
<li>
    <p><format color="Fuchsia">Finance:</format> Portfolio optimization</p>
</li>
<li>
    <p><format color="Fuchsia">Logistics:</format> Supply-chain management</p>
</li>
<li>
    <p><format color="Fuchsia">Management:</format> Hotel yield management</p>
</li>
<li>
    <p><format color="Fuchsia">Marketing:</format> Direct mail advertising</p>
</li>
<li>
    <p><format color="Fuchsia">Manufacturing:</format> Production line balancing,
    cutting stock</p>
</li>
<li>
    <p><format color="Fuchsia">Medicine:</format> Radioactive seed placement 
    in cancer treatment</p>
</li>
<li>
    <p><format color="Fuchsia">Operations research:</format> Airline crew 
    assignment, vehicle routing</p>
</li>
<li>
    <p><format color="Fuchsia">Physics:</format> Ground states of 3-D Ising 
    spin glasses</p>
</li>
<li>
    <p><format color="Fuchsia">Telecommunication:</format> Network design, 
    Internet routing</p>
</li>
<li>
    <p><format color="Fuchsia">Sports:</format> Scheduling ACC basketball, 
    handicapping horse races</p>
</li>
</list>

### 25.1 Brewer's Problem

<p><format color="BlueViolet">Brewer's problem:</format> Small brewery 
produces ale and beer, Production limited by scarce resources: corn, hops,
barley malt.</p>

<list type="bullet">
<li>
    <p>$13 profit per barrel: 5 pounds corn, 4 ounces hops, 35 pounds halt</p>
</li>
<li>
    <p>$23 profit per barrel: 15 pounds corn, 4 ounces hops, 20 pounds halt</p>
</li>
<li>
    <p>corn: 480 lbs</p>
</li>
<li>
    <p>hops: 160 oz</p>
</li>
<li>
    <p>malt: 1190 lbs</p>
</li>
</list>

<p>Now we have:</p>

<code-block lang="tex">
\begin{align*}
\text{Maximize} \quad & 13x + 23y \\
\text{Subject to} \quad & 5x + 15y = 480 \\
& 4x + 4y = 160 \\
& 35x + 20y = 1190 \\
& x \geq 0, y \geq 0
\end{align*}
</code-block>

<img src="../images_data/d25-1-1.png" alt="Brewer's Problem"/>

<img src="../images_data/d25-1-2.png" alt="Maximize profit"/>

<p>Standard form linear program</p>

<tabs>
    <tab title="Primal Problem">
    <code-block lang="tex">
\begin{align*}
\text{Maximize} \quad c_1 x-1 + c_2 x_2 + \cdots + c_n x_n \\
\text{Subject to} \quad a_{11} x_1 + a_{12} x_2 + \cdots + a_{1n} x_n & \leq b_1 \\
a_{21} x_1 + a_{22} x_2 + \cdots + a_{2n} x_n & \leq b_2 \\
\vdots \\
a_{m1} x_1 + a_{m2} x_2 + \cdots + a_{mn} x_n & \leq b_m \\
x_1, x_2, \ldots, x_n & \geq 0
\end{align*}
    </code-block>
    </tab>
    <tab title="Matrix Version">
    <code-block lang="tex">
\begin{align*}
\text{Maximize} \quad \mathbf{c}^T \mathbf{x} \\
\text{Subject to} \quad \mathbf{A} \mathbf{x} & \leq \mathbf{b} \\
\mathbf{x} & \geq 0
\end{align*}
    </code-block>
    </tab>
</tabs>

<p><format color="BlueViolet">Extreme point property:</format> If there exists 
an optimal solution to (P),then there exists one that is an extreme point.</p>

### 25.2 Simplex Algorithm

<procedure title="Generic Implementation">
<step>
    <p>Start at some extreme point.</p>
</step>
<step>
    <p>Pivot from one extreme point to an adjacent one.</p>
</step>
<step>
    <p>Repeat until optimal.</p>
</step>
</procedure>

<procedure title="Simplex Algorithm - Basic feasible solution">
<step>
    <p>Set <math>n -m</math> nonbasic variables to <math>0</math>, solve 
    for remaining <math>m</math> variables.</p>
</step>
<step>
    <p>Solve <math>m</math> equations in <math>m</math> unknowns.</p>
</step>
<step>
    <p>If unique and feasible => BFS</p>
</step>
<step>
    <p>BFS &lt;=&gt; extreme point</p>
</step>
</procedure>

<p>Recall:</p>

<code-block lang="tex">
\begin{align*}
\text{Maximize} \quad & 13x + 23y \\
\text{Subject to} \quad & 5x + 15y = 480 \\
& 4x + 4y = 160 \\
& 35x + 20y = 1190 \\
& x \geq 0, y \geq 0
\end{align*}
</code-block>

<p>Initialize:</p>

<code-block lang="tex">
\begin{align*}
\text{Maximize} \quad & 13x + 23y -z \\
\text{Subject to} \quad & 5x + 15y + S_c = 480 \\
& 4x + 4y + S_h = 160 \\
& 35x + 20y + S_m = 1190 \\
& x, y, S_c, S_h, S_m \geq 0
\end{align*}
</code-block>

<list type="bullet">
<li>
    <p>Pivot 1: Substitute B = (1/15) (480 – 5A – SC) and add B into the basis
    (rewrite 2nd equation, eliminate B in 1st, 3rd, and 4th equations)</p>
    <code-block lang="tex">
\begin{align*}
\text{Maximize} \quad & \frac {16}{3}x + \frac {23}{15}y -z = -736\\
\text{Subject to} \quad & \frac {1}{3}x + y + \frac {1}{15}S_c = 32 \\
& \frac {8}{3}x - \frac {4}{15}S_c + S_h = 32 \\
& \frac {85}{3}x - \frac {4}{3}S_c + S_m = 550 \\
& x, y, S_c, S_h, S_m \geq 0
\end{align*}
    </code-block>
</li>
</list>

## 30 Catalan Number

### 30.1 Properties and Formulas

<list type="decimal">
<li>
    <code-block lang="tex">
        C_n = \frac{1}{n+1} \binom{2n}{n} = \frac{(2n)!}{(n + 1)!n!} 
    </code-block>
</li>
<li>
    <code-block lang = "tex" style = "inline">
        C_n = \binom{2n}{n} - \binom{2n}{n+1}
    </code-block>
</li>
<li>
    <code-block lang = "tex" style = "inline">
        C_n = \sum_{i=0}^{n} C_{i-1} C_{n-i}
    </code-block>
</li>
<li>
    <code-block lang = "tex" style = "inline">
        C_n = \frac{2(2n-1)}{n+1} C_{n-1}
    </code-block>
</li>
</list>

### 30.2 Applications

<list type="decimal">
<li>
    <p>It is the number of expressions containing <math>n</math> pairs of
    parentheses which are correctly matched.</p>
    <p>For <math>n = 3</math>, for example:</p>
    <p>((())), (()()), (())(), ()(()), ()()().</p>
</li>
<li>
    <p>It is the number of different ways <math>n + 1</math> factors can be
    completely parenthesized (or the number of ways of associating <math>n</math> 
    applications of a binary operator, as in the matrix chain multiplication 
    problem).</p>
    <p>For <math>n = 3</math>, for example:</p>
    <p>((ab)c)d, (a(bc))d, (ab)(cd), a((bc)d), a(b(cd)).</p>
</li>
<li>
    <p>It is the number of full binary trees with <math>n + 1</math> leaves
    , or, equivalently, with a total of <math>n</math> internal nodes.</p>
    <note>
    <p>A full binary tree is a tree in which every node has either 0 or 2 
    children.</p>
    </note>
    <p>For <math>n = 3</math>, for example:</p>
    <img src="../images_data/d31-2-1.png" alt="Full Binary Tree"/>
</li>
<li>
    <p>It is the number of structurally unique BSTs (binary search trees) 
    which has exactly <math>n</math> nodes of unique values from <math>1</math>
    to <math>n</math>.</p>
    <p>For <math>n = 3</math>, for example:</p>
    <img src="../images_data/d31-2-2.jpg" alt="BST"/></li>
<li>
    <p>It is the number of Dyck words of length <math>2n</math>. A Dyck 
    word is a string consisting of <math>n</math> X's and <math>n</math> 
    Y's such that no initial segment of the string has more Y's than X's.
    </p>
    <p>For example, Dyck words for <math>n = 3</math>:</p>
    <p>XXXYYY     XYXXYY     XYXYXY     XXYYXY     XXYXYY</p>
</li>
<li>
    <p>It is the number of monotonic lattice paths along the edges of a
    grid with <math>n \times n</math> square cells, which do not pass
    above the diagonal.</p>
    <note>
    <list type="bullet">
    <li>
        <p>A monotonic path is one which starts in the lower left corner,
        finishes in the upper right corner, and consists entirely of
        edges pointing rightwards or upwards.</p>
    </li>
    <li>
        <p>Counting such paths is equivalent to counting Dyck words:
        X stands for &quot;move right&quot; and Y stands for &quot;move up&quot;.</p>
    </li>
    </list>
    </note>
</li>
<li>
    <p>A convex polygon with <math>n + 2</math> sides can be cut into
    triangles by connecting vertices with non-crossing line segments
    (a form of polygon triangulation). The number of triangles formed
    is <math>n</math> and it is the number of different ways that this
    can be achieved.</p>
</li>
</list>

### 30.3 Implementation

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public static BigInteger catalan(int n) {
    BigInteger res = BigInteger.ONE;
\/
    for (int i = 0; i &lt; n; i++) {
        res = res.multiply(BigInteger.valueOf(2L * n - i));
        res = res.divide(BigInteger.valueOf(i + 1));
    }
\/
    return res.divide(BigInteger.valueOf(n + 1));
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
unsigned long int binomialCoeff(unsigned int n, unsigned int k) {
    if (k &gt; n) return 0;
    if (k == 0 || k == n) return 1;
\/
    unsigned long int res = 1;
    for (int i = 0; i &lt; k; i++) {
        res *= (n - i);
        res /= (i + 1);
    }
\/
    return res;
}
\/
unsigned long int catalan(unsigned int n) {
    unsigned long int c = binomialCoeff(2*n, n);
    return c/(n+1);
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
import math
\/
\/
def catalan_number(n):
return math.comb(2 * n, n) // (n + 1)
    </code-block>
    </tab>
</tabs>