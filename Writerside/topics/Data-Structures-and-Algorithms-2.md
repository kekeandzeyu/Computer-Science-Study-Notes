# Data Structures and Algorithms 2

## 14 Undirected Graphs

### 14.1 Introduction to Graphs

<list type="decimal">
<li>
<p>Graph: Set of <format color = "Red">vertices</format> connected
pairwise by <format color = "Red">edges</format>.</p>
</li>
<li>
<p>Path: Sequence of vertices connected by edges.</p>
</li>
<li>
<p>Cycle: Path whose first and last vertices are the same.</p>
</li>
<li>
<p>Two vertices are <format color = "Red">connected</format> if
there is a path between them.</p>
</li>
</list>

<img src="../images_data/14-1-1.png" alt="Undirected graph" width="450"/>

### 14.2 Graph API

<p>Vertex (Application): convert between names and integers with symbol
table.</p>

Representation Type:

<list type = "decimal">
<li>
<p>Set-of-edges graph representation: Maintain a list of the edges.
(linked list or array).</p>
</li>
<li>
<p>Adjacency-matrix graph representation: Maintain a two-dimensional
<math>V</math> by <math>V</math> boolean array. For each edge 
<math>v-w</math> in the graph: <code>adj[v][w] = adj[w][v] = true</code>.</p>
</li>
<li>
<p>Adjacency-list graph representation: Maintain vertex-indexed array
of lists.</p>
</li>
</list>

In practice: use adjacency-lists representation.

<list type = "bullet">
<li>
Algorithms based on iterating over vertices adjacent to <math>v</math>.
</li>
<li>
Real-world graphs tend to be <format color = "Red">sparse</format>.
(huge number of vertices, small average vertex degree).
</li>
</list>

Java

```Java
import java.util.*;

public class Graph {
    private final int V;
    private final LinkedList<Integer>[] adj;

    // Constructor
    public Graph(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i=0; i<v; ++i)
            adj[i] = new LinkedList();
    }

    // Method to add an edge into the graph
    public void addEdge(int v, int w) {
        adj[v].add(w);
        adj[w].add(v);  // Since it's an undirected graph
    }

    // Method to check if an edge exists
    public boolean hasEdge(int v, int w) {
        return adj[v].contains(w);
    }
}
```

C++

```C++
#include <iostream>
#include <vector>

class Graph {
private:
    int numVertices;
    std::vector<int>* adjLists;

public:
    Graph(int vertices) {
        numVertices = vertices;
        adjLists = new std::vector<int>[vertices];
    }

    void addEdge(int src, int dest) {
        adjLists[src].push_back(dest);
        adjLists[dest].push_back(src); // For undirected graph
    }

    void printGraph() {
        for(int v = 0; v < numVertices; v++) {
            std::cout << "Adjacency list of vertex " << v << "\n head ";
            for(auto x : adjLists[v])
                std::cout << "-> " << x;
            std::cout << std::endl;
        }
    }
};
```

Python

```Python
class Graph:
    def __init__(self, num_of_vertices):
        self.num_of_vertices = num_of_vertices
        self.adjacency_list = [[] for _ in range(num_of_vertices)]

    def add_edge(self, v1, v2):
        self.adjacency_list[v1].append(v2)
        self.adjacency_list[v2].append(v1)  # Because it's an undirected graph

    def print_graph(self):
        for i in range(self.num_of_vertices):
            print(i, end=" -> ")
            for j in self.adjacency_list[i]:
                print(j, end=" -> ")
            print()
```

### 14.3 Depth-First Search

```Java
import java.util.*;

public class Graph {
    private final int V;
    private final List<Integer>[] adj;

    public Graph(int V) {
        this.V = V;
        adj = (List<Integer>[]) new List[V];
        for (int v = 0; v < V; v++) {
            adj[v] = new ArrayList<Integer>();
        }
    }

    public int V() {
        return V;
    }

    public void addEdge(int v, int w) {
        adj[v].add(w);
        adj[w].add(v);
    }

    public Iterable<Integer> adj(int v) {
        return adj[v];
    }
}

import java.util.*;

public class DepthFirstSearch {
    private final boolean[] marked;   // marked[v] = is there an s-v path?
    private final int[] edgeTo;      // edgeTo[v] = last edge on s-v path
    private final int s;       // source vertex

    public DepthFirstSearch(Graph G, int s) {
        this.s = s;
        edgeTo = new int[G.V()];
        marked = new boolean[G.V()];
        dfs(G, s);
    }

    // depth first search from v
    private void dfs(Graph G, int v) {
        marked[v] = true;
        for (int w : G.adj(v)) {
            if (!marked[w]) {
                edgeTo[w] = v;
                dfs(G, w);
            }
        }
    }

    public boolean hasPathTo(int v) {
        return marked[v];
    }

    public Iterable<Integer> pathTo(int v) {
        if (!hasPathTo(v)) return null;
        Stack<Integer> path = new Stack<Integer>();
        for (int x = v; x != s; x = edgeTo[x])
            path.push(x);
        path.push(s);
        return path;
    }
}
```

