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

<div class="Aside">
    <h3>Aside</h3>
    <p>When convert between different bases, you can refer to the following table below.</p>
    
</div>
