<show-structure for="chapter" depth="3"></show-structure>

# Data Structures and Algorithms 2

## 11 Geometric Applications of BSTs

<p><format color = "BlueViolet">Topic</format>: Intersections among 
<format color = "OrangeRed">geometric objects</format>.</p>

<p><format color = "BlueViolet">Applications</format>: CAD, games, 
movies, virtual reality, databases...</p>

### 11.1 1d Range Search

<list type = "bullet">
<li>
<p><format color = "DarkOrange">Range search</format>: find all key between
<math>k_{1}</math> and <math>k_{2}</math>.</p>
</li>
<li>
<p><format color = "DarkOrange">Range count</format>: # of keys between
<math>k_{1}</math> and <math>k_{2}</math>.</p>
</li>
<li>Geometric interpretation: Keys are point on a 
<format color = "OrangeRed">line</format>; find/count points in a given 
<format color = "OrangeRed">1d interval</format>.</li>
</list>

<procedure title = "1d range count">
<step>
<p>Recursively find all keys in left subtree (if any could fall 
in range).</p>
</step>
<step>
<p>Check key in current node.</p>
</step>
<step>
<p>Recursively find all keys in right subtree (if any could fall 
in range).</p>
</step>
</procedure>

<p><format color = "BlueViolet">Property</format>: Running
time proportinal to <math>R + \ log N</math></p>

### 11.2 Line Segment Intersection

