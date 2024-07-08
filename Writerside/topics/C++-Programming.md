<show-structure for="chapter" depth="3"/>

# C++ Programming

## &#8544; C++ Fundamentals

### 1 C & C++ Introduction

<p><format color = "DodgerBlue">Properties: </format></p>

<list type = "bullet">
<li>
<p>C++ is a <format color = "OrangeRed">compiled</format> language.</p>
</li>
<li>
<p>C++ <format style = "italic">compilers</format> map C++ programs
into architecture-specific machine code (string of 0s and 1s).</p>
<list type = "bullet">
<li>
<p>Unlike Java, which converts to architecture-independent bytecode (
run by JVM => Java Virtual Machine).</p>
</li>
<li>
<p>Unlike Python, which directly <format style = "italic">interprets
</format> the code.</p>
</li>
<li>
<p>Main difference is when your program is mapped to low-level machine
instructions, CPU will directly interprets and runs.</p>
</li>
</list>
</li>
</list>

<p><format color = "DodgerBlue">Compilation Advantages: </format></p>

<list>
<li>
<p><format color = "BlanchedAlmond">Excellent run-time performance: 
</format></p>
<p>Generally much faster than Python or Java for comparable code because
it <format color = "OrangeRed">optimizes for the given architecture
</format>.</p>
</li>
<li>
<p><format color = "BlanchedAlmond">Fair compilation time: 
</format></p>
<p>Enhancements in compilation procedure (Makefiles) allow us to
<format color = "OrangeRed">recompile only the modified files</format>
.</p>
</li>
</list>

<p><format color = "DodgerBlue">Compilation Advantages: </format></p>

<list type = "bullet">
<li>
<p>Compiled files, including the executable, are arcitecture-specific.
(CPU type and OS)</p>
<list type = "bullet">
<li>
<p>Executable must be <format color = "OrangeRed">rebuilt</format> 
on each new system.</p>
</li>
<li>
<p>i.e. "porting your code" to a new architecture.</p>
</li>
</list>
</li>
<li>
<p>Instead of "Edit -> Run [repeat]" cycle, "Edit -> Compile -> Run
[repeat]" iteration cycle can be slow.</p>
</li>
</list>

### 2 Streams

#### 2.1 Strings

```C++
std::string str = "Hello, World!";
std::cout << str[1] << std::endl; // e
str[1] = 'a'; // Hallo, World!

std::cout << "[" << std::setw(3) << "It" << "]" <<std::endl; // [ It]
std::cout << "[" << std::left << std::setw(3) << "It" << "]" <<std::endl; // [It ]
std::cout << "[" << std::left << std::setfill('-') << std::setw(3) << "It" << "]" <<std::endl; // [It-]
```

#### 2.2 Stringstreams

<list>
<li>
<p>Constructors with initialtext in the buffer.</p>
</li>
<li>
<p>Can optionally provide &quot;modes&quot; such as ate (start at end) or
bin (read as binary).</p>
</li>
</list>

##### 2.2.1 Output Stringstreams

```C++
std::ostringstream oss("Ito-En Green Tea");
std::cout << oss.str() << std::endl; // Ito-En Green Tea
oss << "16.9 Ounces";
std::cout << oss.str() << std::endl; // 16.9 Ouncesn Tea 

std::ostringstream oss("Ito-En Green Tea", std::ostringstream::ate);
oss << "16.9 Ounces";
std::cout << oss.str() << std::endl; // Ito-En Green Tea16.9 Ounces
```

##### 2.2.2 Input Stringstreams

<warning>
<p>Types matter! Stream stops reading at any whitespace or any invalid
character for the type.</p>
</warning>

```C++
std::istringstream iss("16.9 Ounces");
double amount;
std::string unit;
iss >> amount >> unit; // amount = 16.9, unit = Ounces

std::istringstream iss("16.9 Ounces");
int amount;
std::string unit;
iss >> amount >> unit; // amount = 16, unit = ".9"
```

##### 1.2.3 State Bits

