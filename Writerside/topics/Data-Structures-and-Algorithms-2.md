<show-structure for="chapter" depth="3"></show-structure>

# Part Ⅱ

<primary-label ref="finish"></primary-label>

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

## 10 Balanced Search Trees

<table style="none">
<tr>
    <td rowspan="2">Implementation</td>
    <td colspan="3">Worst-Case Cost (after <math>N</math> inserts)
    </td>
    <td colspan="3">Average Case (after <math>N</math> random 
    inserts)</td>
    <td rowspan="2">Ordered Iteration?</td>
    <td rowspan="2">Key Interface</td>
</tr>
<tr>
    <td>Search</td>
    <td>Insert</td>
    <td>Delete</td>
    <td>Search Hit</td>
    <td>Insert</td>
    <td>Delete</td>
</tr>
<tr>
    <td><a anchor="sequential-search" summary="Unordered List 
    Implementation">Sequential Search (unordered list)</a></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>\frac {N}{2}</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td>no</td>
    <td><code>equals()</code></td>
</tr>
<tr>
    <td><a anchor="ordered-array" summary="Ordered Array Implementation">
    Binary Search (ordered list)</a></td>
    <td><math>\lg N</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>\lg N</math></td>
    <td><math>\frac {N}{2}</math></td>
    <td><math>\frac {N}{2}</math></td>
    <td>yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a anchor="BST" summary="Binary Search Tree">BST</a></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>1.39 \log N</math></td>
    <td><math>1.39 \log N</math></td>
    <td>?</td>
    <td>yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a anchor="2-3-trees" summary="2-3 Tree">2-3 Tree</a></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td>yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a anchor="red-black-bsts" summary="Red-Black BSTs">
    Red-Black BST</a></td>
    <td><math>2 \log N</math></td>
    <td><math>2 \log N</math></td>
    <td><math>2 \log N</math></td>
    <td><math>1.00 \lg N</math></td>
    <td><math>1.00 \lg N</math></td>
    <td><math>1.00 \lg N</math></td>
    <td>yes</td>
    <td><code>compareTo()</code></td>
</tr>
</table>

### 10.1 2-3 Trees {id="2-3-trees"}

<p><format color="BlueViolet">2-3 Tree</format></p>

<list type="bullet">
<li>
    <p>Allow 1 or 2 keys per node.</p>
</li>
<li>
    <p><format color="Fuchsia">2-node:</format> one key, two children.</p>
</li>
<li>
    <p><format color="Fuchsia">3-node:</format> two keys, three children.</p>
</li>
</list>

<img src="../images_data/d10-1-1.png" alt="2-3 Tree"/>

<procedure title="Searching in 2-3 Tree">
<step>
    <p>Compare search key against keys in node.</p>
</step>
<step>
    <p>Find interval containing search key.</p>
</step>
<step>
    <p>Follow associated key (recursively).</p>
</step>
</procedure>

<procedure title="Inserting into a 2-node At Bottom">
<step>
    <p>Search for key, as usual.</p>
</step>
<step>
    <p>Replace 2-node with 3-node.</p>
</step>
</procedure>

<procedure title="Inserting into a 3-node At Bottom">
<step>
    <p>Add new key to 3-node to create a temporary 4-node.</p>
</step>
<step>
    <p>Move middle key in 4-node into a parent.</p>
</step>
<step>
    <p>Repeat up the tree, as necessary.</p>
</step>
<step>
    <p>If you reach the root and it's a 4-node, split it into three 2-
    nodes.</p>
</step>
</procedure>

<p><format color="BlueViolet">Properties</format></p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Maintain symmetric order and perfect 
    balance:</format> Every path from root to null link has same length.
    </p>
    <p><format color="LawnGreen">Proof</format></p>
</li>
<li>
    <p><format color="Fuchsia">Worst case</format>: 
    <math>\lg N</math> => all 2-nodes</p>
</li>
<li>
    <p><format color="Fuchsia">Best case</format>: <math>
    \log_{3} N \approx 0.631 \lg N</math> => all 3-nodes</p>
</li>
<li>
    <p>Between 12 and 20 for a million nodes.</p>
</li>
<li>
    <p>Between 18 and 30 for a billion nodes.</p>
</li>
<li>
    <p>Guaranteed <format color="OrangeRed">logarithmic</format> 
    performance for search and insert.</p>
</li>
</list>

<tip>
    <p>But direct implementation is complicated, because:</p>
    <list type="bullet">
    <li>
        <p>Maintaining multiple node types is cumbersome.</p>
    </li>
    <li>
        <p>Need multiple compares to move down tree.</p>
    </li>
    <li>
        <p>Need to move back up the tree to split 4-nodes.</p>
    </li>
    <li>
        <p>Large number of cases for splitting.</p>
    </li>
    </list>
</tip>

### 10.2 Red-Black BSTs {id="red-black-bsts"}

#### 10.2.1 Left-Leaning Red-Black BSTs

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">Definition 1</format>: </p>
    <list type="bullet">
    <li>
        <p>Represent 2–3 tree as a BST.</p>
    </li>
    <li>
        <p>Use "internal" left-leaning links as "glue" for 3–nodes.</p>
    </li>
    </list>
</li>

<li>
    <p><format color="Fuchsia">Definition 2</format>: A BST such that:</p>
    <list type="bullet">
    <li>
        <p>No node has two red links connected to it.</p>
    </li>
    <li>
        <p>Every path from root to null link has the same number of black
        links.</p>
    </li>
    <li>
        <p>Red links lean left.</p>
    </li>
    </list>
</li>

</list>

<img src="../images_data/d10-2-1.png" alt="Red-Black BST"/>

<note><p>1–1 correspondence between 2–3 and LLRB!</p></note>

#### 10.2.2 Elementary Red-Black BST Operations

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">Left rotation:</format> Orient a 
    (temporarily) right-leaning red link to lean left.</p>
    <img src="../images_data/d10-2-2.png" alt="Left Rotation"/>
</li>
<li>
    <p><format color="Fuchsia">Right rotation:</format> Orient a 
    left-leaning red link to (temporarily) lean right.</p>
    <img src="../images_data/d10-2-3.png" alt="Right Rotation"/>
</li>
<li>
    <p><format color="Fuchsia">Color flip:</format> Recolor to split
    a (temporary) 4-node.</p>
    <img src="../images_data/d10-2-4.png" alt="Color Flip"/>
</li>
</list>

#### 10.2.3 Red-Black BST Operations

<warning>
<p>Most ops (e.g., search, floor, iteration, selection)
are the same as for elementary BST, but run faster because of better 
performance.</p>
</warning>

<procedure title="Case 1: Insert into a 2-node at the bottom | 
Insert into a tree with exactly 1 node">
<step>
<p>Do standard BST insert; color new link red.</p>
</step>
<step>
<p>If new red link is a right link, rotate left.</p>
</step>
</procedure>

<procedure title="Case 2: Insert into a 3-node at the bottom | 
Insert into a tree with exactly 2 nodes.">
<step>
    <p>Do standard BST insert; color new link red.</p>
</step>
<step>
    <p>Rotate to balance the 4-node (if needed).</p>
</step>
<step>
    <p>Flip colors to pass red link up one level.</p>
</step>
<step>
    <p>Rotate to make lean left (if needed).</p>
</step>
<step>
    <p>Repeat case 1 or case 2 up the tree (if needed).</p>
</step>
</procedure>

<img src="../images_data/d10-2-5.png" alt="Insert into a 3-node 
at the bottom"/>

<procedure title="Insertion for Red-Black BSTs" type="choices">
<step>
    <p>Right child red, left child black: <format color="OrangeRed">rotate 
    left</format>.</p>
</step>
<step>
    <p>Left child, left-left grandchild red: <format color="OrangeRed">
    rotate right</format>.</p>
</step>
<step>
    <p>Both children red: <format color="OrangeRed">flip colors</format>.
    </p>
</step>
</procedure>

#### 10.2.4 Red-Black BST Implementations

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.LinkedList;
import java.util.NoSuchElementException;
import java.util.Queue;
\/
public class RedBlackBST&lt;Key extends Comparable&lt;Key&gt;, Value&gt; {
\/
    private static final boolean RED = true;
    private static final boolean BLACK = false;
\/
    private Node root;
\/
    private class Node {
        private Key key;
        private Value val;
        private Node left, right;
        private boolean color;
        private int size;
\/
        public Node(Key key, Value val, boolean color, int size) {
            this.key = key;
            this.val = val;
            this.color=color;
            this.size = size;
        }
    }
\/
    public RedBlackBST() {
    }
\/
    private boolean isRed(Node x) {
        if (x == null) return false;
        return x.color == RED;
    }
\/
    private int size(Node x) {
        if (x == null) return 0;
        return x.size;
    }
\/
    public int size() {
        return size(root);
    }
\/
    public boolean isEmpty() {
        return root == null;
    }
\/
    public Value get(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to get() is null");
        return get(root, key);
    }
\/
    private Value get(Node x, Key key) {
        while (x != null) {
            int cmp = key.compareTo(x.key);
            if (cmp &lt; 0) x = x.left;
            else if (cmp &gt; 0) x = x.right;
            else return x.val;
        }
        return null;
    }
\/
    public boolean contains(Key key) {
        return get(key) != null;
    }
\/
    public void put(Key key, Value val) {
        if (key == null) throw new IllegalArgumentException("first argument to put() is null");
        if (val == null) {
            delete(key);
            return;
        }
\/
        root = put(root, key, val);
        root.color=BLACK;
    }
\/
    private Node put(Node h, Key key, Value val) {
        if (h == null) return new Node(key, val, RED, 1);
\/
        int cmp = key.compareTo(h.key);
        if (cmp &lt; 0) h.left = put(h.left, key, val);
        else if (cmp &gt; 0) h.right = put(h.right, key, val);
        else h.val = val;
\/
        if (isRed(h.right) && !isRed(h.left)) h = rotateLeft(h);
        if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);
        if (isRed(h.left) && isRed(h.right)) flipColors(h);
        h.size = size(h.left) + size(h.right) + 1;
\/
        return h;
    }
\/
    public void deleteMin() {
        if (isEmpty()) throw new NoSuchElementException("BST underflow");
\/
        if (!isRed(root.left) && !isRed(root.right))
            root.color=RED;
\/
        root = deleteMin(root);
        if (!isEmpty()) root.color=BLACK;
    }
\/
    private Node deleteMin(Node h) {
        if (h.left == null)
            return null;
\/
        if (!isRed(h.left) && !isRed(h.left.left))
            h = moveRedLeft(h);
\/
        h.left = deleteMin(h.left);
        return balance(h);
    }
\/
    public void deleteMax() {
        if (isEmpty()) throw new NoSuchElementException("BST underflow");
\/
        if (!isRed(root.left) && !isRed(root.right))
            root.color=RED;
\/
        root = deleteMax(root);
        if (!isEmpty()) root.color=BLACK;
    }
\/
    private Node deleteMax(Node h) {
        if (isRed(h.left))
            h = rotateRight(h);
\/
        if (h.right == null)
            return null;
\/
        if (!isRed(h.right) && !isRed(h.right.left))
            h = moveRedRight(h);
\/
        h.right = deleteMax(h.right);
\/
        return balance(h);
    }
\/
    public void delete(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to delete() is null");
        if (!contains(key)) return;
\/
        if (!isRed(root.left) && !isRed(root.right))
            root.color=RED;
\/
        root = delete(root, key);
        if (!isEmpty()) root.color=BLACK;
    }
\/
    private Node delete(Node h, Key key) {
        if (key.compareTo(h.key) &lt; 0) {
            if (!isRed(h.left) && !isRed(h.left.left))
                h = moveRedLeft(h);
            h.left = delete(h.left, key);
        } else {
            if (isRed(h.left))
                h = rotateRight(h);
            if (key.compareTo(h.key) == 0 && (h.right == null))
                return null;
            if (!isRed(h.right) && !isRed(h.right.left))
                h = moveRedRight(h);
            if (key.compareTo(h.key) == 0) {
                Node x = min(h.right);
                h.key = x.key;
                h.val = x.val;
                h.right = deleteMin(h.right);
            } else h.right = delete(h.right, key);
        }
        return balance(h);
    }
\/
    private Node rotateRight(Node h) {
        assert (h != null) && isRed(h.left);
        Node x = h.left;
        h.left = x.right;
        x.right = h;
        x.color=h.color;
        h.color=RED;
        x.size = h.size;
        h.size = size(h.left) + size(h.right) + 1;
        return x;
    }
\/
    private Node rotateLeft(Node h) {
        assert (h != null) && isRed(h.right);
        Node x = h.right;
        h.right = x.left;
        x.left = h;
        x.color=h.color;
        h.color=RED;
        x.size = h.size;
        h.size = size(h.left) + size(h.right) + 1;
        return x;
    }
\/
    private void flipColors(Node h) {
        h.color=!h.color;
        h.left.color=!h.left.color;
        h.right.color=!h.right.color;
    }
\/
    private Node moveRedLeft(Node h) {
        flipColors(h);
        if (isRed(h.right.left)) {
            h.right = rotateRight(h.right);
            h = rotateLeft(h);
            flipColors(h);
        }
        return h;
    }
\/
    private Node moveRedRight(Node h) {
        flipColors(h);
        if (isRed(h.left.left)) {
            h = rotateRight(h);
            flipColors(h);
        }
        return h;
    }
\/
    private Node balance(Node h) {
        if (isRed(h.right) && !isRed(h.left)) h = rotateLeft(h);
        if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);
        if (isRed(h.left) && isRed(h.right)) flipColors(h);
