---
layout: "../../layouts/NotesLayout.astro"
title: 'Database System'
description: 'Database System'
author: 'Zeyu Li'
tags: ["Database System", "Computer Science"]
---
## 1 SQL Part Ⅰ

### 1.1 SQL Introduction

## 2 Disks & Drives

### 2.1 DBMS Architectures

<img src="/assets/database-system/3-1-1.png" alt="Favicon" width="600"/>

<span style="color:BlueViolet">Features</span>

* Organized in layers
* Each layer abstracts the layer below: Manage complexity (easy to use) & Performance assumptions (assume the perfomrance of lower layers)
* Two cross-cutting issues related to storage and memory management: Concurrency control & Recovery

### 2.2 Disks

<span style="color:BlueViolet">Memory Hierarchy</span>

<img src="/assets/database-system/3-2-1.png" alt="Favicon" width="600"/>

<span style="color:BlueViolet">Disk Components</span>

<img src="/assets/database-system/3-2-2.png" alt="Favicon" width="600"/>

Platters spin together (around 15000 rpm). Arm assembly can move in or out to position a head on a desired track, but only one head reads/writes at any one time.

<span style="color:BlueViolet">Disk Operation & Access Time</span>

Disks read and write data in sector-size blocks with access time of three components.

<ul>
<li><span style="color:Fuchsia">Seek Time:</span> Moving arms to position disk head on track that contains that contains the target sector.</li>
<li><span style="color:Fuchsia">Rotational Delay:</span> Waiting for block to rotate the first bit of the target sector to pass under the head.</li>

$$
T_{\text{max rotation}}=\frac{1}{\text{RPM}} \times \frac{60s}{1min}
$$

$$
T_{\text{avg rotation}}=\frac{1}{2} \times T_{\text{max rotation}}
$$

<li><span style="color:Fuchsia">Transfer Time:</span> Moving data to/from disk surface (Read/Write the contents of the sector).</li>
</ul>

$$
T_{\text{avg transfer}}=\frac{1}{\text{RPM}} \times \frac{1}{\text{average \# sectors/tracks}} \times \frac{60s}{1min}
$$

<span style="color:BlueViolet">Disk Capacity</span>

Disk capacity is determined by the following technology factors.

<ul>
<li><span style="color:Fuchsia">Recording Density (bits/in):</span> The number of bits that can be squeezed into a 1-inch segment of a track.</li>
<li><span style="color:Fuchsia">Track density (tracks/in):</span> The number of tracks that can be squeezed into a 1-inch segment of the radius extending from the center of the platter.</li>
<li><span style="color:Fuchsia">Areal density (bits/in<sup>2</sup>):</span> The product of the recording density and the track density.</li>

$$
\text{Capacity} = \frac{\text{\# bytes}}{\text{sector}} \times
                \frac{\text{average \# sectors}}{\text{track}} \times \frac{\text{\# tracks}}{\text{surface}} \times
                \frac{\text{\# surfaces}}{\text{platter}} \times \frac{\text{\# platters}}{\text{disk}}
$$

</ul>