<p><format color = "IndianRed">Goal</format>: Given <math>N</math> 
horizontal and vertical line segments, find all intersections 
(all <math>x</math>- and <math>y</math>-coordinates are distinct.</p>

<procedure title = "Sweep-Line Algorithm => Sweep Vertical Lines 
from Left to Right">
<step>
<p><math>x</math>-coordinates define events.</p>
</step>
<step>
<p><math>h</math>-segments (left endpoint): insert <math>y</math>- 
coordiantes into BST.</p>
</step>
<step>
<p><math>h</math>-segments (right endpoint): remove <math>y</math>- 
coordiantes from BST.</p>
</step>
<step>
<p><math>v</math>- segment: range search for interval of 
<math>y</math>-endpoints.</p>
</step>
</procedure>

<img src = "../images_data/11-2-1.png" alt = "Line Segment 
Intersection"/>

<p><format color = "LawnGreen">Properties</format>: The sweep-line 
algorithm takes time proportional to <math>N \log N + R</math> to 
find all <math>R</math> intersections among <math>N</math> 
orthogonal line segments.</p>

<p>Proof: </p>
<list type = "bullet">
<li>
<p>Put <math>x</math>-coordinates on a PQ (or sort). => 
<math>N \log N</math></p>
</li>
<li>
<p>Insert <math>y</math>-coordinates into BST. => 
<math>N \log N</math></p>
</li>
<li>
<p>Delete <math>y</math>-coordinates from BST. => 
<math>N \log N</math></p>
</li>
<li>
<p>Range searches in BST. => <math>N \log N + R</math></p>
</li>
</list>

### 11.3 Kd-Trees

<p><format color = "MediumVioletRed">Goal</format>: 2d orthogonal range search.</p>

<p><format color = "MediumVioletRed">Geometric interpretation</format>: 
Keys are point in the <format color = "OrangeRed">plane</format>;
find/count points in a given <format color = "OrangeRed">
<math>h-v</math> rectangle</format>.</p>

#### 11.3.1 Grid Implementation

<procedure title = "Grid Implementation">
<step>
<p>Divide space into <math>M</math> -by- <math>M</math> grid of 
squares.</p>
</step>
<step>
<p>Create list of points contained in each square.</p>
</step>
<step>
<p>Use 2d array to directly index relevant square.</p>
</step>
<step>
<p>Insert: add <math>(x, y)</math> to list for corresponding square.</p>
</step>
<step>
<p>Range search: examine only squares that intersect 2d range 
query.</p>
</step>
</procedure>

<p><format color = "BlueViolet">Properties: </format></p>

<list type = "bullet">
<li>
<p>Space: <math>M ^ {2} + N</math></p>
</li>
<li>
<p>Time: <math>1 + \frac {N}{M ^ {2}}</math> per square examined,
on average.</p>
</li>
</list>

<p><format color = "BlueViolet">Problems: </format></p>
<list type = "bullet">
<li>
<p><format color = "OrangeRed">Clustering</format>: a well-known 
phenomenon in geometric data.</p>
</li>
<li>
<p>Lists are too long, even though average length is short.</p>
</li>
<li>
<p>Need data structure that adapts gracefully to data.</p>
</li>
</list>

#### 11.3.2 Space-Partitioning Trees

<p><format color = "DarkOrange">Space-Partitioning Trees:</format> Use 
a tree to represent a recursive subdivision of a 2d space.</p>

<p><format color = "DarkOrange">2d Trees:</format> Recursively divide
space into two halfplanes.</p>

<p><format color = "BlueViolet">Applications:</format> Ray tracing,
2d range search, Flight simulators, N-body simulation, Nearest
neighbor search, Accelerate rendering in Doom, etc.</p>

##### Part &#8544; 2d Trees

<p><format color = "BlueViolet">Data Structure:</format> BST, but 
alternate using <math>x</math>- and <math>y</math>- coordinates as 
key.</p>

<list type = "bullet">
<li>
<p>Search gives rectangle containing point.</p>
</li>
<li>
<p>Insert further subdivides the plane.</p>
</li>
</list>

<img src = "../images_data/11-2-2.png" alt = "2d tree implementation"/>

<procedure title = "Range Search - Find all points in a query 
axis-aligned rectangle">
<step>
<p>Check if point in node lies in given rectangle.</p>
</step>
<step>
<p>Recursively search left/bottom (if any could fall in rectangle).</p>
</step>
<step>
<p>Recursively search right/top (if any could fall in rectangle).</p>
</step>
</procedure>

<p><format color = "BlueViolet">Properties: </format></p>

<list type = "bullet">
<li>
<p>Typical case: <math>R + \log N</math></p>
</li>
<li>
<p>Worst case (assuming tree is balanced): <math>R + \sqrt{N}</math></p>
</li>
</list>

<procedure title = "Nearest Neighbor Search - Find closest point to 
query point">
<step>
<p>Check distance from point in node to query point.</p>
</step>
<step>
<p>Recursively search left/bottom (if it could contain a closer 
point).</p>
</step>
<step>
<p>Recursively search right/top (if it could contain a closer 
point).</p>
</step>
<step>
<p>Organize method so that it begins by searching for query point.</p>
</step>
</procedure>

<p><format color = "BlueViolet">Properties: </format></p>

<list type = "bullet">
<li>
<p>Typical case: <math>\log N</math></p>
</li>
<li>
<p>Worst case (even if tree is balanced): <math>N</math></p>
</li>
</list>

##### Part &#8545; Kd Trees

<p><format color = "DarkOrange">Kd Tree:</format> Recursively 
partition <math>k</math>-dimensional space into 2 halfspaces.</p>

<p><format color = "BlueViolet">Implementation:</format> BST, but
cycle through dimensions ala 2d trees.</p>

##### Part &#8546; N-body Simulation

<format color = "BlueViolet">Goal:</format> Simulate the motion 
of <math>N</math> particles, mutually affected by gravity.

<procedure title = "Appel's Algorithm for N-body Simulation">
<step>
<p>Build 3d-tree with <math>N</math> particles as nodes.</p>
</step>
<step>
<p>Store center-of-mass of subtree in each node.</p>
</step>
<step>
<p>To compute total force acting on a particle, traverse tree, but 
stop as soon as distance from particle to subdivision is sufficiently
large.</p>
</step>
</procedure>

<p><format color = "BlueViolet">Properties:</format> Running time
per step is <math>N \log N</math>.</p>

### 11.4 Interval Search Tree

<p>Create BST, where each node stores an interval <math>(lo, hi)
</math>.</p>

<list type = "bullet">
<li>
<p>Use left endpoint as BST <format color = "OrangeRed">key</format>
.</p>
</li>
<li>
<p>Store <format color = "BlueViolet">max endpoint</format> in 
subtree rooted at node.</p>
</li>
</list>

<procedure title = "Insertion for Interval Search Tree">
<step>
<p>Insert into BST, using <math>lo</math> as the key.</p>
</step>
<step>
<p>Update max in each node on search path.</p>
</step>
</procedure>

<procedure title = "Interval Search for Interval Search Tree" 
type = "choices">
<step>
<p>If interval in node intersects query interval, return it.</p>
</step>
<step>
<p>Else if left subtree is null, go right.</p>
</step>
<step>
<p>Else if max endpoint in left subtree is less than lo, go right.</p>
</step>
<step>
<p>Else go left.</p>
</step>
</procedure>

<p>Order of growth of running time for <math>N</math> intervals.</p>

<table style = "header-row">
<tr><td>operation</td><td>brute</td><td>interval search tree</td>
<td>best in theory</td></tr>
<tr><td>insert interval</td><td><math>1</math></td><td><math>\log N
</math></td><td><math>\log N</math></td></tr>
<tr><td>find interval</td><td><math>N</math></td><td><math>\log N
</math></td><td><math>\log N</math></td></tr>
<tr><td>delete interval</td><td><math>N</math></td><td><math>\log N
</math></td><td><math>\log N</math></td></tr>
<tr><td>find <format color = "OrangeRed">any one</format> interval
that intersects <math>(lo, hi)</math></td><td><math>N</math></td>
<td><math>\log N</math></td><td><math>\log N</math></td></tr>
<tr><td>find <format color = "OrangeRed">all</format> interval
that intersects <math>(lo, hi)</math></td><td><math>N</math></td>
<td><math>R \log N</math></td><td><math>R + \log N</math></td></tr>
</table>

### 11.5 Rectangle Intersection

<p><format color = "BlueViolet">Sweep-line Algorithm</format>: </p>

<list type = "bullet">
<li>
<p><math>x</math>-coordinates of left and right endpoints define 
events.</p>
</li>
<li>
<p>Maintain set of rectangles that intersect the sweep line in an 
interval search tree (using <math>y</math>-intervals of rectangle).</p>
</li>
<li>
<p>Left endpoint: interval search for <math>y</math>-interval of 
rectangle; insert <math>y</math>-interval.</p>
</li>
<li>
<p>Right endpoint: remove <math>y</math>-interval.</p>
</li>
</list>

<p><format color = "BlueViolet">Property:</format> Sweep line 
algorithm takes time proportional to <math>N \log N + R \log N</math> 
to find <math>R</math> intersections among a set of <math>N</math> 
rectangles.</p>

<p>Proof: </p>
<list type = "bullet">
<li>
<p>Put <math>x</math>-coordinates on a PQ (or sort) => 
<math>N \log N</math></p>
</li>
<li>
<p>Insert <math>y</math>-intervals into ST => <math>N \log N</math>
</p>
</li>
<li>
<p>Delete <math>y</math>-intervals from ST => <math>N \log N</math>
</p>
</li>
<li>
<p>Interval searches for y-intervals => <math>N \log N + R \log N
</math></p>
</li>
</list>

## 12 Hash Tables

<table style = "none">
<tr><td rowspan = "2">implementation</td><td colspan="3">worst-case 
cost (after <math>N</math> inserts)</td><td colspan = "3">
average case (after <math>N</math> random inserts)</td>
<td rowspan = "2">ordered iteration?</td><td rowspan = "2">
key interface</td></tr>
<tr><td>search</td><td>insert</td><td>delete</td><td>search hit</td>
<td>insert</td><td>delete</td></tr>
<tr><td>sequential search (unordered list)</td><td><math>N</math></td>
<td><math>N</math></td><td><math>N</math></td><td><math>
\frac {N}{2}</math></td><td><math>N</math></td><td><math>N</math>
</td><td>no</td><td><code>equals()</code></td></tr>
<tr><td>binary search (ordered list)</td><td><math>\lg N</math></td>
<td><math>N</math></td><td><math>N</math></td><td><math>
\lg N</math></td><td><math>\frac {N}{2}</math></td>
<td><math>\frac {N}{2}</math></td><td>yes</td>
<td><code>compareTo()</code></td></tr>
<tr><td>BST</td><td><math>N</math></td><td><math>N</math></td>
<td><math>N</math></td><td><math>1.39 \log N</math></td>
<td><math>1.39 \log N</math></td><td>?</td><td>yes</td>
<td><code>compareTo()</code></td></tr>
<tr><td>2-3 tree</td><td><math>c \log N</math></td>
<td><math>c \log N</math></td><td><math>c \log N</math></td>
<td><math>c \log N</math></td><td><math>c \log N</math></td>
<td><math>c \log N</math></td><td>yes</td><td><code>compareTo()</code></td></tr>
<tr><td>red-black BST</td><td><math>2 \log N</math></td>
<td><math>2 \log N</math></td><td><math>2 \log N</math></td>
<td><math>1.00 \lg N</math></td><td><math>1.00 \lg N</math></td>
<td><math>1.00 \lg N</math></td><td>yes</td><td><code>compareTo()
</code></td></tr>
<tr><td>separate chaining</td><td><math>\log N</math></td>
<td><math>\log N</math></td><td><math>\log N</math></td>
<td><math>3-5</math></td><td><math>3-5</math></td>
<td><math>3-5</math></td><td>no</td><td><code>equals
</code><code>hashCode()</code></td></tr>
<tr><td>linear probing</td><td><math>\log N</math></td>
<td><math>\log N</math></td><td><math>\log N</math></td>
<td><math>3-5</math></td><td><math>3-5</math></td>
<td><math>3-5</math></td><td>no</td><td><code>equals
</code><code>hashCode()</code></td></tr>
</table>

### 12.1 Hash Tables

<list type = "decimal">
<li>
<p><format color = "BlueViolet">Hashing</format>: Save items in a key-indexed 
table (index is a function of the key).</p>
</li>
<li>
<p><format color = "BlueViolet">Hash function</format>: Method for 
computing array index from key.</p>
<p>Issues:</p>
<list type = "alpha-lower">
<li>
<p><format color = "BlueViolet">Equality test</format>: Method 
for checking whether two keys are equal.</p>
</li>
<li>
<p><format color = "BlueViolet">Collision resolution</format>: 
Algorithm and data structure to handle two keys that hash to the 
same array index.</p>
</li>
</list>
</li>
<li>
<p><format color = "BlueViolet">Hash code</format>: An int between 
<math>-2^31</math> and <math>2^31-1</math>.</p>
</li>
<li>
<p><format color = "BlueViolet">Hash function</format>: An int 
between 0 and M-1 (for use of array index).</p>
</li>
</list>

<note>
<p>This is Horner's method to hash strings.</p>
</note>

```Java
public final class StringTest {
    private final char[] s = "Hello, World!".toCharArray();
    
    public int hash() {
        int hash = 0;
        for (int i = 0; i < s.length; i++) {
            hash = (31 * hash) + s[i];
        }
        return hash;
    }
}
```

### 12.2 Collision Solution &#8544; - Separate Chaining & Variant

#### 12.2.1 Separate Chaining

<list type = "alpha-lower">
<li>
<p><format color = "Fuchsia">Hash:</format> map key to integer
<math>i</math> between <math>0</math> and <math>M - 1</math>.</p>
</li>
<li>
<p><format color = "Fuchsia">Insert:</format> put at front of
<math>i ^ {th}</math> chain (if not already there).</p>
</li>
<li>
<p><format color = "Fuchsia">Search:</format> need to search 
only <math>i ^ {th}</math> chain.</p>
</li>
</list>

<img src = "../images_data/12-2-1.png" alt = "Separate Chaining"/>

<list>
<li>
<p>Number of probes for search/insert/delete is proportional to 
<math>\frac {N}{M}</math>.
</p>
</li>
<li>
<p>Typical choice: <math>M \sim \frac {N}{5}</math> (constant 
operations)</p>
</li>
</list>

Java

```Java
public class SeparateChainingHashST {
    private final int M = 97; // number of chains
    private final Node[] st = new Node[M]; // array of chains

    private static class Node {
        private final Object key;
        private Object val;
        private final Node next;

        public Node(Object key, Object val, Node node) {
            this.key = key;
            this.val = val;
            this.next = node;
        }
    }

    private int hash(Object key) {
        return (key.hashCode() & 0x7fffffff) % M;  // no bug
    }

    public Object get(Object key) {
        int i = hash(key);
        for (Node x = st[i]; x != null; x = x.next)
            if (key.equals(x.key)) return x.val;
        return null;
    }

    public void put(Object key, Object val) {
        int i = hash(key);
        for (Node x = st[i]; x != null; x = x.next)
            if (key.equals(x.key)) { x.val = val; return; }
        st[i] = new Node(key, val, st[i]);
    }
}
```

C++

```C++
#include <list>
#include <vector>
#include <optional>

template<typename Key, typename Value>
class HashTable {
public:
    explicit HashTable(size_t size) : table(size) {}

    void insert(Key key, Value value) {
        size_t hashValue = hashFunction(key);
        auto& chain = table[hashValue];
        for (auto& pair : chain) {
            if (pair.first == key) {
                pair.second = value;
                return;
            }
        }
        chain.emplace_back(key, value);
    }

    std::optional<Value> get(Key key) {
        size_t hashValue = hashFunction(key);
        auto& chain = table[hashValue];
        for (auto& pair : chain) {
            if (pair.first == key) {
                return pair.second;
            }
        }
        return {};
    }

    void remove(Key key) {
        size_t hashValue = hashFunction(key);
        auto& chain = table[hashValue];
        chain.remove_if([key](auto pair) { return pair.first == key; });
    }

private:
    std::vector<std::list<std::pair<Key, Value>>> table;

    size_t hashFunction(Key key) {
        return key % table.size();
    }
};
```

#### 12.2.2 Variant - Two-Probe Hashing

<list type = "bullet">
<li>
<p>Hash to two positions, insert key in shorter of the two chains.</p>
</li>
<li>
<p>Reduces expected length of the longest chain to <math>\log \log N
</math>.</p>
</li>
</list>

### 12.3 Collision Solution &#8545; - Open Addressing

#### 12.3.1 Linear Probing

<p><format color = "DarkOrange">Open addressing:</format> When a new
key collides, find next empty slot, and put it there.</p>

<list type = "alpha-lower">
<li>
<p><format color = "Fuchsia">Hash:</format> Map key to integer 
<math>i</math> between <math>0</math> and <math>M - 1</math>.</p>
</li>
<li>
<p><format color = "Fuchsia">Search:</format> Search table 
index <math>i</math>; if occupied but no match, try <math>i+1</math>,
<math>i+2</math>, etc..</p>
</li>
<li>
<p><format color = "Fuchsia">Insert:</format> Put at table
index <math>i</math> if free; if not try <math>i+1</math>, <math>i+2
</math>, etc.</p>
</li>
</list>

<p>Under uniform hashing assumption, the average numbers of probes in
a linear probing hash table of size M that contains <math>N = \alpha M
</math> keys is:</p>

<list type = "bullet">
<li>
<p><format color = "Fuchsia">Search hit:</format> <math>\sim
\frac{1}{2} \left(1 + \frac{1}{1 - \alpha}\right)</math></p>
</li>
<li>
<p><format color = "Fuchsia">Search miss / insert:</format> 
<math>\sim \frac{1}{2} \left(1 + \frac{1}{(1 - \alpha)^2}\right)
</math></p>
</li>
</list>

Java

```Java
public class LinearProbingHashST<Key, Value> {
    private final int M = 30001;
    private final Key[] keys = (Key[]) new Object[M];
    private final Value[] vals = (Value[]) new Object[M];

    /* Map key to integer i between 0 and M - 1. */
    private int hash(Key key) {
        return (key.hashCode() & 0x7fffffff) % M;
    }

    /* Put at table index i if free; if not try i+1, i+2, etc. */
    public void put(Key key, Value val) {
        int i;
        for (i = hash(key); keys[i] != null; i = (i + 1) % M) {
            if (keys[i].equals(key)) {
                vals[i] = val;
                return;
            }
        }
        keys[i] = key;
        vals[i] = val;
    }

    /* Search table index i; if occupied but not match, try i+1, i+2, etc. */
    public Value get(Key key) {
        for (int i = hash(key); keys[i] != null; i = (i + 1) % M)
            if (keys[i].equals(key))
                return vals[i];
        return null;
    }
}
```

Java (Princeton)

```Java
public class LinearProbingHashST<Key, Value> {

    // must be a power of 2
    private static final int INIT_CAPACITY = 4;

    private int n;           // number of key-value pairs in the symbol table
    private int m;           // size of linear probing table
    private Key[] keys;      // the keys
    private Value[] vals;    // the values


    public LinearProbingHashST() {
        this(INIT_CAPACITY);
    }

    public LinearProbingHashST(int capacity) {
        m = capacity;
        n = 0;
        keys = (Key[]) new Object[m];
        vals = (Value[]) new Object[m];
    }

    public int size() {
        return n;
    }

    public boolean isEmpty() {
        return size() == 0;
    }

    public boolean contains(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to contains() is null");
        return get(key) != null;
    }

    // hash function for keys - returns value between 0 and m-1
    private int hashTextbook(Key key) {
        return (key.hashCode() & 0x7fffffff) % m;
    }

    // hash function for keys - returns value between 0 and m-1 (assumes m is a power of 2)
    // (from Java 7 implementation, protects against poor quality hashCode() implementations)
    private int hash(Key key) {
        int h = key.hashCode();
        h ^= (h >>> 20) ^ (h >>> 12) ^ (h >>> 7) ^ (h >>> 4);
        return h & (m - 1);
    }

    // resizes the hash table to the given capacity by re-hashing all of the keys
    private void resize(int capacity) {
        LinearProbingHashST<Key, Value> temp = new LinearProbingHashST<Key, Value>(capacity);
        for (int i = 0; i < m; i++) {
            if (keys[i] != null) {
                temp.put(keys[i], vals[i]);
            }
        }
        keys = temp.keys;
        vals = temp.vals;
        m = temp.m;
    }

    /**
     * Inserts the specified key-value pair into the symbol table, overwriting the old
     * value with the new value if the symbol table already contains the specified key.
     * Deletes the specified key (and its associated value) from this symbol table
     * if the specified value is {@code null}.
     */
    public void put(Key key, Value val) {
        if (key == null) throw new IllegalArgumentException("first argument to put() is null");

        if (val == null) {
            delete(key);
            return;
        }

        // double table size if 50% full
        if (n >= m / 2) resize(2 * m);

        int i;
        for (i = hash(key); keys[i] != null; i = (i + 1) % m) {
            if (keys[i].equals(key)) {
                vals[i] = val;
                return;
            }
        }
        keys[i] = key;
        vals[i] = val;
        n++;
    }

    // Returns the value associated with the specified key.
    public Value get(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to get() is null");
        for (int i = hash(key); keys[i] != null; i = (i + 1) % m)
            if (keys[i].equals(key))
                return vals[i];
        return null;
    }

    /**
     * Removes the specified key and its associated value from this symbol table
     * (if the key is in this symbol table).
     */
    public void delete(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to delete() is null");
        if (!contains(key)) return;

        // find position i of key
        int i = hash(key);
        while (!key.equals(keys[i])) {
            i = (i + 1) % m;
        }

        // delete key and associated value
        keys[i] = null;
        vals[i] = null;

        // rehash all keys in same cluster
        i = (i + 1) % m;
        while (keys[i] != null) {
            // delete keys[i] and vals[i] and reinsert
            Key keyToRehash = keys[i];
            Value valToRehash = vals[i];
            keys[i] = null;
            vals[i] = null;
            n--;
            put(keyToRehash, valToRehash);
            i = (i + 1) % m;
        }

        n--;

        // halves size of array if it's 12.5% full or less
        if (n > 0 && n <= m / 8) resize(m / 2);

        assert check();
    }

    // integrity check - don't check after each put() because
    // integrity not maintained during a call to delete()
    private boolean check() {

        // check that hash table is at most 50% full
        if (m < 2 * n) {
            System.err.println("Hash table size m = " + m + "; array size n = " + n);
            return false;
        }

        // check that each key in table can be found by get()
        for (int i = 0; i < m; i++) {
            if (keys[i] == null) continue;
            else if (get(keys[i]) != vals[i]) {
                System.err.println("get[" + keys[i] + "] = " + get(keys[i]) + "; vals[i] = " + vals[i]);
                return false;
            }
        }
        return true;
    }
}
```

C++

```C++
#include <vector>
#include <optional>

template<typename Key, typename Value>
struct HashNode {
    Key key;
    Value value;
    bool occupied;

    HashNode() : occupied(false) {}
    HashNode(Key key, Value value) : key(key), value(value), occupied(true) {}
};

template<typename Key, typename Value>
class HashTable {
private:
    std::vector<HashNode<Key, Value>> table;
    int tableSize;

    int hashFunction(Key key) {
        return key % tableSize;
    }

public:
    HashTable(int size) : table(size), tableSize(size) {}

    void insert(Key key, Value value) {
        int index = hashFunction(key);
        while (table[index].occupied) {
            index = (index + 1) % tableSize;
        }
        table[index] = HashNode<Key, Value>(key, value);
    }

    std::optional<Value> get(Key key) {
        int index = hashFunction(key);
        while (table[index].occupied) {
            if (table[index].key == key) {
                return table[index].value;
            }
            index = (index + 1) % tableSize;
        }
        return {};
    }

    void remove(Key key) {
        int index = hashFunction(key);
        while (table[index].occupied) {
            if (table[index].key == key) {
                table[index].occupied = false;
                return;
            }
            index = (index + 1) % tableSize;
        }
    }
};
```

<p><format color = "BlueViolet">Knuth's Parking Problem</format></p>

<p>Cars arrive at a one-way street with <math>M</math> parking spaces. 
Each driver tries to park in their own space <math>i</math>: If space
<math>i</math> is taken, try <math>i + 1</math>, <math>i + 2</math>, 
etc. What is the mean displacement of the car?</p>

<list type = "bullet">
<li>
<p><format color = "Fuchsia">Half-full:</format> With 
<math>\frac {M}{2}</math> cars, mean displacement is <math>
\sim \frac {3}{2}</math>.</p>
</li>
<li>
<p><format color = "Fuchsia">Full:</format> With 
<math>M</math> cars, mean displacement is <math>\sim \sqrt{\frac
{\pi M}{8}}</math>.</p>
</li>
</list>

#### 12.3.2 Varaint 1 - Double Hashing

<list type = "bullet">
<li>
<p>Use linear probing, but skip a variable amount, not just 
1 each time.</p>
</li>
<li>
<p>Effectively eliminates clustering.</p>
</li>
<li>
<p>Can allow table to become nearly full.</p>
</li>
<li>
<p>More difficult to implement delete.</p>
</li>
</list>

<p><format color = "Fuchsia">Insert:</format> Use the <math>
1 ^{st}</math> hash function to calculate index. If there is a 
collision, use <math>2 ^ {nd}</math> hash value for "step size" for
probing until an empty slot is found. (=> <math>(h1(key) + i * h2(key))
\% size</math>) </p>

#### 12.3.3 Variant 2 - Quadratic Probing

<p><format color = "Fuchsia">Insert:</format> Use the hash 
function to calculate index. If there is a collision, probe the 
index using the following probing sequence: </p>

<list type = "bullet">
<li>
<p><format color = "DarkOrange">index 1:</format> 
<math>(h(key) + 1 ^ {2}) % tableSize</math></p>
</li>
<li>
<p><format color = "DarkOrange">index 2:</format> 
<math>(h(key) + 2 ^ {2}) % tableSize</math></p>
</li>
<li>
<p><format color = "DarkOrange">index 3:</format> 
<math>(h(key) + 3 ^ {2}) % tableSize</math></p>
</li>
</list>

#### 12.3.4 Variant 3 - Cuckoo Hashing

<list type = "bullet">
<li>
<p>Hash key to two positions; insert key into either position; if 
occupied, reinsert displaced key into its alternative position (and
recur).</p>
</li>
<li>
<p>Constant worst case time for search.</p>
</li>
</list>

#### 12.3.5 Separate Chaining vs. Linear Probing

<p><format color = "BlueViolet">Separate Chaining</format></p>

<list type = "bullet">
<li>
<p>Easier to implement delete.</p>
</li>
<li>
<p>Performance degrades gracefully.</p>
</li>
<li>
<p>Clustering less sensitive to poorly-designed hash function.</p>
</li>
</list>

<p><format color = "BlueViolet">Linear Probing</format></p>

<list type = "bullet">
<li>
<p>Less wasted space.</p>
</li>
<li>
<p>Better cache performance.</p>
</li>
</list>

### 12.4 Hash Table vs. Balanced Search Tree

<p><format color = "BlueViolet">Hash Table</format></p>

<list type = "bullet">
<li>
<p>Simpler to code.</p>
</li>
<li>
<p>No effective alternative for unordered keys.</p>
</li>
<li>
<p>Faster for simple keys (a few arithmetic ops versus <math>log N
</math> compares).</p>
</li>
<li>
<p>Better system support in Java for strings (e.g., cached hash 
code).</p>
</li>
</list>

<p><format color = "BlueViolet">Balanced Search Tree</format></p>

<list type = "bullet">  
<li>
<p>Stronger performance guarantee.</p>
</li>
<li>
<p>Support for ordered ST operations.</p>
</li>
<li>
<p>Easier to implement <code>compareTo()</code> correctly than 
<code>equals()</code> and <code>hashCode()</code>.</p>
</li>
</list>

<p>Java systems includes both.</p>

<list type = "bullet">
<li>
<p><format color = "DarkOrange">Red-black BSTs:</format> 
<code>java.util.TreeMap</code>, <code>java.util.TreeSet</code>.</p>
</li>
<li>
<p><format color = "DarkOrange">Hash tables:</format> 
<code>java.util.HashMap</code>, <code>java.util.IdentityHashMap</code>
.</p>
</li>
</list>

<p>C++ STL includes both.</p>

<list type = "bullet">
<li>
<p><format color = "DarkOrange">Red-black BSTs:</format> 
<code>std::set</code>, <code>std::map</code>.</p>
</li>
<li>
<p><format color = "DarkOrange">Hash tables:</format> 
<code>std::unordered_map</code>, <code>std::unordered_set</code>
.</p>
</li>
</list>

<warning>
<p>Python uses hash tables to implement dictionaries, but no built
-in red-black BST!</p>
</warning>

## 13 Symbol Table Applications

### 13.1 Sets

<p><format color = "BlueViolet">Mathematical Set</format>: 
A collection of distinct keys.</p>

#### 13.1.1 Sets in Java

<list type = "decimal">

<li>
<p><code>HashSet</code></p>
<list type = "alpha-lower">
<li>
<p><format color = "DarkViolet">Implementation</format>: Uses a hash 
table (specifically, a <code>HashMap</code> internally) for storage.</p>
</li>
<li>
<p><format color = "Lime">Features</format>: </p>
<list type = "bullet">
<li>
<p>Efficient for adding, removing, and checking for the existence of 
elements (average <math>O(1)</math> time complexity).</p>
</li>
<li>
<p>Does not maintain insertion order.</p>
</li>
<li>
<p>Allows a single null element.</p>
</li>
</list>
</li>
</list>
</li>

<li>
<p><code>LinkedHashSet</code></p>
<list type = "alpha-lower">
<li>
<p><format color = "DarkViolet">Implementation</format>: Extends 
<code>HashSet</code> and maintains a doubly linked list to preserve
the order of element insertion.</p>
</li>
<li>
<p><format color = "Lime">Features</format>: </p>
<list type = "bullet">
<li>
<p>Elements are iterated in the order they were added.</p>
</li>
<li>
<p>Slightly slower than <code>HashSet</code> due to the linked list 
overhead.</p>
</li>
</list>
</li>
</list>
</li>

<li>
<p><code>TreeSet</code></p>
<list type = "alpha-lower">
<li>
<p><format color = "DarkViolet">Implementation</format>: Uses a 
red-black tree (a self-balancing binary search tree).</p>
</li>
<li>
<p><format color = "Lime">Features</format>: </p>
<list type = "bullet">
<li>
<p>Elements are stored in sorted order (natural order or using a 
<code>Comparator</code> provided during set creation).</p>
</li>
<li>
<p>Provides efficient retrieval of elements in a sorted range.</p>
</li>
<li>
<p>Slower than <code>HashSet</code> and <code>LinkedHashSet</code> 
for insertion and removal operations (logarithmic time complexity).</p>
</li>
<li>
<p>Does not allow <code>null</code> elements by default.</p>
</li>
</list>
</li>
</list>
</li>
</list>

Java

```Java
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

public class SetExample {
    public static void main(String[] args) {
        // HashSet - No order guarantee
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Apple");
        hashSet.add("Banana");
        hashSet.add("Orange");
        System.out.println("HashSet: " + hashSet); // Output may vary in order

        // LinkedHashSet - Maintains insertion order
        Set<String> linkedHashSet = new LinkedHashSet<>();
        linkedHashSet.add("Apple");
        linkedHashSet.add("Banana");
        linkedHashSet.add("Orange");
        System.out.println("LinkedHashSet: " + linkedHashSet); // Output: [Apple, Banana, Orange]

        // TreeSet - Sorted order
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("Orange");
        treeSet.add("Apple");
        treeSet.add("Banana");
        System.out.println("TreeSet: " + treeSet); // Output: [Apple, Banana, Orange]
    }
}
```

<note>Implementation of <code>TreeSet</code>: Remove "value" from any
ST implementation.</note>

#### 13.1.2 Sets in C++

<list type = "decimal">
<li>
<p><code>std::set</code> | <code>std::multiset</code></p>
<list type = "alpha-lower">
<li>
<p><format color = "DarkViolet">Implementation</format>: Usually 
implemented as a self-balancing binary search tree (often a 
red-black tree).</p>
</li>
<li>
<p><format color = "Lime">Features</format>: </p>
<list type = "bullet">
<li>
<p>Elements are stored in sorted order (by default, using 
<code>std::less</code>, which is the less-than operator &lt;)</p>
</li>
<li>
<p>Most operations like insertion, search, deletion, etc., have a 
time complexity of <math>O(log n)</math>, where <math>n</math> is 
the number of elements, making it efficient for larger datasets.</p>
</li>
</list>
</li>
</list>
</li>

<li>
<p><code>std::unordered_set</code> | <code>std::unordered_multiset</code></p>
<list type = "alpha-lower">
<li>
<p><format color = "DarkViolet">Implementation</format>: Using a hash table, 
which prioritizes fast average-case performance for operations 
like insertion, search, and deletion over maintaining a specific 
order.</p>
</li>
<li>
<p><format color = "Lime">Features</format>: </p>
<list type = "bullet">
<li>
<p>Offers O(1) average-case time complexity for insertion, 
search, and deletion operations. </p>
</li>
</list>
</li>
</list>
</li>
</list>

C++

```C++
#include <iostream>
#include <set>

int main() {
    std::set<int> uniqueNumbers;

    uniqueNumbers.insert(3);
    uniqueNumbers.insert(1);
    uniqueNumbers.insert(4);
    uniqueNumbers.insert(1); // Duplicate, won't be added

    std::cout << "Elements in the set: ";
    for (int num : uniqueNumbers) {
        std::cout << num << " ";
    } // Output: 1 3 4 

    return 0;
}
```

#### 13.1.3 Sets in Python

<p>For this part, please refer to 
<a href = "Python-Programming.md" anchor = "sets" 
summary = "How to use sets in Python">Sets in Python Programming</a></p>

### 13.2 Dictionary Clients

<note><p>This is the use of built-in dictionaries.</p></note>

Java

```Java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();

        map.put("Alice", 25);
        map.put("Bob", 30);
        map.put("Charlie", 35);

        int age = map.get("Alice");
        System.out.println("Alice's age: " + age);
        boolean exists = map.containsKey("Bob");
        System.out.println("Is Bob in the map? " + exists);
        map.remove("Charlie");
        System.out.println(map);
    }
}
```

C++ (map -> Red-Black Trees)

```C++
#include <iostream>
#include <map>

int main() {
    std::map<std::string, int> myMap;
    myMap["apple"] = 1;
    myMap["banana"] = 2;
    myMap["cherry"] = 3;
    std::cout << "The value associated with key 'apple' is: " << myMap["apple"] << std::endl;
    for (const auto& pair : myMap) {
        std::cout << "Key: " << pair.first << ", Value: " << pair.second << std::endl;
    }
    return 0;
}
```

C++ (unordered map -> Hash Tables)

```C++
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<std::string, int> myMap;
    myMap["apple"] = 1;
    myMap["banana"] = 2;
    myMap["cherry"] = 3;
    std::cout << "The value associated with key 'apple' is: " << myMap["apple"] << std::endl;
    for (const auto& pair : myMap) {
        std::cout << "Key: " << pair.first << ", Value: " << pair.second << std::endl;
    }
    return 0;
}
```

<p>For dictionaries in Python, refer to
<a href = "Python-Programming.md" anchor = "dictionaries" summary
= "How to use dictionaries in Python">Python Programming</a>.</p>

Python

```Python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
print(person["name"]) 
```

### 13.3 Indexing Clients

Java

```Java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.TreeMap;

public class InvertedIndexJava {

    // Data structure to represent a document
    static class Document {
        int id;
        String content;

        Document(int id, String content) {
            this.id = id;
            this.content = content;
        }
    }

    // Function to build an inverted index using TreeMap (Red-Black Tree)
    static TreeMap<String, List<Integer>> buildInvertedIndex(List<Document> documents) {
        TreeMap<String, List<Integer>> index = new TreeMap<>();

        for (Document doc : documents) {
            String[] words = doc.content.toLowerCase().split("\\s+"); // Tokenize into words
            for (String word : words) {
                index.computeIfAbsent(word, k -> new ArrayList<>()).add(doc.id); 
            }
        }

        return index;
    }

    public static void main(String[] args) {
        List<Document> documents = Arrays.asList(
                new Document(1, "The quick brown fox jumps over the lazy dog"),
                new Document(2, "A lazy cat sleeps all day long"),
                new Document(3, "The quick rabbit jumps over the fence")
        );

        TreeMap<String, List<Integer>> invertedIndex = buildInvertedIndex(documents);

        // Example query: Find documents containing the word "jumps"
        String searchTerm = "jumps";
        if (invertedIndex.containsKey(searchTerm)) {
            System.out.println("Documents containing '" + searchTerm + "': " + invertedIndex.get(searchTerm));
        } else {
            System.out.println("No documents found containing '" + searchTerm + "'");
        }
    }
}
```

C++

```C++
#include <iostream>
#include <string>
#include <vector>
#include <map>

using namespace std;

// Data structure to represent a document
struct Document {
    int id;
    string content;
};

// Function to build an inverted index using a map (Red-Black Tree)
map<string, vector<int>> buildInvertedIndex(const vector<Document>& documents) {
    map<string, vector<int>> index;

    for (const Document& doc : documents) {
        // Tokenize the document content (split into words) - simplify for brevity
        string word; 
        for (char c : doc.content){
            if (isspace(c)){
                if (!word.empty()){ // Avoid adding empty words
                    index[word].push_back(doc.id);
                    word.clear();
                }
            }
            else {
                word += c;
            }
        }
        if (!word.empty()){ // Add the last word
            index[word].push_back(doc.id);
        }
    }

    return index;
}

int main() {
    vector<Document> documents = {
        {1, "The quick brown fox jumps over the lazy dog"},
        {2, "A lazy cat sleeps all day long"},
        {3, "The quick rabbit jumps over the fence"}
    };

    map<string, vector<int>> invertedIndex = buildInvertedIndex(documents);

    // Example query: Find documents containing the word "jumps"
    string searchTerm = "jumps";
    if (invertedIndex.find(searchTerm) != invertedIndex.end()) {
        cout << "Documents containing '" << searchTerm << "': ";
        for (int docId : invertedIndex[searchTerm]) {
            cout << docId << " ";
        }
        cout << endl;
    } else {
        cout << "No documents found containing '" << searchTerm << "'" << endl;
    }

    return 0;
}
```

### 13.4 Sparse Vectors

Java

```Java
import java.util.HashMap;
import java.util.Map;

public class SparseMatrixVectorMultiplication {

    public static class SparseMatrix {
        private int rows;
        private int cols;
        private Map<String, Double> data;

        public SparseMatrix(int rows, int cols) {
            this.rows = rows;
            this.cols = cols;
            this.data = new HashMap<>();
        }

        // Method to set a non-zero element in the matrix
        public void set(int row, int col, double value) {
            if (row < 0 || row >= rows || col < 0 || col >= cols) {
                throw new IllegalArgumentException("Invalid row or column index");
            }
            if (value != 0) {
                data.put(getKey(row, col), value);
            }
        }

        // Method to get an element from the matrix (returns 0 if not present)
        public double get(int row, int col) {
            if (row < 0 || row >= rows || col < 0 || col >= cols) {
                throw new IllegalArgumentException("Invalid row or column index");
            }
            return data.getOrDefault(getKey(row, col), 0.0);
        }

        // Helper method to generate key for the HashMap
        private String getKey(int row, int col) {
            return row + "," + col;
        }

        // Method to perform matrix-vector multiplication
        public double[] multiply(double[] vector) {
            if (vector.length != cols) {
                throw new IllegalArgumentException("Vector size mismatch");
            }

            double[] result = new double[rows];
            for (String key : data.keySet()) {
                String[] indices = key.split(",");
                int row = Integer.parseInt(indices[0]);
                int col = Integer.parseInt(indices[1]);
                result[row] += data.get(key) * vector[col];
            }
            return result;
        }
    }
}
```

C++

```C++
#include <iostream>
#include <unordered_map>
#include <vector>

using namespace std;

// Pair struct to store row and column indices
struct RowCol {
    int row;
    int col;

    // Hash function for unordered_map
    size_t operator()(const RowCol& rc) const {
        return hash<int>()(rc.row) ^ hash<int>()(rc.col);
    }

    // Equality comparison for unordered_map
    bool operator==(const RowCol& other) const {
        return row == other.row && col == other.col;
    }
};

class SparseMatrix {
private:
    int rows;
    int cols;
    unordered_map<RowCol, double> data; // Symbol table (hash map)

public:
    SparseMatrix(int rows, int cols) : rows(rows), cols(cols) {}

    // Set a non-zero element in the matrix
    void set(int row, int col, double value) {
        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            throw out_of_range("Invalid row or column index");
        }
        if (value != 0) {
            data[{row, col}] = value; // Using RowCol struct as key
        }
    }

    // Get an element from the matrix (returns 0 if not present)
    double get(int row, int col) const {
        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            throw out_of_range("Invalid row or column index");
        }
        return data.count({row, col}) ? data.at({row, col}) : 0.0; 
    }

    // Matrix-vector multiplication
    vector<double> multiply(const vector<double>& vec) const {
        if (vec.size() != cols) {
            throw invalid_argument("Vector size mismatch");
        }

        vector<double> result(rows, 0.0); // Initialize result vector with zeros
        for (const auto& entry : data) {
            int row = entry.first.row;
            int col = entry.first.col;
            result[row] += entry.second * vec[col];
        }
        return result;
    }
};
```

Python

```Python
class SparseMatrix:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.data = {}  # Using a dictionary as a symbol table

    def set(self, row, col, value):
        if row < 0 or row >= self.rows or col < 0 or col >= self.cols:
            raise ValueError("Invalid row or column index")
        if value != 0:
            self.data[(row, col)] = value

    def get(self, row, col):
        if row < 0 or row >= self.rows or col < 0 or col >= self.cols:
            raise ValueError("Invalid row or column index")
        return self.data.get((row, col), 0)  # Return 0 if not found

    def multiply(self, vector):
        if len(vector) != self.cols:
            raise ValueError("Vector size mismatch")

        result = [0] * self.rows
        for (row, col), value in self.data.items():
            result[row] += value * vector[col]
        return result
```

<tip>
<p>What is the running time of multiplying the <math>n \times n</math> matirx
<math>A</math> with a dense vector <math>x</math> 
of length <math>n</math> ? => <math>n</math></p>
</tip>

## 14 Undirected Graphs

### 14.1 Introduction to Graphs

<p><format color = "BlueViolet">Terminology:</format> </p>

<list type = "alpha-lower">
<li>
<p><format color = "DarkOrange">Graph:</format> Set of 
<format color = "OrangeRed">vertices</format> connected pairwise by 
<format color = "OrangeRed">edges</format>.</p>
</li>
<li>
<p><format color = "DarkOrange">Path:</format> Sequence of vertices 
connected by edges.</p>
</li>
<li>
<p><format color = "DarkOrange">Cycle:</format> Path whose first and 
last vertices are the same.</p>
</li>
<li>
<p>Two vertices are <format color = "OrangeRed">connected</format> if
there is a path between them.</p>
</li>
</list>

<img src="../images_data/14-1-1.png" alt = "undirected graph"/>

### 14.2 Graph API

<p><format color = "BlueViolet">Representation Types:</format> </p>

<list type = "alpha-lower">
<li>
<p><format color = "Fuchsia">Set-of-edges graph representation: 
</format> Maintain a list of the edges (linked list or array).</p>
</li>
<li>
<p><format color = "Fuchsia">Adjacency-matrix graph 
representation:</format> Maintain a two-dimensional
<math>V</math> by <math>V</math> boolean array; for each edge 
<math>v-w</math> in the graph: <code>adj[v][w] = adj[w][v] = true</code>.</p>
</li>
<li>
<p><format color = "Fuchsia">Adjacency-list graph 
representation:</format> Maintain vertex-indexed array of lists.</p>
</li>
</list>

<p>In practice: use adjacency-lists representation.</p>

<list type = "bullet">
<li>
<p>Algorithms based on iterating over vertices adjacent to <math>v
</math>.</p>
</li>
<li>
<p>Real-world graphs tend to be <format color = "OrangeRed">sparse
</format> (huge number of vertices, small average vertex degree).</p>
</li>
</list>

Java

```Java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class UndirectedGraph {

    private final int numVertices;
    private final List<List<Integer>> adjacencyList;

    public UndirectedGraph(int numVertices) {
        this.numVertices = numVertices;
        adjacencyList = new ArrayList<>(numVertices);
        for (int i = 0; i < numVertices; i++) {
            adjacencyList.add(new LinkedList<>());
        }
    }

    public void addEdge(int source, int destination) {
        adjacencyList.get(source).add(destination);
        adjacencyList.get(destination).add(source);
    }

    public int getNumVertices() {
        return numVertices;
    }

    public List<List<Integer>> getAdjacencyList() {
        return adjacencyList;
    }

    public void printGraph() {
        for (int i = 0; i < numVertices; i++) {
            System.out.print("Vertex " + i + ":");
            for (Integer vertex : adjacencyList.get(i)) {
                System.out.print(" -> " + vertex);
            }
            System.out.println();
        }
    }
}
```

C++ (UndirectedGraph.h)

```C++
#ifndef UNDIRECTEDGRAPH_H
#define UNDIRECTEDGRAPH_H
#pragma once

#include <vector>
#include <list>

class UndirectedGraph {
private:
    int numVertices;
    std::vector<std::list<int>> adjacencyList;

public:
    explicit UndirectedGraph(const int& numVertices);
    void addEdge(const int& source, const int& destination);
    [[nodiscard]] bool hasEdge(const int& source, const int& destination) const;
    [[nodiscard]] int getNumVertices() const;
    [[nodiscard]] const std::vector<std::list<int>>& getAdjacencyList() const;
    void printGraph() const;
};

#endif //UNDIRECTEDGRAPH_H
```

C++ (UndirectedGraph.cpp)

```C++
#include "UndirectedGraph.h"
#include <iostream>
#include <algorithm>

UndirectedGraph::UndirectedGraph(const int& numVertices) :
    numVertices(numVertices), adjacencyList(numVertices) {}

void UndirectedGraph::addEdge(const int& source, const int& destination) {
    adjacencyList[source].push_back(destination);
    adjacencyList[destination].push_back(source);
}

bool UndirectedGraph::hasEdge(const int& source, const int& destination) const {
    return std::ranges::any_of(adjacencyList[source],
                               [&destination](const int& neighbor) {
                                   return neighbor == destination;
                               });
}

int UndirectedGraph::getNumVertices() const {
    return numVertices;
}

const std::vector<std::list<int>>& UndirectedGraph::getAdjacencyList() const {
    return adjacencyList;
}

void UndirectedGraph::printGraph() const {
    for (int i = 0; i < numVertices; ++i) {
        std::cout << "Vertex " << i << ":";
        for (const int& neighbor : adjacencyList[i]) {
            std::cout << " -> " << neighbor;
        }
        std::cout << std::endl;
    }
}
```

Python

```Python
class UndirectedGraph:
    def __init__(self, num_vertices):
        self.num_vertices = num_vertices
        self.adjacency_list = [[] for _ in range(num_vertices)]

    def add_edge(self, source, destination):
        self.adjacency_list[source].append(destination)
        self.adjacency_list[destination].append(source)

    def get_num_vertices(self):
        return self.num_vertices

    def get_adjacency_list(self):
        return self.adjacency_list

    def print_graph(self):
        for i in range(self.num_vertices):
            print(f"Vertex {i}:", end="")
            for vertex in self.adjacency_list[i]:
                print(f" -> {vertex}", end="")
            print()
```

### 14.3 Depth-First Search

<p><format color = "BlueViolet">Goal:</format> Systematically search
through a graph.</p>

<p><format color = "BlueViolet">Typical applications:</format> </p>

<list type = "bullet">
<li>
<p>Find all vertices connected to a given source vertex.</p>
</li>
<li>
<p>Find a path between two vertices.</p>
</li>
</list>

<procedure title = "Depth-First Search">
<step>
<p>Mark vertex <math>v</math> as visited.</p>
</step>
<step>
<p>Recursively visit all the unmarked vertices adjacent to <math>v
</math>.</p>
</step>
</procedure>

<p><format color = "BlueViolet">Properties:</format> </p>

<list type = "bullet">
<li>
<p>DFS marks all vertices connected to <math>s</math> in time 
proportional to the sum of their degrees.</p>
</li>
<li>
<p>After DFS, can find vertices connected to <math>s</math> in 
constant time and can find a path to s (if one exists) in time 
proportional to its length.</p>
</li>
</list>

Java

```Java
import java.util.Stack;

public class DepthFirstSearch {
    private final boolean[] marked;
    private final int[] edgeTo;

    public DepthFirstSearch(UndirectedGraph graph, int source) {
        this.marked = new boolean[graph.getNumVertices()];
        this.edgeTo = new int[graph.getNumVertices()];
        dfs(graph, source);
    }

    private void dfs(UndirectedGraph graph, int source) {
        Stack<Integer> stack = new Stack<>();
        marked[source] = true;
        stack.push(source);

        while (!stack.isEmpty()) {
            int v = stack.pop();
            System.out.print(v + " ");

            for (int w : graph.getAdjacencyList().get(v)) {
                if (!marked[w]) {
                    marked[w] = true;
                    edgeTo[w] = v;
                    stack.push(w);
                }
            }
        }
    }
    
    public void hasPathTo(int v) {
        return marked[v];
    }

    public void printPathTo(int v) {
        if (!marked[v]) {
            System.out.println("No path from source to " + v);
            return;
        }
        Stack<Integer> path = new Stack<>();
        for (int x = v; x != 0; x = edgeTo[x]) {
            path.push(x);
        }
        path.push(0); 

        System.out.print("Path: ");
        while (!path.isEmpty()) {
            System.out.print(path.pop());
            if (!path.isEmpty()) {
                System.out.print(" -> ");
            }
        }
        System.out.println();
    }
}
```

C++ (DepthFirstSearch.h)

```C++
#ifndef DEPTHFIRSTSEARCH_H
#define DEPTHFIRSTSEARCH_H
#pragma once

#include <vector>
#include "UndirectedGraph.h"

class DepthFirstSearch {
private:
    const UndirectedGraph& graph;
    std::vector<bool> marked;
    std::vector<int> edgeTo;

public:
    DepthFirstSearch(const UndirectedGraph& graph, int source);
    void dfs(int v);
    [[nodiscard]] bool hasPathTo(int v) const;
    void printPathTo(int v) const;
};

#endif //DEPTHFIRSTSEARCH_H
```

C++ (DepthFirstSearch.cpp)

```C++
#include "DepthFirstSearch.h"
#include <iostream>
#include <stack>

DepthFirstSearch::DepthFirstSearch(const UndirectedGraph& graph, const int source) :
    graph(graph),
    marked(graph.getNumVertices(), false),
    edgeTo(graph.getNumVertices(), -1)
{
    dfs(source);
}

void DepthFirstSearch::dfs(const int v) {
    std::stack<int> stack;
    marked[v] = true;
    stack.push(v);

    while (!stack.empty()) {
        const int current = stack.top();
        stack.pop();
        std::cout << current << " ";

        for (int neighbor : this->graph.getAdjacencyList()[current]) {
            if (!marked[neighbor]) {
                marked[neighbor] = true;
                edgeTo[neighbor] = current;
                stack.push(neighbor);
            }
        }
    }
}

bool DepthFirstSearch::hasPathTo(const int v) const {
    return marked[v];
}

void DepthFirstSearch::printPathTo(const int v) const {
    if (!hasPathTo(v)) {
        std::cout << "No path from source to " << v << std::endl;
        return;
    }
    std::stack<int> path;
    for (int x = v; x != edgeTo[v]; x = edgeTo[x]) {
        path.push(x);
    }
    path.push(edgeTo[v]);

    std::cout << "Path: ";
    while (!path.empty()) {
        std::cout << path.top();
        path.pop();
        if (!path.empty()) {
            std::cout << " -> ";
        }
    }
    std::cout << std::endl;
}
```

Python

```Python
from UndirectedGraph import UndirectedGraph


class DepthFirstSearch:
    def __init__(self, graph: UndirectedGraph, source: int):
        self.marked = [False] * graph.get_num_vertices()
        self.edge_to = [None] * graph.get_num_vertices()
        self.dfs(graph, source)

    def dfs(self, graph, source):
        stack = [source]
        self.marked[source] = True

        while stack:
            v = stack.pop()
            print(v, end=" ")

            for w in graph.get_adjacency_list()[v]:
                if not self.marked[w]:
                    self.marked[w] = True
                    self.edge_to[w] = v
                    stack.append(w)

    def has_path_to(self, v):
        return self.marked[v]

    def print_path_to(self, v):
        if not self.marked[v]:
            print(f"No path from source to {v}")
            return

        path = []
        x = v
        while x is not None:
            path.append(x)
            x = self.edge_to[x]

        print("Path:", " -> ".join(map(str, path[::-1])))
```

### 14.4 Breadth-First Search

<procedure title = "Breadth-First Search">
<step>
<p>Put s onto a FIFO queue, and mark s as visited.</p>
</step>
<step>
<p>Repeat until the queue is empty.</p>
</step>
<step>
<p>Remove the least recently added vertex v.</p>
</step>
<step>
<p>Add each of v's unvisited neighbors to the queue, and mark them as 
visited.</p>
</step>
</procedure>

<p><format color = "BlueViolet">Property:</format> </p>

<p>BFS computes shortest paths (fewest number of edges) from s to 
all other vertices in a graph in time proportional to <math>E + V
</math>.</p>

<list type = "bullet">
<li>
<p><format color = "Fuchsia">Depth-first search:</format> put
unvisited vertices on <format color = "OrangeRed">stack</format>.</p>
</li>
<li>
<p><format color = "Fuchsia">Breadth-first search:</format> 
put unvisited vertices on <format color = "OrangeRed">queue</format>
.</p>
</li>
</list>

Java

```Java
import java.util.ArrayDeque;
import java.util.List;
import java.util.Queue;

public class BreadthFirstSearch {
    private boolean[] marked;
    private int[] edgeTo;
    private int[] distanceTo;

    public void bfs(UndirectedGraph graph, int startVertex) {
        marked = new boolean[graph.getNumVertices()];
        edgeTo = new int[graph.getNumVertices()];
        distanceTo = new int[graph.getNumVertices()];

        Queue<Integer> queue = new ArrayDeque<>();

        marked[startVertex] = true;
        distanceTo[startVertex] = 0;
        queue.offer(startVertex);

        while (!queue.isEmpty()) {
            int currentVertex = queue.poll();

            List<List<Integer>> adjList = graph.getAdjacencyList();
            for (int adjacentVertex : adjList.get(currentVertex)) {
                if (!marked[adjacentVertex]) {
                    marked[adjacentVertex] = true;
                    edgeTo[adjacentVertex] = currentVertex;
                    distanceTo[adjacentVertex] = distanceTo[currentVertex] + 1; // Update distance
                    queue.offer(adjacentVertex);
                }
            }
        }
    }

    public int getDistance(int destination) {
        if (!marked[destination]) { 
            return -1; 
        }
        return distanceTo[destination];
    }

    public void printPath(int start, int end) {
        if (start == end) {
            System.out.print(start);
            return;
        }

        if (edgeTo[end] == 0) {
            System.out.print("No path exists");
            return;
        }

        printPath(start, edgeTo[end]);
        System.out.print(" -> " + end);
    }
}
```

C++ (BreadthFirstSearch.h)

```C++
#ifndef BREADTHFIRSTSEARCH_H
#define BREADTHFIRSTSEARCH_H
#pragma once

#include "UndirectedGraph.h"
#include <vector>

class BreadthFirstSearch {
private:
    const UndirectedGraph& graph;
    int startVertex;
    std::vector<bool> marked;
    std::vector<int> edgeTo;
    std::vector<int> distanceTo;

public:
    BreadthFirstSearch(const UndirectedGraph& graph, int startVertex);
    void bfs();
    [[nodiscard]] int getDistance(int destination) const;
    void printPath(int destination) const;
};

#endif //BREADTHFIRSTSEARCH_H
```

C++ (BreadthFirstSearch.cpp)

```C++
#include "BreadthFirstSearch.h"
#include <iostream>
#include <queue>

BreadthFirstSearch::BreadthFirstSearch(const UndirectedGraph& graph, const int startVertex) :
    graph(graph), startVertex(startVertex),
    marked(graph.getNumVertices(), false),
    edgeTo(graph.getNumVertices(), -1),
    distanceTo(graph.getNumVertices(), 0) {}

void BreadthFirstSearch::bfs() {
    std::queue<int> queue;
    marked[startVertex] = true;
    queue.push(startVertex);

    while (!queue.empty()) {
        const int currentVertex = queue.front();
        queue.pop();

        for (const int& neighbor : graph.getAdjacencyList()[currentVertex]) {
            if (!marked[neighbor]) {
                marked[neighbor] = true;
                edgeTo[neighbor] = currentVertex;
                distanceTo[neighbor] = distanceTo[currentVertex] + 1;
                queue.push(neighbor);
            }
        }
    }
}

int BreadthFirstSearch::getDistance(const int destination) const {
    if (!marked[destination]) {
        return -1;
    }
    return distanceTo[destination];
}

void BreadthFirstSearch::printPath(const int destination) const {
    if (startVertex == destination) {
        std::cout << startVertex;
        return;
    }

    if (edgeTo[destination] == -1) {
        std::cout << "No path exists";
        return;
    }

    printPath(edgeTo[destination]);
    std::cout << " -> " << destination;
}
```

Python

```Python
from collections import deque
from UndirectedGraph import UndirectedGraph
import sys


class BreadthFirstSearch:
    def __init__(self, graph: UndirectedGraph, start_vertex: int):
        self.marked = [False] * graph.get_num_vertices()
        self.edge_to = [None] * graph.get_num_vertices()
        self.distance_to = [sys.maxsize] * graph.get_num_vertices()

        self.bfs(graph, start_vertex)

    def bfs(self, graph: UndirectedGraph, start_vertex: int):
        queue = deque([start_vertex])
        self.marked[start_vertex] = True
        self.distance_to[start_vertex] = 0

        while queue:
            current_vertex = queue.popleft()

            for adjacent_vertex in graph.get_adjacency_list()[current_vertex]:
                if not self.marked[adjacent_vertex]:
                    self.marked[adjacent_vertex] = True
                    self.edge_to[adjacent_vertex] = current_vertex
                    self.distance_to[adjacent_vertex] = self.distance_to[current_vertex] + 1
                    queue.append(adjacent_vertex)

    def get_distance(self, destination: int) -> int:
        if not self.marked[destination]:
            return -1
        return self.distance_to[destination]

    def print_path(self, start: int, end: int):
        if start == end:
            print(start, end="")
            return

        if self.edge_to[end] is None:
            print("No path exists")
            return

        self.print_path(start, self.edge_to[end])
        print(f" -> {end}", end="")
```

### 14.5 Connected Components

<p><format color = "DarkOrange">Connected Components:</format> A 
connected component is maximal set of connected vertices.</p>

<procedure title = "Find all Connected Components">
<step>
<p>Mark vertex <math>v</math> as visited.</p>
</step>
<step>
<p>Recursively visit all the unmarked vertices adjacent to <math>v
</math>.</p>
</step>
</procedure>

Java

```Java
import java.util.ArrayList;
import java.util.List;

public class ConnectedComponents {

    private final int[] id;
    private int count; 

    public ConnectedComponents(UndirectedGraph graph) {
        int numVertices = graph.getNumVertices();
        id = new int[numVertices];
        count = 0;
        
        for (int i = 0; i < numVertices; i++) {
            id[i] = i;
        }
        
        for (int i = 0; i < numVertices; i++) {
            if (id[i] == i) { 
                dfs(graph, i);
                count++;
            }
        }
    }

    private void dfs(UndirectedGraph graph, int v) {
        id[v] = count;
        for (int w : graph.getAdjacencyList().get(v)) {
            if (id[w] == w) {
                dfs(graph, w);
            }
        }
    }

    public boolean isConnected(int v, int w) {
        return id[v] == id[w];
    }

    public int getCount() {
        return count;
    }

    public void printComponents() {
        System.out.println("Number of connected components: " + count);
        List<List<Integer>> components = new ArrayList<>(count);
        for (int i = 0; i < count; i++) {
            components.add(new ArrayList<>());
        }
        for (int i = 0; i < id.length; i++) {
            components.get(id[i]).add(i);
        }
        for (int i = 0; i < count; i++) {
            System.out.println("Component " + i + ": " + components.get(i));
        }
    }
}
```

C++ (ConnectedComponents.h)

```C++
#ifndef CONNECTEDCOMPONENTS_H 
#define CONNECTEDCOMPONENTS_H

#include <vector>
#include "UndirectedGraph.h" 

class ConnectedComponents {
private:
    std::vector<int> id;
    int count;

    void dfs(const UndirectedGraph& graph, int v); 

public:
    explicit ConnectedComponents(const UndirectedGraph& graph);
    [[nodiscard]] bool isConnected(int v, int w) const;
    [[nodiscard]] int getCount() const; 
    void printComponents() const;
};

#endif // CONNECTEDCOMPONENTS_H 
```

C++ (ConnectedComponents.cpp)

```C++
#include "ConnectedComponents.h"
#include <iostream>

ConnectedComponents::ConnectedComponents(const UndirectedGraph& graph) : count(0) {
    const int numVertices = graph.getNumVertices();
    id.resize(numVertices);

    for (int i = 0; i < numVertices; ++i) {
        id[i] = i; 
    }

    for (int i = 0; i < numVertices; ++i) {
        if (id[i] == i) {
            dfs(graph, i);
            ++count;
        }
    }
}

void ConnectedComponents::dfs(const UndirectedGraph& graph, int v) {
    id[v] = count;
    for (const int& w : graph.getAdjacencyList()[v]) {
        if (id[w] == w) { 
            dfs(graph, w);
        }
    }
}

bool ConnectedComponents::isConnected(int v, int w) const {
    return id[v] == id[w];
}

int ConnectedComponents::getCount() const {
    return count;
}

void ConnectedComponents::printComponents() const {
    std::cout << "Number of connected components: " << count << std::endl;

    std::vector<std::vector<int>> components(count);
    for (int i = 0; i < id.size(); ++i) {
        components[id[i]].push_back(i);
    }

    for (int i = 0; i < count; ++i) {
        std::cout << "Component " << i << ": ";
        for (const int& vertex : components[i]) {
            std::cout << vertex << " ";
        }
        std::cout << std::endl;
    }
}
```

Python

```Python
from UndirectedGraph import UndirectedGraph  


class ConnectedComponents:
    def __init__(self, graph: UndirectedGraph):
        self.id = list(range(graph.get_num_vertices()))  
        self.count = 0

        for i in range(graph.get_num_vertices()):
            if self.id[i] == i:  
                self.dfs(graph, i)
                self.count += 1

    def dfs(self, graph: UndirectedGraph, v: int):
        self.id[v] = self.count
        for w in graph.get_adjacency_list()[v]:
            if self.id[w] == w:
                self.dfs(graph, w)

    def is_connected(self, v: int, w: int) -> bool:
        return self.id[v] == self.id[w]

    def get_count(self) -> int:
        return self.count

    def print_components(self):
        print("Number of connected components:", self.count)
        components = [[] for _ in range(self.count)]

        for i in range(len(self.id)):
            components[self.id[i]].append(i)

        for i, component in enumerate(components):
            print(f"Component {i}: {component}")
```

### 14.6 Important Questions

<list type = "decimal">
<li>
<p><format color = "PaleGoldenRod">Q:</format> Implement depth-first 
search in an undirected graph without using recursion.</p>
<p><format color = "SkyBlue">A:</format> Simply replace a queue with
a stack in breadth-first search.</p>
</li>
<li>
<p>Given a connected graph with no cycles</p>
    <list type = "bullet">
    <li>
    <p><format color = "PaleGoldenRod">Q:</format> <format style = 
    "italic">Diameter</format>: design a linear-time algorithm to find
    the longest simple path in the graph.</p>
    <p><format color = "SkyBlue">A:</format> to compute the diameter,
    pick a vertex <math>s</math>; run BFS from <math>s</math>; then 
    run BFS again from the vertex that is furthest from <math>s</math>
    .</p>
    </li>
    <li>
    <p><format color = "PaleGoldenRod">Q:</format> <format style =
    "italic">Center</format>: design a linear-time algorithm to find
    the center of the graph.</p>
    <p><format color = "SkyBlue">A:</format> consider vertices on the 
    longest path.</p>
    </li>
    </list>
</li>
<li>
<p><format color = "PaleGoldenRod">Q:</format> An Euler cycle in a 
graph is a cycle (not necessarily simple) that uses every edge in the
graph exactly one. Design a linear-time algorithm to determine whether 
a graph has an Euler cycle, and if so, find one.</p>
<p><format color = "SkyBlue">A:</format> use depth-first search and 
piece together the cycles you discover.</p>
</li>
</list>

## 15 Directed Graphs

### 15.1 Introduction to Directed Graphs

<p>Directed graph: Set of vertices connected pairwise by <format color
= "red">directed edges</format>.</p>

<img src = "../images_data/15-1-1.png" alt = "Directed graph"/>

### 15.2 Directed Graph API

Java

```Java
import java.util.ArrayList;
import java.util.List;

public class DirectedGraph {

    private final int numVertices;
    private int numEdges;
    private final List<List<Integer>> adjacencyList;

    public DirectedGraph(int numVertices) {
        this.numVertices = numVertices;
        this.numEdges = 0;
        this.adjacencyList = new ArrayList<>();
        for (int i = 0; i < numVertices; i++) {
            adjacencyList.add(i, new ArrayList<>());
        }
    }

    public void addEdge(int source, int destination) {
        adjacencyList.get(source).add(destination);
        numEdges++;
    }

    public int getNumVertices() {
        return numVertices;
    }

    public int getNumEdges() {
        return numEdges;
    }

    public List<List<Integer>> getAdjacencyList() {
        return adjacencyList;
    }

    public void printGraph() {
        for (int v = 0; v < numVertices; v++) {
            System.out.print("Adjacency list of vertex " + v + " : ");
            for (Integer neighbor : adjacencyList.get(v)) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }
}
```

C++ (DirectedGraph.h)

```C++
#ifndef DIRECTEDGRAPH_H
#define DIRECTEDGRAPH_H
#pragma once

#include <vector>
#include <list>

class DirectedGraph {
private:
    int numVertices;
    std::vector<std::list<int>> adjacencyList;

public:
    explicit DirectedGraph(const int& numVertices);
    void addEdge(const int& source, const int& destination);
    [[nodiscard]] bool hasEdge(const int& source, const int& destination) const;
    [[nodiscard]] int getNumVertices() const;
    [[nodiscard]] const std::vector<std::list<int>>& getAdjacencyList() const;
    void printGraph() const;
};

#endif //DIRECTEDGRAPH_H
```

C++ (DirectedGraph.cpp)

```C++
#include "DirectedGraph.h"
#include <iostream>
#include <algorithm>

DirectedGraph::DirectedGraph(const int& numVertices) :
    numVertices(numVertices), adjacencyList(numVertices) {}

void DirectedGraph::addEdge(const int& source, const int& destination) {
    adjacencyList[source].push_back(destination);
}

bool DirectedGraph::hasEdge(const int& source, const int& destination) const {
    return std::ranges::any_of(adjacencyList[source],
                               [&destination](const int& neighbor) {
                                   return neighbor == destination;
                               });
}

int DirectedGraph::getNumVertices() const {
    return numVertices;
}

const std::vector<std::list<int>>& DirectedGraph::getAdjacencyList() const {
    return adjacencyList;
}

void DirectedGraph::printGraph() const {
    for (int i = 0; i < numVertices; ++i) {
        std::cout << "Vertex " << i << ":";
        for (const int& neighbor : adjacencyList[i]) {
            std::cout << " -> " << neighbor;
        }
        std::cout << std::endl;
    }
}
```

Python

```Python
class DirectedGraph:
    def __init__(self, num_vertices):
        self.num_vertices = num_vertices
        self.num_edges = 0
        self.adjacency_list = [[] for _ in range(num_vertices)]

    def add_edge(self, source, destination):
        self.adjacency_list[source].append(destination)
        self.num_edges += 1

    def get_num_vertices(self):
        return self.num_vertices

    def get_num_edges(self):
        return self.num_edges

    def print_graph(self):
        for v in range(self.num_vertices):
            print(f"Adjacency list of vertex {v} : ", end="")
            for neighbor in self.adjacency_list[v]:
                print(f"{neighbor} ", end="")
            print()
```

### 15.3 Digraph Search

#### 15.3.1 Depth-First Search for Digraph

<note>
<p>Every undirected graph is a digraph (with edges in both 
directions).</p>
<p>DFS is a <format color = "OrangeRed">digraph</format> algorithm, 
same method as for undirected graphs!</p>
</note>

Java

```Java
import java.util.Stack;

public class DirectedDepthFirstSearch {
    private final boolean[] marked;
    private final int[] edgeTo;

    public DirectedDepthFirstSearch(DirectedGraph graph, int source) {
        this.marked = new boolean[graph.getNumVertices()];
        this.edgeTo = new int[graph.getNumVertices()];
        dfs(graph, source);
    }

    private void dfs(DirectedGraph graph, int source) {
        Stack<Integer> stack = new Stack<>();
        marked[source] = true;
        stack.push(source);

        while (!stack.isEmpty()) {
            int v = stack.pop();
            System.out.print(v + " ");

            for (int w : graph.getAdjacencyList().get(v)) {
                if (!marked[w]) {
                    marked[w] = true;
                    edgeTo[w] = v;
                    stack.push(w);
                }
            }
        }
    }

    public boolean hasPathTo(int v) {
        return marked[v];
    }

    public void printPathTo(int v) {
        if (!marked[v]) {
            System.out.println("No path from source to " + v);
            return;
        }
        Stack<Integer> path = new Stack<>();
        for (int x = v; x != 0; x = edgeTo[x]) {
            path.push(x);
        }
        path.push(0);

        System.out.print("Path: ");
        while (!path.isEmpty()) {
            System.out.print(path.pop());
            if (!path.isEmpty()) {
                System.out.print(" -> ");
            }
        }
        System.out.println();
    }
}
```

C++ (DirectedDepthFirstSearch.h)

```C++
#ifndef DIRECTEDDEPTHFIRSTSEARCH_H
#define DIRECTEDDEPTHFIRSTSEARCH_H
#pragma once

#include <vector>
#include "DirectedGraph.h"

class DirectedDepthFirstSearch {
private:
    const DirectedGraph& graph;
    std::vector<bool> marked;
    std::vector<int> edgeTo;

public:
    DirectedDepthFirstSearch(const DirectedGraph& graph, int source);
    void dfs(int v);
    [[nodiscard]] bool hasPathTo(int v) const;
    void printPathTo(int v) const;
};

#endif //DIRECTEDDEPTHFIRSTSEARCH_H
```

C++ (DirectedDepthFirstSearch.cpp)

```C++
#include "DirectedDepthFirstSearch.h"
#include <iostream>
#include <stack>

DirectedDepthFirstSearch::DirectedDepthFirstSearch(const DirectedGraph& graph, const int source) :
    graph(graph),
    marked(graph.getNumVertices(), false),
    edgeTo(graph.getNumVertices(), -1)
{
    dfs(source);
}

void DirectedDepthFirstSearch::dfs(const int v) {
    std::stack<int> stack;
    marked[v] = true;
    stack.push(v);

    while (!stack.empty()) {
        const int current = stack.top();
        stack.pop();
        std::cout << current << " ";

        for (int neighbor : this->graph.getAdjacencyList()[current]) {
            if (!marked[neighbor]) {
                marked[neighbor] = true;
                edgeTo[neighbor] = current;
                stack.push(neighbor);
            }
        }
    }
}

bool DirectedDepthFirstSearch::hasPathTo(const int v) const {
    return marked[v];
}

void DirectedDepthFirstSearch::printPathTo(const int v) const {
    if (!hasPathTo(v)) {
        std::cout << "No path from source to " << v << std::endl;
        return;
    }
    std::stack<int> path;
    for (int x = v; x != edgeTo[v]; x = edgeTo[x]) {
        path.push(x);
    }
    path.push(edgeTo[v]);

    std::cout << "Path: ";
    while (!path.empty()) {
        std::cout << path.top();
        path.pop();
        if (!path.empty()) {
            std::cout << " -> ";
        }
    }
    std::cout << std::endl;
}
```

Python

```Python
from DirectedGraph import DirectedGraph


class DirectedDepthFirstSearch:
    def __init__(self, graph: DirectedGraph, source: int):
        self.marked = [False] * graph.get_num_vertices()
        self.edge_to = [None] * graph.get_num_vertices()
        self.dfs(graph, source)

    def dfs(self, graph, source):
        stack = [source]
        self.marked[source] = True

        while stack:
            v = stack.pop()
            print(v, end=" ")

            for w in graph.get_adjacency_list()[v]:
                if not self.marked[w]:
                    self.marked[w] = True
                    self.edge_to[w] = v
                    stack.append(w)

    def has_path_to(self, v):
        return self.marked[v]

    def print_path_to(self, v):
        if not self.marked[v]:
            print(f"No path from source to {v}")
            return

        path = []
        x = v
        while x is not None:
            path.append(x)
            x = self.edge_to[x]

        print("Path:", " -> ".join(map(str, path[::-1])))
```

#### 15.3.2 Breadth-First Search for Digraph

<note>
<p>Every undirected graph is a digraph (with edges in both 
directions).</p>
<p>BFS is a <format color = "OrangeRed">digraph</format> algorithm, 
same method as for undirected graphs!</p>
</note>

<p><format color = "BlueViolet">Reachability application:</format> 
</p>

<list type = "bullet">
<li>
<p>Program control-flow analysis</p>
</li>
<li>
<p>Mark-sweep garbage collector: if ao object is unreachable, it is 
garbage.</p> 
</li>
</list>

<p><format color = "BlueViolet">Application:</format> </p>

<list type = "bullet">
<li>
<p>Web crawler</p>
</li>
</list>

Java

```Java
ivate boolean[] marked;
    private int[] edgeTo;
    private int[] distanceTo;

    public void bfs(UndirectedGraph graph, int startVertex) {
        marked = new boolean[graph.getNumVertices()];
        edgeTo = new int[graph.getNumVertices()];
        distanceTo = new int[graph.getNumVertices()];

        Queue<Integer> queue = new ArrayDeque<>();

        marked[startVertex] = true;
        distanceTo[startVertex] = 0;
        queue.offer(startVertex);

        while (!queue.isEmpty()) {
            int currentVertex = queue.poll();

            List<List<Integer>> adjList = graph.getAdjacencyList();
            for (int adjacentVertex : adjList.get(currentVertex)) {
                if (!marked[adjacentVertex]) {
                    marked[adjacentVertex] = true;
                    edgeTo[adjacentVertex] = currentVertex;
                    distanceTo[adjacentVertex] = distanceTo[currentVertex] + 1; // Update distance
                    queue.offer(adjacentVertex);
                }
            }
        }
    }

    public int getDistance(int destination) {
        if (!marked[destination]) { 
            return -1; 
        }
        return distanceTo[destination];
    }

    public void printPath(int start, int end) {
        if (start == end) {
            System.out.print(start);
            return;
        }

        if (edgeTo[end] == 0) {
            System.out.print("No path exists");
            return;
        }

        printPath(start, edgeTo[end]);
        System.out.print(" -> " + end);
    }
}
```

C++ (BreadthFirstSearch.h)

```C++
#ifndef BREADTHFIRSTSEARCH_H
#define BREADTHFIRSTSEARCH_H
#pragma once

#include "UndirectedGraph.h"
#include <vector>

class BreadthFirstSearch {
private:
    const UndirectedGraph& graph;
    int startVertex;
    std::vector<bool> marked;
    std::vector<int> edgeTo;
    std::vector<int> distanceTo;

public:
    BreadthFirstSearch(const UndirectedGraph& graph, int startVertex);
    void bfs();
    [[nodiscard]] int getDistance(int destination) const;
    void printPath(int destination) const;
};

#endif //BREADTHFIRSTSEARCH_H
```

C++ (BreadthFirstSearch.cpp)

```C++
#include "BreadthFirstSearch.h"
#include <iostream>
#include <queue>

BreadthFirstSearch::BreadthFirstSearch(const UndirectedGraph& graph, const int startVertex) :
    graph(graph), startVertex(startVertex),
    marked(graph.getNumVertices(), false),
    edgeTo(graph.getNumVertices(), -1),
    distanceTo(graph.getNumVertices(), 0) {}

void BreadthFirstSearch::bfs() {
    std::queue<int> queue;
    marked[startVertex] = true;
    queue.push(startVertex);

    while (!queue.empty()) {
        const int currentVertex = queue.front();
        queue.pop();

        for (const int& neighbor : graph.getAdjacencyList()[currentVertex]) {
            if (!marked[neighbor]) {
                marked[neighbor] = true;
                edgeTo[neighbor] = currentVertex;
                distanceTo[neighbor] = distanceTo[currentVertex] + 1;
                queue.push(neighbor);
            }
        }
    }
}

int BreadthFirstSearch::getDistance(const int destination) const {
    if (!marked[destination]) {
        return -1;
    }
    return distanceTo[destination];
}

void BreadthFirstSearch::printPath(const int destination) const {
    if (startVertex == destination) {
        std::cout << startVertex;
        return;
    }

    if (edgeTo[destination] == -1) {
        std::cout << "No path exists";
        return;
    }

    printPath(edgeTo[destination]);
    std::cout << " -> " << destination;
}
```

Python

```Python
from collections import deque
from DirectedGraph import DirectedGraph
import sys


class BreadthFirstSearch:
    def __init__(self, graph: DirectedGraph, start_vertex: int):
        self.marked = [False] * graph.get_num_vertices()
        self.edge_to = [None] * graph.get_num_vertices()
        self.distance_to = [sys.maxsize] * graph.get_num_vertices()

        self.bfs(graph, start_vertex)

    def bfs(self, graph: UndirectedGraph, start_vertex: int):
        queue = deque([start_vertex])
        self.marked[start_vertex] = True
        self.distance_to[start_vertex] = 0

        while queue:
            current_vertex = queue.popleft()

            for adjacent_vertex in graph.get_adjacency_list()[current_vertex]:
                if not self.marked[adjacent_vertex]:
                    self.marked[adjacent_vertex] = True
                    self.edge_to[adjacent_vertex] = current_vertex
                    self.distance_to[adjacent_vertex] = self.distance_to[current_vertex] + 1
                    queue.append(adjacent_vertex)

    def get_distance(self, destination: int) -> int:
        if not self.marked[destination]:
            return -1
        return self.distance_to[destination]

    def print_path(self, start: int, end: int):
        if start == end:
            print(start, end="")
            return

        if self.edge_to[end] is None:
            print("No path exists")
            return

        self.print_path(start, self.edge_to[end])
        print(f" -> {end}", end="")
```

### 15.4 Topological Sort

<p><format color = "DarkOrange">DAG:</format> Directed <format color
= "OrangeRed">Acyclic</format> Graph.</p>

<p><format color = "DarkOrange">Topological sort:</format> Redraw DAG
so all edges point upwards.</p>

<p><format color = "BlueViolet">Property:</format> A digraph has a
topological order iff no directed cycle.</p>

<p><format color = "BlueViolet">Application:</format> Precedence 
scheduling, cycle inheritance, spreadsheet recalculation, etc.</p>

#### 15.4.1 Algorithm &#8544; - Depth-First Search

<procedure title = "Topological Sort with DFS">
<step>
<p>Run depth-first search.</p>
</step>
<step>
<p>Return vertices in reverse postorder.</p>
</step>
</procedure>

Java

```Java
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class TopologicalSort {
    private final DirectedGraph graph;
    private final boolean[] visited;
    private final Stack<Integer> postorder;

    public TopologicalSort(DirectedGraph graph) {
        this.graph = graph;
        this.visited = new boolean[graph.getNumVertices()];
        this.postorder = new Stack<>();
    }

    public List<Integer> topologicalSort() {
        for (int v = 0; v < graph.getNumVertices(); v++) {
            if (!visited[v]) {
                dfs(v);
            }
        }
        List<Integer> sortedVertices = new ArrayList<>();
        while (!postorder.isEmpty()) {
            sortedVertices.add(postorder.pop());
        }
        return sortedVertices;
    }

    private void dfs(int v) {
        visited[v] = true;
        for (Integer neighbor : graph.getAdjacencyList().get(v)) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
        postorder.push(v);
    }
}
```

C++ (TopologicalSort.h)

```C++
#ifndef TOPOLOGICALSORT_H
#define TOPOLOGICALSORT_H
#pragma once

#include "DirectedGraph.h"
#include <vector>
#include <stack>

class TopologicalSort {
private:
    const DirectedGraph& graph;
    std::vector<bool> visited;
    std::stack<int> postorder;

    void dfs(int v);

public:
    explicit TopologicalSort(const DirectedGraph& graph);
    std::vector<int> topologicalSort();
};

#endif //TOPOLOGICALSORT_H
```

C++ (TopologicalSort.cpp)

```C++
#include "TopologicalSort.h"

TopologicalSort::TopologicalSort(const DirectedGraph &graph) :
    graph(graph), visited(graph.getNumVertices(), false) {}

void TopologicalSort::dfs(const int v) {
    visited[v] = true;
    for (const int& neighbor : graph.getAdjacencyList()[v]) {
        if (!visited[neighbor]) {
            dfs(neighbor);
        }
    }
    postorder.push(v);
}

std::vector<int> TopologicalSort::topologicalSort() {
    for (int v = 0; v < graph.getNumVertices(); ++v) {
        if (!visited[v]) {
            dfs(v);
        }
    }

    std::vector<int> sortedVertices;
    while (!postorder.empty()) {
        sortedVertices.push_back(postorder.top());
        postorder.pop();
    }
    return sortedVertices;
}
```

Python

```Python
class TopologicalSort:
    def __init__(self, graph):
        self.graph = graph  # Store the DirectedGraph object
        self.visited = [False] * self.graph.get_num_vertices()
        self.postorder = []

    def topological_sort(self):
        for v in range(self.graph.get_num_vertices()):
            if not self.visited[v]:
                self.dfs(v)
        return self.postorder[::-1]

    def dfs(self, v):
        self.visited[v] = True
        # Access adjacency list from the DirectedGraph object
        for neighbor in self.graph.adjacency_list[v]:
            if not self.visited[neighbor]:
                self.dfs(neighbor)
        self.postorder.append(v) 
```

#### 15.4.2 Algorithm &#8545; - Kahn's Algorithm

<procedure title = "Topological Sort with Kahn's Algorithm">
<step>
<p>Calculate in-degrees.</p>
</step>
<step>
<p>Find nodes with in-degree 0.</p>
</step>
<step>
<p>Process nodes in topological order, and decrement in-degree of
neighbors.</p>
</step>
</procedure>

Java

```Java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class TopologicalSort {

    public static List<Integer> topologicalSort(DirectedGraph graph) {
        int numVertices = graph.getNumVertices();
        List<List<Integer>> adjList = graph.getAdjacencyList();

        int[] inDegree = new int[numVertices];
        for (int u = 0; u < numVertices; u++) {
            for (int v : adjList.get(u)) {
                inDegree[v]++;
            }
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numVertices; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        List<Integer> sortedOrder = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            sortedOrder.add(u);

            for (int v : adjList.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.offer(v);
                }
            }
        }

        if (sortedOrder.size() != numVertices) {
            System.err.println("Error: Graph contains a cycle!");
            return new ArrayList<>();
        }

        return sortedOrder;
    }
}
```

C++

```C++
#include "DirectedGraph.h"
#include <iostream>
#include <queue>
#include <vector>

std::vector<int> topologicalSort(const DirectedGraph& graph) {
    const int numVertices = graph.getNumVertices();
    std::vector<int> inDegree(numVertices, 0);
    std::vector<int> sortedOrder;
    std::queue<int> queue;

    for (int u = 0; u < numVertices; ++u) {
        for (const int& v : graph.getAdjacencyList()[u]) {
            inDegree[v]++;
        }
    }

    for (int i = 0; i < numVertices; ++i) {
        if (inDegree[i] == 0) {
            queue.push(i);
        }
    }

    while (!queue.empty()) {
        int u = queue.front();
        queue.pop();
        sortedOrder.push_back(u);

        for (const int& v : graph.getAdjacencyList()[u]) {
            if (--inDegree[v] == 0) {
                queue.push(v);
            }
        }
    }

    // Check for cycles!
    if (sortedOrder.size() != numVertices) {
        std::cerr << "Error: Graph contains a cycle!" << std::endl;
        return {};
    }

    return sortedOrder;
}
```

Python

```Python
def topological_sort(graph):
    num_vertices = graph.get_num_vertices()
    in_degree = [0] * num_vertices
    sorted_order = []
    queue = []

    for u in range(num_vertices):
        for v in graph.adjacency_list[u]:
            in_degree[v] += 1

    for i in range(num_vertices):
        if in_degree[i] == 0:
            queue.append(i)

    while queue:
        u = queue.pop(0)
        sorted_order.append(u)

        for v in graph.adjacency_list[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    if len(sorted_order) != num_vertices:
        return None  

    return sorted_order
```

### 15.5 Strong Components

<table style = "both">
<tr><td></td><td>Connected Components</td><td>Strongly-Connected
Components</td></tr>
<tr><td>Definition</td><td><math>v</math> and <math>w</math> are
<format color = "OrangeRed">connected</format> if there is a path
between <math>v</math> and <math>w</math></td><td><math>v</math> and
<math>w</math> are <format color = "OrangeRed">stringly connected
</format> if there is a directed path from <math>v</math> to 
<math>w</math> and a directed graph from <math>w</math> to <math>v
</math></td></tr>
<tr><td>Implementation</td><td>DFS</td><td>DFS & Reverse DFS</td></tr>
<tr><td>Detail</td><td><img src = "../images_data/15-5-1.png" 
alt = "Connected Components"/></td><td><img src = 
"../images_data/15-5-2.png" alt = "Strongly-Connected Components"/>
</td></tr>
</table>

<procedure title = "Strongly-Connected Components">
<step>
<p>Computer topological order (reverse postorder) in kernel DAG.</p>
</step>
<step>
<p>Run DFS, considering vertices in reverse topological order.</p>
</step>
</procedure>

Java

```Java
import java.util.Stack;

public class StronglyConnectedComponents {

    private final DirectedGraph graph;
    private boolean[] visited;
    private final Stack<Integer> stack;
    private int sccCount;

    public StronglyConnectedComponents(DirectedGraph graph) {
        this.graph = graph;
        this.visited = new boolean[graph.getNumVertices()];
        this.stack = new Stack<>();
        this.sccCount = 0;
    }

    public void findStronglyConnectedComponents() {
        for (int i = 0; i < graph.getNumVertices(); i++) {
            if (!visited[i]) {
                dfsFirst(i);
            }
        }

        DirectedGraph transposedGraph = transposeGraph();

        visited = new boolean[graph.getNumVertices()];
        while (!stack.isEmpty()) {
            int vertex = stack.pop();
            if (!visited[vertex]) {
                sccCount++;
                System.out.print("SCC " + sccCount + ": ");
                dfsSecond(transposedGraph, vertex);
                System.out.println();
            }
        }
    }

    private void dfsFirst(int vertex) {
        visited[vertex] = true;
        for (int neighbor : graph.getAdjacencyList().get(vertex)) {
            if (!visited[neighbor]) {
                dfsFirst(neighbor);
            }
        }
        stack.push(vertex);
    }

    private void dfsSecond(DirectedGraph transposedGraph, int vertex) {
        visited[vertex] = true;
        System.out.print(vertex + " ");
        for (int neighbor : transposedGraph.getAdjacencyList().get(vertex)) {
            if (!visited[neighbor]) {
                dfsSecond(transposedGraph, neighbor);
            }
        }
    }

    private DirectedGraph transposeGraph() {
        DirectedGraph transposedGraph = new DirectedGraph(graph.getNumVertices());
        for (int i = 0; i < graph.getNumVertices(); i++) {
            for (int neighbor : graph.getAdjacencyList().get(i)) {
                transposedGraph.addEdge(neighbor, i);
            }
        }
        return transposedGraph;
    }
}
```

C++ (StronglyConnectedComponents.h)

```C++
#ifndef STRONGLYCONNECTEDCOMPONENTS_H
#define STRONGLYCONNECTEDCOMPONENTS_H
#pragma once

#include "DirectedGraph.h"
#include <vector>
#include <stack>

class StronglyConnectedComponents {
private:
    const DirectedGraph& graph;
    std::vector<bool> visited;
    std::stack<int> finishingStack;
    int sccCount;

    void dfsFirst(int vertex);
    void dfsSecond(const DirectedGraph& transposedGraph, int vertex);

public:
    explicit StronglyConnectedComponents(const DirectedGraph& graph);
    void findStronglyConnectedComponents();
};

#endif //STRONGLYCONNECTEDCOMPONENTS_H
```

C++ (StronglyConnectedComponents.cpp)

```C++
#include "StronglyConnectedComponents.h"
#include <iostream>

StronglyConnectedComponents::StronglyConnectedComponents(const DirectedGraph& graph) :
    graph(graph), visited(graph.getNumVertices(), false), sccCount(0) {}

void StronglyConnectedComponents::dfsFirst(int vertex) {
    visited[vertex] = true;
    for (const int& neighbor : graph.getAdjacencyList()[vertex]) {
        if (!visited[neighbor]) {
            dfsFirst(neighbor);
        }
    }
    finishingStack.push(vertex);
}

void StronglyConnectedComponents::dfsSecond(const DirectedGraph& transposedGraph, int vertex) {
    visited[vertex] = true;
    std::cout << vertex << " ";
    for (const int& neighbor : transposedGraph.getAdjacencyList()[vertex]) {
        if (!visited[neighbor]) {
            dfsSecond(transposedGraph, neighbor);
        }
    }
}

void StronglyConnectedComponents::findStronglyConnectedComponents() {
    for (int i = 0; i < graph.getNumVertices(); ++i) {
        if (!visited[i]) {
            dfsFirst(i);
        }
    }
    
    DirectedGraph transposedGraph(graph.getNumVertices());
    for (int i = 0; i < graph.getNumVertices(); ++i) {
        for (const int& neighbor : graph.getAdjacencyList()[i]) {
            transposedGraph.addEdge(neighbor, i);
        }
    }

    visited.assign(graph.getNumVertices(), false); 
    while (!finishingStack.empty()) {
        int vertex = finishingStack.top();
        finishingStack.pop();

        if (!visited[vertex]) {
            std::cout << "SCC " << ++sccCount << ": ";
            dfsSecond(transposedGraph, vertex);
            std::cout << std::endl;
        }
    }
}
```

Python

```Python
class StronglyConnectedComponents:
    def __init__(self, graph):
        self.graph = graph
        self.visited = [False] * graph.num_vertices
        self.finishing_stack = []
        self.scc_count = 0

    def dfs_first(self, vertex):
        self.visited[vertex] = True
        for neighbor in self.graph.adjacency_list[vertex]:
            if not self.visited[neighbor]:
                self.dfs_first(neighbor)
        self.finishing_stack.append(vertex)

    def dfs_second(self, transposed_graph, vertex):
        self.visited[vertex] = True
        print(f"{vertex} ", end="")
        for neighbor in transposed_graph.adjacency_list[vertex]:
            if not self.visited[neighbor]:
                self.dfs_second(transposed_graph, neighbor)

    def find_strongly_connected_components(self):
        # 1. DFS on original graph to get finishing times
        for i in range(self.graph.num_vertices):
            if not self.visited[i]:
                self.dfs_first(i)

        transposed_graph = DirectedGraph(self.graph.num_vertices)
        for i in range(self.graph.num_vertices):
            for neighbor in self.graph.adjacency_list[i]:
                transposed_graph.add_edge(neighbor, i)

        self.visited = [False] * self.graph.num_vertices
        while self.finishing_stack:
            vertex = self.finishing_stack.pop()
            if not self.visited[vertex]:
                self.scc_count += 1
                print(f"SCC {self.scc_count}: ", end="")
                self.dfs_second(transposed_graph, vertex)
                print()
```

## 16 Minimum Spanning Trees

### 16.1 Introduction to MSTs

<p><format color = "DarkOrange">Spanning tree:</format> A <format 
color = "OrangeRed">spanning tree</format> is a subgraph <math>T
</math> that is both a <format color = "OrangeRed">tree</format> 
(connected and acyclic) and <format color = "OrangeRed">spanning
</format> (includes all of the vertices).</p>

<img src = "../images_data/16-1-1.png" alt = "Spanning Tree"/>

<p><format color = "BlueViolet">Application:</format></p>

<list type = "bullet">
<li>
<p>Dithering</p>
</li>
<li>
<p>Cluster analysis</p>
</li>
<li>
<p>Max bottleneck paths</p>
</li>
<li>
<p>Real-time face verification</p>
</li>
<li>
<p>LDPC codes for error correction</p>
</li>
<li>
<p>Image registration with Renyi entropy</p>
</li>
<li>
<p>Find road networks in satellite and aerial imagery</p>
</li>
<li>
<p>Reducing data storage in sequencing amino acids in a protein</p>
</li>
<li>
<p>Model locality of particle interactions in turbulent fluid flows
</p>
</li>
<li>
<p>Autoconfig protocol for Ethernet bridging to avoid cycles in a 
network</p>
</li>
<li>
<p>Approximation algorithms for NP-hard problems (e.g., TSP, Steiner 
tree)</p>
</li>
<li>
<p>Network design (communication, electrical, hydraulic, computer, 
road).</p>
</li>
</list>

### 16.2 Greedy Algorithm

<p><format color = "BlueViolet">Definition:</format> </p>

<list type = "bullet">
<li>
<p><format color = "DarkOrange">Cut:</format> A cut in a graph is a 
partition of its vertices into two (nonempty) sets.</p>
</li>
<li>
<p><format color = "DarkOrange">Crossing edge:</format> A crossing 
edge connects a vertex in one set with a vertex in the other.</p>
</li>
</list>

<img src = "../images_data/16-2-1.png" alt = "Greedy Algorithm"/>

<procedure title = "Greedy Algorithm for MST">
    <step>
        <p>Start with all edges colored gray.</p>
    </step>
    <step>
        <p>Find cut with no black crossing edges; color its 
          min-weight edge black.</p>
    </step>
    <step>
        <p>Repeat until <math>V - 1</math> edges are colored black.
        </p>
    </step>
</procedure>

<p><format color = "BlueViolet">Correctness Proof:</format> </p>

<list type = "decimal">
<li>
<p>Given any cut, the crossing edge of min weight is in MST.</p>

<p><format color = "MediumVioletRed">Proof:</format> </p>

<p>Suppose min-weight crossing edge <math>e</math> is not in the 
MST.</p>
    <list type = "bullet">
    <li>
    <p>Adding <math>e</math> to the MST creates a cycle.</p>
    </li>
    <li>
    <p>Some other edge <math>f</math> in cycle must be a crossing 
    edge.</p>
    </li>
    <li>
    <p>Removing <math>f</math> and adding <math>e</math> is also a
    spanning edge.</p>
    </li>
    <li>
    <p>Since weight of <math>e</math> is less than the weight of 
    <math>f</math>, that spanning tree is lower height.</p>
    </li>
    <li>
    <p>Contradiction.</p>
    </li>
    </list>
<img src = "../images_data/16-2-2.png" alt = "Proof"/>
</li>
<li>
<p>The greedy algorithm computes the MST.</p>

<p><format color = "MediumVioletRed">Proof:</format> </p>
    <list type = "bullet"> 
    <li>
    <p>Any edge colored black is in the MST (via cut property).</p>
    </li>
    <li>
    <p>Fewer than <math>V - 1</math> black edges => cut with no 
    black crossing edges. (consider cut whose vertices are one 
    connected component)</p>
    </li>
    </list>
</li>
</list>

<warning>
<p>The proof above is under the simplifying assumptions below: </p>
<list type = "bullet">
<li>
<p>Edge weights are distinct.</p>
</li>
<li>
<p>Graph is connected.</p>
</li>
</list>
</warning>

### 16.3 Edge-weighted Graph API

Java (Edge.java)

```Java
public class Edge implements Comparable<Edge> {
    private final int source;
    private final int destination;
    private final double weight;

    public Edge(int source, int destination, double weight) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }

    public int getEitherVertex() {
        return source;
    }

    public int getOtherVertex(int vertex) {
        if (vertex == source) {
            return destination;
        } else if (vertex == destination) {
            return source;
        } else {
            throw new IllegalArgumentException("Invalid vertex");
        }
    }

    public double getWeight() {
        return weight;
    }

    @Override
    public String toString() {
        return "(" + source + " - " + destination + " : " + weight + ")";
    }

    @Override
    public int compareTo(Edge other) {
        return Double.compare(this.weight, other.weight);
    }
}
```

Java (EdgeWeightedGraph.java)

```Java
import java.util.ArrayList;
import java.util.List;

public class EdgeWeightedGraph {
    private final int vertices;
    private final List<Edge>[] adjacencyList;

    public EdgeWeightedGraph(int vertices) {
        this.vertices = vertices;
        this.adjacencyList = new ArrayList[vertices];
        for (int i = 0; i < vertices; i++) {
            adjacencyList[i] = new ArrayList<>();
        }
    }

    public void addEdge(int source, int destination, double weight) {
        adjacencyList[source].add(new Edge(source, destination, weight));
        adjacencyList[destination].add(new Edge(destination, source, weight));
    }

    public int getVertices() {
        return vertices;
    }

    public List<Edge> getAdjacencyList(int vertex) {
        return adjacencyList[vertex];
    }

    public void printGraph() {
        for (int i = 0; i < vertices; i++) {
            List<Edge> edges = adjacencyList[i];
            System.out.print("Vertex " + i + ":");
            for (Edge edge : edges) {
                System.out.print(" " + edge);
            }
            System.out.println();
        }
    }
}
```

C++ (Edge.h)

```C++
#ifndef EDGE_H
#define EDGE_H

#include <string>

class Edge {
private:
    int source;
    int destination;
    double weight;

public:
    Edge(int source, int destination, double weight);
    [[nodiscard]] int getEitherVertex() const;
    [[nodiscard]] int getOtherVertex(int vertex) const;
    [[nodiscard]] double getWeight() const;
    bool operator<(const Edge& other) const;
    [[nodiscard]] std::string toString() const;
};

#endif // EDGE_H
```

C++ (Edge.cpp)

```C++
#include "Edge.h"
#include <stdexcept>
#include <sstream>
#include <iomanip>

Edge::Edge(const int source, const int destination, const double weight)
    : source(source), destination(destination), weight(weight) {}

int Edge::getEitherVertex() const {
    return source;
}

int Edge::getOtherVertex(const int vertex) const {
    if (vertex == source) {
        return destination;
    } else if (vertex == destination) {
        return source;
    } else {
        throw std::invalid_argument("Invalid vertex");
    }
}

double Edge::getWeight() const {
    return weight;
}

bool Edge::operator<(const Edge& other) const {
    return weight < other.weight;
}

std::string Edge::toString() const {
    std::ostringstream oss;
    oss << "(" << source << " - " << destination << " : " << std::fixed << std::setprecision(2) << weight << ")";
    return oss.str();
}
```

C++ (EdgeWeightedGraph.h)

```C++
#ifndef EDGEWEIGHTEDGRAPH_H
#define EDGEWEIGHTEDGRAPH_H

#include <vector>
#include "Edge.h"

class EdgeWeightedGraph {
private:
    int vertices;
    std::vector<std::vector<Edge>> adjacencyList;

public:
    explicit EdgeWeightedGraph(int vertices);
    void addEdge(int source, int destination, double weight);
    [[nodiscard]] int getVertices() const;
    [[nodiscard]] const std::vector<Edge>& getAdjacencyList(int vertex) const;
    void printGraph() const;
};

#endif // EDGEWEIGHTEDGRAPH_H
```

C++ (EdgeWeightedGraph.cpp)

```C++
#include "EdgeWeightedGraph.h"
#include <iostream>

EdgeWeightedGraph::EdgeWeightedGraph(const int vertices)
    : vertices(vertices), adjacencyList(vertices) {}

void EdgeWeightedGraph::addEdge(const int source, const int destination, const double weight) {
    const Edge edge(source, destination, weight);
    adjacencyList[source].push_back(edge);
    adjacencyList[destination].emplace_back(destination, source, weight);
}

int EdgeWeightedGraph::getVertices() const {
    return vertices;
}

const std::vector<Edge>& EdgeWeightedGraph::getAdjacencyList(int vertex) const {
    return adjacencyList[vertex];
}

void EdgeWeightedGraph::printGraph() const {
    for (int i = 0; i < vertices; ++i) {
        const std::vector<Edge>& edges = adjacencyList[i];
        std::cout << "Vertex " << i << ":";
        for (const Edge& edge : edges) {
            std::cout << " " << edge.toString();
        }
        std::cout << std::endl;
    }
}
```

Python

```Python
class Edge:
    def __init__(self, source: int, destination: int, weight: float):
        self.source = source
        self.destination = destination
        self.weight = weight

    def get_either_vertex(self) -> int:
        return self.source

    def get_other_vertex(self, vertex: int) -> int:
        if vertex == self.source:
            return self.destination
        elif vertex == self.destination:
            return self.source
        else:
            raise ValueError("Invalid vertex")

    def get_weight(self) -> float:
        return self.weight

    def __str__(self) -> str:
        return f"({self.source} - {self.destination} : {self.weight})"

    def __lt__(self, other: 'Edge') -> bool:
        return self.weight < other.weight


class EdgeWeightedGraph:
    def __init__(self, vertices: int):
        self.vertices = vertices
        self.adjacency_list: list[list[Edge]] = [[] for _ in range(vertices)]

    def add_edge(self, source: int, destination: int, weight: float):
        self.adjacency_list[source].append(Edge(source, destination, weight))
        self.adjacency_list[destination].append(Edge(destination, source, weight))

    def get_vertices(self) -> int:
        return self.vertices

    def get_adjacency_list(self, vertex: int) -> list[Edge]:
        return self.adjacency_list[vertex]

    def print_graph(self):
        for i in range(self.vertices):
            print(f"Vertex {i}:", end="")
            for edge in self.adjacency_list[i]:
                print(f" {edge}", end="")
            print()
```

### 16.4 Kruskal's Algorithm

<procedure title = "Kruskal's Algorithm">
    <step>
        <p>Consider edges in ascending order of weight.</p>
    </step>
    <step>
        <p>Add next edge to tree <math>T</math> unless doing so 
        would create a cycle.</p>
    </step>
</procedure>

<procedure title = "Union-Find for Cycle Challenge" type = "choices">
    <step>
        <p>Maintain a set for each connected component in <math>T
        </math></p>
    </step>
    <step>
        <p>If <math>v</math> and <math>w</math> are in same set, 
        then adding <math>v-w</math> would create a cycle.</p>
    </step>
    <step>
        <p>To add <math>v-w</math> to <math>T</math>, merge sets 
        containing <math>v</math> and <math>w</math>.</p>
    </step>
</procedure>

<p><format color = "BlueViolet">Correctness Proof:</format> </p>

<p>Kruskal's Algorithm is a special case of the greedy MST algorithm.
</p>

<list type = "bullet">
<li>
<p>Suppose Kruskal's algorithm colors the edge <math>e = v–w</math> 
black.</p>
</li>
<li>
<p>Cut = set of vertices connected to <math>v</math> in tree <math>
T</math>.</p>
</li>
<li>
<p>No crossing edge is black.</p>
</li>
<li>
<p>No crossing edge has lower weight.</p>
</li>
</list>

<p><format color = "BlueViolet">Property:</format> Kruskal's algorithm 
computes MST in time proportional to <math>E \log E</math> (in the 
worst case).</p>

<p>Proof: </p>

<table style = "header-row">
<tr><td>Operation</td><td>Frequency</td><td>Time per op</td></tr>
<tr><td>Build pq</td><td><math>1</math></td><td><math>E \log E
</math></td></tr>
<tr><td>Delete-min</td><td><math>E</math></td><td><math>\log E
</math></td></tr>
<tr><td>Build pq</td><td><math>V</math></td><td><math>\log* V
</math></td></tr>
<tr><td>Connected</td><td><math>E</math></td><td><math>\log* E
</math></td></tr>
</table>

<note>
<p>If edges are already sorted, order of growth is <math>E \log* V
</math>.</p>
</note>

Java

```Java
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class KruskalsAlgorithm {
    public static List<Edge> findMinimumSpanningTree(EdgeWeightedGraph graph) {
        int vertices = graph.getVertices();
        List<Edge> minimumSpanningTree = new ArrayList<>();
        PriorityQueue<Edge> minHeap = new PriorityQueue<>(graph.getVertices());
        UnionFind unionFind = new UnionFind(vertices);

        for (int i = 0; i < vertices; i++) {
            for (Edge edge : graph.getAdjacencyList(i)) {
                if (edge.getEitherVertex() < i) {
                    minHeap.offer(edge);
                }
            }
        }

        while (!minHeap.isEmpty() && minimumSpanningTree.size() < vertices - 1) {
            Edge edge = minHeap.poll();
            int source = edge.getEitherVertex();
            int destination = edge.getOtherVertex(source);

            int sourceRoot = unionFind.find(source);
            int destinationRoot = unionFind.find(destination);

            if (sourceRoot != destinationRoot) {
                minimumSpanningTree.add(edge);
                unionFind.union(sourceRoot, destinationRoot);
            }
        }

        return minimumSpanningTree;
    }

    static class UnionFind {
        private final int[] parent;
        private final int[] rank;

        public UnionFind(int size) {
            parent = new int[size];
            rank = new int[size];

            for (int i = 0; i < size; i++) {
                parent[i] = i;
                rank[i] = 1;
            }
        }

        public int find(int element) {
            if (parent[element] != element) {
                parent[element] = find(parent[element]);
            }
            return parent[element];
        }

        public void union(int element1, int element2) {
            int root1 = find(element1);
            int root2 = find(element2);

            if (root1 != root2) {
                if (rank[root1] > rank[root2]) {
                    parent[root2] = root1;
                } else if (rank[root1] < rank[root2]) {
                    parent[root1] = root2;
                } else {
                    parent[root2] = root1;
                    rank[root1] += 1;
                }
            }
        }
    }
}
```

C++

```C++
#include "EdgeWeightedGraph.h"
#include <queue>
#include <vector>

class UnionFind {
    public:
        explicit UnionFind(int size);
        int find(int element);
        void unionSets(int element1, int element2);

    private:
        std::vector<int> parent;
        std::vector<int> rank;
};

std::vector<Edge> findMinimumSpanningTree(const EdgeWeightedGraph& graph) {
    const int vertices = graph.getVertices();
    std::vector<Edge> minimumSpanningTree;
    std::priority_queue<Edge, std::vector<Edge>, std::greater<>> minHeap;
    UnionFind unionFind(vertices);

    for (int i = 0; i < vertices; ++i) {
        for (const Edge& edge : graph.getAdjacencyList(i)) {
            minHeap.push(edge);
        }
    }

    // Build the minimum spanning tree
    while (!minHeap.empty() && minimumSpanningTree.size() < vertices - 1) {
        Edge edge = minHeap.top();
        minHeap.pop();
        const int source = edge.getEitherVertex();
        int destination = edge.getOtherVertex(source);

        // **Corrected Condition:** Check if connecting these vertices creates a cycle
        if (unionFind.find(source) != unionFind.find(destination)) {
            minimumSpanningTree.push_back(edge);
            unionFind.unionSets(source, destination);
        }
    }

    return minimumSpanningTree;
}

UnionFind::UnionFind(const int size) : parent(size), rank(size, 1) {
    for (int i = 0; i < size; ++i) {
        parent[i] = i;
    }
}

int UnionFind::find(const int element) {
    if (parent[element] != element) {
        parent[element] = find(parent[element]);
    }
    return parent[element];
}

void UnionFind::unionSets(const int element1, const int element2) {
    const int root1 = find(element1);
    const int root2 = find(element2);

    if (root1 != root2) {
        if (rank[root1] > rank[root2]) {
            parent[root2] = root1;
        } else if (rank[root1] < rank[root2]) {
            parent[root1] = root2;
        } else {
            parent[root2] = root1;
            rank[root1]++;
        }
    }
}
```

Python

```Python
from typing import List
import heapq

from EdgeWeightedGraph import EdgeWeightedGraph, Edge


class KruskalsAlgorithm:
    @staticmethod
    def find_minimum_spanning_tree(graph: EdgeWeightedGraph) -> List[Edge]:
        vertices: int = graph.get_vertices()
        minimum_spanning_tree: List[Edge] = []
        min_heap: list[Edge] = []
        union_find = UnionFind(vertices)

        # Add edges to the min-heap, ensuring no duplicates
        for i in range(vertices):
            for edge in graph.get_adjacency_list(i):
                # Add edge only if its source vertex is smaller than its destination
                if edge.source < edge.destination:
                    heapq.heappush(min_heap, edge)

        while min_heap and len(minimum_spanning_tree) < vertices - 1:
            edge: Edge = heapq.heappop(min_heap)
            source: int = edge.get_either_vertex()
            destination: int = edge.get_other_vertex(source)

            source_root: int = union_find.find(source)
            destination_root: int = union_find.find(destination)

            if source_root != destination_root:
                minimum_spanning_tree.append(edge)
                union_find.union(source_root, destination_root)

        return minimum_spanning_tree


class UnionFind:
    def __init__(self, size: int):
        self.parent: List[int] = [i for i in range(size)]
        self.rank: List[int] = [1] * size

    def find(self, element: int) -> int:
        if self.parent[element] != element:
            self.parent[element] = self.find(self.parent[element])
        return self.parent[element]

    def union(self, element1: int, element2: int):
        root1: int = self.find(element1)
        root2: int = self.find(element2)

        if root1 != root2:
            if self.rank[root1] > self.rank[root2]:
                self.parent[root2] = root1
            elif self.rank[root1] < self.rank[root2]:
                self.parent[root1] = root2
            else:
                self.parent[root2] = root1
                self.rank[root1] += 1
```

### 16.5 Prim's Algorithm

<procedure title = "Prim's Algorithm">
    <step>
        <p>Start with vertex <math>0</math> and greedily grow tree 
        <math>T</math></p>
    </step>
    <step>
        <p>Add to <math>T</math> the min weight edge with exactly one 
        endpoint in <math>T</math>.</p>
    </step>
    <step>
        <p>Repeat until <math>V - 1</math> edges.</p>
    </step>
</procedure>

<p><format color = "BlueViolet">Correctness Proof:</format> </p>

<p>Prim's Algorithm is a special case of the greedy MST algorithm.
</p>

<list>
<li>
<p>Suppose edge e = min weight edge connecting a vertex on the tree
to a vertex not on the tree.</p>
</li>
<li>
<p>Cut = set of vertices connected on tree.</p>
</li>
<li>
<p>No crossing edge is black.</p>
</li>
<li>
<p>No crossing edge has lower weight.</p>
</li>
</list>

#### 16.5.1 Lazy Implementation

<procedure title = "Lazy Implementation">
    <step>
        <p>Maintain a PQ of <format color = "OrangeRed">edges
        </format> with (at least) one endpoint in T.</p>
    </step>
    <step>
        <p>Key = edge; priority = weight of edge.</p>
    </step>
    <step>
        <p>Delete-min to determine next edge <math>e = v-w</math> to
        add to <math>T</math>.</p>
    </step>
    <step>
        <p>Disregard if both endpoints <math>v</math> and <math>w
        </math> are in <math>T</math>.</p>
    </step>
    <step>
        <p>Otherwise, let <math>w</math> be the vertex not in <math>T
        </math>.</p>
        <p>Add to PQ any edge incident to <math>w</math> (assuming 
        other endpoint not in T)</p>
        <p>Add <math>e</math> to <math>T</math> and mark <math>w
        </math>.</p>
    </step>
</procedure>

<p><format color = "BlueViolet">Property:</format> Lazy Prim's 
algorithm computes the MST in time proportional to <math>E \log E
</math> and extra space proportional to <math>E</math> (in the worst
case).</p>

<table style = "header-row">
<tr><td>Operation</td><td>Frequency</td><td>Binary Heap</td></tr>
<tr><td>Delete min</td><td><math>E</math></td><td><math>\log E
</math></td></tr>
<tr><td>Insert</td><td><math>E</math></td><td><math>\log E</math>
</td></tr>
</table>

Java

```Java
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class PrimMSTLazy {
    private final boolean[] marked; 
    private final PriorityQueue<Edge> pq; 
    private final List<Edge> mst; 
    private double weight; 

    public PrimMSTLazy(EdgeWeightedGraph graph) {
        marked = new boolean[graph.getVertices()];
        pq = new PriorityQueue<>();
        mst = new ArrayList<>();
        weight = 0.0;

        visit(graph, 0);
        while (!pq.isEmpty()) {
            Edge e = pq.poll(); 

            int v = e.getEitherVertex();
            int w = e.getOtherVertex(v);

            if (marked[v] && marked[w]) continue; 
            mst.add(e); 
            weight += e.getWeight();

            if (!marked[v]) visit(graph, v); 
            if (!marked[w]) visit(graph, w); 
        }
    }

    private void visit(EdgeWeightedGraph graph, int v) {
        marked[v] = true; 

        for (Edge e : graph.getAdjacencyList(v)) {
            if (!marked[e.getOtherVertex(v)]) {
                pq.offer(e);
            }
        }
    }

    public Iterable<Edge> edges() {
        return mst;
    }

    public double weight() {
        return weight;
    }
}
```

C++

```C++
#include <iostream>
#include <vector>
#include <queue>
#include "EdgeWeightedGraph.h"

class PrimMSTLazy {
private:
    std::vector<bool> marked;
    std::priority_queue<Edge, std::vector<Edge>, std::greater<>> pq;
    std::vector<Edge> mst;
    double weight;

    void visit(const EdgeWeightedGraph& graph, int v) {
        marked[v] = true;
        for (const Edge& e : graph.getAdjacencyList(v)) {
            if (!marked[e.getOtherVertex(v)]) {
                pq.push(e);
            }
        }
    }

public:
    explicit PrimMSTLazy(const EdgeWeightedGraph& graph) : 
        marked(graph.getVertices(), false), weight(0.0)  {

        visit(graph, 0); 
        while (!pq.empty()) {
            Edge e = pq.top();
            pq.pop();

            int v = e.getEitherVertex();
            int w = e.getOtherVertex(v);

            if (marked[v] && marked[w]) continue; 
            mst.push_back(e);
            weight += e.getWeight();

            if (!marked[v]) visit(graph, v);
            if (!marked[w]) visit(graph, w);
        }
    }

    [[nodiscard]] const std::vector<Edge>& edges() const {
        return mst;
    }

    [[nodiscard]] double getWeight() const {
        return weight;
    }
};
```

Python

```Python
from typing import List, Iterable
import heapq  

from EdgeWeightedGraph import EdgeWeightedGraph, Edge


class PrimMSTLazy:
    def __init__(self, graph: EdgeWeightedGraph):
        self.marked: List[bool] = [False] * graph.get_vertices()
        self.pq: List[Edge] = []  # Min-heap for edges
        self.mst: List[Edge] = []  # Stores the MST edges
        self.weight: float = 0.0

        self._visit(graph, 0)  # Start from vertex 0
        while self.pq:
            edge: Edge = heapq.heappop(self.pq)

            v: int = edge.get_either_vertex()
            w: int = edge.get_other_vertex(v)

            if self.marked[v] and self.marked[w]:
                continue  # Ignore if both vertices are already in the MST

            self.mst.append(edge)
            self.weight += edge.get_weight()

            if not self.marked[v]:
                self._visit(graph, v)
            if not self.marked[w]:
                self._visit(graph, w)

    def _visit(self, graph: EdgeWeightedGraph, v: int):
        """Adds edges connected to vertex v to the priority queue."""
        self.marked[v] = True
        for edge in graph.get_adjacency_list(v):
            if not self.marked[edge.get_other_vertex(v)]:
                heapq.heappush(self.pq, edge)

    def edges(self) -> Iterable[Edge]:
        return self.mst

    def weight(self) -> float:
        return self.weight
```

#### 16.5.2 Eager Implementation

<p><format color = "BlueViolet">Property:</format> </p>

<p>Running time depends on PQ implementation: <math>V</math> insert, 
<math>V</math> delete-min, <math>E</math> decrease-key.</p>

<table style = "header-row">
<tr><td>PQ Implementation</td><td>Insert</td><td>Delete-Min</td><td>
Decrease-Key</td><td>Total</td></tr>
<tr><td>Array</td><td><math>1</math></td><td><math>V</math></td><td>
<math>1</math></td><td><math>V ^ {2}</math></td></tr>
<tr><td>Binary Heap</td><td><math>\log V</math></td><td><math>\log V
</math></td><td><math>\log V</math></td><td><math>E \log V</math>
</td></tr>
<tr><td><p>d-way Heap</p><p>(Johnson 1975)</p></td><td><math>
\log_{d} V</math></td><td><math>d \log_{d} V</math></td><td><math>
\log_{d} V</math></td><td><math>E \log_{\frac {E}{V}} V</math></td>
</tr>
<tr><td><p>Fibonacci Heap</p><p>(Fredman-Tarjan 1984)</p></td>
<td><math>1^{*}</math></td><td><math>\log V ^ {*}</math></td>
<td><math>1^{*}</math></td><td><math>E + \log V</math></td></tr>
</table>

<p>*: amortized</p>

<p><format color = "BlueViolet">Bottom Line:</format> </p>

<list type = "bullet">
<li>
    <p>Array implementation optimal for dense graph.</p>
</li>
<li>
    <p>Binary heap much faster for sparse graphs.</p>
</li>
<li>
    <p>4-way heap worth the trouble in performance-critical 
    situations.</p>
</li>
<li>
    <p>Fibonacci heap best in theory, but not worth implementing.</p>
</li>
</list>

Java

```Java
import java.util.ArrayList;
import java.util.List;

public class PrimMST {
    private final boolean[] marked;
    private final Edge[] edgeTo;
    private final double[] distTo; 
    private final IndexedPriorityQueue pq; 
    private final List<Edge> mst; 

    public PrimMST(EdgeWeightedGraph graph) {
        marked = new boolean[graph.getVertices()];
        edgeTo = new Edge[graph.getVertices()];
        distTo = new double[graph.getVertices()];
        pq = new IndexedPriorityQueue(graph.getVertices());
        mst = new ArrayList<>();

        for (int v = 0; v < graph.getVertices(); v++) {
            distTo[v] = Double.POSITIVE_INFINITY;
        }
        distTo[0] = 0.0;
        pq.insert(0, 0.0);
        while (!pq.isEmpty()) {
            visit(graph, pq.delMin());
        }
    }

    private void visit(EdgeWeightedGraph graph, int vertex) {
        marked[vertex] = true;
        for (Edge edge : graph.getAdjacencyList(vertex)) {
            int w = edge.getOtherVertex(vertex);
            if (marked[w]) continue;
            if (edge.getWeight() < distTo[w]) {
                edgeTo[w] = edge;
                distTo[w] = edge.getWeight();
                if (pq.contains(w)) {
                    pq.decreaseKey(w, distTo[w]);
                } else {
                    pq.insert(w, distTo[w]);
                }
            }
        }
    }

    public Iterable<Edge> edges() {
        for (int v = 1; v < edgeTo.length; v++) {
            if (edgeTo[v] != null) {
                mst.add(edgeTo[v]);
            }
        }
        return mst;
    }

    public double weight() {
        double weight = 0.0;
        for (Edge edge : mst) {
            weight += edge.getWeight();
        }
        return weight;
    }
}
```

C++

```C++
#include "IndexedPriorityQueue.h"
#include "EdgeWeightedGraph.h"
#include <vector>
#include <limits>

class PrimMST {
private:
    std::vector<bool> marked;
    std::vector<Edge> edgeTo;
    std::vector<double> distTo;
    IndexedPriorityQueue pq;
    std::vector<Edge> mst;

    void visit(const EdgeWeightedGraph& graph, int vertex) {
        marked[vertex] = true;
        for (const Edge& edge : graph.getAdjacencyList(vertex)) {
            const int w = edge.getOtherVertex(vertex);
            if (marked[w]) continue;
            if (edge.getWeight() < distTo[w]) {
                edgeTo[w] = edge;
                distTo[w] = edge.getWeight();
                if (pq.contains(w)) {
                    pq.decreaseKey(w, distTo[w]);
                } else {
                    pq.insert(w, distTo[w]);
                }
            }
        }
    }

public:
    explicit PrimMST(const EdgeWeightedGraph& graph) :
        marked(graph.getVertices(), false),
        edgeTo(graph.getVertices()),
        distTo(graph.getVertices(), std::numeric_limits<double>::infinity()),
        pq(graph.getVertices()) {

        distTo[0] = 0.0;
        pq.insert(0, 0.0);
        while (!pq.isEmpty()) {
            visit(graph, pq.delMin());
        }
    }

    const std::vector<Edge>& edges() {
        mst.clear();
        for (int v = 1; v < edgeTo.size(); v++) {
            if (edgeTo[v].getWeight() != 0.0) {
                mst.push_back(edgeTo[v]);
            }
        }
        return mst;
    }

    [[nodiscard]] double weight() const {
        double weight = 0.0;
        for (const Edge& edge : mst) {
            weight += edge.getWeight();
        }
        return weight;
    }
};
```

Python

```Python
from typing import List, Iterable

from EdgeWeightedGraph import EdgeWeightedGraph, Edge
from IndexedPriorityQueue import IndexedPriorityQueue 


class PrimMSTEager:
    def __init__(self, graph: EdgeWeightedGraph):
        self.marked: List[bool] = [False] * graph.get_vertices()
        self.edge_to: List[Edge] = [None] * graph.get_vertices()
        self.dist_to: List[float] = [float('inf')] * graph.get_vertices()
        self.pq: IndexedPriorityQueue = IndexedPriorityQueue(graph.get_vertices())
        self.mst: List[Edge] = []  # Stores MST edges

        self.dist_to[0] = 0.0  # Initialize source vertex
        self.pq.insert(0, 0.0)

        while not self.pq.is_empty():
            self._visit(graph, self.pq.del_min())

    def _visit(self, graph: EdgeWeightedGraph, vertex: int):
        self.marked[vertex] = True
        for edge in graph.get_adjacency_list(vertex):
            w: int = edge.get_other_vertex(vertex)
            if self.marked[w]:
                continue

            if edge.get_weight() < self.dist_to[w]:
                self.dist_to[w] = edge.get_weight()
                self.edge_to[w] = edge
                if self.pq.contains(w):
                    self.pq.decrease_key(w, self.dist_to[w])
                else:
                    self.pq.insert(w, self.dist_to[w])

    def edges(self) -> Iterable[Edge]:
        """Returns an iterable of edges in the MST."""
        for v in range(1, len(self.edge_to)):
            if self.edge_to[v] is not None:
                self.mst.append(self.edge_to[v])
        return self.mst

    def weight(self) -> float:
        """Returns the total weight of the MST."""
        return sum(edge.get_weight() for edge in self.mst)
```

### 16.6 MST Context

#### 16.6.1 Euclidean MST

<p><format color = "OrangeRed">Euclidean MST:</format> Given <math>N
</math> points in the plane, find MST connecting them, where the
distances between point pairs are their <format color = 
"OrangeRed">Euclidean</format> distances.</p>

<p><format color = "LawnGreen">Methods:</format> Exploit geometry
and do it in <math>\sim cN \log N</math></p>

#### 16.6.2 Single Link Clustering

<p><format color = "BlueViolet">Definitions:</format> </p>

<list type = "bullet">
<li>
    <p><format color = "DarkOrange">k-clustering:</format> Divide
    a set of objects calssify into <math>k</math> coherent groups.</p>
</li>
<li>
    <p><format color = "DarkOrange">Distance Function:</format> 
    Numeric value specifying "closeness" of two objects.</p>
</li>
<li>
    <p><format color = "DarkOrange">Single link:</format> Distance 
    between two clusters equals the distance between the two closest
    objects (one in each cluster).</p>
</li>
<li>
    <p><format color = "DarkOrange">Single-link clustering:</format> 
    Given an integer k, find a k-clustering that maximizes the 
    distance between two closest clusters.</p>
</li>
</list>

<img src = "../images_data/16-6-1.png" alt = "Clustering"/>

<procedure title = '"Well-known" algorithm in science literature for single-link clustering:'>
    <step>
        <p>Form <math>V</math> clusters of one object each.</p>
    </step>
    <step>
        <p>Find the closest pair of objects such that each object is 
        in a different cluster, and merge the two clusters.</p>
    </step>
    <step>
        <p>Repeat until there are exactly <math>k</math> clusters.</p>
    </step>
</procedure>

<note>
<p>This is Kruskal's algorithm (stop when <math>k</math> connected 
components).</p>
<p>Run Prim's algorithm and delete <math>k–1</math> max weight edges.</p>
</note>

