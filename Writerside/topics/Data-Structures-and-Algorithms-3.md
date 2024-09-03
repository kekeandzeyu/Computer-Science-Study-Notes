<show-structure for="chapter" depth="3"></show-structure>

# Part &#8546;

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

## 20 Tries

## 21 Substring Search

### 21.1 Introduction

<list>
<li>
<p><format color = "BlueViolet">Goal</format>: Find pattern of length 
<math>M</math> in text of length <math>N</math> (typically 
<math>N</math> &gt;&gt; <math>M</math>).</p>
</li>
<li>
<p><format color = "BlueViolet">Applications</format>: Find & replace,
computer forensics, identify patterns indicative of spam, 
electronic surveillance, screen scraping, etc.</p>
</li>
</list>

### 21.2 Brute-Force Substring Search

* Theoretical challenge: Linear-time guarantee.
  (Worst case: <math>\sim MN</math>)
* Practical challenge: Avoid backup in text stream. (Brute-force
  algorithm needs backup for every mismatch)

Java

```Java
public static int search (String pat, String txt) {
    int M = pat.length();
    int N = txt.length();
    int i, j;
    for (i = 0; i <= N - M; i++) {
        for (j = 0; j < M; j++) {
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
```

Java (Alternate Implementation)

```Java
/**
 * Same sequence of char compares as previous implementation.
 * <p>
 * {@code i} points to end of sequence of already-matched chars
 * in text.
 * <p>
 * {@code j} stores number of already-matchedchars (end of
 * sequence in pattern).
 */
public static int search(String pat, String txt) {
    int i, M = pat.length();
    int j, N = txt.length();
    for (i = 0, j = 0; i < N && j < M; i++) {
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
```

C++

```C++
int bruteForceSubstringSearch(const std::string& text, const std::string& pattern) {
    int n = text.length();
    int m = pattern.length();

    for (int i = 0; i <= n - m; i++) {
        int j;
        for (j = 0; j < m; j++) {
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
```

Python

```Python
def brute_force_search(main_string, sub_string):
    len_main = len(main_string)
    len_sub = len(sub_string)

    for i in range(len_main - len_sub + 1):
        j = 0

        while(j < len_sub):
            if (main_string[i + j] != sub_string[j]):
                break
            j += 1

        if (j == len_sub):
            return i

    return -1
```

### 21.3 Knuth-Morris-Pratt

#### 21.3.1 Proposition

* KMP substring search accesses no more than <math>M + N</math>
  chars to search for a pattern of length <math>M</math> in a text of
  length <math>N</math>.

> Proof: Each pattern char accessed once when constructing DFA;
> each text char accessed once (in the worst case) when simulating
> DFA.
>
{style = "tip"}

* KMP constructs `dfa[][]` in time and space proportional to <math>RM</math>,
  where <math>R</math> is the alphabet size and <math>M</math> is the pattern
  length.

> Improved version of KMP constructs `nfa[]` in time and space
> proportional to <math>M</math>.
>
{style = "tip"}

#### 21.3.2 DFA

Deterministic Finite State Automaton (DFA) is an abstract
string-search machine.

* Finite number of states (including start and halt).
* Exactly one transition for each char in alphabet.
* Accept if sequence of transitions lead to halt state.

<img src="../images_data/d30-3-1.png" alt="Alt text" width="450"/>

DFA state = number of characters in pattern that have been matched (length
of longest prefix of `pat[]` that is a suffix of `txt[0...i]`).

To compute DFA: If in state <math>j</math> and next char `c != pat.charAt(j)`,
then the last <math>j - 1</math> characters of input are `pat[1...j - 1]`,
followed by `c`. Simulate `pat[1...j - 1]` on DFA and take transition c.

For each state <math>j</math> and char `c != pat.charAt(j)`, set `dfa[c][j] = dfa[c][X]`,
then update `X = dfa[pat.charAt(j)][X]`. X is the simulation of `pat[1...j - 1]` on DFA.

> This is the implementation using DFA.
>
{style = "note"}

Java (Princeton)

```Java
public class KMP {
    private final int R;       // the radix
    private final int m;       // length of pattern
    private final int[][] dfa;       // the KMP automaton

    /**
     * Preprocesses the pattern string.
     *
     * @param pat the pattern string
     */
    public KMP(String pat) {
        this.R = 256;
        this.m = pat.length();

        // build DFA from pattern
        dfa = new int[R][m];
        dfa[pat.charAt(0)][0] = 1;
        for (int x = 0, j = 1; j < m; j++) {
            for (int c = 0; c < R; c++)
                dfa[c][j] = dfa[c][x];     // Copy mismatch cases.
            dfa[pat.charAt(j)][j] = j+1;   // Set match case.
            x = dfa[pat.charAt(j)][x];     // Update restart state.
        }
    }

    /**
     * Preprocesses the pattern string.
     *
     * @param pattern the pattern string
     * @param R the alphabet size
     */
    public KMP(char[] pattern, int R) {
        this.R = R;
        this.m = pattern.length;

        // build DFA from pattern
        int m = pattern.length;
        dfa = new int[R][m];
        dfa[pattern[0]][0] = 1;
        for (int x = 0, j = 1; j < m; j++) {
            for (int c = 0; c < R; c++)
                dfa[c][j] = dfa[c][x];     // Copy mismatch cases.
            dfa[pattern[j]][j] = j+1;      // Set match case.
            x = dfa[pattern[j]][x];        // Update restart state.
        }
    }

    /**
     * Returns the index of the first occurrence of the pattern string
     * in the text string.
     *
     * @param  txt the text string
     * @return the index of the first occurrence of the pattern string
     *         in the text string; N if no such match
     */
    public int search(String txt) {

        // simulate operation of DFA on text
        int n = txt.length();
        int i, j;
        for (i = 0, j = 0; i < n && j < m; i++) {
            j = dfa[txt.charAt(i)][j];
        }
        if (j == m) return i - m;    // found
        return n;                    // not found
    }

    /**
     * Returns the index of the first occurrence of the pattern string
     * in the text string.
     *
     * @param  text the text string
     * @return the index of the first occurrence of the pattern string
     *         in the text string; N if no such match
     */
    public int search(char[] text) {

        // simulate operation of DFA on text
        int n = text.length;
        int i, j;
        for (i = 0, j = 0; i < n && j < m; i++) {
            j = dfa[text[i]][j];
        }
        if (j == m) return i - m;    // found
        return n;                    // not found
    }
}
```

