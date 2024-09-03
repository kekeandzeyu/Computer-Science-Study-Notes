<show-structure for="chapter" depth="3"></show-structure>

# Database System

## 1 SQL

### 1.1 SQL Introduction

<p>SQL = Structured Query Language</p>

<p>Although over 40 years old, it keeps re-emerging as the standard.</p>

<p><format color="BlueViolet">Features:</format> </p>

<list type="bullet">
<li>
    <p>Declarative!</p>
    <list type="bullet">
        <li>Specify <format style="italic">what</format> you want, not 
        <format style="italic">how</format> to get it.</li>  
    </list>
</li>
<li>
    <p>Implemented widely</p>
    <list type="bullet">
        <li>With varying levels of efficiency, completeness.</li>  
    </list>
</li>
<li>
<p>Constrained</p>
<list type="bullet">
    <li>
        <p>Not targeted at Turing-complete tasks.</p>
    </li>
</list>
</li>
<li>
<p>General-purpose and feature-rich</p>
<list type="bullet">
    <li>
        <p>Many years of added features.</p>
    </li>
    <li>
        <p>Extensible: Callouts to other languages, databases.</p>
    </li>
</list>
</li>
</list>

### 1.2 Relational Terminology

<p><format color="BlueViolet">Definitions:</format> </p>

<list type="bullet">
<li><format color="DarkOrange">Database:</format> Set of named Relations
.</li>
<li>
<p><format color="DarkOrange">Relation (aka Table):</format> </p>
    <list type="bullet">
        <li><format color="Fuchsia">Schema:</format> description (
        "metadata").</li>
        <li><format color="Fuchsia">Instance:</format> set of data 
        satisfying the schema.</li>
    </list>
</li>
<li><format color="DarkOrange">Attribute (aka Column, Field)</format></li>
<li><format color="DarkOrange">Tuple (aka Record, Row)</format></li>
<li><format color="DarkOrange">Cardinality:</format> Number of rows in a
table.</li>
</list>

<img src="../images_database/b1-1.png" alt="Database"/>

<p><format color="BlueViolet">Properties:</format> </p>

<list type="bullet">
<li>
    <p>Schema is fixed, unique attribute names, atomic (aka primitive) 
    types.</p>
</li>
<li>
    <p>Tables are NOT ordered, they are sets or multisets (bags).</p>
</li>
<li>
    <p>Tables are FLAT, no nested attributes.</p>
</li>
<li>
    <p>Tables DO NOT prescribe how they are implemented/stored on
    disk, which is called <format style="bold">physical data 
    independence</format>.</p>
</li>
</list>

<warning>
<p>Some important notes: </p>
<list type="alpha-lower">
<li>
    <p>Instance must follow the schema to be relations.</p>
</li>
<li>
    <p>Each column has to have distinct names.</p>
</li>
<li>
    <p>Every column must use atomic type!</p>
</li>
</list>
</warning>