\/
        h.size = size(h.left) + size(h.right) + 1;
        return h;
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
        if (cmp &gt; 0) return ceiling(x.right, key);
        Node t = ceiling(x.left, key);
        if (t != null) return t;
        else return x;
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
    private boolean check() {
        if (!isBST()) System.out.println("Not in symmetric order");
        if (!isSizeConsistent()) System.out.println("Subtree counts not consistent");
        if (!isRankConsistent()) System.out.println("Ranks not consistent");
        if (!is23()) System.out.println("Not a 2-3 tree");
        if (!isBalanced()) System.out.println("Not balanced");
        return isBST() && isSizeConsistent() && isRankConsistent() && is23() && isBalanced();
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
\/
    private boolean is23() {
        return is23(root);
    }
\/
    private boolean is23(Node x) {
        if (x == null) return true;
        if (isRed(x.right)) return false;
        if (x != root && isRed(x) && isRed(x.left))
            return false;
        return is23(x.left) && is23(x.right);
    }
\/
    private boolean isBalanced() {
        int black = 0;
        Node x = root;
        while (x != null) {
            if (!isRed(x)) black++;
            x = x.left;
        }
        return isBalanced(root, black);
    }
\/
    private boolean isBalanced(Node x, int black) {
        if (x == null) return black == 0;
        if (!isRed(x)) black--;
        return isBalanced(x.left, black) && isBalanced(x.right, black);
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#ifndef REDBLACKBST_H
#define REDBLACKBST_H
\/
#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;stdexcept&gt;
#include &lt;cassert&gt;
\/
template &lt;typename Key, typename Value&gt;
class RedBlackBST {
private:
    static constexpr bool RED = true;
    static constexpr bool BLACK = false;
\/
    struct Node {
        Key key;
        Value val;
        Node *left, *right;
        bool color;
        int size;
\/
        Node(const Key& key, const Value& val, bool color, int size) : 
            key(key), val(val), left(nullptr), right(nullptr), color(color), size(size) {}
    };
\/
    Node* root;
\/
    static bool isRed(Node* x) {
        if (x == nullptr) return false;
        return x-&gt;color == RED;
    }
\/
    static int size(Node* x) {
        if (x == nullptr) return 0;
        return x-&gt;size;
    }
\/
    Node* put(Node* h, const Key& key, const Value& val) {
        if (h == nullptr) return new Node(key, val, RED, 1);
\/
        if (key &lt; h-&gt;key) h-&gt;left = put(h-&gt;left, key, val);
        else if (key &gt; h-&gt;key) h-&gt;right = put(h-&gt;right, key, val);
        else h-&gt;val = val;
\/
        if (isRed(h-&gt;right) && !isRed(h-&gt;left)) h = rotateLeft(h);
        if (isRed(h-&gt;left) && isRed(h-&gt;left-&gt;left)) h = rotateRight(h);
        if (isRed(h-&gt;left) && isRed(h-&gt;right)) flipColors(h);
        h-&gt;size = size(h-&gt;left) + size(h-&gt;right) + 1;
\/
        return h;
    }
\/
    Node* deleteMin(Node* h) {
        if (h-&gt;left == nullptr)
            return nullptr;
\/
        if (!isRed(h-&gt;left) && !isRed(h-&gt;left-&gt;left))
            h = moveRedLeft(h);
\/
        h-&gt;left = deleteMin(h-&gt;left);
        return balance(h);
    }
\/
    Node* deleteMax(Node* h) {
        if (isRed(h-&gt;left))
            h = rotateRight(h);
\/
        if (h-&gt;right == nullptr)
            return nullptr;
\/
        if (!isRed(h-&gt;right) && !isRed(h-&gt;right-&gt;left))
            h = moveRedRight(h);
\/
        h-&gt;right = deleteMax(h-&gt;right);
\/
        return balance(h);
    }
\/
    Node* deleteNode(Node* h, const Key& key) {
        if (key &lt; h-&gt;key) {
            if (!isRed(h-&gt;left) && !isRed(h-&gt;left-&gt;left))
                h = moveRedLeft(h);
            h-&gt;left = deleteNode(h-&gt;left, key);
        } else {
            if (isRed(h-&gt;left))
                h = rotateRight(h);
            if (key == h-&gt;key && (h-&gt;right == nullptr))
                return nullptr;
            if (!isRed(h-&gt;right) && !isRed(h-&gt;right-&gt;left))
                h = moveRedRight(h);
            if (key == h-&gt;key) {
                Node* x = min(h-&gt;right);
                h-&gt;key = x-&gt;key;
                h-&gt;val = x-&gt;val;
                h-&gt;right = deleteMin(h-&gt;right);
            } else h-&gt;right = deleteNode(h-&gt;right, key);
        }
        return balance(h);
    }
\/
    Node* rotateRight(Node* h) {
        assert(h != nullptr && isRed(h-&gt;left));
        Node* x = h-&gt;left;
        h-&gt;left = x-&gt;right;
        x-&gt;right = h;
        x-&gt;color=h-&gt;color;
        h-&gt;color=RED;
        x-&gt;size = h-&gt;size;
        h-&gt;size = size(h-&gt;left) + size(h-&gt;right) + 1;
        return x;
    }
\/
    Node* rotateLeft(Node* h) {
        assert(h != nullptr && isRed(h-&gt;right));
        Node* x = h-&gt;right;
        h-&gt;right = x-&gt;left;
        x-&gt;left = h;
        x-&gt;color=h-&gt;color;
        h-&gt;color=RED;
        x-&gt;size = h-&gt;size;
        h-&gt;size = size(h-&gt;left) + size(h-&gt;right) + 1;
        return x;
    }
\/
    static void flipColors(Node* h) {
        h-&gt;color=!h-&gt;color;
        h-&gt;left-&gt;color=!h-&gt;left-&gt;color;
        h-&gt;right-&gt;color=!h-&gt;right-&gt;color;
    }
\/
    Node* moveRedLeft(Node* h) {
        flipColors(h);
        if (isRed(h-&gt;right-&gt;left)) {
            h-&gt;right = rotateRight(h-&gt;right);
            h = rotateLeft(h);
            flipColors(h);
        }
        return h;
    }
\/
    Node* moveRedRight(Node* h) {
        flipColors(h);
        if (isRed(h-&gt;left-&gt;left)) {
            h = rotateRight(h);
            flipColors(h);
        }
        return h;
    }
\/
    Node* balance(Node* h) {
        if (isRed(h-&gt;right) && !isRed(h-&gt;left)) h = rotateLeft(h);
        if (isRed(h-&gt;left) && isRed(h-&gt;left-&gt;left)) h = rotateRight(h);
        if (isRed(h-&gt;left) && isRed(h-&gt;right)) flipColors(h);
\/
        h-&gt;size = size(h-&gt;left) + size(h-&gt;right) + 1;
        return h;
    }
\/
    Node* min(Node* x) const {
        if (x-&gt;left == nullptr) return x;
        else return min(x-&gt;left);
    }
\/
    Node* max(Node* x) const {
        if (x-&gt;right == nullptr) return x;
        else return max(x-&gt;right);
    }
\/
    Node* floor(Node* x, const Key& key) const {
        if (x == nullptr) return nullptr;
        if (key == x-&gt;key) return x;
        if (key &lt; x-&gt;key) return floor(x-&gt;left, key);
        Node* t = floor(x-&gt;right, key);
        if (t != nullptr) return t;
        else return x;
    }
\/
    Node* ceiling(Node* x, const Key& key) const {
        if (x == nullptr) return nullptr;
        if (key == x-&gt;key) return x;
        if (key &gt; x-&gt;key) return ceiling(x-&gt;right, key);
        Node* t = ceiling(x-&gt;left, key);
        if (t != nullptr) return t;
        else return x;
    }
\/
    Key select(Node* x, const int rank) const {
        if (x == nullptr) return Key(); 
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
    RedBlackBST() : root(nullptr) {}
\/
    [[nodiscard]] int size() const {
        return size(root);
    }
\/
    [[nodiscard]] bool isEmpty() const {
        return root == nullptr;
    }
\/
    Value get(const Key& key) const {
        Node* x = root;
        while (x != nullptr) {
            if (key &lt; x-&gt;key) x = x-&gt;left;
            else if (key &gt; x-&gt;key) x = x-&gt;right;
            else return x-&gt;val;
        }
        return Value();
    }
\/
    bool contains(const Key& key) const {
        return get(key) != Value(); 
    }
\/
    void put(const Key& key, const Value& val) {
        root = put(root, key, val);
        root-&gt;color=BLACK;
    }
\/
    void deleteMin() {
        if (isEmpty()) throw std::runtime_error("BST underflow");
\/
        if (!isRed(root-&gt;left) && !isRed(root-&gt;right))
            root-&gt;color=RED;
\/
        root = deleteMin(root);
        if (!isEmpty()) root-&gt;color=BLACK;
    }
\/
    void deleteMax() {
        if (isEmpty()) throw std::runtime_error("BST underflow");
\/
        if (!isRed(root-&gt;left) && !isRed(root-&gt;right))
            root-&gt;color=RED;
\/
        root = deleteMax(root);
        if (!isEmpty()) root-&gt;color=BLACK;
    }
\/
    void deleteNode(const Key& key) {
        if (!contains(key)) return;
\/
        if (!isRed(root-&gt;left) && !isRed(root-&gt;right))
            root-&gt;color=RED;
\/
        root = deleteNode(root, key);
        if (!isEmpty()) root-&gt;color=BLACK;
    }
\/
    [[nodiscard]] int height() const {
        return height(root);
    }
\/
    Key min() const {
        if (isEmpty()) throw std::runtime_error("calls min() with empty symbol table");
        return min(root)-&gt;key;
    }
\/
    Key max() const {
        if (isEmpty()) throw std::runtime_error("calls max() with empty symbol table");
        return max(root)-&gt;key;
    }
\/
    Key floor(const Key& key) const {
        if (isEmpty()) throw std::runtime_error("calls floor() with empty symbol table");
        Node* x = floor(root, key);
        if (x == nullptr) throw std::runtime_error("argument to floor() is too small");
        else return x-&gt;key;
    }
\/
    Key ceiling(const Key& key) const {
        if (isEmpty()) throw std::runtime_error("calls ceiling() with empty symbol table");
        Node* x = ceiling(root, key);
        if (x == nullptr) throw std::runtime_error("argument to ceiling() is too large");
        else return x-&gt;key;
    }
\/
    Key select(int rank) const {
        if (rank &lt; 0 || rank &gt;= size()) {
            throw std::invalid_argument("argument to select() is invalid: " + std::to_string(rank));
        }
        return select(root, rank);
    }
\/
    int rank(const Key& key) const {
        return rank(key, root);
    }
\/
    std::queue&lt;Key&gt; keys() const {
        if (isEmpty()) return std::queue&lt;Key&gt;();
        return keys(min(), max());
    }
\/
    std::queue&lt;Key&gt; keys(const Key& lo, const Key& hi) const {
        if (isEmpty() || lo &gt; hi) return std::queue&lt;Key&gt;(); 
\/
        std::queue&lt;Key&gt; queue;
        keys(root, queue, lo, hi);
        return queue;
    }
\/
    int size(const Key& lo, const Key& hi) const {
        if (lo &gt; hi) return 0;
        if (contains(hi)) return rank(hi) - rank(lo) + 1;
        else return rank(hi) - rank(lo);
    }
};
\/
#endif // REDBLACKBST_H
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class Node:
    def __init__(self, key, val, color, size):
        self.key = key
        self.val = val
        self.left = None
        self.right = None
        self.color=color  # True for RED, False for BLACK
        self.size = size
\/
\/
class RedBlackBST:
    RED = True
    BLACK = False
\/
    def __init__(self):
        self.root = None
\/
    def is_red(self, x):
        if x is None:
            return False
        return x.color == RedBlackBST.RED
\/
    def size(self, x):
        if x is None:
            return 0
        return x.size
\/
    def __len__(self): 
        return self.size(self.root)
\/
    def is_empty(self):
        return self.root is None
\/
    def get(self, key):
        x = self.root
        while x is not None:
            if key &lt; x.key:
                x = x.left
            elif key &gt; x.key:
                x = x.right
            else:
                return x.val
        return None
\/
    def __contains__(self, key): 
        return self.get(key) is not None
\/
    def put(self, key, val):
        self.root = self._put(self.root, key, val)
        self.root.color=RedBlackBST.BLACK
\/
    def _put(self, h, key, val):
        if h is None:
            return Node(key, val, RedBlackBST.RED, 1)
\/
        if key &lt; h.key:
            h.left = self._put(h.left, key, val)
        elif key &gt; h.key:
            h.right = self._put(h.right, key, val)
        else:
            h.val = val
\/
        if self.is_red(h.right) and not self.is_red(h.left):
            h = self.rotate_left(h)
        if self.is_red(h.left) and self.is_red(h.left.left):
            h = self.rotate_right(h)
        if self.is_red(h.left) and self.is_red(h.right):
            self.flip_colors(h)
\/
        h.size = self.size(h.left) + self.size(h.right) + 1
        return h
\/
    def delete_min(self):
        if self.is_empty():
            raise Exception("BST underflow")
\/
        if not self.is_red(self.root.left) and not self.is_red(self.root.right):
            self.root.color=RedBlackBST.RED
\/
        self.root = self._delete_min(self.root)
        if not self.is_empty():
            self.root.color=RedBlackBST.BLACK
\/
    def _delete_min(self, h):
        if h.left is None:
            return None
\/
        if not self.is_red(h.left) and not self.is_red(h.left.left):
            h = self.move_red_left(h)
\/
        h.left = self._delete_min(h.left)
        return self.balance(h)
\/
    def delete_max(self):
        if self.is_empty():
            raise Exception("BST underflow")
\/
        if not self.is_red(self.root.left) and not self.is_red(self.root.right):
            self.root.color=RedBlackBST.RED
\/
        self.root = self._delete_max(self.root)
        if not self.is_empty():
            self.root.color=RedBlackBST.BLACK
\/
    def _delete_max(self, h):
        if self.is_red(h.left):
            h = self.rotate_right(h)
\/
        if h.right is None:
            return None
\/
        if not self.is_red(h.right) and not self.is_red(h.right.left):
            h = self.move_red_right(h)
\/
        h.right = self._delete_max(h.right)
        return self.balance(h)
\/
    def delete(self, key):
        if key is None:
            raise Exception("argument to delete() is null")
        if not self.__contains__(key):
            return
\/
        if not self.is_red(self.root.left) and not self.is_red(self.root.right):
            self.root.color=RedBlackBST.RED
\/
        self.root = self._delete(self.root, key)
        if not self.is_empty():
            self.root.color=RedBlackBST.BLACK
\/
    def _delete(self, h, key):
        if key &lt; h.key:
            if not self.is_red(h.left) and not self.is_red(h.left.left):
                h = self.move_red_left(h)
            h.left = self._delete(h.left, key)
        else:
            if self.is_red(h.left):
                h = self.rotate_right(h)
            if key == h.key and h.right is None:
                return None 
            if not self.is_red(h.right) and not self.is_red(h.right.left):
                h = self.move_red_right(h)
            if key == h.key:
                if h.right is not None: 
                    x = self._min(h.right) 
                    h.key = x.key
                    h.val = x.val
                    h.right = self._delete_min(h.right) 
                else:  
                    return h.left  
            else:
                h.right = self._delete(h.right, key)
\/
        return self.balance(h)
\/
    def rotate_right(self, h):
        assert h is not None and self.is_red(h.left)
        x = h.left
        h.left = x.right
        x.right = h
        x.color=h.color
        h.color=RedBlackBST.RED
        x.size = h.size
        h.size = self.size(h.left) + self.size(h.right) + 1
        return x
\/
    def rotate_left(self, h):
        assert h is not None and self.is_red(h.right)
        x = h.right
        h.right = x.left
        x.left = h
        x.color=h.color
        h.color=RedBlackBST.RED
        x.size = h.size
        h.size = self.size(h.left) + self.size(h.right) + 1
        return x
\/
    def flip_colors(self, h):
        assert h is not None and h.left is not None and h.right is not None
        h.color=not h.color
        h.left.color=not h.left.color
        h.right.color=not h.right.color
\/
    def move_red_left(self, h):
        self.flip_colors(h)
        if self.is_red(h.right.left):
            h.right = self.rotate_right(h.right)
            h = self.rotate_left(h)
            self.flip_colors(h)
        return h
\/
    def move_red_right(self, h):
        self.flip_colors(h)
        if self.is_red(h.left.left):
            h = self.rotate_right(h)
            self.flip_colors(h)
        return h
\/
    def balance(self, h):
        if self.is_red(h.right) and not self.is_red(h.left):
            h = self.rotate_left(h)
        if self.is_red(h.left) and self.is_red(h.left.left):
            h = self.rotate_right(h)
        if self.is_red(h.left) and self.is_red(h.right):
            self.flip_colors(h)
\/
        h.size = self.size(h.left) + self.size(h.right) + 1
        return h
\/
    def height(self):
        return self._height(self.root)
\/
    def _height(self, x):
        if x is None:
            return -1
        return 1 + max(self._height(x.left), self._height(x.right))
\/
    def min(self):
        if self.is_empty():
            raise Exception("calls min() with empty symbol table")
        return self._min(self.root).key
\/
    def _min(self, x):
        if x.left is None:
            return x
        else:
            return self._min(x.left)
\/
    def max(self):
        if self.is_empty():
            raise Exception("calls max() with empty symbol table")
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
            raise Exception("argument to floor() is null")
        if self.is_empty():
            raise Exception("calls floor() with empty symbol table")
        x = self._floor(self.root, key)
        if x is None:
            raise Exception("argument to floor() is too small")
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
    def ceiling(self, key):
        if key is None:
            raise Exception("argument to ceiling() is null")
        if self.is_empty():
            raise Exception("calls ceiling() with empty symbol table")
        x = self._ceiling(self.root, key)
        if x is None:
            raise Exception("argument to ceiling() is too large")
        else:
            return x.key
\/
    def _ceiling(self, x, key):
        if x is None:
            return None
        if key == x.key:
            return x
        if key &gt; x.key:
            return self._ceiling(x.right, key)
        t = self._ceiling(x.left, key)
        if t is not None:
            return t
        else:
            return x
\/
    def select(self, rank):
        if rank &lt; 0 or rank &gt;= len(self):
            raise Exception("argument to select() is invalid: " + str(rank))
        return self._select(self.root, rank).key
\/
    def _select(self, x, rank):
        if x is None:
            return None
        left_size = self.size(x.left)
        if left_size &gt; rank:
            return self._select(x.left, rank)
        elif left_size &lt; rank:
            return self._select(x.right, rank - left_size - 1)
        else:
            return x
\/
    def rank(self, key):
        if key is None:
            raise Exception("argument to rank() is null")
        return self._rank(key, self.root)
\/
    def _rank(self, key, x):
        if x is None:
            return 0
        if key &lt; x.key:
            return self._rank(key, x.left)
        elif key &gt; x.key:
            return 1 + self.size(x.left) + self._rank(key, x.right)
        else:
            return self.size(x.left)
\/
    def keys(self):
        if self.is_empty():
            return []
        return self.keys_in_range(self.min(), self.max())
\/
    def keys_in_range(self, lo, hi):
        if lo is None:
            raise Exception("first argument to keys() is null")
        if hi is None:
            raise Exception("second argument to keys() is null")
\/
        queue = []
        self._keys_in_range(self.root, queue, lo, hi)
        return queue
\/
    def _keys_in_range(self, x, queue, lo, hi):
        if x is None:
            return
        if lo &lt; x.key:
            self._keys_in_range(x.left, queue, lo, hi)
        if lo &lt;= x.key &lt;= hi:
            queue.append(x.key)
        if hi &gt; x.key:
            self._keys_in_range(x.right, queue, lo, hi)
\/
    def size_in_range(self, lo, hi):
        if lo is None:
            raise Exception("first argument to size() is null")
        if hi is None:
            raise Exception("second argument to size() is null")
\/
        if lo &gt; hi:
            return 0
        if self.__contains__(hi):
            return self.rank(hi) - self.rank(lo) + 1
        else:
            return self.rank(hi) - self.rank(lo)
    </code-block>
    </tab>
</tabs>

#### 10.2.5 Red-Black BST Properties and Applications

<p><format color="BlueViolet">Properties</format></p>

<list type="alpha-lower">
<li>
    <p>Height of tree is <math>\leq 2 \lg N</math> in the worst case.</p>
    <p><format color="LawnGreen">Proof:</format> Every path from root to 
    null link has same number of black links. Never two red links in-a-row
    .</p>
</li>
<li>
    <p>Height of tree is <math>\sim 1.00 \lg N</math> in typical
    applications.</p>
</li>
</list>

<p><format color="BlueViolet">Applications:</format> Red-black trees are
widely used as system symbol tables.</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Java:</format> java.util.TreeMap, 
    java.util.TreeSet</p>
</li>
<li>
    <p><format color="Fuchsia">C++ STL:</format> map, multimap, multiset
    </p>
</li>
<li>
    <p><format color="Fuchsia">Linux kernel:</format> completely fair 
    scheduler, linux/rbtree.h</p>
</li>
<li>
    <p><format color="Fuchsia">Emacs:</format> conservative stack 
    scanning</p>
</li>
</list>

### 10.3 B-Trees

<list type="decimal">
<li>
<p>Background Information:</p>

<list type="bullet">
<li>
<p><format color="BlueViolet">Page</format>: Continuous block of
data (e.g., a file or 4,096-byte chunk).</p>
</li>
<li>
<p><format color="BlueViolet">Probe</format>: First access to a 
page (e.g., from disk to memory).</p>
</li>
<li>
<p><format color="BlueViolet">Property</format>: Time required for
a probe is much higher than time to access data within a page.</p>
</li>
<li>
<p><format color="BlueViolet">Goal</format>: Access data using
minimum number of probes.</p>
</li>
</list>
</li>
<li>
<p>Definition:</p>

<p><format color="BlueViolet">B-tree (Bayer-McCreight, 1972)</format>: 
Generalize 2-3 trees by allowing up to <math>M - 1</math> key-link
pairs per node.</p>
<list type="bullet">
<li>
<p>At least 2 key-link pairs at root.</p>
</li>
<li>
<p>At least <math>\frac {M}{2}</math> key-link pairs in other 
nodes.</p>
</li>
<li>
<p>External nodes contain client keys.</p>
</li>
<li>
<p>Internal nodes contain copies of keys to guide search.</p>
</li>
</list>
<img src="../images_data/d10-3-1.png" alt="B-Tree"/>
</li>
<li>
<p>Property: </p>

<p>A search or an insertion in a B-tree of order 
<math>M</math> with <math>N</math> keys requires between 
<math>log_{M-1} N</math> and <math>log_{M/2} N</math> probes.</p>

<p><format color="BlueViolet">Proof</format>: All internal nodes 
(besides root) have between <math>\frac {M}{2}</math> and 
<math>M - 1</math> links.</p>

<p><format color="BlueViolet">In practice</format>: Number of 
probes is at most 4.</p>

<p><format color="BlueViolet">Optimization</format>: Always keep 
page root in memory.</p>
</li>
<li>
<p>Applications:</p>

<p>B-trees (and variants B+ Tree, B <sup>*</sup> Tree, B# Tree) are 
widely used for file systems and databases.</p>

<list>
<li>
<p><format color="BlueViolet">Windows</format>: NTFS.</p>
</li>
<li>
<p><format color="BlueViolet">Mac</format>: HFS, HFS+.</p>
</li>
<li>
<p><format color="BlueViolet">Linux</format>: ReiserFS, XFS, Ext3FS, 
JFS.</p>
</li>
<li>
<p><format color="BlueViolet">Databases</format>: ORACLE, DB2, 
INGRES, SQL, PostgreSQL.</p>
</li>
</list>
</li>
</list>

<procedure title="Search in B-Tree">
    <step>
        <p>Start at root.</p>
    </step>
    <step>
        <p>Find interval containing search key.</p>
    </step>
    <step>
        <p>Follow associated link (recursively).</p>
    </step>
<img src="../images_data/d10-3-2.png" alt = "Search in B-Tree"/>
</procedure>

<procedure title="Insert in B-Tree">
    <step>
        <p>Search for new key.</p>
    </step>
    <step>
        <p>Insert at bottom.</p>
    </step>
    <step>
        <p>Split nodes with <math>M</math> key-link pairs on the way up
        the tree.</p>
    </step>
<img src="../images_data/d10-3-3.png" alt = "Insert in B-Tree"/>
</procedure>

### 10.4 AVL Trees

<p>AVL trees maintain <format style="bold">height-balance</format> 
(also called the <format style="bold">AVL Property</format>).</p>

<list type="alpha-lower">
<li>
<p><format color="DarkOrange">Skew of a node:</format> The height of
of its right subtree minus that of its left subtree.</p>

<p>A node is height-blanced if <math>\text {skew} \in \{-1, 0, 1\}
</math>.</p>

<p><format color="BlueViolet">Property:</format> A binary tree 
with height-balanced nodes has height <math>h = O(\log n)</math>.</p>

<p><format color="LawnGreen">Proof</format></p>

<code-block lang="tex">
\begin{align}
F(0) = 1, F(1) = 2, F(h) &= 1 + F(h - 1) + F(h - 2) \\
&\geq 2F(h - 2) \\
F(h) \geq 2 ^ {\frac {h}{2}}
\end{align}
</code-block>
</li>
<li>
<p>Suppose adding or removing leaf from a height-balanced tree results
in imbalance, skews still have magnitude <math>\leq 2</math>.</p>

<p><format color="Fuchsia">Case 1:</format> skew of F is 0 
or <format color="Fuchsia">Case 2:</format> skew of F is 1
</p>
<p>=> Perform a left rotation on B.</p>
<img src="../images_data/d10-4-1.png" alt = "Balancing AVL Trees"/>

<p><format color="Fuchsia">Case 3:</format> skew of F is −1
</p>
<p>Perform a right rotation on F, then a left rotation on B</p>
<img src="../images_data/d10-4-2.png" alt = "Balancing AVL Trees"/>
</li>
</list>

## 11 Geometric Applications of BSTs

<p><format color="BlueViolet">Topic</format>: Intersections among 
<format color="OrangeRed">geometric objects</format>.</p>

<p><format color="BlueViolet">Applications</format>: CAD, games, 
movies, virtual reality, databases...</p>

### 11.1 1d Range Search

<list type="bullet">
<li>
<p><format color="DarkOrange">Range search</format>: find all key between
<math>k_{1}</math> and <math>k_{2}</math>.</p>
</li>
<li>
<p><format color="DarkOrange">Range count</format>: # of keys between
<math>k_{1}</math> and <math>k_{2}</math>.</p>
</li>
<li>Geometric interpretation: Keys are point on a 
<format color="OrangeRed">line</format>; find/count points in a given 
<format color="OrangeRed">1d interval</format>.</li>
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

<p><format color="BlueViolet">Property</format>: Running
time proportinal to <math>R + \ log N</math></p>

### 11.2 Line Segment Intersection

<p><format color="IndianRed">Goal</format>: Given <math>N</math> 
horizontal and vertical line segments, find all intersections 
(all <math>x</math>- and <math>y</math>-coordinates are distinct.</p>

<procedure title = "Sweep-Line Algorithm =&gt; Sweep Vertical Lines 
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

<img src="../images_data/d11-2-1.png" alt = "Line Segment 
Intersection"/>

<p><format color="LawnGreen">Properties</format>: The sweep-line 
algorithm takes time proportional to <math>N \log N + R</math> to 
find all <math>R</math> intersections among <math>N</math> 
orthogonal line segments.</p>

<p>Proof: </p>
<list type="bullet">
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

<p><format color="MediumVioletRed">Goal</format>: 2d orthogonal range search.</p>

<p><format color="MediumVioletRed">Geometric interpretation</format>: 
Keys are point in the <format color="OrangeRed">plane</format>;
find/count points in a given <format color="OrangeRed">
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

<p><format color="BlueViolet">Properties: </format></p>

<list type="bullet">
<li>
<p>Space: <math>M ^ {2} + N</math></p>
</li>
<li>
<p>Time: <math>1 + \frac {N}{M ^ {2}}</math> per square examined,
on average.</p>
</li>
</list>

<p><format color="BlueViolet">Problems: </format></p>
<list type="bullet">
<li>
<p><format color="OrangeRed">Clustering</format>: a well-known 
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

<p><format color="DarkOrange">Space-Partitioning Trees:</format> Use 
a tree to represent a recursive subdivision of a 2d space.</p>

<p><format color="DarkOrange">2d Trees:</format> Recursively divide
space into two halfplanes.</p>

<p><format color="BlueViolet">Applications:</format> Ray tracing,
2d range search, Flight simulators, N-body simulation, Nearest
neighbor search, Accelerate rendering in Doom, etc.</p>

##### Part &#8544; 2d Trees

<p><format color="BlueViolet">Data Structure:</format> BST, but 
alternate using <math>x</math>- and <math>y</math>- coordinates as 
key.</p>

<list type="bullet">
<li>
<p>Search gives rectangle containing point.</p>
</li>
<li>
<p>Insert further subdivides the plane.</p>
</li>
</list>

<img src="../images_data/d11-2-2.png" alt = "2d tree implementation"/>

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

<p><format color="BlueViolet">Properties: </format></p>

<list type="bullet">
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

<p><format color="BlueViolet">Properties: </format></p>

<list type="bullet">
<li>
<p>Typical case: <math>\log N</math></p>
</li>
<li>
<p>Worst case (even if tree is balanced): <math>N</math></p>
</li>
</list>

##### Part &#8545; Kd Trees

<p><format color="DarkOrange">Kd Tree:</format> Recursively 
partition <math>k</math>-dimensional space into 2 halfspaces.</p>

<p><format color="BlueViolet">Implementation:</format> BST, but
cycle through dimensions ala 2d trees.</p>

##### Part &#8546; N-body Simulation

<format color="BlueViolet">Goal:</format> Simulate the motion 
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

<p><format color="BlueViolet">Properties:</format> Running time
per step is <math>N \log N</math>.</p>

### 11.4 Interval Search Tree

<p>Create BST, where each node stores an interval <math>(lo, hi)
</math>.</p>

<list type="bullet">
<li>
<p>Use left endpoint as BST <format color="OrangeRed">key</format>
.</p>
</li>
<li>
<p>Store <format color="BlueViolet">max endpoint</format> in 
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
type="choices">
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

<table style="header-row">
<tr>
    <td>operation</td>
    <td>brute</td>
    <td>interval search tree</td>
    <td>best in theory</td>
</tr>
<tr>
    <td>insert interval</td>
    <td><math>1</math></td>
    <td><math>\log N</math></td>
    <td><math>\log N</math></td>
</tr>
<tr>
    <td>find interval</td>
    <td><math>N</math></td>
    <td><math>\log N</math></td>
    <td><math>\log N</math></td>
</tr>
<tr>
    <td>delete interval</td>
    <td><math>N</math></td>
    <td><math>\log N</math></td>
    <td><math>\log N</math></td>
</tr>
<tr>
    <td>find <format color="OrangeRed">any one</format> interval
    that intersects <math>(lo, hi)</math></td>
    <td><math>N</math></td>
    <td><math>\log N</math></td>
    <td><math>\log N</math></td>
</tr>
<tr>
    <td>find <format color="OrangeRed">all</format> interval
    that intersects <math>(lo, hi)</math></td>
    <td><math>N</math></td>
    <td><math>R \log N</math></td>
    <td><math>R + \log N</math></td>
</tr>
</table>

### 11.5 Rectangle Intersection

<p><format color="BlueViolet">Sweep-line Algorithm</format></p>

<list type="bullet">
<li>
    <p><math>x</math>-coordinates of left and right endpoints define 
    events.</p>
</li>
<li>
    <p>Maintain set of rectangles that intersect the sweep line in an 
    interval search tree (using <math>y</math>-intervals of rectangle).
    </p>
</li>
<li>
    <p><format color="Fuchsia">Left endpoint:</format> interval search for
    <math>y</math>-interval of rectangle; insert <math>y</math>-interval.
    </p>
</li>
<li>
    <p><format color="Fuchsia">Right endpoint:</format> remove <math>y
    </math>-interval.</p>
</li>
</list>

<p><format color="BlueViolet">Property:</format> Sweep line 
algorithm takes time proportional to <math>N \log N + R \log N</math> 
to find <math>R</math> intersections among a set of <math>N</math> 
rectangles.</p>

<p><format color="LawnGreen">Proof</format></p>

<list type="bullet">
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

<table style="none">
<tr>
    <td rowspan = "2">Implementation</td>
    <td colspan="3">Worst-Case Cost (after <math>N</math> inserts)
    </td>
    <td colspan = "3">Average Case (after <math>N</math> random 
    inserts)</td>
    <td rowspan = "2">Ordered Iteration?</td>
    <td rowspan = "2">Key Interface</td>
</tr>
<tr>
    <td>Search</td>
    <td>Insert</td>
    <td>Delete</td>
    <td>Search Hit</td>
    <td>Insert</td>
    <td>Delete</td>
</tr>
<tr>
    <td><a anchor="sequential-search" summary="Sequential Search (unordered list)">
    Sequential Search (unordered list)</a></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>\frac {N}{2}</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td>no</td>
    <td><code>equals()</code></td>
</tr>
<tr>
    <td><a anchor="ordered-array" summary="Binary Search (ordered array)">
    Binary Search (ordered list)</a></td>
    <td><math>\lg N</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>\lg N</math></td>
    <td><math>\frac {N}{2}</math></td>
    <td><math>\frac {N}{2}</math></td>
    <td>yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a anchor="BST" summary="Binary Search Tree">BST</a></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>N</math></td>
    <td><math>1.39 \log N</math></td>
    <td><math>1.39 \log N</math></td>
    <td>?</td>
    <td>yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a anchor="2-3-trees" summary="2-3 Tree">2-3 Tree</a></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td><math>c \log N</math></td>
    <td>yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a anchor="red-black-bsts" summary="Red-Black BST">
    Red-Black BST</a></td>
    <td><math>2 \log N</math></td>
    <td><math>2 \log N</math></td>
    <td><math>2 \log N</math></td>
    <td><math>1.00 \lg N</math></td>
    <td><math>1.00 \lg N</math></td>
    <td><math>1.00 \lg N</math></td>
    <td>yes</td>
    <td><code>compareTo()</code></td>
</tr>
<tr>
    <td><a anchor="separate-chaining" summary="Separate Chaining">
    Separate Chaining</a></td>
    <td><math>\log N</math></td>
    <td><math>\log N</math></td>
    <td><math>\log N</math></td>
    <td><math>3-5</math></td>
    <td><math>3-5</math></td>
    <td><math>3-5</math></td>
    <td>no</td>
    <td><code>equals</code><code>hashCode()</code></td>
</tr>
<tr>
    <td><a anchor="linear-probing" summary="Linear Probing">Linear 
    Probing</a></td>
    <td><math>\log N</math></td>
    <td><math>\log N</math></td>
    <td><math>\log N</math></td>
    <td><math>3-5</math></td>
    <td><math>3-5</math></td>
    <td><math>3-5</math></td>
    <td>no</td>
    <td><code>equals</code><code>hashCode()</code></td>
 </tr>
</table>

### 12.1 Hash Tables

<p><format color="BlueViolet">Definitions</format></p>

<list type="decimal">
<li>
<p><format color="OrangeRed">Hashing</format>: Save items in a 
key-indexed table (index is a function of the key).</p>
</li>
<li>
<p><format color="OrangeRed">Hash function</format>: Method for 
computing array index from key.</p>
<p>Issues:</p>
    <list type="alpha-lower">
    <li>
    <p><format color="Fuchsia">Equality test</format>: Method 
    for checking whether two keys are equal.</p>
    </li>
    <li>
    <p><format color="Fuchsia">Collision resolution</format>: 
    Algorithm and data structure to handle two keys that hash to the 
    same array index.</p>
    </li>
    </list>
</li>
<li>
<p><format color="OrangeRed">Hash code</format>: An int between 
<math>-2^31</math> and <math>2^31-1</math>.</p>
</li>
<li>
<p><format color="OrangeRed">Hash function</format>: An int 
between 0 and M-1 (for use of array index).</p>
</li>
</list>

<note>
<p>This is Horner's method to hash strings.</p>
</note>

<code-block lang="java" collapsible="true">
public final class StringTest {
    private final char[] s = "Hello, World!".toCharArray();
\/    
    public int hash() {
        int hash = 0;
        for (int i = 0; i &lt; s.length; i++) {
            hash = (31 * hash) + s[i];
        }
        return hash;
    }
}
</code-block>

### 12.2 Collision Solution &#8544; - Separate Chaining & Variant

#### 12.2.1 Separate Chaining {id="separate-chaining"}

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">Hash:</format> map key to integer
    <math>i</math> between <math>0</math> and <math>M - 1</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Insert:</format> put at front of
    <math>i ^ {\text{th}}</math> chain (if not already there).</p>
</li>
<li>
    <p><format color="Fuchsia">Search:</format> need to search 
    only <math>i ^ {\text{th}}</math> chain.</p>
</li>
</list>

<img src="../images_data/d12-2-1.png" alt = "Separate Chaining"/>

<p><format color="BlueViolet">Properties</format></p>

<list type="bullet">
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

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class SeparateChainingHashST {
    private final int M = 97; // number of chains
    private final Node[] st = new Node[M]; // array of chains
\/
    private static class Node {
        private final Object key;
        private Object val;
        private final Node next;
\/
        public Node(Object key, Object val, Node node) {
            this.key = key;
            this.val = val;
            this.next = node;
        }
    }
\/
    private int hash(Object key) {
        return (key.hashCode() & 0x7fffffff) % M;  // no bug
    }
\/
    public Object get(Object key) {
        int i = hash(key);
        for (Node x = st[i]; x != null; x = x.next)
            if (key.equals(x.key)) return x.val;
        return null;
    }
\/
    public void put(Object key, Object val) {
        int i = hash(key);
        for (Node x = st[i]; x != null; x = x.next)
            if (key.equals(x.key)) { x.val = val; return; }
        st[i] = new Node(key, val, st[i]);
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;list&gt;
#include &lt;vector&gt;
#include &lt;optional&gt;
\/
template&lt;typename Key, typename Value&gt;
class HashTable {
public:
    explicit HashTable(size_t size) : table(size) {}
\/
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
\/
    std::optional&lt;Value&gt; get(Key key) {
        size_t hashValue = hashFunction(key);
        auto& chain = table[hashValue];
        for (auto& pair : chain) {
            if (pair.first == key) {
                return pair.second;
            }
        }
        return {};
    }
\/
    void remove(Key key) {
        size_t hashValue = hashFunction(key);
        auto& chain = table[hashValue];
        chain.remove_if([key](auto pair) { return pair.first == key; });
    }
\/
private:
    std::vector&lt;std::list&lt;std::pair&lt;Key, Value&gt;&gt;&gt; table;
\/
    size_t hashFunction(Key key) {
        return key % table.size();
    }
};
    </code-block>
    </tab>
</tabs>

#### 12.2.2 Variant - Two-Probe Hashing

<list type="bullet">
<li>
    <p>Hash to two positions, insert key in shorter of the two chains.
    </p>
</li>
<li>
    <p>Reduces expected length of the longest chain to <math>\log \log N
    </math>.</p>
</li>
</list>

### 12.3 Collision Solution &#8545; - Open Addressing

#### 12.3.1 Linear Probing {id="linear-probing"}

<p><format color="DarkOrange">Open addressing:</format> When a new
key collides, find next empty slot, and put it there.</p>

<list type="alpha-lower">
<li>
<p><format color="Fuchsia">Hash:</format> Map key to integer 
<math>i</math> between <math>0</math> and <math>M - 1</math>.</p>
</li>
<li>
<p><format color="Fuchsia">Search:</format> Search table 
index <math>i</math>; if occupied but no match, try <math>i+1</math>,
<math>i+2</math>, etc..</p>
</li>
<li>
<p><format color="Fuchsia">Insert:</format> Put at table
index <math>i</math> if free; if not try <math>i+1</math>, <math>i+2
</math>, etc.</p>
</li>
</list>

<p>Under uniform hashing assumption, the average numbers of probes in
a linear probing hash table of size M that contains <math>N = \alpha M
</math> keys is:</p>

<list type="bullet">
<li>
<p><format color="Fuchsia">Search hit:</format> <math>\sim
\frac{1}{2} \left(1 + \frac{1}{1 - \alpha}\right)</math></p>
</li>
<li>
<p><format color="Fuchsia">Search miss / insert:</format> 
<math>\sim \frac{1}{2} \left(1 + \frac{1}{(1 - \alpha)^2}\right)
</math></p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
public class LinearProbingHashST&lt;Key, Value&gt; {
    private final int M = 30001;
    private final Key[] keys = (Key[]) new Object[M];
    private final Value[] vals = (Value[]) new Object[M];
\/
    /* Map key to integer i between 0 and M - 1. */
    private int hash(Key key) {
        return (key.hashCode() & 0x7fffffff) % M;
    }
\/
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
\/
    /* Search table index i; if occupied but not match, try i+1, i+2, etc. */
    public Value get(Key key) {
        for (int i = hash(key); keys[i] != null; i = (i + 1) % M)
            if (keys[i].equals(key))
                return vals[i];
        return null;
    }
}
    </code-block>
    </tab>
    <tab title="Java (Princeton)">
    <code-block lang="java" collapsible="true">
public class LinearProbingHashST&lt;Key, Value&gt; {
\/
    // must be a power of 2
    private static final int INIT_CAPACITY = 4;
\/
    private int n;           // number of key-value pairs in the symbol table
    private int m;           // size of linear probing table
    private Key[] keys;      // the keys
    private Value[] vals;    // the values
\/
\/
    public LinearProbingHashST() {
        this(INIT_CAPACITY);
    }
\/
    public LinearProbingHashST(int capacity) {
        m = capacity;
        n = 0;
        keys = (Key[]) new Object[m];
        vals = (Value[]) new Object[m];
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
    // hash function for keys - returns value between 0 and m-1
    private int hashTextbook(Key key) {
        return (key.hashCode() & 0x7fffffff) % m;
    }
\/
    // hash function for keys - returns value between 0 and m-1 (assumes m is a power of 2)
    // (from Java 7 implementation, protects against poor quality hashCode() implementations)
    private int hash(Key key) {
        int h = key.hashCode();
        h ^= (h &gt;&gt;&gt; 20) ^ (h &gt;&gt;&gt; 12) ^ (h &gt;&gt;&gt; 7) ^ (h &gt;&gt;&gt; 4);
        return h & (m - 1);
    }
\/
    // resizes the hash table to the given capacity by re-hashing all of the keys
    private void resize(int capacity) {
        LinearProbingHashST&lt;Key, Value&gt; temp = new LinearProbingHashST&lt;Key, Value&gt;(capacity);
        for (int i = 0; i &lt; m; i++) {
            if (keys[i] != null) {
                temp.put(keys[i], vals[i]);
            }
        }
        keys = temp.keys;
        vals = temp.vals;
        m = temp.m;
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
        // double table size if 50% full
        if (n &gt;= m / 2) resize(2 * m);
\/
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
\/
    // Returns the value associated with the specified key.
    public Value get(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to get() is null");
        for (int i = hash(key); keys[i] != null; i = (i + 1) % m)
            if (keys[i].equals(key))
                return vals[i];
        return null;
    }
\/
    public void delete(Key key) {
        if (key == null) throw new IllegalArgumentException("argument to delete() is null");
        if (!contains(key)) return;
\/
        // find position i of key
        int i = hash(key);
        while (!key.equals(keys[i])) {
            i = (i + 1) % m;
        }
\/
        // delete key and associated value
        keys[i] = null;
        vals[i] = null;
\/
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
\/
        n--;
\/
        // halves size of array if it's 12.5% full or less
        if (n &gt; 0 && n &lt;= m / 8) resize(m / 2);
\/
        assert check();
    }
\/
    private boolean check() {
\/
        if (m &lt; 2 * n) {
            System.err.println("Hash table size m = " + m + "; array size n = " + n);
            return false;
        }
\/
        for (int i = 0; i &lt; m; i++) {
            if (keys[i] == null) continue;
            else if (get(keys[i]) != vals[i]) {
                System.err.println("get[" + keys[i] + "] = " + get(keys[i]) + "; vals[i] = " + vals[i]);
                return false;
            }
        }
        return true;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;vector&gt;
#include &lt;optional&gt;
\/
template&lt;typename Key, typename Value&gt;
struct HashNode {
    Key key;
    Value value;
    bool occupied;
\/
    HashNode() : occupied(false) {}
    HashNode(Key key, Value value) : key(key), value(value), occupied(true) {}
};
\/
template&lt;typename Key, typename Value&gt;
class HashTable {
private:
    std::vector&lt;HashNode&lt;Key, Value&gt;&gt; table;
    int tableSize;
\/
    int hashFunction(Key key) {
        return key % tableSize;
    }
\/
public:
    HashTable(int size) : table(size), tableSize(size) {}
\/
    void insert(Key key, Value value) {
        int index = hashFunction(key);
        while (table[index].occupied) {
            index = (index + 1) % tableSize;
        }
        table[index] = HashNode&lt;Key, Value&gt;(key, value);
    }
\/
    std::optional&lt;Value&gt; get(Key key) {
        int index = hashFunction(key);
        while (table[index].occupied) {
            if (table[index].key == key) {
                return table[index].value;
            }
            index = (index + 1) % tableSize;
        }
        return {};
    }
\/
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
    </code-block>
    </tab>
</tabs>

<p><format color="BlueViolet">Knuth's Parking Problem</format></p>

<p>Cars arrive at a one-way street with <math>M</math> parking spaces. 
Each driver tries to park in their own space <math>i</math>: If space
<math>i</math> is taken, try <math>i + 1</math>, <math>i + 2</math>, 
etc. What is the mean displacement of the car?</p>

<list type="bullet">
<li>
<p><format color="Fuchsia">Half-full:</format> With 
<math>\frac {M}{2}</math> cars, mean displacement is <math>
\sim \frac {3}{2}</math>.</p>
</li>
<li>
<p><format color="Fuchsia">Full:</format> With 
<math>M</math> cars, mean displacement is <math>\sim \sqrt{\frac
{\pi M}{8}}</math>.</p>
</li>
</list>

#### 12.3.2 Varaint 1 - Double Hashing

<list type="bullet">
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

<p><format color="Fuchsia">Insert:</format> Use the <math>
1 ^{st}</math> hash function to calculate index. If there is a 
collision, use <math>2 ^ {nd}</math> hash value for "step size" for
probing until an empty slot is found. (=> <math>(h1(key) + i * h2(key))
\% size</math>) </p>

#### 12.3.3 Variant 2 - Quadratic Probing

<p><format color="Fuchsia">Insert:</format> Use the hash 
function to calculate index. If there is a collision, probe the 
index using the following probing sequence: </p>

<list type="bullet">
<li>
<p><format color="DarkOrange">index 1:</format> 
<math>(h(key) + 1 ^ {2}) % tableSize</math></p>
</li>
<li>
<p><format color="DarkOrange">index 2:</format> 
<math>(h(key) + 2 ^ {2}) % tableSize</math></p>
</li>
<li>
<p><format color="DarkOrange">index 3:</format> 
<math>(h(key) + 3 ^ {2}) % tableSize</math></p>
</li>
</list>

#### 12.3.4 Variant 3 - Cuckoo Hashing

<list type="bullet">
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

<p><format color="BlueViolet">Separate Chaining</format></p>

<list type="bullet">
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

<p><format color="BlueViolet">Linear Probing</format></p>

<list type="bullet">
<li>
<p>Less wasted space.</p>
</li>
<li>
<p>Better cache performance.</p>
</li>
</list>

### 12.4 Hash Table vs. Balanced Search Tree

<p><format color="BlueViolet">Hash Table</format></p>

<list type="bullet">
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

<p><format color="BlueViolet">Balanced Search Tree</format></p>

<list type="bullet">  
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

<list type="bullet">
<li>
<p><format color="DarkOrange">Red-black BSTs:</format> 
<code>java.util.TreeMap</code>, <code>java.util.TreeSet</code>.</p>
</li>
<li>
<p><format color="DarkOrange">Hash tables:</format> 
<code>java.util.HashMap</code>, <code>java.util.IdentityHashMap</code>
.</p>
</li>
</list>

<p>C++ STL includes both.</p>

<list type="bullet">
<li>
<p><format color="DarkOrange">Red-black BSTs:</format> 
<code>std::set</code>, <code>std::map</code>.</p>
</li>
<li>
<p><format color="DarkOrange">Hash tables:</format> 
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

<p><format color="BlueViolet">Mathematical Set</format>: 
A collection of distinct keys.</p>

#### 13.1.1 Sets in Java

<list type="decimal">

<li>
<p><code>HashSet</code></p>
<list type="alpha-lower">
<li>
<p><format color="DarkViolet">Implementation</format>: Uses a hash 
table (specifically, a <code>HashMap</code> internally) for storage.</p>
</li>
<li>
<p><format color="Lime">Features</format>: </p>
<list type="bullet">
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
<list type="alpha-lower">
<li>
<p><format color="DarkViolet">Implementation</format>: Extends 
<code>HashSet</code> and maintains a doubly linked list to preserve
the order of element insertion.</p>
</li>
<li>
<p><format color="Lime">Features</format>: </p>
<list type="bullet">
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
<list type="alpha-lower">
<li>
<p><format color="DarkViolet">Implementation</format>: Uses a 
red-black tree (a self-balancing binary search tree).</p>
</li>
<li>
<p><format color="Lime">Features</format>: </p>
<list type="bullet">
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

<code-block lang="java" collapsible="true">
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;
\/
public class SetExample {
    public static void main(String[] args) {
        // HashSet - No order guarantee
        Set&lt;String&gt; hashSet = new HashSet&lt;&gt;();
        hashSet.add("Apple");
        hashSet.add("Banana");
        hashSet.add("Orange");
        System.out.println("HashSet: " + hashSet); // Output may vary in order
\/
        // LinkedHashSet - Maintains insertion order
        Set&lt;String&gt; linkedHashSet = new LinkedHashSet&lt;&gt;();
        linkedHashSet.add("Apple");
        linkedHashSet.add("Banana");
        linkedHashSet.add("Orange");
        System.out.println("LinkedHashSet: " + linkedHashSet); // Output: [Apple, Banana, Orange]
\/
        // TreeSet - Sorted order
        Set&lt;String&gt; treeSet = new TreeSet&lt;&gt;();
        treeSet.add("Orange");
        treeSet.add("Apple");
        treeSet.add("Banana");
        System.out.println("TreeSet: " + treeSet); // Output: [Apple, Banana, Orange]
    }
}
</code-block>

<note>Implementation of <code>TreeSet</code>: Remove "value" from any
ST implementation.</note>

#### 13.1.2 Sets in C++

<list type="decimal">
<li>
<p><code>std::set</code> | <code>std::multiset</code></p>
<list type="alpha-lower">
<li>
<p><format color="DarkViolet">Implementation</format>: Usually 
implemented as a self-balancing binary search tree (often a 
red-black tree).</p>
</li>
<li>
<p><format color="Lime">Features</format>: </p>
<list type="bullet">
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
<list type="alpha-lower">
<li>
<p><format color="DarkViolet">Implementation</format>: Using a hash table, 
which prioritizes fast average-case performance for operations 
like insertion, search, and deletion over maintaining a specific 
order.</p>
</li>
<li>
<p><format color="Lime">Features</format>: </p>
<list type="bullet">
<li>
<p>Offers O(1) average-case time complexity for insertion, 
search, and deletion operations. </p>
</li>
</list>
</li>
</list>
</li>
</list>

<code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;set&gt;
\/
int main() {
    std::set&lt;int&gt; uniqueNumbers;
\/
    uniqueNumbers.insert(3);
    uniqueNumbers.insert(1);
    uniqueNumbers.insert(4);
    uniqueNumbers.insert(1); // Duplicate, won't be added
\/
    std::cout &lt;&lt; "Elements in the set: ";
    for (int num : uniqueNumbers) {
        std::cout &lt;&lt; num &lt;&lt; " ";
    } // Output: 1 3 4 
\/
    return 0;
}
</code-block>

#### 13.1.3 Sets in Python

<p>For more information, please visit
<a href="Python-Programming.topic" anchor="sets" 
summary="How to use sets in Python">Sets in Python Programming</a></p>

### 13.2 Dictionary Clients

<note>
<p>This is the use of built-in dictionaries.</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.HashMap;
\/
public class Main {
    public static void main(String[] args) {
        HashMap&lt;String, Integer&gt; map = new HashMap&lt;&gt;();
\/
        map.put("Alice", 25);
        map.put("Bob", 30);
        map.put("Charlie", 35);
\/
        int age = map.get("Alice");
        System.out.println("Alice's age: " + age);
        boolean exists = map.containsKey("Bob");
        System.out.println("Is Bob in the map? " + exists);
        map.remove("Charlie");
        System.out.println(map);
    }
}
    </code-block>
    </tab>
    <tab title="C++ (map -&gt; Red-Black BST)">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;map&gt;
\/
int main() {
    std::map&lt;std::string, int&gt; myMap;
    myMap["apple"] = 1;
    myMap["banana"] = 2;
    myMap["cherry"] = 3;
    std::cout &lt;&lt; "The value associated with key 'apple' is: " &lt;&lt; myMap["apple"] &lt;&lt; std::endl;
    for (const auto& pair : myMap) {
        std::cout &lt;&lt; "Key: " &lt;&lt; pair.first &lt;&lt; ", Value: " &lt;&lt; pair.second &lt;&lt; std::endl;
    }
    return 0;
}
    </code-block>
    </tab>
    <tab title="C++ (unordered map -&gt; Hash Tables)">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;unordered_map&gt;
\/
int main() {
    std::unordered_map&lt;std::string, int&gt; myMap;
    myMap["apple"] = 1;
    myMap["banana"] = 2;
    myMap["cherry"] = 3;
    std::cout &lt;&lt; "The value associated with key 'apple' is: " &lt;&lt; myMap["apple"] &lt;&lt; std::endl;
    for (const auto& pair : myMap) {
        std::cout &lt;&lt; "Key: " &lt;&lt; pair.first &lt;&lt; ", Value: " &lt;&lt; pair.second &lt;&lt; std::endl;
    }
    return 0;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
print(person["name"]) # Output: John
    </code-block>
    </tab>
</tabs>

<p>For more information about dictionaries in Python, please visit
<a href="Python-Programming.topic" anchor="dictionaries" summary
="How to use dictionaries in Python">Python Programming</a>.</p>

### 13.3 Indexing Clients

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.TreeMap;
\/
public class InvertedIndexJava {
\/
    static class Document {
        int id;
        String content;
\/
        Document(int id, String content) {
            this.id = id;
            this.content = content;
        }
    }
\/
    static TreeMap&lt;String, List&lt;Integer&gt;&gt; buildInvertedIndex(List&lt;Document&gt; documents) {
        TreeMap&lt;String, List&lt;Integer&gt;&gt; index = new TreeMap&lt;&gt;();
\/
        for (Document doc : documents) {
            String[] words = doc.content.toLowerCase().split("\\s+"); // Tokenize into words
            for (String word : words) {
                index.computeIfAbsent(word, k -&gt; new ArrayList&lt;&gt;()).add(doc.id); 
            }
        }
\/
        return index;
    }
\/
    public static void main(String[] args) {
        List&lt;Document&gt; documents = Arrays.asList(
                new Document(1, "The quick brown fox jumps over the lazy dog"),
                new Document(2, "A lazy cat sleeps all day long"),
                new Document(3, "The quick rabbit jumps over the fence")
        );
\/
        TreeMap&lt;String, List&lt;Integer&gt;&gt; invertedIndex = buildInvertedIndex(documents);
\/
        // Example query: Find documents containing the word "jumps"
        String searchTerm = "jumps";
        if (invertedIndex.containsKey(searchTerm)) {
            System.out.println("Documents containing '" + searchTerm + "': " + invertedIndex.get(searchTerm));
        } else {
            System.out.println("No documents found containing '" + searchTerm + "'");
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;map&gt;
\/
struct Document {
    int id;
    string content;
};
\/
// Function to build an inverted index using a map (Red-Black Tree)
std::map&lt;std::string, std::vector&lt;int&gt;&gt; buildInvertedIndex(const std::vector&lt;Document&gt;& documents) {
    std::map&lt;std::string, std::vector&lt;int&gt;&gt; index;
\/
    for (const Document& doc : documents) {
        string word; 
        for (char c : doc.content){
            if (isspace(c)){
                if (!word.empty()){ 
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
\/
    return index;
}
\/
int main() {
    std::vector&lt;Document&gt; documents = {
        {1, "The quick brown fox jumps over the lazy dog"},
        {2, "A lazy cat sleeps all day long"},
        {3, "The quick rabbit jumps over the fence"}
    };
\/
    std::map&lt;std::string, std::vector&lt;int&gt;&gt; invertedIndex = buildInvertedIndex(documents);
\/
    // Example query: Find documents containing the word "jumps"
    string searchTerm = "jumps";
    if (invertedIndex.find(searchTerm) != invertedIndex.end()) {
        std::cout &lt;&lt; "Documents containing '" &lt;&lt; searchTerm &lt;&lt; "': ";
        for (int docId : invertedIndex[searchTerm]) {
            std::cout &lt;&lt; docId &lt;&lt; " ";
        }
        std::cout &lt;&lt; std::endl;
    } else {
        std::cout &lt;&lt; "No documents found containing '" &lt;&lt; searchTerm &lt;&lt; "'" &lt;&lt; std::endl;
    }
\/
    return 0;
}
    </code-block>
    </tab>
</tabs>

### 13.4 Sparse Vectors

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.HashMap;
import java.util.Map;
\/
public class SparseMatrixVectorMultiplication {
\/
    public static class SparseMatrix {
        private int rows;
        private int cols;
        private Map&lt;String, Double&gt; data;
\/
        public SparseMatrix(int rows, int cols) {
            this.rows = rows;
            this.cols = cols;
            this.data = new HashMap&lt;&gt;();
        }
\/
        // Method to set a non-zero element in the matrix
        public void set(int row, int col, double value) {
            if (row &lt; 0 || row &gt;= rows || col &lt; 0 || col &gt;= cols) {
                throw new IllegalArgumentException("Invalid row or column index");
            }
            if (value != 0) {
                data.put(getKey(row, col), value);
            }
        }
\/
        // Method to get an element from the matrix (returns 0 if not present)
        public double get(int row, int col) {
            if (row &lt; 0 || row &gt;= rows || col &lt; 0 || col &gt;= cols) {
                throw new IllegalArgumentException("Invalid row or column index");
            }
            return data.getOrDefault(getKey(row, col), 0.0);
        }
\/
        // Helper method to generate key for the HashMap
        private String getKey(int row, int col) {
            return row + "," + col;
        }
\/
        // Method to perform matrix-vector multiplication
        public double[] multiply(double[] vector) {
            if (vector.length != cols) {
                throw new IllegalArgumentException("Vector size mismatch");
            }
\/
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
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include &lt;iostream&gt;
#include &lt;unordered_map&gt;
#include &lt;vector&gt;
\/
// Pair struct to store row and column indices
struct RowCol {
    int row;
    int col;
\/
    // Hash function for unordered_map
    size_t operator()(const RowCol& rc) const {
        return hash&lt;int&gt;()(rc.row) ^ hash&lt;int&gt;()(rc.col);
    }
\/
    // Equality comparison for unordered_map
    bool operator==(const RowCol& other) const {
        return row == other.row && col == other.col;
    }
};
\/
class SparseMatrix {
private:
    int rows;
    int cols;
    unordered_map&lt;RowCol, double&gt; data; // Symbol table (hash map)
\/
public:
    SparseMatrix(int rows, int cols) : rows(rows), cols(cols) {}
\/
    // Set a non-zero element in the matrix
    void set(int row, int col, double value) {
        if (row &lt; 0 || row &gt;= rows || col &lt; 0 || col &gt;= cols) {
            throw out_of_range("Invalid row or column index");
        }
        if (value != 0) {
            data[{row, col}] = value; // Using RowCol struct as key
        }
    }
\/
    // Get an element from the matrix (returns 0 if not present)
    double get(int row, int col) const {
        if (row &lt; 0 || row &gt;= rows || col &lt; 0 || col &gt;= cols) {
            std::throw out_of_range("Invalid row or column index");
        }
        return data.count({row, col}) ? data.at({row, col}) : 0.0; 
    }
\/
    // Matrix-vector multiplication
    std::vector&lt;double&gt; multiply(const vector&lt;double&gt;& vec) const {
        if (vec.size() != cols) {
            std::throw invalid_argument("Vector size mismatch");
        }
\/
        std::vector&lt;double&gt; result(rows, 0.0); // Initialize result vector with zeros
        for (const auto& entry : data) {
            int row = entry.first.row;
            int col = entry.first.col;
            result[row] += entry.second * vec[col];
        }
        return result;
    }
};
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class SparseMatrix:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.data = {}  # Using a dictionary as a symbol table
\/
    def set(self, row, col, value):
        if row &lt; 0 or row &gt;= self.rows or col &lt; 0 or col &gt;= self.cols:
            raise ValueError("Invalid row or column index")
        if value != 0:
            self.data[(row, col)] = value
\/
    def get(self, row, col):
        if row &lt; 0 or row &gt;= self.rows or col &lt; 0 or col &gt;= self.cols:
            raise ValueError("Invalid row or column index")
        return self.data.get((row, col), 0)  # Return 0 if not found
\/
    def multiply(self, vector):
        if len(vector) != self.cols:
            raise ValueError("Vector size mismatch")
\/
        result = [0] * self.rows
        for (row, col), value in self.data.items():
            result[row] += value * vector[col]
        return result
    </code-block>
    </tab>
</tabs>

<tip>
<p>What is the running time of multiplying the <math>n \times n</math> matirx
<math>A</math> with a dense vector <math>x</math> 
of length <math>n</math> ? => <math>n</math></p>
</tip>

## 14 Undirected Graphs

### 14.1 Introduction to Graphs

<p><format color="BlueViolet">Terminology</format></p>

<list type="alpha-lower">
<li>
<p><format color="DarkOrange">Graph:</format> Set of 
<format color="OrangeRed">vertices</format> connected pairwise by 
<format color="OrangeRed">edges</format>.</p>
</li>
<li>
<p><format color="DarkOrange">Path:</format> Sequence of vertices 
connected by edges.</p>
</li>
<li>
<p><format color="DarkOrange">Cycle:</format> Path whose first and 
last vertices are the same.</p>
</li>
<li>
<p>Two vertices are <format color="OrangeRed">connected</format> if
there is a path between them.</p>
</li>
</list>

<img src="../images_data/d14-1-1.png" alt = "undirected graph"/>

### 14.2 Graph API

<p><format color="BlueViolet">Representation Types</format></p>

<list type="alpha-lower">
<li>
<p><format color="Fuchsia">Set-of-edges graph representation: 
</format> Maintain a list of the edges (linked list or array).</p>
</li>
<li>
<p><format color="Fuchsia">Adjacency-matrix graph 
representation:</format> Maintain a two-dimensional
<math>V</math> by <math>V</math> boolean array; for each edge 
<math>v-w</math> in the graph: <code>adj[v][w] = adj[w][v] = true</code>.</p>
</li>
<li>
<p><format color="Fuchsia">Adjacency-list graph 
representation:</format> Maintain vertex-indexed array of lists.</p>
</li>
</list>

<p>In practice: use adjacency-lists representation.</p>

<list type="bullet">
<li>
<p>Algorithms based on iterating over vertices adjacent to <math>v
</math>.</p>
</li>
<li>
<p>Real-world graphs tend to be <format color="OrangeRed">sparse
</format> (huge number of vertices, small average vertex degree).</p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
\/
public class UndirectedGraph {
\/
    private final int numVertices;
    private final List&lt;List&lt;Integer&gt;&gt; adjacencyList;
\/
    public UndirectedGraph(int numVertices) {
        this.numVertices = numVertices;
        adjacencyList = new ArrayList&lt;&gt;(numVertices);
        for (int i = 0; i &lt; numVertices; i++) {
            adjacencyList.add(new LinkedList&lt;&gt;());
        }
    }
\/
    public void addEdge(int source, int destination) {
        adjacencyList.get(source).add(destination);
        adjacencyList.get(destination).add(source);
    }
\/
    public int getNumVertices() {
        return numVertices;
    }
\/
    public List&lt;List&lt;Integer&gt;&gt; getAdjacencyList() {
        return adjacencyList;
    }
\/
    public void printGraph() {
        for (int i = 0; i &lt; numVertices; i++) {
            System.out.print("Vertex " + i + ":");
            for (Integer vertex : adjacencyList.get(i)) {
                System.out.print(" -&gt; " + vertex);
            }
            System.out.println();
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++ (UndirectedGraph.h)">
    <code-block lang="c++" collapsible="true">
#ifndef UNDIRECTEDGRAPH_H
#define UNDIRECTEDGRAPH_H
#pragma once
\/
#include &lt;vector&gt;
#include &lt;list&gt;
\/
class UndirectedGraph {
private:
    int numVertices;
    std::vector&lt;std::list&lt;int&gt;&gt; adjacencyList;
\/
public:
    explicit UndirectedGraph(const int& numVertices);
    void addEdge(const int& source, const int& destination);
    [[nodiscard]] bool hasEdge(const int& source, const int& destination) const;
    [[nodiscard]] int getNumVertices() const;
    [[nodiscard]] const std::vector&lt;std::list&lt;int&gt;&gt;& getAdjacencyList() const;
    void printGraph() const;
};
\/
#endif //UNDIRECTEDGRAPH_H
    </code-block>
    </tab>
    <tab title="C++ (UndirecteGraph.cpp)">
    <code-block lang="c++" collapsible="true">
#include "UndirectedGraph.h"
#include &lt;iostream&gt;
#include &lt;algorithm&gt;
\/
UndirectedGraph::UndirectedGraph(const int& numVertices) :
    numVertices(numVertices), adjacencyList(numVertices) {}
\/
void UndirectedGraph::addEdge(const int& source, const int& destination) {
    adjacencyList[source].push_back(destination);
    adjacencyList[destination].push_back(source);
}
\/
bool UndirectedGraph::hasEdge(const int& source, const int& destination) const {
    return std::ranges::any_of(adjacencyList[source],
                               [&destination](const int& neighbor) {
                                   return neighbor == destination;
                               });
}
\/
int UndirectedGraph::getNumVertices() const {
    return numVertices;
}
\/
const std::vector&lt;std::list&lt;int&gt;&gt;& UndirectedGraph::getAdjacencyList() const {
    return adjacencyList;
}
\/
void UndirectedGraph::printGraph() const {
    for (int i = 0; i &lt; numVertices; ++i) {
        std::cout &lt;&lt; "Vertex " &lt;&lt; i &lt;&lt; ":";
        for (const int& neighbor : adjacencyList[i]) {
            std::cout &lt;&lt; " -&gt; " &lt;&lt; neighbor;
        }
        std::cout &lt;&lt; std::endl;
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class UndirectedGraph:
    def __init__(self, num_vertices):
        self.num_vertices = num_vertices
        self.adjacency_list = [[] for _ in range(num_vertices)]
\/
    def add_edge(self, source, destination):
        self.adjacency_list[source].append(destination)
        self.adjacency_list[destination].append(source)
\/
    def get_num_vertices(self):
        return self.num_vertices
\/
    def get_adjacency_list(self):
        return self.adjacency_list
\/
    def print_graph(self):
        for i in range(self.num_vertices):
            print(f"Vertex {i}:", end="")
            for vertex in self.adjacency_list[i]:
                print(f" -&gt; {vertex}", end="")
            print()
    </code-block>
    </tab>
</tabs>

### 14.3 Depth-First Search

<p><format color="BlueViolet">Goal:</format> Systematically search
through a graph.</p>

<p><format color="BlueViolet">Typical applications</format></p>

<list type="bullet">
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

<p><format color="BlueViolet">Properties</format></p>

<list type="bullet">
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

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Stack;
\/
public class DepthFirstSearch {
    private final boolean[] marked;
    private final int[] edgeTo;
\/
    public DepthFirstSearch(UndirectedGraph graph, int source) {
        this.marked = new boolean[graph.getNumVertices()];
        this.edgeTo = new int[graph.getNumVertices()];
        dfs(graph, source);
    }
\/
    private void dfs(UndirectedGraph graph, int source) {
        Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();
        marked[source] = true;
        stack.push(source);
\/
        while (!stack.isEmpty()) {
            int v = stack.pop();
            System.out.print(v + " ");
\/
            for (int w : graph.getAdjacencyList().get(v)) {
                if (!marked[w]) {
                    marked[w] = true;
                    edgeTo[w] = v;
                    stack.push(w);
                }
            }
        }
    }
\/    
    public void hasPathTo(int v) {
        return marked[v];
    }
\/
    public void printPathTo(int v) {
        if (!marked[v]) {
            System.out.println("No path from source to " + v);
            return;
        }
        Stack&lt;Integer&gt; path = new Stack&lt;&gt;();
        for (int x = v; x != 0; x = edgeTo[x]) {
            path.push(x);
        }
        path.push(0); 
\/
        System.out.print("Path: ");
        while (!path.isEmpty()) {
            System.out.print(path.pop());
            if (!path.isEmpty()) {
                System.out.print(" -&gt; ");
            }
        }
        System.out.println();
    }
}
    </code-block>
    </tab>
    <tab title="C++ (DepthFirstSearch.h)">
    <code-block lang="c++" collapsible="true">
#ifndef DEPTHFIRSTSEARCH_H
#define DEPTHFIRSTSEARCH_H
#pragma once
\/
#include &lt;vector&gt;
#include "UndirectedGraph.h"
\/
class DepthFirstSearch {
private:
    const UndirectedGraph& graph;
    std::vector&lt;bool&gt; marked;
    std::vector&lt;int&gt; edgeTo;
\/
public:
    DepthFirstSearch(const UndirectedGraph& graph, int source);
    void dfs(int v);
    [[nodiscard]] bool hasPathTo(int v) const;
    void printPathTo(int v) const;
};
\/
#endif //DEPTHFIRSTSEARCH_H
    </code-block>
    </tab>
    <tab title="C++ (DepthFirstSearch.cpp)">
    <code-block lang="c++" collapsible="true">
#include "DepthFirstSearch.h"
#include &lt;iostream&gt;
#include &lt;stack&gt;
\/
DepthFirstSearch::DepthFirstSearch(const UndirectedGraph& graph, const int source) :
    graph(graph),
    marked(graph.getNumVertices(), false),
    edgeTo(graph.getNumVertices(), -1)
{
    dfs(source);
}
\/
void DepthFirstSearch::dfs(const int v) {
    std::stack&lt;int&gt; stack;
    marked[v] = true;
    stack.push(v);
\/
    while (!stack.empty()) {
        const int current = stack.top();
        stack.pop();
        std::cout &lt;&lt; current &lt;&lt; " ";
\/
        for (int neighbor : this-&gt;graph.getAdjacencyList()[current]) {
            if (!marked[neighbor]) {
                marked[neighbor] = true;
                edgeTo[neighbor] = current;
                stack.push(neighbor);
            }
        }
    }
}
\/
bool DepthFirstSearch::hasPathTo(const int v) const {
    return marked[v];
}
\/
void DepthFirstSearch::printPathTo(const int v) const {
    if (!hasPathTo(v)) {
        std::cout &lt;&lt; "No path from source to " &lt;&lt; v &lt;&lt; std::endl;
        return;
    }
    std::stack&lt;int&gt; path;
    for (int x = v; x != edgeTo[v]; x = edgeTo[x]) {
        path.push(x);
    }
    path.push(edgeTo[v]);
\/
    std::cout &lt;&lt; "Path: ";
    while (!path.empty()) {
        std::cout &lt;&lt; path.top();
        path.pop();
        if (!path.empty()) {
            std::cout &lt;&lt; " -> ";
        }
    }
    std::cout &lt;&lt; std::endl;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from UndirectedGraph import UndirectedGraph
\/
\/
class DepthFirstSearch:
    def __init__(self, graph: UndirectedGraph, source: int):
        self.marked = [False] * graph.get_num_vertices()
        self.edge_to = [None] * graph.get_num_vertices()
        self.dfs(graph, source)
\/
    def dfs(self, graph, source):
        stack = [source]
        self.marked[source] = True
\/
        while stack:
            v = stack.pop()
            print(v, end=" ")
\/
            for w in graph.get_adjacency_list()[v]:
                if not self.marked[w]:
                    self.marked[w] = True
                    self.edge_to[w] = v
                    stack.append(w)
\/
    def has_path_to(self, v):
        return self.marked[v]
\/ 
    def print_path_to(self, v):
        if not self.marked[v]:
            print(f"No path from source to {v}")
            return
\/
        path = []
        x = v
        while x is not None:
            path.append(x)
            x = self.edge_to[x]
\/
        print("Path:", " -&gt; ".join(map(str, path[::-1])))
    </code-block>
    </tab>
</tabs>

### 14.4 Breadth-First Search

<procedure title="Breadth-First Search">
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

<p><format color="BlueViolet">Property</format></p>

<p>BFS computes shortest paths (fewest number of edges) from s to 
all other vertices in a graph in time proportional to <math>E + V
</math>.</p>

<list type="bullet">
<li>
<p><format color="Fuchsia">Depth-first search:</format> put
unvisited vertices on <format color="OrangeRed">stack</format>.</p>
</li>
<li>
<p><format color="Fuchsia">Breadth-first search:</format> 
put unvisited vertices on <format color="OrangeRed">queue</format>
.</p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayDeque;
import java.util.List;
import java.util.Queue;
\/
public class BreadthFirstSearch {
    private boolean[] marked;
    private int[] edgeTo;
    private int[] distanceTo;
\/
    public void bfs(UndirectedGraph graph, int startVertex) {
        marked = new boolean[graph.getNumVertices()];
        edgeTo = new int[graph.getNumVertices()];
        distanceTo = new int[graph.getNumVertices()];
\/
        Queue&lt;Integer&gt; queue = new ArrayDeque&lt;&gt;();
\/
        marked[startVertex] = true;
        distanceTo[startVertex] = 0;
        queue.offer(startVertex);
\/
        while (!queue.isEmpty()) {
            int currentVertex = queue.poll();
\/
            List&lt;List&lt;Integer&gt;&gt; adjList = graph.getAdjacencyList();
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
\/
    public int getDistance(int destination) {
        if (!marked[destination]) { 
            return -1; 
        }
        return distanceTo[destination];
    }
\/
    public void printPath(int start, int end) {
        if (start == end) {
            System.out.print(start);
            return;
        }
\/
        if (edgeTo[end] == 0) {
            System.out.print("No path exists");
            return;
        }
\/
        printPath(start, edgeTo[end]);
        System.out.print(" -&gt; " + end);
    }
}
    </code-block>
    </tab>
    <tab title="C++ (BreadthFirstSearch.h)">
    <code-block lang="c++" collapsible="true">
#ifndef BREADTHFIRSTSEARCH_H
#define BREADTHFIRSTSEARCH_H
#pragma once
\/
#include "UndirectedGraph.h"
#include &lt;vector&gt;
\/
class BreadthFirstSearch {
private:
    const UndirectedGraph& graph;
    int startVertex;
    std::vector&lt;bool&gt; marked;
    std::vector&lt;int&gt; edgeTo;
    std::vector&lt;int&gt; distanceTo;
\/
public:
    BreadthFirstSearch(const UndirectedGraph& graph, int startVertex);
    void bfs();
    [[nodiscard]] int getDistance(int destination) const;
    void printPath(int destination) const;
};
\/
#endif //BREADTHFIRSTSEARCH_H
    </code-block>
    </tab>
    <tab title="C++ (BreadthFirstSearch.cpp)">
    <code-block lang="c++" collapsible="true">
#include "BreadthFirstSearch.h"
#include &lt;iostream&gt;
#include &lt;queue&gt;
\/
BreadthFirstSearch::BreadthFirstSearch(const UndirectedGraph& graph, const int startVertex) :
    graph(graph), startVertex(startVertex),
    marked(graph.getNumVertices(), false),
    edgeTo(graph.getNumVertices(), -1),
    distanceTo(graph.getNumVertices(), 0) {}
\/
void BreadthFirstSearch::bfs() {
    std::queue&lt;int&gt; queue;
    marked[startVertex] = true;
    queue.push(startVertex);
\/
    while (!queue.empty()) {
        const int currentVertex = queue.front();
        queue.pop();
\/
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
\/
int BreadthFirstSearch::getDistance(const int destination) const {
    if (!marked[destination]) {
        return -1;
    }
    return distanceTo[destination];
}
\/
void BreadthFirstSearch::printPath(const int destination) const {
    if (startVertex == destination) {
        std::cout &lt;&lt; startVertex;
        return;
    }
\/
    if (edgeTo[destination] == -1) {
        std::cout &lt;&lt; "No path exists";
        return;
    }
\/
    printPath(edgeTo[destination]);
    std::cout &lt;&lt; " -&gt; " &lt;&lt; destination;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from collections import deque
from UndirectedGraph import UndirectedGraph
import sys
\/
\/
class BreadthFirstSearch:
    def __init__(self, graph: UndirectedGraph, start_vertex: int):
        self.marked = [False] * graph.get_num_vertices()
        self.edge_to = [None] * graph.get_num_vertices()
        self.distance_to = [sys.maxsize] * graph.get_num_vertices()
\/
        self.bfs(graph, start_vertex)
\/
    def bfs(self, graph: UndirectedGraph, start_vertex: int):
        queue = deque([start_vertex])
        self.marked[start_vertex] = True
        self.distance_to[start_vertex] = 0
\/
        while queue:
            current_vertex = queue.popleft()
\/
            for adjacent_vertex in graph.get_adjacency_list()[current_vertex]:
                if not self.marked[adjacent_vertex]:
                    self.marked[adjacent_vertex] = True
                    self.edge_to[adjacent_vertex] = current_vertex
                    self.distance_to[adjacent_vertex] = self.distance_to[current_vertex] + 1
                    queue.append(adjacent_vertex)
\/
    def get_distance(self, destination: int) -> int:
        if not self.marked[destination]:
            return -1
        return self.distance_to[destination]
\/
    def print_path(self, start: int, end: int):
        if start == end:
            print(start, end="")
            return
\/
        if self.edge_to[end] is None:
            print("No path exists")
            return
\/
        self.print_path(start, self.edge_to[end])
        print(f" -&gt; {end}", end="")
    </code-block>
    </tab>
</tabs>

### 14.5 Connected Components

<p><format color="DarkOrange">Connected Components:</format> A 
connected component is maximal set of connected vertices.</p>

<procedure title="Find all Connected Components">
<step>
    <p>Mark vertex <math>v</math> as visited.</p>
</step>
<step>
    <p>Recursively visit all the unmarked vertices adjacent to <math>v
    </math>.</p>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
import java.util.List;
\/
public class ConnectedComponents {
\/
    private final int[] id;
    private int count; 
\/
    public ConnectedComponents(UndirectedGraph graph) {
        int numVertices = graph.getNumVertices();
        id = new int[numVertices];
        count = 0;
\/  
        for (int i = 0; i &lt; numVertices; i++) {
            id[i] = i;
        }
\/        
        for (int i = 0; i &lt; numVertices; i++) {
            if (id[i] == i) { 
                dfs(graph, i);
                count++;
            }
        }
    }
\/
    private void dfs(UndirectedGraph graph, int v) {
        id[v] = count;
        for (int w : graph.getAdjacencyList().get(v)) {
            if (id[w] == w) {
                dfs(graph, w);
            }
        }
    }
\/
    public boolean isConnected(int v, int w) {
        return id[v] == id[w];
    }
\/
    public int getCount() {
        return count;
    }
\/
    public void printComponents() {
        System.out.println("Number of connected components: " + count);
        List&lt;List&lt;Integer&gt;&gt; components = new ArrayList&lt;&gt;(count);
        for (int i = 0; i &lt; count; i++) {
            components.add(new ArrayList&lt;&gt;());
        }
        for (int i = 0; i &lt; id.length; i++) {
            components.get(id[i]).add(i);
        }
        for (int i = 0; i &lt; count; i++) {
            System.out.println("Component " + i + ": " + components.get(i));
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++ (ConnectedComponents.h)">
    <code-block lang="c++" collapsible="true">
#ifndef CONNECTEDCOMPONENTS_H 
#define CONNECTEDCOMPONENTS_H
\/
#include &lt;vector>&gt;
#include "UndirectedGraph.h" 
\/
class ConnectedComponents {
private:
    std::vector&lt;int&gt; id;
    int count;
\/
    void dfs(const UndirectedGraph& graph, int v); 
\/
public:
    explicit ConnectedComponents(const UndirectedGraph& graph);
    [[nodiscard]] bool isConnected(int v, int w) const;
    [[nodiscard]] int getCount() const; 
    void printComponents() const;
};
\/
#endif // CONNECTEDCOMPONENTS_H 
    </code-block>
    </tab>
    <tab title="C++ (ConnectedComponents.cpp)">
    <code-block lang="c++" collapsible="true">
#include "ConnectedComponents.h"
#include &lt;iostream&gt;
\/
ConnectedComponents::ConnectedComponents(const UndirectedGraph& graph) : count(0) {
    const int numVertices = graph.getNumVertices();
    id.resize(numVertices);
\/
    for (int i = 0; i &lt; numVertices; ++i) {
        id[i] = i; 
    }
\/    
    for (int i = 0; i &lt; numVertices; ++i) {
        if (id[i] == i) {
            dfs(graph, i);
            ++count;
        }
    }
}
\/
void ConnectedComponents::dfs(const UndirectedGraph& graph, int v) {
    id[v] = count;
    for (const int& w : graph.getAdjacencyList()[v]) {
        if (id[w] == w) { 
            dfs(graph, w);
        }
    }
}
\/
bool ConnectedComponents::isConnected(int v, int w) const {
    return id[v] == id[w];
}
\/
int ConnectedComponents::getCount() const {
    return count;
}
\/
void ConnectedComponents::printComponents() const {
    std::cout &lt;&lt; "Number of connected components: " &lt;&lt; count &lt;&lt; std::endl;
\/
    std::vector&lt;std::vector&lt;int&gt;&gt; components(count);
    for (int i = 0; i &lt; id.size(); ++i) {
        components[id[i]].push_back(i);
    }
\/
    for (int i = 0; i &lt; count; ++i) {
        std::cout &lt;&lt; "Component " &lt;&lt; i &lt;&lt; ": ";
        for (const int& vertex : components[i]) {
            std::cout &lt;&lt; vertex &lt;&lt; " ";
        }
        std::cout &lt;&lt; std::endl;
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from UndirectedGraph import UndirectedGraph  
\/
\/
class ConnectedComponents:
    def __init__(self, graph: UndirectedGraph):
        self.id = list(range(graph.get_num_vertices()))  
        self.count = 0
\/
        for i in range(graph.get_num_vertices()):
            if self.id[i] == i:  
                self.dfs(graph, i)
                self.count += 1
\/
    def dfs(self, graph: UndirectedGraph, v: int):
        self.id[v] = self.count
        for w in graph.get_adjacency_list()[v]:
            if self.id[w] == w:
                self.dfs(graph, w)
\/
    def is_connected(self, v: int, w: int) -> bool:
        return self.id[v] == self.id[w]
\/
    def get_count(self) -&gt; int:
        return self.count
\/
    def print_components(self):
        print("Number of connected components:", self.count)
        components = [[] for _ in range(self.count)]
\/
        for i in range(len(self.id)):
            components[self.id[i]].append(i)
\/
        for i, component in enumerate(components):
            print(f"Component {i}: {component}")
    </code-block>
    </tab>
</tabs>

### 14.6 Important Questions

<list type="decimal">
<li>
<p><format color="PaleGoldenRod">Q:</format> Implement depth-first 
search in an undirected graph without using recursion.</p>
<p><format color="SkyBlue">A:</format> Simply replace a queue with
a stack in breadth-first search.</p>
</li>
<li>
<p>Given a connected graph with no cycles</p>
    <list type="bullet">
    <li>
    <p><format color="PaleGoldenRod">Q:</format> <format style=
    "italic">Diameter</format>: design a linear-time algorithm to find
    the longest simple path in the graph.</p>
    <p><format color="SkyBlue">A:</format> to compute the diameter,
    pick a vertex <math>s</math>; run BFS from <math>s</math>; then 
    run BFS again from the vertex that is furthest from <math>s</math>
    .</p>
    </li>
    <li>
    <p><format color="PaleGoldenRod">Q:</format> <format style =
    "italic">Center</format>: design a linear-time algorithm to find
    the center of the graph.</p>
    <p><format color="SkyBlue">A:</format> consider vertices on the 
    longest path.</p>
    </li>
    </list>
</li>
<li>
<p><format color="PaleGoldenRod">Q:</format> An Euler cycle in a 
graph is a cycle (not necessarily simple) that uses every edge in the
graph exactly one. Design a linear-time algorithm to determine whether 
a graph has an Euler cycle, and if so, find one.</p>
<p><format color="SkyBlue">A:</format> use depth-first search and 
piece together the cycles you discover.</p>
</li>
</list>

## 15 Directed Graphs

### 15.1 Introduction to Directed Graphs

<p>Directed graph: Set of vertices connected pairwise by <format color
= "OrangeRed">directed edges</format>.</p>

<img src="../images_data/d15-1-1.png" alt = "Directed graph"/>

### 15.2 Directed Graph API

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
import java.util.List;
\/
public class DirectedGraph {
\/
    private final int numVertices;
    private int numEdges;
    private final List&lt;List&lt;Integer&gt;&gt; adjacencyList;
\/
    public DirectedGraph(int numVertices) {
        this.numVertices = numVertices;
        this.numEdges = 0;
        this.adjacencyList = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; numVertices; i++) {
            adjacencyList.add(i, new ArrayList&lt;&gt;());
        }
    }
\/
    public void addEdge(int source, int destination) {
        adjacencyList.get(source).add(destination);
        numEdges++;
    }
\/
    public int getNumVertices() {
        return numVertices;
    }
\/
    public int getNumEdges() {
        return numEdges;
    }
\/
    public List&lt;List&lt;Integer&gt;&gt; getAdjacencyList() {
        return adjacencyList;
    }
\/
    public void printGraph() {
        for (int v = 0; v &lt; numVertices; v++) {
            System.out.print("Adjacency list of vertex " + v + " : ");
            for (Integer neighbor : adjacencyList.get(v)) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }
}
    </code-block>
    </tab>
    <tab title="C++ (DirectedGraph.h)">
    <code-block lang="c++" collapsible="true">
#ifndef DIRECTEDGRAPH_H
#define DIRECTEDGRAPH_H
#pragma once
\/
#include &lt;vector&gt;
#include &lt;list&gt;
\/
class DirectedGraph {
private:
    int numVertices;
    std::vector&lt;std::list&lt;int&gt;&gt; adjacencyList;
\/
public:
    explicit DirectedGraph(const int& numVertices);
    void addEdge(const int& source, const int& destination);
    [[nodiscard]] bool hasEdge(const int& source, const int& destination) const;
    [[nodiscard]] int getNumVertices() const;
    [[nodiscard]] const std::vector&lt;std::list&lt;int&gt;&gt;& getAdjacencyList() const;
    void printGraph() const;
};
\/
#endif //DIRECTEDGRAPH_H
    </code-block>
    </tab>
    <tab title="C++ (DirectedGraph.cpp)">
    <code-block lang="c++" collapsible="true">
#include "DirectedGraph.h"
#include &lt;iostream&gt;
#include &lt;algorithm&gt;
\/
DirectedGraph::DirectedGraph(const int& numVertices) :
    numVertices(numVertices), adjacencyList(numVertices) {}
\/
void DirectedGraph::addEdge(const int& source, const int& destination) {
    adjacencyList[source].push_back(destination);
}
\/
bool DirectedGraph::hasEdge(const int& source, const int& destination) const {
    return std::ranges::any_of(adjacencyList[source],
    [&destination](const int& neighbor) {
        return neighbor == destination;
    });
}
\/
int DirectedGraph::getNumVertices() const {
    return numVertices;
}
\/
const std::vector&lt;std::list&lt;int&gt;&gt;& DirectedGraph::getAdjacencyList() const {
    return adjacencyList;
}
\/
void DirectedGraph::printGraph() const {
    for (int i = 0; i &lt; numVertices; ++i) {
        std::cout &lt;&lt; "Vertex " &lt;&lt; i &lt;&lt; ":";
        for (const int& neighbor : adjacencyList[i]) {
            std::cout &lt;&lt; " -> " &lt;&lt; neighbor;
        }
        std::cout &lt;&lt; std::endl;
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class DirectedGraph:
    def __init__(self, num_vertices):
        self.num_vertices = num_vertices
        self.num_edges = 0
        self.adjacency_list = [[] for _ in range(num_vertices)]
\/
    def add_edge(self, source, destination):
        self.adjacency_list[source].append(destination)
        self.num_edges += 1
\/
    def get_num_vertices(self):
        return self.num_vertices
\/
    def get_num_edges(self):
        return self.num_edges
\/
    def print_graph(self):
        for v in range(self.num_vertices):
            print(f"Adjacency list of vertex {v} : ", end="")
            for neighbor in self.adjacency_list[v]:
                print(f"{neighbor} ", end="")
            print()
    </code-block>
    </tab>
</tabs>

### 15.3 Digraph Search

#### 15.3.1 Depth-First Search for Digraph

<note>
<p>Every undirected graph is a digraph (with edges in both 
directions).</p>
<p>DFS is a <format color="OrangeRed">digraph</format> algorithm, 
same method as for undirected graphs!</p>
</note>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Stack;
\/
public class DirectedDepthFirstSearch {
    private final boolean[] marked;
    private final int[] edgeTo;
\/
    public DirectedDepthFirstSearch(DirectedGraph graph, int source) {
        this.marked = new boolean[graph.getNumVertices()];
        this.edgeTo = new int[graph.getNumVertices()];
        dfs(graph, source);
    }
\/
    private void dfs(DirectedGraph graph, int source) {
        Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();
        marked[source] = true;
        stack.push(source);
\/
        while (!stack.isEmpty()) {
            int v = stack.pop();
            System.out.print(v + " ");
\/
            for (int w : graph.getAdjacencyList().get(v)) {
                if (!marked[w]) {
                    marked[w] = true;
                    edgeTo[w] = v;
                    stack.push(w);
                }
            }
        }
    }
\/
    public boolean hasPathTo(int v) {
        return marked[v];
    }
\/
    public void printPathTo(int v) {
        if (!marked[v]) {
            System.out.println("No path from source to " + v);
            return;
        }
        Stack&lt;Integer&gt; path = new Stack&lt;&gt;();
        for (int x = v; x != 0; x = edgeTo[x]) {
            path.push(x);
        }
        path.push(0);
\/
        System.out.print("Path: ");
        while (!path.isEmpty()) {
            System.out.print(path.pop());
            if (!path.isEmpty()) {
                System.out.print(" -&gt; ");
            }
        }
        System.out.println();
    }
}
    </code-block>
    </tab>
    <tab title="C++ (DirectedDepthFirstSearch.h)">
    <code-block lang="c++" collapsible="true">
#ifndef DIRECTEDDEPTHFIRSTSEARCH_H
#define DIRECTEDDEPTHFIRSTSEARCH_H
#pragma once
\/
#include &lt;vector&gt;
#include "DirectedGraph.h"
\/
class DirectedDepthFirstSearch {
private:
    const DirectedGraph& graph;
    std::vector&lt;bool&gt; marked;
    std::vector&lt;int&gt; edgeTo;
\/
public:
    DirectedDepthFirstSearch(const DirectedGraph& graph, int source);
    void dfs(int v);
    [[nodiscard]] bool hasPathTo(int v) const;
    void printPathTo(int v) const;
};
\/
#endif //DIRECTEDDEPTHFIRSTSEARCH_H
    </code-block>
    </tab>
    <tab title="C++ (DirectedDepthFirstSearch.cpp)">
    <code-block lang="c++" collapsible="true">
#include "DirectedDepthFirstSearch.h"
#include &lt;iostream&gt;
#include &lt;stack&gt;
\/
DirectedDepthFirstSearch::DirectedDepthFirstSearch(const DirectedGraph& graph, const int source) :
    graph(graph),
    marked(graph.getNumVertices(), false),
    edgeTo(graph.getNumVertices(), -1)
{
    dfs(source);
}
\/
void DirectedDepthFirstSearch::dfs(const int v) {
    std::stack&lt;int&gt; stack;
    marked[v] = true;
    stack.push(v);
\/
    while (!stack.empty()) {
        const int current = stack.top();
        stack.pop();
        std::cout &lt;&lt; current &lt;&lt; " ";
\/
        for (int neighbor : this-&gt;graph.getAdjacencyList()[current]) {
            if (!marked[neighbor]) {
                marked[neighbor] = true;
                edgeTo[neighbor] = current;
                stack.push(neighbor);
            }
        }
    }
}
\/
bool DirectedDepthFirstSearch::hasPathTo(const int v) const {
    return marked[v];
}
\/
void DirectedDepthFirstSearch::printPathTo(const int v) const {
    if (!hasPathTo(v)) {
        std::cout &lt;&lt; "No path from source to " &lt;&lt; v &lt;&lt; std::endl;
        return;
    }
    std::stack&lt;int&gt; path;
    for (int x = v; x != edgeTo[v]; x = edgeTo[x]) {
        path.push(x);
    }
    path.push(edgeTo[v]);
\/
    std::cout &lt;&lt; "Path: ";
    while (!path.empty()) {
        std::cout &lt;&lt; path.top();
        path.pop();
        if (!path.empty()) {
            std::cout &lt;&lt; " -> ";
        }
    }
    std::cout &lt;&lt; std::endl;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from DirectedGraph import DirectedGraph
\/
\/
class DirectedDepthFirstSearch:
    def __init__(self, graph: DirectedGraph, source: int):
        self.marked = [False] * graph.get_num_vertices()
        self.edge_to = [None] * graph.get_num_vertices()
        self.dfs(graph, source)
\/
    def dfs(self, graph, source):
        stack = [source]
        self.marked[source] = True
\/
        while stack:
            v = stack.pop()
            print(v, end=" ")
\/
            for w in graph.get_adjacency_list()[v]:
                if not self.marked[w]:
                    self.marked[w] = True
                    self.edge_to[w] = v
                    stack.append(w)
\/
    def has_path_to(self, v):
        return self.marked[v]
\/
    def print_path_to(self, v):
        if not self.marked[v]:
            print(f"No path from source to {v}")
            return
\/
        path = []
        x = v
        while x is not None:
            path.append(x)
            x = self.edge_to[x]
\/
        print("Path:", " -&gt; ".join(map(str, path[::-1])))
    </code-block>
    </tab>
</tabs>

#### 15.3.2 Breadth-First Search for Digraph

<note>
<p>Every undirected graph is a digraph (with edges in both 
directions).</p>
<p>BFS is a <format color="OrangeRed">digraph</format> algorithm, 
same method as for undirected graphs!</p>
</note>

<p><format color="BlueViolet">Reachability application:</format> 
</p>

<list type="bullet">
<li>
    <p>Program control-flow analysis</p>
</li>
<li>
    <p>Mark-sweep garbage collector: if ao object is unreachable, it is 
    garbage.</p> 
</li>
</list>

<p><format color="BlueViolet">Application</format></p>

<list type="bullet">
<li>
    <p>Web crawler</p>
</li>
</list>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayDeque;
import java.util.List;
import java.util.Queue;
\/
public class BreadthFirstSearch {
    private boolean[] marked;
    private int[] edgeTo;
    private int[] distanceTo;
\/
    public void bfs(UndirectedGraph graph, int startVertex) {
        marked = new boolean[graph.getNumVertices()];
        edgeTo = new int[graph.getNumVertices()];
        distanceTo = new int[graph.getNumVertices()];
\/
        Queue&lt;Integer&gt; queue = new ArrayDeque&lt;&gt;();
\/
        marked[startVertex] = true;
        distanceTo[startVertex] = 0;
        queue.offer(startVertex);
\/
        while (!queue.isEmpty()) {
            int currentVertex = queue.poll();
\/
            List&lt;List&lt;Integer&gt;&gt; adjList = graph.getAdjacencyList();
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
\/
    public int getDistance(int destination) {
        if (!marked[destination]) { 
            return -1; 
        }
        return distanceTo[destination];
    }
\/
    public void printPath(int start, int end) {
        if (start == end) {
            System.out.print(start);
            return;
        }
\/
        if (edgeTo[end] == 0) {
            System.out.print("No path exists");
            return;
        }
\/
        printPath(start, edgeTo[end]);
        System.out.print(" -&gt; " + end);
    }
}
    </code-block>
    </tab>
    <tab title="C++ (BreadthFirstSearch.h)">
    <code-block lang="c++" collapsible="true">
#ifndef BREADTHFIRSTSEARCH_H
#define BREADTHFIRSTSEARCH_H
#pragma once
\/
#include "UndirectedGraph.h"
#include &lt;vector&gt;
\/
class BreadthFirstSearch {
private:
    const UndirectedGraph& graph;
    int startVertex;
    std::vector&lt;bool&gt; marked;
    std::vector&lt;int&gt; edgeTo;
    std::vector&lt;int&gt; distanceTo;
\/
public:
    BreadthFirstSearch(const UndirectedGraph& graph, int startVertex);
    void bfs();
    [[nodiscard]] int getDistance(int destination) const;
    void printPath(int destination) const;
};
\/
#endif //BREADTHFIRSTSEARCH_H
    </code-block>
    </tab>
    <tab title="C++ (BreadthFirstSearch.cpp)">
    <code-block lang="c++" collapsible="true">
#include "BreadthFirstSearch.h"
#include &lt;iostream&gt;
#include &lt;queue&gt;
\/
BreadthFirstSearch::BreadthFirstSearch(const UndirectedGraph& graph, const int startVertex) :
    graph(graph), startVertex(startVertex),
    marked(graph.getNumVertices(), false),
    edgeTo(graph.getNumVertices(), -1),
    distanceTo(graph.getNumVertices(), 0) {}
\/
void BreadthFirstSearch::bfs() {
    std::queue&lt;int&gt; queue;
    marked[startVertex] = true;
    queue.push(startVertex);
\/
    while (!queue.empty()) {
        const int currentVertex = queue.front();
        queue.pop();
\/
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
\/
int BreadthFirstSearch::getDistance(const int destination) const {
    if (!marked[destination]) {
        return -1;
    }
    return distanceTo[destination];
}
\/
void BreadthFirstSearch::printPath(const int destination) const {
    if (startVertex == destination) {
        std::cout &lt;&lt; startVertex;
        return;
    }
\/
    if (edgeTo[destination] == -1) {
        std::cout &lt;&lt; "No path exists";
        return;
    }
\/
    printPath(edgeTo[destination]);
    std::cout &lt;&lt; " -&gt; " &lt;&lt; destination;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
from collections import deque
from DirectedGraph import DirectedGraph
import sys
\/
\/
class BreadthFirstSearch:
    def __init__(self, graph: DirectedGraph, start_vertex: int):
        self.marked = [False] * graph.get_num_vertices()
        self.edge_to = [None] * graph.get_num_vertices()
        self.distance_to = [sys.maxsize] * graph.get_num_vertices()
\/
        self.bfs(graph, start_vertex)
\/
    def bfs(self, graph: UndirectedGraph, start_vertex: int):
        queue = deque([start_vertex])
        self.marked[start_vertex] = True
        self.distance_to[start_vertex] = 0
\/
        while queue:
            current_vertex = queue.popleft()
\/
            for adjacent_vertex in graph.get_adjacency_list()[current_vertex]:
                if not self.marked[adjacent_vertex]:
                    self.marked[adjacent_vertex] = True
                    self.edge_to[adjacent_vertex] = current_vertex
                    self.distance_to[adjacent_vertex] = self.distance_to[current_vertex] + 1
                    queue.append(adjacent_vertex)
\/
    def get_distance(self, destination: int) -&gt; int:
        if not self.marked[destination]:
            return -1
        return self.distance_to[destination]
\/
    def print_path(self, start: int, end: int):
        if start == end:
            print(start, end="")
            return
\/
        if self.edge_to[end] is None:
            print("No path exists")
            return
\/
        self.print_path(start, self.edge_to[end])
        print(f" -&gt; {end}", end="")
    </code-block>
    </tab>
</tabs>

### 15.4 Topological Sort

<p><format color="DarkOrange">DAG:</format> Directed <format color
="OrangeRed">Acyclic</format> Graph.</p>

<p><format color="DarkOrange">Topological sort:</format> Redraw DAG
so all edges point upwards.</p>

<p><format color="BlueViolet">Property:</format> A digraph has a
topological order iff no directed cycle.</p>

<p><format color="BlueViolet">Application:</format> Precedence 
scheduling, cycle inheritance, spreadsheet recalculation, etc.</p>

#### 15.4.1 Algorithm &#8544; - Depth-First Search

<procedure title="Topological Sort with DFS">
<step>
    <p>Run depth-first search.</p>
</step>
<step>
    <p>Return vertices in reverse postorder.</p>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;
\/
public class TopologicalSort {
    private final DirectedGraph graph;
    private final boolean[] visited;
    private final Stack&lt;Integer&gt; postorder;
\/
    public TopologicalSort(DirectedGraph graph) {
        this.graph = graph;
        this.visited = new boolean[graph.getNumVertices()];
        this.postorder = new Stack&lt;&gt;();
    }
\/
    public List&lt;Integer&gt; topologicalSort() {
        for (int v = 0; v &lt; graph.getNumVertices(); v++) {
            if (!visited[v]) {
                dfs(v);
            }
        }
        List&lt;Integer&gt; sortedVertices = new ArrayList&lt;&gt;();
        while (!postorder.isEmpty()) {
            sortedVertices.add(postorder.pop());
        }
        return sortedVertices;
    }
\/
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
    </code-block>
    </tab>
    <tab title="C++ (TopologicalSort.h)">
    <code-block lang="c++" collapsible="true">
#ifndef TOPOLOGICALSORT_H
#define TOPOLOGICALSORT_H
#pragma once
\/
#include "DirectedGraph.h"
#include &lt;vector&gt;
#include &lt;stack&gt;
\/
class TopologicalSort {
private:
    const DirectedGraph& graph;
    std::vector&lt;bool&gt; visited;
    std::stack&lt;int&gt; postorder;
\/
    void dfs(int v);
\/
public:
    explicit TopologicalSort(const DirectedGraph& graph);
    std::vector&lt;int&gt; topologicalSort();
};
\/
#endif //TOPOLOGICALSORT_H
    </code-block>
    </tab>
    <tab title="C++ (TopologicalSort.cpp)">
    <code-block lang="c++" collapsible="true">
#include "TopologicalSort.h"
\/
TopologicalSort::TopologicalSort(const DirectedGraph &graph) :
    graph(graph), visited(graph.getNumVertices(), false) {}
\/
void TopologicalSort::dfs(const int v) {
    visited[v] = true;
    for (const int& neighbor : graph.getAdjacencyList()[v]) {
        if (!visited[neighbor]) {
            dfs(neighbor);
        }
    }
    postorder.push(v);
}
\/
std::vector&lt;int&gt; TopologicalSort::topologicalSort() {
    for (int v = 0; v &lt; graph.getNumVertices(); ++v) {
        if (!visited[v]) {
            dfs(v);
        }
    }
\/
    std::vector&lt;int&gt; sortedVertices;
    while (!postorder.empty()) {
        sortedVertices.push_back(postorder.top());
        postorder.pop();
    }
    return sortedVertices;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class TopologicalSort:
    def __init__(self, graph):
        self.graph = graph  # Store the DirectedGraph object
        self.visited = [False] * self.graph.get_num_vertices()
        self.postorder = []
\/
    def topological_sort(self):
        for v in range(self.graph.get_num_vertices()):
            if not self.visited[v]:
                self.dfs(v)
        return self.postorder[::-1]
\/
    def dfs(self, v):
        self.visited[v] = True
        for neighbor in self.graph.adjacency_list[v]:
            if not self.visited[neighbor]:
                self.dfs(neighbor)
        self.postorder.append(v) 
    </code-block>
    </tab>
</tabs>

#### 15.4.2 Algorithm &#8545; - Kahn's Algorithm

<procedure title="Topological Sort with Kahn's Algorithm">
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

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
\/
public class TopologicalSort {
\/
    public static List&lt;Integer&gt; topologicalSort(DirectedGraph graph) {
        int numVertices = graph.getNumVertices();
        List&lt;List&lt;Integer&gt;&gt; adjList = graph.getAdjacencyList();
\/
        int[] inDegree = new int[numVertices];
        for (int u = 0; u &lt; numVertices; u++) {
            for (int v : adjList.get(u)) {
                inDegree[v]++;
            }
        }
\/
        Queue&lt;Integer&gt; queue = new LinkedList&lt;&gt;();
        for (int i = 0; i &lt; numVertices; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
\/
        List&lt;Integer&gt; sortedOrder = new ArrayList&lt;&gt;();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            sortedOrder.add(u);
\/
            for (int v : adjList.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.offer(v);
                }
            }
        }
\/
        if (sortedOrder.size() != numVertices) {
            System.err.println("Error: Graph contains a cycle!");
            return new ArrayList&lt;&gt;();
        }
\/
        return sortedOrder;
    }
}
    </code-block>
    </tab>
    <tab title="C++">
    <code-block lang="c++" collapsible="true">
#include "DirectedGraph.h"
#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;vector&gt;
\/
std::vector&lt;int&gt; topologicalSort(const DirectedGraph& graph) {
    const int numVertices = graph.getNumVertices();
    std::vector&lt;int&gt; inDegree(numVertices, 0);
    std::vector&lt;int&gt; sortedOrder;
    std::queue&lt;int&gt; queue;
\/
    for (int u = 0; u &lt; numVertices; ++u) {
        for (const int& v : graph.getAdjacencyList()[u]) {
            inDegree[v]++;
        }
    }
\/
    for (int i = 0; i &lt; numVertices; ++i) {
        if (inDegree[i] == 0) {
            queue.push(i);
        }
    }
\/
    while (!queue.empty()) {
        int u = queue.front();
        queue.pop();
        sortedOrder.push_back(u);
\/
        for (const int& v : graph.getAdjacencyList()[u]) {
            if (--inDegree[v] == 0) {
                queue.push(v);
            }
        }
    }
\/
    // Check for cycles!
    if (sortedOrder.size() != numVertices) {
        std::cerr &lt;&lt; "Error: Graph contains a cycle!" &lt;&lt; std::endl;
        return {};
    }
\/
    return sortedOrder;
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
def topological_sort(graph):
    num_vertices = graph.get_num_vertices()
    in_degree = [0] * num_vertices
    sorted_order = []
    queue = []
\/
    for u in range(num_vertices):
        for v in graph.adjacency_list[u]:
            in_degree[v] += 1
\/
    for i in range(num_vertices):
        if in_degree[i] == 0:
            queue.append(i)
\/
    while queue:
        u = queue.pop(0)
        sorted_order.append(u)
\/
        for v in graph.adjacency_list[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
\/
    if len(sorted_order) != num_vertices:
        return None  
\/
    return sorted_order
    </code-block>
    </tab>
</tabs>

### 15.5 Strong Components

<table style="both">
<tr>
    <td></td>
    <td>Connected Components</td>
    <td>Strongly-Connected Components</td>
</tr>
<tr>
    <td>Definition</td>
    <td><math>v</math> and <math>w</math> are <format color="OrangeRed">
    connected</format> if there is a path between <math>v</math> and 
    <math>w</math></td>
    <td><math>v</math> and <math>w</math> are <format color="OrangeRed">
    strongly connected</format> if there is a directed path from 
    <math>v</math> to <math>w</math> and a directed graph from 
    <math>w</math> to <math>v</math></td>
</tr>
<tr>
    <td>Implementation</td>
    <td>DFS</td>
    <td>DFS & Reverse DFS</td>
</tr>
<tr>
    <td>Detail</td>
    <td><img src="../images_data/d15-5-1.png" alt="Connected Components"/>
    </td>
    <td><img src="../images_data/d15-5-2.png" alt="Strongly-Connected 
    Components"/></td>
</tr>
</table>

<procedure title="Strongly-Connected Components">
<step>
    <p>Computer topological order (reverse postorder) in kernel DAG.</p>
</step>
<step>
    <p>Run DFS, considering vertices in reverse topological order.</p>
</step>
</procedure>

<tabs>
    <tab title="Java">
    <code-block lang="java" collapsible="true">
import java.util.Stack;
\/
public class StronglyConnectedComponents {
\/
    private final DirectedGraph graph;
    private boolean[] visited;
    private final Stack&lt;Integer&gt; stack;
    private int sccCount;
\/
    public StronglyConnectedComponents(DirectedGraph graph) {
        this.graph = graph;
        this.visited = new boolean[graph.getNumVertices()];
        this.stack = new Stac&lt;&gt;();
        this.sccCount = 0;
    }
\/    
    public void findStronglyConnectedComponents() {
        for (int i = 0; i &lt; graph.getNumVertices(); i++) {
            if (!visited[i]) {
                dfsFirst(i);
            }
        }
\/
        DirectedGraph transposedGraph = transposeGraph();
\/
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
\/
    private void dfsFirst(int vertex) {
        visited[vertex] = true;
        for (int neighbor : graph.getAdjacencyList().get(vertex)) {
            if (!visited[neighbor]) {
                dfsFirst(neighbor);
            }
        }
        stack.push(vertex);
    }
\/
    private void dfsSecond(DirectedGraph transposedGraph, int vertex) {
        visited[vertex] = true;
        System.out.print(vertex + " ");
        for (int neighbor : transposedGraph.getAdjacencyList().get(vertex)) {
            if (!visited[neighbor]) {
                dfsSecond(transposedGraph, neighbor);
            }
        }
    }
\/
    private DirectedGraph transposeGraph() {
        DirectedGraph transposedGraph = new DirectedGraph(graph.getNumVertices());
        for (int i = 0; i &lt; graph.getNumVertices(); i++) {
            for (int neighbor : graph.getAdjacencyList().get(i)) {
                transposedGraph.addEdge(neighbor, i);
            }
        }
        return transposedGraph;
    }
}
    </code-block>
    </tab>
    <tab title="C++ (StronglyConnectedComponents.h)">
    <code-block lang="c++" collapsible="true">
#ifndef STRONGLYCONNECTEDCOMPONENTS_H
#define STRONGLYCONNECTEDCOMPONENTS_H
#pragma once
\/
#include "DirectedGraph.h"
#include &lt;vector&gt;
#include &lt;stack&gt;
\/
class StronglyConnectedComponents {
private:
    const DirectedGraph& graph;
    std::vector&lt;bool&gt; visited;
    std::stack&lt;int&gt; finishingStack;
    int sccCount;
\/
    void dfsFirst(int vertex);
    void dfsSecond(const DirectedGraph& transposedGraph, int vertex);
\/
public:
    explicit StronglyConnectedComponents(const DirectedGraph& graph);
    void findStronglyConnectedComponents();
};
\/
#endif //STRONGLYCONNECTEDCOMPONENTS_H
    </code-block>
    </tab>
    <tab title="C++ (StronglyConnectedComponents.cpp)">
    <code-block lang="c++" collapsible="true">
#include "StronglyConnectedComponents.h"
#include &lt;iostream&gt;
\/
StronglyConnectedComponents::StronglyConnectedComponents(const DirectedGraph& graph) :
    graph(graph), visited(graph.getNumVertices(), false), sccCount(0) {}
\/
void StronglyConnectedComponents::dfsFirst(int vertex) {
    visited[vertex] = true;
    for (const int& neighbor : graph.getAdjacencyList()[vertex]) {
        if (!visited[neighbor]) {
            dfsFirst(neighbor);
        }
    }
    finishingStack.push(vertex);
}
\/
void StronglyConnectedComponents::dfsSecond(const DirectedGraph& transposedGraph, int vertex) {
    visited[vertex] = true;
    std::cout &lt;&lt; vertex &lt;&lt; " ";
    for (const int& neighbor : transposedGraph.getAdjacencyList()[vertex]) {
        if (!visited[neighbor]) {
            dfsSecond(transposedGraph, neighbor);
        }
    }
}
\/
void StronglyConnectedComponents::findStronglyConnectedComponents() {
    for (int i = 0; i &lt; graph.getNumVertices(); ++i) {
        if (!visited[i]) {
            dfsFirst(i);
        }
    }
\/        
    DirectedGraph transposedGraph(graph.getNumVertices());
    for (int i = 0; i &lt; graph.getNumVertices(); ++i) {
        for (const int& neighbor : graph.getAdjacencyList()[i]) {
            transposedGraph.addEdge(neighbor, i);
        }
    }
\/
    visited.assign(graph.getNumVertices(), false); 
    while (!finishingStack.empty()) {
        int vertex = finishingStack.top();
        finishingStack.pop();
\/
        if (!visited[vertex]) {
            std::cout &lt;&lt; "SCC " &lt;&lt; ++sccCount &lt;&lt; ": ";
            dfsSecond(transposedGraph, vertex);
            std::cout &lt;&lt; std::endl;
        }
    }
}
    </code-block>
    </tab>
    <tab title="Python">
    <code-block lang="python" collapsible="true">
class StronglyConnectedComponents:
    def __init__(self, graph):
        self.graph = graph
        self.visited = [False] * graph.num_vertices
        self.finishing_stack = []
        self.scc_count = 0
\/
    def dfs_first(self, vertex):
        self.visited[vertex] = True
        for neighbor in self.graph.adjacency_list[vertex]:
            if not self.visited[neighbor]:
                self.dfs_first(neighbor)
        self.finishing_stack.append(vertex)
\/
    def dfs_second(self, transposed_graph, vertex):
        self.visited[vertex] = True
        print(f"{vertex} ", end="")
        for neighbor in transposed_graph.adjacency_list[vertex]:
            if not self.visited[neighbor]:
                self.dfs_second(transposed_graph, neighbor)
\/
    def find_strongly_connected_components(self):
        # 1. DFS on original graph to get finishing times
        for i in range(self.graph.num_vertices):
            if not self.visited[i]:
                self.dfs_first(i)
\/
        transposed_graph = DirectedGraph(self.graph.num_vertices)
        for i in range(self.graph.num_vertices):
            for neighbor in self.graph.adjacency_list[i]:
                transposed_graph.add_edge(neighbor, i)
\/
        self.visited = [False] * self.graph.num_vertices
        while self.finishing_stack:
            vertex = self.finishing_stack.pop()
            if not self.visited[vertex]:
                self.scc_count += 1
                print(f"SCC {self.scc_count}: ", end="")
                self.dfs_second(transposed_graph, vertex)
                print()
    </code-block>
    </tab>
</tabs>