<p><format color = "BlueViolet">Applications:</format> </p>

<list>
<li>
<p>Routing in mobile ad hoc networks.</p>
</li>
<li>
<p>Document categorization for web search.</p>
</li>
<li>
<p>Similarity searching in medical image databases.</p>
</li>
<li>
<p>Skycat: cluster <math>10 ^ {9}</math> sky objects into stars, 
quasars, galaxies.</p>
</li>
</list>

### 16.7 Important Questions

<list type = "decimal">
<li>
    <p><format color = "Fuchsia">Q: Bottleneck minimum spanning tree:
    </format> Given a connected edge-weighted graph, design an 
    efficient algorithm to find a minimum bottleneck spanning tree. 
    The bottleneck capacity of a spanning tree is the weights of its 
    largest edge. A minimum bottleneck spanning tree is a spanning 
    tree of minimum bottleneck capacity.</p>
    <p><format color = "LawnGreen">A:</format> Prove that an MST is 
    a minimum bottleneck spanning tree.</p>
</li>
<li>
    <p><format color = "Fuchsia">Q: Is an edge in a MST:</format> 
    Given an edge-weighted graph <math>G</math> and an edge <math>e
    </math>, design a linear-time algorithm to determine whether 
    <math>e</math> appears in some MST of <math>G</math>.</p>
    <p>Note: Since your algorithm must take linear time in the worst
    case, you cannot afford to compute the MST itself.</p>
    <p><format color = "LawnGreen">A:</format> Consider the subgraph 
    <math>G'</math> of <math>G</math> containing only those edges 
    whose weight is strictly less than that of <math>e</math>.</p>
