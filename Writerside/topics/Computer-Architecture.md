<show-structure for="chapter" depth="3"></show-structure>

# Computer Architecture

```mermaid
stateDiagram-v2
    State1: Higher-Level Language Program (e.g. C)
    State1 --> State2: Compiler
    State2: Assembly Language Program (e.g. RISC-V)
    State2 --> State3: Assembler
    State3: Machine Language Program (e.g. RISC-V)
    State3 --> State4: Machine Interpretation
    State4: Hardware Architecture Description (e.g. block diagrams)
    State4 --> State5: Architecture Implementation
    State5: Logic Circuit Description (Circuit Schematic Diagrams)
```

## &#8544; C Programming

### 1 Introduction to C

<p>For this part, please refer to <a href = "C-Programming.md" 
anchor = "intro" summary = "C++ Introduction">introduction in
C++ programming</a> for more details.</p>

### 2 C Memory Layout

<p>Program's <format color = "OrangeRed" style = "italic">address space
</format> contains 4 regions: </p>
<list>
<li>
<p><format color = "Fuchsia">Stack:</format> local variables,
grow downwards.</p>
</li>
<li>
<p><format color = "Fuchsia">Heap:</format> space requested via
<code>malloc()</code> and used with pointers; resizes dynamically, 
grow upward.</p>
</li>
<li>
<p><format color = "Fuchsia">Static Data:</format> global or
static variables, does not grow or shrink.</p>
</li>
<li>
<p><format color = "Fuchsia">Code:</format> loaded when program 
starts, does not change.</p>
</li>
</list>

<img src = "../images_architecture/1-1.png" alt = "C Memory Layout"/>

<p><format color = "DodgerBlue">Storage:</format> </p>

<list>
<li>
<p><format color = "Fuchsia">Declared outside a function:
</format> Static Data</p>
</li>
<li>
<p><format color = "Fuchsia">Declared inside a function:
</format> Stack</p>
<list type = "bullet">
<li>
<p><code>main()</code> is a function.</p>
</li>
<li>
<p>freed when function returns.</p>
</li>
</list>
</li>
<li>
<p><format color = "Fuchsia">Dynamically allocated (i.e., 
<code>malloc</code>, <code>calloc</code> & <code>realloc</code>):
</format> Heap.</p>
</li>
</list>

#### 2.1 Stack

<list type = "bullet">
<li>
<p>A stack frame includes: </p>
<list type = "bullet">
<li>
<p>Location of caller function</p>
</li>
<li>
<p>Function arguments</p>
</li>
<li>
<p>Space for local variables</p>
</li>
</list>
</li>
<li>
<p>Stack pointer (SP) tells where lowest (current) stack frame is.</p>
</li>
<li>
<p>When procedure ends, stack pointer is moved back (but data remains
(<format color = "OrangeRed">garbage!</format>)); frees memory for 
future stack frames;</p>
</li>
</list>

#### 2.2 Static Data

<list type = "bullet">
<li>
<p>Place for variables that persist, and data doesn't subject to 
comings and goings like function calls, e.g. string literals,
global variables.</p>
</li>
<li>
<p>String literal example: <code>char * str = “hi”</code>.</p>
</li>
<li>
<p>Size does not change, but sometimes data can be writable.</p>
</li>
</list>

<warning>
<p>String literals cannot change!</p>
</warning>

#### 2.3 Code

<list type = "bullet">
<li>
<p>Copy of your code goes here, C code becomes data too!</p>
</li>
<li>
<p>Does (should) not change, typically read-only.</p>
</li>
</list>

#### 2.4 Addressing & Endianness

<p><format color = "DodgerBlue">Addresses:</format> </p>

<list type = "bullet">
<li>
<p>The size of an address (and thus, the size of a pointer) in bytes
depends on architecture. For 64-bit system, the size of an address is 8 
bytes, and the system has <math>2 ^ {64}</math> possible addresses.</p>
</li>
<li>
<p>If a machine is <format style = "bold">byte-addressed</format>, 
then each of its addresses points to a unique <format style = "bold">
byte</format>.</p>
</li>
</list>

<p><format color = "DodgerBlue">Endianness:</format> </p>

<img src = "../images_architecture/1-2.png" alt = "Endianness"/>

<list type = "bullet">
<li>
<p><format color = "Chartreuse">Big Endian:</format> Descending 
numerical significance with ascending memory addresses.</p>
</li>
<li>
<p><format color = "Chartreuse">Little Endian:</format> Ascending 
numerical significance with ascending memory addresses.</p>
</li>
</list>

