<show-structure for="chapter" depth="3"></show-structure>

# Computer Architecture

<img src="../images_architecture/a1-1-1.png" alt="Computer Architecture"/>

## &#8544; C Programming

### 1 Introduction to C

<note>
<p>For this part, please refer to <a href="C-Programming.md" 
anchor="intro" summary="C++ Introduction">introduction in
C++ programming</a>.</p>
</note>

#### 1.1 Number Base

<p><format color="BlueViolet">Commonly Used Number Bases:</format> </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Decimal (base 10)</format></p>
    <list type="bullet">
    <li>
        <p><format color="LawnGreen">Symbols:</format> 0, 1, 2, 3, 4,
        5, 6, 7, 8, 9</p>
    </li>
    <li>
        <p><format color="LawnGreen">Notation:</format> <math>
        9472_{10} = 9472</math></p>
    </li>
    <li>
        <p>Understandable by humans.</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">Binary (base 2)</format></p>
    <list type="bullet">
    <li>
        <p><format color="LawnGreen">Symbols:</format> 0, 1</p>
    </li>
    <li>
        <p><format color="LawnGreen">Notation:</format> <math>
        101011_{2} = 0\text{b}101011</math></p>
    </li>
    <li>
        <p>Converting numbers to base 2 lets us represent numbers as 
        bits!</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">Hexadecimal (base 16)</format></p>
    <list type="bullet">
    <li>
        <p><format color="LawnGreen">Symbols:</format> 0, 1, 2, 3, 4,
        5, 6, 7, 8, 9, A, B, C, D, E, F</p>
    </li>
    <li>
        <p><format color="LawnGreen">Notation:</format> <math>
        2\text{A}5\text{D}_{16} = 0\text{x}22400</math></p>
    </li>
    <li>
        <p>A convenient shorthand for writing long sequences of bits.</p>
    </li>
    </list>
</li>
</list>

<p><format color="BlueViolet">Group of bits:</format> </p>

<list type="bullet">
<li>
    <p>1 byte = 8 bits&nbsp;&nbsp;&nbsp;&nbsp;2 hex digits&nbsp;
    <math>2^{8}=256</math> different values</p>
</li>
<li>
    <p>1 nibble = 4 bits&nbsp;1 hex digit&nbsp;&nbsp;&nbsp;<math>
    2^{4}=16</math> different values</p>
</li>
</list>

<p><format color="BlueViolet">Conversions from ten to other bases:
</format> The leftover algorithm</p>

<img src="../images_architecture/a1-1-2.png" alt="Number Base 
Conversion"/>

<list type="bullet">
<li>
    <p>Check the powers of the base. For base-4: 256, 64, 16, 4, 1.</p>
</li>
<li>
    <p>How many multiples of 64 fit in my number (73)?</p>
    <p><math>73 – 64 = 9</math> left over.</p>
</li>
<li>
    <p>How many multiples of 16 fit in my remaining number (9)?</p>
    <p>Still 9 left over.</p>
</li>
<li>
    <p>How many multiples of 4 fit in my remaining number (9)?</p>
    <p><math>9 – (2 \times 4) = 1</math> left over.</p>
</li>
<li>
    <p>How many multiples of 1 fit in my remaining number (1)?</p>
    <p><math>1 – 1 = 0</math> left over, which means we're done!</p>
</li>
</list>

<p>Converting from base 10 to base 2 will create unsigned integers.
</p>

<p><format color="BlueViolet">N-bit unsigned integers:</format> </p>

<list type="bullet">
<li>
    <p>Can represent <math>2N</math> different numbers.</p>
</li>
<li>
    <p><format color="Fuchsia">Smallest number:</format> <math>
    0\text{b}0000...000</math> represents <math>0</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Largest number:</format> <math>
    0\text{b}1111...111</math> represents <math>2N – 1</math>.</p>
</li>
</list>

<p><format color="BlueViolet">Overflow:</format> </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Overflow:</format> 11111111 + 
    00000001 = 00000000.</p>
</li>
<li>
    <p><format color="Fuchsia">Negative overflow:</format> 
    00000001 – 00000010 = 11111111.</p>
</li>
</list>

<p><format color="BlueViolet">Conclusion:</format> </p>

<table style="header-row">
<tr>
    <td colspan="2">Unsigned Integer</td>
</tr>
<tr>
    <td>Can represent negative numbers</td>
    <td>&chi;</td>
</tr>
<tr>
    <td>Doing math is easy</td>
    <td>&checkmark;</td>
</tr>
<tr>
    <td>Every bit sequence represents a unique number</td>
    <td>&checkmark;</td>