```C++
#include <vector>
#include <list>
#include <iostream>
#include <stack>

class Graph {
public:
    Graph(int V) : V(V), adj(V) {}

    void addEdge(int v, int w) {
        adj[v].push_back(w);
        adj[w].push_back(v);
    }

    const std::list<int>& getAdj(int v) const {
        return adj[v];
    }

    int getV() const {
        return V;
    }

private:
    int V;
    std::vector<std::list<int>> adj;
};

class DFS {
public:
    DFS(const Graph& G, int s) : marked(G.getV(), false), edgeTo(G.getV()), s(s) {
        dfs(G, s);
    }

    bool hasPathTo(int v) const {
        return marked[v];
    }

    void pathTo(int v) const {
        if (!hasPathTo(v)) {
            std::cout << "No path from " << s << " to " << v << std::endl;
            return;
        }

        std::stack<int> path;
        for (int x = v; x != s; x = edgeTo[x]) {
            path.push(x);
        }
        path.push(s);

        while (!path.empty()) {
            std::cout << path.top() << " ";
            path.pop();
        }
        std::cout << std::endl;
    }

private:
    void dfs(const Graph& G, int v) {
        marked[v] = true;
        for (int w : G.getAdj(v)) {
            if (!marked[w]) {
                edgeTo[w] = v;
                dfs(G, w);
            }
        }
    }

    std::vector<bool> marked;
    std::vector<int> edgeTo;
    int s;
};
```

```Python
class Graph:
    def __init__(self, num_of_vertices):
        self.num_of_vertices = num_of_vertices
        self.adjacency_list = [[] for _ in range(num_of_vertices)]
        self.visited = [False] * num_of_vertices
        self.edge_to = [0] * num_of_vertices

    def add_edge(self, v1, v2):
        self.adjacency_list[v1].append(v2)
        self.adjacency_list[v2].append(v1)  # Because it's an undirected graph

    def dfs(self, v):
        self.visited[v] = True
        for w in self.adjacency_list[v]:
            if not self.visited[w]:
                self.dfs(w)
                self.edge_to[w] = v

    def hasPathTo(self, v):
        return self.visited[v]

    def pathTo(self, v):
        if not self.hasPathTo(v):
            return None
        path = []
        x = v
        while x != 0:
            path.append(x)
            x = self.edge_to[x]
        path.append(0)
        return path[::-1]  # Reverse the list to get the path from the root

    def print_graph(self):
        for i in range(self.num_of_vertices):
            print(i, end=" -> ")
            for j in self.adjacency_list[i]:
                print(j, end=" -> ")
            print()
```

### 14.4 Breadth-First Search

```C++
#include <vector>
#include <queue>
#include <iostream>
#include <algorithm>

class Graph {
    int V; // No. of vertices
    std::vector<int> *adj; // Pointer to an array containing adjacency lists
    std::vector<bool> visited;
    std::vector<int> distance;
    std::vector<int> parent;
    int source{}; // Source vertex for BFS

public:
    explicit Graph(int V); // Constructor
    void addEdge(int v, int w); // function to add an edge to graph
    void initializeBFS(int s); // Initialize BFS
    void performBFS(); // Perform BFS
    std::vector<int> getPath(int dest); // Get the shortest path from source to dest
    int getDistance(int dest); // Get the number of edges from source to dest
    bool isPathExists(int dest); // Check if there is a path from source to dest
};

Graph::Graph(int V) {
    this->V = V;
    adj = new std::vector<int>[V];
}

void Graph::addEdge(int v, int w) {
    adj[v].push_back(w); // Add w to v’s list.
}

void Graph::initializeBFS(int s) {
    visited = std::vector<bool>(V, false);
    distance = std::vector<int>(V, -1);
    parent = std::vector<int>(V, -1);
    source = s; // Store the source vertex
    visited[source] = true;
    distance[source] = 0;
    performBFS();
}

void Graph::performBFS() {
    std::queue<int> queue;
    queue.push(source); // Use the source vertex

    while(!queue.empty()) {
        int s = queue.front();
        queue.pop();

        for(auto i = adj[s].begin(); i != adj[s].end(); ++i) {
            if (!visited[*i]) {
                queue.push(*i);
                visited[*i] = true;
                distance[*i] = distance[s] + 1;
                parent[*i] = s;
            }
        }
    }
}

std::vector<int> Graph::getPath(int dest) {
    std::vector<int> path;
    if (!visited[dest]) {
        return path;
    }

    for (int v = dest; v != -1; v = parent[v])
        path.push_back(v);

    std::reverse(path.begin(), path.end());
    return path;
}

int Graph::getDistance(int dest) {
    return distance[dest];
}

bool Graph::isPathExists(int dest) {
    return visited[dest];
}
```