</li>
<li>
    <p><format color = "Fuchsia">Q: Minimum-weight feedback edge set:
    </format> A feedback edge set of a graph is a subset of edges that
    contains at least one edge from every cycle in the graph. If the 
    edges of a feedback edge set are removed, the resulting graph is 
    acyclic. Given an edge-weighted graph, design an efficient 
    algorithm to find a feedback edge set of minimum weight. Assume 
    the edge weights are positive.</p>
    <p><format color = "LawnGreen">A:</format> Complement of an MST.
    </p>
</li>
</list>

## 17 Shortest Paths

### 17.1 Shortest Paths APIs

<p><format color = "BlueViolet">Goal:</format> Given an edge-weighted
digraph, find the shortest path from <math>s</math> to <math>t</math>
.</p>

<list type = "bullet">
<li>
<p>Navigation.</p>
</li>
<li>
<p>PERT/CPM.</p>
</li>
<li>
<p>Map routing.</p>
</li>
<li>
<p>Seam carving.</p>
</li>
<li>
<p>Robot navigation.</p>
</li>
<li>
<p>Texture mapping.</p>
</li>
<li>
<p>Typesetting in TeX.</p>
</li>
<li>
<p>Urban traffic planning.</p>
</li>
<li>
<p>Optimal pipelining of VLSI chip.</p>
</li>
<li>
<p>Telemarketer operator scheduling.</p>
</li>
<li>
<p>Routing of telecommunications messages.</p>
</li>
<li>
<p>Network routing protocols (OSPF, BGP, RIP).</p>
</li>
<li>
<p>Exploiting arbitrage opportunities in currency exchange.</p>
</li>
<li>
<p>Optimal truck routing through given traffic congestion pattern.</p>
</li>
</list>