</tr>
</table>

#### 1.2 Signed Integers

<p><format color="BlueViolet">Idea:</format> Use the left-most bit 
to indicate if the number is positive (0) or negative (1). This is 
called <format color="OrangeRed">sign-magnitude</format> 
representation.</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Smallest number:</format> <math>
    0\text{b}1111...111</math> represents <math>–(2^{N – 1} – 1)
    </math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Largest number:</format> <math>
    0\text{b}0111...111</math> represents <math>+(2^{N – 1} – 1)
    </math>.</p>
</li>
</list>

<table style="header-row">
<tr>
    <td colspan="2">Sign-Magnitude</td>
</tr>
<tr>
    <td>Can represent negative numbers</td>
    <td>&checkmark;</td>
</tr>
<tr>
    <td>Doing math is easy</td>
    <td>&chi;</td>
</tr>
<tr>
    <td>Every bit sequence represents a unique number</td>
    <td>&chi;</td>
</tr>
</table>

#### 1.3 One's Complement

<p><format color="BlueViolet">Idea:</format> If the number is 
negative, flip the bits.</p>

<list type="bullet">
<li>
    <p>+7 is <math>0\text{b}00111</math>.</p>
</li>
<li>
    <p>-7 is <math>0\text{b}11000</math>.</p>
</li>
<li>
    <p>Left-most bit acts like a sign bit. If it's 1, someone 
    flipped the bits, so number must be negative.</p>
</li>
<li>
    <p><format color="Fuchsia">Smallest number:</format> 
    <math>0\text{b}1000...000</math> represents <math>
    –(2^{N – 1} – 1)</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Largest number:</format> 
    <math>0\text{b}0111...111</math> represents <math>
    +(2^{N – 1} – 1)</math>.</p>
</li>
</list>

<note>
<p>If we count upwards in base-2, the resulting numbers are always 
increasing.</p>
<p>Two representations of zero: 1111 and 0000.</p>
</note>

<table style="header-row">
<tr>
    <td colspan="2">One's Complement</td>
</tr>
<tr>
    <td>Can represent negative numbers</td>
    <td>&checkmark;</td>
</tr>
<tr>
    <td>Doing math is easy</td>
    <td>&checkmark;</td>
</tr>
<tr>
    <td>Every bit sequence represents a unique number</td>
    <td>&chi;</td>
</tr>
</table>

#### 1.4 Two's Complement

<p><format color="BlueViolet">Idea:</format> If the number is 
negative, flip the bits, and add one (because we shifted to avoid 
double-zero).</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Smallest number:</format> 
    <math>0\text{b}1000...000</math> represents <math>
    –(2^{N – 1})</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Largest number:</format> 
    <math>0\text{b}0111...111</math> represents <math>
    +(2^{N – 1} – 1)</math>.</p>
</li>
</list>

<note>
<p><format color="BlueViolet">Another definition:</format> The 
left-most power of 2 is now negative, not positive.</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Left-most bit 0:</format> Read the 
    rest of the number as an unsigned integer.</p>
</li>
<li>
    <p><format color="Fuchsia">Left-most bit 1:</format> Subtract a 
    big power of 2. Resulting number is negative!</p>
</li>
<li>
    <p>For example, 0000-0111 represent 0->7, while 1000-1111 
    represent -8->-1.</p>
</li>
</list>
</note>

<p><format color="BlueViolet">To convert two's complement to a 
signed decimal number:</format> </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">If left-most digit is 0:</format> 
    Positive number.</p>
    <list type="bullet">
    <li>
        <p>Just read it as unsigned.</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">If left-most digit is 1:</format> 
    Negative number.</p>
    <list type="bullet">
    <li>
        <p>Flip the bits, and add 1.</p>
    </li>
    <li>
        <p>Convert to base-10, and stick a negative sign in front.
        </p>
    </li>
    </list>
</li>
</list>

<p>Example: What is 0b1110 1100 in decimal?</p>

<list>
<li>
    <p>Flip the bits: 0b0001 0011</p>
</li>
<li>
    <p>Add one: 0b0001 0100</p>
</li>
<li>
    <p>In base-10: –20</p>
</li>
</list>

<p><format color="BlueViolet">To convert two's complement to a 
signed decimal number:</format> </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">IIf number is positive:</format> </p>
    <list type="bullet">
    <li>
        <p>Just convert it to base-2.</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">If number is negative:</format></p>
    <list type="bullet">
    <li>
        <p>Pretend it's unsigned, and convert to base-2.</p>
    </li>
    <li>
        <p>Flip the bits, and add 1.</p>
    </li>
    </list>
