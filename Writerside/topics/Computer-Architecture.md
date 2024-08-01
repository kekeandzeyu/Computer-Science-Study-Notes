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

<img src = "../images_architecture/2-1-1.png" alt = "C Memory Layout"/>

<p><format color = "BlueViolet">Storage:</format> </p>

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

<p><format color = "BlueViolet">Addresses:</format> </p>

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

<p><format color = "BlueViolet">Endianness:</format> </p>

<img src = "../images_architecture/2-4-1.png" alt = "Endianness"/>

<list type = "bullet">
<li>
<p><format color = "DarkOrange">Big Endian:</format> Descending 
numerical significance with ascending memory addresses.</p>
</li>
<li>
<p><format color = "DarkOrange">Little Endian:</format> Ascending 
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

#### 3.1 Assembly Language

<p><format color = "DarkOrange">Assembly:</format> (also known as 
Assembly language, ASM) A low-level programming language where the 
program instructions match a particular architecture's operations.
</p>

<p><format color = "BlueViolet">Properties:</format> </p>

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

<p><format color = "BlueViolet">Complex/Reduced Instruction Set 
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

<p><format color = "BlueViolet">Code:</format> </p>

<p>op dst, src1, src2</p>

<list type = "bullet">
<li>
<p><code>op</code>: operation name ("operator")</p>
</li>
<li>
<p><code>dst</code>: register getting result ("destination")</p>
</li>
<li>
<p><code>src1</code>: first register for operation ("source 1")</p>
</li>
<li>
<p><code>src2</code>: second register for operation ("source 2")</p>
</li>
</list>

#### 3.2 Registers

<p>Assembly uses registers to store values. Registers are: </p>

<list type = "bullet">
<li>
<p>Small memories of a fixed size.</p>
</li>
<li>
<p>Can be read or written.</p>
</li>
<li>
<p>Limited in number.</p>
</li>
<li>
<p>Very fast and low power to access.</p>
</li>
</list>

<table style = "both">
<tr><td></td><td>Registers</td><td>Memory</td></tr>
<tr><td>Speed</td><td>Fast</td><td>Slow</td></tr>
<tr><td>Size</td><td><p>Small</p><p>e.g., 32 registers * 32 bit = 
128 bytes</p></td><td><p>Big</p><p>4-32 GB</p></td></tr>
<tr><td>Connection</td><td colspan = "2"><p>More variables than 
registers?</p><p>Keep most frequently used in registers and move the 
rest to memory</p></td></tr>
</table>

<img src = "../images_architecture/3-2-1.png" alt = "Registers"/>

<warning>
<p>Some important notes about registers: </p>
<list type = "bullet">
<li>
<p>Register denoted by 'x' can be referenced by number (x0 - x31) or 
by name.</p>
</li>
<li>
<p>Registers have no type.</p>
</li>
<li>
<p>Register zero (x0 or zero) always has the value 0 and cannot be 
changed! Any instruction writing to x0 has no effect!</p>
</li>
<li>
<p>In high-level languages, number of variables limited only by 
available memory.</p>
</li>
</list>
</warning>

#### 3.3 RISC-&#8548; Instructions

##### 3.3.1 Basic Arithmetic Instructions

<note>
<p>Assume here that the variables a, b and c are assigned to
registers s1, s2 and s3, respectively.</p>
</note>

<p><format color = "BlueViolet">Types:</format> </p>

<list type = "bullet">
<li>
<p><format color = "Fuchsia">Integer Addition:</format> </p>
    <list type = "bullet">
    <li>
    <p>C: a = b + c;</p>
    </li>
    <li>
    <p>RISC-Ⅴ: add s1, s2, s3</p>
    </li>
    </list>
</li>
<li>
<p><format color = "Fuchsia">Integer Subtraction:</format> </p>
    <list type = "bullet">
    <li>
    <p>C: a = b - c;</p>
    </li>
    <li>
    <p>RISC-Ⅴ: sub s1, s2, s3</p>
    </li>
    </list>
</li>
</list>

##### 3.3.2 Immediate Instructions

<p><format color = "DarkOrange">Immediates:</format> Numerical 
constants.</p>

<p><format color = "BlueViolet">Syntax:</format> opi dst, src, imm</p>

<list type = "bullet">
<li>
<p>Operation names end with "i", replace <math>2 ^ {\text{nd}}</math> 
source register with an immeidate.</p>
</li>
<li>
<p>Immediates can up to 12-bits in size.</p>
</li>
<li>
<p>Interpreted as sign-extended two's complement.</p>
</li>
</list>

<warning>
<p>No <code>subi</code> instruction, since RISCV is all about reducing
# of instructions.</p>
</warning>

##### 3.3.3 Data Transfer Instructions

<p>Specialized <format color = "OrangeRed">data transfer instructions
</format> move data between registers and memory.</p>

<list type = "bullet">
<li>
<p><format color = "Fuchsia">Store:</format> register TO memory</p>
</li>
<li>
<p><format color = "Fuchsia">Load:</format> register FROM memory</p>
</li>
</list>

<p><format color = "BlueViolet">Syntax:</format> memop reg, off (bAbbr)
</p>