<note>
<p>Here are the implementations of Edge Weighted Digraphs.</p>
</note>

Java (DirectedEdge.java)

```Java
public class DirectedEdge { 
    private final int v; 
    private final int w; 
    private final double weight;

    public DirectedEdge(int v, int w, double weight) {
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

    @Override
    public String toString() {
        return v + "->" + w + " " + String.format("%5.2f", weight);
    }
}
```

Java (EdgeWeightedDigraph.java)

```Java
import java.util.ArrayList;
import java.util.List;

public class EdgeWeightedDigraph {
    private final int V;
    private final List<DirectedEdge>[] adj;

    public EdgeWeightedDigraph(int V) {
        this.V = V;
        adj = (List<DirectedEdge>[]) new ArrayList[V];
        for (int v = 0; v < V; v++)
            adj[v] = new ArrayList<DirectedEdge>();
    }

    public void addEdge(int source, int destination, double weight) {
        DirectedEdge e = new DirectedEdge(source, destination, weight);
        adj[source].add(e);
    }

    public Iterable<DirectedEdge> adj(int v) {
        return adj[v];
    }

    public int V() {
        return V;
    }

    public int E() {
        int count = 0;
        for (int v = 0; v < V; v++)
            count += adj[v].size();
        return count;
    }

    public String toString() {
        StringBuilder s = new StringBuilder();
        s.append(V).append(" vertices, ").append(E()).append(" edges ").append("\n");
        for (int v = 0; v < V; v++) {
            s.append(v).append(": ");
            for (DirectedEdge e : adj[v]) {
                s.append(e).append("  ");
            }
            s.append("\n");
        }
        return s.toString();
    }
}
```