### 14.5 Connected Components

```Java
import java.util.*;

public class Graph {
    private final int V;   // No. of vertices
    private final LinkedList<Integer>[] adj; //Adjacency Lists

    // Constructor
    Graph(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i=0; i<v; ++i)
            adj[i] = new LinkedList();
    }

    // Function to add an edge into the graph
    void addEdge(int v,int w) {
        adj[v].add(w);
        adj[w].add(v);
    }

    // A function used by isConnected and numberOfConnectedComponents
    void DFSUtil(int v, boolean[] visited) {
        // Mark the current node as visited
        visited[v] = true;

        // Recur for all the vertices adjacent to this vertex
        for (int n : adj[v]) {
            if (!visited[n])
                DFSUtil(n, visited);
        }
    }

    // A function used by connectedComponents
    void DFSUtilPrint(int v, boolean[] visited) {
        // Mark the current node as visited and print it
        visited[v] = true;
        System.out.print(v + " ");

        // Recur for all the vertices adjacent to this vertex
        for (int n : adj[v]) {
            if (!visited[n])
                DFSUtilPrint(n, visited);
        }
    }

    // prints all connected components
    void connectedComponents() {
        // Mark all the vertices as not visited
        boolean[] visited = new boolean[V];
        for (int v = 0; v < V; ++v) {
            if (!visited[v]) {
                // print all reachable vertices from v
                DFSUtilPrint(v, visited);
                System.out.println();
            }
        }
    }

    // returns true if two vertices are connected
    boolean isConnected(int v, int w) {
        boolean[] visited = new boolean[V];
        DFSUtil(v, visited);
        return visited[w];
    }
}
```

```C++
#include <iostream>
#include <vector>

class Graph {
private:
    int V; // No. of vertices
    std::vector<int> *adj; // Pointer to an array containing adjacency lists

    void DFS(int v, bool visited[]) {
        // Mark the current node as visited
        visited[v] = true;

        // Recur for all the vertices adjacent to this vertex
        for (int & i : adj[v])
            if (!visited[i])
                DFS(i, visited);
    }

    void DFSWithPrint(int v, bool visited[]) {
        // Mark the current node as visited and print it
        visited[v] = true;
        std::cout << v << " ";

        // Recur for all the vertices adjacent to this vertex
        for (int & i : adj[v])
            if (!visited[i])
                DFSWithPrint(i, visited);
    }

public:
    explicit Graph(int V) {
        this->V = V;
        adj = new std::vector<int>[V];
    }

    void addEdge(int v, int w) {
        adj[v].push_back(w);
        adj[w].push_back(v); // The graph is undirected
    }

    bool isConnected(int v, int w) {
        // Mark all the vertices as not visited
        bool *visited = new bool[V];
        for (int i = 0; i < V; i++)
            visited[i] = false;

        // Start DFS traversal from v
        DFS(v, visited);

        // If w is visited during the DFS, v and w are connected
        bool connection = visited[w];
        delete[] visited;
        return connection;
    }

    void connectedComponents() {
        // Mark all the vertices as not visited
        bool *visited = new bool[V];
        for (int v = 0; v < V; v++)
            visited[v] = false;

        for (int v = 0; v < V; v++) {
            if (!visited[v]) {
                // Print all reachable vertices from v
                DFSWithPrint(v, visited);
                std::cout << "\n";
            }
        }
        delete[] visited;
    }
};
```

```Python
class Graph:

    def __init__(self, vertices):
        self.V = vertices
        self.adj = [[] for _ in range(vertices)]

    def addEdge(self, v, w):
        self.adj[v].append(w)
        self.adj[w].append(v)

    def DFS(self, temp, v, visited):
        visited[v] = True
        temp.append(v)
        for i in self.adj[v]:
            if not visited[i]:
                temp = self.DFS(temp, i, visited)
        return temp

    def connectedComponents(self):
        visited = [False] * self.V
        cc = []
        for v in range(self.V):
            if not visited[v]:
                temp = []
                cc.append(self.DFS(temp, v, visited))
        return cc

    def areConnected(self, v, w):
        cc = self.connectedComponents()
        for component in cc:
            if v in component and w in component:
                return True
        return False
```

## 15 Directed Graphs

### 15.1 Introduction to Directed Graphs

<p>Directed graph: Set of vertices connected pairwise by <format color
= "red">directed edges</format>.</p>

<img src="../images_data/15-1-1.png" alt="Directed graph" width="450"/>

### 15.2 Directed Graph API

```Java
import java.util.*;

public class DirectedGraph {
    private int vertices; // Number of vertices
    private final LinkedList<Integer>[] adj; // Array of lists for adjacency list representation

    // Constructor
    DirectedGraph(int v) {
        vertices = v;
        adj = new LinkedList[v];
        for (int i = 0; i < v; i++)
            adj[i] = new LinkedList();
    }

    // Function to add an edge into the graph
    void addEdge(int v, int w) {
        adj[v].add(w); // Add w to v's list.
    }
}
```

