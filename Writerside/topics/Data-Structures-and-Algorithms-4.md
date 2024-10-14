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
    <p>Pivot 1: Substitute y = (1/15) (480 – 5A – SC) and add y into the basis
    (rewrite 2nd equation, eliminate y in 1st, 3rd, and 4th equations)</p>
    <code-block lang="tex">
\begin{align*}
\text{Maximize} \quad & \frac {16}{3}x + \frac {23}{15}y -z = -736\\
\text{Subject to} \quad & \frac {1}{3}x + y + \frac {1}{15}S_c = 32 \\
& \frac {8}{3}x - \frac {4}{15}S_C + S_H = 32 \\
& \frac {85}{3}x - \frac {4}{3}S_C + S_M = 550 \\
& x, y, S_c, S_h, S_m \geq 0
\end{align*}
    </code-block>
    <p>basis = {B, S <sub>H</sub>, S <sub>M</sub>}</p>
    <p>x = S <sub>C</sub> = 0</p>
    <p>Z = 736</p>
    <p>y = 32</p>
    <p>S <sub>H</sub> = 32</p>
    <p>S <sub>M</sub> = 550</p>
    <p><format color="Aqua">Q:</format> Why pivot on column 2 (corresponding 
    to variable <math>y</math>)?</p>
    <p><format color="PaleGoldenRod">A:</format> </p>
    <list type="bullet">
    <li>
        <p>Its objective function coefficient is positive.</p>
        <p>(each unit increase in <math>y</math> from <math>0</math> increases 
        objective value by <math>$23</math>)</p>
    </li>
    <li>
        <p>Pivoting on column 1 (corresponding to <math>x</math>) also OK.</p>
    </li>
    </list>
    <p><format color="Aqua">Q:</format> Why pivot on row 2?</p>
    <p><format color="PaleGoldenRod">A:</format> </p>    
    <list type="bullet">
    <li>
        <p>Preserves feasibility by ensuring <math>\text{RHS} \geq 0</math>.</p>
    </li>
    <li>
        <p>Minimum ratio rule: min { <math>480/15</math>, <math>160/4</math>, <math>1190/20</math> }
        </p>
    </li>
    </list>
</li>
<li>
    <p>Pivot 2: Substitute x = (3/8) (32 + (4/15) S <sub>C</sub> – S <sub>H</sub> ) 
    and add x into the basis (rewrite 3rd equation, eliminate x in 1st, 2nd, 
    and 4th equations)</p>
    <code-block lang="tex">
\begin{align*}
\text{Maximize} \quad - S_C - 2 S_H - Z = -800 \\
\text{Subject to} \quad y + \frac {1}{10}S_C + \frac {1}{8}S_H &= 28 \\
 x - \frac {1}{10} S_C + \frac {3}{8} S_H &= 12 \\
 \frac {25}{6} S_C - \frac {85}{8} S_H + S_M &= 550 \\
 x, y, S_c, S_h, S_m &\geq 0
\end{align*}
    </code-block>
    <p>basis = { x, y, S <sub>M</sub> }</p>
    <p>S <sub>C</sub> = S <sub>H</sub> = 0</p>
    <p>Z = 800</p>
    <p>y = 28</p>
    <p>x = 12</p>
    <p>S <sub>M</sub> = 110</p>
    <p><format color="Aqua">Q:</format> When to stop pivoting?</p>
    <p><format color="PaleGoldenRod">A:</format> When no objective function 
    coefficient is positive.</p>
    <p><format color="Aqua">Q:</format> Why is resulting solution optimal?</p>
    <p><format color="PaleGoldenRod">A:</format> Any feasible solution 
    satisfies current system of equations.</p>
    <list type="bullet">
    <li>
        <p>In particular: <math>Z = 800 – S_C – 2 S_H</math></p>
    </li>
    <li>
        <p>Thus, optimal objective value <math>Z* \leq 800</math> since 
        <math>S_C , S_H \geq 0</math>.</p>
    </li>
    <li>
        <p>Current BFS has value <math>800</math> => optimal.</p>
    </li>
    </list>
</li>
</list>

### 25.3 Implementation

