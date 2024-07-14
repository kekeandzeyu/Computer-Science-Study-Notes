<show-structure for="chapter" depth="3"></show-structure>

# Computer Architecture

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
<p><format color = "BlanchedAlmond">Stack:</format> local variables,
grow downwards.</p>
</li>
<li>
<p><format color = "BlanchedAlmond">Heap:</format> space requested via
<code>malloc()</code> and used with pointers; resizes dynamically, 
grow upward.</p>
</li>
<li>
<p><format color = "BlanchedAlmond">Static Data:</format> global or
static variables, does not grow or shrink.</p>
</li>
<li>
<p><format color = "BlanchedAlmond">Code:</format> loaded when program 
starts, does not change.</p>
</li>
</list>

<img src = "../images_architecture/1-1.png" alt = "C Memory Layout"/>

<p><format color = "DodgerBlue">Storage:</format> </p>

<list>
<li>
<p><format color = "BlanchedAlmond">Declared outside a function:
</format> Static Data</p>
</li>
<li>
<p><format color = "BlanchedAlmond">Declared inside a function:
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
<p><format color = "BlanchedAlmond">Dynamically allocated (i.e., 
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
<p><format color = "BlanchedAlmond">malloc(n)</format></p>
<list type = "bullet">
<li>
<p>Allocates a continuous block of <format style = "bold, italic">
n bytes</format> of uninitialized memory (contains garbage!)</p>
</li>
<li>
<p>Returns a pointer to the beginning of an allocated block; NULL 
indicates failed request (check for this!)</p>
</li>
</list>
</li>
</list>