```C++
#include <iostream>
#include <list>
#include <map>

class Graph {
private:
    std::map<int, std::list<int>> adjList;

public:
    void addEdge(int v, int w) {
        adjList[v].push_back(w); // Add w to v’s list.
    }

    void printGraph() {
        for(const auto& i: adjList) {
            std::cout << i.first << " -> ";
            for(auto j: i.second)
                std::cout << j << " ";
            std::cout << std::endl;
        }
    }
};
```

```Python
class DirectedGraph:
    def __init__(self):
        self.graph = {}

    def add_vertex(self, vertex):
        if vertex not in self.graph:
            self.graph[vertex] = []

    def add_edge(self, from_vertex, to_vertex):
        if from_vertex in self.graph:
            self.graph[from_vertex].append(to_vertex)
        else:
            self.graph[from_vertex] = [to_vertex]

    def display(self):
        for vertex, edges in self.graph.items():
            print(vertex, '->', ' '.join([str(edge) for edge in edges]))
```

### 15.3 Directed Graph Search

<note>
<list type = "bullet">
<li>
<p>This is the implementation of depth-first search in directed graph.</p>
</li>
<li>
<p>Only difference from undirected graph is the change in addEdge function.</p>
</li>
</list>
</note>

```Java
import java.util.*;

public class Graph {
    private final int V;   // No. of vertices
    private final LinkedList<Integer>[] adj; //Adjacency List

    //Constructor
    Graph(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i=0; i<v; ++i)
            adj[i] = new LinkedList();
    }

    //Function to add an edge into the graph
    void addEdge(int v,int w) {
        adj[v].add(w);
    }

    // A function used by isReachable
    void DFSUtil(int v, Boolean[] visited) {
        // Mark the current node as visited
        visited[v] = true;

        int n;

        // Recur for all the vertices adjacent to this vertex
        for (Integer integer : adj[v]) {
            n = integer;
            if (!visited[n])
                DFSUtil(n, visited);
        }
    }

    // Method to check if a destination node is reachable from a source node
    boolean isReachable(int s, int d) {
        Boolean[] visited = new Boolean[V];
        Arrays.fill(visited, false);

        // Call the recursive helper function to print DFS traversal
        DFSUtil(s, visited);

        // If the destination node is reached
        return visited[d];
    }
}
```

```C++
#include <vector>
#include <list>
#include <iostream>
#include <stack>

class Graph {
public:
    Graph(int V) : V(V), adj(V) {}

    void addEdge(int v, int w) {
        adj[v].push_back(w);
    }

    const std::list<int>& getAdj(int v) const {
        return adj[v];
    }

    int getV() const {
        return V;
    }

private:
    int V;
    std::vector<std::list<int>> adj;
};

class DFS {
public:
    DFS(const Graph& G, int s) : marked(G.getV(), false), edgeTo(G.getV()), s(s) {
        dfs(G, s);
    }

    bool hasPathTo(int v) const {
        return marked[v];
    }

    void pathTo(int v) const {
        if (!hasPathTo(v)) {
            std::cout << "No path from " << s << " to " << v << std::endl;
            return;
        }

        std::stack<int> path;
        for (int x = v; x != s; x = edgeTo[x]) {
            path.push(x);
        }
        path.push(s);

        while (!path.empty()) {
            std::cout << path.top() << " ";
            path.pop();
        }
        std::cout << std::endl;
    }

private:
    void dfs(const Graph& G, int v) {
        marked[v] = true;
        for (int w : G.getAdj(v)) {
            if (!marked[w]) {
                edgeTo[w] = v;
                dfs(G, w);
            }
        }
    }

    std::vector<bool> marked;
    std::vector<int> edgeTo;
    int s;
};
```

> This is the implementation of the breadth-first search in directed
> graphs.
>
{style = "note"}

```Java
import java.util.*;

public class BreadthFirstPaths {
    private static final int INFINITY = Integer.MAX_VALUE;
    private final boolean[] marked;
    private final int[] edgeTo;
    private final int[] distTo;

    public BreadthFirstPaths(Graph G, int s) {
        marked = new boolean[G.V()];
        distTo = new int[G.V()];
        edgeTo = new int[G.V()];
        bfs(G, s);
    }

    private void bfs(Graph G, int s) {
        Queue<Integer> q = new LinkedList<>();
        for (int v = 0; v < G.V(); v++)
            distTo[v] = INFINITY;
        distTo[s] = 0;
        marked[s] = true;
        q.add(s);

        while (!q.isEmpty()) {
            int v = q.poll();
            for (int w : G.adj(v)) {
                if (!marked[w]) {
                    edgeTo[w] = v;
                    distTo[w] = distTo[v] + 1;
                    marked[w] = true;
                    q.add(w);
                }
            }
        }
    }

    public boolean hasPathTo(int v) {
        return marked[v];
    }

    public int distTo(int v) {
        return distTo[v];
    }

    public Iterable<Integer> pathTo(int v) {
        if (!hasPathTo(v)) return null;
        Stack<Integer> path = new Stack<>();
        int x;
        for (x = v; distTo[x] != 0; x = edgeTo[x])
            path.push(x);
        path.push(x);
        return path;
    }
}
```

