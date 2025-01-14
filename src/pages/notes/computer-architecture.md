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

* Can represent $2^N$ different numbers, simply convert decimal to binary!
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