<p><format color="BlueViolet">Bland's Rule:</format> Find entering column 
<math>q</math> using Bland's rule: index of first column whose objective function
coefficient is positive.</p>

<p><format color="BlueViolet">Min-ratio Rule:</format> Find leaving row 
<math>p</math> using min ratio rule. (Bland's rule: if a tie, choose first 
such row)</p>

<p><format color="BlueViolet">Pivot:</format> Pivot on element row <math>p</math>
, column <math>q</math>.</p>

<p><format color="BlueViolet">Property:</format> In typical practical applications, 
simplex algorithm terminates after at most <math>2 (m + n)</math> pivots.
</p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class LinearProgramming {
    private static final double EPSILON = 1.0E-10;
    private final double&#91;&#93;&#91;&#93; a;
    private final int m;
    private final int n;
\/
    private final int&#91;&#93; basis;
\/
    public LinearProgramming(double&#91;&#93;&#91;&#93; A, double&#91;&#93; b, double&#91;&#93; c) {
        m = b.length;
        n = c.length;
        for (int i = 0; i &lt; m; i++) {
            if (!(b&#91;i&#93; &gt;= 0)) {
                throw new IllegalArgumentException("RHS must be nonnegative");
            }
        }
\/
        a = new double&#91;m + 1&#93;&#91;n + m + 1&#93;;
        for (int i = 0; i &lt; m; i++) {
            System.arraycopy(A&#91;i&#93;, 0, a&#91;i&#93;, 0, n);
        }
        for (int i = 0; i &lt; m; i++) {
            a&#91;i&#93;&#91;n + i&#93; = 1.0;
        }
        System.arraycopy(c, 0, a&#91;m&#93;, 0, n);
        for (int i = 0; i &lt; m; i++) {
            a&#91;i&#93;&#91;m + n&#93; = b&#91;i&#93;;
        }
\/
        basis = new int&#91;m&#93;;
        for (int i = 0; i &lt; m; i++) {
            basis&#91;i&#93; = n + i;
        }
\/
        solve();
        assert check(A, b, c);
    }
\/
    private void solve() {
        while (true) {
            int q = bland();
            if (q == -1) {
                break;
            }
\/
            int p = minRatioRule(q);
            if (p == -1) {
                throw new ArithmeticException("Linear program is unbounded");
            }
\/
            pivot(p, q);
\/
            basis&#91;p&#93; = q;
        }
    }
\/
    private int bland() {
        for (int j = 0; j &lt; m + n; j++) {
            if (a&#91;m&#93;&#91;j&#93; &gt; 0) {
                return j;
            }
        }
        return -1;
    }
\/
    private int minRatioRule(int q) {
        int p = -1;
        for (int i = 0; i &lt; m; i++) {
            if (a&#91;i&#93;&#91;q&#93; &lt;= EPSILON) {
                continue;
            } else if (p == -1) {
                p = i;
            } else if ((a&#91;i&#93;&#91;m + n&#93; / a&#91;i&#93;&#91;q&#93;) &lt; (a&#91;p&#93;&#91;m + n&#93; / a&#91;p&#93;&#91;q&#93;)) {
                p = i;
            }
        }
        return p;
    }
\/
    private void pivot(int p, int q) {
        for (int i = 0; i &lt;= m; i++) {
            for (int j = 0; j &lt;= m + n; j++) {
                if (i != p && j != q) {
                    a&#91;i&#93;&#91;j&#93; -= a&#91;p&#93;&#91;j&#93; * (a&#91;i&#93;&#91;q&#93; / a&#91;p&#93;&#91;q&#93;);
                }
            }
        }
\/
        for (int i = 0; i &lt;= m; i++) {
            if (i != p) {
                a&#91;i&#93;&#91;q&#93; = 0.0;
            }
        }
\/
        for (int j = 0; j &lt;= m + n; j++) {
            if (j != q) {
                a&#91;p&#93;&#91;j&#93; /= a&#91;p&#93;&#91;q&#93;;
            }
        }
        a&#91;p&#93;&#91;q&#93; = 1.0;
    }
\/
    public double value() {
        return -a&#91;m&#93;&#91;m + n&#93;;
    }
\/
    public double&#91;&#93; primal() {
        double&#91;&#93; x = new double&#91;n&#93;;
        for (int i = 0; i &lt; m; i++) {
            if (basis&#91;i&#93; &lt; n) {
                x&#91;basis&#91;i]] = a&#91;i&#93;&#91;m + n&#93;;
            }
        }
        return x;
    }
\/
    public double&#91;&#93; dual() {
        double&#91;&#93; y = new double&#91;m&#93;;
        for (int i = 0; i &lt; m; i++) {
            y&#91;i&#93; = -a&#91;m&#93;&#91;n + i&#93;;
            if (y&#91;i&#93; == -0.0) {
                y&#91;i&#93; = 0.0;
            }
        }
        return y;
    }
\/
    private boolean isPrimalFeasible(double&#91;&#93;&#91;&#93; A, double&#91;&#93; b) {
        double&#91;&#93; x = primal();
\/
        for (int j = 0; j &lt; x.length; j++) {
            if (x&#91;j&#93; &lt; -EPSILON) {
                System.out.println("x&#91;" + j + "&#93; = " + x&#91;j&#93; + " is negative");
                return false;
            }
        }
\/
        for (int i = 0; i &lt; m; i++) {
            double sum = 0.0;
            for (int j = 0; j &lt; n; j++) {
                sum += A&#91;i&#93;&#91;j&#93; * x&#91;j&#93;;
            }
            if (sum &gt; b&#91;i&#93; + EPSILON) {
                System.out.println("not primal feasible");
                System.out.println("b&#91;" + i + "&#93; = " + b&#91;i&#93; + ", sum = " + sum);
                return false;
            }
        }
        return true;
    }
\/
    private boolean isDualFeasible(double&#91;&#93;&#91;&#93; A, double&#91;&#93; c) {
        double&#91;&#93; y = dual();
\/
        for (int i = 0; i &lt; y.length; i++) {
            if (y&#91;i&#93; &lt; -EPSILON) {
                System.out.println("y&#91;" + i + "&#93; = " + y&#91;i&#93; + " is negative");
                return false;
            }
        }
\/
        for (int j = 0; j &lt; n; j++) {
            double sum = 0.0;
            for (int i = 0; i &lt; m; i++) {
                sum += A&#91;i&#93;&#91;j&#93; * y&#91;i&#93;;
            }
            if (sum &lt; c&#91;j&#93; - EPSILON) {
                System.out.println("not dual feasible");
                System.out.println("c&#91;" + j + "&#93; = " + c&#91;j&#93; + ", sum = " + sum);
                return false;
            }
        }
        return true;
    }
\/
    private boolean isOptimal(double&#91;&#93; b, double&#91;&#93; c) {
        double&#91;&#93; x = primal();
        double&#91;&#93; y = dual();
        double value = value();
\/
        double value1 = 0.0;
        for (int j = 0; j &lt; x.length; j++) {
            value1 += c&#91;j&#93; * x&#91;j&#93;;
        }
        double value2 = 0.0;
        for (int i = 0; i &lt; y.length; i++) {
            value2 += y&#91;i&#93; * b&#91;i&#93;;
        }
        if (Math.abs(value - value1) &gt; EPSILON || Math.abs(value - value2) &gt; EPSILON) {
            System.out.println("value = " + value + ", cx = " + value1 + ", yb = " + value2);
            return false;
        }
\/
        return true;
    }
\/
    private boolean check(double&#91;&#93;&#91;&#93; A, double&#91;&#93; b, double&#91;&#93; c) {
        return isPrimalFeasible(A, b) &amp;&amp; isDualFeasible(A, c) &amp;&amp; isOptimal(b, c);
    }
\/
    private static void test(double&#91;&#93;&#91;&#93; A, double&#91;&#93; b, double&#91;&#93; c) {
        LinearProgramming lp;
        try {
            lp = new LinearProgramming(A, b, c);
        } catch (ArithmeticException e) {
            System.out.println(e);
            return;
        }
\/
        System.out.println("value = " + lp.value());
        double&#91;&#93; x = lp.primal();
        for (int i = 0; i &lt; x.length; i++) {
            System.out.println("x&#91;" + i + "&#93; = " + x&#91;i&#93;);
        }
        double&#91;&#93; y = lp.dual();
        for (int j = 0; j &lt; y.length; j++) {
            System.out.println("y&#91;" + j + "&#93; = " + y&#91;j&#93;);
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;cassert&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;cmath&gt;
#include &lt;random&gt;
\/
class LinearProgramming {
private:
    static constexpr double EPSILON = 1.0E-10;
    std::vector&lt;std::vector&lt;double&gt;&gt; a;
    int m;
    int n;
\/
    std::vector&lt;int&gt; basis;
\/
public:
    LinearProgramming(const std::vector&lt;std::vector&lt;double&gt;&gt;& A, const std::vector&lt;double&gt;& b, const std::vector&lt;double&gt;& c) {
        m = static_cast&lt;int&gt;(b.size());
        n = static_cast&lt;int&gt;(c.size());
        for (int i = 0; i &lt; m; i++) {
            if (!(b[i] &gt;= 0)) {
                throw std::runtime_error("RHS must be nonnegative");
            }
        }
\/
        a.resize(m + 1, std::vector&lt;double&gt;(n + m + 1));
        for (int i = 0; i &lt; m; i++) {
            for (int j = 0; j &lt; n; j++) {
                a[i][j] = A[i][j];
            }
        }
        for (int i = 0; i &lt; m; i++) {
            a[i][n + i] = 1.0;
        }
        for (int j = 0; j &lt; n; j++) {
            a[m][j] = c[j];
        }
        for (int i = 0; i &lt; m; i++) {
            a[i][m + n] = b[i];
        }
\/
        basis.resize(m);
        for (int i = 0; i &lt; m; i++) {
            basis[i] = n + i;
        }
\/
        solve();
\/
        assert(check(A, b, c));
    }
\/
private:
    void solve() {
        while (true) {
            const int q = bland();
            if (q == -1) {
                break;
            }
\/
            int p = minRatioRule(q);
            if (p == -1) {
                throw std::runtime_error("Linear program is unbounded");
            }
            pivot(p, q);
\/
            basis[p] = q;
        }
    }
\/
    [[nodiscard]] int bland() const {
        for (int j = 0; j &lt; m + n; j++) {
            if (a[m][j] &gt; 0) {
                return j;
            }
        }
        return -1;
    }
\/
    [[nodiscard]] int minRatioRule(const int q) const {
        int p = -1;
        for (int i = 0; i &lt; m; i++) {
            if (a[i][q] &lt;= EPSILON) {
                continue;
            } else if (p == -1) {
                p = i;
            } else if ((a[i][m + n] / a[i][q]) &lt; (a[p][m + n] / a[p][q])) {
                p = i;
            }
        }
        return p;
    }
\/
    void pivot(const int p, const int q) {
        for (int i = 0; i &lt;= m; i++) {
            for (int j = 0; j &lt;= m + n; j++) {
                if (i != p && j != q) {
                    a[i][j] -= a[p][j] * (a[i][q] / a[p][q]);
                }
            }
        }
\/
        for (int i = 0; i &lt;= m; i++) {
            if (i != p) {
                a[i][q] = 0.0;
            }
        }
\/
        for (int j = 0; j &lt;= m + n; j++) {
            if (j != q) {
                a[p][j] /= a[p][q];
            }
        }
        a[p][q] = 1.0;
    }
\/
public:
    [[nodiscard]] double value() const {
        return -a[m][m + n];
    }
\/
    [[nodiscard]] std::vector&lt;double&gt; primal() const {
        std::vector&lt;double&gt; x(n);
        for (int i = 0; i &lt; m; i++) {
            if (basis[i] &lt; n) {
                x[basis[i]] = a[i][m + n];
            }
        }
        return x;
    }
\/
    [[nodiscard]] std::vector&lt;double&gt; dual() const {
        std::vector&lt;double&gt; y(m);
        for (int i = 0; i &lt; m; i++) {
            y[i] = -a[m][n + i];
            if (y[i] == -0.0) {
                y[i] = 0.0;
            }
        }
        return y;
    }
\/
private:
    [[nodiscard]] bool isPrimalFeasible(const std::vector&lt;std::vector&lt;double&gt;&gt;& A, const std::vector&lt;double&gt;& b) const {
        const std::vector&lt;double&gt; x = primal();
\/
        for (int j = 0; j &lt; x.size(); j++) {
            if (x[j] &lt; -EPSILON) {
                std::cout &lt;&lt; "x[" &lt;&lt; j &lt;&lt; "] = " &lt;&lt; x[j] &lt;&lt; " is negative" &lt;&lt; std::endl;
                return false;
            }
        }
\/
        for (int i = 0; i &lt; m; i++) {
            double sum = 0.0;
            for (int j = 0; j &lt; n; j++) {
                sum += A[i][j] * x[j];
            }
            if (sum &gt; b[i] + EPSILON) {
                std::cout &lt;&lt; "not primal feasible" &lt;&lt; std::endl;
                std::cout &lt;&lt; "b[" &lt;&lt; i &lt;&lt; "] = " &lt;&lt; b[i] &lt;&lt; ", sum = " &lt;&lt; sum &lt;&lt; std::endl;
                return false;
            }
        }
        return true;
    }
\/
\/
    [[nodiscard]] bool isDualFeasible(const std::vector&lt;std::vector&lt;double&gt;&gt;& A, const std::vector&lt;double&gt;& c) const {
        std::vector&lt;double&gt; y = dual();
\/
        for (size_t i = 0; i &lt; y.size(); i++) {
            if (y[i] &lt; -EPSILON) {
                std::cout &lt;&lt; "y[" &lt;&lt; i &lt;&lt; "] = " &lt;&lt; y[i] &lt;&lt; " is negative" &lt;&lt; std::endl;
                return false;
            }
        }
\/
        for (int j = 0; j &lt; n; j++) {
            double sum = 0.0;
            for (int i = 0; i &lt; m; i++) {
                sum += A[i][j] * y[i];
            }
            if (sum &lt; c[j] - EPSILON) {
                std::cout &lt;&lt; "not dual feasible" &lt;&lt; std::endl;
                std::cout &lt;&lt; "c[" &lt;&lt; j &lt;&lt; "] = " &lt;&lt; c[j] &lt;&lt; ", sum = " &lt;&lt; sum &lt;&lt; std::endl;
                return false;
            }
        }
        return true;
    }
\/
    [[nodiscard]] bool isOptimal(const std::vector&lt;double&gt;& b, const std::vector&lt;double&gt;& c) const {
        const std::vector&lt;double&gt; x = primal();
        const std::vector&lt;double&gt; y = dual();
        const double value = this-&gt;value();
\/
        double value1 = 0.0;
        for (size_t j = 0; j &lt; x.size(); j++)
            value1 += c[j] * x[j];
        double value2 = 0.0;
        for (size_t i = 0; i &lt; y.size(); i++)
            value2 += y[i] * b[i];
        if (std::abs(value - value1) &gt; EPSILON || std::abs(value - value2) &gt; EPSILON) {
            std::cout &lt;&lt; "value = " &lt;&lt; value &lt;&lt; ", cx = " &lt;&lt; value1 &lt;&lt; ", yb = " &lt;&lt; value2 &lt;&lt; std::endl;
            return false;
        }
\/
        return true;
    }
\/
    [[nodiscard]] bool check(const std::vector&lt;std::vector&lt;double&gt;&gt;& A, const std::vector&lt;double&gt;& b, const std::vector&lt;double&gt;& c) const {
        return isPrimalFeasible(A, b) && isDualFeasible(A, c) && isOptimal(b, c);
    }
};
\/
void test(const std::vector&lt;std::vector&lt;double&gt;&gt;& A, const std::vector&lt;double&gt;& b, const std::vector&lt;double&gt;& c) {
    try {
        const LinearProgramming lp(A, b, c);
        std::cout &lt;&lt; "value = " &lt;&lt; lp.value() &lt;&lt; std::endl;
\/
        const std::vector&lt;double&gt; x = lp.primal();
        for (size_t i = 0; i &lt; x.size(); i++)
            std::cout &lt;&lt; "x[" &lt;&lt; i &lt;&lt; "] = " &lt;&lt; x[i] &lt;&lt; std::endl;
\/
        const std::vector&lt;double&gt; y = lp.dual();
        for (size_t j = 0; j &lt; y.size(); j++)
            std::cout &lt;&lt; "y[" &lt;&lt; j &lt;&lt; "] = " &lt;&lt; y[j] &lt;&lt; std::endl;
\/
    } catch (const std::runtime_error& error) {
        std::cerr &lt;&lt; error.what() &lt;&lt; std::endl;
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
import numpy as np
\/
EPSILON = 1e-10
\/
class LinearProgramming:
    def __init__(self, A, b, c):
        self.m = len(b)
        self.n = len(c)
\/
        if not all(b_i &gt;= 0 for b_i in b):
            raise ValueError("RHS must be nonnegative")
\/
        self.a = np.zeros((self.m + 1, self.n + self.m + 1))
        self.a[:self.m, :self.n] = A
        np.fill_diagonal(self.a[:self.m, self.n:self.n + self.m], 1.0)
        self.a[self.m, :self.n] = c
        self.a[:self.m, self.n + self.m] = b
\/
        self.basis = list(range(self.n, self.n + self.m))
        self.solve()
\/
        assert self.check(A, b, c)
\/
    def solve(self):
        while True:
            q = self.bland()
            if q == -1:
                break
\/
            p = self.min_ratio_rule(q)
            if p == -1:
                raise ArithmeticError("Linear program is unbounded")
\/
            self.pivot(p, q)
            self.basis[p] = q
\/
    def bland(self):
        for j in range(self.m + self.n):
            if self.a[self.m, j] &gt; 0:
                return j
        return -1
\/
    def min_ratio_rule(self, q):
        p = -1
        min_ratio = float('inf')
\/
        for i in range(self.m):
            if self.a[i, q] &gt; EPSILON:
                ratio = self.a[i, self.n + self.m] / self.a[i, q]
                if ratio &lt; min_ratio:
                    min_ratio = ratio
                    p = i
        return p
\/
    def pivot(self, p, q):
        self.a[p] /= self.a[p, q]
\/
        for i in range(self.m + 1):
            if i != p:
                self.a[i] -= self.a[i, q] * self.a[p]
\/
    def value(self):
        return -self.a[self.m, self.n + self.m]
\/
    def primal(self):
        x = np.zeros(self.n)
        for i in range(self.m):
            if self.basis[i] &lt; self.n:
                x[self.basis[i]] = self.a[i, self.n + self.m]
        return x
\/
    def dual(self):
        y = -self.a[self.m, self.n:self.n + self.m]
        return y
\/
    def is_primal_feasible(self, A, b):
        x = self.primal()
\/
        if any(x_j &lt; -EPSILON for x_j in x):
            print("Primal infeasible: x contains negative values.")
            return False
\/
        Ax = A @ x
        if any(Ax_i &gt; b_i + EPSILON for Ax_i, b_i in zip(Ax, b)):
            print("Primal infeasible: Ax &gt; b")
            return False
\/
        return True
\/
    def is_dual_feasible(self, A, c):
        y = self.dual()
\/
        if any(y_i &lt; -EPSILON for y_i in y):
            print("Dual infeasible: y contains negative values.")
            return False
\/
        yA = y @ A  
        if any(yA_j &lt; c_j - EPSILON for yA_j, c_j in zip(yA, c)):
            print("Dual infeasible: yA &lt; c")
            return False
\/
        return True
\/
    def is_optimal(self, b, c):
        x = self.primal()
        y = self.dual()
        value = self.value()
\/
        value1 = c @ x
        value2 = y @ b
\/
        if abs(value - value1) &gt; EPSILON or abs(value - value2) &gt; EPSILON:
            print(f"Not optimal: value = {value}, cx = {value1}, yb = {value2}")
            return False
\/
        return True
\/
    def check(self, A, b, c):
        return (self.is_primal_feasible(A, b) and
                self.is_dual_feasible(A, c) and
                self.is_optimal(b, c))
\/
def test(A, b, c):
    try:
        lp = LinearProgramming(A, b, c)
        print("value =", lp.value())
        print("x =", lp.primal())
        print("y =", lp.dual())
    except ArithmeticError as e:
        print(e)
    </code-block>
    </tab>
</tabs>

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