### 15.4 Topological Sort

DAG: Directed Acyclic Graph

Topological sort: Redraw DAG so all edges point upwards.

Java

```Java
import java.util.*;

class Graph {
    private final int V;   // No. of vertices
    private final LinkedList<Integer>[] adj; // Adjacency List

    //Constructor
    Graph(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i=0; i<v; ++i)
            adj[i] = new LinkedList();
    }

    // Function to add an edge into the graph
    void addEdge(int v,int w) { adj[v].add(w); }

    // A recursive function used by topologicalSort
    void topologicalSortUtil(int v, boolean visited[], Stack stack) {
        // Mark the current node as visited.
        visited[v] = true;
        Integer i;

        // Recur for all the vertices adjacent to this vertex
        for (Integer integer : adj[v]) {
            i = integer;
            if (!visited[i])
                topologicalSortUtil(i, visited, stack);
        }

        // Push current vertex to stack which stores result
        stack.push(new Integer(v));
    }

    // The function to do Topological Sort. It uses recursive topologicalSortUtil()
    void topologicalSort() {
        Stack stack = new Stack();

        // Mark all the vertices as not visited
        boolean visited[] = new boolean[V];
        for (int i = 0; i < V; i++)
            visited[i] = false;

        // Call the recursive helper function to store Topological Sort starting from all vertices one by one
        for (int i = 0; i < V; i++)
            if (visited[i] == false)
                topologicalSortUtil(i, visited, stack);

        // Print contents of stack
        while (stack.empty()==false)
            System.out.print(stack.pop() + " ");
    }
}
```

C++

```C++
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    int vectices_number, edges_number;
    cin >> vectices_number >> edges_number;

    vector<vector<int>> edges(vectices_number);
    vector<int> indegree(vectices_number, 0), topo_order;

    for (int i = 0; i < edges_number; ++i) {
        int a, b;
        cin >> a >> b;
        edges[a].push_back(b);
        ++indegree[b];
    }

    queue<int> q;
    for (int i = 0; i < vectices_number; ++i) {
        if (indegree[i] == 0) {
            q.push(i);
        }
    }

    while (!q.empty()) {
        int node = q.front();
        q.pop(); // remove the node from the queue
        topo_order.push_back(node);

        for (int next : edges[node]) {
            if (--indegree[next] == 0) {
                q.push(next);
            }
        }
    }

    for (int i : topo_order) {
        cout << i << " ";
    }
    cout << endl;

    return 0;
}
```

### 15.5 Strong Components

Def:

* Strongly Connected Components (SCC): Vertices `v` and `w` are
  <format color = "red">strongly connected</format> if there is a 
  directed path from `v` to `w` and a directed path from `w` to `v`.
* A <format color = "red">strong component</format> is a maximal
  subset of strongly-connected vertices.

> `v` is strongly connected to `v`.
>
{style = "note"}

## 16 Minimum Spanning Trees

### 16.1 Introduction to MSTs

* Def: Given an undirected graph G with positive edge weights,
  (connected), a <format color = "red">spanning tree</format> of G
  is both a <format color = "Red">tree</format> (connected and
  acyclic) and <format color = "Red">spanning</format> (includes
  all of the vertices).

<img src="../images_data/16-1-1.png" alt="Alt text" width="450"/>

* Applications: Network design (communication, elctrical, hydraulic,
  computer, road), dithering, cluster analysis, max bottleneck paths,
  models of nature, medical image processing, real-time face
  verification, etc.

* Let <em>G</em> be a connected, edge-weighted graph with <em>V</em>
  vertices and <em>E</em> edges. How many edges are in a minimum
  spanning tree of <em>G</em>?
* Answer: <em>V</em> - 1.

### 16.2 Greedy Algorithm

> Simplifying assumptions:
>
> * Edge weights are distinct.
>
> * Graph is connected.
>
> Consequence: MST exists and is unique.
>
{style = "note"}

* Def: A <format color = "red">cut</format> in a graph is a partition
  of its vertices into two (nonempty) sets.
* Def: A <format color = "red">crossing edge</format> is an edge that
  connects a vertex in one set with a vertex in the other.
* Cut property: Given any cut in a graph, the crossing edge of min
  weight is in the MST.

<img src="../images_data/16-2-1.png" alt="Alt text" width="450"/>

