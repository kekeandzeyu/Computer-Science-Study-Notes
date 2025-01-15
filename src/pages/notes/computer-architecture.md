---
layout: "../../layouts/NotesLayout.astro"
title: 'Computer Architecture'
author: 'Zeyu Li'
tags: ["Computer Architecture", "Computer Science"]
---
<img src="/assets/computer-architecture/1-1-1.png" alt="Computer Architecture" width="600"/>

In this part, we will explore computer architecture, both x86-64 and RISC-V architecture.

## 1 Number Representation

### 1.1 Number Base

In computer science, There are three commonly-used number bases: binary, decimal & hexadecimal.

1. Binary (base 2)
    * Symbols: 0, 1
    * Notation: $101011_2=\texttt{0b101011}$
    * Converting numbers to base 2 lets us represent numbers as bits!
2. Decimal (base 10)
    * Symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    * Notation: $9472_{10}=9472$
    * Understandable by humans, used in our daily life.
3. Hexadecimal (base 16)
    * Symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
    * Notation: $2A5D_{16}=\texttt{0x22400}$
    * A convenient shorthand for writing long sequences of bits.

<span style="color:BlueViolet">Conversion between bases</span>

1. Convert from other bases to base-10: write out power of bases.

   For example, $AC2_{16}=(10 \times 16^2)+(12 \times 16^1)+(2 \times 16^0)=2754$
2. Convert from base-10 to other bases: Use the "leftover algorthm"

   For example, convert $73_{10}$ to base-4. For base-4, the powers of base include 256, 64, 16, 4, 1.

   * How many multiples of $64$ fit in $73$? $73 - 64 = 9$ left over.
   * How many multiples of $16$ fit in $9$? Still $9$ left over.
   * How many multiples of $4$ fit in $9$? $9 - 2 \times 4 = 1$ left over.
   * How many multiples of $1$ fit in $1$? $1 - 1 = 0$, which means we are done!

   Therefore, $73_{10}=1021_4$.

When converting between different bases, you can refer to the following table below.

| Decimal | Binary     | Hexadecimal |
|---------|------------|-------------|
| $0$     | $0000$     | $0$         |
| $1$     | $0001$     | $1$         |
| $2$     | $0010$     | $2$         |
| $3$     | $0011$     | $3$         |
| $4$     | $0100$     | $4$         |
| $5$     | $0101$     | $5$         |
| $6$     | $0110$     | $6$         |
| $7$     | $0111$     | $7$         |
| $8$     | $1000$     | $8$         |
| $9$     | $1001$     | $9$         |
| $10$    | $1010$     | $A$         |
| $11$    | $1011$     | $B$         |
| $12$    | $1100$     | $C$         |
| $13$    | $1101$     | $D$         |
| $14$    | $1110$     | $E$         |
| $15$    | $1111$     | $F$         |

<div class="Aside">
    <h3>Aside</h3>
    <ol>
        <li>Beware of padding with zeros! When converting from binary to hexadecimal, 
        left-padding if needed ($\texttt{0b110010}=\texttt{0b0011 0010}=\texttt{0x32}$); when converting from hexadecimal, drop leading zeros if needed($\texttt{0x1D}=\texttt{0b0001 1101}=\texttt{0b11101}$).</li>
        <li>1 byte=8 bits, 1 nibble=4 bits.</li>
    </ol>
</div>

### 1.2 Integer Representation

#### 1.2.1 Unsigned Integers

<p style="color:BlueViolet">Properties</p>

* Idea: Simply convert decimal to binary, cCan represent $2^N$ different numbers!
* Smallest number: $\texttt{0b 0000...000}$ represents $0$.
* Largest number: $\texttt{0b 1111...111}$ represents $2^N-1$.

<p style="color:BlueViolet">Conclusion</p>

<table>
    <thead>
        <tr>
            <th colspan="2">Unsigned Integer</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Can represent negative numbers</td>
            <td>&#10008;</td>
        </tr>
        <tr>
            <td>Doing math is easy</td>
            <td>&#10004;</td>
        </tr>
        <tr>
            <td>Every bit sequence represents a unique number</td>
            <td>&#10004;</td>
        </tr>
    </tbody>
</table>

#### 1.2.2 Signed Integers

<p style="color:BlueViolet">Properties</p>

* Idea: Use the left-most bit to indicate if the number is positive (0) or negative (1). This is called sign-magnitude representation.
* Smallest number: $\texttt{0b1111...111}$ represents $-\left(2^{N - 1} - 1\right)$.
* Largest number: $\texttt{0b0111...111}$ represents $+\left(2^{N - 1} - 1\right)$.