C++ (DirectedEdge.h)

```C++
#ifndef DIRECTEDEDGE_H
#define DIRECTEDEDGE_H

#include <ostream>

class DirectedEdge {
private:
    int v;
    int w;
    double weight;

public:
    explicit DirectedEdge(int v = -1, int w = -1, double weight = 0.0); // Default constructor added
    [[nodiscard]] int from() const;
    [[nodiscard]] int to() const;
    [[nodiscard]] double getWeight() const;
    friend std::ostream& operator<<(std::ostream& out, const DirectedEdge& e);
};

#endif // DIRECTEDEDGE_H
```

C++ (DirectedEdge.cpp)

```C++
#include "DirectedEdge.h"
#include <iostream>

DirectedEdge::DirectedEdge(const int v, const int w, const double weight)
: v(v), w(w), weight(weight) {}

int DirectedEdge::from() const {
    return v;
}

int DirectedEdge::to() const {
    return w;
}

double DirectedEdge::getWeight() const {
    return weight;
}

std::ostream& operator<<(std::ostream& out, const DirectedEdge& e) {
    out << e.v << "->" << e.w << " " << e.weight;
    return out;
}
```

C++ (EdgeWeightedDigraph.h)

```C++
#ifndef EDGEWEIGHTEDDIGRAPH_H
#define EDGEWEIGHTEDDIGRAPH_H

#include "DirectedEdge.h"
#include <vector>
#include <iostream>

class EdgeWeightedDigraph {
private:
    int V;
    std::vector<std::vector<DirectedEdge>> adj;

public:
    explicit EdgeWeightedDigraph(int V);
    void addEdge(int source, int destination, double weight);
    [[nodiscard]] std::vector<DirectedEdge> getAdj(int v) const;
    [[nodiscard]] int getV() const;
    [[nodiscard]] int getE() const;
    friend std::ostream& operator<<(std::ostream& out, const EdgeWeightedDigraph& G);
};

#endif // EDGEWEIGHTEDDIGRAPH_H
```