<procedure title="Greedy MST Algorithm" id="greedy_algorithm">
    <step>
        <p>Start with all edges colored gray.</p>
    </step>
    <step>
        <p>Find cut with no black crossing edges; color its 
          min-weight edge black.</p>
    </step>
    <step>
        <p>Repeat until <em>V</em> - 1 edges are colored black.</p>
    </step>
</procedure>

> Remove two simplifying assumptions:
>
> 1. Edge weights are not distinct: Greedy MST algorithm still
     >    correct if equal weights are present. (multiple MSTs)
> 2. Graph is not connected: Compute minimum spanning forest = MST
     >    of each component.
>
{style = "note"}

### 16.3 Edge-weighted Graph API

> This is the implementation of weighted edge.
>
{style = "note"}

Java

```Java
public class Edge implements Comparable<Edge> {
    private final int v;
    private final int w;
    private final double weight;

    public Edge(int v, int w, double weight) {
        this.v = v;
        this.w = w;
        this.weight = weight;
    }

    public double weight() {
        return weight;
    }

    public int either() {
        return v;
    }

    public int other(int vertex) {
        if (vertex == v) return w;
        else if (vertex == w) return v;
        else throw new RuntimeException("Inconsistent edge");
    }

    public int compareTo(Edge that) {
        return Double.compare(this.weight(), that.weight());
    }
    
    
    public String toString() {
        return String.format("%d - %d %.5f", v, w, weight);
    }
}
```

C++

```C++
class Edge {
public:
    int dest;
    int weight;

    Edge(int dest, int weight) : dest(dest), weight(weight) {}
};
```

> This is the implementation of edge-weighted graph.
>
{style = "note"}

Java

```Java
import java.util.ArrayList;
import java.util.List;

public class EdgeWeightedGraph {
    private final int V;
    private final List<List<Edge>> adj;

    public EdgeWeightedGraph(int V) {
        this.V = V;
        adj = new ArrayList<>(V);
        for (int v = 0; v < V; v++) {
            adj.add(new ArrayList<>());
        }
    }

    public void addEdge(Edge e) {
        int v = e.either();
        int w = e.other(v);
        adj.get(v).add(e);
        adj.get(w).add(e);
    }

    public Iterable<Edge> adj(int v) {
        return adj.get(v);
    }

    public int V() {
        return V;
    }
}
```

C++

```C++
#include <vector>
#include <list>

class Graph {
public:
    int V; // No. of vertices
    std::vector<std::list<Edge>> adj; // An array of adjacency lists

    // Constructor
    Graph(int V) : V(V), adj(V) {}

    // Function to add an edge to the graph
    void addEdge(int u, int v, int w) {
        Edge edge(v, w);
        adj[u].push_back(edge); // Add v to u’s list
    }
};
```

Python

```Python
class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = {}

    def add_edge(self, u, v, w):
        if u not in self.graph:
            self.graph[u] = [(v, w)]
        else:
            self.graph[u].append((v, w))

    def print_graph(self):
        for node in self.graph:
            for edge in self.graph[node]:
                print(f"Edge: {node} -> {edge[0]}, Weight: {edge[1]}")
```

### 16.4 Kruskal's Algorithm

Kruskal's algorithm: Consider edges in ascending order, add next
edge to tree <em>T</em> unless doing so would create a cycle.

Java

```Java
import java.util.*;

public class KruskalAlgorithm {
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;

        public int compareTo(Edge compareEdge) {
            return this.weight - compareEdge.weight;
        }
    }

    static class Subset {
        int parent, rank;
    }

    int V, E;
    Edge[] edge;

    KruskalAlgorithm(int v, int e) {
        V = v;
        E = e;
        edge = new Edge[E];
        for (int i = 0; i < e; ++i)
            edge[i] = new Edge();
    }

    int find(Subset[] subsets, int i) {
        if (subsets[i].parent != i)
            subsets[i].parent = find(subsets, subsets[i].parent);

        return subsets[i].parent;
    }

    void Union(Subset[] subsets, int x, int y) {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);

        if (subsets[xroot].rank < subsets[yroot].rank)
            subsets[xroot].parent = yroot;
        else if (subsets[xroot].rank > subsets[yroot].rank)
            subsets[yroot].parent = xroot;
        else {
            subsets[yroot].parent = xroot;
            subsets[xroot].rank++;
        }
    }

    void KruskalMST() {
        Edge[] result = new Edge[V];
        int e = 0;
        int i = 0;
        for (i = 0; i < V; ++i)
            result[i] = new Edge();

        Arrays.sort(edge);

        Subset[] subsets = new Subset[V];
        for (i = 0; i < V; ++i)
            subsets[i] = new Subset();

        for (int v = 0; v < V; ++v) {
            subsets[v].parent = v;
            subsets[v].rank = 0;
        }

        i = 0;

        while (e < V - 1) {
            Edge next_edge = new Edge();
            next_edge = edge[i++];

            int x = find(subsets, next_edge.src);
            int y = find(subsets, next_edge.dest);

            if (x != y) {
                result[e++] = next_edge;
                Union(subsets, x, y);
            }
        }

        System.out.println("Following are the edges in " + "the constructed MST");
        for (i = 0; i < e; ++i)
            System.out.println(result[i].src + " -- " + result[i].dest + " == " + result[i].weight);
    }
}
```

