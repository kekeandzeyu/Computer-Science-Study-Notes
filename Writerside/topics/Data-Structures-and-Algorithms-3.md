<show-structure for="chapter" depth="3"></show-structure>

# Part &#8546;

<secondary-label ref="beta"></secondary-label>
<secondary-label ref="wip"></secondary-label>

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

### 20.1 R-Way Tries

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

### 20.2 Ternary Search Tries

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