<warning>
<p>Endianess ONLY APPLIES to values that occupy multiple bytes.</p>
<p>Endianness refers to STORAGE IN MEMORY NOT number representation.
</p>
</warning>

#### 2.5 Heap

<p>Dynamically allocated memory goes on the 
<format color = "OrangeRed">Heap</format>, more permanent and 
persistent than Stack.</p>

<list type = "alpha-lower">
<li>
    <p><format color = "Fuchsia">malloc(n)</format></p>
    <list type = "bullet">
    <li>
    <p>Allocates a continuous block of <format style = "bold, italic">
    n bytes</format> of uninitialized memory (contains garbage!)</p>
    </li>
    <li>
    <p>Returns a pointer to the beginning of an allocated block; NULL 
    indicates failed request (check for this!)</p>
    </li>
    <li>
    <p><code>int *p = (int *) malloc(n * sizeof(int))</code></p>
    </li>
    <li>
    <p><code>sizeof()</code> makes code more portable.</p>
    </li>
    <li>
    <p><code>malloc()</code> returns <code>void *</code>; typecast
    will help you catch coding errors when pointer types don't match.
    </p>
    </li>
    </list>
</li>
<li>
<p><format color = "Fuchsia">calloc(n, size)</format></p>
    <list type = "bullet">
    <li>
    <p><code>void* calloc(size_t nmemb, size_t size)</code></p>
    </li>
    <li>
    <p>nmemb is the number of the members</p>
    </li>
    <li>
    <p>size is the size of each member</p>
    </li>
    <li>
    <p>Example for allocating space for 5 integers.</p>
    <code-block lang = "C++">
    int *p = (int*)calloc(5, sizeof(int));
    </code-block>
    </li>
    </list>
</li>
<li>
<p><format color = "Fuchsia">realloc()</format></p>
    <list type = "bullet">
    <li>
    <p>Use it when you need more or less memory in an array.</p>
    </li>
    <li>
    <p><code>void *realloc(void *ptr, size_t size)</code></p>
    </li>
    <li>
    <p>Takes in a ptr that has been the return of malloc/calloc/realloc
    and a new size.</p>
    </li>
    <li>
    <p>Returns a pointer with now size space (or NULL) and copies any 
    content from ptr.</p>
    </li>
    <li>
    <p>Realloc can move or keep the address same, so DO NOT rely on old
    ptr values.</p>
    </li>
    </list>
</li>
<li>
<p><format color = "Fuchsia">free()</format></p>
    <list type = "bullet">
    <li>
    <p>Release memory on the heap: Pass the pointer p to the 
    beginning of allocated block; releases the whole block.</p>
    </li>
    <li>
    <p>p must be the address <format style = "italic">originally
    </format> returned by m/c/realloc(), otherwise throws system 
    exception.</p>
    </li>
    <li>
    <p>Don't call <code>free()</code> on a block that has already been
    released or on NULL.</p>
    </li>
    <li>
    <p>Make sure you don't lose the original address.</p>
    </li>
    </list>
</li>
</list>

## &#8545; Assembly Language

### 3 Introduction to Assembly Language

<p><format color = "Chartreuse">Assembly:</format> (also known as 
Assembly language, ASM) A low-level programming language where the 
program instructions match a particular architecture's operations.
</p>

<p><format color = "DodgerBlue">Properties:</format> </p>

<list type = "bullet">
<li>
<p>Splits a program into many small instructions that each do one 
single part of the process.</p>
</li>
<li>
<p>Each architecture will have a different set of operations that it 
supports (although there are similarities).</p>
</li>
<li>
<p>Assembly is not <format style = "italic">portable</format> to other
architectures.</p>
</li>
</list>

<p><format color = "DodgerBlue">Complex/Reduced Instruction Set 
Computing</format></p>

<list type = "alpha-lower">
<li>
<p>Early trend - add more and more instructions to do elaborate 
operations</p>
<p><format color = "Fuchsia">Complex Instruction Set Computing (CISC)
</format></p>
    <list type = "bullet">
    <li>
    <p>Difficult to learn and comprehend language</p>
    </li>
    <li>
    <p>Less work for the compiler</p>
    </li>
    <li>
    <p>Complicated hardware runs more slowly</p>
    </li>
    </list>
</li>
<li>
<p>Opposite philosophy later began to dominate</p>
<p><format color = "Fuchsia">Reduced Instruction Set Computing (RISC)
</format></p>
    <list type = "bullet">
    <li>
    <p>Simple (and smaller) instruction set makes it easier to build 
    fast hardware.</p>
    </li>
    <li>
    <p>Let software do the complicated operations by composing simpler 
    ones.</p>
    </li>
    </list>
</li>
</list>