C++

```C++
#include <iostream>
#include <vector>
#include <algorithm>

class Edge {
public:
    int src, dest, weight;

    Edge(int src, int dest, int weight) : src(src), dest(dest), weight(weight) {}
};

class Graph {
public:
    int V, E;
    std::vector<Edge> edges;

    Graph(int V, int E) : V(V), E(E) {
        edges.reserve(E);
    }

    void addEdge(int src, int dest, int weight) {
        Edge edge(src, dest, weight);
        edges.push_back(edge);
    }
};

bool compare(Edge a, Edge b) {
    return a.weight < b.weight;
}

class DisjointSet {
    std::vector<int> parent;
public:
    DisjointSet(int n) {
        parent.resize(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int i) {
        if (parent[i] == i) {
            return i;
        } else {
            return parent[i] = find(parent[i]);
        }
    }

    void union_set(int i, int j) {
        parent[find(i)] = find(j);
    }
};

std::vector<Edge> kruskal(Graph& g) {
    std::vector<Edge> edges = g.edges;

    std::sort(edges.begin(), edges.end(), compare);

    DisjointSet ds(g.V);
    std::vector<Edge> result;
    for (auto& e : edges) {
        if (ds.find(e.dest) != ds.find(e.src)) {
            ds.union_set(e.dest, e.src);
            result.push_back(e);
        }
    }

    return result;
}
```

Python

```Python
class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = []

    def add_edge(self, u, v, w):
        self.graph.append([u, v, w])

    # find set of an element i
    def find(self, parent, i):
        if parent[i] == i:
            return i
        return self.find(parent, parent[i])

    # union of two sets of x and y
    def union(self, parent, rank, x, y):
        xroot = self.find(parent, x)
        yroot = self.find(parent, y)

        # attach smaller rank tree under root of high rank tree
        if rank[xroot] < rank[yroot]:
            parent[xroot] = yroot
        elif rank[xroot] > rank[yroot]:
            parent[yroot] = xroot
        else:
            parent[yroot] = xroot
            rank[xroot] += 1

    def kruskal(self):
        result = []
        i, e = 0, 0

        # sort all edges in non-decreasing order
        self.graph = sorted(self.graph, key=lambda item: item[2])

        parent = []
        rank = []

        for node in range(self.V):
            parent.append(node)
            rank.append(0)

        while e < self.V - 1:
            u, v, w = self.graph[i]
            i += 1
            x = self.find(parent, u)
            y = self.find(parent, v)

            if x != y:
                e += 1
                result.append([u, v, w])
                self.union(parent, rank, x, y)

        return result
```

## 17 Shortest Paths

### 17.1 Shortest Paths APIs

* Given an edge-weighted digraph, find the shortest path from <em>s</em>
  to <em>t</em>.

* Applications: Map routing, Seam carving, robot navigation, etc.

> This the implementation of weighted edge.
>
{style = "note"}

Java

```Java
public class DirectedEdge {
    private final int v;
    private final int w;
    private final double weight;

    public DirectedEdge(int v, int w, double weight) {
        if (v < 0) throw new IllegalArgumentException("Vertex names must be nonnegative integers");
        if (w < 0) throw new IllegalArgumentException("Vertex names must be nonnegative integers");
        if (Double.isNaN(weight)) throw new IllegalArgumentException("Weight is NaN");
        this.v = v;
        this.w = w;
        this.weight = weight;
    }

    public int from() {
        return v;
    }

    public int to() {
        return w;
    }

    public double weight() {
        return weight;
    }

    public String toString() {
        return v + "->" + w + " " + String.format("%5.2f", weight);
    }
}
```

C++

```C++
class DirectedEdge {
private:
    int v, w;
    double weight;

public:
    DirectedEdge(int v, int w, double weight) : v(v), w(w), weight(weight) {}

    double getWeight() const { 
        return weight; 
    }

    int from() const { 
        return v; 
    }

    int to() const { 
        return w; 
    }
};
```

```Python
class Edge:
    def __init__(self, v, w, weight):
        self.v = v
        self.w = w
        self.weight = weight

    def from_vertex(self):
        return self.v

    def to_vertex(self):
        return self.w

    def get_weight(self):
        return self.weight
```

> This is the implementation of edge-weighted digraph.
>
{style = "note"}

Java

