<show-structure for="chapter" depth="3"></show-structure>

# Part &#8546;

<secondary-label ref="beta"></secondary-label>
<secondary-label ref="wip"></secondary-label>

## 18 Maximum Flow and Minimum Cut

### 18.1 Introduction

<p><format color = "BlueViolet">Definitions:</format> </p>

<p><format color = "DarkOrange"><math>st</math>-cut: </format> A 
<format color = "OrangeRed"><math>st</math>-cut (cut)</format> is a 
partition of the vertices into two disjoint sets, with <math>s
</math> in one set <math>A</math> and <math>t</math> in the other 
set <math>B</math>.</p>

<p><format color = "DarkOrange"><math>st</math>-cut capacity: </format> 
Its <format color = "OrangeRed">capacity</format> is the sum of the 
capacities of the edges from <math>A</math> to <math>B</math>.</p>

<note>
<p>Each edge has a positive capacity in edge-weighted digraph here.</p>
</note>

<img src = "../images_data/d18-1-1.png" alt = "st-cut"/>

<p><format color = "BlueViolet">Minimum cut problem:</format> 
Find a cut of minimum capacity.</p>

<p><format color = "BlueViolet">Definitions:</format> </p>

<p><format color = "DarkOrange"><math>st</math>-flow:</format> An 
<format color = "OrangeRed"><math>st</math>-flow (flow)</format> is 
an assignment of values to the edges such that:</p>

<list type = "bullet">
<li>
<p>Capacity constraint: 0 ≤ edge's flow ≤ edge's capacity.</p>
</li>
<li>
<p>Local equilibrium: inflow = outflow at every vertex (except <math>s
</math> and <math>t</math>).</p>
</li>
</list>

<img src = "../images_data/d18-1-2.png" alt = "st-flow"/>