<div class="Note">
    <h3>Note</h3>
    <p>If we count upwards in base-2, the resulting numbers increase, then they start decreasing!</p>
    <p>Plus, there are two ways of representing zero: $\texttt{0b100...00}$ & $\texttt{0b000..00}$.</p>
    <img src="/assets/computer-architecture/1-1-2.png" alt="Signed Integer" width="600"/>
</div>

<table>
    <thead>
        <tr>
            <th colspan="2">Sign-Magnitude</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Can represent negative numbers</td>
            <td>&#10004;</td>
        </tr>
        <tr>
            <td>Doing math is easy</td>
            <td>&#10008;</td>
        </tr>
        <tr>
            <td>Every bit sequence represents a unique number</td>
            <td>&#10008;</td>
        </tr>
    </tbody>
</table>

#### 1.2.3 One's Complement

<p style="color:BlueViolet">Properties</p>

* Idea: If the number is negative, flip the bits. For example, $+7$ is $\texttt{0b00111}$, so $-7$ is $\texttt{0b11000}$. Left-most bit acts like a sign bit. If it's 1, someone flipped the bits, so number must be negative.
* Smallest number: $\texttt{0b1000...000}$ represents $-\left(2^{N - 1} - 1\right)$.
* Largest number: $\texttt{0b0111...111}$ represents $+\left(2^{N - 1} - 1\right)$.

<div class="Note">
    <h3>Note</h3>
    <p>If we count upwards in base-2, the resulting numbers are always increasing.</p>
    <p>There are two ways of representing zero: $\texttt{0b111...11}$ & $\texttt{0b000..00}$.</p>
    <img src="/assets/computer-architecture/1-1-3.png" alt="One's Complement" width="600"/>
</div>

<table>
    <thead>
        <tr>
            <th colspan="2">One's Complement</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Can represent negative numbers</td>
            <td>&#10004;</td>
        </tr>
        <tr>
            <td>Doing math is easy</td>
            <td>&#10004;</td>
        </tr>
        <tr>
            <td>Every bit sequence represents a unique number</td>
            <td>&#10008;</td>
        </tr>
    </tbody>
</table>

#### 1.2.4 Two's Complement

<p style="color:BlueViolet">Properties</p>

* Idea: If the number is negative, flip the bits, and add one (because we shift to avoid double-zero). Because of overflow, addition behaves like modular arithmetic (For example, $11$ and $-5$ are the same in $\bmod$ land: $11 \equiv -5 \pmod{16}$).
* Smallest number: $\texttt{0b1000...000}$ represents $-2^{N - 1}$.
* Largest number: $\texttt{0b0111...111}$ represents $+\left(2^{N - 1} - 1\right)$.

<div class="Aside">
    <h3>Aside</h3>
    <p>Another definition: The left-most power of 2 is now negative, not positive.</p>
    <ol>
        <li>Left-most bit 0: Read the rest of the number as an unsigned integer.</li>
        <li>Left-most bit 1: Subtract a big power of 2. Resulting number is negative!</li>
        <li>For example, $0000$-$0111$ represent $0$-$7$, while $1000$-$1111$ represent $-8$-$-1$.</li>
    </ol>
</div>

<p style="color:BlueViolet">Conversion between two's complement and signed integer</p>

1. Two's Complement -> Signed Integer
    * If left-most digit is 0: Read it as unsigned
    * If left-most digit is 1:
        * Flip the bits, and add 1
        * Convert to base-10, and stick a negative sign in front

    Example: What is $\texttt{0b1110 1100}$ in decimal?
    * Flip the bits: $\texttt{0b0001 0011}$
    * Add one: $\texttt{0b0001 0100}$
    * In base-10: $-20$
2. Signed Integer -> Two's Complement
    * If number is positive: Just convert it to base-2
    * If number is negative:
        * Pretend it's unsigned, and convert to base-2
        * Flip the bits, and add 1
    
    Example: What is $-20$ in two's complement binary?
    * In base-2: $\texttt{0b0001 0100}$
    * Flip the bits: $\texttt{0b1110 1011}$
    * Add one: $\texttt{0b1110 1100}$

<table>
    <thead>
        <tr>
            <th colspan="2">Two's Complement</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Can represent negative numbers</td>
            <td>&#10004;</td>
        </tr>
        <tr>
            <td>Doing math is easy</td>
            <td>&#10004;</td>
        </tr>
        <tr>
            <td>Every bit sequence represents a unique number</td>
            <td>&#10004;</td>
        </tr>
    </tbody>
</table>