C++ (EdgeWeightedDigraph.cpp)

```C++
#include "EdgeWeightedDigraph.h"

EdgeWeightedDigraph::EdgeWeightedDigraph(const int V) : V(V), adj(V) {}

void EdgeWeightedDigraph::addEdge(const int source, const int destination,
    const double weight) {
    const DirectedEdge e(source, destination, weight);
    adj[source].push_back(e);
}

std::vector<DirectedEdge> EdgeWeightedDigraph::getAdj(const int v) const {
    return adj[v];
}

int EdgeWeightedDigraph::getV() const {
    return V;
}

int EdgeWeightedDigraph::getE() const {
    std::size_t count = 0;
    for (int v = 0; v < V; ++v) {
        count += adj[v].size();
    }
    return static_cast<int>(count);
}

std::ostream& operator<<(std::ostream& out, const EdgeWeightedDigraph& G) {
    out << G.V << " vertices, " << G.getE() << " edges\n";
    for (int v = 0; v < G.V; ++v) {
        out << v << ": ";
        for (const auto& e : G.adj[v]) {
            out << e << "  ";
        }
        out << "\n";
    }
    return out;
}
```

Python (DirectedEdge.py)

```Python
class DirectedEdge:
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

    def __str__(self):
        return f"{self.v}->{self.w} ({self.weight})"
```

Python (EdgeWeightedDigraph.py)

```Python
from DirecteEdge import DirectedEdge


class EdgeWeightedDigraph:
    def __init__(self, V):
        self.V = V
        self.adj = [[] for _ in range(V)]

    def add_edge(self, source, destination, weight):
        e = DirectedEdge(source, destination, weight)
        self.adj[source].append(e)

    def get_adj(self, v):
        return self.adj[v]

    def get_V(self):
        return self.V

    def get_E(self):
        count = 0
        for v in range(self.V):
            count += len(self.adj[v])
        return count

    def __str__(self):
        s = f"{self.V} vertices, {self.get_E()} edges\n"
        for v in range(self.V):
            s += f"{v}: "
            for e in self.adj[v]:
                s += f"{e}  "
            s += "\n"
        return s
```

### 17.2 Shortest Path Properties

<procedure title = "Edge Relaxation" type = "choices">
    <step>
        <p><code>distTo[v]</code> is length of shortest <format color 
        = "OrangeRed">known</format> path from <math>s</math> to 
        <math>v</math>.</p>
    </step>
    <step>
        <p><code>distTo[w]</code> is length of shortest <format color 
        = "OrangeRed">known</format> path from <math>s</math> to 
        <math>w</math>.</p>
    </step>
    <step>
        <p><code>edgeTo[w]</code> is last edge on shortest <format color 
        = "OrangeRed">known</format> path from <math>s</math> to 
        <math>w</math>.</p>
    </step>
    <step>
        <p>If <math>e = v→w</math> gives shorter path to <math>w
        </math> through <math>v</math>, update both <code>distTo[w]
        </code> and <code>edgeTo[w]</code>.</p>
    </step>
</procedure>

<img src = "../images_data/17-2-1.png" alt = "Edge Relaxation"/>

<p><format color = "BlueViolet">Correctness Proof:</format> 
Shortest-paths optimality conditions</p>

<p>Let <math>G</math> be an edge-weighted digraph.</p>
<p>Then <code>distTo[]</code> are the shortest path distances from 
<math>s</math> iff:</p>

<list>
<li>
<p>distTo[s] = 0.</p>
</li>
<li>
<p>For each vertex v, distTo[v] is the length of some path from 
<math>s</math> to <math>v</math>.</p>
</li>
<li>
<p>For each edge <math>e = v→w</math>, 
distTo[w] &leq; distTo[v] + e.weight().</p>
</li>
</list>

<p><format color = "IndianRed">Proof:</format> </p>

<list type = "bullet">
<li>
<p>Suppose that <math>s = v_{0} → v_{1} → v_{2} → … → v_{k} = w</math> 
is a shortest path from <math>s</math> to <math>w</math>.</p>
</li>
<li>
<p>Then, </p>
<code-block lang = "tex">
\begin{align*}
\text{distTo}[v_{1}] & = \text{distTo}[v_{0}] + \text{e}_{1}.\text{weight}() \\
\text{distTo}[v_{2}] & = \text{distTo}[v_{2}] + \text{e}_{2}.\text{weight}() \\
... \\
\text{distTo}[v_{k}] & = \text{distTo}[v_{k - 1}] + \text{e}_{k}.\text{weight}() \\
\end{align*}
</code-block>
<p><math>\text{e}_{i}</math> = <math>\text{i}^{\text{th}}</math> edge
on shortest path from <math>s</math> to <math>w</math>.</p>
</li>
<li>
<p>Add inequalities; simplify; and substitute 
<math>\text{distTo}[v_{0}] = \text{distTo}[s] = 0</math></p>
<code-block lang = "tex">
\text{distTo}[w] = \text{distTo}[v_{k}] \leq \text{e}_{1}.\text{weight}()
+ \text{e}_{2}.\text{weight}() + ... + \text{e}_{k}.\text{weight}()
</code-block>
<p><math>\text{e}_{1}.\text{weight}() + \text{e}_{2}.\text{weight}() 
+ ... + \text{e}_{k}.\text{weight}()</math> is the weight of shortest 
path from <math>s</math> to <math>w</math>.</p>
</li>
<li>
<p>Thus, <code>distTo[w]</code> is the weight of shortest path to 
<math>w</math>.</p>
</li>
</list>

<p><format color = "BlueViolet">Different Implementations:</format> 
</p>

<list type = "bullet">
<li>
    <p>Dijkstra's algorithm (nonnegative weights).</p>
</li>
<li>
    <p>Topological sort algorithm (no directed cycles).</p>
</li>
<li>
    <p>Bellman-Ford algorithm (no negative cycles).</p>
</li>
</list>

### 17.3 Dijkstra's Algorithm

<procedure title = "Dijkstra's Algorithm">
<step>
    <p>Consider vertices in increasing order of distance from s.</p>
    <p>(non-tree vertex with the lowest <code>distTo[]</code> value)
    </p>
</step>
<step>
    <p>Add vertex to tree and relaw all edges pointing from that vertex.
    </p>
</step>
</procedure>

<p><format color = "BlueViolet">Correctness Proof:</format> Dijkstra's 
algorithm computes a SPT in any edge-weighted digraph with 
<format color = "OrangeRed">nonnegative</format> weights.</p>

<list type = "bullet">
<li>
    <p>Each edge <math>e = v→w</math> is relaxed exactly once 
    (when v is relaxed), leaving 
    <math>\text{distTo}[w] ≤ \text{distTo}[v] + \text{e.weight()}</math>.</p>
</li>
<li>
    <p>Inequality holds until algorithm terminates because: </p>
    <list type = "bullet">
    <li>
        <p><code>distTo[w]</code> cannot increase => <code>distTo[]
        </code> values are monotone decreasing.</p>
    </li>
    <li>
        <p><code>distTo[v]</code> will not change => we choose lowest
        <code>distTo[]</code> value at each step and edge weights are
        nonnegative)</p>
    </li>
    </list>
</li>
<li>
    <p>Thus, upon termination, shortest-paths optimality conditions 
    hold.</p>
</li>
</list>

<p><format color = "BlueViolet">Prim’s algorithm is essentially the 
same algorithm as Dijkstra’s algorithm</format></p>

<list type = "bullet">
<li>
    <p>Both are in a family of algorithms that compute a graph's 
    spanning tree.</p>
</li>
<li>
    <p><format color = "Fuchsia">Prim's</format>: Closest vertex to 
    the <format color = "OrangeRed">tree</format> (via an undirected 
    edge).</p>
</li>
<li>
    <p><format color = "Fuchsia">Dijkstra's</format>: Closest vertex 
    to the <format color = "OrangeRed">source</format> (via a 
    directed path).</p>
</li>
</list>

<note>
<p>DFS and BFS are also in this family of algorithms.</p>
</note>

Java

```Java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

public class Dijkstra {

    private final double[] distTo; 
    private final DirectedEdge[] edgeTo; 
    private final boolean[] marked; 
    private final PriorityQueue<Integer> pq;

    public Dijkstra(EdgeWeightedDigraph G, int s) {
        distTo = new double[G.V()];
        edgeTo = new DirectedEdge[G.V()];
        marked = new boolean[G.V()];
        for (int v = 0; v < G.V(); v++)
            distTo[v] = Double.POSITIVE_INFINITY;
        distTo[s] = 0.0;
        pq = new PriorityQueue<>(Comparator.comparingDouble(v -> distTo[v]));
        pq.offer(s);
        while (!pq.isEmpty()) {
            int v = pq.poll();
            marked[v] = true;
            for (DirectedEdge e : G.adj(v)) {
                relax(e);
            }
        }
    }

    private void relax(DirectedEdge e) {
        int v = e.from();
        int w = e.to();
        if (distTo[w] > distTo[v] + e.weight()) {
            distTo[w] = distTo[v] + e.weight();
            edgeTo[w] = e;
            if (!marked[w]) {
                pq.offer(w);
            }
        }
    }

    public double distTo(int v) {
        return distTo[v];
    }

    public boolean hasPathTo(int v) {
        return distTo[v] < Double.POSITIVE_INFINITY;
    }

    public Iterable<DirectedEdge> pathTo(int v) {
        if (!hasPathTo(v)) return null;
        List<DirectedEdge> path = new ArrayList<>();
        for (DirectedEdge e = edgeTo[v]; e != null; e = edgeTo[e.from()]) {
            path.add(e);
        }
        return path;
    }
}
```

