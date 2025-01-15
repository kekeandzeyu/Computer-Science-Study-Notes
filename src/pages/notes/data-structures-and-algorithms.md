---
layout: "../../layouts/NotesLayout.astro"
title: 'Data Structures and Algorithms'
author: 'Zeyu Li'
tags: ["Data Structures and Algorithms", "Computer Science"]
---
## 1 Data Structures and Algorithms Overview

### 1.1 Mathematical Models

Cost Models: Use some basic operations as a proxy for running time.

|       Operation      |                       Frequency                        |
|----------------------|--------------------------------------------------------|
| Variable Declaration |                        $N + 2$                         |
| Assignment Statement |                        $N + 2$                         |
|   Less than Compare  |    $\frac{\left(N + 1\right)\left(N + 2\right)}{2}$    |
|   Equal to Compare   |              $\frac{N\left(N - 1\right)}{2}$           |
|     Array Access     |                 $N\left(N - 1\right)$                  |
|      Increment       |$\frac{N\left(N - 1\right)}{2}$ to $N\left(N - 1\right)$|

Key Notes:
* Estimate running time (or memory) as a function of input size $N$
* Ignore lower order terms
    * When $N$ is large, terms are negligible.
    * When $N$ is small, we don't care.