C++

```C++
#include <vector>
#include <string>

class KMP {
private:
    int R;       // the radix
    int m;       // length of pattern
    std::vector<std::vector<int>> dfa;       // the KMP automaton

public:
    // Preprocesses the pattern string.
    KMP(std::string pat) {
        this->R = 256;
        this->m = pat.length();

        // build DFA from pattern
        dfa = std::vector<std::vector<int>>(R, std::vector<int>(m));
        dfa[pat[0]][0] = 1;
        for (int x = 0, j = 1; j < m; j++) {
            for (int c = 0; c < R; c++)
                dfa[c][j] = dfa[c][x];     // Copy mismatch cases.
            dfa[pat[j]][j] = j+1;   // Set match case.
            x = dfa[pat[j]][x];     // Update restart state.
        }
    }

    // Returns the index of the first occurrence of the pattern string
    // in the text string.
    int search(std::string txt) {

        // simulate operation of DFA on text
        int n = txt.length();
        int i, j;
        for (i = 0, j = 0; i < n && j < m; i++) {
            j = dfa[txt[i]][j];
        }
        if (j == m) return i - m;    // found
        return n;                    // not found
    }
};
```

Python

```Python
class KMP:
    def __init__(self, pat):
        self.R = 256  # the radix
        self.m = len(pat)  # length of pattern

        # build DFA from pattern
        self.dfa = [[0 for _ in range(self.m)] for _ in range(self.R)]
        self.dfa[ord(pat[0])][0] = 1
        x = 0
        for j in range(1, self.m):
            for c in range(self.R):
                self.dfa[c][j] = self.dfa[c][x]  # Copy mismatch cases.
            self.dfa[ord(pat[j])][j] = j + 1  # Set match case.
            x = self.dfa[ord(pat[j])][x]  # Update restart state.

    def search(self, txt):
        # simulate operation of DFA on text
        n = len(txt)
        i, j = 0, 0
        while i < n and j < self.m:
            j = self.dfa[ord(txt[i])][j]
            i += 1
        if j == self.m:
            return i - self.m  # found
        return n  # not found
```

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

> This is the implementation using NFA.
>
{style = "tip"}

Java

```Java
public class KMP {
    private int[] computeTemporaryArray(char pattern[]) {
        int[] lps = new int[pattern.length];
        int index = 0;
        for (int i = 1; i < pattern.length;) {
            if (pattern[i] == pattern[index]) {
                lps[i] = index + 1;
                index++;
                i++;
            } else {
                if (index != 0) {
                    index = lps[index - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }

    public boolean KMP(char text[], char pattern[]) {
        int lps[] = computeTemporaryArray(pattern);
        int i = 0;
        int j = 0;
        while (i < text.length && j < pattern.length) {
            if (text[i] == pattern[j]) {
                i++;
                j++;
            } else {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        if (j == pattern.length) {
            return true;
        }
        return false;
    }
}
```

C++

```C++
#include <vector>
#include <string>

std::vector<int> computePrefixFunction(const std::string& pattern) {
    int m = pattern.length();
    std::vector<int> lps(m);
    lps[0] = 0;

    int k = 0; // Length of the longest prefix & suffix
    for (int q = 1; q < m; q++) { // q is the position 
        while (k > 0 && pattern[k] != pattern[q])
            k = lps[k-1];  

        if (pattern[k] == pattern[q])
            k++;

        lps[q] = k;
    }

    return lps;
}

std::vector<int> KMP(const std::string& text, const std::string& pattern) {
    int n = text.length();
    int m = pattern.length();
    std::vector<int> longestPrefix = computePrefixFunction(pattern);
    std::vector<int> occurrences;

    int q = 0;
    for (int i = 0; i < n; i++) {
        while (q > 0 && pattern[q] != text[i])
            q = longestPrefix[q-1];

        if (pattern[q] == text[i])
            q++;

        if (q == m) {
            occurrences.push_back(i - m + 1);
            q = longestPrefix[q-1];
        }
    }

    return occurrences;
}
```

Python

```Python
class KMP:
    def __init__(self, pattern):
        self.table = None
        self.pattern = pattern
        self.build_table()

    def build_table(self):
        self.table = [-1] + [0] * len(self.pattern)
        j = -1
        for i in range(len(self.pattern)):
            while j >= 0 and self.pattern[j] != self.pattern[i]:
                j = self.table[j]
            j += 1
            if i + 1 < len(self.pattern) and self.pattern[j] != self.pattern[i + 1]:
                self.table[i + 1] = j
            else:
                self.table[i + 1] = self.table[j]

    def search(self, text):
        i = j = 0
        while i < len(text):
            while j >= 0 and text[i] != self.pattern[j]:
                j = self.table[j]
            i += 1
            j += 1
            if j == len(self.pattern):
                return i - j
        return -1
```

## 19 Catalan Number

### 19.1 Properties and Formulas

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

### 19.2 Applications

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

### 19.3 Implementation

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