</li>
</list>

<p>Example: What is –20 in two's complement binary?</p>

<list type="bullet">
<li>
    <p>In base-2: 0b0001 0100</p>
</li>
<li>
    <p>Flip the bits: 0b1110 1011</p>
</li>
<li>
    <p>Add one: 0b1110 1100</p>
</li>
</list>

<table style="header-row">
<tr>
    <td colspan="2">Two's Complement</td>
</tr>
<tr>
    <td>Can represent negative numbers</td>
    <td>&checkmark;</td>
</tr>
<tr>
    <td>Doing math is easy</td>
    <td>&checkmark;</td>
</tr>
<tr>
    <td>Every bit sequence represents a unique number</td>
    <td>&checkmark;</td>
</tr>
</table>

<note>
    <p>Because of overflow, addition behaves like modular arithmetic
    .</p>
    <p>11 and –5 are the same number in mod land: 11 mod 16.</p>
</note>

#### 1.5 Bias Notation

<p><format color="BlueViolet">Idea:</format> Just like unsigned, 
but shifted on the number line.</p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Smallest number:</format>
    0b0000...000 represents <math>\text{bias}</math>.</p>
</li>
<li>
    <p><format color="Fuchsia">Largest number:</format>
    0b1111...111 represents <math>2^{N – 1} + \text{bias}</math>.
    </p>
</li>
</list>

<img src="../images_architecture/a1-1-3.png" alt="Bias Notation"/>

<p><format color="BlueViolet">To convert from bias to decimal:
</format></p>

<list type="bullet">
<li>
    <p>Read as unsigned decimal.</p>
</li>
<li>
    <p>Add the bias.</p>
</li>
</list>

<p>Example: Assuming standard bias, what is 0b00000001 in decimal?</p>

<list type="bullet">
<li>
    <p><math>N = 8</math>, so standard bias is: <math>–(2^{8–1} – 1) 
    = –127</math>.</p>
</li>
<li>
    <p>Read as unsigned: 1</p>
</li>
<li>
    <p>Add the bias: <math>1 + (--127) = –126</math></p>
</li>
</list>

<p><format color="BlueViolet">To convert from decimal to bias notation:
</format></p>

<list type="bullet">
<li>
    <p>Subtract the bias.</p>
</li>
<li>
    <p>Convert to unsigned binary.</p>
</li>
</list>

<p>Example: What is –126 in 8-bit biased notation?</p>

<list>
<li>
    <p><math>N = 8</math>, so standard bias is: <math>–(2^{8–1} – 1) 
    = –127</math>.</p>
</li>
<li>
    <p>Subtract the bias: –126 – (–127) = 1</p>
</li>
<li>
    <p>Write in base-2: 0b00000001</p>
</li>
</list>

<table style="header-row">
<tr>
    <td colspan="2">Bias Notation</td>
</tr>
<tr>
    <td>Can represent negative numbers</td>
    <td>&checkmark;</td>
</tr>
<tr>
    <td>Doing math is easy</td>
    <td>&chi;</td>
</tr>
<tr>
    <td>Every bit sequence represents a unique number</td>
    <td>&checkmark;</td>
</tr>
</table>

#### 1.6 Sign Extension

<p>Leftmost is the most significant bit (MSB).</p>

<p>Rightmost is the least significant bit (LSB).</p>

