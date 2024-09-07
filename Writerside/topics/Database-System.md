<show-structure for="chapter" depth="3"></show-structure>

# Database System

## 1 SQL

### 1.1 SQL Introduction

<p>SQL = Structured Query Language</p>

<p>Although over 40 years old, it keeps re-emerging as the standard.</p>

<p><format color="BlueViolet">Features:</format> </p>

<list type="bullet">
<li>
    <p><format color="Fuchsia">Declarative!</format></p>
    <list type="bullet">
        <li>Specify <format style="italic">what</format> you want, not 
        <format style="italic">how</format> to get it.</li>  
    </list>
</li>
<li>
    <p><format color="Fuchsia">Implemented widely</format></p>
    <list type="bullet">
        <li>With varying levels of efficiency, completeness.</li>  
    </list>
</li>
<li>
    <p><format color="Fuchsia">Constrained</format></p>
    <list type="bullet">
    <li>
        <p>Not targeted at Turing-complete tasks.</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">General-purpose and feature-rich
    </format></p>
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
<li><format color="DarkOrange">Database:</format> Set of named 
relations.</li>
<li>
<p><format color="DarkOrange">Relation (aka Table):</format> </p>
    <list type="bullet">
        <li><format color="Fuchsia">Schema:</format> description (
        "metadata").</li>
        <li><format color="Fuchsia">Instance:</format> set of data 
        satisfying the schema.</li>
    </list>
</li>
<li><format color="DarkOrange">Attribute (aka Column, Field)</format>
</li>
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

### 1.3 SQL Language

<p><format color="BlueViolet">SQL Language:</format> </p>

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">Two Sublanguages:</format> </p>
    <list type="bullet">
    <li>
        <p><format color="LawnGreen">DDL (Data Definition Language):
        </format> Define and modify schema.</p>
    </li>
    <li>
        <p><format color="LawnGreen">DML (Data Manipulation Language):
        </format> Queries can be written intuitively.</p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">Relational Database Management System 
    (RDBMS):</format> responsible for efficient evaluation, choose 
    and run algorithms for declarative queries (choice of algorithm
    must not affect query answer).</p>
</li>
</list>

<p><format color="BlueViolet">SQL DDL Examples:</format> </p>

<p>Sailors</p>

<table style="header-row">
<tr>
    <td>sid</td>
    <td>sname</td>
    <td>rating</td>
    <td>age</td>
</tr>
<tr>
    <td>1</td>
    <td>Fred</td>
    <td>7</td>
    <td>22</td>
</tr>
<tr>
    <td>2</td>
    <td>Jim</td>
    <td>2</td>
    <td>39</td>
</tr>
<tr>
    <td>3</td>
    <td>Nancy</td>
    <td>8</td>
    <td>27</td>
</tr>
</table>

```SQL
CREATE TABLE Sailors (
    sid INTEGER,
    sname CHAR(100),
    rating INTEGER,
    age FLOAT
    PRIMARY KEY (sid));
```

<p>Boats</p>

<table style="header-row">
<tr>
    <td>bid</td>
    <td>bname</td>
    <td>color</td>
</tr>
<tr>
    <td>101</td>
    <td>Nina</td>
    <td>red</td>
</tr>
<tr>
    <td>102</td>
    <td>Pinta</td>
    <td>blue</td>
</tr>
<tr>
    <td>103</td>
    <td>Santa Maria</td>
    <td>red</td>
</tr>
</table>

```SQL
CREATE TABLE Boats (
    bid INTEGER,
    bname CHAR (20),
    color CHAR(10),
    PRIMARY KEY (bid));
```

<p>Reserves</p>

<table style="header-row">
<tr>
    <td>sid</td>
    <td>bid</td>
    <td>day</td>
</tr>
<tr>
    <td>1</td>
    <td>102</td>
    <td>9/12</td>
</tr>
<tr>
    <td>2</td>
    <td>102</td>
    <td>9/13</td>
</tr>
</table>

```SQL
CREATE TABLE Reserves ( 
    sid INTEGER, 
    bid INTEGER,
    day DATE,
    PRIMARY KEY (sid, bid, day), 
    FOREIGN KEY (sid) REFERENCES Sailors,
    FOREIGN KEY (bid) REFERENCES Boats);
```

<tip>
<list type="decimal">
<li>
    <p><format color="Fuchsia">Primary Key column(s)</format> </p>
    <list type="bullet">
    <li>
        <p>Provides a unique “lookup key” for the relation.</p>
    </li>
    <li>
        <p>Cannot have any duplicate values.</p>
    </li>
    <li>
        <p>Can be made up of &gt;1 column, e.g. (firstname, lastname).
        </p>
    </li>
    </list>
</li>
<li>
    <p><format color="Fuchsia">Foreign Key column(s)</format> </p>
    <list type="bullet">
    <li>
        <p>References a table via the primary key of that table, i.e. 
        references the primary key column of that table.</p>
    </li>
    <li>
        <p>Need not share the name of the referenced primary key.</p>
    </li>
    </list>
</li>
</list>
</tip>