<list type = "bullet">
<li>
<p><code>memop</code>: operation name ("operator")</p>
</li>
<li>
<p><code>reg</code>: register for operation source or destination.</p>
</li>
<li>
<p><code>bAbbr</code>: register with pointer to memory ("base 
address")</p>
</li>
<li>
<p><code>off</code>: Address offset (immediate) in bytes ("offset")</p>
</li>
</list>

<p><format color = "BlueViolet">Types:</format> </p>

<list type = "bullet">
<li>
<p><format color = "Fuchsia">Load Word:</format> Takes data at 
address <code>bAbbr+off</code> FROM memory and places it into <code>
reg</code>.</p>
</li>
<li>
<p><format color = "Fuchsia">Store Word:</format> Takes data in 
<code>reg</code> and stores it TO memory at <code>bAbbr+off</code>.
</p>
</li>
</list>

<p><format color = "BlueViolet">Example:</format> address of int array
[] -> s3, value of b -> s2</p>

<list type = "bullet">
<li>
<p>C: array[10] = array[3] + b;</p>
</li>
<li>
<p>RISC-Ⅴ</p>
<p>lw&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t0, <format color = 
"OrangeRed">l2</format> (s3)&nbsp;&nbsp;&nbsp;&nbsp;# t0 = A[<format color = "OrangeRed">3
</format>]</p>
<p>add&nbsp;&nbsp;&nbsp;&nbsp;t0, s2, t0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# t0 = A[3] + b</p>
<p>sw&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t0, <format color = "OrangeRed">40</format> (s3)&nbsp;&nbsp;# A[<format 
color = "OrangeRed">10</format>] = A[3] + b</p>
</li>
</list>

##### 3.3.4 Control Flow Instructions

<p><format color = "DarkOrange">Labels in RISC-Ⅴ</format>: Defined
by a text and followed by a colon (e.g., main:) and refers to the 
instructions that follows; generate control flow by jumping to labels.
</p>

<p><format color = "BlueViolet">Types:</format> </p>

<list type = "alpha-lower">
<li>
    <p><format color = "Fuchsia">Branch If Equal</format> (beq)</p>
    <list type = "bullet">
    <li>    
        <p><format color = "LawnGreen">Syntax:</format> beq reg1, 
        reg2, label</p>
    </li>
    <li>
        <p>If value in reg1 == value in reg2, go to label.</p>
    </li>
    <li>
        <p>Otherwise go to next instruction.</p>
    </li>
    </list>
</li>
<li>
<p><format color = "Fuchsia">Branch If Not Equal</format> (bne)</p>
    <list type = "bullet">
    <li>    
        <p><format color = "LawnGreen">Syntax:</format> bne reg1, 
        reg2, label</p>
    </li>
    <li>
        <p>If value in reg1 &#8800; value in reg2, go to label.</p>
    </li>
    </list>
</li>
<li>
<p><format color = "Fuchsia">Jump</format> (j)</p>
    <list type = "bullet">
    <li>    
        <p><format color = "LawnGreen">Syntax:</format> j label</p>
    </li>
    <li>
        <p>Unconditional jump to label.</p>
    </li>
    </list>
</li>
<li>
<p><format color = "Fuchsia">Branch Less Than</format> (blt)</p>
    <list type = "bullet">
    <li>    
        <p><format color = "LawnGreen">Syntax:</format> blt reg1, reg2,
        label</p>
    </li>
    <li>
        <p>If value in reg1 &lt; value in reg2, go to label.</p>
    </li>
    </list>
</li>
<li>
<p><format color = "Fuchsia">Branch Less Than or Equal</format> (ble)
</p>
    <list type = "bullet">
    <li>    
        <p><format color = "LawnGreen">Syntax:</format> ble reg1, reg2,
        label</p>
    </li>
    <li>
        <p>If value in reg1 &#8804; value in reg2, go to label.</p>
    </li>
    </list>
</li>
</list>

<compare first-title="C" second-title="RISC-Ⅴ (beq)">
    <code-block lang = "c">
        if (i == j) {
            a = b; /* then */
        } else {
            a = -b; /* else */
        }
    </code-block>
    <code-block lang = "python">
        # i -> s0, j -> s1
        # a -> s2, b -> s3
        beq s0, s1, then
        else:
        sub s2, x0, s3
        j end
        then:
        add s2, s3, x0
        end:
    </code-block>
</compare>

<p><format color = "BlueViolet">Loops in RISC-Ⅴ:</format> </p>

<list type = "bullet">
<li>
    <p>There are three types of loops in C: while, do...while, and
    for.</p>
</li>
<li>
    <p>These can be created with branch instructions as well.</p>
</li>
<li>
    <p>The key to decision making is the branch statement.</p>
</li>
</list>

<p><format color = "BlueViolet">Program Counter:</format> </p>

<list type = "bullet">
<li>
    <p>Program Counter (PC): A special register that contains the 
    current address of the code that is being executed.</p>
</li>
<li>
    <p>Branches and Jumps change the flow of execution by modifying 
    the PC.</p>
</li>
<li>
    <p>Instructions are stored as data in memory (code section) and 
    have addresses! Labels get converted to instruction addresses.</p>
</li>
<li>
    <p>The PC tracks where in memory the current instruction is.</p>
</li>
</list>

### 4 RISC-&#8548; Functions