```Java
import java.util.*;

public class EdgeWeightedDigraph {
    private final int V;
    private int E;
    private final LinkedList<DirectedEdge>[] adj;

    public EdgeWeightedDigraph(int V) {
        if (V < 0) throw new IllegalArgumentException("Number of vertices in a Digraph must be nonnegative");
        this.V = V;
        this.E = 0;
        adj = (LinkedList<DirectedEdge>[]) new LinkedList[V];
        for (int v = 0; v < V; v++) {
            adj[v] = new LinkedList<DirectedEdge>();
        }
    }

    public int V() {
        return V;
    }

    public int E() {
        return E;
    }

    public void addEdge(DirectedEdge e) {
        int v = e.from();
        adj[v].add(e);
        E++;
    }

    public Iterable<DirectedEdge> adj(int v) {
        return adj[v];
    }

    public Iterable<DirectedEdge> edges() {
        LinkedList<DirectedEdge> list = new LinkedList<DirectedEdge>();
        for (int v = 0; v < V; v++) {
            for (DirectedEdge e : adj(v)) {
                list.add(e);
            }
        }
        return list;
    }
}
```

C++

```C++
#include <vector>
#include <list>

class DirectedEdge {
private:
    int v, w;
    double weight;

public:
    DirectedEdge(int v, int w, double weight) : v(v), w(w), weight(weight) {}

    double getWeight() const {
        return weight;
    }

    int from() const {
        return v;
    }

    int to() const {
        return w;
    }
};

class EdgeWeightedDigraph {
private:
    int V; // number of vertices
    int E; // number of edges
    std::vector<std::list<DirectedEdge>> adj; // adjacency lists

public:
    EdgeWeightedDigraph(int V) : V(V), E(0), adj(V) {}

    int getV() const { return V; }

    int getE() const { return E; }

    void addEdge(DirectedEdge e) {
        int v = e.from();
        adj[v].push_back(e);
        E++;
    }

    const std::list<DirectedEdge> &getAdj(int v) const { return adj[v]; }
};
```

Python

```Python
class EdgeWeightedDigraph:
    def __init__(self, vertices):
        self.vertices = vertices
        self.edges = 0
        self.adj = [[] for _ in range(vertices)]

    def add_edge(self, edge):
        v = edge.from_vertex()
        self.adj[v].append(edge)
        self.edges += 1

    def adjacent_edges(self, v):
        return self.adj[v]

    def total_vertices(self):
        return self.vertices

    def total_edges(self):
        return self.edges
```

## 18 Substring Search

### 18.1 Introduction

<list>
<li>
<p><format color = "DodgerBlue">Goal</format>: Find pattern of length 
<math>M</math> in text of length <math>N</math> (typically 
<math>N</math> &gt;&gt; <math>M</math>).</p>
</li>
<li>
<p><format color = "DodgerBlue">Applications</format>: Find & replace,
computer forensics, identify patterns indicative of spam, 
electronic surveillance, screen scraping, etc.</p>
</li>
</list>

### 18.2 Brute-Force Substring Search

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

### 18.3 Knuth-Morris-Pratt

#### 18.3.1 Proposition

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

#### 18.3.2 DFA

Deterministic Finite State Automaton (DFA) is an abstract
string-search machine.

* Finite number of states (including start and halt).
* Exactly one transition for each char in alphabet.
* Accept if sequence of transitions lead to halt state.

<img src="../images_data/18-3-1.png" alt="Alt text" width="450"/>

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

#### 18.3.3 NFA

Example: A B A B A C

lps: 0 0 1 2 3 0

Explanantion for k = lps&#91;k - 1&#93; in computePrefix:

* When k reaches 3, q = 5, the position now is <em>C</em>.
  The current prefix (also the suffix, without considering <em>C</em>)
  is "ABA".

  <format color = "Red">ABA</format> BA

  AB<format color = "Red">ABA</format>

* Since <em>C</em> is a mismatch for pattern&#91;3&#93; = <em>B</em>,
  we need to first find the longest prefix in "ABA" that is also
  a suffix.

  <format color = "Red">ABA</format><format color = "Aqua">B</format> AC

  AB<format color = "Red">ABA</format><format color = "Aqua">C</format>

* The longest prefix and suffix in <em>ABA</em> is <em>A</em>,
  which is given by lps&#91;q - 1&#93; = lps&#91;2&#93; = 1.

* At this time, we need to try again if <em>C</em> is a match for
  the character behind the pattern&#91;1&#93; = <em>B</em>,
  which is not.

  <format color = "Red">A</format><format color = "Aqua">B</format> ABAC

  ABAB<format color = "Red">A</format><format color = "Aqua">C</format>

* The longest prefix and suffix in "A" is "", k = 0, lps&#91;5&#93; = 0.

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
<img src="../images_data/19-2-1.png" alt="Alt text" width="450" style = "inline"/></li>
<li>
<p>It is the number of structurally unique BSTs (binary search
trees) which has exactly <math>n</math> nodes of unique values
from 1 to <math>n</math>.</p>
<p>For <math>n = 3</math>, for example:</p>
<img src="../images_data/19-2-2.jpg" alt="Alt text" width="450" style = "inline"/></li>
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