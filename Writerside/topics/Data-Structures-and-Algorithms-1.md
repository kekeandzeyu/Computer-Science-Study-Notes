<show-structure for="chapter" depth="3"></show-structure>

# Part Ⅰ

<primary-label ref="finish"></primary-label>

## 2 Linked Lists

<p>The sentinel reference always points to a sentinel node.</p>

<p>Sentinel code make it easier to reason about code, and also give 
you specific goals to strive for in making sure your code works.</p>

<img src="../images_data/d2-1-1.png" alt="Sentinel Node"/>

### 2.1 Singly Linked Lists

<p>The first item (if it exists) is at <code>sentinel.next</code>.</p>

<p>No need to check for special cases since sentinel node is never 
null!</p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Iterator;
\/
public class SLList implements Iterable&lt;Integer&gt; {
    public static class IntNode {
        public int item;
        public IntNode next;
\/
        public IntNode(int i, IntNode n) {
            item = i;
            next = n;
        }
    }
\/
    private final IntNode sentinel;
    private int size;
\/
    public SLList() {
        sentinel = new IntNode(63, null);
        size = 0;
    }
\/
    public SLList(int x) {
        sentinel = new IntNode(63, null);
        sentinel.next = new IntNode(x, null);
        size = 1;
    }
\/
    public void addFirst(int x) {
        sentinel.next = new IntNode(x, sentinel.next);
        size += 1;
    }
\/
    public void addLast(int x) {
        size += 1;
        IntNode p = sentinel;
        while (p.next != null) {
            p = p.next;
        }
        p.next = new IntNode(x, null);
    }
\/
    public int size() {
        return size;
    }
\/
    public Iterator&lt;Integer&gt; iterator() {
        return new SLListIterator();
    }
\/
    private class SLListIterator implements Iterator&lt;Integer&gt; {
        private IntNode p;
\/
        public SLListIterator() {
            p = sentinel.next; 
        }
\/
        public boolean hasNext() {
            return p != null;
        }
\/
        public Integer next() {
            int returnItem = p.item;
            p = p.next;
            return returnItem;
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
\/
template &lt;typename T&gt;
class SLList {
public:
    class IntNode {
    public:
        T item;
        IntNode* next;
\/
        IntNode(T i, IntNode* n) {
            item = i;
            next = n;
        }
    };
\/
private:
    IntNode* sentinel;
    int size;
\/
public:
    SLList() {
        sentinel = new IntNode(63, nullptr);
        size = 0;
    }
\/
    explicit SLList(T x) {
        sentinel = new IntNode(63, nullptr); 
        sentinel-&gt;next = new IntNode(x, nullptr);
        size = 1;
    }
\/
    void addFirst(T x) {
        sentinel-&gt;next = new IntNode(x, sentinel-&gt;next);
        size += 1;
    }
\/
    void addLast(T x) {
        size += 1;
        IntNode* p = sentinel;
        while (p-&gt;next != nullptr) {
            p = p-&gt;next;
        }
        p-&gt;next = new IntNode(x, nullptr);
    }
\/
    [[nodiscard]] int size_() const {
        return size;
    }
\/
    class iterator {
    private:
        IntNode* current;
\/
    public:
        explicit iterator(IntNode* start) : current(start) {}
\/
        T& operator*() { return current-&gt;item; }
        iterator& operator++() { current = current-&gt;next; return *this; }
        bool operator!=(const iterator& other) const { return current != other.current; }
    };
\/
    iterator begin() { return iterator(sentinel-&gt;next); }
    iterator end() { return iterator(nullptr); }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class SLList:
    class IntNode:
        def __init__(self, i, n):
            self.item = i
            self.next = n
\/
    def __init__(self, x=None): 
        self.sentinel = self.IntNode(None, None)
        self.size = 0
        if x is not None:  # If x is provided, add it as the first element
            self.sentinel.next = self.IntNode(x, None)
            self.size = 1
\/
    def addFirst(self, x):
        self.sentinel.next = self.IntNode(x, self.sentinel.next)
        self.size += 1
\/
    def addLast(self, x):
        p = self.sentinel
        while p.next is not None:
            p = p.next
        p.next = self.IntNode(x, None)
        self.size += 1
\/
    def __len__(self):
        return self.size
\/
    def __iter__(self):
        p = self.sentinel.next
        while p is not None:
            yield p.item
            p = p.next
    </code-block>
    </tab>
</tabs>

### 2.2 Doubly Linked Lists & Deques

<tip>
<p>Doubly linked lists and deques share many similarities.</p>
</tip>

<note>
<p>This is the use of built-in doubly linked lists.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.LinkedList;
\/
public class DLList {
    public static void main(String[] args) {
        LinkedList&lt;String&gt; linkedList = new LinkedList&lt;&gt;();
\/
        linkedList.add("A");
        linkedList.add("B");
        linkedList.addLast("C");
        linkedList.addFirst("D");
        linkedList.add(2, "E");
\/
        System.out.println("Linked list : " + linkedList);
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;list&gt;
#include &lt;iostream&gt;
\/
int main() &#123;
    std::list&lt;int&gt; myList;
\/
    myList.push_back(1);
    myList.push_back(2);
    myList.push_back(3);
\/
    for(auto i : myList) {
        std::cout &lt;&lt; i &lt;&lt; " ";
    }
\/
    return 0;
}
    </code-block>
    </tab>
    <tab title="Python (Deque)">
    <code-block lang="python" collapsible="true">
from collections import deque
\/
# Initialize a deque
my_deque = deque([1, 2, 3])
\/
# Append to the right
my_deque.append(4)
print("Deque after appending 4:", my_deque)  # Output: deque([1, 2, 3, 4])
\/
# Append to the left
my_deque.appendleft(0)
print("Deque after appending 0 to the left:", my_deque)  # Output: deque([0, 1, 2, 3, 4])
\/
# Pop from the right
popped_right = my_deque.pop()
print("Popped element from the right:", popped_right)  # Output: 4
print("Deque after popping from the right:", my_deque)  # Output: deque([0, 1, 2, 3])
\/
# Pop from the left
popped_left = my_deque.popleft()
print("Popped element from the left:", popped_left)  # Output: 0
print("Deque after popping from the left:", my_deque)  # Output: deque([1, 2, 3])
\/
# Rotate the deque (positive value rotates to the right)
my_deque.rotate(2)
print("Deque after rotating 2 positions to the right:", my_deque)  # Output: deque([2, 3, 1])
\/
# Rotate the deque (negative value rotates to the left)
my_deque.rotate(-1)
print("Deque after rotating 1 position to the left:", my_deque)  # Output: deque([3, 1, 2])
\/
# You can also use deque as a fixed-size queue with maxlen
limited_deque = deque(maxlen=3)
limited_deque.extend([1, 2, 3, 4])  # Oldest element (1) will be automatically removed
print("Limited deque:", limited_deque)  # Output: deque([2, 3, 4], maxlen=3)
    </code-block>
    </tab>
</tabs>

<note>
<p>This is the implementation of doubly linked lists and linked list
implementation of deques.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
\/
public class LinkedList&lt;T&gt; {
\/
    private class Node {
        public T item;
        public Node prev;
        public Node next;
\/
        public Node(T i, Node p, Node n) {
            item = i;
            prev = p;
            next = n;
        }
    }
\/
    private final Node sentinel;
    private int size;
\/
    public LinkedList() {
        sentinel = new Node(null, null, null);
        sentinel.prev = sentinel;
        sentinel.next = sentinel;
        size = 0;
    }
\/
    public void addFirst(T x) {
        Node newNode = new Node(x, sentinel, sentinel.next);
        sentinel.next.prev = newNode;
        sentinel.next = newNode;
        size++;
    }
\/
    public void addLast(T x) {
        Node newNode = new Node(x, sentinel.prev, sentinel);
        sentinel.prev.next = newNode;
        sentinel.prev = newNode;
        size++;
    }
\/
    public ArrayList&lt;T&gt; toList() {
        ArrayList&lt;T&gt; returnList = new ArrayList&lt;&gt;();
        Node p = sentinel.next;
        while (p != sentinel) {
            returnList.add(p.item);
            p = p.next;
        }
        return returnList;
    }
\/
    public boolean isEmpty() {
        return size == 0;
    }
\/
    public int size() {
        return size;
    }
\/
    public T removeFirst() {
        if (isEmpty()) {
            return null;
        }
        Node first = sentinel.next;
        sentinel.next = first.next;
        first.next.prev = sentinel;
        size--;
        return first.item;
    }
\/
    public T removeLast() {
        if (isEmpty()) {
            return null;
        }
        Node last = sentinel.prev;
        sentinel.prev = last.prev;
        last.prev.next = sentinel;
        size--;
        return last.item;
    }
\/
    public T get(int index) {
        if (index &lt; 0 || index &gt;= size) {
            return null;
        }
        Node p = sentinel.next;
        for (int i = 0; i &lt; index; i++) {
            p = p.next;
        }
        return p.item;
    }
\/
    public T getRecursive(int index) {
        if (index &lt; 0 || index &gt;= size) {
            return null;
        }
        return getRecursiveHelper(sentinel.next, index);
    }
\/
    private T getRecursiveHelper(Node p, int index) {
        if (index == 0) {
            return p.item;
        }
        return getRecursiveHelper(p.next, index - 1);
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;vector&gt;
\/
template &lt;typename T&gt;
class LinkedList {
private:
    struct Node {
        T item;
        Node* prev;
        Node* next;
\/
        Node(T i, Node* p, Node* n) : item(i), prev(p), next(n) {}
    };
\/
    Node* sentinel;
    int size;
\/
public:
    LinkedList() : size(0) {
        sentinel = new Node(T(), nullptr, nullptr);
        sentinel-&gt;prev = sentinel;
        sentinel-&gt;next = sentinel;
    }
\/
    ~LinkedList() {
        Node* current = sentinel-&gt;next;
        while (current != sentinel) {
            Node* next = current-&gt;next;
            delete current;
            current = next;
        }
        delete sentinel;
    }
\/
    void addFirst(T x) {
        Node* newNode = new Node(x, sentinel, sentinel-&gt;next);
        sentinel-&gt;next-&gt;prev = newNode;
        sentinel-&gt;next = newNode;
        size++;
    }
\/
    void addLast(T x) {
        Node* newNode = new Node(x, sentinel-&gt;prev, sentinel);
        sentinel-&gt;prev-&gt;next = newNode;
        sentinel-&gt;prev = newNode;
        size++;
    }
\/  
    std::vector&lt;T&gt; toList() {
        std::vector&lt;T&gt; returnList;
        Node* p = sentinel-&gt;next;
        while (p != sentinel) {
            returnList.push_back(p-&gt;item);
            p = p-&gt;next;
        }
        return returnList;
    }
\/
    [[nodiscard]] bool isEmpty() const
    {
        return size == 0;
    }
\/
    [[nodiscard]] int size_() const
    {
        return size;
    }
\/
    T removeFirst() {
        if (isEmpty()) {
            return T(); 
        }
        Node* first = sentinel-&gt;next;
        sentinel-&gt;next = first-&gt;next;
        first-&gt;next-&gt;prev = sentinel;
        size--;
        T item = first-&gt;item;
        delete first;
        return item;
    }
\/
    T removeLast() {
        if (isEmpty()) {
            return T();
        }
        Node* last = sentinel-&gt;prev;
        sentinel-&gt;prev = last-&gt;prev;
        last-&gt;prev-&gt;next = sentinel;
        size--;
        T item = last-&gt;item;
        delete last;
        return item;
    }
\/
    T get(const int index) {
        if (index &lt; 0 || index &gt;= size) {
            return T(); 
        }
        Node* p = sentinel-&gt;next;
        for (int i = 0; i &lt; index; i++) {
            p = p-&gt;next;
        }
        return p-&gt;item;
    }
\/
    T getRecursive(const int index) {
        if (index &lt; 0 || index &gt;= size) {
            return T();
        }
        return getRecursiveHelper(sentinel-&gt;next, index);
    }
\/
private:
    T getRecursiveHelper(Node* p, const int index) {
        if (index == 0) {
            return p-&gt;item;
        }
        return getRecursiveHelper(p-&gt;next, index - 1);
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class Node:
    def __init__(self, item, prev, next):
        self.item = item
        self.prev = prev
        self.next = next
\/
class LinkedList:
    def __init__(self):
        self.sentinel = Node(None, None, None)
        self.sentinel.prev = self.sentinel
        self.sentinel.next = self.sentinel
        self.size = 0
\/
    def addFirst(self, x):
        newNode = Node(x, self.sentinel, self.sentinel.next)
        self.sentinel.next.prev = newNode
        self.sentinel.next = newNode
        self.size += 1
\/
    def addLast(self, x):
        newNode = Node(x, self.sentinel.prev, self.sentinel)
        self.sentinel.prev.next = newNode
        self.sentinel.prev = newNode
        self.size += 1
\/
    def toList(self):
        returnList = []
        p = self.sentinel.next
        while p != self.sentinel:
            returnList.append(p.item)
            p = p.next
        return returnList
\/
    def isEmpty(self):
        return self.size == 0
\/
    def size_(self):
        return self.size
\/
    def removeFirst(self):
        if self.isEmpty():
            return None
        first = self.sentinel.next
        self.sentinel.next = first.next
        first.next.prev = self.sentinel
        self.size -= 1
        return first.item
\/
    def removeLast(self):
        if self.isEmpty():
            return None
        last = self.sentinel.prev
        self.sentinel.prev = last.prev
        last.prev.next = self.sentinel
        self.size -= 1
        return last.item
\/
    def get(self, index):
        if index &lt; 0 or index &gt;= self.size:
            return None
        p = self.sentinel.next
        for i in range(index):
            p = p.next
        return p.item
\/
    def getRecursive(self, index):
        if index &lt; 0 or index &gt;= self.size:
            return None
        return self._getRecursiveHelper(self.sentinel.next, index)
\/
    def _getRecursiveHelper(self, p, index):
        if index == 0:
            return p.item
        return self._getRecursiveHelper(p.next, index - 1)
    </code-block>
    </tab>
</tabs>

<note>
<p>This is the resizing array implementation of deque.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.List;
import java.util.ArrayList;
import java.lang.Math;
\/
public class ArrayDeque&lt;T&gt; {
    private T[] items;
    private int size;
    private int nextFirst;
    private int nextLast;
\/
    public ArrayDeque() {
        items = (T[]) new Object[8];
        size = 0;
        nextFirst = 0;
        nextLast = 1;
    }
\/
    public void addFirst(T x) {
        checkAndResize();
        items[nextFirst] = x;
        nextFirst = Math.floorMod(nextFirst - 1, items.length);
        size += 1;
    }
\/
    public void addLast(T x) {
        checkAndResize();
        items[nextLast] = x;
        nextLast = Math.floorMod(nextLast + 1, items.length);
        size += 1;
    }
\/
    public List&lt;T&gt; toList() {
        List&lt;T&gt; list = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; size; i++) {
            list.add(get(i));
        }
        return list;
    }
\/
    public boolean isEmpty() {
        return size == 0;
    }
\/
    public int size() {
        return size;
    }
\/
    public T removeFirst() {
        if (isEmpty()) {
            return null;
        }
        nextFirst = Math.floorMod(nextFirst + 1, items.length);
        T item = items[nextFirst];
        items[nextFirst] = null;
        size -= 1;
        checkAndResize();
        return item;
    }
\/
    public T removeLast() {
        if (isEmpty()) {
            return null;
        }
        nextLast = Math.floorMod(nextLast - 1, items.length);
        T item = items[nextLast];
        items[nextLast] = null;
        size -= 1;
        checkAndResize();
        return item;
    }
\/
    private void resize(int capacity) {
        T[] a = (T[]) new Object[capacity];
        for (int i = 0; i &lt; size; i++) {
            a[i] = get(i);
        }
        items = a;
        nextFirst = capacity - 1;
        nextLast = size;
    }
\/
    private void checkAndResize() {
        if (size == items.length) {
            resize(size * 2);
        } else if (items.length &gt;= 16 && size &lt; items.length / 4) {
            resize(items.length / 2);
        }
    }
\/
    public T get(int index) {
        if (index &gt;= size || index &lt; 0) {
            return null;
        }
        return items[Math.floorMod(nextFirst + 1 + index, items.length)];
    }
\/
    public T getRecursive(int index) {
        throw new UnsupportedOperationException("No need to implement getRecursive for proj 1b");
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;vector&gt;
\/
template &lt;typename T&gt;
class ArrayDeque {
private:
    T* items;
    int size;
    int nextFirst;
    int nextLast;
    int capacity;
\/
    void resize(const int newCapacity) {
        T* a = new T[newCapacity];
        for (int i = 0; i &lt; size; i++) {
            a[i] = get(i);
        }
        delete[] items;
        items = a;
        capacity = newCapacity;
        nextFirst = capacity - 1;
        nextLast = size;
    }
\/
    void checkAndResize() {
        if (size == capacity) {
            resize(capacity * 2);
        } else if (capacity &gt;= 16 && size &lt; capacity / 4) {
            resize(capacity / 2);
        }
    }
\/
public:
    ArrayDeque(): size(0), nextFirst(0), nextLast(1), capacity(8) {
        items = new T[capacity];
    }
\/
    ~ArrayDeque() {
        delete[] items;
    }
\/
    void addFirst(T x) {
        checkAndResize();
        items[nextFirst] = x;
        nextFirst = (nextFirst - 1 + capacity) % capacity;
        size += 1;
    }
\/
    void addLast(T x) {
        checkAndResize();
        items[nextLast] = x;
        nextLast = (nextLast + 1) % capacity;
        size += 1;
    }
\/
    std::vector&lt;T&gt; toList() {
        std::vector&lt;T&gt; list;
        for (int i = 0; i &lt; size; i++) {
            list.push_back(get(i));
        }
        return list;
    }
\/
    [[nodiscard]] bool isEmpty() const {
        return size == 0;
    }
\/
    [[nodiscard]] int size_() const {
        return size;
    }
\/
    T removeFirst() {
        if (isEmpty()) {
            return T(); 
        }
        nextFirst = (nextFirst + 1) % capacity;
        T item = items[nextFirst];
        size -= 1;
        checkAndResize();
        return item;
    }
\/
    T removeLast() {
        if (isEmpty()) {
            return T(); 
        }
        nextLast = (nextLast - 1 + capacity) % capacity;
        T item = items[nextLast];
        size -= 1;
        checkAndResize();
        return item;
    }
\/
    T get(const int index) {
        if (index &gt;= size || index &lt; 0) {
            return T(); 
        }
        return items[(nextFirst + 1 + index) % capacity];
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class ArrayDeque:
    def __init__(self):
        self.capacity = 8
        self.items = [None] * self.capacity
        self.size = 0
        self.nextFirst = 0
        self.nextLast = 1
\/
    def addFirst(self, x):
        self.checkAndResize()
        self.items[self.nextFirst] = x
        self.nextFirst = (self.nextFirst - 1 + self.capacity) % self.capacity
        self.size += 1
\/
    def addLast(self, x):
        self.checkAndResize()
        self.items[self.nextLast] = x
        self.nextLast = (self.nextLast + 1) % self.capacity
        self.size += 1
\/
    def toList(self):
        return [self.get(i) for i in range(self.size)]
\/
    def isEmpty(self):
        return self.size == 0
\/
    def size_(self):
        return self.size
\/
    def removeFirst(self):
        if self.isEmpty():
            return None
        self.nextFirst = (self.nextFirst + 1) % self.capacity
        item = self.items[self.nextFirst]
        self.items[self.nextFirst] = None
        self.size -= 1
        self.checkAndResize()
        return item
\/
    def removeLast(self):
        if self.isEmpty():
            return None
        self.nextLast = (self.nextLast - 1 + self.capacity) % self.capacity
        item = self.items[self.nextLast]
        self.items[self.nextLast] = None
        self.size -= 1
        self.checkAndResize()
        return item
\/
    def resize(self, newCapacity):
        a = [None] * newCapacity
        for i in range(self.size):
            self.get(i)
        self.items = a
        self.capacity = newCapacity
        self.nextFirst = newCapacity - 1
        self.nextLast = self.size
\/
    def checkAndResize(self):
        if self.size == self.capacity:
            self.resize(self.capacity * 2)
        elif self.capacity &gt;= 16 and self.size &lt; self.capacity // 4:
            self.resize(self.capacity // 2)
\/
    def get(self, index):
        if index &gt;= self.size or index &lt; 0:
            return None
        return self.items[(self.nextFirst + 1 + index) % self.capacity]
    </code-block>
    </tab>
</tabs>

## 3 Union-Find

### 3.1 Quick Find (Eager Approach)

<list type="bullet">
<li>
    <p><code>parent[i]</code> is the root of <math>i</math>, <math>p
    </math> and <math>q</math> are connected if and only if they have
    the same <code>parent[i]</code>.</p>
</li>
<li>
    <p><format color="Fuchsia">Find:</format> Check if <math>p
    </math> and <math>q</math> have the same <code>parent[i]</code>.
    </p>
</li>
<li>
    <p><format color="Fuchsia">Union:</format> To merge 
    components containing <math>p</math> and <math>q</math>, change 
    all entries whose id equals <code>parent[p]</code> to <code>
    parent[q]</code>.</p>
</li>
</list>

<tip>
<p><format color="BlueViolet">Defect</format></p>
<list type="bullet">
<li>
    <p>Union too expensive (<math>N</math> array accesses).</p>
</li>
<li>
    <p>Trees are flat, but too expensive to keep them flat.</p>
</li>
</list>
</tip>

### 3.2 Quick Union (Lazy Approach)

<list>
<li>
    <p>parent[i] is the parent of <math>i</math>, root of <math>i
    </math> is parent[parent[...[i]]] (keep going until it doesn't 
    change).</p>
</li>
<li>
    <p><format color="Fuchsia">Find:</format> Check if <math>p
    </math> and <math>q</math> have the same root.</p>
</li>
<li>
    <p><format color="Fuchsia">Union:</format> To merge 
    components containing <math>p</math> and <math>q</math>, set the 
    parent of <math>p</math>'s root to the parent of <math>q</math>'s 
    root.</p>
</li>
</list>

<note>
<p><format color="BlueViolet">Defect</format></p>
<list type="bullet">
<li>
    <p>Trees can get tall.</p>
</li>
<li>
    <p>Find too expensive (could be <math>N</math> array accesses).
    </p>
</li>
</list>
</note>

### 3.3 Quick Union Improvements

<p>Two Improvements: Weighting and Path Compression (WQUPC).</p>

<procedure title="Weighted quick-union" type="choices">
<step>
    <p>Modify quick-union to avoid tall trees.</p>
</step>
<step>
    <p>Keep track of size of each tree (number of objects).</p>
</step>
<step>
    <p>Balance by linking root of smaller tree to root of larger tree.
    </p>
</step>
</procedure>

<procedure title = "Path compression" type="choices">
<step>
    <p>Just after computing the root of <math>p</math>, set the parent
    of each examined node to point to that root.</p>
</step>
</procedure>

<list>
<li>
    <p><code>rank[i]</code> is the size of the tree rooted at <math>i
    </math>.</p>
</li>
<li>
    <p>Property: Starting from an empty data structure, any sequence 
    of <math>M</math> union-find operations on <math>N</math> objects
    makes <math>\leq c(N + M lg* N)</math> array accesses.</p>
</li>
<li>
    <p>In theory, WQUPC is not linear; in practice, it is.</p>
</li>
<li>
    <p>Application: Percoloation, games, dynamic connectivity, least 
    common ancestor, Kruskal's minimum spanning tree algorithm, etc.
    </p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class UnionFind {
    private final int[] parent;
    private final byte[] rank;
    private int count;
\/
    public UnionFind(int n) {
        if (n &lt; 0) throw new IllegalArgumentException();
        count = n;
        parent = new int[n];
        rank = new byte[n];
        for (int i = 0; i &lt; n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }
\/
    public int find(int p) {
        validate(p);
        while (p != parent[p]) {
            parent[p] = parent[parent[p]];
            p = parent[p];
        }
        return p;
    }
\/
    public int count() {
        return count;
    }
\/
    public boolean connected(int p, int q) {
        return find(p) == find(q);
    }
\/
    public void union(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        if (rootP == rootQ) return;
\/
        if (rank[rootP] &lt; rank[rootQ]) parent[rootP] = rootQ;
        else if (rank[rootP] &gt; rank[rootQ]) parent[rootQ] = rootP;
        else {
            parent[rootQ] = rootP;
            rank[rootP]++;
        }
        count--;
    }
\/
    private void validate(int p) {
        int n = parent.length;
        if (p &lt; 0 || p &gt;= n) {
            throw new IllegalArgumentException("index " + p + " is not between 0 and " + (n - 1));
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++ (UnionFind.h)">
    <code-block lang="c++" collapsible="true">
#ifndef UNIONFIND_H
#define UNIONFIND_H
\/
#include &lt;vector&gt;
\/
class UnionFind {
private:
    std::vector&lt;int&gt; parent;
    std::vector&lt;int&gt; rank;
    int count;
\/
public:
    explicit UnionFind(int n);
    int find(int p);
    [[nodiscard]] int countComponents() const;
    bool connected(int p, int q);
    void unionSets(int p, int q);
\/
private:
    void validate(int p) const;
};
\/
#endif // UNIONFIND_H
    </code-block>
    </tab>
    <tab title="C++ (UnionFind.cpp)">
    <code-block lang="c++" collapsible="true">
#include &lt;stdexcept&gt;
#include &lt;string&gt;
#include "UnionFind.h"
\/
UnionFind::UnionFind(const int n) {
    if (n &lt; 0) throw std::invalid_argument("n must be non-negative");
    count = n;
    parent.resize(n);
    rank.resize(n);
    for (int i = 0; i &lt; n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
}
\/
int UnionFind::find(int p) {
    validate(p);
    while (p != parent[p]) {
        parent[p] = parent[parent[p]]; // Path compression
        p = parent[p];
    }
    return p;
}
\/
int UnionFind::countComponents() const {
    return count;
}
\/
bool UnionFind::connected(int p, int q) {
    return find(p) == find(q);
}
\/
void UnionFind::unionSets(int p, int q) {
    const int rootP = find(p);
    int rootQ = find(q);
    if (rootP == rootQ) return;
\/
    if (rank[rootP] &lt; rank[rootQ]) {
        parent[rootP] = rootQ;
    } else if (rank[rootP] &gt; rank[rootQ]) {
        parent[rootQ] = rootP;
    } else {
        parent[rootQ] = rootP;
        rank[rootP]++;
    }
    count--;
}
\/
void UnionFind::validate(const int p) const {
    int n = static_cast&lt;int&gt;(parent.size());
    if (p &lt; 0 || p &gt;= n) {
        throw std::invalid_argument("index " + std::to_string(p) + " is not between 0 and " + std::to_string(n - 1));
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class UnionFind:
    def __init__(self, n):
        if n &lt; 0:
            raise ValueError("n must be non-negative")
        self.count = n
        self.parent = list(range(n))
        self.rank = [0] * n
\/
    def find(self, p):
        self.validate(p)
        while p != self.parent[p]:
            self.parent[p] = self.parent[self.parent[p]]
            p = self.parent[p]
        return p
\/
    def count_components(self):
        return self.count
\/
    def connected(self, p, q):
        return self.find(p) == self.find(q)
\/
    def union(self, p, q):
        root_p = self.find(p)
        root_q = self.find(q)
        if root_p == root_q:
            return
\/
        if self.rank[root_p] &lt; self.rank[root_q]:
            self.parent[root_p] = root_q
        elif self.rank[root_p] &gt; self.rank[root_q]:
            self.parent[root_q] = root_p
        else:
            self.parent[root_q] = root_p
            self.rank[root_p] += 1
        self.count -= 1
\/
    def validate(self, p):
        n = len(self.parent)
        if p &lt; 0 or p &gt;= n:
            raise ValueError(f"index {p} is not between 0 and {n - 1}")
    </code-block>
    </tab>
</tabs>

## 4 Bags, Queues and Stacks

<list>
<li>
    <p><format color="Fuchsia">Stack:</format> Examine the item most 
    recently added (LIFO: last in first out).</p>
</li>
<li>
    <p><format color="Fuchsia">Queue:</format> Examine the item least 
    recently added (FIFO: first in first out).</p>
</li>
</list>

### 4.1 Stacks

<p><format color="BlueViolet">Defintions</format></p>

<list type="bullet">
<li>
    <p><format color="DarkOrange">Client:</format> program using 
    operations defined in interface.</p>
</li>
<li>
    <p><format color="DarkOrange">Implementation:</format> actual code 
    implementing operations.</p>
</li>
<li>
    <p><format color="DarkOrange">Interface:</format> description of 
    data types, basic operations.</p>
</li>
</list>

<p>Separate interface from implementation!</p>

<p><format color="BlueViolet">Benefits</format>: </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Clients can't know details of 
    implementation</format> =&gt; client has many implementation from 
    which to choose.</p>
</li>
<li>
    <p><format color="Fuchsia">Implementation can't know details of 
    client needs</format> =&gt; many clients can re-use the same 
    implementation.</p>
</li>
<li>
    <p><format color="Fuchsia">Design:</format> creates modular,
    reusable libraries.</p>
</li>
<li>
    <p><format color="Fuchsia">Performance:</format> use optimized
    implementation where it matters.</p>
</li>
</list>

#### 4.1.1 Built-In Stacks

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Stack;
\/
public class StackExample {
    public static void main(String[] args) {
        Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();
\/
        stack.push(1);
        stack.push(2);
        stack.push(3);
\/
        System.out.println(stack.pop()); // Outputs 3
        System.out.println(stack.pop()); // Outputs 2
\/
        System.out.println(stack.peek()); // Outputs 1
\/
        System.out.println(stack.empty()); 
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;stack&gt;
\/
int main() {
    std::stack&lt;int&gt; stack;
\/
    // Push elements to the stack
    stack.push(1);
    stack.push(2);
    stack.push(3);
\/
    std::cout &lt;&lt; stack.top() &lt;&lt; std::endl; 
    stack.pop();
    std::cout &lt;&lt; stack.top() &lt;&lt; std::endl; 
    stack.pop();
\/
    std::cout &lt;&lt; stack.top() &lt;&lt; std::endl; 
    std::cout &lt;&lt; (stack.empty() ? "true" : "false") &lt;&lt; std::endl;
\/
    return 0;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
stack = []
\/
stack.append(1)
stack.append(2)
stack.append(3)
\/
print(stack.pop())  
print(stack.pop())
\/
print(stack[-1])
\/
print(len(stack) == 0)
</code-block>
    </tab>
</tabs>

#### 4.1.2 Linked-List Implementation

<procedure title="Stack pop">
<step>
    <p>Save item to return.</p>
</step>
<step>
    <p>Delete first node.</p>
</step>
<step>
    <p>Return saved item.</p>
</step>
<img src="../images_data/d4-1-1.png" alt="Stack pop"/>
</procedure>

<procedure title="Stack push">
<step>
    <p>Save a link to the list.</p>
</step>
<step>
    <p>Create a new node for the beginning.</p>
</step>
<step>
    <p>Set the instance variables in the new node.</p>
</step>
<img src="../images_data/d4-1-2.png" alt="Stack push"/>
</procedure>

<p><format color="BlueViolet">Properties</format></p>

<list>
<li>
    <p>Every operation takes constant time in the worst case.</p>
</li>
<li>
    <p>A stack with <math>N</math> items uses <math>\sim 40N</math>
    bytes.
.</p>
</li>
</list>

<img src="../images_data/d4-1-3.png" alt="Stroage Structure"/>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Iterator;
import java.util.NoSuchElementException;
\/
public class LinkedStack&lt;Item&gt; implements Iterable&lt;Item&gt; {
    private int n;
    private Node first;
\/
    private class Node {
        private Item item;
        private Node next;
    }
\/
    public LinkedStack() {
        first = null;
        n = 0;
    }
\/
    public boolean isEmpty() {
        return first == null;
    }
\/
    public int size() {
        return n;
    }
\/
    public void push(Item item) {
        Node oldfirst = first;
        first = new Node();
        first.item = item;
        first.next = oldfirst;
        n++;
    }
\/
    public Item pop() {
        if (isEmpty()) throw new NoSuchElementException("Stack underflow");
        Item item = first.item;        
        first = first.next;            
        n--;
        return item;                  
    }
\/
    public Item peek() {
        if (isEmpty()) throw new NoSuchElementException("Stack underflow");
        return first.item;
    }
\/
    public String toString() {
        StringBuilder s = new StringBuilder();
        for (Item item : this)
            s.append(item).append(" ");
        return s.toString();
    }
\/
    public Iterator&lt;Item&gt; iterator() {
        return new LinkedIterator();
    }
\/
    private class LinkedIterator implements Iterator&lt;Item&gt; {
        private Node current = first;
\/
        public boolean hasNext() {
            return current != null;
        }
\/
        public Item next() {
            if (!hasNext()) throw new NoSuchElementException();
            Item item = current.item;
            current = current.next;
            return item;
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
\/
template &lt;typename Item&gt;
class LinkedStack {
private:
    struct Node {
        Item item;
        Node* next;
    };
\/
    int n;
    Node* first;
\/  
public:
    LinkedStack() : n(0), first(nullptr) {}
\/
    [[nodiscard]] bool isEmpty() const {
        return first == nullptr;
    }
\/
    [[nodiscard]] int size() const {
        return n;
    }
\/
    void push(const Item& item) {
        Node* oldfirst = first;
        first = new Node();
        first-&gt;item = item;
        first-&gt;next = oldfirst;
        n++;
    }
\/
    Item pop() {
        if (isEmpty()) throw std::runtime_error("Stack underflow");
        Item item = first-&gt;item;
        const Node* oldfirst = first;
        first = first-&gt;next;
        delete oldfirst;
        n--;
        return item;
    }
\/
    [[nodiscard]] Item peek() const {
        if (isEmpty()) throw std::runtime_error("Stack underflow");
        return first-&gt;item;
    }
\/
    class Iterator {
    private:
        Node* current;
\/
    public:
        explicit Iterator(Node* start) : current(start) {}
\/
        bool operator!=(const Iterator& other) const {
            return current != other.current;
        }
\/
        Iterator& operator++() {
            current = current-&gt;next;
            return *this;
        }
\/
        Item& operator*() {
            return current-&gt;item;
        }
    };
\/
    [[nodiscard]] Iterator begin() const {
        return Iterator(first);
    }
\/
    [[nodiscard]] Iterator end() const {
        return Iterator(nullptr);
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class Node:
    def __init__(self, item):
        self.item = item
        self.next = None
\/
class LinkedStack:
    def __init__(self):
        self.first = None
        self.n = 0
\/
    def is_empty(self):
        return self.first is None
\/
    def size(self):
        return self.n
\/
    def push(self, item):
        oldfirst = self.first
        self.first = Node(item)
        self.first.next = oldfirst
        self.n += 1
\/
    def pop(self):
        if self.is_empty():
            raise Exception("Stack underflow")
        item = self.first.item
        self.first = self.first.next
        self.n -= 1
        return item
\/
    def peek(self):
        if self.is_empty():
            raise Exception("Stack underflow")
        return self.first.item
\/
    def __iter__(self):
        current = self.first
        while current:
            yield current.item
            current = current.next
    </code-block>
    </tab>
</tabs>

#### 4.1.3 Resizing-Array Implementation

<p><format color="BlueViolet">Property:</format> Uses between 
<math>\sim 8N</math> and <math>\sim 32N</math> bytes to
represent a stack with <math>N</math> items.</p>

<list type="bullet">
<li>
    <p><math>\sim 8N</math> when full.</p>
</li>
<li>
    <p><math>\sim 32N</math> when one-quarter full.</p>
</li>
</list>

<table style="header-row">
<tr>
    <td>Linked-List Implementation</td>
    <td>Resizing-Array Implementation</td>
</tr>
<tr>
    <td>Every operation takes constant time in the <format 
    color="OrangeRed">worst case</format>.</td>
    <td>Every operation takes constant <format color="OrangeRed">
    amortized</format> time.</td>
</tr>
<tr>
    <td>Uses extra time and space to deal with the links.</td>
    <td>Less wasted space.</td>
</tr>
</table>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Iterator;
import java.util.NoSuchElementException;
\/
public class ResizingArrayStack&lt;Item&gt; implements Iterable&lt;Item&gt; {
    private static final int INIT_CAPACITY = 8;
\/
    private Item[] a;
    private int n;
\/
    public ResizingArrayStack() {
        a = (Item[]) new Object[INIT_CAPACITY];
        n = 0;
    }
\/
    public boolean isEmpty() {
        return n == 0;
    }
\/
    public int size() {
        return n;
    }
\/
    private void resize(int capacity) {
        assert capacity &gt;= n;
        a = java.util.Arrays.copyOf(a, capacity);
        // textbook implementation
        // Item[] copy = (Item[]) new Object[capacity];
        // for (int i = 0; i &lt; n; i++) {
        //     copy[i] = a[i];
        // }
        // a = copy;
    }
\/
    public void push(Item item) {
        if (n == a.length) resize(2*a.length);    // double size of array if necessary
        a[n++] = item;                            // add item
    }
\/
    public Item pop() {
        if (isEmpty()) throw new NoSuchElementException("Stack underflow");
        Item item = a[n-1];
        a[n-1] = null;                              // to avoid loitering
        n--;
        // shrink size of array if necessary
        if (n &gt; 0 && n == a.length/4) resize(a.length/2);
        return item;
    }
\/
    public Item peek() {
        if (isEmpty()) throw new NoSuchElementException("Stack underflow");
        return a[n-1];
    }
\/
    public Iterator&lt;Item&gt; iterator() {
        return new ReverseArrayIterator();
    }
\/
    private class ReverseArrayIterator implements Iterator&lt;Item&gt; {
        private int i;
\/
        public ReverseArrayIterator() {
            i = n-1;
        }
\/
        public boolean hasNext() {
            return i &gt;= 0;
        }
\/
        public Item next() {
            if (!hasNext()) throw new NoSuchElementException();
            return a[i--];
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
// no iterator for C++
#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;stdexcept&gt;
\/
template &lt;typename Item&gt;
class ResizingArrayStack {
private:
    static constexpr int INIT_CAPACITY = 8;
    std::vector&lt;Item&gt; a;
    int n;
\/
public:
    ResizingArrayStack() : a(INIT_CAPACITY), n(0) {}
\/
    [[nodiscard]] bool isEmpty() const {
        return n == 0;
    }
\/
    [[nodiscard]] int size() const {
        return n;
    }
\/
    void push(const Item& item) {
        if (n == a.size()) resize(2 * a.size());
        a[n++] = item;
    }
\/
    Item pop() {
        if (isEmpty()) throw std::runtime_error("Stack underflow");
        Item item = a[n - 1];
        a[n - 1] = Item();
        n--;
        if (n > 0 && n == a.size() / 4) resize(a.size() / 2);
        return item;
    }
\/
    [[nodiscard]] Item peek() const {
        if (isEmpty()) throw std::runtime_error("Stack underflow");
        return a[n - 1];
    }
\/
private:
    void resize(int capacity) {
        a.resize(capacity);
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
# Python lists handle resizing automatically
class ResizingArrayStack:
    def __init__(self):
        self._a = []
        self._n = 0 
\/
    def is_empty(self):
        return self._n == 0
\/
    def size(self):
        return self._n
\/
    def push(self, item):
        if self._n == len(self._a):
            self._resize(2 * len(self._a))
        self._a.append(item)  # Python lists handle resizing automatically
        self._n += 1
\/
    def pop(self):
        if self.is_empty():
            raise Exception("Stack underflow")
        self._n -= 1
        item = self._a.pop()
        if self._n > 0 and self._n == len(self._a) // 4:
            self._resize(len(self._a) // 2)
        return item
\/
    def peek(self):
        if self.is_empty():
            raise Exception("Stack underflow")
        return self._a[-1]
    </code-block>
    </tab>
</tabs>

### 4.2 Queues

#### 4.2.1 Built-in Queues

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.LinkedList;
import java.util.Queue;
\/
public class QueueExample {
    public static void main(String[] args) {
        Queue&lt;Integer&gt; queue = new LinkedList&lt;&gt;();
\/
        queue.add(1);
        queue.add(2);
        queue.add(3);
\/
        System.out.println(queue.poll()); // Outputs 1
\/
        System.out.println(queue.peek()); // Outputs 2
\/
        System.out.println(queue.isEmpty()); // Outputs false
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;queue&gt;
\/
int main() {
    std::queue&lt;int&gt; q;
\/
    q.push(1);
    q.push(2);
    q.push(3);
\/
    std::cout &lt;&lt; q.front() &lt;&lt; std::endl; 
    q.pop();
\/
    std::cout &lt;&lt; (q.empty() ? "true" : "false") &lt;&lt; std::endl; 
\/
    return 0;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
import queue
\/
q = queue.Queue()
\/
q.put(1)
q.put(2)
q.put(3)
\/
print(q.get())
\/
print(q.empty())
    </code-block>
    </tab>
</tabs>

#### 4.2.2 Queue Implementation

<procedure title="Queue dequeue">
<step>
    <p>Save item to return.</p>
</step>
<step>
    <p>Delete first node.</p>
</step>
<step>
    <p>Return saved item.</p>
</step>
<img src="../images_data/d4-2-1.png" alt="Queue dequeue"/>
</procedure>

<procedure title="Queue enqueue">
<step>
    <p>Save a link to the last node.</p>
</step>
<step>
    <p>Create a new node for the end.</p>
</step>
<step>
    <p>Link the new node to the end of the list.</p>
</step>
<img src="../images_data/d4-2-2.png" alt="Queue enqueue"/>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Iterator;
import java.util.NoSuchElementException;
\/
public class LinkedQueue&lt;Item&gt; implements Iterable&lt;Item&gt; {
    private int n;
    private Node first;
    private Node last;
\/
    private class Node {
        private Item item;
        private Node next;
    }
\/
    public LinkedQueue() {
        first = null;
        last = null;
        n = 0;
    }
\/
    public boolean isEmpty() {
        return first == null;
    }
\/
    public int size() {
        return n;
    }
\/
    public Item peek() {
        if (isEmpty()) throw new NoSuchElementException("Queue underflow");
        return first.item;
    }
\/
    public void enqueue(Item item) {
        Node oldlast = last;
        last = new Node();
        last.item = item;
        last.next = null;
        if (isEmpty()) first = last;
        else oldlast.next = last;
        n++;
    }
\/
    public Item dequeue() {
        if (isEmpty()) throw new NoSuchElementException("Queue underflow");
        Item item = first.item;
        first = first.next;
        n--;
        if (isEmpty()) last = null;
        return item;
    }
\/
    public String toString() {
        StringBuilder s = new StringBuilder();
        for (Item item : this)
            s.append(item).append(" ");
        return s.toString();
    }
\/
    public Iterator&lt;Item&gt; iterator() {
        return new LinkedIterator();
    }
\/
    private class LinkedIterator implements Iterator&lt;Item&gt; {
        private Node current = first;
\/
        public boolean hasNext() {
            return current != null;
        }
\/
        public Item next() {
            if (!hasNext()) throw new NoSuchElementException();
            Item item = current.item;
            current = current.next;
            return item;
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
\/
template &lt;typename Item&gt;
class LinkedQueue {
private:
    struct Node {
        Item item;
        Node* next;
    };
\/
    int n;
    Node* first;
    Node* last;
\/
public:
    LinkedQueue() : n(0), first(nullptr), last(nullptr) {}
\/
    [[nodiscard]] bool isEmpty() const {
        return first == nullptr;
    }
\/
    [[nodiscard]] int size() const {
        return n;
    }
\/
    [[nodiscard]] Item peek() const {
        if (isEmpty()) throw std::runtime_error("Queue underflow");
        return first-&gt;item;
    }
\/
    void enqueue(const Item& item) {
        Node* oldlast = last;
        last = new Node;
        last-&gt;item = item;
        last-&gt;next = nullptr;
        if (isEmpty()) first = last;
        else oldlast-&gt;next = last;
        n++;
    }
\/
    Item dequeue() {
        if (isEmpty()) throw std::runtime_error("Queue underflow");
        Item item = first-&gt;item;
        const Node* oldfirst = first;
        first = first-&gt;next;
        delete oldfirst;
        n--;
        if (isEmpty()) last = nullptr;
        return item;
    }
\/
    friend std::ostream& operator&lt;&lt;(std::ostream& os, const LinkedQueue&lt;Item&gt;& queue) {
        for (Node* current = queue.first; current != nullptr; current = current-&gt;next) {
            os &lt;&lt; current-&gt;item &lt;&lt; " ";
        }
        return os;
    }
\/
    class Iterator {
    private:
        Node* current;
\/
    public:
        explicit Iterator(Node* start) : current(start) {}
\/
        [[nodiscard]] bool hasNext() const {
            return current != nullptr;
        }
\/
        Item next() {
            if (!hasNext()) throw std::runtime_error("No more elements");
            Item item = current-&gt;item;
            current = current-&gt;next;
            return item;
        }
\/
        [[nodiscard]] Node* getCurrent() const {
            return current;
        }
\/
        Iterator& operator++() {
            if (current) {
                current = current-&gt;next;
            }
            return *this;
        }
\/
        Item& operator*() {
            if (!current) {
                throw std::runtime_error("Dereferencing invalid iterator");
            }
            return current-&gt;item;
        }
    };
\/
    friend bool operator!=(const Iterator& lhs, const Iterator& rhs) {
        return lhs.getCurrent() != rhs.getCurrent();
    }
\/
    [[nodiscard]] Iterator begin() const {
        return Iterator(first);
    }
\/
    [[nodiscard]] Iterator end() const {
        return Iterator(nullptr);
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class Node:
    def __init__(self, item):
        self.item = item
        self.next = None
\/
\/
class LinkedQueue:
    def __init__(self):
        self.n = 0
        self.first = None
        self.last = None
\/
    def is_empty(self):
        return self.first is None
\/
    def size(self):
        return self.n
\/
    def peek(self):
        if self.is_empty():
            raise Exception("Queue underflow")
        return self.first.item
\/
    def enqueue(self, item):
        oldlast = self.last
        self.last = Node(item)
        if self.is_empty():
            self.first = self.last
        else:
            oldlast.next = self.last
        self.n += 1
\/
    def dequeue(self):
        if self.is_empty():
            raise Exception("Queue underflow")
        item = self.first.item
        self.first = self.first.next
        self.n -= 1
        if self.is_empty():
            self.last = None
        return item
\/
    def __iter__(self):
        current = self.first
        while current:
            yield current.item
            current = current.next
\/
    def __str__(self):
        return " ".join(str(item) for item in self)
    </code-block>
    </tab>
</tabs>

### 4.3 Generics

<p>Use generics for different types of objects!</p>

<p>The implementation above has already taken generics into account.
</p>

<warning>
<p>The fixed-capacity-stack code may get a warning about unchecked 
cast.</p>
<p>This is because Java does not allow generic array creation.</p>
</warning>

### 4.4 Iterators

<p>Iterators allow clients to iterate through the items in a
collection.</p>

<p>Using iterator, we can:</p>

<code-block lang="java">
for (Item item : collection) {
    // do something with item
}
</code-block>

<p>The implementation above has already taken iterators into account.
</p>

<p>For more information on iterators, please visit <a 
href="C-Programming.md" anchor="inheritance" summary
="Iterators in C++">Iterators in C++</a>.</p>

### 4.5 Bag (Princeton)

<p>The order of items in a bag does not matter.</p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Iterator;
import java.util.NoSuchElementException;
\/
public class Bag&lt;Item&gt; implements Iterable&lt;Item&gt; {
    private Node&lt;Item&gt; first;  
    private int n;
\/
    private static class Node&lt;Item&gt; {
        private Item item;
        private Node&lt;Item&gt; next;
    }
\/
    public Bag() {
        first = null;
        n = 0;
    }
\/
    public boolean isEmpty() {
        return first == null;
    }
\/
    public int size() {
        return n;
    }
\/
    public void add(Item item) {
        Node&lt;Item&gt; oldfirst = first;
        first = new Node&lt;Item&gt;();
        first.item = item;
        first.next = oldfirst;
        n++;
    }
\/
    public Iterator&lt;Item&gt; iterator()  {
        return new LinkedIterator(first);
    }
\/
    private class LinkedIterator implements Iterator&lt;Item&gt; {
        private Node&lt;Item&gt; current;
\/
        public LinkedIterator(Node&lt;Item&gt; first) {
            current = first;
        }
\/
        public boolean hasNext()  {
            return current != null;
        }
\/
        public Item next() {
            if (!hasNext()) throw new NoSuchElementException();
            Item item = current.item;
            current = current.next;
            return item;
        }
    }
}
    </code-block>
    </tab>
</tabs>

## 5 Elementary Sorts

### 5.1 Selection Sort {id="selection-sort"}

<list type="bullet">
<li>
    <p><format color="Fuchsia">Time Complexity:</format> <math>O(N^
    2)</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Space Complexity:</format> <math>O(1)
    </math>.</p>
</li>
</list>

<procedure title="Selection Sort">
<step>
    <p>In iteration <math>i</math>, find index <math>min</math> of 
    smallest remaining entry.</p>
</step>
<step>
    <p>Swap <code>a[i]</code> and <code>a[min]</code>.</p>
</step>
</procedure>

<p><format color="BlueViolet">Properties</format></p>

<list type="bullet">
<li>
    <p>Use <math>\frac {N^{2}} {2}</math> compares and <math>N
    </math> exchanges.</p>
</li>
<li>
    <p>Quadratic time, even if the input is sorted!</p>
</li>
<li>
    <p>Data movement is minimal: linear number of exchanges -&gt; 
    suitable for small number of data.</p>
</li>
</list>

<note>
<p>For more information about the performance of selection sort, 
please refer to the <a anchor="conclusion" summary="Conclusion">
conclusion table</a>.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class Selection {
    public static void sort(Comparable[] a) {
        int n = a.length;
\/
        for (int i = 0; i &lt; n; i++) {
            int min = i;
\/
            for (int j = i + 1; j &lt; n; j++) {
                if (less(a[j], a[min])) {
                    min = j;
                }
            }
\/
            exch(a, i, min);
        }
    }
\/
    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) &lt; 0;
    }
\/
    private static void exch(Comparable[] a, int i, int j) {
        Comparable temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;algorithm&gt;
\/
void selectionSort(int arr[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j &lt; n; j++) {
            if (arr[j] &lt; arr[minIndex]) {
                minIndex = j;
            }
        }
    std::swap(arr[minIndex], arr[i]);
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def selection_sort(arr):
    for i in range(len(arr)):
        min_index = i
        for j in range(i+1, len(arr)):
            if arr[j] &lt; arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    </code-block>
    </tab>
</tabs>

### 5.2 Insertion Sort {id="insertion-sort"}

<list type="bullet">
<li> 
    <p>Time Complexity: <math>O(N^2)</math>.</p>
</li>
<li>
    <p>Space Complexity: <math>O(1)</math>.</p>
</li>
</list>

<procedure title="Insertion Sort">
<step>
    <p>In iteration <math>i</math>, swap <math>a[i]</math> with each 
    larger entry to its left.</p>
</step>
<step>
    <p>Entries to the left of <math>i</math> are in ascending order.
    </p>
</step>
</procedure>

<p><format color="BlueViolet">Definitions</format></p>

<list type="bullet">
<li>
    <p><format color="DarkOrange">Inversion:</format> A pair of 
    keys that are out of order.</p>
    <p><format color="LawnGreen">Example:</format> A E E L M O 
    T R X P S</p>
    <p>Six inversions: T-R T-P T-S R-P X-P X-S</p>
</li>
<li>
    <p><format color="DarkOrange">Partially Sorted:</format> An array
    is partially sorted if the number of inversions is <math>\leq cN
    </math>.</p>
</li>
</list>

<p><format color="BlueViolet">Property:</format> For partially-sorted
arrays, insertion sort runs in linear time.</p>

<p><format color="LawnGreen">Proof:</format> Number of exchanges
equals the number of inversions (number of compares = exchanges + (N 
– 1)).</p>

<p><format color="BlueViolet">Running Time Analysis</format></p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">On average:</format> To sort a 
    randomly-ordered array with distinct keys, insertion sort uses 
    <math>\frac {N^{2}}{4}</math> compares and <math>\frac 
    {N^{2}}{4}</math> exchanges on average.</p>
</li>
<li>
    <p><format color="Fuchsia">Best case:</format> If the array is in
    ascending order, insertion sort makes <math>N-1</math> compares 
    and <math>0</math> exchanges.</p>
</li>
<li>
    <p><format color="Fuchsia">Worst Case:</format> If the array is in 
    descending order (and no duplicates), insertion sort makes 
    <math>\sim \frac {1}{2} N^{2}</math> compares and <math>\sim
    \frac {1}{2} N^{2}</math> exchanges.</p>
</li>
</list>

<note>
<p>For more information about the performance of insertion sort, 
please refer to the <a href="Data-Structures-and-Algorithms-3.md" 
anchor="sortperf" summary="Table for Comparing Performance of Sorting
Algorithm">table for sorting performance</a> or the <a 
anchor="conclusion" summary="Conclusion">conclusion table</a>.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class Insertion {
    public static void sort(Comparable[] a) {
        int n = a.length;
\/
        for (int i = 1; i &lt; n; i++) {
            for (int j = i; j &gt; 0 && less(a[j], a[j - 1]); j--) {
                exch(a, j, j - 1);
            }
        }
    }
\/
    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) &lt; 0;
    }
\/
    private static void exch(Comparable[] a, int i, int j) {
        Comparable temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;algorithm&gt;
\/
void insertionSort(int arr[], int n) {
    for (int i = 1; i &lt; n; i++) {
        int key = arr[i];
        int j = i - 1;
\/
        while (j &gt;= 0 && arr[j] &gt; key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j &gt;= 0 and arr[j] &gt; key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    </code-block>
    </tab>
</tabs>

### 5.3 Shell Sort {id="shell-sort"}

<procedure title="Shell Sort">
<step>
    <p>Move entries more than one position at a time 
    by <format color="OrangeRed"><math>h</math>-sorting</format> the
    array.</p>
</step>
<step>
    <p><math>h</math>-sort the array: Insertion sort, with stride 
    <math>h</math>.</p>
</step>
</procedure>

<p><format color="BlueViolet">Increment Sequence</format></p>

<list type="decimal">
<li>
    <p><format color="Fuchsia">Knuth's increment sequence (3x+1):
    </format> 1, 4, 13, 40, 121, 364, 1093, ... (OK, easy to compute)
    </p>
</li>
<li>
    <p><format color="Fuchsia">Sedgewick's increment sequence: (
    merging of <math>9 \times 4^{\text{i}} - 9 \times 2^{\text{i}} + 
    1</math> and <math>4^{\text{i}} - (3 \times 2^{\text{i}}) + 1
    </math></format> 1, 5, 19, 41, 109, 209, 505, 929, 2161, ... 
    (Good, tough to beat empirical studies).</p>
</li>
</list>

<p><format color="BlueViolet">Property:</format> With the <math>3x+1
</math> increments, the worst-case number of compares is <math>
O(N^{\frac{3}{2}})</math>.</p>

<note>
<p>For more information about the performance of quicksort, please 
refer to  the <a anchor="conclusion" summary="Conclusion">
conclusion table</a>.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class Shell {
    public static void sort(Comparable[] a) {
        int n = a.length;
        int h = 1;
\/
        while (h &lt; n / 3) {
            h = 3 * h + 1;
        }
\/
        while (h &gt;= 1) {
            for (int i = h; i &lt; n; i++) {
                for (int j = i; j &gt;= h && less(a[j], a[j - h]); j -= h) {
                    exch(a, j, j - h);
                }
            }
            h = h / 3;
        }
    }
\/
    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) &lt; 0;
    }
\/
    private static void exch(Comparable[] a, int i, int j) {
        Comparable temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;vector&gt;
\/
void shellSortKnuth(std::vector&lt;int&gt;& arr) {
    int n = arr.size();
\/
    int gap = 1;
    while (gap &lt; n/3) {
        gap = 3 * gap + 1;  
    }
\/
    while (gap &gt;= 1) {
        for (int i = gap; i &lt; n; i += 1) {
            int temp = arr[i];
\/
            int j;
            for (j = i; j &gt;= gap && arr[j - gap] &gt; temp; j -= gap)
                arr[j] = arr[j - gap];
\/
            arr[j] = temp;
        }
        gap /= 3;
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def shell_sort_knuth(arr):
    n = len(arr)
\/
    gap = 1
    while gap &lt; n//3:
        gap = 3 * gap + 1  
\/
    while gap &gt;= 1:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j &gt;= gap and arr[j - gap] &gt; temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 3
    </code-block>
    </tab>
</tabs>

### 5.4 Shuffling

<procedure title="Knuth Shuffle">
<step>
    <p>In iteration <math>i</math>, pick integer <math>r</math> 
    between <math>0</math> and <math>i</math> uniformly at random.
    </p>
</step>
<step>
    <p>Swap <code>a[i]</code> and <code>a[r]</code>.</p>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Random;
\/
public class KnuthShuffle {
    public static void shuffle(int[] array) {
        int n = array.length;
        Random random = new Random();
        for (int i = 0; i &lt; n; i++) {
            int r = i + random.nextInt(n - i);
            int temp = array[i];
            array[i] = array[r];
            array[r] = temp;
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;random&gt;
#include &lt;algorithm&gt;
\/
void knuthShuffle(int array[], int n) {
    // std::random_device is a C++ class that generates truly random numbers.
    std::random_device rd;
    // std::mt19937 is a Mersenne Twister pseudo-random generator of 32-bit numbers.
    // However, it's not truly random and needs to be seeded to ensure different outputs for different program runs.
    // That's where std::random_device comes in.
    std::mt19937 gen(rd());
\/
    // std::uniform_int_distribution&lt;&gt; is a template class in C++ that produces random integers in a specified range.
    for(int i = 0; i &lt; n; i++) {
        std::uniform_int_distribution&lt;&gt; dis(i, n - 1);
        int r = dis(gen);
        std::swap(array[i], array[r]);
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
import random
\/
def knuth_shuffle(array):
n = len(array)
for i in range(n):
r = i + random.randint(0, n - i - 1)
array[i], array[r] = array[r], array[i]
    </code-block>
    </tab>
</tabs>

### 5.5 Convex Hull {id="convex-hull"}

<p><format color="DarkOrange">Convex Hull:</format> A convex hull of 
a set of <math>N</math> points is the smallest perimeter fence 
enclosing the points.</p>

<img src="../images_data/d5-5-1.png" alt="Convex Hull"/>

<p><format color="BlueViolet">Equivalent definitions</format></p>

<list type="bullet">
<li>
    <p>Smallest convex set containing all the points.</p>
</li>
<li>
    <p>Smallest area convex polygon enclosing the points.</p>
</li>
<li>
    <p>Convex polygon enclosing the points, whose vertices are points
    in set.</p>
</li>
</list>

<p><format color="BlueViolet">Geometric properties</format></p>

<list type="bullet">
<li>
    <p>Can traverse the convex hull by making only counterclockwise 
    turns.</p>
</li>
<li>
    <p>The vertices of convex hull appear in increasing order of polar
    angle with respect to point <math>p</math> with lowest <math>y
    </math>-coordinate.</p>
</li>
</list>

<img src="../images_data/d5-5-2.png" alt="Geometric Properties"/>

<procedure title="Graham Scan">
<step>
    <p>Choose point <math>p</math> with smallest <math>y</math>
    -coordinate.</p>
</step>
<step>
    <p>Sort points by polar angle with <math>p</math>.</p>
</step>
<step>
    <p>Consider points in order; discard unless it create a ccw 
    (counterclockwise) turn.</p>
</step>
</procedure>

<p><format color="BlueViolet">Implementing ccw:</format> Given three 
points <math>a</math>, <math>b</math>, and <math>c</math>, is <math>
a</math> -&gt; <math>b</math> -&gt; <math>c</math> a counterclockwise
turn?</p>

<procedure title="ccw">
<step>
    <p>Determinant (or cross product) gives <math>2 \times</math> 
    signed area of planar triangle.</p>
</step>
<step>
    <p>If signed area <math>\textgreater 0</math>, then <math>a</math>
    -&gt; <math>b</math> -&gt; <math>c</math> is counterclockwise.</p>
</step>
<step>
    <p>If signed area <math>\textless 0</math>, then <math>a</math>
    -&gt; <math>b</math> -&gt; <math>c</math> is clockwise.</p>
</step>
<step>
    <p>If signed area <math>= 0</math>, then <math>a</math> -&gt; 
    <math>b</math> -&gt; <math>c</math> are collinear.</p>
</step>
</procedure>

<p><format color="LawnGreen">Proof</format></p>

<code-block lang="tex">
\begin{equation}
2 \times \text{Area}(\triangle abc) = \begin{vmatrix} x_a & y_a & 1 \\ x_b & y_b & 1 \\ x_c & y_c & 1 \end{vmatrix} = (x_b - x_a)(y_c - y_a) - (y_b - y_a)(x_c - x_a)
\end{equation}
</code-block>

<img src="../images_data/d5-5-3.png" alt="Determinant and Positions"/>

<p><format color="BlueViolet">Applications</format></p>

<list type="bullet">
<li>
    <p>Hammer nails perpendicular to plane, stretch elastic rubber 
    band around points</p>
</li>
<li>
    <p>Find shortest path in the plane from <math>s</math> to <math>t
    </math> that avoids a polygonal obstacle.</p>
    <p>Shortest path is either straight line from <math>s</math> to 
    <math>t</math> or it is one of two polygonal chains of convex hull
    .</p>
    <img src="../images_data/d5-5-4.png" alt="Shortest Path"/>
</li>
<li>
    <p>Given <math>N</math> points in the plane, find a pair of points
    with the largest Euclidean distance between them.</p>
    <p>Farthest pair of points are extreme points on convex hull.</p>
</li>
</list>

<p><format color="BlueViolet">Cost of Convex Hull:</format> <math>N \log N + N</math></p>

<p><format color="LawnGreen">Proof:</format> Convex hull reduces to sorting</p>

<list type="bullet">
<li>
    <p><math>N \log N</math> cost of sorting</p>
</li>
<li>
    <p><math>N</math> cost of reduction</p>
</li>
</list>

<p><format color="BlueViolet">Point2D</format></p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Comparator;
\/
public record Point2D(double x, double y) implements Comparable&lt;Point2D&gt; {
\/
    public double distanceTo(Point2D that) {
        double dx = this.x - that.x;
        double dy = this.y - that.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
\/
    public double distanceSquaredTo(Point2D that) {
        double dx = this.x - that.x;
        double dy = this.y - that.y;
        return dx * dx + dy * dy;
    }
\/
    public int compareTo(Point2D that) {
        if (this.y &lt; that.y) return -1;
        if (this.y &gt; that.y) return +1;
        return Double.compare(this.x, that.x);
    }
\/
    public Comparator&lt;Point2D&gt; polarOrder() {
        return new PolarOrder();
    }
\/
    private class PolarOrder implements Comparator&lt;Point2D&gt; {
        public int compare(Point2D q1, Point2D q2) {
            double dx1 = q1.x - x;
            double dy1 = q1.y - y;
            double dx2 = q2.x - x;
            double dy2 = q2.y - y;
\/
            if (dy1 &gt;= 0 && dy2 &lt; 0) return -1;
            else if (dy2 &gt;= 0 && dy1 &lt; 0) return +1;
            else if (dy1 == 0 && dy2 == 0) {
                if (dx1 &gt;= 0 && dx2 &lt; 0) return -1;
                else if (dx2 &gt;= 0 && dx1 &lt; 0) return +1;
                else return 0;
            } else return -ccw(Point2D.this, q1, q2);
        }
    }
\/
    public static int ccw(Point2D a, Point2D b, Point2D c) {
        double area2 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        if (area2 &lt; 0) return -1;
        else if (area2 &gt; 0) return +1;
        else return 0;
    }
\/
    public boolean equals(Object other) {
        if (other == this) return true;
        if (other == null) return false;
        if (other.getClass() != this.getClass()) return false;
        Point2D that = (Point2D) other;
        return this.x == that.x && this.y == that.y;
    }
\/
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}
    </code-block>
    </tab>
    <tab title="C++ (Point2D.h)">
#ifndef POINT2D_H
#define POINT2D_H
\/
#include &lt;iostream&gt;
\/
class Point2D {
public:
    double x;
    double y;
\/
    Point2D(const double x, const double y) : x(x), y(y) {}
\/
    [[nodiscard]] double distanceTo(const Point2D& that) const;
\/
    [[nodiscard]] double distanceSquaredTo(const Point2D& that) const;
\/
    [[nodiscard]] int compareTo(const Point2D& that) const;
\/
    struct PolarOrder;
\/
    bool operator==(const Point2D& other) const;
\/
    friend std::ostream& operator&lt;&lt;(std::ostream& os, const Point2D& p);
\/
    static int ccw(const Point2D& a, const Point2D& b, const Point2D& c);
};
\/
struct Point2D::PolarOrder {
    Point2D origin;
    explicit PolarOrder(const Point2D& origin) : origin(origin) {}
    bool operator()(const Point2D& q1, const Point2D& q2) const;
};
\/
#endif // POINT2D_H
    </tab>
    <tab title="C++ (Point2D.cpp)">
    <code-block lang="c++" collapsible="true">
#include &lt;cmath&gt;
#include "Point2D.h"
\/
double Point2D::distanceTo(const Point2D& that) const {
    const double dx = this-&gt;x - that.x;
    const double dy = this-&gt;y - that.y;
    return std::sqrt(dx * dx + dy * dy);
}
\/
double Point2D::distanceSquaredTo(const Point2D& that) const {
    const double dx = this-&gt;x - that.x;
    const double dy = this-&gt;y - that.y;
    return dx * dx + dy * dy;
}
\/
int Point2D::compareTo(const Point2D& that) const {
    if (this-&gt;y &lt; that.y) return -1;
    if (this-&gt;y &gt; that.y) return +1;
    return (this-&gt;x &lt; that.x) ? -1 : (this-&gt;x &gt; that.x) ? 1 : 0;
}
\/
bool Point2D::PolarOrder::operator()(const Point2D& q1, const Point2D& q2) const {
    const double dx1 = q1.x - origin.x;
    const double dy1 = q1.y - origin.y;
    const double dx2 = q2.x - origin.x;
    const double dy2 = q2.y - origin.y;
\/
    if (dy1 &gt;= 0 && dy2 &lt; 0) return true;
    if (dy2 &gt;= 0 && dy1 &lt; 0) return false;
    if (dy1 == 0 && dy2 == 0) {
        if (dx1 &gt;= 0 && dx2 &lt; 0) return true;
        if (dx2 &gt;= 0 && dx1 &lt; 0) return false;
        return false;
    }
    return ccw(origin, q1, q2) &gt; 0;
}
\/
bool Point2D::operator==(const Point2D& other) const {
    return this-&gt;x == other.x && this-&gt;y == other.y;
}
\/
std::ostream& operator&lt;&lt;(std::ostream& os, const Point2D& p) {
    os &lt;&lt; "(" &lt;&lt; p.x &lt;&lt; ", " &lt;&lt; p.y &lt;&lt; ")";
    return os;
}
\/
int Point2D::ccw(const Point2D& a, const Point2D& b, const Point2D& c) {
    double area2 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    if (area2 &lt; 0) return -1;
    else if (area2 &gt; 0) return +1;
    else return 0;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
import math
\/
class Point2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y
\/
    def distance_to(self, that):
        dx = self.x - that.x
        dy = self.y - that.y
        return math.sqrt(dx * dx + dy * dy)
\/
    def distance_squared_to(self, that):
        dx = self.x - that.x
        dy = self.y - that.y
        return dx * dx + dy * dy
\/
    def __lt__(self, that):
        if self.y &lt; that.y:
            return True
        if self.y &gt; that.y:
            return False
        return self.x &lt; that.x
\/
    def __eq__(self, other):
        if other == self:
            return True
        if other is None:
            return False
        if type(other) != type(self):
            return False
        return self.x == other.x and self.y == other.y
\/
    def __str__(self):
        return "(" + str(self.x) + ", " + str(self.y) + ")"
\/
    @staticmethod
    def ccw(a, b, c):
        area2 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
        if area2 &lt; 0:
            return -1
        elif area2 &gt; 0:
            return +1
        else:
            return 0
    </code-block>
    </tab>
</tabs>

<p><format color="BlueViolet">Graham Scan</format></p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Arrays;
import java.util.Stack;
\/
public class GrahamScan {
    private final Stack&lt;Point2D&gt; hull = new Stack&lt;Point2D&gt;();
\/
    public GrahamScan(Point2D[] points) {
        if (points == null) throw new IllegalArgumentException("argument is null");
        if (points.length == 0) throw new IllegalArgumentException("array is of length 0");
\/
        int n = points.length;
        Point2D[] a = new Point2D[n];
        for (int i = 0; i &lt; n; i++) {
            if (points[i] == null)
                throw new IllegalArgumentException("points[" + i + "] is null");
            a[i] = points[i];
        }
\/
        Arrays.sort(a);
        Arrays.sort(a, 1, n, a[0].polarOrder());
        hull.push(a[0]);
\/
        int k1;
        for (k1 = 1; k1 &lt; n; k1++)
            if (!a[0].equals(a[k1])) break;
        if (k1 == n) return;
\/
        int k2;
        for (k2 = k1 + 1; k2 &lt; n; k2++)
            if (Point2D.ccw(a[0], a[k1], a[k2]) != 0) break;
        hull.push(a[k2 - 1]);
\/
        for (int i = k2; i &lt; n; i++) {
            Point2D top = hull.pop();
            while (Point2D.ccw(hull.peek(), top, a[i]) &lt;= 0) {
                top = hull.pop();
            }
            hull.push(top);
            hull.push(a[i]);
        }
\/
        assert isConvex();
    }
\/
    public Iterable&lt;Point2D&gt; hull() {
        Stack&lt;Point2D&gt; s = new Stack&lt;Point2D&gt;();
        for (Point2D p : hull) s.push(p);
        return s;
    }
\/
    private boolean isConvex() {
        int n = hull.size();
        if (n &lt;= 2) return true;
\/
        Point2D[] points = new Point2D[n];
        int k = 0;
        for (Point2D p : hull()) {
            points[k++] = p;
        }
\/
        for (int i = 0; i &lt; n; i++) {
            if (Point2D.ccw(points[i], points[(i + 1) % n], points[(i + 2) % n]) &lt;= 0) {
                return false;
            }
        }
        return true;
    }
}
    </code-block>
    </tab>
    <tab title="C++ (GrahamScan.h)">
    <code-block lang="c++" collapsible="true">
#ifndef GRAHAMSCAN_H
#define GRAHAMSCAN_H
\/
#include "Point2D.h"
#include &lt;vector&gt;
#include &lt;stack&gt;
\/
class GrahamScan {
private:
    std::stack&lt;Point2D&gt; hull;
    [[nodiscard]] bool isConvex() const;
\/
public:
    explicit GrahamScan(std::vector&lt;Point2D&gt;& points);
\/
    [[nodiscard]] std::vector&lt;Point2D&gt; hullPoints() const;
};
\/
#endif // GRAHAMSCAN_H
    </code-block>
    </tab>
    <tab title="C++ (GrahamScan.cpp)">
    <code-block lang="c++" collapsible="true">
#include &lt;algorithm&gt;
#include "GrahamScan.h"
\/
GrahamScan::GrahamScan(std::vector&lt;Point2D&gt;& points) {
    if (points.empty()) throw std::invalid_argument("array is of length 0");
\/
    const int n = static_cast&lt;int&gt;(points.size());
\/
    std::ranges::sort(points, [](const Point2D& a, const Point2D& b) {
        return a.compareTo(b) &lt; 0;
    });
\/
    std::sort(points.begin() + 1, points.end(), Point2D::PolarOrder(points[0]));
\/
    hull.push(points[0]);
\/
    int k1;
    for (k1 = 1; k1 &lt; n; k1++)
        if (points[0] != points[k1]) break;
    if (k1 == n) return;
\/
    int k2;
    for (k2 = k1 + 1; k2 &lt; n; k2++)
        if (Point2D::ccw(points[0], points[k1], points[k2]) != 0) break;
    hull.push(points[k2 - 1]);
\/
    for (int i = k2; i &lt; n; i++) {
        Point2D top = hull.top();
        hull.pop();
        while (Point2D::ccw(hull.top(), top, points[i]) &lt;= 0) {
            top = hull.top();
            hull.pop();
        }
        hull.push(top);
        hull.push(points[i]);
    }
}
\/
std::vector&lt;Point2D&gt; GrahamScan::hullPoints() const {
    std::vector&lt;Point2D&gt; s;
    std::stack&lt;Point2D&gt; tempHull = hull;
    while (!tempHull.empty()) {
        s.push_back(tempHull.top());
        tempHull.pop();
    }
    std::ranges::reverse(s);
    return s;
}
\/
bool GrahamScan::isConvex() const {
    const int n = static_cast&lt;int&gt;(hull.size());
    if (n &lt;= 2) return true;
\/
    const std::vector&lt;Point2D&gt; points = hullPoints();
\/
    for (int i = 0; i &lt; n; i++) {
        if (Point2D::ccw(points[i], points[(i + 1) % n], points[(i + 2) % n]) &lt;= 0) {
            return false;
        }
    }
    return true;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from Point2D import Point2D
\/
class GrahamScan:
    def __init__(self, points):
        if points is None:
            raise ValueError("argument is null")
        if not points:
            raise ValueError("array is of length 0")
\/
        n = len(points)
        a = sorted(points)
\/
        def polar_order(p1, p2):
            dx1 = p1.x - a[0].x
            dy1 = p1.y - a[0].y
            dx2 = p2.x - a[0].x
            dy2 = p2.y - a[0].y
\/
            if dy1 &gt;= 0 &gt; dy2:
                return -1
            elif dy2 &gt;= 0 &gt; dy1:
                return +1
            elif dy1 == 0 and dy2 == 0:
                if dx1 &gt;= 0 &gt; dx2:
                    return -1
                elif dx2 &gt;= 0 &gt; dx1:
                    return +1
                else:
                    return 0
            else:
                return -Point2D.ccw(a[0], p1, p2)
\/
        a[1:] = sorted(a[1:], key=lambda p: (p.y - a[0].y, p.x - a[0].x))
\/
        self.hull = [a[0], a[1]]
\/
        for i in range(2, n):
            top = self.hull.pop()
            while Point2D.ccw(self.hull[-1], top, a[i]) &lt;= 0:
                top = self.hull.pop()
            self.hull.append(top)
            self.hull.append(a[i])
\/
    def hull_points(self):
        return self.hull
\/
    def _is_convex(self):
        n = len(self.hull)
        if n &lt;= 2:
            return True
\/
        for i in range(n):
            if Point2D.ccw(self.hull[i], self.hull[(i + 1) % n], self.hull[(i + 2) % n]) &lt;= 0:
                return False
        return True
    </code-block>
    </tab>
</tabs>

## 6. Mergesort {id="mergesort"}

### 6.1 Mergesort

<list type="bullet">
<li>
    <p>Time complexity: <math>O(N \log N)</math>.</p>
</li>
<li>
    <p>Space complexity: <math>O(N)</math>.</p>
</li>
</list>

<procedure title="Merge Sort">
<step>
    <p>Divide the array into two halves.</p>
</step>
<step>
    <p><format color="OrangeRed">Recursively</format> sort each half.
    </p>
</step>
<step>
    <p>Merge two halves.</p>
</step>
</procedure>

<p><format color="DarkOrange">In-place:</format> A sorting algorithm 
is <format color="OrangeRed"> in-place</format> if it uses 
<math>\leq c \log N</math> extra memory.</p>

<p>Example: Insertion sort, selection sort, shellsort.</p>

<p><format color="BlueViolet">Property:</format> Mergesort uses at 
most <math>N \lg N</math> compares and <math>6N \lg N</math> array 
accesses to sort any array of size <math>N</math>.</p>

<p><format color="LawnGreen">Proof</format></p>

<p>The number of compares <math>C(N)</math> and array accesses
<math>A(N)</math> to mergesort an array of size 
<math>N</math> satisfies the recurrences:</p>

<code-block lang="tex"> 
C(N) \leq C(\lceil \frac {N}{2} \rceil) + C(\lfloor \frac {N}{2} \rfloor) + N, N > 1, C(1) = 0
</code-block>

<code-block lang="tex">
A(N) \leq A(\lceil \frac {N}{2} \rceil) + A(\lfloor \frac {N}{2} \rfloor) + N, N > 1, A(1) = 0
</code-block>

<p>-&gt;</p>

<code-block lang="tex">
D(N) = 2D(\frac {N}{2}) + N, D(1) = 0 => D(N) = N lg N
</code-block>

<p><format color="LawnGreen">Prove <math>D(N) = N \lg N</math>:
</format> </p>

<code-block lang="tex">
D(N) = 2D(\frac {N}{2}) + N
</code-block>

<p>And we have:</p>

<code-block lang="tex">
\begin{align*}
D(N)/N &= \frac {2D(\frac {N}{2})}{N} + 1 \\
       &= \frac {D(\frac {N}{2})}{\frac {N}{2}} + 1 \\
       &= \frac {D(\frac {N}{4})}{\frac {N}{4}} + 1 + 1 \\
       &= \frac {D(\frac {N}{8})}{\frac {N}{8}} + 1 + 1 + 1 \\
       &= ... \\
       &= \frac {D(\frac {N}{N})}{\frac {N}{N}} + 1 + 1 + ... + 1 \\
       &= \lg N \\
(QED)
\end{align*}
</code-block>

<tip>
<p>Assertion: Statement to test assumptions about your program.</p>
<list type="bullet">
<li>
    <p>Help detect bugs.</p>
</li>
<li>
    <p>Documents code.</p>
</li>
</list>
</tip>

<note>
<p>For more information about the performance of mergesort, please 
refer to the <a href="Data-Structures-and-Algorithms-3.md" 
anchor="sortperf" summary="Table for Comparing Performance of Sorting
Algorithm">table for sorting performance</a> or the <a 
anchor="conclusion" summary="Conclusion">conclusion table</a>.</p>
</note>

<tip>
<p>Use <format color="OrangeRed">Comparable interface</format> in Java
to compare objects.</p>
</tip>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Comparator;
\/
public class Merge {
    private static &lt;T&gt; void merge(T[] a, T[] aux, int lo, int mid, int hi, Comparator&lt;T&gt; comparator) {
        System.arraycopy(a, lo, aux, lo, hi - lo + 1);
\/
        int i = lo, j = mid + 1;
        for (int k = lo; k &lt;= hi; k++) {
            if (i &gt; mid) a[k] = aux[j++];
            else if (j &gt; hi) a[k] = aux[i++];
            else if (comparator.compare(aux[j], aux[i]) &lt; 0) a[k] = aux[j++]; // Correct comparison
            else a[k] = aux[i++];
        }
    }
\/
    private static &lt;T&gt; void sort(T[] a, T[] aux, int lo, int hi, Comparator&lt;T&gt; comparator) {
        if (hi &lt;= lo) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, aux, lo, mid, comparator); 
        sort(a, aux, mid + 1, hi, comparator); 
        merge(a, aux, lo, mid, hi, comparator); 
    }
\/
    public static &lt;T&gt; void sort(T[] a, Comparator&lt;T&gt; comparator) {
        T[] aux = (T[]) new Object[a.length];
        sort(a, aux, 0, a.length - 1, comparator);
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;functional&gt; // For std::less (optional)
\/
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
void merge(T arr[], T aux[], const int lo, const int mid, const int hi, Comparator comparator = {}) {
    for (int k = lo; k &lt;= hi; k++) {
        aux[k] = arr[k];
    }
\/
    int i = lo, j = mid + 1;
    for (int k = lo; k &lt;= hi; k++) {
        if (i &gt; mid) arr[k] = aux[j++];
        else if (j &gt; hi) arr[k] = aux[i++];
        else if (comparator(aux[j], aux[i])) arr[k] = aux[j++];
        else arr[k] = aux[i++];
    }
}
\/
template &lt;typename T, typename Comparator&gt;
void mergeSort(T arr[], T aux[], int lo, int hi, Comparator comparator) {
    if (hi &lt;= lo) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(arr, aux, lo, mid, comparator);
    mergeSort(arr, aux, mid + 1, hi, comparator);
    merge(arr, aux, lo, mid, hi, comparator);
}
\/
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
void mergeSort(T arr[], const int size, Comparator comparator = {}) {
    T* aux = new T[size];
    mergeSort(arr, aux, 0, size - 1, comparator); // Call the correct overload
    delete[] aux;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def merge_sort(arr, comparator=lambda x, y: x &lt; y):
    if len(arr) &gt; 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]
\/
        merge_sort(left_half, comparator)
        merge_sort(right_half, comparator)
\/
        i = j = k = 0
        while i &lt; len(left_half) and j &lt; len(right_half):
            if comparator(left_half[i], right_half[j]):
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1
\/
        while i &lt; len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1
\/
        while j &lt; len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1
    </code-block>
    </tab>
</tabs>

### 6.2 Bottom-Up Mergesort

<note>
<p>No recursion needed!</p>
</note>

<procedure title="Bottom-Up Mergesort">
<step>
    <p>Pass through array, merging subarrays of size 1.</p>
</step>
<step>
    <p>Repeat for subarrays of size 2, 4, 8, 16, ...</p>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class MergeBU {
    private static Comparable[] aux;
\/
    private static void merge(Comparable[]a, int lo, int mid, int hi) {
        assert isSorted(a, lo, mid); // precondition: a[lo...mid] is sorted
        assert isSorted(a, mid+1, hi); // precondition: a[mid+1...hi] is sorted
\/
        for (int k = lo; k &lt;= hi; k++) {
            aux[k] = a[k];
        }
\/
        int i = lo, j = mid+1;
        for (int k = lo; k &lt;= hi; k++) {
            if (i &gt; mid) a[k] = aux[j++];
            else if (j &gt; hi) a[k] = aux[i++];
            else if (less(aux[j], aux[i])) a[k] = aux[j++];
            else a[k] = aux[i++];
        }
\/
        assert isSorted(a, lo, hi); // postcondition: a[lo...hi] is sorted
    }
\/
    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) &lt; 0;
    }
\/
    public static void sort(Comparable[]a) {
        int N = a.length;
        aux = new Comparable[N];
        for (int sz = 1; sz &lt; N; sz++)
            for (int lo = 0; lo &lt; N-sz; lo += sz+sz)
                merge(a, lo, lo+sz-1, Math.min(lo+sz+sz-1, N-1));
    }
\/
    private static boolean isSorted(Comparable[] a, int lo, int hi) {
        for (int i = lo + 1; i &lt;= hi; i++)
            if (less(a[i], a[i-1])) return false;
        return true;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;vector&gt;
#include &lt;algorithm&gt;
\/
class MergeBU {
public:
    static void merge(std::vector&lt;int&gt;& a, int lo, int mid, int hi) {
        std::vector&lt;int&gt; aux(a);
\/
        int i = lo, j = mid+1;
        for (int k = lo; k &lt;= hi; k++) {
            if (i &gt; mid) a[k] = aux[j++];
            else if (j &gt; hi) a[k] = aux[i++];
            else if (aux[j] &lt; aux[i]) a[k] = aux[j++];
            else a[k] = aux[i++];
        }
    }
\/
    static void sort(std::vector&lt;int&gt;& a) {
        int N = a.size();
        for (int sz = 1; sz &lt; N; sz = sz+sz)
            for (int lo = 0; lo &lt; N-sz; lo += sz+sz)
                merge(a, lo, lo+sz-1, std::min(lo+sz+sz-1, N-1));
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def merge(a, lo, mid, hi):
    aux = a.copy()
\/
    i = lo
    j = mid + 1
    for k in range(lo, hi + 1):
        if i &gt; mid:
            a[k] = aux[j]
            j += 1
        elif j &gt; hi:
            a[k] = aux[i]
            i += 1
        elif aux[j] &lt; aux[i]:
            a[k] = aux[j]
            j += 1
        else:
            a[k] = aux[i]
            i += 1
\/
    assert a[lo:hi + 1] == sorted(a[lo:hi + 1]), "Array is not sorted"
\/
def sort(a):
    N = len(a)
    sz = 1
    while sz &lt; N:
        lo = 0
        while lo &lt; N - sz:
            merge(a, lo, lo + sz - 1, min(lo + sz + sz - 1, N - 1))
        lo += sz + sz
        sz += 1
    </code-block>
    </tab>
</tabs>

### 6.3 Computational Complexity

<p><format color="BlueViolet">Definitions</format></p>

<list type="bullet">
<li>
    <p><format color="DarkOrange">Computational complexity:</format> 
    Framework to study efficiency of algorithms for solving a 
    particular problem <math>X</math>.</p>
</li>
<li>
    <p><format color="DarkOrange">Model of computation:</format> 
    Allowable operations.</p>
</li>
<li>
    <p><format color="DarkOrange">Cost model:</format> Operation 
    count(s).</p>
</li>
<li>
    <p><format color="DarkOrange">Upper bound:</format> Cost guarantee 
    provided by <format color="OrangeRed">some</format> algorithm for 
    <math>X</math>.</p>
</li>
<li>
    <p><format color="DarkOrange">Lower bound:</format> Proven limit 
    on cost guarantee of <format color="OrangeRed">all</format> 
    algorithms for <math>X</math>.</p>
</li>
<li>
    <p><format color="DarkOrange">Optimal algorithm:</format> 
    Algorithm with best possible cost guarantee for <math>X</math>.
    </p>
</li>
</list>

<p><format color="BlueViolet">Example: sorting</format></p>

<list>
<li>
    <p><format color="Fuchsia">Model of computation:</format> decision
    tree (can access information only through compares).</p>
</li>
<li>
    <p><format color="Fuchsia">Cost model:</format> Number of compares
    .</p>
</li>
<li>
    <p><format color="Fuchsia">Upper bound:</format> <math>
    \sim N \lg N</math> from mergesort.</p>
</li>
<li>
    <p><format color="Fuchsia">Lower bound:</format> <math>
    N \lg N</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Optimal algorithm</format> = mergesort.</p></li>
</list>

<p><format color="BlueViolet">Property:</format> Any compare-based 
sorting algorithm must use at least <math>\lg(N!) \sim N \lg N</math> 
compares in the worst case.</p>

<p><format color="BlueViolet">Proof</format></p>

<list>
<li>
    <p>Assume array consists of <math>N</math> distinct values</p>
    <math>a_{1}</math> through <math>a_{N}</math>.
</li>
<li>
    <p>Worst case dictated by <format color="OrangeRed">height
    </format> <math>h</math> of decision tree.</p>
</li>
<li>
    <p>Binary tree of height <math>h</math> has at most 
    <math>2^h</math> leaves.</p>
</li>
<li>
    <p><math>N!</math> different orderings => at least <math>N!</math>
    leaves.</p>
</li>
</list>

<code-block lang="tex">
\begin{align*}
& 2^{h} \geq \text{\# leaves} \geq N! \\
\Rightarrow & h \geq \lg(N!) \sim N \lg N \\
\end{align*}
</code-block>

### 6.4 Stability

<p><format color="DarkOrange">Stability:</format> A <format color
="OrangeRed">stable</format> sort preserves the relative order of 
items with equal keys.</p>

<p><format color="BlueViolet">Methods</format></p>

<list type="decimal">
<li>
    <p>Need to carefully check the code (&quot;less than&quot; vs 
    &quot; less than or equal to&quot;). Equal items never move past
    each other -&gt; stable sort.</p>
</li>
<li>
    <p>Counterexample: Long-distance exchange might move an item past
    some equal item.</p>
</li>
</list>

<p><format color="BlueViolet">Conclusion</format></p>

<list>
<li>
    <p><format color="Fuchsia">Stable sort:</format> Insertion sort, 
    mergesort, bubble sort, radix sort, etc.</p>
</li>
<li>
    <p><format color="Fuchsia">Unstable sort:</format> Selection sort,
    shellsort, quicksort, heapsort, etc.</p>
</li>
</list>

## 7 Quicksort {id="quicksort"}

### 7.1 Quicksort

<procedure title="Quicksort">
<step>
    <format color="OrangeRed">Shuffle</format> the array.
</step>
<step>
    <format color="OrangeRed">Partition</format> so that, for some 
    <math>j</math>:
    <list>
    <li>
        <p>Entry <code>a[j]</code> is in place;</p>
    </li>
    <li>
        <p>No larger entry to the left of <math>j</math>;</p>
    </li>
    <li>
        <p>No smaller entry to the right of <math>j</math>.</p>
    </li>
    </list>
</step>
<step>
    <p><format color="OrangeRed">Sort</format> each piece recursively
    .</p>
</step>
</procedure>

<procedure title="Quicksort Partitioning">
<step>
    <p>Scan <math>i</math> from left to right so long as 
    (a[i] &lt; a[lo]).</p>
</step>
<step>
    <p>Scan <math>j</math> from right to left so long as (a[j] &gt; 
    a[lo]).</p>
</step>
<step>
    <p>Exchange a[i] with a[j], repeat until <math>i</math> and 
    <math>j</math> pointers cross.</p>
</step>
<step>
    <p>When pointers cross, Exchange a[lo] with a[j].</p>
</step>
</procedure>

<p><format color="BlueViolet">Runtime Analysis</format></p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Time complexity:</format> <math>
    O(N log N)</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Best case:</format> Number of compares
    is <math>\sim N \lg N</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Worst case:</format> Number of 
    compares is <math>\sim \frac{1}{2} N^{2}</math>.</p>
</li>
</list>

<p><format color="BlueViolet">Property:</format> The average number of 
compares <math>C_{N}</math> to quicksort an array of <math>N</math> 
distinct keys is <math>\sim 2N \ln N </math> (and the number of 
exchanges is <math>\sim \frac{1}{3} N \ln N </math>).</p>

<p><format color="LawnGreen">Proof</format></p>

<p><math>C_{N}</math> satisfies the recurrence <math>C_0 = C_1 = 0
</math> and for <math>N \leq 2</math>:</p>

<code-block lang="tex">
C_N = (N + 1) + \frac{C_0 + C_{N-1}}{N} + \frac{C_1 + C_{N-2}}{N} + \ldots + \frac{C_{N-1} + C_0}{N}
</code-block>

<note>
<p><math>N + 1</math> stands for partititoning, and the rest stands 
for partitioning probability.</p>
</note>

<list type="bullet">
<li>
    <p>Multiply both sides by <math>N</math> and collect terms:</p>
    <code-block lang="tex">
    NC_{N} = N(N+1) + 2(C_0 + C_1 + \ldots + C_{N-1})
    </code-block>
</li>
<li>
    <p>Subtract this from the same equation for <em>N</em> - 1:</p>
    <code-block lang="tex">
    NC_{N} - (N-1)C_{N-1} = 2N + 2C_{N-1}
    </code-block>
</li>
<li>
    <p>Repeatedly apply above equation:</p>
    <code-block lang="tex">
    \begin{align*}
    \frac{C_{N}}{N+1} &= \frac{C_{N-1}}{N} + \frac{2}{N+1} \\
    &= \frac{C_{N-2}}{N-1} + \frac{2}{N} + \frac{2}{N+1} \\
    &= \frac{C_{N-3}}{N-2} + \frac{2}{N-1} + \frac{2}{N} + \frac{2}{N+1} \\
    &= \frac{2}{3} + \frac{2}{4} + \frac{2}{5} + \ldots + \frac{2}{N+1}
    \end{align*}
    </code-block>
</li>
<li>
    <p>Approximate sum by integral:</p>
    <code-block lang="tex">
    \begin{align*}
    C_{N} &= 2(N + 1)\left(\frac{1}{3} + \frac{1}{4} + \frac{1}{5} + \ldots + \frac{1}{N + 1}\right) \\
    &\sim 2(N + 1) \int_{3}^{N+1} \frac{1}{x} dx
    \end{align*}
    </code-block>
</li>
<li>
    <p>Finally, desired result:</p>
    <code-block lang="tex">
    C_{N} \sim 2N \ln N \approx 1.39N \ln N
    </code-block>
</li>
</list>

<p>Quicksort is an in-place, non-stable sorting algorithm.</p>

<p><format color="BlueViolet">Summary of performance characteristics:
</format></p>

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">Worst case:</format> Number of 
    compares are quadratic.</p>
    <list type="bullet">
    <li>
        <code-block lang="tex">
        N + (N - 1) + (N - 2) + \text{...} + 1  \sim \frac{1}{2} N^{2}
        </code-block>
    </li>
    <li>
        <p>More likely that your computer is struck by lightning bolt.</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">Average case:</format> Number of 
    compares is <math>\sim 1.39 N \lg N</math>.</p>
    <list type="bullet">
    <li>
        <p>39% more compares than mergesort.</p>
    </li>
    <li>
        <p><format color="OrangeRed">But</format> faster than 
        mergesort in practice because of less data movement.</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">Random shuffle</format></p>
    <list type="bullet">
    <li>
        <p>Probabilistic guarantee against worst case.</p>
    </li>
    <li>
        <p>Basis for math model that can be validated with experiments
        .</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">Caveat emptor</format></p>
    <p>Many textbook implementations go <format color="OrangeRed">
    quadratic</format> if array:</p>
    <list type="bullet">
    <li>
        <p>Is sorted or reverse sorted.</p>
    </li>
    <li>
        <p>Has many duplicates (even if randomized!)</p>
    </li>
    </list>
</li>
</list>

<note>
<p>For more information about the performance of quicksort, please 
refer to the <a href="Data-Structures-and-Algorithms-3.md" 
anchor="sortperf" summary="Table for Comparing Performance of Sorting
Algorithm">table for sorting performance</a> or the <a 
anchor="conclusion" summary="Conclusion">conclusion table</a>.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Comparator;
\/
public class Quick {
    private static final int CUTOFF = 10;
\/
    private static &lt;T&gt; int partition(T[] a, int lo, int hi, Comparator&lt;? super T&gt; comparator) {
        int i = lo, j = hi + 1;
        while (true) {
            while (comparator.compare(a[++i], a[lo]) &lt; 0) {
                if (i == hi) break;
            }
            while (j &gt; lo && comparator.compare(a[lo], a[--j]) &lt; 0) {
                if (j == lo) break;
            }
            if (i &gt;= j) break;
            exch(a, i, j);
        }
        exch(a, lo, j);
        return j;
    }
\/
    public static &lt;T&gt; void sort(T[] a, Comparator&lt;? super T&gt; comparator) {
        sort(a, 0, a.length - 1, comparator);
    }
\/
    private static &lt;T&gt; void sort(T[] a, int lo, int hi, Comparator&lt;? super T&gt; comparator) {
        if (hi &lt;= lo + CUTOFF - 1) {
            insertionSort(a, lo, hi, comparator);
            return;
        }
        int j = partition(a, lo, hi, comparator);
        sort(a, lo, j - 1, comparator);
        sort(a, j + 1, hi, comparator);
    }
\/
    private static &lt;T&gt; void insertionSort(T[] a, int lo, int hi, Comparator&lt;? super T&gt; comparator) {
        for (int i = lo + 1; i &lt;= hi; i++) {
            for (int j = i; j &gt; lo && comparator.compare(a[j], a[j - 1]) &lt; 0; j--) {
                exch(a, j, j - 1);
            }
        }
    }
\/
    private static &lt;T&gt; void exch(T[] a, int i, int j) {
        T swap = a[i];
        a[i] = a[j];
        a[j] = swap;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;functional&gt;
#include &lt;algorithm&gt;
\/
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
int partition(T arr[], int lo, const int hi, Comparator comparator = {}) {
    int i = lo, j = hi + 1;
    while (true) {
        while (comparator(arr[++i], arr[lo])) {
            if (i == hi) break;
        }
        while (j &gt; lo && comparator(arr[lo], arr[--j])) {
            if (j == lo) break;
        }
        if (i &gt;= j) break;
        std::swap(arr[i], arr[j]);
    }
    std::swap(arr[lo], arr[j]);
    return j;
}
\/
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
void sort(T arr[], int lo, int hi, Comparator comparator = {}) {
    constexpr int CUTOFF = 10;
    if (hi &lt;= lo + CUTOFF - 1) {
        std::sort(arr + lo, arr + hi + 1, comparator);
        return;
    }
    const int j = partition(arr, lo, hi, comparator);
    sort(arr, lo, j - 1, comparator);
    sort(arr, j + 1, hi, comparator);
}
\/
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
void sort(T arr[], const int n, Comparator comparator = {}) {
    sort(arr, 0, n - 1, comparator);
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def partition(arr, lo, hi, comparator):
    i, j = lo, hi + 1
    while True:
        while comparator(arr[i + 1], arr[lo]) &lt; 0:
            i += 1
            if i == hi:
                break
        while comparator(arr[lo], arr[j - 1]) &lt; 0 and j &gt; lo:
            j -= 1
            if j == lo:
                break
        if i &gt;= j:
            break
        arr[i], arr[j] = arr[j], arr[i]
    arr[lo], arr[j] = arr[j], arr[lo]
    return j
\/
\/
def insertion_sort(arr, lo, hi, comparator):
    for i in range(lo + 1, hi + 1):
        j = i
        while j &gt; lo and comparator(arr[j], arr[j - 1]) &lt; 0:
            arr[j], arr[j - 1] = arr[j - 1], arr[j]
            j -= 1
\/
\/
def sort(arr, lo, hi, comparator):
    CUTOFF = 10
    if hi &lt;= lo + CUTOFF - 1:
        insertion_sort(arr, lo, hi, comparator)
        return
    j = partition(arr, lo, hi, comparator)
    sort(arr, lo, j - 1, comparator)
    sort(arr, j + 1, hi, comparator)
\/
\/
def quicksort(arr, comparator=lambda x, y: x &lt; y):
    sort(arr, 0, len(arr) - 1, comparator)
    </code-block>
    </tab>
</tabs>

### 7.2 Selection

<p>Goal: Given an array of <math>N</math> items, find the 
<math>k ^ {\text{th}}</math> largest.</p>

<procedure title="Quick Selection">
<step>
    <p>Partition array so that entry <code>a[j]</code> is in place.
    </p>
</step>
<step>
    <p>Repeat in <format color="OrangeRed">one</format> subarray, 
    depending on <math>j</math>; finished when <math>j</math> equals
    <math>k</math>.</p>
</step>
</procedure>

<img src="../images_data/d7-2-1.png" alt="Quick Select"/>

<p><format color="BlueViolet">Property:</format> Quick-select takes
<format color="OrangeRed">linear</format> time on average.</p>

<p><format color="LawnGreen">Proof</format></p>

<list type="bullet">
<li>
    <p>Intuitively, each partitioning step splits array 
    approximately in half: <math>N + \frac {N}{2} + \frac {N}{4}
    + \text{...} + 1 \sim 2N</math> compares.</p>
</li>
<li>
    <p>Formal analysis similar to quicksort analysis yields:</p>
    <code-block lang="tex">
    C_{N} = 2N + 2k \ln \frac {N}{k} + 2(N - k) \ln \frac {N}{N - k}
    </code-block>
    <p><math>(2 + 2 \ln 2)N</math> to find the median</p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public static &lt;T&gt; T select(T[] a, int k, Comparator&lt;? super T&gt; comparator) {
    int lo = 0, hi = a.length - 1;
    while (hi &gt; lo) {
        int j = partition(a, lo, hi, comparator);
        if (j &lt; k) lo = j + 1;
        else if (j &gt; k) hi = j - 1;
        else return a[k];
    }
    return a[k];
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
T select(T arr[], int k, int lo, int hi, Comparator comparator = {}) {
    while (hi &gt; lo) {
        int j = partition(arr, lo, hi, comparator);
        if (j &lt; k) lo = j + 1;
        else if (j &gt; k) hi = j - 1;
        else return arr[k];
    }
    return arr[k];
}
\/
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
T select(T arr[], const int n, int k, Comparator comparator = {}) {
    return select(arr, k, 0, n - 1, comparator);
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def select(arr, k, lo, hi, comparator):
    while hi &gt; lo:
        j = partition(arr, lo, hi, comparator)
        if j &lt; k:
            lo = j + 1
        elif j &gt; k:
            hi = j - 1
        else:
            return arr[k]
    return arr[k]
\/
\/
def quickselect(arr, k, comparator=lambda x, y: x &lt; y):
    return select(arr, k, 0, len(arr) - 1, comparator)
    </code-block>
    </tab>
</tabs>

### 7.3 Duplicate Keys {id="3-way-partitioning"}

<p><format color="BlueViolet">Problem of quicksort with duplicate 
keys</format> </p>

<list type="bullet">
<li>
    <p>Mergesort with duplicate keys: Always between
    <math>\frac {1}{2} N \lg N</math> and <math>N \lg N</math> 
    compares.</p>
</li>
<li>
    <p>Quicksort with duplicate keys: Algorithm goes <format 
    color="OrangeRed">quadratic</format> unless partitioning stops on
    equal keys.</p>
</li>
</list>

<p><format color="BlueViolet">Goal:</format> Partitioning array into 
3 parts so that:</p>

<list type="bullet">
<li>
    <p>Entries between lt and gt equal to partitioning item v.</p>
</li>
<li>
    <p>No larger entries to left of lt.</p>
</li>
<li>
    <p>No smaller entries to right of gt.</p>
</li>
</list>

<procedure title="Dijkstra 3-way Partitioning">
<step>
    <p>Let v be partitioning item a[lo].</p>
</step>
<step>
    <p>Scan i from left to right.</p>
    <list type="bullet">
    <li>
        <p><format color="Fuchsia">a[i] &lt; v:</format> exchange 
        a[lt] with a[i]; increment both <math>lt</math> and <math>i
        </math>.</p>
    </li>
    <li>
        <p><format color="Fuchsia">a[i] &gt; v:</format> exchange 
        a[gt] with a[i]; decrement <math>gt</math>.</p>
    </li>
    <li>
        <p><format color="Fuchsia">a[i] == v:</format> increment 
        <math>i</math>.</p>
    </li>
    </list>
</step>
</procedure>

<img src="../images_data/d7-3-1.png" alt="3-way Partitioning"/>

<p>Sorting lower bound: If there are <math>n</math> distinct keys and
the <math>i ^ {\text{th}}</math> one occurs <math>x_{i}</math>, any 
compare-based sorting algorithm must use at least</p>

<code-block lang="tex">
\lg\left(\frac{N!}{x_1!x_2!\ldots x_n!}\right) \sim \sum_{i=1}^{n} x_i \lg\left(\frac{x_i}{N}\right)
</code-block>

<p>compares in the worst case (<math>N \log N</math> when all distinct
; linear when only a constant number of distinctive keys).</p>

<p><format color="BlueViolet">Property:</format> Quicksort with 3-way
partitioning is entropy-optimal.</p>

<note>
<p>For more information about the performance of quicksort, please 
refer to the <a anchor="conclusion" summary="Conclusion">
conclusion table</a>.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Comparator;
\/
public class Dijkstra3WayPartition {
    private static final int CUTOFF = 10;
\/
    private static &lt;T&gt; void sort(T[] a, Comparator&lt;? super T&gt; comparator) {
        sort(a, 0, a.length - 1, comparator);
    }
\/
    private static &lt;T&gt; void sort(T[] a, int lo, int hi, Comparator&lt;? super T&gt; comparator) {
        if (hi &lt;= lo + CUTOFF - 1) {
            insertionSort(a, lo, hi, comparator);
            return;
        }
        int lt = lo, gt = hi;
        T v = a[lo];
        int i = lo + 1;
        while (i &lt;= gt) {
            int cmp = comparator.compare(a[i], v);
            if (cmp &lt; 0) exch(a, lt++, i++);
            else if (cmp &gt; 0) exch(a, i, gt--);
            else i++;
        }
\/
        sort(a, lo, lt - 1, comparator);
        sort(a, gt + 1, hi, comparator);
    }
\/
    private static &lt;T&gt; void insertionSort(T[] a, int lo, int hi, Comparator&lt;? super T&gt; comparator) {
        for (int i = lo + 1; i &lt;= hi; i++) {
            for (int j = i; j &gt; lo && comparator.compare(a[j], a[j - 1]) &lt; 0; j--) {
                exch(a, j, j - 1);
            }
        }
    }
\/
    private static &lt;T&gt; void exch(T[] a, int i, int j) {
        T swap = a[i];
        a[i] = a[j];
        a[j] = swap;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;functional&gt;
#include &lt;algorithm&gt;
\/
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
void sort(T arr[], int lo, int hi, Comparator comparator = {}) {
    constexpr int CUTOFF = 10;
    if (hi &lt;= lo + CUTOFF - 1) {
        std::sort(arr + lo, arr + hi + 1, comparator);
        return;
    }
    int lt = lo, gt = hi;
    T v = arr[lo];
    int i = lo + 1;
    while (i &lt;= gt) {
        if (comparator(arr[i], v)) std::swap(arr[lt++], arr[i++]);
        else if (comparator(v, arr[i])) std::swap(arr[i], arr[gt--]);
        else i++;
    }
\/
    sort(arr, lo, lt - 1, comparator);
    sort(arr, gt + 1, hi, comparator);
}
\/
template &lt;typename T, typename Comparator = std::less&lt;&gt;&gt;
void sort(T arr[], const int n, Comparator comparator = {}) {
    sort(arr, 0, n - 1, comparator);
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def sort(arr: list, lo: int, hi: int):
    CUTOFF = 10
    if hi &lt;= lo + CUTOFF - 1:
        arr[lo:hi+1] = sorted(arr[lo:hi+1])
        return
\/
    lt = lo
    gt = hi
    v = arr[lo]
    i = lo + 1
    while i &lt;= gt:
        if arr[i] &lt; v:
            arr[lt], arr[i] = arr[i], arr[lt]
            lt += 1
            i += 1
        elif arr[i] &gt; v:
            arr[i], arr[gt] = arr[gt], arr[i]
            gt -= 1
        else:
            i += 1
\/
    sort(arr, lo, lt - 1)
    sort(arr, gt + 1, hi)
\/
\/
def sort_all(arr: list):
    sort(arr, 0, len(arr) - 1)
    </code-block>
    </tab>
</tabs>

<p><format color="BlueViolet">Conclusion</format></p>

<table style="both" id="conclusion">
<tr>
    <td></td>
    <td>In place?</td>
    <td>Stable?</td>
    <td>Worst</td>
    <td>Average</td>
    <td>Best</td>
    <td>Remarks</td>
</tr>
<tr>
    <td><a anchor="selection-sort" summary="Selection Sort">Selection
    </a></td>
    <td>&checkmark;</td>
    <td></td>
    <td><math>\frac {N^{2}}{2}</math></td>
    <td><math>\frac {N^{2}}{2}</math></td>
    <td><math>\frac {N^{2}}{2}</math></td>
    <td><math>N</math> exchanges</td>
</tr>
<tr>
    <td><a anchor="insertion-sort" summary="Insertion Sort">Insertion
    </a></td>
    <td>&checkmark;</td>
    <td>&checkmark;</td>
    <td><math>N</math></td>
    <td><math>\frac {N^{2}}{4}</math></td>
    <td><math>N</math></td>
    <td>Use for small <math>N</math> or partially ordered</td>
</tr>
<tr>
    <td><a anchor="shell-sort" summary="Shell Sort">Shell</a></td>
    <td>&checkmark;</td>
    <td></td>
    <td>?</td>
    <td>?</td>
    <td><math>N</math></td>
    <td>Tight code, subquadratic</td>
</tr>
<tr>
    <td><a anchor="mergesort" summary="Mergesort">Merge</a></td>
    <td></td>
    <td>&checkmark;</td>
    <td><math>N \lg N</math></td>
    <td><math>N \lg N</math></td>
    <td><math>N \lg N</math></td>
    <td><math>N \lg N</math> guarantee, stable</td>
</tr>
<tr>
    <td><a anchor="quicksort" summary="Quicksort">Quick</a></td>
    <td>&checkmark;</td>
    <td></td>
    <td><math>\frac {N^{2}}{2}</math></td>
    <td>2 <math>N \lg N</math></td>
    <td><math>N \lg N</math></td>
    <td><p><math>N \log N</math> probabilistic guarantee</p>
    <p>Fastest in practice</p></td>
</tr>
<tr>
    <td><a anchor="3-way-partitioning" summary="3-way Quicksort">
    3-way quick</a></td>
    <td>&checkmark;</td>
    <td></td>
    <td><math>\frac {N^{2}}{2}</math></td>
    <td>2 <math>N \ln N</math></td>
    <td><math>N</math></td>
    <td>Improves quicksort in presence of duplicate keys</td>
</tr>
</table>

## 8 Priority Queues

### 8.1 API and Elementary Implementations

<p><format color="BlueViolet">Applications</format></p>

<list type="bullet">
<li>
    <p>Event-driven simulation [customers in a line, colliding 
    particles]</p>
</li>
<li>
    <p>Numerical computation [reducing roundoff error]</p>
</li>
<li>
    <p>Data compression [Huffman codes]</p>
</li>
<li>
    <p>Graph searching [Dijkstra's algorithm, Prim's algorithm]</p>
</li>
<li>
    <p>Number theory [sum of powers]</p>
</li>
<li>
    <p>Artificial intelligence [A* search]</p>
</li>
<li>
    <p>Statistics [maintain largest M values in a sequence]</p>
</li>
<li>
    <p>Operating systems [load balancing, interrupt handling]</p>
</li>
<li>
    <p>Discrete optimization [bin packing, scheduling]</p>
</li>
<li>
    <p>Spam filtering [Bayesian spam filter]</p>
</li>
</list>

<p><format color="BlueViolet">Built-in Implementation</format></p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.PriorityQueue;
\/
public class PQ {
    public static void main(String[] args) {
        PriorityQueue&lt;Integer&gt; pq = new PriorityQueue&lt;Integer&gt;();
\/
        pq.add(10);
        pq.add(20);
        pq.add(15);
\/
        System.out.println(pq.peek()); // Outputs 10
        System.out.println(pq.poll()); // Outputs 10 (Contains Removal)
        System.out.println(pq.peek()); // Outputs 15
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;vector&gt;
\/
int main() {
    std::priority_queue&lt;std::pair&lt;int, int&gt;&gt; pq;
\/
    pq.emplace(3, 100); // 100 has priority 3
    pq.emplace(1, 40);  // 40 has priority 1
    pq.emplace(2, 60);  // 60 has priority 2
\/
    while (!pq.empty()) {
        std::cout &lt;&lt; "Value: " &lt;&lt; pq.top().second &lt;&lt; ", Priority: " &lt;&lt; pq.top().first &lt;&lt; std::endl;
        pq.pop();
    }
\/
    return 0;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
import heapq
\/
# Create a priority queue
priority_queue = []
\/
# Add elements with priorities
heapq.heappush(priority_queue, (2, 'code'))
heapq.heappush(priority_queue, (1, 'eat'))
heapq.heappush(priority_queue, (3, 'sleep'))
\/
# Remove and return the highest priority task
task = heapq.heappop(priority_queue)[1]
\/
print(task)  # Outputs: 'eat'
    </code-block>
    </tab>
</tabs>

<p><format color="BlueViolet">Unordered Array Implementation</format>
</p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Comparator;
\/
public class UnorderedArrayMaxPQ&lt;Key&gt; {
    private final Key[] pq;
    private int n;
    private final Comparator&lt;Key&gt; comparator;
\/
    public UnorderedArrayMaxPQ(int capacity, Comparator&lt;Key&gt; comparator) {
        pq = (Key[]) new Object[capacity];
        n = 0;
        this.comparator = comparator;
    }
\/
    public boolean isEmpty() {
        return n == 0;
    }
\/
    public int size() {
        return n;
    }
\/
    public void insert(Key x) {
        pq[n++] = x;
    }
\/
    public Key delMax() {
        int max = 0;
        for (int i = 1; i &lt; n; i++)
            if (comparator.compare(pq[max], pq[i]) &lt; 0) max = i;
        exch(max, n - 1);
\/
        return pq[--n];
    }
\/
    private void exch(int i, int j) {
        Key swap = pq[i];
        pq[i] = pq[j];
        pq[j] = swap;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;functional&gt;
#include &lt;algorithm&gt;
\/
template &lt;typename Key, typename Comparator = std::less&lt;Key&gt;&gt;
class UnorderedArrayMaxPQ {
private:
    Key* pq;
    int n;
    Comparator comparator;
\/
public:
    explicit UnorderedArrayMaxPQ(const int capacity, Comparator comparator = {}) :
        pq(new Key[capacity]), n(0), comparator(comparator) {}
\/
    ~UnorderedArrayMaxPQ() { delete[] pq; }
\/
    [[nodiscard]] bool isEmpty() const { return n == 0; }
    [[nodiscard]] int size() const { return n; }
\/
    void insert(const Key& x) { pq[n++] = x; }
\/
    Key delMax() {
        int max = 0;
        for (int i = 1; i &lt; n; i++) {
            if (comparator(pq[max], pq[i])) {
                max = i;
            }
        }
        std::swap(pq[max], pq[n - 1]);
        return pq[--n];
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from typing import Generic, TypeVar, Callable, Optional
\/
Key = TypeVar("Key")
\/
\/
class UnorderedArrayMaxPQ(Generic[Key]):
    def __init__(self, capacity: int, comparator: Optional[Callable[[Key, Key], bool]] = None) -&gt; None:
        self.pq: list[Key] = [None] * capacity
        self.n: int = 0
        if comparator is None:
            self.comparator = lambda a, b: a &lt; b  # Default to less-than comparison
        else:
            self.comparator = comparator
\/
    def isEmpty(self) -&gt; bool:
        return self.n == 0
\/
    def size(self) -&gt; int:
        return self.n
\/
    def insert(self, x: Key) -&gt; None:
        self.pq[self.n] = x
        self.n += 1
\/
    def delMax(self) -&gt; Key:
        max_index: int = 0
        for i in range(1, self.n):
            if self.comparator(self.pq[max_index], self.pq[i]):
                max_index = i
        self.pq[max_index], self.pq[self.n - 1] = self.pq[self.n - 1], self.pq[max_index]
        self.n -= 1
        return self.pq[self.n]
    </code-block>
    </tab>
</tabs>

<p><format color="BlueViolet">Ordered Array Implementation</format>
</p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Comparator;
\/
public class OrderedArrayMaxPQ&lt;Key&gt; {
    private final Key[] pq;
    private int n;
    private final Comparator&lt;Key&gt; comparator;
\/
    public OrderedArrayMaxPQ(int capacity, Comparator&lt;Key&gt; comparator) {
        pq = (Key[]) new Object[capacity];
        n = 0;
        this.comparator = comparator;
    }
\/
    public boolean isEmpty() {
        return n == 0;
    }
\/
    public int size() {
        return n;
    }
\/
    public Key delMax() {
        return pq[--n];
    }
\/
    public void insert(Key key) {
        int i = n - 1;
        while (i &gt;= 0 && comparator.compare(key, pq[i]) &lt; 0) { // Use comparator
            pq[i + 1] = pq[i];
            i--;
        }
        pq[i + 1] = key;
        n++;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;functional&gt;
\/
template &lt;typename Key, typename Comparator = std::less&lt;Key&gt;&gt;
class OrderedArrayMaxPQ {
private:
    Key* pq;
    int n;
    Comparator comparator;
\/
public:
    explicit OrderedArrayMaxPQ(const int capacity, Comparator comparator = {}) :
     pq(new Key[capacity]), n(0), comparator(comparator) {}
\/
    ~OrderedArrayMaxPQ() { delete[] pq; }
\/
    [[nodiscard]] bool isEmpty() const { return n == 0; }
    [[nodiscard]] int size() const { return n; }
    Key delMax() { return pq[--n]; }
\/
    void insert(const Key& key) {
        int i = n - 1;
        while (i &gt;= 0 && comparator(key, pq[i])) { // Use comparator
            pq[i + 1] = pq[i];
            i--;
        }
        pq[i + 1] = key;
        n++;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from typing import Generic, TypeVar, Callable, Optional
\/
Key = TypeVar("Key")
\/
\/
class OrderedArrayMaxPQ(Generic[Key]):
    def __init__(self, capacity: int, comparator: Optional[Callable[[Key, Key], bool]] = None) -&gt; None:
        self.pq: list[Key] = [None] * capacity
        self.n: int = 0
        if comparator is None:
            self.comparator = lambda a, b: a &lt; b
        else:
            self.comparator = comparator
\/
    def isEmpty(self) -&gt; bool:
        return self.n == 0
\/
    def size(self) -&gt; int:
        return self.n
\/
    def delMax(self) -&gt; Key:
        self.n -= 1
        return self.pq[self.n]
\/
    def insert(self, key: Key) -&gt; None:
        i: int = self.n - 1
        while i &gt;= 0 and self.comparator(key, self.pq[i]):
            self.pq[i + 1] = self.pq[i]
            i -= 1
        self.pq[i + 1] = key
        self.n += 1
    </code-block>
    </tab>
</tabs>

### 8.2 Binary Heap

#### 8.1.1 Concepts & Properties

<p><format color="BlueViolet">Definitions:</format></p>

<list type="bullet">
<li>
    <p><format color="DarkOrange">Binary tree</format>: Empty or node 
    with links to left and right binary trees.</p>
</li>
<li>
    <p><format color="DarkOrange">Complete binary tree</format>: 
    Perfectly balanced, except for bottom level.</p>
    <img src="../images_data/d8-1-1.png" alt="Complete binary tree"/>
</li>
<li>
    <p><format color="DarkOrange">Binary heap</format>: Array 
    representation of a heap-ordered complete binary tree.</p>
</li>
</list>

<p><format color="BlueViolet">Property of complete binary tree:
</format> Height of complete binary tree with <math>N</math> nodes
is <math>\lfloor \lg N \rfloor</math>.</p>

<p><format color="LawnGreen">Proof:</format> Height only increases
when <math>N</math> is a power of <math>2</math>.</p>

<p><format color="BlueViolet">Properties of Binary Heap:</format>
</p>

<list type="bullet">
<li>
    <p>Key in nodes.</p>
</li>
<li>
    <p>Parent's key no smaller than children's keys.</p>
</li>
<li>
    <p>Largest key is <code>a[1]</code>, which is root of binary 
    tree.</p>
</li>
<li>
    <p>Can use array indices to move through tree.</p>
</li>   
<li>
    <p>Parent of node at <math>k</math> is at <math>\frac {k}{2}
    </math>.</p>
</li>
<li>
    <p>Children of node at <math>k</math> are at <math>2k</math> 
    and <math>2k + 1</math>.</p>
</li>
</list>

<img src="../images_data/d8-1-2.png" alt="Binary Heap"/>

#### 8.1.2 Binary-Heap Implementation of Priority Queues

<procedure title="Violation in Binary Heap (Child's key becomes 
larger key than its parent's key">
<step>
    <p>Exchange key in child with key in parent.</p>
</step>
<step>
    <p>Repeat until heap order restored.</p>
</step>
</procedure>

<procedure title="Insertion in Binary Heap" type="choices">
<step>
    <p>Add node at end, then swim it up.</p>
</step>
<step>
    <p>At most <math>1 + \lg N</math> compares.</p>
</step>
</procedure>

<procedure title="Demotion in Binary Heap (Parent's key becomes 
smaller than one (or both) of its children's">
<step>
    <p>Exchange key in parent with key in larger child.</p>
</step>
<step>
    <p>Repeat until heap order restored.</p>
</step>
</procedure>

<procedure title="Deletion in Binary Heap" type="choices">
<step>
    <p>Exchange root with node at end, then sink it down.</p>
</step>
<step>
    <p>At most <math>2 \lg N</math> compares.</p>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Comparator;
import java.util.NoSuchElementException;
\/
public class MaxPQ&lt;Key&gt; {
    private Key[] pq;
    private int n;
    private Comparator&lt;Key&gt; comparator;
\/
    public MaxPQ(int initCapacity) {
        pq = (Key[]) new Object[initCapacity + 1];
        n = 0;
    }
\/
    public MaxPQ() {
        this(1);
    }
\/
    public MaxPQ(int initCapacity, Comparator&lt;Key&gt; comparator) {
        this.comparator = comparator;
        pq = (Key[]) new Object[initCapacity + 1];
        n = 0;
    }
\/
    public MaxPQ(Comparator&lt;Key&gt; comparator) {
        this(1, comparator);
    }
\/
    public MaxPQ(Key[] keys) {
        n = keys.length;
        pq = (Key[]) new Object[keys.length + 1];
        for (int i = 0; i &lt; n; i++)
            pq[i+1] = keys[i];
        for (int k = n/2; k &gt;= 1; k--)
            sink(k);
        assert isMaxHeap();
    }
\/
    public boolean isEmpty() {
        return n == 0;
    }
\/
    public int size() {
        return n;
    }
\/
    public Key max() {
        if (isEmpty()) throw new NoSuchElementException("Priority queue underflow");
        return pq[1];
    }
\/
    private void resize(int capacity) {
        assert capacity &gt; n;
        Key[] temp = (Key[]) new Object[capacity];
        if (n &gt;= 0) System.arraycopy(pq, 1, temp, 1, n);
        pq = temp;
    }
\/
    public void insert(Key x) {
\/
        if (n == pq.length - 1) resize(2 * pq.length);
\/
        pq[++n] = x;
        swim(n);
        assert isMaxHeap();
    }
\/
    public Key delMax() {
        if (isEmpty()) throw new NoSuchElementException("Priority queue underflow");
        Key max = pq[1];
        exch(1, n--);
        sink(1);
        pq[n+1] = null;
        if ((n &gt; 0) && (n == (pq.length - 1) / 4)) resize(pq.length / 2);
        assert isMaxHeap();
        return max;
    }
\/    
    private void swim(int k) {
        while (k &gt; 1 && less(k/2, k)) {
            exch(k/2, k);
            k = k/2;
        }
    }
\/
    private void sink(int k) {
        while (2*k &lt;= n) {
            int j = 2*k;
            if (j &lt; n && less(j, j+1)) j++;
            if (!less(k, j)) break;
            exch(k, j);
            k = j;
        }
    }
\/
    private boolean less(int i, int j) {
        if (comparator == null) {
            return ((Comparable&lt;Key&gt;) pq[i]).compareTo(pq[j]) &lt; 0;
        }
        else {
            return comparator.compare(pq[i], pq[j]) &lt; 0;
        }
    }
\/
    private void exch(int i, int j) {
        Key swap = pq[i];
        pq[i] = pq[j];
        pq[j] = swap;
    }
\/
    private boolean isMaxHeap() {
        for (int i = 1; i &lt;= n; i++) {
            if (pq[i] == null) return false;
        }
        for (int i = n+1; i &lt; pq.length; i++) {
            if (pq[i] != null) return false;
        }
        if (pq[0] != null) return false;
        return isMaxHeapOrdered(1);
    }
\/    
    private boolean isMaxHeapOrdered(int k) {
        if (k &gt; n) return true;
        int left = 2*k;
        int right = 2*k + 1;
        if (left  &lt;= n && less(k, left))  return false;
        if (right &lt;= n && less(k, right)) return false;
        return isMaxHeapOrdered(left) && isMaxHeapOrdered(right);
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;functional&gt;
#include &lt;algorithm&gt;
#include &lt;cassert&gt;
#include &lt;stdexcept&gt;
\/
template &lt;typename Key, typename Comparator = std::less&lt;Key&gt;&gt;
class MaxPQ {
private:
    Key* pq;
    int n;
    Comparator comparator;
\/
    void resize(const int capacity) {
        assert(capacity &gt; n);
        Key* temp = new Key[capacity];
        std::copy(pq + 1, pq + n + 1, temp + 1);
        delete[] pq;
        pq = temp;
    }
\/
    void swim(int k) {
        while (k &gt; 1 && comparator(pq[k / 2], pq[k])) {
            std::swap(pq[k / 2], pq[k]);
            k = k / 2;
        }
    }
\/
    void sink(int k) {
        while (2 * k &lt;= n) {
            int j = 2 * k;
            if (j &lt; n && comparator(pq[j], pq[j + 1])) j++;
            if (!comparator(pq[k], pq[j])) break;
            std::swap(pq[k], pq[j]);
            k = j;
        }
    }
\/
    bool isMaxHeap() {
        for (int i = 1; i &lt;= n; i++) {
            if (pq[i] == nullptr) return false;
        }
        for (int i = n+1; i &lt; pq.length; i++) {
            if (pq[i] != nullptr) return false;
        }
        if (pq[0] != nullptr) return false;
        return isMaxHeapOrdered(1);
    }
\/
    bool isMaxHeapOrdered(int k) {
        if (k &gt; n) return true;
        int left = 2 * k;
        int right = 2 * k + 1;
        if (left &lt;= n && comparator(pq[k], pq[left])) return false;
        if (right &lt;= n && comparator(pq[k], pq[right])) return false;
        return isMaxHeapOrdered(left) && isMaxHeapOrdered(right);
    }
\/
public:
    explicit MaxPQ(const int initCapacity, Comparator comparator = {}) :
        pq(new Key[initCapacity + 1]), n(0), comparator(comparator) {}
\/
    explicit MaxPQ(int initCapacity) : MaxPQ(initCapacity, Comparator{}) {}
\/
    explicit MaxPQ(Comparator comparator) : MaxPQ(1, comparator) {}
\/
    MaxPQ() : MaxPQ(1, Comparator{}) {}
\/
    MaxPQ(const Key* keys, int size) : MaxPQ(size) {
        n = size;
        std::copy(keys, keys + size, pq + 1);
        for (int k = n / 2; k &gt;= 1; k--)
            sink(k);
        assert(isMaxHeap());
    }
\/
    ~MaxPQ() { delete[] pq; }
\/
    [[nodiscard]] bool isEmpty() const { return n == 0; }
    [[nodiscard]] int size() const { return n; }
\/
    Key max() {
        if (isEmpty()) throw std::runtime_error("Priority queue underflow");
        return pq[1];
    }
\/
    void insert(const Key& x) {
        if (n == pq.length - 1) resize(2 * pq.length);
        pq[++n] = x;
        swim(n);
        assert(isMaxHeap());
    }
\/
    Key delMax() {
        if (isEmpty()) throw std::runtime_error("Priority queue underflow");
        Key max = pq[1];
        std::swap(pq[1], pq[n--]);
        sink(1);
        if ((n &gt; 0) && (n == (pq.length - 1) / 4)) resize(pq.length / 2);
        assert(isMaxHeap());
        return max;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class MaxPQ:
    def __init__(self, capacity, key=lambda x: x):
        self.pq = [None] * (capacity + 1) 
        self.n = 0
        self.key = key
\/
    def is_empty(self):
        return self.n == 0
\/
    def size(self):
        return self.n
\/
    def insert(self, item):
        if self.n == len(self.pq) - 1:
            self._resize(2 * len(self.pq))
        self.n += 1
        self.pq[self.n] = item
        self._swim(self.n)
\/
    def max(self):
        if self.is_empty():
            raise IndexError("Priority queue is empty")
        return self.pq[1]
\/
    def del_max(self):
        if self.is_empty():
            raise IndexError("Priority queue is empty")
        max_item = self.pq[1]
        self._exch(1, self.n)
        self.n -= 1
        self.pq[self.n + 1] = None 
        self._sink(1)
        if self.n &gt; 0 and self.n == (len(self.pq) - 1) // 4:
            self._resize(len(self.pq) // 2)
        return max_item
\/
    def _swim(self, k):
        while k &gt; 1 and self._less(k // 2, k):
            self._exch(k // 2, k)
            k //= 2
\/
    def _sink(self, k):
        while 2 * k &lt;= self.n:
            j = 2 * k
            if j &lt; self.n and self._less(j, j + 1):
                j += 1
            if not self._less(k, j):
                break
            self._exch(k, j)
            k = j
\/
    def _less(self, i, j):
        return self.key(self.pq[i]) &lt; self.key(self.pq[j])
\/
    def _exch(self, i, j):
        self.pq[i], self.pq[j] = self.pq[j], self.pq[i]
\/
    def _resize(self, capacity):
        temp = [None] * capacity
        for i in range(1, self.n + 1):
            temp[i] = self.pq[i]
        self.pq = temp
    </code-block>
    </tab>
</tabs>

### 8.3 Indexed Priority Queue

<p><format color="DarkOrange">Indexed Priority Queue:</format> 
Associate an index between <math>0</math> and <math>N - 1</math> 
with each key in the priority queue.</p>

<list type="bullet">
<li>
    <p>Client can insert and delete-the-minimum.</p>
</li>
<li>
    <p>Client can change the key by specifying the index.</p>
</li>
</list>

<procedure title="Indexed Priority Queue">
    <step>
        <p>Start with same code as MinPQ.</p>
    </step>
    <step>
        <p>Maintain parallel arrays keys[], pq[] and qp[] so that: 
        </p>
        <list type="bullet">
            <li><p>keys[i] is the priority of i.</p></li>
            <li><p>pq[i] is the index of the key in heap position i.
            </p></li>
            <li><p>qp[i] is the heap position of the key with index i
            .</p></li>
        </list>
    </step>
    <step>
        <p>Use swim(qp[i]) implement decreaseKey(i, key).</p>
    </step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.NoSuchElementException;
\/
public class IndexedPriorityQueue {
    private final int maxN;
    private int n;
    private final int[] pq;
    private final int[] qp;
    private final double[] keys;
\/
    public IndexedPriorityQueue(int maxN) {
        if (maxN &lt; 0) throw new IllegalArgumentException();
        this.maxN = maxN;
        n = 0;
        keys = new double[maxN + 1];
        pq = new int[maxN + 1];
        qp = new int[maxN + 1];
        for (int i = 0; i &lt;= maxN; i++) qp[i] = -1;
    }
\/
    public boolean isEmpty() {
        return n == 0;
    }
\/
    public boolean contains(int i) {
        return qp[i] != -1;
    }
\/
    public int size() {
        return n;
    }
\/
    public void insert(int i, double key) {
        if (contains(i)) throw new IllegalArgumentException("Index is already in the priority queue");
        n++;
        qp[i] = n;
        pq[n] = i;
        keys[i] = key;
        swim(n);
    }
\/
    public int delMin() {
        if (n == 0) throw new NoSuchElementException("Priority queue underflow");
        int min = pq[1];
        exch(1, n--);
        sink(1);
        qp[min] = -1;
        pq[n + 1] = -1;
        return min;
    }
\/
    public void decreaseKey(int i, double key) {
        if (!contains(i)) throw new NoSuchElementException("Index is not in the priority queue");
        if (keys[i] &lt;= key) throw new IllegalArgumentException("Calling decreaseKey() with a key greater than or equal to the key in the priority queue");
        keys[i] = key;
        swim(qp[i]);
    }
\/
    private boolean greater(int i, int j) {
        return keys[pq[i]] &gt; keys[pq[j]];
    }
\/
    private void exch(int i, int j) {
        int swap = pq[i];
        pq[i] = pq[j];
        pq[j] = swap;
        qp[pq[i]] = i;
        qp[pq[j]] = j;
    }
\/
    private void swim(int k) {
        while (k &gt; 1 && greater(k / 2, k)) {
            exch(k, k / 2);
            k = k / 2;
        }
    }
\/
    private void sink(int k) {
        while (2 * k &lt;= n) {
            int j = 2 * k;
            if (j &lt; n && greater(j, j + 1)) j++;
            if (!greater(k, j)) break;
            exch(k, j);
            k = j;
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++ (IndexedPriorityQueue.h)">
    <code-block lang="c++" collapsible="true">
#ifndef INDEXED_PRIORITY_QUEUE_H
#define INDEXED_PRIORITY_QUEUE_H
\/
#include &lt;vector&gt;
\/
class IndexedPriorityQueue {
public:
    explicit IndexedPriorityQueue(int maxN);
    [[nodiscard]] bool isEmpty() const;
    [[nodiscard]] bool contains(int i) const;
    [[nodiscard]] int size() const;
    void insert(int i, double key);
    int delMin();
    void decreaseKey(int i, double key);
\/
private:
    int maxN;
    int n;
    std::vector&lt;int&gt; pq;
    std::vector&lt;int&gt; qp;
    std::vector&lt;double&gt; keys;
\/
    [[nodiscard]] bool greater(int i, int j) const;
    void exch(int i, int j);
    void swim(int k);
    void sink(int k);
};
\/
#endif // INDEXED_PRIORITY_QUEUE_H
    </code-block>
    </tab>
    <tab title="C++ (IndexedPriorityQueue.cpp)">
    <code-block lang="c++" collapsible="true">
#include "IndexedPriorityQueue.h"
#include &lt;stdexcept&gt;
\/
IndexedPriorityQueue::IndexedPriorityQueue(const int maxN) : maxN(maxN), n(0), pq(maxN + 1), qp(maxN + 1, -1), keys(maxN + 1) {
    if (maxN &lt; 0) throw std::invalid_argument("maxN must be non-negative");
}
\/
bool IndexedPriorityQueue::isEmpty() const {
    return n == 0;
}
\/
bool IndexedPriorityQueue::contains(int i) const {
    return qp[i] != -1;
}
\/
int IndexedPriorityQueue::size() const {
    return n;
}
\/
void IndexedPriorityQueue::insert(const int i, const double key) {
    if (contains(i)) throw std::invalid_argument("Index is already in the priority queue");
    n++;
    qp[i] = n;
    pq[n] = i;
    keys[i] = key;
    swim(n);
}
\/
int IndexedPriorityQueue::delMin() {
    if (n == 0) throw std::out_of_range("Priority queue underflow");
    const int min = pq[1];
    exch(1, n--);
    sink(1);
    qp[min] = -1;
    pq[n + 1] = -1;
    return min;
}
\/
void IndexedPriorityQueue::decreaseKey(const int i, const double key) {
    if (!contains(i)) throw std::out_of_range("Index is not in the priority queue");
    if (keys[i] &lt;= key) throw std::invalid_argument("Calling decreaseKey() with a key greater than or equal to the key in the priority queue");
    keys[i] = key;
    swim(qp[i]);
}
\/
bool IndexedPriorityQueue::greater(const int i, const int j) const {
    return keys[pq[i]] &gt; keys[pq[j]];
}
\/
void IndexedPriorityQueue::exch(const int i, const int j) {
    int swap = pq[i];
    pq[i] = pq[j];
    pq[j] = swap;
    qp[pq[i]] = i;
    qp[pq[j]] = j;
}
\/
void IndexedPriorityQueue::swim(int k) {
    while (k &gt; 1 && greater(k / 2, k)) {
        exch(k, k / 2);
        k = k / 2;
    }
}
\/
void IndexedPriorityQueue::sink(int k) {
    while (2 * k &lt;= n) {
        int j = 2 * k;
        if (j &lt; n && greater(j, j + 1)) j++;
        if (!greater(k, j)) break;
        exch(k, j);
        k = j;
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class IndexedPriorityQueue:
    def __init__(self, maxN):
        if maxN &lt; 0:
            raise ValueError("maxN must be non-negative")
        self.maxN = maxN
        self.n = 0
        self.keys = [None] * (maxN + 1)
        self.pq = [0] * (maxN + 1)
        self.qp = [-1] * (maxN + 1)
\/
    def is_empty(self):
        return self.n == 0
\/
    def contains(self, i):
        return self.qp[i] != -1
\/
    def size(self):
        return self.n
\/
    def insert(self, i, key):
        if self.contains(i):
            raise ValueError("Index is already in the priority queue")
        self.n += 1
        self.qp[i] = self.n
        self.pq[self.n] = i
        self.keys[i] = key
        self.swim(self.n)
\/
    def del_min(self):
        if self.n == 0:
            raise IndexError("Priority queue underflow")
        min_index = self.pq[1]
        self.exch(1, self.n)
        self.n -= 1
        self.sink(1)
        self.qp[min_index] = -1
        self.pq[self.n + 1] = -1
        return min_index
\/
    def decrease_key(self, i, key):
        if not self.contains(i):
            raise IndexError("Index is not in the priority queue")
        if self.keys[i] &lt;= key:
            raise ValueError("Calling decrease_key() with a key greater than or equal to the key in the priority queue")
        self.keys[i] = key
        self.swim(self.qp[i])
\/
    def greater(self, i, j):
        return self.keys[self.pq[i]] > self.keys[self.pq[j]]
\/
    def exch(self, i, j):
        self.pq[i], self.pq[j] = self.pq[j], self.pq[i]
        self.qp[self.pq[i]] = i
        self.qp[self.pq[j]] = j
\/
    def swim(self, k):
        while k &gt; 1 and self.greater(k // 2, k):
            self.exch(k, k // 2)
            k //= 2
\/
    def sink(self, k):
        while 2 * k &lt;= self.n:
            j = 2 * k
            if j &lt; self.n and self.greater(j, j + 1):
                j += 1
            if not self.greater(k, j):
                break
            self.exch(k, j)
            k = j
    </code-block>
    </tab>
</tabs>

### 8.4 Heapsort {id="heapsort"}

<procedure title="Heapsort">
<step>
    <p><format color="Fuchsia">Heap construction</format>: 
    Build max heap using bottom-up method.</p>
</step>
<step>
    <p><format color="Fuchsia">Sortdown</format>: Repeatedly
    delete the largest remaining item.</p>
</step>
</procedure>

<p><format color="BlueViolet">Properties</format></p>

<list>
<li>
    <p>Heap construction uses <math>\leq 2N</math> compares and 
    exchanges.</p>
</li>
<li>
    <p>Heapsort uses <math>\leq 2N \log N</math> compares and 
    exchanges.</p>
</li>
<li>
    <p>Heapsort is an in-place algorithm with <math>N \log N</math> 
    worst-case.</p>
</li>
</list>

<note>
<p>For mergesort and quicksort:</p>
<list type="bullet">
<li>
    <p><format color="Fuchsia">Mergesort:</format> no, linear extra 
    space (in-place merge possible, not practical).</p>
</li>
<li>
    <p><format color="Fuchsia">Quicksort:</format> no, quadratic time
    in worst case (<math>N \log N</math> worst-case quicksort possible
    , not practical).</p>
</li>
</list>
</note>

<tip>
<p>It is optimal for both time and space, but:</p>
<list>
<li>
    <p>Inner loop longer than quicksort's.</p>
</li>
<li>
    <p>Makes poor use of cache memory.</p>
</li>
<li>
    <p>Not stable.</p>
</li>
</list>
</tip>

<note>
<p>For information about the performance of heapsort, please refer
to the <a href="Data-Structures-and-Algorithms-3.md" anchor="sortperf" 
summary="Table for Comparing Performance of Sorting Algorithm">table 
for sorting performance</a>.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Comparator;
\/
public class Heap {
    private Heap() {
    }
\/
    public static &lt;T&gt; void sort(T[] pq, Comparator&lt;T&gt; comparator) {
        int n = pq.length;
\/
        for (int k = n / 2; k &gt;= 1; k--)
            sink(pq, k, n, comparator);
\/
        int k = n;
        while (k &gt; 1) {
            exch(pq, 1, k--);
            sink(pq, 1, k, comparator);
        }
    }
\/
    private static &lt;T&gt; void sink(T[] pq, int k, int n, Comparator&lt;T&gt; comparator) {
        while (2 * k &lt;= n) {
            int j = 2 * k;
            if (j &lt; n && comparator.compare(pq[j - 1], pq[j]) &lt; 0) j++;
            if (comparator.compare(pq[k - 1], pq[j - 1]) &gt;= 0) break; // Not less
            exch(pq, k, j);
            k = j;
        }
    }
\/
    private static void exch(Object[] pq, int i, int j) {
        Object swap = pq[i - 1];
        pq[i - 1] = pq[j - 1];
        pq[j - 1] = swap;
    }
\/
    private static &lt;T&gt; void show(T[] a) {
        for (T t : a) {
            System.out.println(t);
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;functional&gt;
#include &lt;algorithm&gt;
\/
template &lt;typename T, typename Comparator = std::less&lt;T&gt;&gt;
class Heap {
private:
    Heap() = default;
\/
public:
    static void sort(T* pq, const int n, Comparator comparator = {}) {
        for (int k = n / 2; k &gt;= 1; k--)
            sink(pq, k, n, comparator);
\/
        int k = n;
        while (k &gt; 1) {
            std::swap(pq[0], pq[k - 1]);
            k--;
            sink(pq, 1, k, comparator);
        }
    }
\/
private:
    static void sink(T* pq, int k, int n, Comparator comparator) {
        while (2 * k &lt;= n) {
            int j = 2 * k;
            if (j &lt; n && comparator(pq[j - 1], pq[j])) j++; 
            if (!comparator(pq[k - 1], pq[j - 1])) break;
            std::swap(pq[k - 1], pq[j - 1]);
            k = j;
        }
    }
\/
public:
    static void show(T* a, const int n) {
        for (int i = 0; i &lt; n; i++) {
            std::cout &lt;&lt; a[i] &lt;&lt; std::endl;
        }
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class Heap:
\/
    def __init__(self):
        pass
\/
    @staticmethod
    def sort(pq, comparator=lambda x, y: x &lt; y):
        n = len(pq)
        for k in range(n // 2, 0, -1):
            Heap._sink(pq, k, n, comparator)
\/
        k = n
        while k &gt; 1:
            Heap._exch(pq, 1, k)
            k -= 1
            Heap._sink(pq, 1, k, comparator)
\/
    @staticmethod
    def _sink(pq, k, n, comparator):
        while 2 * k &lt;= n:
            j = 2 * k
            if j &lt; n and comparator(pq[j - 1], pq[j]):
                j += 1
            if not comparator(pq[k - 1], pq[j - 1]):
                break
            Heap._exch(pq, k, j)
            k = j
\/
    @staticmethod
    def _exch(pq, i, j):
        pq[i - 1], pq[j - 1] = pq[j - 1], pq[i - 1]
\/
    @staticmethod
    def show(a):
        for item in a:
            print(item)
    </code-block>
    </tab>
</tabs>

## 9 Symbol Table & Binary Search Tree

### 9.1 Symbol Table & Elementary Implementation

<p><format color="BlueViolet">Symbol table</format>: Key-value pair
abstraction.</p>

<list type="bullet">
<li>
    <p><format color="OrangeRed">Insert</format> a value with a 
    specified key.</p>
</li>
<li>
    <p>Given a key, <format color="OrangeRed">search</format> for the 
    corresponding value.</p>
</li>
</list>



#### 9.1.1 Unordered List Implementation {id="sequential-search"}

<p><format color="BlueViolet">Method:</format> Maintain an (unordered)
linked list of key-value pairs.</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Search</format>: Scan through all keys 
    until find a match (sequential search).</p>
</li>
<li>
    <p><format color="Fuchsia">Insert</format>: Scan through all keys 
    until find a match; if no match add to front.</p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
import java.util.List;
\/
public class SequentialSearchST&lt;Key, Value&gt; {
    private int n;
    private Node first;
\/
    private class Node {
        private final Key key;
        private Value val;
        private Node next;
\/
        public Node(Key key, Value val, Node next)  {
            this.key  = key;
            this.val  = val;
            this.next = next;
        }
    }
\/
    public SequentialSearchST() {
    }
\/
    public int size() {
        return n;
    }
\/
    public boolean isEmpty() {
        return size() == 0;
    }
\/
    public boolean contains(Key key) {
        return get(key) != null;
    }
\/
    public Value get(Key key) {
        for (Node x = first; x != null; x = x.next) {
            if (key.equals(x.key))
                return x.val;
        }
        return null;
    }
\/
    public void put(Key key, Value val) {
        if (val == null) {
            delete(key);
            return;
        }
\/
        for (Node x = first; x != null; x = x.next) {
            if (key.equals(x.key)) {
                x.val = val;
                return;
            }
        }
        first = new Node(key, val, first);
        n++;
    }
\/
    public void delete(Key key) {
        first = delete(first, key);
    }
\/
    private Node delete(Node x, Key key) {
        if (x == null) return null;
        if (key.equals(x.key)) {
            n--;
            return x.next;
        }
        x.next = delete(x.next, key);
        return x;
    }
\/
    public Iterable&lt;Key&gt; keys()  {
        List&lt;Key&gt; list = new ArrayList&lt;&gt;(); // Use ArrayList instead of Queue
        for (Node x = first; x != null; x = x.next)
            list.add(x.key);
        return list;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;vector&gt;
\/
template &lt;typename Key, typename Value&gt;
class SequentialSearchST {
private:
    struct Node {
        Key key;
        Value val;
        Node* next;
\/
        Node(Key key, Value val, Node* next) : key(key), val(val), next(next) {}
    };
\/
    Node* first;
    int n;
\/
public:
    SequentialSearchST() : first(nullptr), n(0) {}
\/
    [[nodiscard]] int size() const {
        return n;
    }
\/
    [[nodiscard]] bool isEmpty() const {
        return size() == 0;
    }
\/
    bool contains(const Key& key) {
        Node* x = first;
        while (x != nullptr) {
            if (x-&gt;key == key) {
                return true;
            }
            x = x-&gt;next;
        }
        return false;
    }
\/
    Value get(const Key& key) {
        Node* x = first;
        while (x != nullptr) {
            if (x-&gt;key == key) {
                return x-&gt;val;
            }
            x = x-&gt;next;
        }
        throw std::runtime_error("Key not found");
    }
\/
    void put(const Key& key, const Value& val) {
        Node* x = first;
        while (x != nullptr) {
            if (x-&gt;key == key) {
                x-&gt;val = val;
                return;
            }
            x = x-&gt;next;
        }
        first = new Node(key, val, first);
        n++;
    }
\/
    void remove(const Key& key) {
        first = remove(first, key);
    }
\/
    Node* remove(Node* x, const Key& key) {
        if (x == nullptr) {
            return nullptr;
        }
        if (x-&gt;key == key) {
            n--;
            Node* temp = x-&gt;next;
            delete x;
            return temp;
        }
        x-&gt;next = remove(x-&gt;next, key);
        return x;
    }
\/
    std::vector&lt;Key&gt; keys() {
        std::vector&lt;Key&gt; keys;
        Node* x = first;
        while (x != nullptr) {
            keys.push_back(x-&gt;key);
            x = x-&gt;next;
        }
        return keys;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class SequentialSearchST:
    class Node:
        def __init__(self, key, val, next_node=None):
            self.key = key
            self.val = val
            self.next = next_node
\/
    def __init__(self):
        self.n = 0
        self.first = None
\/
    def size(self):
        return self.n
\/
    def is_empty(self):
        return self.size() == 0
\/
    def contains(self, key):
        return self.get(key) is not None
\/
    def get(self, key):
        x = self.first
        while x is not None:
            if key == x.key:
                return x.val
            x = x.next
        return None
\/
    def put(self, key, val):
        if val is None:
            self.delete(key)
            return
\/
        x = self.first
        while x is not None:
            if key == x.key:
                x.val = val
                return
            x = x.next
\/
        self.first = self.Node(key, val, self.first)
        self.n += 1
\/
    def delete(self, key):
        self.first = self._delete(self.first, key)
\/
    def _delete(self, x, key):
        if x is None:
            return None
        if key == x.key:
            self.n -= 1
            return x.next
        x.next = self._delete(x.next, key)
        return x
\/
    def keys(self):
        keys_list = []
        x = self.first
        while x is not None:
            keys_list.append(x.key)
            x = x.next
        return keys_list
    </code-block>
    </tab>
</tabs>

#### 9.1.2 Ordered Array Implementation {id="ordered-array"}

<p><format color="BlueViolet">Method</format>: Maintain an ordered 
array of key-value pairs.</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Search:</format> Binary search.</p>
</li>
<li>
    <p><format color="Fuchsia">Insert:</format> Need to shift 
    all greater keys over.</p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Arrays;
import java.util.NoSuchElementException;
import java.util.LinkedList;
\/
public class BinarySearchST&lt;Key extends Comparable&lt;Key&gt;, Value&gt; {
    private static final int INIT_CAPACITY = 2;
    private Key[] keys;
    private Value[] vals;
    private int n = 0;
\/
    public BinarySearchST() {
        this(INIT_CAPACITY);
    }
\/
    public BinarySearchST(int capacity) {
        keys = (Key[]) new Comparable[capacity];
        vals = (Value[]) new Object[capacity];
    }
\/
    private void resize(int capacity) {
        assert capacity &gt;= n;
        Key[] tempk = (Key[]) new Comparable[capacity];
        Value[] tempv = (Value[]) new Object[capacity];
        for (int i = 0; i &lt; n; i++) {
            tempk[i] = keys[i];
            tempv[i] = vals[i];
        }
        vals = tempv;
        keys = tempk;
    }
\/
    public int size() {
        return n;
    }
\/
    public boolean isEmpty() {
        return size() == 0;
    }
\/
    public boolean contains(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to contains() is null");
        return get(key) != null;
    }
\/
    public Value get(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to get() is null");
        if (isEmpty()) return null;
        int i = rank(key);
        if (i &lt; n && keys[i].compareTo(key) == 0) return vals[i];
        return null;
    }
\/
    public int rank(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to rank() is null");
\/
        int lo = 0, hi = n - 1;
        while (lo &lt;= hi) {
            int mid = lo + (hi - lo) / 2;
            int cmp = key.compareTo(keys[mid]);
            if (cmp &lt; 0) hi = mid - 1;
            else if (cmp &gt; 0) lo = mid + 1;
            else return mid;
        }
        return lo;
    }
\/
    public void put(Key key, Value val) {
        if (key == null) throw new IllegalArgumentException("first argument to put() is null");
\/
        if (val == null) {
            delete(key);
            return;
        }
\/
        int i = rank(key);
\/
        if (i &lt; n && keys[i].compareTo(key) == 0) {
            vals[i] = val;
            return;
        }
\/
        if (n == keys.length) resize(2 * keys.length);
\/        
        for (int j = n; j &gt; i; j--) {
            keys[j] = keys[j - 1];
            vals[j] = vals[j - 1];
        }
        keys[i] = key;
        vals[i] = val;
        n++;
\/
        assert check();
    }
\/
    public void delete(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to delete() is null");
        if (isEmpty()) return;
\/
        int i = rank(key);
\/
        if (i == n || keys[i].compareTo(key) != 0) {
            return;
        }
\/
        for (int j = i; j &lt; n - 1; j++) {
            keys[j] = keys[j + 1];
            vals[j] = vals[j + 1];
        }
\/
        n--;
        keys[n] = null;
        vals[n] = null;
\/
        if (n &gt; 0 && n == keys.length / 4) resize(keys.length / 2);
\/        
        assert check();
    }
\/
    public void deleteMin() {
        if (isEmpty()) throw new NoSuchElementException("Symbol table underflow error");
        delete(min());
    }
\/
    public void deleteMax() {
        if (isEmpty()) throw new NoSuchElementException("Symbol table underflow error");
        delete(max());
    }
\/
    public Key min() {
        if (isEmpty()) throw new NoSuchElementException("called min() with empty symbol table");
        return keys[0];
    }
\/
    public Key max() {
        if (isEmpty()) throw new NoSuchElementException("called max() with empty symbol table");
        return keys[n - 1];
    }
\/    
    public Key select(int k) {
        if (k &lt; 0 || k &gt;= size()) {
            throw new IllegalArgumentException("called select() with invalid argument: " + k);
        }
        return keys[k];
    }
\/
    public Key floor(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to floor() is null");
        int i = rank(key);
        if (i &lt; n && key.compareTo(keys[i]) == 0) return keys[i];
        if (i == 0) throw new NoSuchElementException("argument to floor() is too small");
        else return keys[i - 1];
    }
\/
    public Key ceiling(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to ceiling() is null");
        int i = rank(key);
        if (i == n) throw new NoSuchElementException("argument to ceiling() is too large");
        else return keys[i];
    }
\/
    public int size(Key lo, Key hi) {
        if (lo == null) throw new IllegalArgumentException("first argument to size() is null");
        if (hi == null) throw new IllegalArgumentException("second argument to size() is null");
\/
        if (lo.compareTo(hi) &gt; 0) return 0;
        if (contains(hi)) return rank(hi) - rank(lo) + 1;
        else return rank(hi) - rank(lo);
    }
\/
    public Iterable&lt;Key&gt; keys() {
        return keys(min(), max());
    }
\/
    public Iterable&lt;Key&gt; keys(Key lo, Key hi) {
        if (lo == null) throw new IllegalArgumentException("first argument to keys() is null");
        if (hi == null) throw new IllegalArgumentException("second argument to keys() is null");
\/
        LinkedList&lt;Key&gt; queue = new LinkedList&lt;&gt;();
        if (lo.compareTo(hi) &gt; 0) return queue;
        queue.addAll(Arrays.asList(keys).subList(rank(lo), rank(hi)));
        if (contains(hi)) queue.add(keys[rank(hi)]);
        return queue;
    }
\/
    private boolean check() {
        return isSorted() && rankCheck();
    }
\/    
    private boolean isSorted() {
        for (int i = 1; i &lt; size(); i++)
            if (keys[i].compareTo(keys[i - 1]) &lt; 0) return false;
        return true;
    }
\/
    private boolean rankCheck() {
        for (int i = 0; i &lt; size(); i++)
            if (i != rank(select(i))) return false;
        for (int i = 0; i &lt; size(); i++)
            if (keys[i].compareTo(select(rank(keys[i]))) != 0) return false;
        return true;
    }
\/
    public static void main(String[] args) {
        BinarySearchST&lt;String, Integer&gt; st = new BinarySearchST&lt;&gt;();
        String[] input = {"S", "E", "A", "R", "C", "H", "E", "X", "A", "M", "P", "L", "E"};
        for (int i = 0; i &lt; input.length; i++) {
            String key = input[i];
            st.put(key, i);
        }
        for (String s : st.keys())
            System.out.println(s + " " + st.get(s));
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;cassert&gt;
#include &lt;stdexcept&gt;
#include &lt;optional&gt;
\/
template &lt;typename Key, typename Value&gt;
class BinarySearchST {
private:
    static constexpr int INIT_CAPACITY = 2;
    std::vector&lt;Key&gt; keys;
    std::vector&lt;Value&gt; vals;
    int n;
    const Value MISSING_VALUE = -1;
\/    
    void resize(int capacity) {
        assert(capacity &gt;= n);
        std::vector&lt;Key&gt; tempk(capacity);
        std::vector&lt;Value&gt; tempv(capacity);
        for (int i = 0; i &lt; n; i++) {
            tempk[i] = keys[i];
            tempv[i] = vals[i];
        }
        vals = tempv;
        keys = tempk;
    }
\/
public:
    BinarySearchST() : BinarySearchST(INIT_CAPACITY) {}
\/
    explicit BinarySearchST(int capacity) : keys(capacity), vals(capacity), n(0) {}
\/
    [[nodiscard]] int size() const { return n; }
\/
    [[nodiscard]] bool isEmpty() const { return size() == 0; }
\/
    [[nodiscard]] bool contains(const Key& key) const {
        return get(key).has_value();
    }
\/
    [[nodiscard]] std::optional&lt;Value&gt; get(const Key& key) const {
        if (isEmpty()) return std::nullopt;
        int i = rank(key);
        if (i &lt; n && keys[i] == key) return vals[i];
        return std::nullopt;
    }
\/
    [[nodiscard]] int rank(const Key& key) const {
        int lo = 0, hi = n - 1;
        while (lo &lt;= hi) {
            int mid = lo + (hi - lo) / 2;
            if (key &lt; keys[mid]) hi = mid - 1;
            else if (key &gt; keys[mid]) lo = mid + 1;
            else return mid;
        }
        return lo;
    }
\/
    void put(const Key& key, const Value& val) {
        if (val == MISSING_VALUE) {
            delete_(key);
            return;
        }
\/
        int i = rank(key);
\/
        if (i &lt; n && keys[i] == key) {
            vals[i] = val;
            return;
        }
\/
        if (n == keys.size()) resize(2 * keys.size());
\/
        for (int j = n; j &gt; i; j--) {
            keys[j] = keys[j - 1];
            vals[j] = vals[j - 1];
        }
        keys[i] = key;
        vals[i] = val;
        n++;
\/
        assert(check());
    }
\/
    void delete_(const Key& key) {
        if (isEmpty()) return;
\/
        int i = rank(key);
\/
        if (i == n || keys[i] != key) {
            return;
        }
\/
        for (int j = i; j &lt; n - 1; ++j) {
            keys[j] = keys[j + 1];
            vals[j] = vals[j + 1];
        }
\/
        n--;
        if (n &gt; 0 && n == keys.size() / 4) resize(keys.size() / 2);
\/
        assert(check());
    }
\/
    void deleteMin() {
        if (isEmpty()) throw std::runtime_error("Symbol table underflow error");
        delete_(min());
    }
\/
    void deleteMax() {
        if (isEmpty()) throw std::runtime_error("Symbol table underflow error");
        delete_(max());
    }
\/
    [[nodiscard]] Key min() const {
        if (isEmpty()) throw std::runtime_error("called min() with empty symbol table");
        return keys[0];
    }
\/
    [[nodiscard]] Key max() const {
        if (isEmpty()) throw std::runtime_error("called max() with empty symbol table");
        return keys[n - 1];
    }
\/
    [[nodiscard]] Key select(int k) const {
        if (k &lt; 0 || k &gt;= size()) {
            throw std::invalid_argument("called select() with invalid argument: " + std::to_string(k));
        }
        return keys[k];
    }
\/
    [[nodiscard]] Key floor(const Key& key) const {
        int i = rank(key);
        if (i &lt; n && key == keys[i]) return keys[i];
        if (i == 0) throw std::runtime_error("argument to floor() is too small");
        else return keys[i - 1];
    }
\/
    [[nodiscard]] Key ceiling(const Key& key) const {
        int i = rank(key);
        if (i == n) throw std::runtime_error("argument to ceiling() is too large");
        else return keys[i];
    }
\/
    [[nodiscard]] int size(const Key& lo, const Key& hi) const {
        if (lo &gt; hi) return 0;
        if (contains(hi)) return rank(hi) - rank(lo) + 1;
        else return rank(hi) - rank(lo);
    }
\/
    [[nodiscard]] std::vector&lt;Key&gt; getkeys() const {
        return getkeys(min(), max());
    }
\/
    [[nodiscard]] std::vector&lt;Key&gt; getkeys(const Key& lo, const Key& hi) const {
        std::vector&lt;Key&gt; queue;
        if (lo &gt; hi) return queue;
        for (int i = rank(lo); i &lt; rank(hi); ++i)
            queue.push_back(keys[i]);
        if (contains(hi)) queue.push_back(keys[rank(hi)]);
        return queue;
    }
\/
private:
    [[nodiscard]] bool check() const {
        return isSorted() && rankCheck();
    }
\/
    [[nodiscard]] bool isSorted() const {
        for (int i = 1; i &lt; size(); i++)
            if (keys[i] &lt; keys[i - 1]) return false;
        return true;
    }
\/
    [[nodiscard]] bool rankCheck() const {
        for (int i = 0; i &lt; size(); i++)
            if (i != rank(select(i))) return false;
        for (int i = 0; i &lt; size(); i++)
            if (keys[i] != select(rank(keys[i]))) return false;
        return true;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class BinarySearchST:
    INIT_CAPACITY = 2
    MISSING_VALUE = -1
\/
    def __init__(self, capacity=INIT_CAPACITY):
        self.keys = [None] * capacity
        self.vals = [None] * capacity
        self.n = 0
\/
    def size(self):
        return self.n
\/
    def isEmpty(self):
        return self.size() == 0
\/
    def contains(self, key):
        return self.get(key) is not None
\/
    def get(self, key):
        if self.isEmpty():
            return None
        i = self.rank(key)
        if i &lt; self.n and self.keys[i] == key:
            return self.vals[i]
        return None
\/
    def rank(self, key):
        lo = 0
        hi = self.n - 1
        while lo &lt;= hi:
            mid = lo + (hi - lo) // 2
            if key &lt; self.keys[mid]:
                hi = mid - 1
            elif key &gt; self.keys[mid]:
                lo = mid + 1
            else:
                return mid
        return lo
\/
    def put(self, key, val):
        if val == self.MISSING_VALUE:
            self.delete(key)
            return
\/
        i = self.rank(key)
\/
        if i &lt; self.n and self.keys[i] == key:
            self.vals[i] = val
            return
\/
        if self.n == len(self.keys):
            self.resize(2 * len(self.keys))
\/
        for j in range(self.n, i, -1):
            self.keys[j] = self.keys[j - 1]
            self.vals[j] = self.vals[j - 1]
        self.keys[i] = key
        self.vals[i] = val
        self.n += 1
\/    
        assert self.check()
\/
    def delete(self, key):
        if self.isEmpty():
            return
\/
        i = self.rank(key)
\/
        if i == self.n or self.keys[i] != key:
            return
\/
        for j in range(i, self.n - 1):
            self.keys[j] = self.keys[j + 1]
            self.vals[j] = self.vals[j + 1]
\/
        self.n -= 1
        self.keys[self.n] = None
        self.vals[self.n] = None
\/
        if self.n &gt; 0 and self.n == len(self.keys) // 4:
            self.resize(len(self.keys) // 2)
\/
        assert self.check()
\/
    def deleteMin(self):
        if self.isEmpty():
            raise Exception("Symbol table underflow error")
        self.delete(self.min())
\/
    def deleteMax(self):
        if self.isEmpty():
            raise Exception("Symbol table underflow error")
        self.delete(self.max())
\/
    def min(self):
        if self.isEmpty():
            return
        return self.keys[0]
\/
    def max(self):
        if self.isEmpty():
            return
        return self.keys[self.n - 1]
\/
    def select(self, k):
        if k &lt; 0 or k &gt;= self.size():
            raise ValueError(f"called select() with invalid argument: {k}")
        return self.keys[k]
\/
    def floor(self, key):
        i = self.rank(key)
        if i &lt; self.n and key == self.keys[i]:
            return self.keys[i]
        if i == 0:
            raise Exception("argument to floor() is too small")
        else:
            return self.keys[i - 1]
\/
    def ceiling(self, key):
        i = self.rank(key)
        if i == self.n:
            raise Exception("argument to ceiling() is too large")
        else:
            return self.keys[i]
\/
    def size_range(self, lo, hi):
        if lo &gt; hi:
            return 0
        if self.contains(hi):
            return self.rank(hi) - self.rank(lo) + 1
        else:
            return self.rank(hi) - self.rank(lo)
\/
    def getkeys(self):
        if self.isEmpty():
            return []
        return self.keys_range(self.min(), self.max())
\/
    def keys_range(self, lo, hi):
        queue = []
        if lo &gt; hi:
            return queue
        for i in range(self.rank(lo), self.rank(hi)):
            queue.append(self.keys[i])
        if self.contains(hi):
            queue.append(self.keys[self.rank(hi)])
        return queue
\/
    def resize(self, capacity):
        assert capacity &gt;= self.n
        tempk = [None] * capacity
        tempv = [None] * capacity
        for i in range(self.n):
            tempk[i] = self.keys[i]
            tempv[i] = self.vals[i]
        self.vals = tempv
        self.keys = tempk
\/
    def check(self):
        return self.isSorted() and self.rankCheck()
\/
    def isSorted(self):
        for i in range(1, self.size()):
            if self.keys[i] &lt; self.keys[i - 1]:
                return False
        return True
\/    
    def rankCheck(self):
        for i in range(self.size()):
            if i != self.rank(self.select(i)):
                return False
        for i in range(self.size()):
            if self.keys[i] != self.select(self.rank(self.keys[i])):
                return False
        return True
    </code-block>
    </tab>
</tabs>

### 9.2 Ordered Operation

<p>Provide an interface that can give clients ordered symbol 
tables!</p>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.TreeMap;
\/
public class ST&lt;Key extends Comparable&lt;Key&gt;, Value&gt; implements Iterable&lt;Key&gt; {
\/
    private final TreeMap&lt;Key, Value&gt; st;
\/
    public ST() {
        st = new TreeMap&lt;Key, Value&gt;();
    }
\/
    public Value get(Key key) {
        if (key == null) throw new IllegalArgumentException("called get() with null key");
        return st.get(key);
    }
\/
    public void put(Key key, Value val) {
        if (key == null) throw new IllegalArgumentException("called put() with null key");
        if (val == null) st.remove(key);
        else             st.put(key, val);
    }
\/
    @Deprecated
    public void delete(Key key) {
        if (key == null) throw new IllegalArgumentException("called delete() with null key");
        st.remove(key);
    }
\/
    public void remove(Key key) {
        if (key == null) throw new IllegalArgumentException("called remove() with null key");
        st.remove(key);
    }
\/
    public boolean contains(Key key) {
        if (key == null) throw new IllegalArgumentException("called contains() with null key");
        return st.containsKey(key);
    }
\/
    public int size() {
        return st.size();
    }
\/
    public boolean isEmpty() {
        return size() == 0;
    }
\/
    public Iterable&lt;Key&gt; keys() {
        return st.keySet();
    }
\/
    @Deprecated
    public Iterator&lt;Key&gt; iterator() {
        return st.keySet().iterator();
    }
\/
    public Key min() {
        if (isEmpty()) throw new NoSuchElementException("called min() with empty symbol table");
        return st.firstKey();
    }
\/
    public Key max() {
        if (isEmpty()) throw new NoSuchElementException("called max() with empty symbol table");
        return st.lastKey();
    }
\/
    public Key ceiling(Key key) {
        if (key == null) throw new IllegalArgumentException("called ceiling() with null key");
        Key k = st.ceilingKey(key);
        if (k == null) throw new NoSuchElementException("all keys are less than " + key);
        return k;
    }
\/
    public Key floor(Key key) {
        if (key == null) throw new IllegalArgumentException("called floor() with null key");
        Key k = st.floorKey(key);
        if (k == null) throw new NoSuchElementException("all keys are greater than " + key);
        return k;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;vector&gt;
#include &lt;stdexcept&gt;
\/
template &lt;typename Key, typename Value&gt;
class ST {
private:
    std::map&lt;Key, Value&gt; st;
\/
public:
    ST() = default;
\/
    [[nodiscard]] Value get(const Key& key) const {
        auto it = st.find(key);
        if (it == st.end()) {
            return Value{};
        }
        return it-&gt;second;
    }
\/
    void put(const Key& key, const Value& val) {
        st.insert_or_assign(key, val);
    }
\/
    void remove(const Key& key) {
        st.erase(key);
    }
\/
    [[nodiscard]] bool contains(const Key& key) const {
        return st.contains(key);
    }
\/
    [[nodiscard]] int size() const {
        return st.size();
    }
\/
    [[nodiscard]] bool isEmpty() const {
        return size() == 0;
    }
\/
    [[nodiscard]] auto keys() const {
        std::vector&lt;Key&gt; keysVec;
        for (const auto& pair : st) {
            keysVec.push_back(pair.first);
        }
        return keysVec;
    }
\/
    [[nodiscard]] auto begin() const {
        return st.begin();
    }
\/
    [[nodiscard]] auto end() const {
        return st.end();
    }
\/
    [[nodiscard]] const Key& min() const {
        if (isEmpty()) {
            throw std::runtime_error("called min() with empty symbol table");
        }
        return st.begin()-&gt;first;
    }
\/
    [[nodiscard]] const Key& max() const {
        if (isEmpty()) {
            throw std::runtime_error("called max() with empty symbol table");
        }
        return st.rbegin()-&gt;first;
    }
\/
    [[nodiscard]] const Key& ceiling(const Key& key) const {
        auto it = st.lower_bound(key);
        return it-&gt;first;
    }
\/
    [[nodiscard]] const Key& floor(const Key& key) const {
        auto it = st.upper_bound(key);
        --it;
        return it-&gt;first;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class ST:
    def __init__(self):
        self.st = {} 
\/
    def get(self, key):
        if key is None:
            raise ValueError("called get() with null key")
        return self.st.get(key)
\/    
    def put(self, key, val):
        if key is None:
            raise ValueError("called put() with null key")
        if val is None:
            del self.st[key]
        else:
            self.st[key] = val
\/
    def remove(self, key):
        if key is None:
            raise ValueError("called remove() with null key")
        del self.st[key]
\/
    def contains(self, key):
        if key is None:
            raise ValueError("called contains() with null key")
        return key in self.st
\/
    def size(self):
        return len(self.st)
\/
    def is_empty(self):
        return self.size() == 0
\/
    def keys(self):
        return list(self.st.keys())
\/
    def __iter__(self):  
        return iter(self.st.keys())
\/
    def min(self):
        if self.is_empty():
            raise RuntimeError("called min() with empty symbol table")
        return min(self.st.keys())
\/
    def max(self):
        if self.is_empty():
            raise RuntimeError("called max() with empty symbol table")
        return max(self.st.keys())
\/
    def ceiling(self, key):
        if key is None:
            raise ValueError("called ceiling() with null key")
        keys_greater_equal = [k for k in self.st.keys() if k &gt;= key]
        if not keys_greater_equal:
            raise RuntimeError("all keys are less than {}".format(key))
        return min(keys_greater_equal)
\/
    def floor(self, key):
        if key is None:
            raise ValueError("called floor() with null key")
        keys_less_equal = [k for k in self.st.keys() if k &lt;= key]
        if not keys_less_equal:
            raise RuntimeError("all keys are greater than {}".format(key))
        return max(keys_less_equal)
    </code-block>
    </tab>
</tabs>

### 9.3 Binary Search Trees {id="BST"}

<p><format color="DarkOrange">Binary Saerch Tree</format>: A BST is a
<format color="OrangeRed">binary tree</format> in <format color=
"OrangeRed">symmetric order</format>.</p>

<p>A binary tree is either:</p>

<list type="bullet">
<li>
    <p>Empty.</p>
</li>
<li>
    <p>Two disjoint binary trees (left and right).</p>
</li>
</list>

<img src="../images_data/d9-3-1.png" alt="Binary Search Tree"/>

<p><format color="BlueViolet">Symmetric order</format>: Each node 
has a key, and every node's key is:</p>

<list type="bullet">
<li>
    <p>Larger than all keys in the left subtree.</p>
</li>
<li>
    <p>Smaller than all keys in the right subtree.</p>
</li>
</list>

<img src="../images_data/d9-3-2.png" alt="Symmetric Order"/>

<procedure title="BST Search">
<step>
    <p>If less, go left.</p>
</step>
<step>
    <p>If greater, go right.</p>
</step>
<step>
    <p>If equal, search hit.</p>
</step>
</procedure>

<procedure title="BST Insertion">
<step>
    <p>Search for keys, then two cases:</p>
    <list type="bullet">
    <li>
        <p>Key in tree => reset value</p>
    </li>
    <li>
        <p>Key not in tree => add new node</p>
    </li>
    </list>
</step>
</procedure>

<p><format color="BlueViolet">Property:</format> If <math>N</math> 
distinct keys are inserted into a BST in <format color="OrangeRed">
random order</format>, the expected number of compares for a search
/insert is <math>\sim 2 \ln N</math>.
</p>

<p><format color="LawnGreen">Proof:</format> 1-1 correspondence 
with quicksort partitioning.</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Floor</format>: Largest key &le; to 
    a given key.</p>
</li>
<li>
    <p><format color="Fuchsia">Ceiling</format>: Smallest key &ge; to
    a given key.</p>
</li>
<li>
    <p><format color="Fuchsia">Rank</format>: How many keys &lt; k</p>
</li>
</list>

<procedure title="Computing the Floor" type="choices">
<step>
    <p><math>k</math> equals to the key at the root. => The floor of 
    <math>k</math> is <math>k</math>.</p>
</step>
<step>
    <p><math>k</math> is less than the key at the root. => The floor
    of <math>k</math> is in the left subtree.</p>
</step>
<step>
    <p><math>k</math> is greater than the key at the root. => The 
    floor of <math>k</math> is in the right subtree (if there is any
    key <math>\leq; k</math>); otherwise, it is the key at the root.
    </p>
</step>
<img src="../images_data/d9-3-3.png" alt="Computing the Floor"/>
</procedure>

<procedure title="Deleting the Minimum">
<step>
    <p>Go left until finding a node with a null left link.</p>
</step>
<step>
    <p>Replace that node by its right link.</p>
</step>
<step>
    <p>Update subtree counts.</p>
</step>
<img src="../images_data/d9-3-4.png" alt="Delete the minimum"/>
</procedure>

<procedure title="Habbard Deletion" type="choices">
<step>
    <p><format color="Fuchsia">0 children:</format> Delete <math>t
    </math> by setting parent link to null.</p>
    <img src="../images_data/d9-3-5.png" alt="Habbard Deletion 0 
    children"/>
</step>
<step>
    <p><format color="Fuchsia">1 child:</format> Delete <math>t
    </math> by replacing parent link.</p>
    <img src="../images_data/d9-3-6.png" alt="Habbard Deletion 1 
    child"/>
</step>
<step>
    <p><format color="Fuchsia">2 children:</format></p>
    <list type="bullet">
    <li>
        <p>Find successor <math>x</math> of <math>t</math>.</p>
    </li>
    <li>
        <p>Delete the minimum in its <math>t</math>'s right subtree
        .</p>
    </li>
    <li>
        <p>Put <math>x</math> in <math>t</math>'s spot.</p>
    </li>
    </list>
    <img src="../images_data/d9-3-7.png" alt="Habbard Deletion 2 
    children"/>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.NoSuchElementException;
import java.util.Queue;
import java.util.LinkedList;
\/
public class BST&lt;Key extends Comparable&lt;Key&gt;, Value&gt; {
    private Node root;
\/
    private class Node {
        private final Key key;
        private Value val;
        private Node left, right;
        private int size;
\/
        public Node(Key key, Value val, int size) {
            this.key = key;
            this.val = val;
            this.size = size;
        }
    }
\/
    public BST() {
    }
\/
    public boolean isEmpty() {
        return size() == 0;
    }
\/
    public int size() {
        return size(root);
    }
\/
    private int size(Node x) {
        if (x == null) return 0;
        else return x.size;
    }
\/
    public boolean contains(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to contains() is null");
        return get(key) != null;
    }
\/
    public Value get(Key key) {
        return get(root, key);
    }
\/
    private Value get(Node x, Key key) {
        if (key == null) throw new IllegalArgumentException("calls get() with a null key");
        if (x == null) return null;
        int cmp = key.compareTo(x.key);
        if (cmp &lt; 0) return get(x.left, key);
        else if (cmp &gt; 0) return get(x.right, key);
        else return x.val;
    }
\/
    public void put(Key key, Value val) {
        if (key == null) throw new IllegalArgumentException("calls put() with a null key");
        if (val == null) {
            delete(key);
            return;
        }
        root = put(root, key, val);
        assert check();
    }
\/
    private Node put(Node x, Key key, Value val) {
        if (x == null) return new Node(key, val, 1);
        int cmp = key.compareTo(x.key);
        if (cmp &lt; 0) x.left = put(x.left, key, val);
        else if (cmp &gt; 0) x.right = put(x.right, key, val);
        else x.val = val;
        x.size = 1 + size(x.left) + size(x.right);
        return x;
    }
\/
    public void deleteMin() {
        if (isEmpty()) throw new NoSuchElementException("Symbol table underflow");
        root = deleteMin(root);
        assert check();
    }
\/
    private Node deleteMin(Node x) {
        if (x.left == null) return x.right;
        x.left = deleteMin(x.left);
        x.size = size(x.left) + size(x.right) + 1;
        return x;
    }
\/
    public void deleteMax() {
        if (isEmpty()) throw new NoSuchElementException("Symbol table underflow");
        root = deleteMax(root);
        assert check();
    }
\/
    private Node deleteMax(Node x) {
        if (x.right == null) return x.left;
        x.right = deleteMax(x.right);
        x.size = size(x.left) + size(x.right) + 1;
        return x;
    }
\/
    public void delete(Key key) {
        if (key == null) throw new IllegalArgumentException("calls delete() with a null key");
        root = delete(root, key);
        assert check();
    }
\/
    private Node delete(Node x, Key key) {
        if (x == null) return null;
\/
        int cmp = key.compareTo(x.key);
        if (cmp &lt; 0) x.left = delete(x.left, key);
        else if (cmp &gt; 0) x.right = delete(x.right, key);
        else {
            if (x.right == null) return x.left;
            if (x.left == null) return x.right;
            Node t = x;
            x = min(t.right);
            x.right = deleteMin(t.right);
            x.left = t.left;
        }
        x.size = size(x.left) + size(x.right) + 1;
        return x;
    }
\/
    public Key min() {
        if (isEmpty()) throw new NoSuchElementException("calls min() with empty symbol table");
        return min(root).key;
    }
\/
    private Node min(Node x) {
        if (x.left == null) return x;
        else return min(x.left);
    }
\/
    public Key max() {
        if (isEmpty()) throw new NoSuchElementException("calls max() with empty symbol table");
        return max(root).key;
    }
\/
    private Node max(Node x) {
        if (x.right == null) return x;
        else return max(x.right);
    }
\/
    public Key floor(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to floor() is null");
        if (isEmpty()) throw new NoSuchElementException("calls floor() with empty symbol table");
        Node x = floor(root, key);
        if (x == null) throw new NoSuchElementException("argument to floor() is too small");
        else return x.key;
    }
\/
    private Node floor(Node x, Key key) {
        if (x == null) return null;
        int cmp = key.compareTo(x.key);
        if (cmp == 0) return x;
        if (cmp &lt; 0) return floor(x.left, key);
        Node t = floor(x.right, key);
        if (t != null) return t;
        else return x;
    }
\/
    public Key floor2(Key key) {
        Key x = floor2(root, key, null);
        if (x == null) throw new NoSuchElementException("argument to floor() is too small");
        else return x;
    }
\/
    private Key floor2(Node x, Key key, Key best) {
        if (x == null) return best;
        int cmp = key.compareTo(x.key);
        if (cmp &lt; 0) return floor2(x.left, key, best);
        else if (cmp &gt; 0) return floor2(x.right, key, x.key);
        else return x.key;
    }
\/
    public Key ceiling(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to ceiling() is null");
        if (isEmpty()) throw new NoSuchElementException("calls ceiling() with empty symbol table");
        Node x = ceiling(root, key);
        if (x == null) throw new NoSuchElementException("argument to ceiling() is too large");
        else return x.key;
    }
\/
    private Node ceiling(Node x, Key key) {
        if (x == null) return null;
        int cmp = key.compareTo(x.key);
        if (cmp == 0) return x;
        if (cmp &lt; 0) {
            Node t = ceiling(x.left, key);
            if (t != null) return t;
            else return x;
        }
        return ceiling(x.right, key);
    }
\/
    public Key select(int rank) {
        if (rank &lt; 0 || rank &gt;= size()) {
            throw new IllegalArgumentException("argument to select() is invalid: " + rank);
        }
        return select(root, rank);
    }
\/
    private Key select(Node x, int rank) {
        if (x == null) return null;
        int leftSize = size(x.left);
        if (leftSize &gt; rank) return select(x.left, rank);
        else if (leftSize &lt; rank) return select(x.right, rank - leftSize - 1);
        else return x.key;
    }
\/
    public int rank(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to rank() is null");
        return rank(key, root);
    }
\/
    private int rank(Key key, Node x) {
        if (x == null) return 0;
        int cmp = key.compareTo(x.key);
        if (cmp &lt; 0) return rank(key, x.left);
        else if (cmp &gt; 0) return 1 + size(x.left) + rank(key, x.right);
        else return size(x.left);
    }
\/
    public Iterable&lt;Key&gt; keys() {
        if (isEmpty()) return new LinkedList&lt;&gt;();
        return keys(min(), max());
    }
\/
    public Iterable&lt;Key&gt; keys(Key lo, Key hi) {
        if (lo == null) throw new IllegalArgumentException("first argument to keys() is null");
        if (hi == null) throw new IllegalArgumentException("second argument to keys() is null");
\/
        Queue&lt;Key&gt; queue = new LinkedList&lt;&gt;();
        keys(root, queue, lo, hi);
        return queue;
    }
\/
    private void keys(Node x, Queue&lt;Key&gt; queue, Key lo, Key hi) {
        if (x == null) return;
        int cmplo = lo.compareTo(x.key);
        int cmphi = hi.compareTo(x.key);
        if (cmplo &lt; 0) keys(x.left, queue, lo, hi);
        if (cmplo &lt;= 0 && cmphi &gt;= 0) queue.add(x.key);
        if (cmphi &gt; 0) keys(x.right, queue, lo, hi);
    }
\/
    public int size(Key lo, Key hi) {
        if (lo == null) throw new IllegalArgumentException("first argument to size() is null");
        if (hi == null) throw new IllegalArgumentException("second argument to size() is null");
\/
        if (lo.compareTo(hi) &gt; 0) return 0;
        if (contains(hi)) return rank(hi) - rank(lo) + 1;
        else return rank(hi) - rank(lo);
    }
\/
    public int height() {
        return height(root);
    }
\/
    private int height(Node x) {
        if (x == null) return -1;
        return 1 + Math.max(height(x.left), height(x.right));
    }
\/
    public Iterable&lt;Key&gt; levelOrder() {
        Queue&lt;Key&gt; keys = new LinkedList&lt;&gt;();
        Queue&lt;Node&gt; queue = new LinkedList&lt;&gt;();
        queue.add(root);
        while (!queue.isEmpty()) {
            Node x = queue.remove();
            if (x == null) continue;
            keys.add(x.key);
            queue.add(x.left);
            queue.add(x.right);
        }
        return keys;
    }
\/
    private boolean check() {
        if (!isBST()) System.out.println("Not in symmetric order");
        if (!isSizeConsistent()) System.out.println("Subtree counts not consistent");
        if (!isRankConsistent()) System.out.println("Ranks not consistent");
        return isBST() && isSizeConsistent() && isRankConsistent();
    }
\/
    private boolean isBST() {
        return isBST(root, null, null);
    }
\/
    private boolean isBST(Node x, Key min, Key max) {
        if (x == null) return true;
        if (min != null && x.key.compareTo(min) &lt;= 0) return false;
        if (max != null && x.key.compareTo(max) &gt;= 0) return false;
        return isBST(x.left, min, x.key) && isBST(x.right, x.key, max);
    }
\/
    private boolean isSizeConsistent() {
        return isSizeConsistent(root);
    }
\/
    private boolean isSizeConsistent(Node x) {
        if (x == null) return true;
        if (x.size != size(x.left) + size(x.right) + 1) return false;
        return isSizeConsistent(x.left) && isSizeConsistent(x.right);
    }
\/
    private boolean isRankConsistent() {
        for (int i = 0; i &lt; size(); i++)
            if (i != rank(select(i))) return false;
        for (Key key : keys())
            if (key.compareTo(select(rank(key))) != 0) return false;
        return true;
    }
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;stdexcept&gt;
#include &lt;utility&gt;
\/
template &lt;typename Key, typename Value&gt;
class BST {
private:
    struct Node {
        Key key;
        Value val;
        Node *left, *right;
        int size;
\/
        Node(Key  key, const Value& val, const int size) :
            key(std::move(key)), val(val), left(nullptr), right(nullptr), size(size) {}
    };
\/
    Node* root;
\/
    static int size(Node* x) {
        if (x == nullptr) return 0;
        return x-&gt;size;
    }
\/
    Value get(Node* x, const Key& key) const {
        if (x == nullptr) return Value(); // Return default value for Value type
        if (key &lt; x-&gt;key) return get(x-&gt;left, key);
        if (key &gt; x-&gt;key) return get(x-&gt;right, key);
        return x-&gt;val;
    }
\/
    Node* put(Node* x, const Key& key, const Value& val) {
        if (x == nullptr) return new Node(key, val, 1);
        if (key &lt; x-&gt;key) x-&gt;left = put(x-&gt;left, key, val);
        else if (key &gt; x-&gt;key) x-&gt;right = put(x-&gt;right, key, val);
        else x-&gt;val = val;
        x-&gt;size = 1 + size(x-&gt;left) + size(x-&gt;right);
        return x;
    }
\/
    Node* deleteMin(Node* x) {
        if (x-&gt;left == nullptr) {
            Node* temp = x-&gt;right;
            delete x;
            return temp;
        }
        x-&gt;left = deleteMin(x-&gt;left);
        x-&gt;size = size(x-&gt;left) + size(x-&gt;right) + 1;
        return x;
    }
\/
    Node* deleteMax(Node* x) {
        if (x-&gt;right == nullptr) {
            Node* temp = x-&gt;left;
            delete x;
            return temp;
        }
        x-&gt;right = deleteMax(x-&gt;right);
        x-&gt;size = size(x-&gt;left) + size(x-&gt;right) + 1;
        return x;
    }
\/
    Node* deleteKey(Node* x, const Key& key) {
        if (x == nullptr) return nullptr;
        if (key &lt; x-&gt;key) x-&gt;left = deleteKey(x-&gt;left, key);
        else if (key &gt; x-&gt;key) x-&gt;right = deleteKey(x-&gt;right, key);
        else {
            if (x-&gt;right == nullptr) return x-&gt;left;
            if (x-&gt;left == nullptr) return x-&gt;right;
            Node* t = x;
            x = min(t-&gt;right);
            x-&gt;right = deleteMin(t-&gt;right);
            x-&gt;left = t-&gt;left;
        }
        x-&gt;size = size(x-&gt;left) + size(x-&gt;right) + 1;
        return x;
    }
\/
    Node* min(Node* x) const {
        if (x-&gt;left == nullptr) return x;
        return min(x-&gt;left);
    }
\/
    Node* max(Node* x) const {
        if (x-&gt;right == nullptr) return x;
        return max(x-&gt;right);
    }
\/
    Node* floor(Node* x, const Key& key) const {
        if (x == nullptr) return nullptr;
        if (key &lt; x-&gt;key) return floor(x-&gt;left, key);
        if (key &gt; x-&gt;key) {
            Node* t = floor(x-&gt;right, key);
            if (t != nullptr) return t;
            return x;
        }
        return x;
    }
\/
    Node* ceiling(Node* x, const Key& key) const {
        if (x == nullptr) return nullptr;
        if (key &gt; x-&gt;key) return ceiling(x-&gt;right, key);
        if (key &lt; x-&gt;key) {
            Node* t = ceiling(x-&gt;left, key);
            if (t != nullptr) return t;
            return x;
        }
        return x;
    }
\/
    Key select(Node* x, int rank) const {
        if (x == nullptr) return Key(); // Return default value for Key type
        int leftSize = size(x-&gt;left);
        if (leftSize &gt; rank) return select(x-&gt;left, rank);
        else if (leftSize &lt; rank) return select(x-&gt;right, rank - leftSize - 1);
        else return x-&gt;key;
    }
\/
    int rank(const Key& key, Node* x) const {
        if (x == nullptr) return 0;
        if (key &lt; x-&gt;key) return rank(key, x-&gt;left);
        else if (key &gt; x-&gt;key) return 1 + size(x-&gt;left) + rank(key, x-&gt;right);
        else return size(x-&gt;left);
    }
\/
    void keys(Node* x, std::queue&lt;Key&gt;& queue, const Key& lo, const Key& hi) const {
        if (x == nullptr) return;
        if (lo &lt; x-&gt;key) keys(x-&gt;left, queue, lo, hi);
        if (lo &lt;= x-&gt;key && x-&gt;key &lt;= hi) queue.push(x-&gt;key);
        if (hi &gt; x-&gt;key) keys(x-&gt;right, queue, lo, hi);
    }
\/
    int height(Node* x) const {
        if (x == nullptr) return -1;
        return 1 + std::max(height(x-&gt;left), height(x-&gt;right));
    }
\/
public:
    BST() : root(nullptr) {}
\/
    ~BST() {
        destroy(root); 
    }
\/
    void destroy(Node* node) {
        if (node == nullptr) return; 
        destroy(node-&gt;left);
        destroy(node-&gt;right);
        delete node;
    }
\/
    [[nodiscard]] bool isEmpty() const {
        return size() == 0;
    }
\/
    [[nodiscard]] int size() const {
        return size(root);
    }
\/
    [[nodiscard]] bool contains(const Key& key) const {
        return get(key) != Value(); // Compare with default value
    }
\/
    [[nodiscard]] Value get(const Key& key) const {
        return get(root, key);
    }
\/
    void put(const Key& key, const Value& val) {
        root = put(root, key, val);
    }
\/
    void deleteMin() {
        if (isEmpty()) throw std::runtime_error("Symbol table underflow");
        root = deleteMin(root);
    }
\/
    void deleteMax() {
        if (isEmpty()) throw std::runtime_error("Symbol table underflow");
        root = deleteMax(root);
    }
\/
    void deleteKey(const Key& key) {
        root = deleteKey(root, key);
    }
\/
    [[nodiscard]] Key min() const {
        if (isEmpty()) throw std::runtime_error("calls min() with empty symbol table");
        return min(root)-&gt;key;
    }
\/
    [[nodiscard]] Key max() const {
        if (isEmpty()) throw std::runtime_error("calls max() with empty symbol table");
        return max(root)-&gt;key;
    }
\/
    [[nodiscard]] Key floor(const Key& key) const {
        if (isEmpty()) throw std::runtime_error("calls floor() with empty symbol table");
        Node* x = floor(root, key);
        if (x == nullptr) throw std::runtime_error("argument to floor() is too small");
        else return x-&gt;key;
    }
\/
    [[nodiscard]] Key ceiling(const Key& key) const {
        if (isEmpty()) throw std::runtime_error("calls ceiling() with empty symbol table");
        Node* x = ceiling(root, key);
        if (x == nullptr) throw std::runtime_error("argument to ceiling() is too large");
        else return x-&gt;key;
    }
\/
    [[nodiscard]] Key select(int rank) const {
        if (rank &lt; 0 || rank &gt;= size()) {
            throw std::runtime_error("argument to select() is invalid: " + std::to_string(rank));
        }
        return select(root, rank);
    }
\/
    [[nodiscard]] int rank(const Key& key) const {
        return rank(key, root);
    }
\/
    [[nodiscard]] std::queue&lt;Key&gt; keys() const {
        if (isEmpty()) return std::queue&lt;Key&gt;();
        return keys(min(), max());
    }
\/    
    [[nodiscard]] std::queue&lt;Key&gt; keys(const Key& lo, const Key& hi) const {
        std::queue&lt;Key&gt; queue;
        keys(root, queue, lo, hi);
        return queue;
    }
\/
    [[nodiscard]] int size(const Key& lo, const Key& hi) const {
        if (lo &gt; hi) return 0;
        if (contains(hi)) return rank(hi) - rank(lo) + 1;
        else return rank(hi) - rank(lo);
    }
\/
    [[nodiscard]] int height() const {
        return height(root);
    }
\/
    [[nodiscard]] std::queue&lt;Key&gt; levelOrder() const {
        std::queue&lt;Key&gt; keys;
        std::queue&lt;Node*&gt; queue;
        queue.push(root);
        while (!queue.empty()) {
            Node* x = queue.front();
            queue.pop();
            if (x == nullptr) continue;
            keys.push(x-&gt;key);
            queue.push(x-&gt;left);
            queue.push(x-&gt;right);
        }
        return keys;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class Node:
    def __init__(self, key, val, size):
        self.key = key
        self.val = val
        self.left = None
        self.right = None
        self.size = size
\/
class BST:
    def __init__(self):
        self.root = None
\/
    def isEmpty(self):
        return self.size() == 0
\/
    def size(self):
        return self._size(self.root)
\/
    def _size(self, x):
        if x is None:
            return 0
        else:
            return x.size
\/
    def contains(self, key):
        if key is None:
            raise ValueError("argument to contains() is None")
        return self.get(key) is not None
\/
    def get(self, key):
        return self._get(self.root, key)
\/
    def _get(self, x, key):
        if key is None:
            raise ValueError("calls get() with a None key")
        if x is None:
            return None
        if key &lt; x.key:
            return self._get(x.left, key)
        elif key &gt; x.key:
            return self._get(x.right, key)
        else:
            return x.val
\/
    def put(self, key, val):
        if key is None:
            raise ValueError("calls put() with a None key")
        if val is None:
            self.delete(key)
            return
        self.root = self._put(self.root, key, val)
        assert self._check()
\/
    def _put(self, x, key, val):
        if x is None:
            return Node(key, val, 1)
        if key &lt; x.key:
            x.left = self._put(x.left, key, val)
        elif key &gt; x.key:
            x.right = self._put(x.right, key, val)
        else:
            x.val = val
        x.size = 1 + self._size(x.left) + self._size(x.right)
        return x
\/
    def deleteMin(self):
        if self.isEmpty():
            raise IndexError("Symbol table underflow")
        self.root = self._deleteMin(self.root)
        assert self._check()
\/
    def _deleteMin(self, x):
        if x.left is None:
            return x.right
        x.left = self._deleteMin(x.left)
        x.size = self._size(x.left) + self._size(x.right) + 1
        return x
\/
    def deleteMax(self):
        if self.isEmpty():
            raise IndexError("Symbol table underflow")
        self.root = self._deleteMax(self.root)
        assert self._check()
\/
    def _deleteMax(self, x):
        if x.right is None:
            return x.left
        x.right = self._deleteMax(x.right)
        x.size = self._size(x.left) + self._size(x.right) + 1
        return x
\/
    def delete(self, key):
        if key is None:
            raise ValueError("calls delete() with a None key")
        self.root = self._delete(self.root, key)
        assert self._check()
\/
    def _delete(self, x, key):
        if x is None:
            return None
\/
        if key &lt; x.key:
            x.left = self._delete(x.left, key)
        elif key &gt; x.key:
            x.right = self._delete(x.right, key)
        else:
            if x.right is None:
                return x.left
            if x.left is None:
                return x.right
            t = x
            x = self.min(t.right)
            x.right = self._deleteMin(t.right)
            x.left = t.left
        x.size = self._size(x.left) + self._size(x.right) + 1
        return x
\/
    def min(self):
        if self.isEmpty():
            raise IndexError("calls min() with empty symbol table")
        return self._min(self.root).key
\/
    def _min(self, x):
        if x.left is None:
            return x
        else:
            return self._min(x.left)
\/
    def max(self):
        if self.isEmpty():
            raise IndexError("calls max() with empty symbol table")
        return self._max(self.root).key
\/
    def _max(self, x):
        if x.right is None:
            return x
        else:
            return self._max(x.right)
\/
    def floor(self, key):
        if key is None:
            raise ValueError("argument to floor() is None")
        if self.isEmpty():
            raise IndexError("calls floor() with empty symbol table")
        x = self._floor(self.root, key)
        if x is None:
            raise IndexError("argument to floor() is too small")
        else:
            return x.key
\/
    def _floor(self, x, key):
        if x is None:
            return None
        if key == x.key:
            return x
        if key &lt; x.key:
            return self._floor(x.left, key)
        t = self._floor(x.right, key)
        if t is not None:
            return t
        else:
            return x
\/
    def floor2(self, key):
        x = self._floor2(self.root, key, None)
        if x is None:
            raise IndexError("argument to floor() is too small")
        else:
            return x
\/
    def _floor2(self, x, key, best):
        if x is None:
            return best
        if key &lt; x.key:
            return self._floor2(x.left, key, best)
        elif key &gt; x.key:
            return self._floor2(x.right, key, x.key)
        else:
            return x.key
\/
    def ceiling(self, key):
        if key is None:
            raise ValueError("argument to ceiling() is None")
        if self.isEmpty():
            raise IndexError("calls ceiling() with empty symbol table")
        x = self._ceiling(self.root, key)
        if x is None:
            raise IndexError("argument to ceiling() is too large")
        else:
            return x.key
\/
    def _ceiling(self, x, key):
        if x is None:
            return None
        if key == x.key:
            return x
        if key &lt; x.key:
            t = self._ceiling(x.left, key)
            if t is not None:
                return t
            else:
                return x
        return self._ceiling(x.right, key)
\/
    def select(self, rank):
        if rank &lt; 0 or rank &gt;= self.size():
            raise ValueError("argument to select() is invalid: " + str(rank))
        return self._select(self.root, rank)
\/
    def _select(self, x, rank):
        if x is None:
            return None
        leftSize = self._size(x.left)
        if leftSize &gt; rank:
            return self._select(x.left, rank)
        elif leftSize &lt; rank:
            return self._select(x.right, rank - leftSize - 1)
        else:
            return x.key
\/
    def rank(self, key):
        if key is None:
            raise ValueError("argument to rank() is None")
        return self._rank(key, self.root)
\/
    def _rank(self, key, x):
        if x is None:
            return 0
        if key &lt; x.key:
            return self._rank(key, x.left)
        elif key &gt; x.key:
            return 1 + self._size(x.left) + self._rank(key, x.right)
        else:
            return self._size(x.left)
\/
    def keys(self):
        if self.isEmpty():
            return []
        return self.keysInRange(self.min(), self.max())
\/
    def keysInRange(self, lo, hi):
        if lo is None:
            raise ValueError("first argument to keys() is None")
        if hi is None:
            raise ValueError("second argument to keys() is None")
\/
        queue = []
        self._keys(self.root, queue, lo, hi)
        return queue
\/
    def _keys(self, x, queue, lo, hi):
        if x is None:
            return
        if lo &lt; x.key:
            self._keys(x.left, queue, lo, hi)
        if lo &lt;= x.key &lt;= hi:
            queue.append(x.key)
        if hi &gt; x.key:
            self._keys(x.right, queue, lo, hi)
\/
    def sizeInRange(self, lo, hi):
        if lo is None:
            raise ValueError("first argument to size() is None")
        if hi is None:
            raise ValueError("second argument to size() is None")
\/
        if lo &gt; hi:
            return 0
        if self.contains(hi):
            return self.rank(hi) - self.rank(lo) + 1
        else:
            return self.rank(hi) - self.rank(lo)
\/
    def height(self):
        return self._height(self.root)
\/
    def _height(self, x):
        if x is None:
            return -1
        return 1 + max(self._height(x.left), self._height(x.right))
\/
    def levelOrder(self):
        keys = []
        queue = [self.root]  # Using a list as a queue
        while queue:
            x = queue.pop(0)  # Dequeue from the front
            if x is None:
                continue
            keys.append(x.key)
            queue.append(x.left)
            queue.append(x.right)
        return keys
\/
    def _check(self):
        if not self._isBST():
            print("Not in symmetric order")
        if not self._isSizeConsistent():
            print("Subtree counts not consistent")
        if not self._isRankConsistent():
            print("Ranks not consistent")
        return self._isBST() and self._isSizeConsistent() and self._isRankConsistent()
\/
    def _isBST(self):
        return self._isBSTHelper(self.root, None, None)
\/
    def _isBSTHelper(self, x, minKey, maxKey):
        if x is None:
            return True
        if minKey is not None and x.key &lt;= minKey:
            return False
        if maxKey is not None and x.key &gt;= maxKey:
            return False
        return self._isBSTHelper(x.left, minKey, x.key) and self._isBSTHelper(x.right, x.key, maxKey)
\/
    def _isSizeConsistent(self):
        return self._isSizeConsistentHelper(self.root)
\/
    def _isSizeConsistentHelper(self, x):
        if x is None:
            return True
        if x.size != self._size(x.left) + self._size(x.right) + 1:
            return False
        return self._isSizeConsistentHelper(x.left) and self._isSizeConsistentHelper(x.right)
\/
    def _isRankConsistent(self):
        for i in range(self.size()):
            if i != self.rank(self.select(i)):
                return False
        for key in self.keys():
            if key != self.select(self.rank(key)):
                return False
        return True
    </code-block>
    </tab>
</tabs>

### 9.4 Traversal

<p>To traverse binary trees with depth-first search, execute the 
following three operations in a certain order: </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">N:</format> Visit the current node.</p>
</li>
<li>
    <p><format color="Fuchsia">L:</format> Recursively traverse the 
    current node's left subtree.</p>
</li>
<li>
    <p><format color="Fuchsia">R:</format> Recursively traverse the 
    current node's right subtree.</p>
</li>
</list>

<p><format color="BlueViolet">Three types of traversal</format></p>

<list type="alpha-lower">
<li>
    <p><format color="#ff0000">Pre-order</format> => NLR</p>
</li>
<li>
    <p><format color="#00ff00">Post-order</format> => LRN</p>
</li>
<li>
    <p><format color="#2a7fff">In-order</format> => LNR</p>
</li>
</list>

<img src="../images_data/d9-4-1.png" alt="Traversal"/>

<p>Depth-first traversal (dotted path) of a binary tree:</p>
<list type="alpha-lower">
<li>
    <p><format color="#ff0000">Pre-order</format> <format style="italic">
    (node visited at position red)</format>:</p>
<p>F, B, A, D, C, E, G, I, H;</p>
</li>
<li>
    <p><format color="#00ff00">In-order</format> <format style="italic">
    (node visited at position green)</format>:</p>
<p>A, B, C, D, E, F, G, H, I;</p>
</li>
<li>
    <p><format color="#2a7fff">Post-order</format> <format style="italic">
    (node visited at position blue)</format>:</p>
    <p>A, C, E, D, B, H, I, G, F.</p>
</li>
</list>

<p><format color="BlueViolet">Level Order (breadth-first traversal)
:</format> Visit all the nodes of a tree data structure level by 
level.</p>

<procedure title="Level Order Traversal">
<step>
    <p>Start at the root node.</p>
</step>
<step>
    <p>Visit all the nodes at the current level.</p>
</step>
<step>
    <p>Move to the next level, repeat steps 2 and 3 until all levels 
    of the tree have been visited.</p>
</step>
</procedure>