<p><format color = "DarkOrange">Value of a flow:</format> 
The value of a flow is the inflow at <math>t</math> (assuming 
no edge points to <math>s</math> or from <math>t</math>.</p>

<p><format color = "BlueViolet">Maximum st-flow (maxflow) problem:
</format> Find a flow of maximum value.</p>

<warning>
<p>These two problems are dual!</p>
</warning>

### 18.2 Ford-Fulkerson Algorithm

<procedure title = "Ford-Fulkerson Algorithm">
<step>
    <p>Start with 0 flow.</p>
</step>
<step>
    <p>Find an undirected path from s to t such that: </p>
    <p>1. Can increase flow on forward edges (not full).</p>
    <p>2. Can decrease flow on backward edges (not empty).</p>
</step>
<step>
    <p>Terminates when all paths from s to t are blocked by either a
    full forward edge or an empty backward edge.</p>
</step>
</procedure>

<img src = "../images_data/d18-2-1.png" alt = "Ford-Fulkerson Algorithm"/>

<img src = "../images_data/d18-2-2.png" alt = "Ford-Fulkerson Algorithm"/>

### 18.3 Maxflow-Mincut Theorem

<p><format color = "BlueViolet">Definition:</format> </p>

<p><format color = "OrangeRed">Net Flow:</format> The <format color = 
"OrangeRed">net flow across</format> a cut (<math>A</math>, <math>B
</math>) is the sum of the flows on its edges from <math>A</math> to 
<math>B</math> minus the sum of the flows on its edges from from 
<math>B</math> to <math>A</math>.</p>

<p><format color = "BlueViolet">Flow-value lemma:</format> Let <math>f
</math> be any flow and let (<math>A</math>, <math>B</math>) be any 
cut. Then, the net flow across (<math>A</math>, <math>B</math>) 
equals the value of <math>f</math>.</p>

<p><format color = "LawnGreen">Proof:</format> By induction on the size of 
<math>B</math>.</p>

<list type = "bullet">
<li>
    <p>Base case: <math>B = {t}</math></p>
</li>
<li>
    <p>Induction step: remains true by local equilibrium when moving
    any vertex from <math>A</math> to <math>B</math>.</p>
</li>
</list>

<p><format color = "BlueViolet">Weak duality:</format> Let <math>f
</math> be any flow and let <math>(A, B)</math> be any cut. Then, the 
value of the flow ≤ the capacity of the cut.</p>

<p><format color = "LawnGreen">Proof:</format> </p>

<p>Value of flow <math>f</math> = net flow across cut <math>(A, B)
</math> ≤ capacity of cut <math>(A, B)</math>.</p>

<p><format color = "BlueViolet">Augmenting path theorem:</format> A 
flow f is a maxflow iff no augmenting paths.</p>

<p><format color = "BlueViolet">Maxflow-mincut theorem:</format> Value 
of the maxflow = capacity of mincut.</p>

<p><format color = "LawnGreen">Proof:</format> The following three 
conditions are equivalent for any flow <math>f</math>.</p>

<list type = "decimal">
<li>
    <p>There exists a cut whose capacity equals the value of the flow 
    <math>f</math>.</p>
</li>
<li>
    <p><math>f</math> is a maxflow.</p>
</li>
<li>
    <p>There is no augmenting path with respect to <math>f</math>.</p>
</li>
</list>

<p><format color = "Fuchsia">1 -> 2:</format> </p>

<list>
<li>
    <p>Suppose that <math>(A, B)</math> is a cut with capacity equal 
    to the value of <math>f</math>.</p>
</li>
<li>
    <p>Then, the value of any flow <math>f'</math> ≤ capacity of 
    <math>(A, B)</math> = value of <math>f</math>.</p>
</li>
<li>
    <p>Thus, <math>f</math> is a maxflow.</p>
</li>
</list>

<p><format color = "Fuchsia">2 -> 3:</format> We prove 
contrapositive: ~3 -> ~2</p>

<list>
<li>
    <p>Suppose that there is an augmenting path with respect to 
    <math>f</math>.</p>
</li>
<li>
    <p>Can improve flow <math>f</math> by sending flow along this path.
    </p>
</li>
<li>
    <p>Thus, f is not a maxflow.</p>
</li>
</list>

<p><format color = "Fuchsia">3 -> 1:</format> Suppose that there is no
augmenting path with respect to <math>f</math>.</p>

<list>
<li>
    <p>Let <math>(A, B)</math> be a cut where <math>A</math> is the set
    of vertices connected to <math>s</math> by an undirected path with 
    no full forward or empty backward edges.</p></li>
<li>
    <p>By definition, <math>s</math> is in <math>A</math>; since no 
    augmenting path, <math>t</math> is in <math>B</math>.</p>
</li>
<li>
    <p>Capacity of cut = net flow across cut (forward edges full; 
    backward edges empty) = value of flow <math>f</math> (
    flow-value lemma).</p>
</li>
</list>

<p>To compute mincut <math>(A, B)</math> from maxflow <math>f</math>: 
</p>

<list>
<li>
    <p>By augmenting path theorem, no augmenting paths with respect 
    to <math>f</math>.</p>
</li>
<li>
    <p>Compute <math>A</math> = set of vertices connected to <math>s
    </math> by an undirected path with no full forward or empty 
    backward edges.</p>
</li>
</list>

<img src = "../images_data/d18-3-1.png" alt = "Compute Mincut"/>

### 18.4 Running Time Analysis

<note>
<p>Important special case: Edge capacities are integers between 1 and 
<math>U</math>.</p>
</note>

<p><format color = "BlueViolet">Properties:</format> </p>

<list type = "decimal">
<li>
    <p>The flow is integer-valued throughout Ford-Fulkerson.</p>
    <p><format color = "LawnGreen">Proof:</format> </p>
    <list type = "bullet">
    <li>
        <p>Bottleneck capacity is an integer.</p>
    </li>
    <li>
        <p>Flow on an edge increases/decreases by bottleneck capacity.
        </p>
    </li>
    </list>
</li>
<li>
    <p>Number of augmentations ≤ the value of the maxflow.</p>
    <p><format color="LawnGreen">Proof:</format> Each augmentation 
    increases the value by at least 1.</p>
</li>
<li>
    <p><format color="Fuchsia">Integrality theorem:</format> There 
    exists an integer-valued maxflow.</p>
    <p><format color="LawnGreen">Proof:</format> Ford-Fulkerson 
    terminates and maxflow that it finds is integer-valued.</p>
</li>
</list>

<p><format color = "BlueViolet">Running time:</format> FF performance 
depends on choice of augmenting paths.</p>

<p>Digraph with <math>V</math> vertices, <math>E</math> edges, and 
integer capacities between 1 and <math>U</math></p>

<table style="header-row">
<tr>
    <td>Augmenting Path</td>
    <td>Number of Paths</td>
    <td>Implementation</td>
</tr>
<tr>
    <td>Shortest Path</td>
    <td><math>\leq \frac {1}{2} E V</math></td>
    <td>Queue (BFS)</td>
</tr>
<tr>
    <td>Fattest path</td>
    <td><math>\leq E \ln (E U)</math></td>
    <td>Priority Queue</td>
</tr>
<tr>
    <td>Random Path</td>
    <td><math>\leq E U</math></td>
    <td>Randomized Queue</td>
</tr>
<tr>
    <td>DFS Path</td>
    <td><math>\leq E U</math></td>
    <td>Stack (DFS)</td>
</tr>
</table>

### 18.5 Implementation

#### 18.5.1 Flow Edge

<p><format color="BlueViolet">Implementation:</format> </p>

<p>Use residual capcity: </p>

<list type="bullet">
<li>
    <p>Forward edge: residual capacity <math>= c_{e} - f_{e}</math>.
    </p>
</li>
<li>
    <p>Backward edge: residual capacity <math>= f_{e}</math>.</p>
</li>
</list>

<img src="../images_data/d18-5-1.png" alt="Flow Edge"/>

<p>Java</p>

```Java
public class FlowEdge {
    private static final double FLOATING_POINT_EPSILON = 1.0E-10;

    private final int v;
    private final int w;
    private final double capacity;
    private double flow;

    public FlowEdge(int v, int w, double capacity) {
        if (v < 0) throw new IllegalArgumentException("vertex index must be a non-negative integer");
        if (w < 0) throw new IllegalArgumentException("vertex index must be a non-negative integer");
        if (!(capacity >= 0.0)) throw new IllegalArgumentException("Edge capacity must be non-negative");
        this.v = v;
        this.w = w;
        this.capacity = capacity;
        this.flow = 0.0;
    }

    public FlowEdge(int v, int w, double capacity, double flow) {
        if (v < 0) throw new IllegalArgumentException("vertex index must be a non-negative integer");
        if (w < 0) throw new IllegalArgumentException("vertex index must be a non-negative integer");
        if (!(capacity >= 0.0)) throw new IllegalArgumentException("edge capacity must be non-negative");
        if (!(flow <= capacity)) throw new IllegalArgumentException("flow exceeds capacity");
        if (!(flow >= 0.0)) throw new IllegalArgumentException("flow must be non-negative");
        this.v = v;
        this.w = w;
        this.capacity = capacity;
        this.flow = flow;
    }

    public FlowEdge(FlowEdge e) {
        this.v = e.v;
        this.w = e.w;
        this.capacity = e.capacity;
        this.flow = e.flow;
    }

    public int from() {
        return v;
    }

    public int to() {
        return w;
    }

    public double capacity() {
        return capacity;
    }

    public double flow() {
        return flow;
    }

    public int other(int vertex) {
        if (vertex == v) return w;
        else if (vertex == w) return v;
        else throw new IllegalArgumentException("invalid endpoint");
    }

    public double residualCapacityTo(int vertex) {
        if (vertex == v) return flow;             
        else if (vertex == w) return capacity - flow;  
        else throw new IllegalArgumentException("invalid endpoint");
    }

    public void addResidualFlowTo(int vertex, double delta) {
        if (!(delta >= 0.0)) throw new IllegalArgumentException("Delta must be non-negative");

        if (vertex == v) flow -= delta;
        else if (vertex == w) flow += delta;
        else throw new IllegalArgumentException("invalid endpoint");

        if (Math.abs(flow) <= FLOATING_POINT_EPSILON)
            flow = 0;
        if (Math.abs(flow - capacity) <= FLOATING_POINT_EPSILON)
            flow = capacity;

        if (!(flow >= 0.0)) throw new IllegalArgumentException("Flow is negative");
        if (!(flow <= capacity)) throw new IllegalArgumentException("Flow exceeds capacity");
    }

    public String toString() {
        return v + "->" + w + " " + flow + "/" + capacity;
    }
}
```

<p>C++ (FlowEdge.h)</p>

```C++
#ifndef FLOWEDGE_H
#define FLOWEDGE_H

#include <iostream>

class FlowEdge {
private:
    static constexpr double FLOATING_POINT_EPSILON = 1.0E-10;

    int v;
    int w;
    double capacity;
    double flow;

public:
    FlowEdge(int v, int w, double capacity);
    FlowEdge(int v, int w, double capacity, double flow);
    FlowEdge(const FlowEdge& e);

    [[nodiscard]] int from() const;
    [[nodiscard]] int to() const;
    [[nodiscard]] double getcapacity() const;
    [[nodiscard]] double getflow() const;
    [[nodiscard]] int other(int vertex) const;
    [[nodiscard]] double residualCapacityTo(int vertex) const;
    void addResidualFlowTo(int vertex, double delta);

    friend std::ostream& operator<<(std::ostream& os, const FlowEdge& e); 
};

#endif // FLOWEDGE_H
```

<p>C++ (FlowEdge.cpp)</p>

```C++
#include "FlowEdge.h"
#include <stdexcept>
#include <cmath>

FlowEdge::FlowEdge(const int v, const int w, const double capacity) : v(v), w(w), capacity(capacity), flow(0.0) {
    if (v < 0) throw std::invalid_argument("vertex index must be a non-negative integer");
    if (w < 0) throw std::invalid_argument("vertex index must be a non-negative integer");
    if (!(capacity >= 0.0)) throw std::invalid_argument("Edge capacity must be non-negative");
}

FlowEdge::FlowEdge(const int v, const int w, const double capacity, const double flow) : v(v), w(w), capacity(capacity), flow(flow) {
    if (v < 0) throw std::invalid_argument("vertex index must be a non-negative integer");
    if (w < 0) throw std::invalid_argument("vertex index must be a non-negative integer");
    if (!(capacity >= 0.0)) throw std::invalid_argument("edge capacity must be non-negative");
    if (!(flow <= capacity)) throw std::invalid_argument("flow exceeds capacity");
    if (!(flow >= 0.0)) throw std::invalid_argument("flow must be non-negative");
}

FlowEdge::FlowEdge(const FlowEdge& e) = default;

int FlowEdge::from() const {
    return v;
}

int FlowEdge::to() const {
    return w;
}

double FlowEdge::getcapacity() const {
    return capacity;
}

double FlowEdge::getflow() const {
    return flow;
}

int FlowEdge::other(const int vertex) const {
    if (vertex == v) return w;
    else if (vertex == w) return v;
    else throw std::invalid_argument("invalid endpoint");
}

double FlowEdge::residualCapacityTo(const int vertex) const {
    if (vertex == v) return flow;
    else if (vertex == w) return capacity - flow;
    else throw std::invalid_argument("invalid endpoint");
}

void FlowEdge::addResidualFlowTo(const int vertex, const double delta) {
    if (!(delta >= 0.0)) throw std::invalid_argument("Delta must be non-negative");

    if (vertex == v) flow -= delta;
    else if (vertex == w) flow += delta;
    else throw std::invalid_argument("invalid endpoint");

    if (std::abs(flow) <= FLOATING_POINT_EPSILON)
        flow = 0;
    if (std::abs(flow - capacity) <= FLOATING_POINT_EPSILON)
        flow = capacity;

    if (!(flow >= 0.0)) throw std::invalid_argument("Flow is negative");
    if (!(flow <= capacity)) throw std::invalid_argument("Flow exceeds capacity");
}

std::ostream& operator<<(std::ostream& os, const FlowEdge& e) {
    os << e.v << "->" << e.w << " " << e.flow << "/" << e.capacity;
    return os;
}
```

<p>Python</p>

```Python
class FlowEdge:
    FLOATING_POINT_EPSILON = 1e-10

    def __init__(self, v, w, capacity, flow=0.0):
        if v < 0:
            raise ValueError("vertex index must be a non-negative integer")
        if w < 0:
            raise ValueError("vertex index must be a non-negative integer")
        if capacity < 0.0:
            raise ValueError("Edge capacity must be non-negative")
        if flow > capacity:
            raise ValueError("flow exceeds capacity")
        if flow < 0.0:
            raise ValueError("flow must be non-negative")

        self._v = v
        self._w = w
        self._capacity = capacity
        self._flow = flow

    def from_(self):
        return self._v

    def to(self):
        return self._w

    def capacity(self):
        return self._capacity

    def flow(self):
        return self._flow

    def other(self, vertex):
        if vertex == self._v:
            return self._w
        elif vertex == self._w:
            return self._v
        else:
            raise ValueError("invalid endpoint")

    def residualCapacityTo(self, vertex):
        if vertex == self._v:
            return self._flow 
        elif vertex == self._w:
            return self._capacity - self._flow  
        else:
            raise ValueError("invalid endpoint")

    def addResidualFlowTo(self, vertex, delta):
        if delta < 0.0:
            raise ValueError("Delta must be non-negative")

        if vertex == self._v:
            self._flow -= delta
        elif vertex == self._w:
            self._flow += delta
        else:
            raise ValueError("invalid endpoint")

        if abs(self._flow) <= self.FLOATING_POINT_EPSILON:
            self._flow = 0
        if abs(self._flow - self._capacity) <= self.FLOATING_POINT_EPSILON:
            self._flow = self._capacity

        if self._flow < 0.0:
            raise ValueError("Flow is negative")
        if self._flow > self._capacity:
            raise ValueError("Flow exceeds capacity")

    def __str__(self):
        return f"{self._v}->{self._w} {self._flow}/{self._capacity}"
```


#### 18.5.2 Flow Network

<img src="../images_data/d18-5-2.png" alt="Flow Network"/>

<p>Java</p>

```Java
import java.util.ArrayList;
import java.util.List;

public class FlowNetwork {
    private final int V;
    private int E;
    private final List<FlowEdge>[] adj;

    public FlowNetwork(int V, int E, List<int[]> edges) {
        if (V < 0) throw new IllegalArgumentException("Number of vertices in a Graph must be non-negative");
        if (E < 0) throw new IllegalArgumentException("Number of edges must be non-negative");
        this.V = V;
        this.E = 0;
        adj = (List<FlowEdge>[]) new List[V];
        for (int v = 0; v < V; v++)
            adj[v] = new ArrayList<>();
        for (int[] edge : edges) {
            int v = edge[0];
            int w = edge[1];
            double capacity = edge[2];
            validateVertex(v);
            validateVertex(w);
            addEdge(new FlowEdge(v, w, capacity));
        }
    }

    public int V() {
        return V;
    }

    public int E() {
        return E;
    }

    private void validateVertex(int v) {
        if (v < 0 || v >= V)
            throw new IllegalArgumentException("vertex " + v + " is not between 0 and " + (V-1));
    }

    public void addEdge(FlowEdge e) {
        int v = e.from();
        int w = e.to();
        validateVertex(v);
        validateVertex(w);
        adj[v].add(e);
        adj[w].add(e);
        E++;
    }

    public Iterable<FlowEdge> adj(int v) {
        validateVertex(v);
        return adj[v];
    }

    public Iterable<FlowEdge> edges() {
        List<FlowEdge> list = new ArrayList<>();
        for (int v = 0; v < V; v++)
            for (FlowEdge e : adj(v)) {
                if (e.to() != v)
                    list.add(e);
            }
        return list;
    }

    public String toString() {
        StringBuilder s = new StringBuilder();
        s.append(V).append(" ").append(E).append(System.lineSeparator());
        for (int v = 0; v < V; v++) {
            s.append(v).append(":  ");
            for (FlowEdge e : adj[v]) {
                if (e.to() != v) s.append(e).append("  ");
            }
            s.append(System.lineSeparator());
        }
        return s.toString();
    }
}
```

<p>C++ (FlowNetwork.h)</p>

```C++
#ifndef FLOWNETWORK_H
#define FLOWNETWORK_H

#include <vector>
#include "FlowEdge.h"

class FlowNetwork {
private:
    int V;
    int E;
    std::vector<FlowEdge>* adj;

    void validateVertex(int v) const;

public:
    FlowNetwork(int V, int E, const std::vector<std::vector<int>>& edges);

    [[nodiscard]] int getV() const;
    [[nodiscard]] int getE() const;
    void addEdge(const FlowEdge& e);
    [[nodiscard]] std::vector<FlowEdge> getadj(int v) const;
    [[nodiscard]] std::vector<FlowEdge> edges() const;

    friend std::ostream& operator<<(std::ostream& os, const FlowNetwork& network);
};

#endif // FLOWNETWORK_H
```

<p>C++ (FlowNetwork.cpp)</p>

```C++
#include <iostream>
#include "FlowNetwork.h"

FlowNetwork::FlowNetwork(int V, int E, const std::vector<std::vector<int>>& edges) : V(V), E(0) {
    if (V < 0) throw std::invalid_argument("Number of vertices in a Graph must be non-negative");
    if (E < 0) throw std::invalid_argument("Number of edges must be non-negative");

    adj = new std::vector<FlowEdge>[V];
    for (const auto& edge : edges) {
        int v = edge[0];
        int w = edge[1];
        double capacity = edge[2];
        validateVertex(v);
        validateVertex(w);
        addEdge(FlowEdge(v, w, capacity));
    }
}

int FlowNetwork::V() const {
    return V;
}

int FlowNetwork::E() const {
    return E;
}

void FlowNetwork::validateVertex(int v) const {
    if (v < 0 || v >= V)
        throw std::invalid_argument("vertex " + std::to_string(v) + " is not between 0 and " + std::to_string(V - 1));
}

void FlowNetwork::addEdge(const FlowEdge& e) {
    int v = e.from();
    int w = e.to();
    validateVertex(v);
    validateVertex(w);
    adj[v].push_back(e);
    adj[w].push_back(e);
    E++;
}

std::vector<FlowEdge> FlowNetwork::adj(int v) const {
    validateVertex(v);
    return adj[v];
}

std::vector<FlowEdge> FlowNetwork::edges() const {
    std::vector<FlowEdge> list;
    for (int v = 0; v < V; v++) {
        for (const FlowEdge& e : adj(v)) {
            if (e.to() != v)
                list.push_back(e);
        }
    }
    return list;
}

std::ostream& operator<<(std::ostream& os, const FlowNetwork& network) {
    os << network.V << " " << network.E << std::endl;
    for (int v = 0; v < network.V; v++) {
        os << v << ":  ";
        for (const FlowEdge& e : network.adj[v]) {
            if (e.to() != v) os << e << "  ";
        }
        os << std::endl;
    }
    return os;
}
```

<p>Python</p>

```Python
from FlowEdge import FlowEdge

class FlowNetwork:
    def __init__(self, V, E, edges):
        if V < 0:
            raise ValueError("Number of vertices in a Graph must be non-negative")
        if E < 0:
            raise ValueError("Number of edges must be non-negative")

        self._V = V
        self._E = 0
        self._adj = [[] for _ in range(V)]

        for edge in edges:
            v, w, capacity = edge
            self._validate_vertex(v)
            self._validate_vertex(w)
            self._add_edge(FlowEdge(v, w, capacity))

    def V(self):
        return self._V

    def E(self):
        return self._E

    def _validate_vertex(self, v):
        if v < 0 or v >= self._V:
            raise ValueError(f"vertex {v} is not between 0 and {self._V - 1}")

    def _add_edge(self, e):
        v = e.from_()
        w = e.to()
        self._validate_vertex(v)
        self._validate_vertex(w)
        self._adj[v].append(e)
        self._adj[w].append(e)
        self._E += 1

    def adj(self, v):
        self._validate_vertex(v)
        return self._adj[v]

    def edges(self):
        all_edges = []
        for v in range(self._V):
            for edge in self.adj(v):
                if edge.to() != v:
                    all_edges.append(edge)
        return all_edges

    def __str__(self):
        s = f"{self._V} {self._E}\n"
        for v in range(self._V):
            s += f"{v}:  "
            for edge in self._adj[v]:
                if edge.to() != v:
                    s += str(edge) + "  "
            s += "\n"
        return s
```

#### 18.5.3 Ford-Fulkerson Algorithm

<p>Java</p>

```Java
import java.util.LinkedList;
import java.util.Queue;

public class FordFulkerson {
    private static final double FLOATING_POINT_EPSILON = 1.0E-11;

    private final int V;
    private boolean[] marked;
    private FlowEdge[] edgeTo;
    private double value;

    public FordFulkerson(FlowNetwork G, int s, int t) {
        V = G.V();
        validate(s);
        validate(t);
        if (s == t) throw new IllegalArgumentException("Source equals sink");
        if (!isFeasible(G, s, t)) throw new IllegalArgumentException("Initial flow is infeasible");

        value = excess(G, t);
        while (hasAugmentingPath(G, s, t)) {
            double bottle = Double.POSITIVE_INFINITY;
            for (int v = t; v != s; v = edgeTo[v].other(v)) {
                bottle = Math.min(bottle, edgeTo[v].residualCapacityTo(v));
            }

            for (int v = t; v != s; v = edgeTo[v].other(v)) {
                edgeTo[v].addResidualFlowTo(v, bottle);
            }

            value += bottle;
        }

        // check optimality conditions
        assert check(G, s, t);
    }

    public double value() {
        return value;
    }

    public boolean inCut(int v) {
        validate(v);
        return marked[v];
    }

    private void validate(int v) {
        if (v < 0 || v >= V)
            throw new IllegalArgumentException("vertex " + v + " is not between 0 and " + (V - 1));
    }

    private boolean hasAugmentingPath(FlowNetwork G, int s, int t) {
        edgeTo = new FlowEdge[G.V()];
        marked = new boolean[G.V()];

        Queue<Integer> queue = new LinkedList<>();
        queue.add(s);
        marked[s] = true;
        while (!queue.isEmpty() && !marked[t]) {
            int v = queue.remove();

            for (FlowEdge e : G.adj(v)) {
                int w = e.other(v);

                if (e.residualCapacityTo(w) > 0) {
                    if (!marked[w]) {
                        edgeTo[w] = e;
                        marked[w] = true;
                        queue.add(w);
                    }
                }
            }
        }

        return marked[t];
    }

    private double excess(FlowNetwork G, int v) {
        double excess = 0.0;
        for (FlowEdge e : G.adj(v)) {
            if (v == e.from()) excess -= e.flow();
            else excess += e.flow();
        }
        return excess;
    }

    private boolean isFeasible(FlowNetwork G, int s, int t) {
        for (int v = 0; v < G.V(); v++) {
            for (FlowEdge e : G.adj(v)) {
                if (e.flow() < -FLOATING_POINT_EPSILON || e.flow() > e.capacity() + FLOATING_POINT_EPSILON) {
                    System.err.println("Edge does not satisfy capacity constraints: " + e);
                    return false;
                }
            }
        }

        if (Math.abs(value + excess(G, s)) > FLOATING_POINT_EPSILON) {
            System.err.println("Excess at source = " + excess(G, s));
            System.err.println("Max flow         = " + value);
            return false;
        }
        if (Math.abs(value - excess(G, t)) > FLOATING_POINT_EPSILON) {
            System.err.println("Excess at sink   = " + excess(G, t));
            System.err.println("Max flow         = " + value);
            return false;
        }
        for (int v = 0; v < G.V(); v++) {
            if (v == s || v == t) continue;
            else if (Math.abs(excess(G, v)) > FLOATING_POINT_EPSILON) {
                System.err.println("Net flow out of " + v + " doesn't equal zero");
                return false;
            }
        }
        return true;
    }

    private boolean check(FlowNetwork G, int s, int t) {
        if (!isFeasible(G, s, t)) {
            System.err.println("Flow is infeasible");
            return false;
        }

        if (!inCut(s)) {
            System.err.println("source " + s + " is not on source side of min cut");
            return false;
        }
        if (inCut(t)) {
            System.err.println("sink " + t + " is on source side of min cut");
            return false;
        }

        double mincutValue = 0.0;
        for (int v = 0; v < G.V(); v++) {
            for (FlowEdge e : G.adj(v)) {
                if ((v == e.from()) && inCut(e.from()) && !inCut(e.to()))
                    mincutValue += e.capacity();
            }
        }

        if (Math.abs(mincutValue - value) > FLOATING_POINT_EPSILON) {
            System.err.println("Max flow value = " + value + ", min cut value = " + mincutValue);
            return false;
        }

        return true;
    }
}
```

<p>C++ (FordFulkerson.h)</p>

```C++
#ifndef FORDFULKERSON_H
#define FORDFULKERSON_H

#include <vector>
#include "FlowEdge.h"
#include "FlowNetwork.h"

class FordFulkerson {
private:
    static constexpr double FLOATING_POINT_EPSILON = 1.0E-11;

    int V;
    std::vector<bool> marked;
    std::vector<FlowEdge> edgeTo;
    double value;

    void validate(int v) const;
    bool hasAugmentingPath(const FlowNetwork& G, int s, int t);
    static double excess(const FlowNetwork& G, int v) ;
    [[nodiscard]] bool isFeasible(const FlowNetwork& G, int s, int t) const;
    [[nodiscard]] bool check(const FlowNetwork& G, int s, int t) const;

public:
    FordFulkerson(const FlowNetwork& G, int s, int t);

    [[nodiscard]] double getvalue() const;
    [[nodiscard]] bool inCut(int v) const;
};

#endif // FORDFULKERSON_H
```

<p>C++ (FordFulkerson.cpp)</p>

```C++
#include <cassert>
#include <iostream>
#include <limits>
#include <queue>
#include <vector>
#include "FordFulkerson.h"

FordFulkerson::FordFulkerson(const FlowNetwork& G, const int s, const int t) : V(G.getV()), value(0.0) {
    validate(s);
    validate(t);
    if (s == t) throw std::invalid_argument("Source equals sink");
    if (!isFeasible(G, s, t)) throw std::invalid_argument("Initial flow is infeasible");

    value = excess(G, t);
    while (hasAugmentingPath(G, s, t)) {

        double bottle = std::numeric_limits<double>::infinity(); // Use numeric_limits for infinity
        for (int v = t; v != s; v = edgeTo[v].other(v)) {
            bottle = std::min(bottle, edgeTo[v].residualCapacityTo(v));
        }

        for (int v = t; v != s; v = edgeTo[v].other(v)) {
            edgeTo[v].addResidualFlowTo(v, bottle);
        }

        value += bottle;
    }
    assert(check(G, s, t));
}

double FordFulkerson::getvalue() const {
    return value;
}

bool FordFulkerson::inCut(int v) const {
    validate(v);
    return marked[v];
}

void FordFulkerson::validate(int v) const {
    if (v < 0 || v >= V)
        throw std::invalid_argument("vertex " + std::to_string(v) + " is not between 0 and " + std::to_string(V - 1));
}

bool FordFulkerson::hasAugmentingPath(const FlowNetwork& G, const int s, const int t) {
    edgeTo.assign(G.getV(), FlowEdge(0, 0, 0.0));
    marked.assign(G.getV(), false);

    std::queue<int> queue;
    queue.push(s);
    marked[s] = true;
    while (!queue.empty() && !marked[t]) {
        const int v = queue.front();
        queue.pop();

        for (const FlowEdge& e : G.getadj(v)) {
            const int w = e.other(v);

            if (e.residualCapacityTo(w) > 0) {
                if (!marked[w]) {
                    edgeTo[w] = e;
                    marked[w] = true;
                    queue.push(w);
                }
            }
        }
    }
    return marked[t];
}

double FordFulkerson::excess(const FlowNetwork& G, const int v) {
    double excess = 0.0;
    for (const FlowEdge& e : G.getadj(v)) {
        if (v == e.from()) excess -= e.getflow();
        else excess += e.getflow();
    }
    return excess;
}

bool FordFulkerson::isFeasible(const FlowNetwork& G, int s, int t) const {
    for (int v = 0; v < G.getV(); v++) {
        for (const FlowEdge& e : G.getadj(v)) {
            if (e.getflow() < -FLOATING_POINT_EPSILON || e.getflow() > e.getcapacity() + FLOATING_POINT_EPSILON) {
                std::cerr << "Edge does not satisfy capacity constraints: " << e << std::endl;
                return false;
            }
        }
    }

    if (std::abs(value + excess(G, s)) > FLOATING_POINT_EPSILON) {
        std::cerr << "Excess at source = " << excess(G, s) << std::endl;
        std::cerr << "Max flow         = " << value << std::endl;
        return false;
    }
    if (std::abs(value - excess(G, t)) > FLOATING_POINT_EPSILON) {
        std::cerr << "Excess at sink   = " << excess(G, t) << std::endl;
        std::cerr << "Max flow         = " << value << std::endl;
        return false;
    }
    for (int v = 0; v < G.getV(); v++) {
        if (v == s || v == t) continue;
        else if (std::abs(excess(G, v)) > FLOATING_POINT_EPSILON) {
            std::cerr << "Net flow out of " << v << " doesn't equal zero" << std::endl;
            return false;
        }
    }
    return true;
}

bool FordFulkerson::check(const FlowNetwork& G, int s, int t) const {
    if (!isFeasible(G, s, t)) {
        std::cerr << "Flow is infeasible" << std::endl;
        return false;
    }

    if (!inCut(s)) {
        std::cerr << "source " << s << " is not on source side of min cut" << std::endl;
        return false;
    }
    if (inCut(t)) {
        std::cerr << "sink " << t << " is on source side of min cut" << std::endl;
        return false;
    }

    double mincutValue = 0.0;
    for (int v = 0; v < G.getV(); v++) {
        for (const FlowEdge& e : G.getadj(v)) {
            if ((v == e.from()) && inCut(e.from()) && !inCut(e.to()))
                mincutValue += e.getcapacity();
        }
    }

    if (std::abs(mincutValue - value) > FLOATING_POINT_EPSILON) {
        std::cerr << "Max flow value = " << value << ", min cut value = " << mincutValue << std::endl;
        return false;
    }

    return true;
}
```

<p>Python</p>

```Python
from collections import deque

class FordFulkerson:
    FLOATING_POINT_EPSILON = 1e-11

    def __init__(self, G, s, t):
        self._V = G.V()
        self._validate(s)
        self._validate(t)
        if s == t:
            raise ValueError("Source equals sink")
        if not self._is_feasible(G, s, t):
            raise ValueError("Initial flow is infeasible")

        self._value = self._excess(G, t)
        while self._has_augmenting_path(G, s, t):
            # compute bottleneck capacity
            bottle = float('inf')
            for v in range(t, s -1, -1):
                if v != s:
                    bottle = min(bottle, self._edgeTo[v].residualCapacityTo(v))
                    v = self._edgeTo[v].other(v)

            # augment flow
            for v in range(t, s-1, -1):
                if v != s:
                    self._edgeTo[v].addResidualFlowTo(v, bottle)
                    v = self._edgeTo[v].other(v)

            self._value += bottle

        # check optimality conditions
        assert self._check(G, s, t)

    def value(self):
        return self._value

    def in_cut(self, v):
        self._validate(v)
        return self._marked[v]

    def _validate(self, v):
        if v < 0 or v >= self._V:
            raise ValueError(f"vertex {v} is not between 0 and {self._V - 1}")

    def _has_augmenting_path(self, G, s, t):
        self._edgeTo = [None] * G.V()
        self._marked = [False] * G.V()

        queue = deque()
        queue.append(s)
        self._marked[s] = True
        while queue and not self._marked[t]:
            v = queue.popleft()

            for e in G.adj(v):
                w = e.other(v)

                if e.residualCapacityTo(w) > 0:
                    if not self._marked[w]:
                        self._edgeTo[w] = e
                        self._marked[w] = True
                        queue.append(w)

        return self._marked[t]

    def _excess(self, G, v):
        excess = 0.0
        for e in G.adj(v):
            if v == e.from_():
                excess -= e.flow()
            else:
                excess += e.flow()
        return excess

    def _is_feasible(self, G, s, t):
        for v in range(G.V()):
            for e in G.adj(v):
                if e.flow() < -self.FLOATING_POINT_EPSILON or e.flow() > e.capacity() + self.FLOATING_POINT_EPSILON:
                    print(f"Edge does not satisfy capacity constraints: {e}")
                    return False

        if abs(self._value + self._excess(G, s)) > self.FLOATING_POINT_EPSILON:
            print(f"Excess at source = {self._excess(G, s)}")
            print(f"Max flow         = {self._value}")
            return False
        if abs(self._value - self._excess(G, t)) > self.FLOATING_POINT_EPSILON:
            print(f"Excess at sink   = {self._excess(G, t)}")
            print(f"Max flow         = {self._value}")
            return False
        for v in range(G.V()):
            if v == s or v == t:
                continue
            elif abs(self._excess(G, v)) > self.FLOATING_POINT_EPSILON:
                print(f"Net flow out of {v} doesn't equal zero")
                return False
        return True

    def _check(self, G, s, t):
        if not self._is_feasible(G, s, t):
            print("Flow is infeasible")
            return False

        if not self.in_cut(s):
            print(f"source {s} is not on source side of min cut")
            return False
        if self.in_cut(t):
            print(f"sink {t} is on source side of min cut")
            return False

        mincut_value = 0.0
        for v in range(G.V()):
            for e in G.adj(v):
                if v == e.from_() and self.in_cut(e.from_()) and not self.in_cut(e.to()):
                    mincut_value += e.capacity()

        if abs(mincut_value - self._value) > self.FLOATING_POINT_EPSILON:
            print(f"Max flow value = {self._value}, min cut value = {mincut_value}")
            return False

        return True
```

### 18.6 Maxflow Applications

<p><format color="BlueViolet">Applications:</format> </p>

<list>
<li>Data mining.</li>
<li>Open-pit mining.</li>
<li><format color="OrangeRed">Bipartite matching.</format></li>
<li>Network reliability.</li>
<li><format color="OrangeRed">Baseball elimination.</format></li>
<li>Image segmentation.</li>
<li>Network connectivity.</li>
<li>Distributed computing.</li>
<li>Security of statistical data.</li>
<li>Egalitarian stable matching.</li>
<li>Multi-camera scene reconstruction.</li>
<li>Sensor placement for homeland security.</li>
<li>Many, many, more.</li>
</list>

#### 18.6.1 Bipartite Matching

<p>N students apply for N jobs. Given a bipartite graph, find a 
perfect matching.</p>

<img src="../images_data/d18-6-1.png" alt="Bipartite Matching"/>

<procedure title="Bipartite Matching">
<step>
    <p>Create <math>s</math>, <math>t</math>, one vertex for each 
    student, and one vertex for each job.</p>
</step>
<step>
    <p>Add edge from <math>s</math> to each student (capacity 1).</p>
</step>
<step>
    <p>Add edge from each job to <math>t</math> (capacity 1).</p>
</step>
<step>
    <p>Add edge from student to each job offered (infinite capacity).
    </p>
</step>
<step>
    <p>1-1 correspondence between perfect matchings in bipartite graph
    and integer-valued maxflows of value <math>N</math>.</p>
</step>
</procedure>

<img src="../images_data/d18-6-2.png" alt="Bipartite Matching"/>

<p><format color="BlueViolet">When no perfect matching, mincut 
explains why:</format> </p>

<p>Consider mincut (<math>A</math>, <math>B</math>): </p>

<list>
<li>Let <math>S</math> = students on <math>s</math> side of cut.</li>
<li>Let <math>T</math> = companies on <math>s</math> side of cut.</li>
<li>Fact: <math>\left| S \right| > \left| T \right|</math>; students 
in <math>S</math> can be matched only to companies in <math>T</math>.
</li>
</list>

<img src="../images_data/d18-6-3.png" alt="Mincut"/>

#### 18.6.2 Baseball Elimination

<p><format color="BlueViolet">Problem:</format> Which teams have a 
chance of finishing the season with the most wins?</p>

<img src="../images_data/d18-6-4.png" alt="Baseball Elimination"/>

<img src="../images_data/d18-6-5.png" alt="Baseball Elimination"/>

<p>Team 4 not eliminated iff all edges pointing from s are full in 
maxflow.</p>

<warning>
Team 4 not eliminated iff all edges pointing from s are full in 
maxflow.
</warning>

<note>
Push-relabel method with gap relabeling: <math>E^{\frac {3}{2}}
</math>.
</note>

## 19 Radix Sort

### 19.1 Strings in Java {id="strings-in-java"}

<p><format color="DarkOrange">String:</format> Sequence of characters.
</p>

<p><format color="BlueViolet">The char data type:</format> </p>

<list type="bullet">
<li><format color="Fuchsia">C char data type:</format> Typically an 
8-bit integer.
    <list type="bullet">
        <li>Supports 7-bit ASCII.</li>
        <li>Can represent only 256 characters.</li>
    </list>
</li>
<li><format color="Fuchsia">Java char data type:</format> A 16-bit 
unsigned integer.
    <list type="bullet">
        <li>Supports original 16-bit Unicode.</li>
        <li>Supports 21-bit Unicode 3.0 (awkwardly).</li>
    </list>
</li>
</list>

<p><format color="BlueViolet">Examples:</format> </p>

```Java
public class StringTest {
    public static void main(String[] args) {
        String s1 = "Hello";
        System.out.println(s1.length()); // 5
        System.out.println(s1.charAt(0)); // H
        System.out.println(s1.substring(0, 1)); // H
        System.out.println(s1.concat(" World")); // Hello World
    }
}
```

<table style="both">
<tr>
    <td colspan="2"></td>
    <td colspan="2">String</td>
    <td colspan="2">StringBuilder</td>
</tr>
<tr>
    <td colspan="2">Data Type in Java</td>
    <td colspan="2">Sequence of characters (immutable)</td>
    <td colspan="2">Sequence of characters (mutable)</td>
</tr>
<tr>
    <td colspan="2">Underlying Implementation</td>
    <td colspan="2">Immutable <code>char[]</code> array, offset, and 
    length</td>
    <td colspan="2">Resizing <code>char[]</code> array and length.
    </td>
</tr>
<tr>
    <td colspan="2"></td>
    <td>Guarantee</td>
    <td>Extra Space</td>
    <td>Guarantee</td>
    <td>Extra Space</td>
</tr>
<tr>
    <td rowspan="4">Operation</td>
    <td><code>length()</code></td>
    <td><math>1</math></td>
    <td><math>1</math></td>
    <td><math>1</math></td>
    <td><math>1</math></td>
</tr>
<tr>
    <td><code>charAt()</code></td>
    <td><math>1</math></td>
    <td><math>1</math></td>
    <td><math>1</math></td>
    <td><math>1</math></td>
</tr>
<tr>
    <td><code>substring()</code></td>
    <td><math>1</math></td>
    <td><math>1</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
</tr>
<tr>
    <td><code>concat()</code></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>1*</math></td>
    <td><math>1*</math></td>
</tr>
</table>

<note>
<list type="decimal">
<li>
    <p><math>40 + 2N</math> bytes for a virgin String of length <math>
    N</math>.</p>
</li>
<li>
    <p>StringBuffer data type is similar, but thread safe (and slower
    ).</p>
</li>
</list>
</note>

### 19.2 Key-Indexed Counting

<p><format color="BlueViolet">Assumption:</format> Keys are integers 
between <math>0</math> and <math>R - 1</math>. Can use key as an array
index.</p>

<p><format color="BlueViolet">Goal:</format> Sort an array of <math>N
</math> integers between <math>0</math> and <math>R - 1</math>.</p>

<procedure title="Key-Indexed Counting">
<step>Count frequencies of each letter using key as index.</step>
<step>Compute frequency cumulates which specify destinations.</step>
<step>Access cumulates using key as index to move items.</step>
<step>Copy back into original array.</step>
</procedure>

<img src="../images_data/d19-2-1.png" alt="Key-Indexed Counting"/>

<p><format color="BlueViolet">Properties:</format> </p>

<list type="bullet">
<li>Key-indexed counting uses <math>\sim 11 N + 4 R</math> array 
accesses to sort <math>N</math> items whose keys are integers between
<math>0</math> and <math>R - 1</math>.</li>
<li>Key-indexed counting uses extra space proportional to <math>
N + R</math>.</li>
<li>Key-indexed counting is stable.</li>
</list>

<p>Java</p>

```Java
public class KeyIndexedSorting {
    public static void sort(Squirrel[] students) {
        int N = students.length;
        int R = 5; // Assuming grades are from 0 to 4

        int[] count = new int[R + 1];
        for (Squirrel student : students) {
            count[student.grade + 1]++;
        }

        for (int r = 0; r < R; r++) {
            count[r + 1] += count[r];
        }

        Squirrel[] aux = new Squirrel[N];
        for (Squirrel student : students) {
            aux[count[student.grade]++] = student;
        }

        System.arraycopy(aux, 0, students, 0, N);
    }

    static class Squirrel {
        String name;
        int grade;

        public Squirrel(String name, int grade) {
            this.name = name;
            this.grade = grade;
        }

        @Override
        public String toString() {
            return name + " (Grade: " + grade + ")";
        }
    }
}
```

<p>C++</p>

```C++
#include <iostream>
#include <utility>
#include <vector>
#include <string>

struct Squirrel {
    std::string name;
    int grade;

    Squirrel(std::string n, const int g) : name(std::move(n)), grade(g) {}

    friend std::ostream& operator<<(std::ostream& os, const Squirrel& s) {
        os << s.name << " (Grade: " << s.grade << ")";
        return os;
    }
};

void sort(std::vector<Squirrel>& students) {
    const int N = static_cast<int>(students.size());
    constexpr int R = 5; // Assuming grades are from 0 to 4

    std::vector<int> count(R + 1, 0);
    for (int i = 0; i < N; i++) {
        count[students[i].grade + 1]++;
    }

    for (int r = 0; r < R; r++) {
        count[r + 1] += count[r];
    }

    std::vector<Squirrel> aux(N);
    for (int i = 0; i < N; i++) {
        aux[count[students[i].grade]++] = students[i];
    }

    students = aux;
}
```

<p>Python</p>

```Python
class Squirrel:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __str__(self):
        return f"{self.name} (Grade: {self.grade})"

def sort(students):
    N = len(students)
    R = 5  # Assuming grades are from 0 to 4

    count = [0] * (R + 1)
    for student in students:
        count[student.grade + 1] += 1

    for r in range(R):
        count[r + 1] += count[r]

    aux = [None] * N
    for student in students:
        aux[count[student.grade]] = student
        count[student.grade] += 1

    students[:] = aux 
```

### 19.3 LSD Radix Sort {id="lsd"}

<procedure title="LSD Radix Sort">
<step>Consider characters from right to left.</step>
<step>Stably sort using dth character as the key (using key-indexed 
counting).</step>
</procedure>

<p><format color="BlueViolet">Correctness Proof:</format> LSD sorts 
fixed-length strings in ascending order.</p>

<p><format color="LawnGreen">Proof:</format> </p>

<p>After pass <math>i</math>, strings are sorted by last <math>i
</math> characters.</p>

<list>
<li>If two strings differ on sort key, key-indexed sort puts them in
proper relative order.</li>
<li>If two strings agree on sort key, stability keeps them in proper
relative order.</li>
</list>

<p><format color="BlueViolet">Property:</format> LSD sort is stable.
</p>

<p>Google (or presidential) Interview Question: Sort one million 
32-bit integers using LSD radix sort.</p>

<note>
For information about the performance of insertion sort, please refer
to the <a anchor="sortperf" 
summary="Table for Comparing Performance of Sorting Algorithm">table 
for sorting performance</a>.
</note>

<p>Java</p>

```Java
public class LSDStringSort {
    public static void sort(String[] a, int W) {
        int N = a.length;
        int R = 256; // extended ASCII alphabet size
        String[] aux = new String[N];

        for (int d = W - 1; d >= 0; d--) {
            int[] count = new int[R + 1];
            for (String string : a) {
                count[string.charAt(d) + 1]++;
            }

            for (int r = 0; r < R; r++) {
                count[r + 1] += count[r];
            }

            for (String s : a) {
                aux[count[s.charAt(d)]++] = s;
            }

            System.arraycopy(aux, 0, a, 0, N);
        }
    }
}
```

<p>C++</p>

```C++
#include <iostream>
#include <string>
#include <vector>

void lsdSort(std::vector<std::string>& a, const int w) {
    const int n = static_cast<int>(a.size());
    int R = 256; 
    std::vector<std::string> aux(n);

    for (int d = w - 1; d >= 0; d--) {
        std::vector<int> count(R + 1, 0);

        for (int i = 0; i < n; i++) {
            count[a[i][d] + 1]++;
        }

        for (int r = 0; r < R; r++) {
            count[r + 1] += count[r];
        }

        for (int i = 0; i < n; i++) {
            aux[count[a[i][d]]++] = a[i];
        }

        for (int i = 0; i < n; i++) {
            a[i] = aux[i];
        }
    }
}
```

<p>Python</p>

```Python
def lsd_sort(a, w):
    n = len(a)
    R = 256 
    aux = [""] * n

    for d in range(w - 1, -1, -1):
        count = [0] * (R + 1)

        for i in range(n):
            count[ord(a[i][d]) + 1] += 1

        for r in range(R):
            count[r + 1] += count[r]

        for i in range(n):
            aux[count[ord(a[i][d])]] = a[i]
            count[ord(a[i][d])] += 1

        a[:] = aux 
```

### 19.4 MSD Radix Sort {id="msd"}

<procedure title="MSD Radix Sort">
<step>Partition array into <math>R</math> pieces according to first 
character (use key-indexed counting).</step>
<step>Recursively sort all strings that start with each character 
(key-indexed counts delineate subarrays to sort).</step>
</procedure>

<p><format color="BlueViolet">Variable-length strings:</format> Treat
strings as if they had an extra char at end (smaller than any char)
</p>

<note>
C strings =>Have extra char '\0' at end => no extra work needed.
</note>

<p><format color="BlueViolet">Potential for Disastrous Performance:
</format> </p>

<list type="decimal">
<li>
<p>Much too slow for small subarrays.</p>
    <list type="bullet">
    <li>Each function call needs its own <code>count[]</code> array.
    </li>
    <li>ASCII (256 counts): 100x slower than copy pass for <math>
    N = 2</math>.</li>
    <li>Unicode (65,536 counts): 32,000x slower for <math>N = 2
    </math>.</li>
    </list>
</li>
<li>
<p>Huge number of small subarrays because of recursion.</p>
</li>
</list>

<p><format color="BlueViolet">Improvements:</format> </p>

<p>Cutoff to insertion sort for small subarrays.</p>

<list type="bullet">
<li>Insertion sort, but start at <math>d^{th}</math> character.</li>
<li>Implement <code>less()</code> so that it compares starting at 
<math>d^{th}</math> character.</li>
</list>

<p><format color="BlueViolet">Performance:</format> </p>

<p>Number of characters examined.</p>

<list>
<li>MSD examines just enough characters to sort the keys.</li>
<li>Number of characters examined depends on keys.</li>
<li>Can be sublinear in input size!</li>
</list>

<p><format color="BlueViolet">MSD String Sort vs. Quicksort for 
Strings</format></p>

<list type="alpha-lower">
<li>
<p><format color="Fuchsia">Disadvantages of MSD string sort:</format>
</p>
    <list type="bullet">
    <li>Extra space for aux[] arrays.</li>
    <li>Extra space for count[] arrays.</li>
    <li>Inner loop has a lot of instructions.</li>
    <li>Accesses memory "randomly" (cache inefficient).</li>
    </list>
</li>
<li>
<p><format color="Fuchsia">Disadvantage of quicksort:</format> </p>
    <list type="bullet">
    <li>Linearithmic number of string compares (not linear).</li>
    <li>Has to rescan many characters in keys with long prefix matches
    .</li>
    </list>
</li>
</list>

<note>
For information about the performance of MSD radix sort, please refer
to the <a anchor="sortperf" summary=
"Table for Comparing Performance of Sorting Algorithm">table for 
sorting performance</a>.
</note>

Java

```Java
public class MSDStringSort {
    private static final int R = 256;
    private static final int CUTOFF = 15;

    public static void sort(String[] a) {
        String[] aux = new String[a.length];
        sort(a, aux, 0, a.length - 1, 0);
    }

    private static void sort(String[] a, String[] aux, int low, int high, int d) {
        if (high <= low + CUTOFF) {
            insertionSort(a, low, high, d);
            return;
        }

        int[] count = new int[R + 2];
        for (int i = low; i <= high; i++) {
            int c = charAt(a[i], d);
            count[c + 2]++;
        }

        for (int r = 0; r < R + 1; r++) {
            count[r + 1] += count[r];
        }

        for (int i = low; i <= high; i++) {
            int c = charAt(a[i], d);
            aux[count[c + 1]++] = a[i];
        }

        if (high + 1 - low >= 0) System.arraycopy(aux, 0, a, low, high + 1 - low);

        for (int r = 0; r < R; r++) {
            sort(a, aux, low + count[r], low + count[r + 1] - 1, d + 1);
        }
    }

    private static int charAt(String s, int d) {
        if (d < s.length()) {
            return s.charAt(d);
        } else {
            return -1;
        }
    }

    private static void insertionSort(String[] a, int low, int high, int d) {
        for (int i = low; i <= high; i++) {
            for (int j = i; j > low && less(a[j], a[j - 1], d); j--) {
                swap(a, j, j - 1);
            }
        }
    }

    private static boolean less(String v, String w, int d) {
        return v.substring(d).compareTo(w.substring(d)) < 0;
    }

    private static void swap(String[] a, int i, int j) {
        String temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```

C++

```C++
#include <vector>
#include <string>
#include <algorithm>
#include <iostream>

class MSDStringSort {
private:
    static constexpr int R = 256;
    static constexpr int CUTOFF = 15;

public:
    static void sort(std::vector<std::string>& a) {
        std::vector<std::string> aux(a.size());
        sort(a, aux, 0, static_cast<int>(a.size()) - 1, 0);
    }

private:
    static void sort(std::vector<std::string>& a, std::vector<std::string>& aux, const int low, const int high, const int d) {
        if (high <= low + CUTOFF) {
            insertionSort(a, low, high, d);
            return;
        }

        std::vector<int> count(R + 2, 0);
        for (int i = low; i <= high; i++) {
            const int c = charAt(a[i], d);
            count[c + 2]++;
        }

        for (int r = 0; r < R + 1; r++) {
            count[r + 1] += count[r];
        }

        for (int i = low; i <= high; i++) {
            const int c = charAt(a[i], d);
            aux[count[c + 1]++] = a[i];
        }

        std::copy_n(aux.begin(), (high + 1 - low), a.begin() + low);

        for (int r = 0; r < R; r++) {
            sort(a, aux, low + count[r], low + count[r + 1] - 1, d + 1);
        }
    }

    static int charAt(const std::string& s, const int d) {
        if (d < s.length()) {
            return s[d];
        } else {
            return -1;
        }
    }

    static void insertionSort(std::vector<std::string>& a, const int low, const int high, const int d) {
        for (int i = low; i <= high; i++) {
            for (int j = i; j > low && less(a[j], a[j - 1], d); j--) {
                std::swap(a[j], a[j - 1]);
            }
        }
    }

    static bool less(const std::string& v, const std::string& w, const int d) {
        return v.substr(d) < w.substr(d);
    }
};
```

Python

```Python
def char_at(s, d):
    if d < len(s):
        return ord(s[d])
    else:
        return -1

def insertion_sort(arr, low, high, d):
    for i in range(low, high + 1):
        for j in range(i, low, -1):
            if arr[j][d:] < arr[j - 1][d:]:
                arr[j], arr[j - 1] = arr[j - 1], arr[j]
            else:
                break

def msd_string_sort(arr):
    CUTOFF = 15
    aux = [None] * len(arr)
    sort(arr, 0, len(arr) - 1, 0, aux, CUTOFF)

def sort(arr, low, high, d, aux, CUTOFF):
    if high <= low + CUTOFF:
        insertion_sort(arr, low, high, d)
        return

    R = 256
    count = [0] * (R + 2)

    for i in range(low, high + 1):
        c = char_at(arr[i], d)
        count[c + 2] += 1

    for r in range(R + 1):
        count[r + 1] += count[r]

    for i in range(low, high + 1):
        c = char_at(arr[i], d)
        aux[count[c + 1]] = arr[i]
        count[c + 1] += 1

    for i in range(low, high + 1):
        arr[i] = aux[i - low]

    for r in range(R):
        sort(arr, low + count[r], low + count[r + 1] - 1, d + 1, aux, CUTOFF)
```

### 19.5 3-Way Radix Quicksort {id="3Q"}

<p>Do 3-way partitioning on the <math>d^{th}</math> character.</p>

<p><format color="BlueViolet">Properties:</format> </p>

<list>
<li>Less overhead than R-way partitioning in MSD string sort.</li>
<li>
<p>Does not re-examine characters equal to the partitioning char.</p>
<p>(but does re-examine characters not equal to the partitioning char)
</p>
</li>
</list>

<img src="../images_data/d19-5-1.png" alt="3-Way Radix Quicksort"/>

<p><format color="BlueViolet">3-Way String Quicksort vs. Standard 
Quicksort</format></p>

<list type="decimal">
<li>
<p><format color="Fuchsia">Standard quicksort</format></p>
    <list type="bullet">
    <li>Uses ~ 2 N ln N string compares on average.</li>
    <li>Costly for keys with long common prefixes (and this is a 
    common case!)</li>
    </list>
</li>
<li>
<p><format color="Fuchsia">3-way string (radix) quicksort</format></p>
    <list type="bullet">
    <li>Uses ~ 2 N ln N character compares on average for random strings.</li>
    <li>Avoids re-comparing long common prefixes.</li>
    </list>
</li>
</list>

<p><format color="BlueViolet">3-way String !uicksort vs. MSD String 
Sort</format></p>

<list type="decimal">
<li>
<p><format color="Fuchsia">MSD string sort</format></p>
    <list type="bullet">
    <li>Is cache-inefficient.</li>
    <li>Too much memory storing count[].</li>
    <li>Too much overhead reinitializing count[] and aux[].</li>
    </list>
</li>
<li>
<p><format color="Fuchsia">3-way string quicksort</format></p>
    <list>
    <li>Has a short inner loop.</li>
    <li>Is cache-friendly.</li>
    <li>Is in-place.</li>
    </list>
</li>
</list>

Java

```Java
public class ThreeWayRadixQuicksortStrings {

    private static final int CUTOFF = 15;

    private static int charAt(String s, int d) {
        if (d < s.length()) return s.charAt(d);
        else return -1;
    }

    public static void sort(String[] a) {
        sort(a, 0, a.length - 1, 0);
    }

    private static void sort(String[] a, int lo, int hi, int d) {
        if (hi <= lo + CUTOFF) {
            insertionSort(a, lo, hi, d);
            return;
        }

        int lt = lo, gt = hi;
        int v = charAt(a[lo], d);
        int i = lo + 1;
        while (i <= gt) {
            int t = charAt(a[i], d);
            if (t < v) exch(a, lt++, i++);
            else if (t > v) exch(a, i, gt--);
            else i++;
        }

        sort(a, lo, lt - 1, d);
        if (v >= 0) sort(a, lt, gt, d + 1);
        sort(a, gt + 1, hi, d);
    }

    private static void insertionSort(String[] a, int lo, int hi, int d) {
        for (int i = lo; i <= hi; i++) {
            for (int j = i; j > lo && less(a[j], a[j - 1], d); j--) {
                exch(a, j, j - 1);
            }
        }
    }

    private static boolean less(String v, String w, int d) {
        for (int i = d; i < Math.min(v.length(), w.length()); i++) {
            if (v.charAt(i) < w.charAt(i)) return true;
            if (v.charAt(i) > w.charAt(i)) return false;
        }
        return v.length() < w.length();
    }

    private static void exch(String[] a, int i, int j) {
        String temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```

C++

```C++
#include <iostream>
#include <vector>
#include <string>

class ThreeWayRadixQuicksortStrings {
private:
    static constexpr int CUTOFF = 15; 

    static int charAt(const std::string& s, const int d) {
        if (d < s.length()) return s[d];
        else return -1;
    }

    static void sort(std::vector<std::string>& a, const int lo, const int hi, const int d) {
        if (hi <= lo + CUTOFF) {
            insertionSort(a, lo, hi, d);
            return;
        }

        int lt = lo, gt = hi;
        const int v = charAt(a[lo], d);
        int i = lo + 1;
        while (i <= gt) {
            int t = charAt(a[i], d);
            if (t < v) std::swap(a[lt++], a[i++]);
            else if (t > v) std::swap(a[i], a[gt--]);
            else i++;
        }

        sort(a, lo, lt - 1, d);
        if (v >= 0) sort(a, lt, gt, d + 1);
        sort(a, gt + 1, hi, d);
    }

    static void insertionSort(std::vector<std::string>& a, const int lo, const int hi, const int d) {
        for (int i = lo; i <= hi; i++) {
            for (int j = i; j > lo && less(a[j], a[j - 1], d); j--) {
                std::swap(a[j], a[j - 1]);
            }
        }
    }

    static bool less(const std::string& v, const std::string& w, const int d) {
        for (int i = d; i < std::min(v.length(), w.length()); i++) {
            if (v[i] < w[i]) return true;
            if (v[i] > w[i]) return false;
        }
        return v.length() < w.length();
    }

public:
    static void sort(std::vector<std::string>& a) {
        sort(a, 0, static_cast<int>(a.size()) - 1, 0);
    }
};
```

Python

```Python
CUTOFF = 15

def char_at(s, d):
    if d < len(s):
        return ord(s[d])
    else:
        return -1

def insertion_sort(arr, lo, hi, d):
    for i in range(lo, hi + 1):
        for j in range(i, lo, -1):
            if arr[j][d:] < arr[j - 1][d:]:
                arr[j], arr[j - 1] = arr[j - 1], arr[j]
            else:
                break

def three_way_radix_quicksort(arr):
    def sort(arr, lo, hi, d):
        if hi <= lo + CUTOFF:
            insertion_sort(arr, lo, hi, d)
            return
        lt, gt = lo, hi
        v = char_at(arr[lo], d)
        i = lo + 1
        while i <= gt:
            t = char_at(arr[i], d)
            if t < v:
                arr[lt], arr[i] = arr[i], arr[lt]
                lt += 1
                i += 1
            elif t > v:
                arr[gt], arr[i] = arr[i], arr[gt]
                gt -= 1
            else:
                i += 1
        sort(arr, lo, lt - 1, d)
        if v >= 0:
            sort(arr, lt, gt, d + 1)
        sort(arr, gt + 1, hi, d)

    sort(arr, 0, len(arr) - 1, 0)
```

<p><format color="BlueViolet">Summary of the Performance of Sorting 
Algorithms</format></p>

<table style="header-row" id="sortperf">
<tr>
    <td>Algorithm</td>
    <td>Guarantee</td>
    <td>Random</td>
    <td>Extra Space</td>
    <td>Stable?</td>
    <td>Operations on keys</td>
</tr>
<tr>
    <td><a href="Data-Structures-and-Algorithms-1.md" anchor=
    "insertion-sort" summary="Insertion Sort">Insertion Sort</a></td>
    <td><math>\frac {1}{2} N^{2}</math></td>
    <td><math>\frac {1}{4} N^{2}</math></td>
    <td><math>1</math></td>
    <td>Yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a href="Data-Structures-and-Algorithms-1.md" anchor=
    "mergesort" summary="Mergesort">Mergesort</a></td>
    <td><math>N \lg N</math></td>
    <td><math>N \lg N</math></td>
    <td><math>N</math></td>
    <td>Yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a href="Data-Structures-and-Algorithms-1.md" anchor=
    "quicksort" summary="Quicksort">Quicksort</a></td>
    <td><math>1.39 N \lg N</math> *</td>
    <td><math>1.39 N \lg N</math></td>
    <td><math>c \lg N</math></td>
    <td>No</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a href="Data-Structures-and-Algorithms-1.md" anchor=
    "heapsort" summary="Heapsort">Heapsort</a></td>
    <td><math>2 N \lg N</math></td>
    <td><math>2 N \lg N</math></td>
    <td><math>1</math></td>
    <td>No</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a anchor="lsd" summary="LSD Radix Sort">LSD&star;</a></td>
    <td><math>2 N W</math></td>
    <td><math>2 N W</math></td>
    <td><math>N + R</math></td>
    <td>Yes</td>
    <td><code>charAt()</code></td>
</tr>
<tr>
    <td><a anchor="msd" summary="MSD Radix Sort">MSD&starf;</a></td>
    <td><math>2 N W</math></td>
    <td><math>N \log_{R} N</math></td>
    <td><math>N + D R</math></td>
    <td>Yes</td>
    <td><code>charAt()</code></td>
</tr>
<tr>
    <td><a anchor="3Q" summary="3-Way Radix Quicksort">3-Way String 
    Quicksort</a></td>
    <td><math>1.39 W N \lg R</math> *</td>
    <td><math>1.39 N \lg N</math></td>
    <td><math>\log N + W</math></td>
    <td>No</td>
    <td><code>charAt()</code></td>
</tr>
</table>

<p>*: probabilistic</p>
<p>&star;: fixed-length W keys</p>
<p>&starf;: average-length W keys</p>

### 19.6 Suffix Arrays

<p><format color="BlueViolet">Keyword in context search:</format> 
Given a text of N characters, preprocess it to enable fast substring 
search (find all occurrences of query string context).</p>

<p><format color="BlueViolet">Applications:</format> Linguistics, 
databases, web search, word processing, ...</p>

<p><format color="BlueViolet">Keyword-in-context search:</format> 
suffix-sorting solution.</p>

<list type="bullet">
<li>
<p><format color="Fuchsia">Preprocess:</format> <format color=
"OrangeRed">suffix sort</format> the text.</p>
</li>
<li>
<p><format color="Fuchsia">Query:</format> binary search for query; 
scan until mismatch.</p>
</li>
</list> 

## 20 Tries

### 20.1 R-Way Tries {id="rway"}

<p><format color="BlueViolet">Tries (from retrieval, but pronounced 
"try"):</format> Store characters in nodes (not keys), each node has
<math>R</math> children, one for each possible character.</p>

<img src="../images_data/d20-1-1.png" alt="Tries"/>

<procedure title="Trie Search">
<step>
    <p>Follow links corresponding to each character in the key.</p>
</step>
<step>
    <p><format color="Fuchsia">Search hit:</format> node where search
    ends has a non-null value.</p>
</step>
<step>
    <p><format color="Fuchsia">Search miss:</format> reach null link 
    or node where search ends has null value.</p>
</step>
</procedure>

<procedure title="Trie Delete">
<step>
    <p>Find the node corresponding to key and set value to null.</p>
</step>
<step>
    <p>If node has null value and all null links, remove that node 
    (and recur).</p>
</step>
</procedure>

Java

```Java
import java.util.HashMap;

public class RWayTrie {

    private static final int R = 256;

    private final Node root;

    private static class Node {
        private boolean isEndOfWord;
        private final HashMap<Character, Node> children;

        public Node() {
            isEndOfWord = false;
            children = new HashMap<>();
        }
    }

    public RWayTrie() {
        root = new Node();
    }

    public void insert(String word) {
        Node current = root;
        for (char c : word.toCharArray()) {
            if (!current.children.containsKey(c)) {
                current.children.put(c, new Node());
            }
            current = current.children.get(c);
        }
        current.isEndOfWord = true;
    }

    public boolean search(String word) {
        Node current = root;
        for (char c : word.toCharArray()) {
            if (!current.children.containsKey(c)) {
                return false;
            }
            current = current.children.get(c);
        }
        return current.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        Node current = root;
        for (char c : prefix.toCharArray()) {
            if (!current.children.containsKey(c)) {
                return false;
            }
            current = current.children.get(c);
        }
        return true;
    }
}
```

C++

```C++
#include <iostream>
#include <unordered_map>
#include <ranges>

constexpr int R = 26;

struct Node {
    bool isEndOfWord;
    std::unordered_map<char, Node*> children;

    Node() : isEndOfWord(false) {}
};

class RWayTrie {
private:
    Node* root;

    static void deleteNode(Node* node) {
        if (node == nullptr) {
            return;
        }

        for (Node* child : node->children | std::views::values) {
            deleteNode(child);
        }

        delete node;
    }

public:
    RWayTrie() {
        root = new Node();
    }

    void insert(const std::string& word) const
    {
        Node* current = root;
        for (char c : word) {
            if (!current->children.contains(c)) {
                current->children[c] = new Node();
            }
            current = current->children[c];
        }
        current->isEndOfWord = true;
    }

    [[nodiscard]] bool search(const std::string& word) const
    {
        Node* current = root;
        for (char c : word) {
            if (!current->children.contains(c)) {
                return false;
            }
            current = current->children[c];
        }
        return current->isEndOfWord;
    }

    [[nodiscard]] bool startsWith(const std::string& prefix) const
    {
        Node* current = root;
        for (char c : prefix) {
            if (!current->children.contains(c)) {
                return false;
            }
            current = current->children[c];
        }
        return true;
    }

    ~RWayTrie() {
        deleteNode(root);
    }
};
```

Python

```Python
class Node:
    def __init__(self):
        self.isEndOfWord = False
        self.children = {}  # Dictionary to store child nodes


class RWayTrie:
    def __init__(self):
        self.root = Node()

    def insert(self, word):
        current = self.root
        for char in word:
            if char not in current.children:
                current.children[char] = Node()
            current = current.children[char]
        current.isEndOfWord = True

    def search(self, word):
        current = self.root
        for char in word:
            if char not in current.children:
                return False
            current = current.children[char]
        return current.isEndOfWord

    def startsWith(self, prefix):
        current = self.root
        for char in prefix:
            if char not in current.children:
                return False
            current = current.children[char]
        return True
```

### 20.2 Ternary Search Tries {id="tst"}

<p><format color="BlueViolet">Ternary Search Trees:</format> </p>

<list type="bullet">
<li>
    <p>Store characters and values in nodes (not keys).</p>
</li>
<li>
    <p>Each node has 3 children: smaller (left), equal (middle), 
    larger (right).</p>
</li>
</list>

<img src="../images_data/d20-2-1.png" alt="TST Representation"/>

<procedure title="TST Search">
<step>
    <p>Follow links corresponding to each character in the key.</p>
    <list type="bullet">
    <li>
    <p>If less, take left link; if greater, take right link.</p>
    </li>
    <li>
    <p>If equal, take the middle link and move to the next key character.
    </p>
    </li>
    </list>
</step>
<step>
    <p>Search hit & miss: </p>
    <list type="bullet">
    <li>
    <p><format color="Fuchsia">Search hit:</format> Node where search 
    ends has a non-null value.</p>
    </li>
    <li>
    <p><format color="Fuchsia">Search miss:</format> Reach null link 
    or node where search ends has null value.</p>
    </li>
    </list>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class TernarySearchTree {
\/
    private Node root;
\/
    private static class Node {
        char data;
        boolean isEndOfString;
        Node left, equal, right;
\/
        public Node(char data) {
            this.data = data;
            this.isEndOfString = false;
            this.left = null;
            this.equal = null;
            this.right = null;
        }
    }
\/
    public TernarySearchTree() {
        root = null;
    }
\/
    public void insert(String word) {
        root = insertRecursive(root, word, 0);
    }
\/
    private Node insertRecursive(Node node, String word, int index) {
        char c = word.charAt(index);
\/
        if (node == null) {
            node = new Node(c);
        }
\/
        if (c &lt; node.data) {
            node.left = insertRecursive(node.left, word, index);
        } else if (c &gt; node.data) {
            node.right = insertRecursive(node.right, word, index);
        } else {
            if (index &lt; word.length() - 1) {
                node.equal = insertRecursive(node.equal, word, index + 1);
            } else {
                node.isEndOfString = true;
            }
        }
        return node;
    }
\/
    public boolean search(String word) {
        return searchRecursive(root, word, 0);
    }
\/
    private boolean searchRecursive(Node node, String word, int index) {
        if (node == null) {
            return false;
        }
\/
        char c = word.charAt(index);
\/
        if (c &lt; node.data) {
            return searchRecursive(node.left, word, index);
        } else if (c &gt; node.data) {
            return searchRecursive(node.right, word, index);
        } else {
            if (index == word.length() - 1) {
                return node.isEndOfString;
            } else {
                return searchRecursive(node.equal, word, index + 1);
            }
        }
    }
\/
    public void getWordsWithPrefix(String prefix) {
        Node node = getPrefixNode(root, prefix, 0);
        if (node != null) {
            traverseAndPrint(node, prefix);
        }
    }
\/
    private Node getPrefixNode(Node node, String prefix, int index) {
        if (node == null) {
            return null;
        }
\/
        char c = prefix.charAt(index);
\/
        if (c &lt; node.data) {
            return getPrefixNode(node.left, prefix, index);
        } else if (c &gt; node.data) {
            return getPrefixNode(node.right, prefix, index);
        } else {
            if (index == prefix.length() - 1) {
                return node;
            } else {
                return getPrefixNode(node.equal, prefix, index + 1);
            }
        }
    }
\/
    private void traverseAndPrint(Node node, String prefix) {
        if (node == null) {
            return;
        }
\/
        if (node.isEndOfString) {
            System.out.println(prefix);
        }
\/
        traverseAndPrint(node.left, prefix);
        traverseAndPrint(node.equal, prefix + node.data);
        traverseAndPrint(node.right, prefix);
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;string&gt;
\/
class TernarySearchTree {
private:
    struct Node {
        char data;
        bool isEndOfString;
        Node *left, *equal, *right;
\/
        explicit Node(const char data) : data(data), isEndOfString(false), left(nullptr), equal(nullptr), right(nullptr) {}
    };
\/
    Node *root;
\/
    static Node* insertRecursive(Node* node, const std::string& word, const int index) {
        const char c = word[index];
\/
        if (node == nullptr) {
            node = new Node(c);
        }
\/
        if (c &lt; node-&gt;data) {
            node-&gt;left = insertRecursive(node-&gt;left, word, index);
        } else if (c &gt; node-&gt;data) {
            node-&gt;right = insertRecursive(node-&gt;right, word, index);
        } else {
            if (index &lt; word.length() - 1) {
                node-&gt;equal = insertRecursive(node-&gt;equal, word, index + 1);
            } else {
                node-&gt;isEndOfString = true;
            }
        }
        return node;
    }
\/
    static bool searchRecursive(const Node* node, const std::string& word, const int index) {
        if (node == nullptr) {
            return false;
        }
\/
        const char c = word[index];
\/
        if (c &lt; node-&gt;data) {
            return searchRecursive(node->left, word, index);
        } else if (c &gt; node-&gt;data) {
            return searchRecursive(node->right, word, index);
        } else {
            if (index == word.length() - 1) {
                return node-&gt;isEndOfString;
            } else {
                return searchRecursive(node-&gt;equal, word, index + 1);
            }
        }
    }
\/
    static Node* getPrefixNode(Node* node, const std::string& prefix, const int index) {
        if (node == nullptr) {
            return nullptr;
        }
\/
        const char c = prefix[index];
\/
        if (c &lt; node-&gt;data) {
            return getPrefixNode(node-&gt;left, prefix, index);
        } else if (c &gt; node-&gt;data) {
            return getPrefixNode(node-&gt;right, prefix, index);
        } else {
            if (index == prefix.length() - 1) {
                return node;
            } else {
                return getPrefixNode(node->equal, prefix, index + 1);
            }
        }
    }
\/
    static void traverseAndPrint(const Node* node, const std::string& prefix) {
        if (node == nullptr) {
            return;
        }
\/
        if (node-&gt;isEndOfString) {
            std::cout &lt;&lt; prefix &lt;&lt; std::endl;
        }
\/
        traverseAndPrint(node-&gt;left, prefix);
        traverseAndPrint(node-&gt;equal, prefix + node-&gt;data);
        traverseAndPrint(node-&gt;right, prefix);
    }
\/
    static void deleteNodes(const Node* node) {
        if (node == nullptr) {
            return;
        }
        deleteNodes(node-&gt;left);
        deleteNodes(node-&gt;equal);
        deleteNodes(node-&gt;right);
        delete node;
    }
\/
public:
    TernarySearchTree() : root(nullptr) {}
\/
    void insert(const std::string& word) {
        root = insertRecursive(root, word, 0);
    }
\/
    [[nodiscard]] bool search(const std::string& word) const{
        return searchRecursive(root, word, 0);
    }
\/
    void getWordsWithPrefix(const std::string& prefix) const {
        Node* node = getPrefixNode(root, prefix, 0);
        if (node != nullptr) {
            traverseAndPrint(node, prefix);
        }
    }
\/
    ~TernarySearchTree() {
        deleteNodes(root);
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class Node:
    def __init__(self, data):
        self.data = data
        self.isEndOfString = False
        self.left = None
        self.equal = None
        self.right = None
\/
class TernarySearchTree:
    def __init__(self):
        self.root = None
\/
    def insert(self, word):
        self.root = self._insert_recursive(self.root, word, 0)
\/
    def _insert_recursive(self, node, word, index):
        c = word[index]
\/
        if node is None:
            node = Node(c)
\/
        if c &lt; node.data:
            node.left = self._insert_recursive(node.left, word, index)
        elif c &gt; node.data:
            node.right = self._insert_recursive(node.right, word, index)
        else:
            if index &lt; len(word) - 1:
                node.equal = self._insert_recursive(node.equal, word, index + 1)
            else:
                node.isEndOfString = True
        return node
\/
    def search(self, word):
        return self._search_recursive(self.root, word, 0)
\/
    def _search_recursive(self, node, word, index):
        if node is None:
            return False
\/
        c = word[index]
\/
        if c &lt; node.data:
            return self._search_recursive(node.left, word, index)
        elif c &gt; node.data:
            return self._search_recursive(node.right, word, index)
        else:
            if index == len(word) - 1:
                return node.isEndOfString
            else:
                return self._search_recursive(node.equal, word, index + 1)
\/
    def get_words_with_prefix(self, prefix):
        node = self._get_prefix_node(self.root, prefix, 0)
        if node is not None:
            self._traverse_and_print(node, prefix)
\/
    def _get_prefix_node(self, node, prefix, index):
        if node is None:
            return None
\/
        c = prefix[index]
\/
        if c &lt; node.data:
            return self._get_prefix_node(node.left, prefix, index)
        elif c &gt; node.data:
            return self._get_prefix_node(node.right, prefix, index)
        else:
            if index == len(prefix) - 1:
                return node
            else:
                return self._get_prefix_node(node.equal, prefix, index + 1)
\/
    def _traverse_and_print(self, node, prefix):
        if node is None:
            return
\/
        if node.isEndOfString:
            print(prefix)
\/
        self._traverse_and_print(node.left, prefix)
        self._traverse_and_print(node.equal, prefix + node.data)
        self._traverse_and_print(node.right, prefix)
    </code-block>
    </tab>
</tabs>

<p id="tst-with-r2"><format color="BlueViolet">TST with <math>R^{2}
</math> branching at root:</format> Hybrid of R-way trie and TST</p>

<list type="bullet">
<li>
    <p>Do <math>R^{2}</math>-way branching at root.</p>
</li>
<li>
    <p>Each of <math>R^{2}</math> root nodes points to a TST.</p>
</li>
</list>

<p><format color="BlueViolet">TST vs. Hashing</format></p>

<table style="header-row">
<tr>
    <td>TSTs</td>
    <td>Hashing</td>
</tr>
<tr>
    <td>Works only for strings (or digital keys)</td>
    <td>Need to examine entire key</td>
</tr>
<tr>
    <td>Only examines just enough key characters</td>
    <td>Search hits and misses cost about the same</td>
</tr>
<tr>
    <td>Search miss may involve only a few characters</td>
    <td>Performance relies on hash function</td>
</tr>
<tr>
    <td>Supports ordered symbol table operations (plus others!)</td>
    <td>Does not support ordered symbol table operations</td>
</tr>
</table>

<note>
<p>TSTs are: </p>
<list type="bullet">
<li>
    <p>Faster than hashing (especially for search misses).</p>
</li>
<li>
    <p>More flexible than red-black BSTs.</p>
</li>
</list>
</note>

<table style="none">
<tr>
    <td rowspan="2">Implementation</td>
    <td colspan="4">Character Accesses (typical case)</td>
</tr>
<tr>
    <td>Search Hit</td>
    <td>Search Miss</td>
    <td>Insert</td>
    <td>Space (references)</td>
</tr>
<tr>
    <td><a href="Data-Structures-and-Algorithms-1.md" anchor
    ="red-black-bsts" summary="Red-Black BSTs">Red-Black BST</a></td>
    <td><math>L+c \lg^{2} N</math></td>
    <td><math>c \lg^{2} N</math></td>
    <td><math>c \lg^{2} N</math></td>
    <td><math>4N</math></td>
</tr>
<tr>
    <td><a href="Data-Structures-and-Algorithms-2.md" anchor
    ="linear-probing" summary="Linear Probing">Hashing (linear 
    probing)</a></td>
    <td><math>L</math></td>
    <td><math>L</math></td>
    <td><math>L</math></td>
    <td><math>4N</math> to <math>16N</math></td>
</tr>
<tr>
    <td><a anchor="rway" summary="R-Way Tries">R-Way Trie</a></td>
    <td><math>L</math></td>
    <td><math>\log_{R} N</math></td>
    <td><math>L</math></td>
    <td><math>(R+1)N</math></td>
</tr>
<tr>
    <td><a anchor="tst" summary="TST">TST</a></td>
    <td><math>L+\ln N</math></td>
    <td><math>\ln N</math></td>
    <td><math>L+\ln N</math></td>
    <td><math>4N</math></td>
</tr>
<tr>
    <td><a anchor="tst-with-r2" summary="TST with R^2">TST with R^2
    </a></td>
    <td><math>L+\ln N</math></td>
    <td><math>\ln N</math></td>
    <td><math>L+\ln N</math></td>
    <td><math>4N + R^{2}</math></td>
</tr>
</table>

## 21 Substring Search

### 21.1 Introduction

<p><format color="BlueViolet">Goal</format>: Find pattern of length 
<math>M</math> in text of length <math>N</math> (typically 
<math>N \ll M</math>).</p>

<p><format color="BlueViolet">Applications</format>: </p>

<list type="bullet">
<li>
    <p>Find & replace</p>
</li>
<li>
    <p>Computer forensics</p>
</li>
<li>
    <p>Identify patterns indicative of spam</p>
</li>
<li>
    <p>Electronic surveillance</p>
</li>
<li>
    <p>Screen scraping</p>
</li>
</list>

### 21.2 Brute-Force Substring Search {id="brute-force"}

<p><format color="BlueViolet">Disadvantages:</format> </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Theoretical challenge:</format> Linear
    -time guarantee (Worst case: <math>\sim MN</math>).</p>
</li>
<li>
    <p><format color="Fuchsia">Practical challenge:</format> Avoid 
    backup in text stream (Brute-force algorithm needs backup for 
    every mismatch).</p></li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public static int search (String pat, String txt) {
    int M = pat.length();
    int N = txt.length();
    int i, j;
    for (i = 0; i &lt;= N - M; i++) {
        for (j = 0; j &lt; M; j++) {
            if (txt.charAt(i + j) != pat.charAt(j)) {
                break;
            }
        }
        if (j == M) {
            return i;
        }
    }
    return N;
}
    </code-block>
    </tab>
    <tab title="Java (alternate implementation)">
    <code-block lang="java" collapsible="true">
public static int search(String pat, String txt) {
    int i, M = pat.length();
    int j, N = txt.length();
    for (i = 0, j = 0; i &lt; N && j &lt; M; i++) {
        if (txt.charAt(i) == pat.charAt(j)) {
            j++;
        } 
        else {
            i -= j;
            j = 0;
        }
    }
    if (j == M) {
        return i - M;
    } 
    else {
        return N;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
int bruteForceSubstringSearch(const std::string& text, const std::string& pattern) {
    int n = text.length();
    int m = pattern.length();
\/
    for (int i = 0; i &lt;= n - m; i++) {
        int j;
        for (j = 0; j &lt; m; j++) {
            if (text[i + j] != pattern[j]) {
                break;
            }
        }
        if (j == m) {
            return i;  
        }
    }
    return -1; 
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def brute_force_search(main_string, sub_string):
    len_main = len(main_string)
    len_sub = len(sub_string)
\/
    for i in range(len_main - len_sub + 1):
        j = 0
\/
        while(j &lt; len_sub):
            if (main_string[i + j] != sub_string[j]):
                break
            j += 1
\/
        if (j == len_sub):
            return i
\/
    return -1
    </code-block>
    </tab>
</tabs>

### 21.3 Knuth-Morris-Pratt {id="KMP"}

#### 21.3.1 Proposition

<p><format color="BlueViolet">Property:</format> KMP substring search
accesses no more than <math>M + N</math> chars to search for a pattern
of length <math>M</math> in a text of length <math>N</math>.</p>

<p><format color="LawnGreen">Proof:</format> Each pattern char 
accessed once when constructing DFA; each text char accessed once (in
the worst case) when simulating DFA.</p>

<p><format color="BlueViolet">Property:</format> KMP constructs 
<code>dfa[][]</code> in time and space proportional to <math>RM</math>
, where <math>R</math> is the alphabet size and <math>M</math> is the
pattern length.</p>

#### 21.3.2 DFA

<p><format color="DarkOrange">Deterministic Finite State Automaton 
(DFA)</format> is an abstract string-search machine.</p>

<list type="bullet">
<li>
    <p>Finite number of states (including start and halt).</p>
</li>
<li>
    <p>Exactly one transition for each char in alphabet.</p>
</li>
<li>
    <p>Accept if sequence of transitions lead to halt state.</p>
</li>
</list>

<img src="../images_data/d21-3-1.png" alt="DFA"/>

<note>
<p>DFA state = number of characters in pattern that have been matched
(length of longest prefix of <code>pat[]</code> that is a suffix of
<code>txt[0...i]</code>).</p>
</note>

<procedure title="DFA Construction">
<step>
    <p>If in state <math>j</math> (first <math>j</math> characters of
    pattern have already been matched and next char <code>c == pat.
    charAt(j)</code> (next char matches), go to <math>j+1</math> (now
    first <math>j+1</math> characters of pattern have been matched).
    </p>
</step>
<step>
    <p>If in state <math>j</math> and next char <code>c != pat.charAt
    (j)</code>, then the last <math>j-1</math> characters of input are
    <code>pat[1...j - 1]</code>, followed by c. Simulate <code>
    pat[1...j - 1]</code> on DFA and take transition c (only longest 
    possible matched suffix now lies <code>pat[1...j - 1]</code> 
    followed by c).</p>
</step>
</procedure>

<note>
<p>Use state X to simulate <code>pat[1...j-1]</code>, takes only 
constant time!</p>
</note>

<procedure title="DFA Construction for Code">
<step>
    <p>Copy <code>dfa[][X]</code> to <code>dfa[][j]</code> for 
    mismatch case.</p>
</step>
<step>
    <p>Set <code>dfa[pat.charAt(j)][j]</code> to <math>j+1</math> for
    match case.</p>
</step>
<step>
    <p>Update <math>X</math>.</p>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class KMP {
    private final int R;
    private final int m;
    private final int[][] dfa;
\/
    public KMP(String pat) {
        this.R = 256;
        this.m = pat.length();
\/
        dfa = new int[R][m];
        dfa[pat.charAt(0)][0] = 1;
        for (int x = 0, j = 1; j &lt; m; j++) {
            for (int c = 0; c &lt; R; c++)
                dfa[c][j] = dfa[c][x];
            dfa[pat.charAt(j)][j] = j + 1;
            x = dfa[pat.charAt(j)][x];
        }
    }
\/
    public KMP(char[] pattern, int R) {
        this.R = R;
        this.m = pattern.length;
\/
        int m = pattern.length;
        dfa = new int[R][m];
        dfa[pattern[0]][0] = 1;
        for (int x = 0, j = 1; j &lt; m; j++) {
            for (int c = 0; c &lt; R; c++)
                dfa[c][j] = dfa[c][x];
            dfa[pattern[j]][j] = j + 1;
            x = dfa[pattern[j]][x];
        }
    }
\/
    public int search(String txt) {
        int n = txt.length();
        int i, j;
        for (i = 0, j = 0; i &lt; n && j &lt; m; i++) {
            j = dfa[txt.charAt(i)][j];
        }
        if (j == m) return i - m;
        return n;
    }
\/
    public int search(char[] text) {
        int n = text.length;
        int i, j;
        for (i = 0, j = 0; i &lt; n && j &lt; m; i++) {
            j = dfa[text[i]][j];
        }
        if (j == m) return i - m;
        return n;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;string&gt;
#include &lt;vector&gt;
\/
class KMP {
private:
    const int R;
    const int m;
    std::vector&lt;std::vector&lt;int&gt;&gt; dfa;
\/
public:
explicit KMP(const std::string& pat) : R(256), m(static_cast&lt;int&gt;(pat.length())), dfa(R, std::vector&lt;int&gt;(m)) {
    dfa[pat[0]][0] = 1;
    for (int x = 0, j = 1; j &lt; m; j++) {
        for (int c = 0; c &lt; R; c++)
            dfa[c][j] = dfa[c][x];
        dfa[pat[j]][j] = j + 1;
        x = dfa[pat[j]][x];
    }
}
\/
    [[nodiscard]] int search(const std::string& txt) const {
        const int n = static_cast&lt;int&gt;(txt.length());
        int i, j;
        for (i = 0, j = 0; i &lt; n && j &lt; m; i++) {
            j = dfa[txt[i]][j];
        }
        if (j == m) return i - m;
        return n;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class KMP:
    def __init__(self, pat):
        self.R = 256
        self.m = len(pat)
        self.dfa = [[0] * self.m for _ in range(self.R)]
\/
        self.dfa[ord(pat[0])][0] = 1
        x = 0
        for j in range(1, self.m):
            for c in range(self.R):
                self.dfa[c][j] = self.dfa[c][x]
            self.dfa[ord(pat[j])][j] = j + 1
            x = self.dfa[ord(pat[j])][x]
\/
    def search(self, txt):
        n = len(txt)
        i, j = 0, 0
        while i &lt; n and j &lt; self.m:
            j = self.dfa[ord(txt[i])][j]
            i += 1
        if j == self.m:
            return i - self.m
        return n
    </code-block>
    </tab>
</tabs>

#### 21.3.3 NFA

Example: A B A B A C

lps: 0 0 1 2 3 0

<p><format color = "BlueViolet">Explanantion for k = lps&#91;k - 1&#93; 
in computePrefix:</format> </p>

<list type = "bullet">
<li>
<p>When k reaches 3, q = 5, the position now is <math>C</math>.
The current prefix (also the suffix, without considering <math>C
</math>) is "ABA".</p>
<p><format color = "OrangeRed">ABA</format> BA</p>
<p>AB <format color = "OrangeRed">ABA</format></p>
</li>
<li>
<p>Since <em>C</em> is a mismatch for pattern&#91;3&#93; = <math>B
</math>, we need to first find the longest prefix in "ABA" that is 
also a suffix.</p>
<p><format color = "OrangeRed">ABA</format><format color = "Gold">B
</format> AC</p>
<p>AB <format color = "OrangeRed">ABA</format><format color = "Gold">C
</format></p>
</li>
<li>
<p>The longest prefix and suffix in <math>ABA</math> is <math>A</math>,
  which is given by lps&#91;q - 1&#93; = lps&#91;2&#93; = 1.</p>
</li>
<li>
<p>At this time, we need to try again if <math>C</math> is a match for
the character behind the pattern&#91;1&#93; = <math>B</math>,
which is not.</p>
<p><format color = "OrangeRed">A</format><format color = "Gold">B
</format> ABAC</p>
<p>ABAB <format color = "OrangeRed">A</format><format color = "Gold">C
</format></p>
</li>
<li>
<p>The longest prefix and suffix in "A" is "", k = 0, 
lps&#91;5&#93; = 0.</p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class KMPplus {
    private final String pattern;
    private final int[] next;
\/
    public KMPplus(String pattern) {
        this.pattern = pattern;
        int m = pattern.length();
        next = new int[m];
        int j = -1;
        for (int i = 0; i & lt; m ;
        i++){
            if (i == 0) next[i] = -1;
            else if (pattern.charAt(i) != pattern.charAt(j)) next[i] = j;
            else next[i] = next[j];
            while ( j & gt;=0 && pattern.charAt(i) != pattern.charAt(j)){
                j = next[j];
            }
            j++;
        }
\/
        for (int i = 0; i & lt; m ;
        i++)
        System.out.println("next[" + i + "] = " + next[i]);
    }
\/    
    public int search(String text) {
        int m = pattern.length();
        int n = text.length();
        int i, j;
        for (i = 0, j = 0; i &lt; n && j &lt; m; i++) {
            while (j &gt;= 0 && text.charAt(i) != pattern.charAt(j))
                j = next[j];
            j++;
        }
        if (j == m) return i - m;
        return n;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;iostream&gt;
\/
class KMPplus {
private:
    const std::string pattern;
    std::vector&lt;int&gt; next;
\/
public:
    explicit KMPplus(const std::string& pattern) : pattern(pattern) {
        const int m = static_cast&lt;int&gt;(pattern.length());
        next.resize(m);
        int j = -1;
        for (int i = 0; i &lt; m; i++) {
            if (i == 0) next[i] = -1;
            else if (pattern[i] != pattern[j]) next[i] = j;
            else next[i] = next[j];
            while (j &gt;= 0 && pattern[i] != pattern[j]) {
                j = next[j];
            }
            j++;
        }
\/
        for (int i = 0; i &lt; m; i++)
            std::cout &lt;&lt; "next[" &lt;&lt; i &lt;&lt; "] = " &lt;&lt; next[i] &lt;&lt; std::endl;
    }
\/
    [[nodiscard]] int search(const std::string& text) const {
        const int m = static_cast&lt;int&gt;(pattern.length());
        const int n = static_cast&lt;int&gt;(text.length());
        int i, j;
        for (i = 0, j = 0; i &lt; n && j &lt; m; i++) {
            while (j &gt;= 0 && text[i] != pattern[j])
                j = next[j];
            j++;
        }
        if (j == m) return i - m;
        return n;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class KMPplus:
    def __init__(self, pattern):
        self.pattern = pattern
        m = len(pattern)
        self.next = [0] * m
        j = -1
        for i in range(m):
            if i == 0:
                self.next[i] = -1
            elif pattern[i] != pattern[j]:
                self.next[i] = j
            else:
                self.next[i] = self.next[j]
            while j &gt;= 0 and pattern[i] != pattern[j]:
                j = self.next[j]
            j += 1
\/
        for i in range(m):
            print(f"next[{i}] = {self.next[i]}")
\/
    def search(self, text):
        m = len(self.pattern)
        n = len(text)
        i, j = 0, 0
        while i &lt; n and j &lt; m:
            while j &gt;= 0 and text[i] != self.pattern[j]:
                j = self.next[j]
            j += 1
            i += 1
        if j == m:
            return i - m
        return n
    </code-block>
    </tab>
</tabs>

### 21.4 Boyer-Moore {id="Boyer-Moore"}

<procedure title="Boyer-Moore">
<step>
    <p>Scan characters in pattern from right to left.</p>
</step>
<step>
    <p>Can skip as many as <math>M</math> text chars when finding one
    not in the pattern.</p>
</step>
</procedure>

<p><format color="BlueViolet">How much to skip?</format></p>

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">Mismatch character not in pattern.
    </format></p>
    <img src="../images_data/d21-4-1.png" alt="Case 1"/>
</li>

<li>
    <p><format color="Fuchsia">Mismatch character in pattern.</format>
    </p>
    <img src="../images_data/d21-4-2.png" alt="Case 2"/>
</li>

<li>
    <p><format color="Fuchsia">Mismatch character in pattern (but 
    heuristic no help).</format></p>
    <img src="../images_data/d21-4-3.png" alt="Case 3"/>
</li>

</list>

<note>
<p>Precompute index of rightmost occurrence of character c in pattern
(-1 if character not in pattern).</p>
</note>

<p><format color="BlueViolet">Property:</format> Substring search with 
the Boyer-Moore mismatched character heuristic takes about <math>
\sim \frac{N}{m}</math> character (sublinear) compares to search for 
a pattern of length <math>M</math> in a text of length <math>N</math>
.</p>

<p><format color="BlueViolet">Worst Case:</format> Can be as bad as 
<math>\sim MN</math>.</p>

<p><format color="BlueViolet">Boyer-Moore variant:</format> Can 
improve worst case to <math>\sim 3N</math> character compares
by adding a KMP-like rule to guard against repetitive patterns.</p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class BoyerMoore {
    private final int R;
    private final int[] right;
    private char[] pattern;
    private String pat;
\/
    public BoyerMoore(String pat) {
        this.R = 256;
        this.pat = pat;
\/
        right = new int[R];
        for (int c = 0; c &lt; R; c++)
            right[c] = -1;
        for (int j = 0; j &lt; pat.length(); j++)
            right[pat.charAt(j)] = j;
    }
\/
    public BoyerMoore(char[] pattern, int R) {
        this.R = R;
        this.pattern = new char[pattern.length];
        System.arraycopy(pattern, 0, this.pattern, 0, pattern.length);
\/
        right = new int[R];
        for (int c = 0; c &lt; R; c++)
            right[c] = -1;
        for (int j = 0; j &lt; pattern.length; j++)
            right[pattern[j]] = j;
    }
\/
    public int search(String txt) {
        int M = pat.length();
        int N = txt.length();
        int skip;
        for (int i = 0; i &lt;= N - M; i += skip) {
            skip = 0;
            for (int j = M - 1; j &gt;= 0; j--) {
                if (pat.charAt(j) != txt.charAt(i + j)) {
                    skip = Math.max(1, j - right[txt.charAt(i + j)]);
                    break;
                }
            }
            if (skip == 0) return i;
        }
        return N;
    }
\/
    public int search(char[] text) {
        int M = pattern.length;
        int N = text.length;
        int skip;
        for (int i = 0; i &lt;= N - M; i += skip) {
            skip = 0;
            for (int j = M - 1; j &gt;= 0; j--) {
                if (pattern[j] != text[i + j]) {
                    skip = Math.max(1, j - right[text[i + j]]);
                    break;
                }
            }
            if (skip == 0) return i;
        }
        return N;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
\/
class BoyerMoore {
private:
    int R;
    std::vector&lt;int&gt; right;
    std::string pat;
\/
public:
    explicit BoyerMoore(const std::string& pat) {
        this-&gt;R = 256;
        this-&gt;pat = pat;
\/
        this-&gt;right.resize(R, -1);
        for (int j = 0; j &lt; pat.size(); j++) {
            this-&gt;right[pat[j]] = j;
        }
    }
\/
    [[nodiscard]] int search(const std::string& txt) const {
        const int M = static_cast&lt;int&gt;(pat.size());
        const int N = static_cast&lt;int&gt;(txt.size());
        int skip;
        for (int i = 0; i &lt;= N - M; i += skip) {
            skip = 0;
            for (int j = M - 1; j &gt;= 0; j--) {
                if (pat[j] != txt[i + j]) {
                    skip = std::max(1, j - right[txt[i + j]]);
                    break;
                }
            }
            if (skip == 0) return i;
        }
        return N;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class BoyerMoore:
    def __init__(self, pat):
        self.R = 256
        self.pat = pat
        self.right = [-1] * self.R
\/
        for j in range(len(pat)):
            self.right[ord(pat[j])] = j
\/
    def search(self, txt):
        M = len(self.pat)
        N = len(txt)
        skip = 1 
\/
        for i in range(0, N - M + 1, skip):
            skip = 0
            for j in range(M - 1, -1, -1):
                if self.pat[j] != txt[i + j]:
                    skip = max(1, j - self.right[ord(txt[i + j])])
                    break
            if skip == 0:
                return i
        return N
    </code-block>
    </tab>
</tabs>

### 21.5 Rabin-Karp

<procedure title="Rabin-Karp (Modular Hashing)">
<step>
    <p>Compute a hash of pattern characters <math>0</math> to <math>
    M - 1</math>.</p>
</step>
<step>
    <p>For each <math>i</math>, compute a hash of text characters 
    <math>i</math> to <math>M + i - 1</math>.</p>
</step>
<step>
    <p>If pattern hash = text substring hash, check for a match.</p>
</step>
</procedure>

<p><format color="BlueViolet">Modular Hashing Function:</format> 
Using the notation <math>t_{i}</math> for <code>txt.charAt(i)</code>,
we wish to compute:</p>

<code-block lang="tex">
x_{i} = t_{i} R^{M-1} + t_{i+1} R^{M-2} + ... + t_{i+M-1} R^{0}   \mod Q
</code-block>

<p>M-digit, base-R integer, modulo Q.</p>

<tip>
<p><format color="BlueViolet">Horner's method:</format> Linear-time 
method to evaluate degree- <math>M</math> polynomial.</p>
<img src="../images_data/d21-5-1.png" alt="Horner's Method"/>
</tip>

<p>Based on the function above, we can get:</p>

<code-block lang="tex">
x_{i+1} = (x_{i} - t_{i} R^{M-1}) R + t_{i+M}
</code-block>

<img src="../images_data/d21-5-2.png" alt="Substring Search Example"/>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class RabinKarp {
    private final long patHash;
    private final int M;
    private final long Q;
    private final int R;
    private long RM;
\/
    public RabinKarp(String pat) {
        M = pat.length();
        R = 256;
        Q = longRandomPrime();
        RM = 1;
        for (int i = 1; i &lt;= M - 1; i++)
            RM = (R * RM) % Q;
        patHash = hash(pat, M);
    }
\/
    private long hash(String key, int M) {
        long h = 0;
        for (int j = 0; j &lt; M; j++)
            h = (R * h + key.charAt(j)) % Q;
        return h;
    }
\/
    // Las Vegas version: does pat[] match txt[i..i-M+1] ?
    private boolean check(String txt, int i) {
        for (int j = 0; j &lt; M; j++)
            if (patHash != hash(txt.substring(i, i + M), M))
                return false;
        return true;
    }
\/
    // Monte Carlo version: always return true
    private static long longRandomPrime() {
        return (1L &lt;&lt; 31) - 1;
    }
\/
    public int search(String txt) {
        int N = txt.length();
        if (N &lt; M) return N;
        long txtHash = hash(txt, M);
\/
        if ((patHash == txtHash) && check(txt, 0))
            return 0;
\/
        for (int i = M; i &lt; N; i++) {
            txtHash = (txtHash + Q - RM * txt.charAt(i - M) % Q) % Q;
            txtHash = (txtHash * R + txt.charAt(i)) % Q;
\/
            int offset = i - M + 1;
            if ((patHash == txtHash) && check(txt, offset))
                return offset;
        }
\/
        return N;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;string&gt;
\/
class RabinKarp {
private:
    long long patHash;
    int M;
    long long Q;
    int R;
    long long RM;
    std::string pat;
\/
public:
    explicit RabinKarp(const std::string& pat) : pat(pat) {
        M = static_cast&lt;int&gt;(pat.length());
        R = 256;
        Q = longRandomPrime();
        RM = 1;
        for (int i = 1; i &lt;= M - 1; i++)
            RM = (R * RM) % Q;
        patHash = hash(pat, M);
    }
\/
    [[nodiscard]] long long hash(const std::string& key, const int M) const {
        long long h = 0;
        for (int j = 0; j &lt; M; j++)
            h = (R * h + key[j]) % Q;
        return h;
    }
\/
    // Las Vegas version: does pat[] match txt[i..i-M+1] ?
    [[nodiscard]] bool check(const std::string& txt, const int i) const {
        for (int j = 0; j &lt; M; j++)
            if (txt[i + j] != pat[j])
                return false;
        return true;
    }
\/
    // Monte Carlo version: always return true
\/
    static long long longRandomPrime() {
        return 16777213;
    }
\/
    [[nodiscard]] int search(const std::string& txt) const {
        const int N = static_cast&lt;int&gt;(txt.length());
        if (N &lt; M) return N;
        long long txtHash = hash(txt, M);
\/
        if ((patHash == txtHash) && check(txt, 0))
            return 0;
\/
        for (int i = M; i &lt; N; i++) {
            txtHash = (txtHash + Q - RM * txt[i - M] % Q) % Q;
            txtHash = (txtHash * R + txt[i]) % Q;
\/
            int offset = i - M + 1;
            if ((patHash == txtHash) && check(txt, offset))
                return offset;
        }
\/
        return N;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def long_random_prime():
    return (1 &lt;&lt; 31) - 1
\/
\/
class RabinKarp:
    def __init__(self, pat):
        self.pat = pat
        self.M = len(pat)
        self.R = 256
        self.Q = long_random_prime()
        self.RM = 1
        for i in range(1, self.M):
            self.RM = (self.R * self.RM) % self.Q
        self.pat_hash = self.hash(pat, self.M)
\/
    def hash(self, key, M):
        h = 0
        for j in range(M):
            h = (self.R * h + ord(key[j])) % self.Q
        return h
\/
    # Las Vegas version: does pat[] match txt[i..i-M+1] ?
    def check(self, txt, i):
        for j in range(self.M):
            if self.pat_hash != self.hash(txt[i:i+self.M], self.M):
                return False
        return True
\/
    # Monte Carlo version: always return true
\/
    def search(self, txt):
        N = len(txt)
        if N &lt; self.M:
            return N
        txt_hash = self.hash(txt, self.M)
\/
        if (self.pat_hash == txt_hash) and self.check(txt, 0):
            return 0
\/
        for i in range(self.M, N):
            txt_hash = (txt_hash + self.Q - self.RM * ord(txt[i - self.M]) % self.Q) % self.Q
            txt_hash = (txt_hash * self.R + ord(txt[i])) % self.Q
\/
            offset = i - self.M + 1
            if (self.pat_hash == txt_hash) and self.check(txt, offset):
                return offset
\/
        return N
    </code-block>
    </tab>
</tabs>

<p><format color="BlueViolet">Cost of searching for an <math>M</math>
-character pattern in an <math>N</math>-character text</format></p>

<table style="none">
<tr>
    <td rowspan="2">Algorithm</td>
    <td rowspan="2">Version</td>
    <td colspan="2">Operation Count</td>
    <td rowspan="2">Backup in Input?</td>
    <td rowspan="2">Correct?</td>
    <td rowspan="2">Extra Space</td>
</tr>
<tr>
    <td>Guarantee</td>
    <td>Typical</td>
</tr>
<tr>
    <td><a anchor="brute-force" summary="Brute Force Algorithm">Brute
    Force</a></td>
    <td>-</td>
    <td><math>MN</math></td>
    <td><math>1.1MN</math></td>
    <td>yes</td>
    <td>yes</td>
    <td><math>1</math></td>
</tr>
<tr>
    <td rowspan="2"><a anchor="KMP" summary="KMP">Knuth-Morris-Pratt
    </a></td>
    <td>full DFA</td>
    <td><math>2N</math></td>
    <td><math>1.1N</math></td>
    <td>no</td>
    <td>yes</td>
    <td><math>MR</math></td>
</tr>
<tr>
    <td>mismatch transitions only</td>
    <td><math>3N</math></td>
    <td><math>1.1N</math></td>
    <td>no</td>
    <td>yes</td>
    <td><math>R</math></td>
</tr>
<tr>
    <td rowspan="2"><a anchor="Boyer-Moore" summary="Boyer-Moore">
    Boyer-Moore</a></td>
    <td>full algorithm</td>
    <td><math>3N</math></td>
    <td><math>N/M</math></td>
    <td>yes</td>
    <td>yes</td>
    <td><math>R</math></td>
</tr>
<tr>
    <td>mismatched char heuristic only</td>
    <td><math>MN</math></td>
    <td><math>N/M</math></td>
    <td>yes</td>
    <td>yes</td>
    <td><math>R</math></td>
</tr>
<tr>
    <td rowspan="2">Rabin-Karp*</td>
    <td>Monte Carlo</td>
    <td><math>7N</math></td>
    <td><math>7N</math></td>
    <td>no</td>
    <td>yes*</td>
    <td><math>1</math></td>
</tr>
<tr>
    <td>Las Vegas</td>
    <td><math>7N</math> *</td>
    <td><math>7N</math></td>
    <td>yes</td>
    <td>yes</td>
    <td><math>1</math></td>
</tr>
</table>

<p>*: probabilisitic guarantee, with uniform hash function</p>

## 22 Catalan Number

### 22.1 Properties and Formulas

<list type = "decimal">
<li>
    <code-block lang = "tex" style = "inline">
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

### 22.2 Applications

<list type = "decimal">
<li>
<p>It is the number of expressions containing <math>n</math> pairs of
parentheses which are correctly matched.</p>
<p>For <math>n = 3</math>, for example:</p>
<p>((())), (()()), (())(), ()(()), ()()().</p>
</li>
<li>
<p>It is the number of different ways <math>n + 1</math> factors can be
completely parenthesized (or the number of ways of associating <math>n</math> 
applications of a binary operator, as in the matrix chain 
multiplication problem).</p>
<p>For <math>n = 3</math>, for example:</p>
<p>((ab)c)d, (a(bc))d, (ab)(cd), a((bc)d), a(b(cd)).</p>
</li>
<li>
<p>It is the number of full binary trees with <math>n + 1</math> leaves,
or, equivalently, with a total of <math>n</math> internal nodes.</p>
<note>
<p>A full binary tree is a tree in which every node has either
0 or 2 children. (International Definiton)</p>
</note>
<p>For <math>n = 3</math>, for example:</p>
<img src="../images_data/d31-2-1.png" alt="Alt text" width="450" style = "inline"/></li>
<li>
<p>It is the number of structurally unique BSTs (binary search
trees) which has exactly <math>n</math> nodes of unique values
from 1 to <math>n</math>.</p>
<p>For <math>n = 3</math>, for example:</p>
<img src="../images_data/d31-2-2.jpg" alt="Alt text" width="450" style = "inline"/></li>
<li>
<p>It is the number of Dyck words of length <math>2n</math>. A Dyck word is a
string consisting of <math>n</math> X's and <math>n</math> Y's
such that no initial segment of the string has more Y's than X's.</p>
<p>For example, Dyck words for <math>n = 3</math>:</p>
<p>XXXYYY     XYXXYY     XYXYXY     XXYYXY     XXYXYY</p>
</li>
<li>
<p>It is the number of monotonic lattice paths along the edges of a
grid with <math>n \times n</math> square cells, which do not pass
above the diagonal.</p>
<note>
<list>
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

### 22.3 Implementation

Java

```Java
public static BigInteger catalan(int n) {
    BigInteger res = BigInteger.ONE;

    for (int i = 0; i < n; i++) {
        res = res.multiply(BigInteger.valueOf(2L * n - i));
        res = res.divide(BigInteger.valueOf(i + 1));
    }

    return res.divide(BigInteger.valueOf(n + 1));
}
```

C++

```C++
unsigned long int binomialCoeff(unsigned int n, unsigned int k) {
    if (k > n) return 0;
    if (k == 0 || k == n) return 1;

    unsigned long int res = 1;
    for (int i = 0; i < k; i++) {
        res *= (n - i);
        res /= (i + 1);
    }

    return res;
}

unsigned long int catalan(unsigned int n) {
    unsigned long int c = binomialCoeff(2*n, n);
    return c/(n+1);
}
```

Python

```Python
import math


def catalan_number(n):
    return math.comb(2 * n, n) // (n + 1)
```