C++ (Dijkstra.h)

```C++
#ifndef DIJKSTRA_H
#define DIJKSTRA_H

#include "EdgeWeightedDigraph.h"
#include <vector>
#include <queue>

class Dijkstra {
private:
    std::vector<double> distTo;
    std::vector<DirectedEdge> edgeTo;
    std::vector<bool> marked;
    std::priority_queue<std::pair<double, int>, std::vector<std::pair<double, int>>,
                        std::greater<>> pq; // Min-heap

    void relax(const DirectedEdge& e);

public:
    explicit Dijkstra(const EdgeWeightedDigraph& G, int s);

    [[nodiscard]] double getdistTo(int v) const;
    [[nodiscard]] bool hasPathTo(int v) const;
    [[nodiscard]] std::vector<DirectedEdge> pathTo(int v) const;
};

#endif // DIJKSTRA_H
```

C++ (Dijkstra.cpp)

```C++
#include "dijkstra.h"
#include <limits>

Dijkstra::Dijkstra(const EdgeWeightedDigraph& G, int s) :
    distTo(G.getV(), std::numeric_limits<double>::infinity()),
    edgeTo(G.getV(), DirectedEdge()),
    marked(G.getV(), false)
{
    distTo[s] = 0.0;
    pq.emplace(0.0, s);

    while (!pq.empty()) {
        int v = pq.top().second;
        pq.pop();

        if (marked[v]) continue; // Already processed

        marked[v] = true;
        for (const auto& e : G.getAdj(v)) {
            relax(e);
        }
    }
}

void Dijkstra::relax(const DirectedEdge& e) {
    int v = e.from();
    int w = e.to();
    if (distTo[w] > distTo[v] + e.getWeight()) {
        distTo[w] = distTo[v] + e.getWeight();
        edgeTo[w] = e;
        pq.emplace(distTo[w], w);
    }
}

double Dijkstra::getdistTo(int v) const {
    return distTo[v];
}

bool Dijkstra::hasPathTo(int v) const {
    return distTo[v] < std::numeric_limits<double>::infinity();
}

std::vector<DirectedEdge> Dijkstra::pathTo(int v) const {
    if (!hasPathTo(v)) return {};
    std::vector<DirectedEdge> path;
    for (DirectedEdge e = edgeTo[v]; e.from() != -1; e = edgeTo[e.from()]) {
        path.push_back(e);
    }
    return path;
}
```

Python

```Python
from EdgeWeightedDigraph import EdgeWeightedDigraph
import heapq


class Dijkstra:
    def __init__(self, G, s):
        self.distTo = [float('inf')] * G.get_V()
        self.edgeTo = [None] * G.get_V()
        self.marked = [False] * G.get_V()
        self.pq = []  # Priority queue (min-heap)

        self.distTo[s] = 0.0
        heapq.heappush(self.pq, (0.0, s))

        while self.pq:
            _, v = heapq.heappop(self.pq)

            if self.marked[v]:
                continue

            self.marked[v] = True
            for e in G.get_adj(v):
                self.relax(e)

    def relax(self, e):
        v = e.from_vertex()
        w = e.to_vertex()
        if self.distTo[w] > self.distTo[v] + e.get_weight():
            self.distTo[w] = self.distTo[v] + e.get_weight()
            self.edgeTo[w] = e
            heapq.heappush(self.pq, (self.distTo[w], w))

    def dist_to(self, v):
        return self.distTo[v]

    def has_path_to(self, v):
        return self.distTo[v] < float('inf')

    def path_to(self, v):
        if not self.has_path_to(v):
            return None
        path = []
        # Correct the for loop syntax
        for e in reversed(self.edgeTo[v:v + 1]):  # Reverse the path
            if e is not None:
                path.append(e)
        return path
```

<p><format color = "BlueViolet">Property:</format> </p>

<p>Running time depends on PQ implementation: <math>V</math> insert, 
<math>V</math> delete-min, <math>E</math> decrease-key.</p>

<table style = "header-row">
<tr><td>PQ Implementation</td><td>Insert</td><td>Delete-Min</td><td>
Decrease-Key</td><td>Total</td></tr>
<tr><td>Array</td><td><math>1</math></td><td><math>V</math></td><td>
<math>1</math></td><td><math>V ^ {2}</math></td></tr>
<tr><td>Binary Heap</td><td><math>\log V</math></td><td><math>\log V
</math></td><td><math>\log V</math></td><td><math>E \log V</math>
</td></tr>
<tr><td><p>d-way Heap</p><p>(Johnson 1975)</p></td><td><math>
\log_{d} V</math></td><td><math>d \log_{d} V</math></td><td><math>
\log_{d} V</math></td><td><math>E \log_{\frac {E}{V}} V</math></td>
</tr>
<tr><td><p>Fibonacci Heap</p><p>(Fredman-Tarjan 1984)</p></td>
<td><math>1^{*}</math></td><td><math>\log V ^ {*}</math></td>
<td><math>1^{*}</math></td><td><math>E + \log V</math></td></tr>
</table>

<p>*: amortized</p>

<p><format color = "BlueViolet">Bottom Line:</format> </p>

<list type = "bullet">
<li>
    <p>Array implementation optimal for dense graph.</p>
</li>
<li>
    <p>Binary heap much faster for sparse graphs.</p>
</li>
<li>
    <p>4-way heap worth the trouble in performance-critical 
    situations.</p>
</li>
<li>
    <p>Fibonacci heap best in theory, but not worth implementing.</p>
</li>
</list>

### 17.4 Edge-Weighted DAGs

<procedure title = "Topological Sort Algorithm for Shortest Path">
    <step>Consider all vertices in topological order.</step>
    <step>Relax all edges pointing from that vertex.</step>
</procedure>

<format color = "BlueViolet">Property:</format> Topological sort 
algorithm computes SPT in any edgeweighted DAG in time proportional 
to <math>E + V</math>.

<list type = "bullet">
<li>
    <p>Each edge <math>e = v→w</math> is relaxed exactly once 
    (when v is relaxed), leaving 
    <math>\text{distTo}[w] ≤ \text{distTo}[v] + \text{e.weight()}</math>.</p>
</li>
<li>
    <p>Inequality holds until algorithm terminates because: </p>
    <list type = "bullet">
    <li>
        <p><code>distTo[w]</code> cannot increase => <code>distTo[]
        </code> values are monotone decreasing.</p>
    </li>
    <li>
        <p><code>distTo[v]</code> will not change => we choose lowest
        <code>distTo[]</code> value at each step and edge weights are
        nonnegative)</p>
    </li>
    </list>
</li>
<li>
    <p>Thus, upon termination, shortest-paths optimality conditions 
    hold.</p>
</li>
</list>

<p><format color = "BlueViolet">Longest paths in edge-weighted DAGs:
</format> </p>

<p>Formulate as a shortest paths problem in edge-weighted DAGs.</p>

<list type = "bullet">
<li>
    <p>Negate all weights.</p>
</li>
<li>
    <p>Find shortest paths.</p>
</li>
<li>
    <p>Negate weights in result.</p>
</li>
</list>

<note>
<p>Topological sort algorithm works even with negative weights.</p>
</note>

Java

```Java
import java.util.*;

public class ShortestPathTopological {

    private final EdgeWeightedDigraph graph;
    private final int source;
    private final double[] distTo;
    private final DirectedEdge[] edgeTo;

    public ShortestPathTopological(EdgeWeightedDigraph graph, int source) {
        this.graph = graph;
        this.source = source;
        distTo = new double[graph.V()];
        edgeTo = new DirectedEdge[graph.V()];

        for (int v = 0; v < graph.V(); v++) {
            distTo[v] = Double.POSITIVE_INFINITY;
        }
        distTo[source] = 0.0;

        TopologicalSort topologicalSort = new TopologicalSort();
        List<Integer> sorted = topologicalSort.sort(graph);

        for (int v : sorted) {
            relax(v);
        }
    }

    private void relax(int v) {
        for (DirectedEdge edge : graph.adj(v)) {
            int w = edge.to();
            if (distTo[w] > distTo[v] + edge.weight()) {
                distTo[w] = distTo[v] + edge.weight();
                edgeTo[w] = edge;
            }
        }
    }

    public double distTo(int v) {
        return distTo[v];
    }

    public boolean hasPathTo(int v) {
        return distTo[v] < Double.POSITIVE_INFINITY;
    }

    public Iterable<DirectedEdge> pathTo(int v) {
        if (!hasPathTo(v)) return null;
        List<DirectedEdge> path = new ArrayList<>();
        for (DirectedEdge e = edgeTo[v]; e != null; e = edgeTo[e.from()]) {
            path.addFirst(e); 
        }
        return path;
    }

    private static class TopologicalSort {
        public List<Integer> sort(EdgeWeightedDigraph graph) {
            int V = graph.V();
            List<Integer> sorted = new ArrayList<>();
            int[] inDegree = new int[V];
            Queue<Integer> queue = new LinkedList<>();

            for (int v = 0; v < V; v++) {
                for (DirectedEdge edge : graph.adj(v)) {
                    inDegree[edge.to()]++;
                }
            }

            for (int v = 0; v < V; v++) {
                if (inDegree[v] == 0) {
                    queue.offer(v);
                }
            }

            while (!queue.isEmpty()) {
                int u = queue.poll();
                sorted.add(u);

                for (DirectedEdge edge : graph.adj(u)) {
                    int v = edge.to();
                    inDegree[v]--;
                    if (inDegree[v] == 0) {
                        queue.offer(v);
                    }
                }
            }

            if (sorted.size() != V) {
                throw new IllegalArgumentException("Graph contains a cycle.");
            }

            return sorted;
        }
    }
}
```

C++ (ShortestPathTopological.h)

```C++
#ifndef SHORTESTPATHTOPOLOGICAL_H
#define SHORTESTPATHTOPOLOGICAL_H

#include "EdgeWeightedDigraph.h"
#include <vector>

class ShortestPathTopological {
private:
    const EdgeWeightedDigraph& graph;
    int source;
    std::vector<double> distTo;
    std::vector<DirectedEdge> edgeTo;

    class TopologicalSort {
    public:
        explicit TopologicalSort(const EdgeWeightedDigraph& graph);
        [[nodiscard]] std::vector<int> sort() const;
    private:
        const EdgeWeightedDigraph& graph;
    };

    void relax(int v);

public:
    explicit ShortestPathTopological(const EdgeWeightedDigraph& graph, int source);

    [[nodiscard]] double getdistTo(int v) const; // Declaration marked const

    [[nodiscard]] bool hasPathTo(int v) const; // Declaration marked const

    [[nodiscard]] std::vector<DirectedEdge> pathTo(int v) const; // Declaration marked const
};

#endif // SHORTESTPATHTOPOLOGICAL_H
```

C++ (ShortestPathTopological.cpp)

```C++
#include "ShortestPathTopological.h"

#include <algorithm>
#include <iostream>
#include <queue>
#include <limits>

ShortestPathTopological::ShortestPathTopological(const EdgeWeightedDigraph &graph, int source)
    : graph(graph), source(source), distTo(graph.getV(), std::numeric_limits<double>::infinity()),
      edgeTo(graph.getV()) {
    distTo[source] = 0.0;

    TopologicalSort topologicalSort(graph);
    std::vector<int> sorted = topologicalSort.sort();

    for (int v : sorted) {
        relax(v);
    }
}

void ShortestPathTopological::relax(const int v) {
    for (const DirectedEdge& edge : graph.getAdj(v)) {
        int w = edge.to();
        if (distTo[w] > distTo[v] + edge.getWeight()) {
            distTo[w] = distTo[v] + edge.getWeight();
            edgeTo[w] = edge;
        }
    }
}

double ShortestPathTopological::getdistTo(const int v) const {
    return distTo[v];
}

bool ShortestPathTopological::hasPathTo(const int v) const {
    return distTo[v] < std::numeric_limits<double>::infinity();
}

std::vector<DirectedEdge> ShortestPathTopological::pathTo(const int v) const {
    std::vector<DirectedEdge> path;
    if (!hasPathTo(v)) {
        return path;
    }

    for (DirectedEdge e = edgeTo[v]; e.from() != -1; e = edgeTo[e.from()]) {
        path.push_back(e);
    }
    std::ranges::reverse(path);
    return path;
}

ShortestPathTopological::TopologicalSort::TopologicalSort(const EdgeWeightedDigraph &graph) : graph(graph) {}

std::vector<int> ShortestPathTopological::TopologicalSort::sort() const {
    const int V = graph.getV();
    std::vector<int> sorted;
    std::vector<int> inDegree(V, 0);
    std::queue<int> queue;

    for (int v = 0; v < V; ++v) {
        for (const DirectedEdge& e : graph.getAdj(v)) {
            inDegree[e.to()]++;
        }
    }

    for (int v = 0; v < V; ++v) {
        if (inDegree[v] == 0) {
            queue.push(v);
        }
    }

    while (!queue.empty()) {
        int u = queue.front();
        queue.pop();
        sorted.push_back(u);

        for (const DirectedEdge& e : graph.getAdj(u)) {
            int w = e.to();
            if (--inDegree[w] == 0) {
                queue.push(w);
            }
        }
    }

    if (sorted.size() != static_cast<size_t>(V)) {
        throw std::runtime_error("Graph contains a cycle!");
    }
    return sorted;
}
```

Python

```Python
from collections import deque
from typing import List, Optional

from DirectedEdge import DirectedEdge
from EdgeWeightedDigraph import EdgeWeightedDigraph


class ShortestPathTopological:
    def __init__(self, graph: EdgeWeightedDigraph, source: int):
        self.graph = graph
        self.source = source
        self.dist_to = [float('inf')] * graph.get_V()
        self.edge_to: List[Optional[DirectedEdge]] = [None] * graph.get_V()
        self.dist_to[source] = 0.0

        topological_order = self._topological_sort()
        for v in topological_order:
            self._relax(v)

    def _relax(self, v: int):
        for edge in self.graph.get_adj(v):
            w = edge.to_vertex()
            if self.dist_to[w] > self.dist_to[v] + edge.get_weight():
                self.dist_to[w] = self.dist_to[v] + edge.get_weight()
                self.edge_to[w] = edge

    def get_dist_to(self, v: int) -> float:
        return self.dist_to[v]

    def has_path_to(self, v: int) -> bool:
        return self.dist_to[v] < float('inf')

    def path_to(self, v: int) -> Optional[List[str]]:
        if not self.has_path_to(v):
            return None
        path: List[DirectedEdge] = []
        e = self.edge_to[v]
        while e is not None:
            path.append(e)
            e = self.edge_to[e.from_vertex()]
        return [str(edge) for edge in path[::-1]]

    def _topological_sort(self) -> List[int]:
        V = self.graph.get_V()
        in_degree = [0] * V
        for v in range(V):
            for edge in self.graph.get_adj(v):
                in_degree[edge.to_vertex()] += 1

        queue = deque([v for v in range(V) if in_degree[v] == 0])
        sorted_order = []
        while queue:
            u = queue.popleft()
            sorted_order.append(u)
            for edge in self.graph.get_adj(u):
                v = edge.to_vertex()
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    queue.append(v)

        if len(sorted_order) != V:
            raise ValueError("Graph contains a cycle.")

        return sorted_order
```

<p><format color = "BlueViolet">Application &#8544; - Content-Aware 
Resizing</format></p>

<p><format color = "DarkOrange">Seam Carving:</format> Resize an image 
without distortion for display on cell phones and web browsers.</p>

<list type = "bullet">
<li>
    <p>Grid DAG: vertex = pixel; edge = from pixel to 3 downward 
    neighbors.</p>
</li>
<li>
    <p>Weight of pixel = energy function of 8 neighboring pixels.
    </p>
</li>
<li>
    <p>Seam = shortest path (sum of vertex weights) from top to 
    bottom.</p>
</li>
</list>

<img src = "../images_data/17-4-1.png" alt = "Seam Carving"/>

<p><format color = "BlueViolet">Application &#8545; - Parallel Job 
Scheduling</format></p>

<p><format color = "DarkOrange">Parallel Job Scheduling:</format> 
Given a set of jobs with durations and precedence constraints, 
schedule the jobs (by finding a start time for each) so as to achieve
the minimum completion time, while respecting the constraints.</p>

<p>To solve a parallel job-scheduling problem, create edge-weighted 
DAG, use <format color = "OrangeRed">longest path</format> from the 
source to schedule each job:</p>

<list>
<li>
<p>Source and sink vertices.</p>
</li>
<li>
<p>Two vertices (begin and end) for each job.</p>
</li>
<li>
<p>Three edges for each job.</p>
    <list>
    <li>
    <p>begin to end (weighted by duration)</p>
    </li>
    <li>
    <p>source to begin (0 weight)</p>
    </li>
    <li>
    <p>end to sink (0 weight)</p>
    </li>
    </list>
</li>
<li>One edge for each precedence constraint (0 weight).</li>
</list>

<img src = "../images_data/17-4-2.png" alt = "Parallel Job Scheduling"
/>

<img src = "../images_data/17-4-3.png" alt = "Parallel Job Scheduling"
/>

### 17.5 Negative Weights

<p><format color = "DarkOrange">Negative Cycle:</format> A <format 
color = "OrangeRed">negative cycle</format> is a directed cycle whose
sum of edge weights is negative.</p>

<note>
<p>Assuming all vertices reachable from s, a SPT exists iff no 
negative cycles.</p>
</note>

<procedure title = "Bellman-Ford Algorithm">
<step>
    <p>Initialize distTo[s] = 0 and distTo[v] = &infin; for all 
    other vertices.</p>
</step>
<step>
    <p>Repeat V times, relax each edge.</p>
</step>
</procedure>

<p><format color = "BlueViolet">Practical Improvement:</format> If 
distTo[v] does not change during pass <math>i</math>, no need to 
relax any edge pointing from v in pass <math>i+1</math> => 
maintain <format color = "OrangeRed">queue</format> of vertices 
whose distTo[] changed.</p>

<table style = "header-row">
<tr><td>Algorithm</td><td>Restriction</td><td>Typical Case</td>
<td>Worst Case</td><td>Extra Space</td></tr>
<tr><td><format style = "bold">Topological Sort</format></td>
<td>No Directed Cycles</td><td><math>E + V</math></td>
<td><math>E + V</math></td><td><math>V</math>
</td></tr>
<tr><td><format style = "bold"><p>Dijkstra</p><p>(Binary Heap)</p>
</format></td><td>No Negative Weights</td><td><math>E \log V</math>
</td><td><math>E \log V</math></td><td><math>V</math></td></tr>
<tr><td><format style = "bold">Bellman-Ford</format></td><td 
rowspan="2">No Negative Cycles</td><td><math>EV</math></td><td>
<math>EV</math></td><td><math>V</math></td></tr>
<tr><td><format style = "bold"><p>Bellman-Ford</p><p>(queue-based)</p>
</format></td><td><math>E + V</math></td><td><math>EV</math></td>
<td><math>V</math></td></tr></table>

<warning>
<list type = "alpha-lower">
<li>
<p>Directed cycles make the problem harder.</p>
</li>
<li>
<p>Negative weights make the problem harder.</p>
</li>
<li>
<p>Negative cycles makes the problem intractable.</p>
</li>
</list>
</warning>

<p><format color = "BlueViolet">Find A Negative Cycle:</format> </p>

<p>If there is a negative cycle, Bellman-Ford gets stuck in loop,
updating distTo[] and edgeTo[] entries of vertices in the cycle.</p>

<p>If any vertex v is updated in phase V, there exists a negative
cycle (and can trace back edgeTo[v] entries to find it).</p>

<p><format color = "BlueViolet">Application - Arbitrage Detection
</format></p>

<p>Currency exchange graph.</p>

<list>
<li>
<p>Vertex = currency.</p>
</li>
<li>
<p>Edge = transaction, with weight equal to exchange rate.</p>
</li>
<li>
<p>Find a directed cycle whose product of edge weights is &gt; 1.</p>
</li>
</list>

<img src = "../images_data/17-5-1.png" alt = "Arbitrage Detection"/>

<procedure title = "">
<step>
    <p>Let weight of edge <math>v→w</math> be <math>- ln</math> 
    (exchange rate from currency <math>v</math> to <math>w</math>).</p>
</step>
<step>
    <p>Multiplication turns to addition; <math>\gt 1</math> turns to 
    <math>\lt 0.</math></p>
</step>
<step>
    <p>Find a directed cycle whose sum of edge weights is <math>\lt 0
    </math> (negative cycle).</p>
</step>
</procedure>

## 18 Maximum Flow and Minimum Cut