<list type="bullet">
<li>
    <p>Want to represent the same number using more bits than 
    before.</p>
    <list type="bullet">
    <li>
        <p>Easy for positive numbers (add leading 0's), more 
        complicated for negative numbers.</p>
    </li>
    <li>
        <p><format color="Fuchsia">Sign and magnitude:</format>
        add 0's after the sign bit.</p>
    </li>
    <li>
        <p><format color="Fuchsia">One's/Two's Complement:</format>
        copy MSB.</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">Example:</format></p>
    <list type="bullet">
    <li>
        <p><format color="LawnGreen">Sign and magnitude:</format> 
        0b1101 = 0b10000101.</p>
    </li>
    <li>
        <p><format color="LawnGreen">One's/Two's complement:</format> 
        0b1100 = 0b11111100.</p>
    </li>
    </list>
</li>
</list>

### 2 C Introduction

#### 2.1 Variable C Types

<p><format color="BlueViolet">char:</format> A char takes up to 1 
byte.</p>

<p>7 bits are enough to store a char (<math>2^{7}=128</math>), but 
we add a bit to round up to 1 byte since computers usually deal with 
multiple of bytes.</p>

<p><format color="BlueViolet">Typecasting in C:</format> C is a "
weakly" typed language, you can <format color="OrangeRed">typecast
</format> from any type to any other.</p>

<note>
<p>For more information on struct, please visit <a 
href="C-Programming.md" anchor="structs" summary="Struct in C++">
struct in C++</a>.</p>
</note>

<p><format color="BlueViolet">Union</format></p>

<p>Unions are similar to structs, but all members share the same
memory location, and union only provides enough space for the largest 
element.</p>

<code-block lang="c++" collapsible="true">
#include &lt;stdio.h&gt;
\/
union Shape {
    int radius; // For circle
    struct {
        int width;
        int height;
    } rectangle; // For rectangle
};
\/
int main() {
    union Shape shape;
    shape.radius = 5;
    printf("Radius: %d\n", shape.radius); // Radius: 5
\/
    shape.rectangle.width = 10;
    shape.rectangle.height = 20;
    printf("Width: %d, Height: %d\n", shape.rectangle.width, shape.rectangle.height);
    // Width: 10, Height: 20
\/
    printf("Radius: %d\n", shape.radius); // No meaning, the radius has been overwritten!
\/
    return 0;
}
</code-block>

<p><format color="DarkOrange">Enum:</format> A group of related integer 
constants.</p>

<code-block lang="c++" collapsible="true">
enum enum_name {
  constant1, // Assigned 0 by default
  constant2, // Assigned 1 by default
  constant3, // Assigned 2 by default
  ...
};
</code-block>

<p><format color="BlueViolet">CPP (C Preprocessor) Macro</format></p>

<p>Prior to compilation, preprocess by performing string replacement in 
the program based on all #define macros.</p>

<p>For example, #define PI 3.14159 => Replace all PI with (3.14159) => 
In effect, makes PI a "constant".</p>

#### 2.2 Addresses & Pointers

<p><format color="BlueViolet">Definitions</format></p>

<list type="bullet">
<li>
    <p><format color="DarkOrange">Address:</format> An address refers to a 
    particular memory location.</p>    
</li>
<li>
    <p><format color="DarkOrange">Pointer:</format> A pointer is a variable
    that contains the address of another variable.</p>
</li>
</list>

<list type="bullet">
<li>
    <p>The size of an address (and thus, the size of a pointer) in bytes depend
    on architecture, e.g., for 32-bit, have <math>2^32</math> possible addresses.
    </p>
</li>
<li>
    <p>byte-addressed = each of its addresses points to a unique byte</p>
    <p>word-addressed = each of its addresses points to a unique word</p>
</li>
</list>

<note>
    <p>Don't confuse the address referring to a memory location with the 
    value stored there.</p>
</note>

<code-block lang="c" collapsible="true">
int *p; // Declaration, and tells compiler that variable p is address of an int
int x = 3;
\/
p = &amp;x; // Tells compiler to assign address of x to p
\/
printf("%u %d\n", p, *p); // Gets address of x and value of x
\/
*p = 5; // Changes value of x to 5
\/
void *p1; // Can be used to store any address
</code-block>

<p><format color="BlueViolet">By value vs. By reference</format></p>

<compare type="left-right" first-title="By value" second-title="By reference">
<code-block lang="c">
void addOne (int x) {
    x = x + 1; // x = 4, copy of data
}
\/
int y = 3;
addOne(y); // y = 3
</code-block>
<code-block lang="c">
void addOne (int *x) {
    *x = *x + 1; 
}
\/
int y = 3;
addOne(&amp;y); // y = 4
</code-block>
</compare>

#### 2.3 Array

<p><format color="BlueViolet">Declaration & Initialization</format></p>

<code-block lang="c" collapsible="true">
int arr[5]; // Declare an array of 5 integers
int arr1[] = {1, 2, 3, 4, 5}; // Declare and initialize an array of 5 integers
printf("%d\n", arr1[2]); // 3, access elements using index
</code-block>

<p>A better pattern: single source of truth!</p>

<code-block lang="c" collapsible="true">
int ARRAY_SIZE = 5;
int arr[ARRAY_SIZE];
for (int i = 0; i &lt; ARRAY_SIZE; i++) {
    arr[i] = i;
}
</code-block>

<note>
<p>An array variable and a pointer to the first (<math>
0^{\text{th}}</math>) element are nearly idenPcal declarations.</p>
<p>arr[0] is same as *arr, arr[2] is same as *(arr+2)</p>
</note>

<p><format color="BlueViolet">Pointer Arithmetic</format></p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">pointer+n:</format> Add n*sizeof("whatever
    pointer is pointing to")</p>
</li>
<li>
    <p><format color="Fuchsia">pointer-n:</format> Subtract n*sizeof("
    whatever pointer is pointing to")</p>
</li>
</list>

<p><format color="IndianRed">Examples</format></p>

<code-block lang="c" collapsible="true">
int arr[] = {1, 2, 3, 4, 5};
int *p = arr;
printf("%d\n", *(p+1)); // 2
</code-block>

<code-block lang="c" collapsible="true">
void increment_ptr(int32_t **h) {
    *h = *h + 1;
}
\/
int32_t arr[3] = {50, 60, 70};
int32_t *q = arr;
increment_ptr(&amp;q);
printf("q is %d\n", *q); // q is 60
</code-block>

<code-block lang="c" collapsible="true">
int *p, *q, x;
int a[4];
p = &amp;x;
q = a + 1;
*p = 1;
printf("*p:%d, p:%x, &amp;p:%x\n", *p, p, &amp;p); // *p:1, p:108, &amp;p:100
*q = 2;
printf("*q:%d, q:%x, &amp;q:%x\n", *q, q, &amp;q); // *q:2, q:110, &amp;q:104
*a = 3;
printf("*a:%d, a:%x, &amp;a:%x\n", *a, a, &amp;a); // *a:3, a:10c, &amp;a:10c
// K&R: "An array name is not a variable"
// a is not a variable, so asking for the address of it is meaningless
</code-block>

<p><format color="BlueViolet">Potential Pitfalls</format></p>

<list type="bullet">
<li>
    <p>Array bounds are not checked during element access</p>
    <p><format color="LawnGreen">Consequence:</format> We can accidentally
    access off the the end of the array!</p>
</li>
<li>
    <p>An array is passed to a function as a pointer</p>
    <p><format color="LawnGreen">Consequence:</format> The array size is
    lost! Be careful with sizeof()!</p>
</li>
<li>
    <p>Declared arrays are only allocated when the scope is valid</p>
</li>
</list>

#### 2.4 Strings

<p><format color="DarkOrange">C String:</format> A C string is just an 
array of characters, followed by a null terminator.</p>

<code-block lang="c">
char str[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
</code-block>

<p><format color="BlueViolet">String functions</format> (accessible with
#include &lt;string.h&gt;</p>

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">int strlen(char* string):</format></p>
    <p>Return the length of the string (not including the null term)</p>
</li>
<li>
    <p><format color="Fuchsia">int strcmp(char* str1, char* str2):
    </format></p>
    <p>Return 0 if str1 and str2 are identical (no str1 == str2, since 
    this will be checking if they point to the same memory location!)</p>
</li>
<li>
    <p><format color="Fuchsia">char* strcpy(char* dst, char* src):
    </format></p>
    <p>Copy contents of string src to the memory at dst. Caller must 
    ensure that dst has enough memory to hold the data to be copied.</p>
</li>
</list>

#### 2.5 Word Alignment

<p><code>sizeof()</code></p>

<list type="bullet">
<li>
    <p>The C and C++ programming languages define byte as an "addressable 
    unit of data storage large enough to hold any member of the basic 
    character set of the execution environment", most commonly means the 
    number of bites for a <code>char</code> (8 bits).</p>    
</li>
<li>
    <p><code>sizeof()</code> returns the size in bytes of the type.</p>
</li>
<li>
    <p><code>sizeof(char)</code> is always 1!</p>
</li>
<li>
    <p>Depending on the computer architecture, a byte may consist of 8 or 
    more bits, the exact number being recorded in CHAR_BIT.</p>
</li>
<li>
    <p>For example, since <code>sizeof(char)</code> is defined to be 1 and assuming
    the integer type is four bytes long, the following code fragment 
    prints 1,4:</p>
    <code-block lang="c" ignore-vars="true">
char c;
printf ("%zu,%zu\n", sizeof c, sizeof (int));
    </code-block>
</li>
</list>

<p>Example use:</p>

<code-block lang="c" collapsible="true">
int x[61];
printf("Size of x array: %zu\n", sizeof(a)/sizeof(int)); // 61
</code-block>

<note>
<p>This only works for arrays defined on the stack in the same function.</p>
<p>Better to keep track of an array size!</p>
</note>

<p><format color="BlueViolet">Struct Alignment and Padding</format></p>

<list>
<li>
    <p>Some processors will not allow you to address 32b values without being
    on 4-byte boundaries.</p>
</li>
<li>
    <p>Others will just be very slow if you try to access &quot;
    unaligned&quot; memory.</p>
</li>
</list>

<code-block lang="c" collapsible="true">
struct hello {
    int a; 
    char b;
    short c;
    char *d;
    char e;
};
</code-block>

<p>The actual layout on a 32-bit architecture would be: </p>

<img src="../images_architecture/a2-5-1.png" alt="Word Alignment"/>

<p>sizeof(hello) = 16</p>

<p>Improvement:</p>

<code-block lang="c" collapsible="true">
struct hello {
    int a; 
    char b;
    char e;
    short c;
    char *d;
};
</code-block>

<img src="../images_architecture/a2-5-2.png" alt="Word Alignment"/>

<p>sizeof(hello) = 12</p>

### 3 C Memory Layout

<p>Program's <format color="OrangeRed" style="italic">address space
</format> contains 4 regions: </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Stack:</format> Local variables,
    grow downwards.</p>
</li>
<li>
    <p><format color="Fuchsia">Heap:</format> Space requested via
    <code>malloc()</code> and used with pointers; resizes dynamically, 
    grow upward.</p>
</li>
<li>
    <p><format color="Fuchsia">Static Data:</format> Global or static 
    variables, does not grow or shrink.</p>
</li>
<li>
    <p><format color="Fuchsia">Code:</format> Loaded when program 
    starts, does not change.</p>
</li>
</list>

<img src="../images_architecture/a2-1-1.png" alt="C Memory Layout"/>

<p><format color="BlueViolet">Storage for C Programs</format></p>

<list>
<li>
    <p><format color="Fuchsia">Declared outside a function:
    </format> Static Data</p>
</li>
<li>
    <p><format color="Fuchsia">Declared inside a function:
    </format> Stack</p>
    <p>Freed when function returns.</p>
</li>
<li>
    <p><format color="Fuchsia">Dynamically allocated (i.e., 
    <code>malloc</code>, <code>calloc</code> & <code>realloc</code>):
    </format> Heap.</p>
</li>
</list>

#### 3.1 Stack

<list type="bullet">
<li>
    <p>A stack frame includes: </p>
    <list type="bullet">
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
    (<format color="OrangeRed">garbage!</format>)); frees memory for 
    future stack frames (LIFO-Last In First Out).</p>
</li>
</list>

<img src="../images_architecture/a3-1-1.png" alt="Example for Stack"/>

<p><format color="BlueViolet">Stack Misuse</format></p>

<code-block lang="c" collapsible="true">
int *getPtr() {
    int x = 5;
    return &amp;x;
}
\/
int main() {
    int *stackAddr, content;
    stackAddr = getPtr();
    content = *stackAddr;
    printf("Content: %d\n", content); // Content: 5 (most probably)
    content = *stackAddr;
    printf("Content: %d\n", content); // ???
    return 0;
}
</code-block>

<img src="../images_architecture/a3-1-2.png" alt="Stack Frame"/>

<note>
<p>Never retrun pointers to local variables from functions!</p>
<p>Your compiler will warn you about this - don't ignore such warnings!
</p>
</note>

#### 3.2 Static Data

<list type="bullet">
<li>
    <p>Place for variables that persist, and data doesn't subject to 
    comings and goings like function calls, e.g. <format 
    color="OrangeRed">string literals, global variables</format>.</p>
</li>
<li>
    <p>String literal example: <code>char * str = "hi"</code>.</p>
    <p><code>char str[] = "hi"</code> is on stack!</p>
</li>
<li>
    <p>Size does not change, but sometimes part of the data can be 
    writable.</p>
</li>
</list>

<warning>
    <p>String literals cannot change!</p>
</warning>

#### 3.3 Code

<list type="bullet">
<li>
    <p>Copy of your code goes here, C code becomes data too!</p>
</li>
<li>
    <p>Does (should) not change, typically read-only.</p>
</li>
</list>

#### 3.4 Endianness

<p><format color="BlueViolet">Endianness</format></p>

<list type="bullet">
<li>
    <p><format color="DarkOrange">Big Endian:</format> Descending 
    numerical significance with ascending memory addresses.</p>
</li>
<li>
    <p><format color="DarkOrange">Little Endian:</format> Ascending 
    numerical significance with ascending memory addresses.</p>
</li>
</list>

<img src="../images_architecture/a2-4-1.png" alt="Endianness"/>

<warning>
    <p>Endianess <format color="OrangeRed">only appplies</format> to values 
    that occupy multiple bytes.</p>
    <p>Endianness refers to <format color="OrangeRed">storage in memory 
    not</format> number representation.</p>
</warning>

#### 3.5 Heap

<p>Stack is not permanent - when the function returns, the memory will be deallocated
and turn into garbage.</p>

<p>Dynamically allocated memory goes on the <format color="OrangeRed">Heap
</format>, more permanent and persistent than Stack.</p>

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">malloc(n)</format></p>
    <list type="bullet">
    <li>
    <p>Allocates a continuous block of <format style = "bold, italic">
    n bytes</format> of uninitialized memory (contains garbage!)</p>
    </li>
    <li>
    <p>Returns a pointer to the beginning of an allocated block; NULL 
    indicates failed request (check for this!)</p>
    </li>
    <li>
    <code-block lang="c">int *p = (int *) malloc(n * sizeof(int))</code-block>
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
<p><format color="Fuchsia">calloc(n, size)</format></p>
    <list type="bullet">
    <li>
    <code-block lang="c">void* calloc(size_t nmemb, size_t size)</code-block>
    </li>
    <li>
        <p>nmemb is the number of the members</p>
    </li>
    <li>
        <p>size is the size of each member</p>
    </li>
    <li>
        <p>Like malloc, except it initializes the meory to 0.</p>
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
<p><format color="Fuchsia">realloc()</format></p>
    <list type="bullet">
    <li>
        <p>Use it when you need more or less memory in an array.</p>
    </li>
    <li>
        <code-block lang="c">void *realloc(void *ptr, size_t size)</code-block>
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
<p><format color="Fuchsia">free()</format></p>
    <list type="bullet">
    <li>
    <p>Release memory on the heap: Pass the pointer p to the 
    beginning of allocated block; releases the whole block.</p>
    </li>
    <li>
    <p>p must be the address <format style="italic">originally
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

#### 3.6 Common Mistakes

<p><format color="BlueViolet">Memory error types</format></p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Segmentation Fault:</format> Segmentation 
    fault (often shortened to segfault) or access violation is a fault, 
    or failure condition, raised by hardware with memory protection, notifying 
    an operating system (OS) the software has attempted to access a 
    restricted area of memory (a memory access violation).</p>
</li>
<li>
    <p><format color="Fuchsia">Bus error:</format> Bus error is a fault 
    raised by hardware, notifying an operating system (OS) that a process 
    is trying to access memory that the CPU cannot physically address: an 
    invalid address for the address bus, hence the name.</p>
</li>
</list>

## &#8545; Assembly Language

### 3 Introduction to Assembly Language

#### 3.1 Assembly Language

<p><format color="DarkOrange">Assembly (also known as Assembly 
language, ASM):</format>  A low-level programming language where the 
program instructions match a particular architecture's operations.
</p>

<p><format color="BlueViolet">Properties:</format> </p>

<list type="bullet">
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

<p><format color="BlueViolet">Complex/Reduced Instruction Set 
Computing</format></p>

<list type="alpha-lower">
<li>
<p>Early trend - add more and more instructions to do elaborate 
operations</p>
<p><format color="Fuchsia">Complex Instruction Set Computing (CISC)
</format></p>
    <list type="bullet">
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
<p><format color="Fuchsia">Reduced Instruction Set Computing (RISC)
</format></p>
    <list type="bullet">
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

<p><format color="BlueViolet">Code:</format> </p>

<p>op dst, src1, src2</p>

<list type="bullet">
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

<list type="bullet">
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

<table style="both">
<tr>
    <td></td>
    <td>Registers</td>
    <td>Memory</td>
</tr>
<tr>
    <td>Speed</td>
    <td>Fast</td>
    <td>Slow</td>
</tr>
<tr>
    <td>Size</td>
    <td><p>Small</p>
    <p>e.g., 32 registers * 32 bit = 128 bytes</p></td>
    <td><p>Big</p><p>4-32 GB</p></td>
</tr>
<tr>
    <td>Connection</td>
    <td colspan="2">
    <p>More variables than registers?</p>
    <p>Keep most frequently used in registers and move the rest to 
    memory</p></td>
</tr>
</table>

<img src="../images_architecture/a3-2-1.png" alt="Registers"/>

<warning>
<p>Some important notes about registers: </p>
<list type="bullet">
<li>
    <p>Each ISA has a predetermined number of registers, registers are 
    built in with hardware.</p>
</li>
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

<p>In high-level languages, variable types determine operation.</p>

<p>In assembly, operation determines type, i.e., how register contents
are treated.</p>

##### 3.3.1 Basic Arithmetic Instructions

<note>
<p>Assume here that the variables a, b and c are assigned to
registers s1, s2 and s3, respectively.</p>
</note>

<p><format color="BlueViolet">Types:</format> </p>

<list type="bullet">
<li>
<p><format color="Fuchsia">Integer Addition:</format> </p>
    <list type="bullet">
    <li>
    <p>C: a = b + c;</p>
    </li>
    <li>
    <p>RISC-Ⅴ: add s1, s2, s3</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">Integer Subtraction:</format> </p>
    <list type="bullet">
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

<p><format color="DarkOrange">Immediates:</format> Numerical 
constants.</p>

<p><format color="BlueViolet">Syntax:</format> opi dst, src, imm</p>

<list type="bullet">
<li>
    <p>Operation names end with "i", replace <math>2 ^ {\text{nd}}
    </math> source register with an immeidate.</p>
</li>
<li>
    <p>Immediates can up to 12-bits in size.</p>
</li>
<li>
    <p>Interpreted as sign-extended two's complement.</p>
</li>
<li>
    <p>RISC-Ⅴ hardwires the register zero (x0) to value 0.</p>
    <p>Example: RISC-Ⅴ: add x3 x4 0</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C:&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    f = g</p>
</li>
</list>

<warning>
<p>No <code>subi</code> instruction, since RISC-Ⅴ is all about reducing
# of instructions.</p>
</warning>

##### 3.3.3 Data Transfer Instructions

<p>Specialized <format color="OrangeRed">data transfer instructions
</format> move data between registers and memory.</p>

<list type="bullet">
<li>
<p><format color="Fuchsia">Store:</format> register TO memory</p>
</li>
<li>
<p><format color="Fuchsia">Load:</format> register FROM memory</p>
</li>
</list>

<p><format color="BlueViolet">Syntax:</format> memop reg, off (bAbbr)
</p>

<list type="bullet">
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

<p><format color="BlueViolet">Types:</format> </p>

<list type="bullet">
<li>
<p><format color="Fuchsia">Load Word:</format> Takes data at 
address <code>bAbbr+off</code> FROM memory and places it into <code>
reg</code>.</p>
</li>
<li>
<p><format color="Fuchsia">Store Word:</format> Takes data in 
<code>reg</code> and stores it TO memory at <code>bAbbr+off</code>.
</p>
</li>
</list>

<p><format color="BlueViolet">Example:</format> address of int array
[] -> s3, value of b -> s2</p>

<list type="bullet">
<li>
<p>C: array[10] = array[3] + b;</p>
</li>
<li>
<p>RISC-Ⅴ</p>
<p>lw&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t0, <format color=
"OrangeRed">l2</format> (s3)&nbsp;&nbsp;&nbsp;&nbsp;# t0 = A[<format color="OrangeRed">3
</format>]</p>
<p>add&nbsp;&nbsp;&nbsp;&nbsp;t0, s2, t0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# t0 = A[3] + b</p>
<p>sw&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t0, <format color="OrangeRed">40</format> (s3)&nbsp;&nbsp;# A[<format 
color="OrangeRed">10</format>] = A[3] + b</p>
</li>
</list>

##### 3.3.4 Control Flow Instructions

<p><format color="DarkOrange">Labels in RISC-Ⅴ</format>: Defined
by a text and followed by a colon (e.g., main:) and refers to the 
instructions that follows; generate control flow by jumping to labels.
</p>

<p><format color="BlueViolet">Types:</format> </p>

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">Branch If Equal</format> (beq)</p>
    <list type="bullet">
    <li>    
        <p><format color="LawnGreen">Syntax:</format> beq reg1, 
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
<p><format color="Fuchsia">Branch If Not Equal</format> (bne)</p>
    <list type="bullet">
    <li>    
        <p><format color="LawnGreen">Syntax:</format> bne reg1, 
        reg2, label</p>
    </li>
    <li>
        <p>If value in reg1 &#8800; value in reg2, go to label.</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">Jump</format> (j)</p>
    <list type="bullet">
    <li>    
        <p><format color="LawnGreen">Syntax:</format> j label</p>
    </li>
    <li>
        <p>Unconditional jump to label.</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">Branch Less Than</format> (blt)</p>
    <list type="bullet">
    <li>    
        <p><format color="LawnGreen">Syntax:</format> blt reg1, reg2,
        label</p>
    </li>
    <li>
        <p>If value in reg1 &lt; value in reg2, go to label.</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">Branch Less Than or Equal</format> (ble)
</p>
    <list type="bullet">
    <li>    
        <p><format color="LawnGreen">Syntax:</format> ble reg1, reg2,
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

<p><format color="BlueViolet">Loops in RISC-Ⅴ:</format> </p>

<list type="bullet">
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

<p><format color="BlueViolet">Program Counter:</format> </p>

<list type="bullet">
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