<list>
<li>
<p>Good bit - ready for read/write. (Nothing unusal, on when other bits
are off)</p>
</li>
<li>
<p>Fail bit - previous operation failed, all future operations frozen.
(Type mismatch, file can't be opened, seekg failed)</p>
</li>
<li>
<p>EOF bit - previous operation reached the end of buffer content.
(Reached the end of buffer)</p>
</li>
<li>
<p>Bad bit - external error, like irrecoverable.(e.g. the file you are 
reading from suddenly is deleted)</p>
</li>
</list>

<note>
<p>Good and bad are not opposites! (e.g. type mismatch)</p>
<p>Good and fail are not opposites! (e.g. end of file)</p>
<p>Fail and EOF are normally the ones you will be checking.</p>
</note>

```C++
std::istringstream iss("17");
int amount;
iss >> amount;
std::cout << (iss.eof() ? "EOF" : "Not EOF") << std::endl;
// There also exist iss.good(), iss.fail() & iss.bad()
```

#### 1.3 cin and cout

<list type = "bullet">
<li>
<p>The program hangs and waits for user input when the position
reaches EOF, past the last token in the buffer.</p>
</li>
<li>
<p>The position pointer skips whitespace <format color = "Red">after</format> 
the token with each &gt;&gt; operation.</p>
</li>
<li>
<p>The position pointer does the following:</p>
<list type = "bullet">
<li>
<p>consume all whitespaces (spaces, newlines, etc.)</p>
</li>
<li>
<p>reads as many characters until:</p>
<list type = "bullet">
<li>a whitespace is reached, or…</li>
<li>for primitives, the maximum number of bytes necessary to form a valid variable.</li>
<li>example: if we extract an int from “86.2”, we’ll get 86, with pos at the decimal point.</li>
</list>
</li>
</list>
</li>
</list>

### 2 Modern C++ Types

#### 2.1 auto

<list type = "bullet">
<li>
<p>When a type name is too long and a simpler alias makes the
code more readable, use it.</p>
</li>
<li>
<p>In libraries there is a common name for a type within each
class. Example:</p>
<list tyep = "bullet">
<li>
<p>vector::iterator, map::iterator, string::iterator</p>
</li>
<li>
<p>vector::reference, map::reference, string::reference</p>
</li>
</list>
</li>
</list>

<warning>
<p>Auto discards const and references!</p>
</warning>

#### 2.2 Pair/Tuple

<note>
<p>Remember to include &lt; utility &gt; and &lt; tuple &gt;</p>
</note>

```C++
    // make_pair/tuple (C++ 11) automatically deduces the type!
    auto prices = std::make_pair(3.4, 5);
    auto values = std::make_tuple(3, 4, "hi");

    // access via get/set
    prices.first = prices.second;           // prices = {5, 5}
    get<0>(values) = get<1>(values);  // values = {4, 4, "hi"}

    // structured binding (C++ 17) - extract each binding
    auto [a, b] = prices;       // a = 5, b = 5
    const auto& [c, d, e] = values; // c = 4, d = 4, e = "hi"
```

#### 2.3 Conversions

```C++
int v1 = static_cast<double>(3.14);
double v2 = 6;
```

```C++
const int v3 = 3;
int* v4 = const_cast<int*> (&v3);
```

#### 2.4 initializer_list

<p><format color = "DodgerBlue">Definition</format>: An initializer 
list is a lightweight vector that can be used as a parameter.</p>

```C++
#include <iostream>
#include <vector>
#include <initializer_list>

class MyContainer {
private:
    std::vector<int> data; 

public:
    // Constructor using initializer_list
    MyContainer(std::initializer_list<int> values) {
        // Iterate through the initializer_list and populate the vector
        for (int value : values) {
            data.push_back(value);
        }
    }

    void print() const {
        for (int value : data) {
            std::cout << value << " ";
        }
        std::cout << std::endl;
    }
};

int main() {
    // Using initializer_list to initialize MyContainer
    MyContainer container1 = {1, 2, 3, 4, 5}; 
    container1.print();  

    MyContainer container2{6, 7, 8};
    container2.print(); 

    return 0;
}
```

<warning><p>C++ 11 provides a uniform initialization syntax. Using the uniform 
initialization syntax, the initializer list constructor is preferred 
over constructor.</p></warning>

```C++
std::vector<int> v1(3, 10) // v1 = {10, 10, 10}
std::vector<int> v2{3, 10} // v2 = {3, 10}
```

## &#8545; Standard Template Library (STL)



## &#8546; Object-Oriented Programming

### 3. Inheritance

<p><format color = "DodgerBlue">Definition:</format> </p>

<list>
<li>
<p><format color = "Chartreuse">Hypernym</format>: A word with a broad 
meaning constituting a category into which words with more specific 
meanings fall.</p>
</li>
<li>
<p><format color = "Chartreuse">Hyponym</format>: Opposite of hypernym.
</p>
</li>
</list>

<p>For example, tree is hyponym of plant, and plant is hypernym of 
tree.</p>

#### 3.1 Overriding and Overloading

<p><format color = "DodgerBlue">Definition:</format> </p>

<list type = "bullet">
<li>
<p><format color = "Chartreuse">Overloading</format>: Methods with the
same name but different signature.</p>
</li>
<li>
<p><format color = "Chartreuse">Overriding</format>: A subclass to 
provide a specific implementation of a method that is already provided 
by its parent class or interface.</p>
</li>
</list>

<note>
<p>This is an implementation of overloading in the same class.</p>
</note>

Java

```Java
    // part of code from Quicksort
    public static void sort(Comparable[] a) {
        sort(a, 0, a.length - 1);
    }

    private static void sort(Comparable[] a, int lo, int hi) {
        if (hi <= lo) return;
        int j = partition(a, lo, hi);
        sort(a, lo, j - 1);
        sort(a, j + 1, hi);
    }
```

<note>
<p>This is an implementation of overloading in different classes.</p>
</note>

Java

```Java
class Shape {
    public void calculateArea(int side) { 
        System.out.println("Area of a square: " + (side * side)); 
    }
}

class Rectangle extends Shape {
    public void calculateArea(int length, int width) {
        System.out.println("Area of a rectangle: " + (length * width));
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle myRectangle = new Rectangle();

        myRectangle.calculateArea(5);      // Calls Shape's calculateArea (inherited)
        myRectangle.calculateArea(4, 6);  // Calls Rectangle's calculateArea (overloaded)
    }
}
```

<note>
<p>This is an implementation of overriding.</p>
</note>

Java

```Java
interface Animal { 
    void makeSound(); // Abstract method declaration
}

class Dog implements Animal { // Implementing the interface
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat implements Animal { // Implementing the interface
    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();       
        Animal myCat = new Cat();       

        myDog.makeSound();    // Output: Woof!
        myCat.makeSound();    // Output: Meow!
    }
}
```

<tip>
<p>For Java, better use <code>@Override</code> !</p>
<p><format color = "DodgerBlue">Reasons:</format> </p>
<list type = "bullet">
<li>
<p><format color = "BlanchedAlmond">Protect against typos:</format> If 
you say <code>@Override</code>, but the method isn't actually overriding 
anything, you will get a compile error.</p>
</li>
<li>
<p><format color = "BlanchedAlmond">Reminder:</format> Reminds programmer
that method definition came from somewhere higher up in the inheritance
hierarchy.</p>
</li>
</list>
</tip>

#### 3.2 Types of Inheritance (Java)

<list type = "alpha-lower">

<li>
<p><format color = "Chartreuse">Interface Inheritance: </format></p>
<p>Specifying the capabilities of a subclass using the 
<code>implements</code> keyword is known as 
<format style = "underline, bold">interface inheritance</format>.</p>

<list type = "bullet">
<li>
<p><format color = "Chartreuse">Interface:</format> The list of all 
method signatures.</p>
</li>
<li>
<p><format color = "Chartreuse">Inheritance:</format> The subclass 
"inherits" the interface from a superclass.</p>
</li>
<li>
<p>Specifies what the subclass can do, but not how.</p>
</li>
<li>
<p>Subclasses <format style = "underline">must</format> override all
of these methods, will fail to compile otherwise!</p>
</li>
</list>
</li>

<li>
<p><format color = "Chartreuse">Implementation Inheritance:</format> 
Subclasses can inherit signatures AND implementation.</p>
</li>

</list>

Java

```Java
interface Animal {
    default void makeSound() {
        System.out.println("Generic animal sound");
    }

    void eat(); 
}

class Dog implements Animal {
    @Override
    public void eat() {
        System.out.println("Dog is eating");
    }
}

class Cat implements Animal {
    @Override
    public void eat() {
        System.out.println("Cat is eating");
    }

    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        Cat myCat = new Cat();

        myDog.makeSound(); // Output: Generic animal sound (using default)
        myDog.eat();      // Output: Dog is eating

        myCat.makeSound(); // Output: Meow! (overridden)
        myCat.eat();      // Output: Cat is eating
    }
}
```

<table style = "header-row">
<tr><td>Compile-time Type</td><td>Run-time Type</td></tr>
<tr><td>Static type, specified at <format style = "bold">declaration
</format></td><td>Dynamic type, specified at <format style = "bold">
instantiation</format></td></tr>
<tr><td>Never changes</td><td>Equal to the type of object being pointed
at</td></tr>
</table>



## &#8547; Modern C++