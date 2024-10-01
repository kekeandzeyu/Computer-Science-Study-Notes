<show-structure for="chapter" depth="3"></show-structure>

# Database System

## 1 SQL Part Ⅰ

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

<code-block lang="sql" collapsible="true">
CREATE TABLE Sailors (
    sid INTEGER,
    sname CHAR(100),
    rating INTEGER,
    age FLOAT
    PRIMARY KEY (sid));
</code-block>

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

<code-block lang="sql" collapsible="true">
CREATE TABLE Boats (
    bid INTEGER,
    bname CHAR (20),
    color CHAR(10),
    PRIMARY KEY (bid));
</code-block>

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

<code-block lang="sql" collapsible="true">
CREATE TABLE Reserves ( 
    sid INTEGER, 
    bid INTEGER,
    day DATE,
    PRIMARY KEY (sid, bid, day), 
    FOREIGN KEY (sid) REFERENCES Sailors,
    FOREIGN KEY (bid) REFERENCES Boats);
</code-block>

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

### 1.4 SQL Queries

<p><format color="BlueViolet">Basic Single Table Queries:</format> </p>

<code-block lang="sql" collapsible="true">
SELECT [DISTINCT] &lt;column expression list&gt;
FROM &lt;single table&gt;
[WHERE &lt;predicate&gt;]
</code-block>

<list type="bullet">
<li>
    <p>Produce all tuples in the table that satisfy the predicate.</p>
</li>
<li>
    <p>Output the expressions in the SELECT list,</p>
</li>
<li>
    <p>Expression can be a column reference, or an arithmetic 
    expression over column refs.</p>
</li>
</list>

<p><format color="BlueViolet">Example:</format> </p>

<code-block lang="sql" collapsible="true">
SELECT S.name, S.gpa, S.age*2 AS a2
FROM Students [AS] S
WHERE S.dept = 'CS'
ORDER BY S.gpa DESC, S.name ASC, a2;
LIMIT 3;
</code-block>

<list type="alpha-lower">
<li>
    <p><format color="Fuchsia">SELECT, FROM, WHERE lines:</format> </p>
    <list type="bullet">
    <li>
        <p>Return all unique (name, GPA) pairs from students.</p>
    </li>
    <li>
        <p>DISTINCT specifies removal of duplicate rows before output.
        </p>
    </li>
    <li>
        <p>Can refer to the students table as S, this is called an 
        <format style="italic">alias</format>.</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">ORDER line:</format> </p>
    <list type="bullet">
    <li>
        <p>ORDER BY clause specifies output to be sorted.</p>
        <list type="bullet">
        <li>
            <p>Sorts the output by GPA in descending order, then by 
            name in ascending order.</p>
        </li>
        <li>
            <p>Also computes the value of age*2 and names it a2.</p>
        </li>
        </list>
    </li>
    <li>
        <p>Obviously must refer to columns in the output.</p>
        <p>Note the AS clause for naming output columns!</p>
    </li>
    </list>
</li>
<li>
<p><format color="Fuchsia">LIMIT line:</format> </p>
    <list type="bullet">
    <li>
        <p>Only produces the first 3 output rows.</p>
    </li>
    <li>
        <p>Typically used with ORDER BY.</p>
        <list type="bullet">
        <li>
            <p>Otherwise the output is <format style="italic">non-
            deterministic</format>.</p>
        </li>
        <li>
            <p>Not a "pure" declarative construct in that case – output 
            set depends on algorithm for query processing.</p>
        </li>
        </list>
    </li>
    </list>
</li>
</list>

<p><format color="BlueViolet">Aggregates:</format> </p>

<code-block lang="sql" collapsible="true">
SELECT [DISTINCT] AVG(S.gpa)
FROM Students S
WHERE S.dept = 'CS';
</code-block>

<list>
<li>
    <p>Before producing output, compute a summary (aka an aggregate) 
    of some arithmetic expression.</p>
</li>
<li>
    <p>Produces 1 row of output, with one column of average in this 
    case.</p>
</li>
<li>
    <p>Other aggregates: SUM, COUNT, MAX, MIN (and others).</p>
</li>
</list>

<p><format color="BlueViolet">Group By:</format> </p>

<code-block lang="sql" collapsible="true">
SELECT [DISTINCT] AVG(S.gpa), S.dept
FROM Students S
GROUP BY S.dept
</code-block>

<list type="bullet">
<li>
    <p>Partition table into groups with same GROUP BY column values, 
    can group by a list of columns.</p>
</li>
<li>
    <p>Produce an aggregate result per group, cardinality (rows) of 
    output = number of distinct group values.</p>
</li>
<li>
    <p>Note: can put grouping columns in SELECT list (in this case, 
    average GPA + department).</p>
</li>
</list>

<p><format color="BlueViolet">Having:</format> </p>

<code-block lang="sql" collapsible="true">
SELECT [DISTINCT] AVG(S.gpa), S.dept
FROM Students S
GROUP BY S.dept 
HAVING COUNT(*) &gt; 2
</code-block>

<list type="bullet">
<li>
    <p>The HAVING predicate filters groups</p>
</li>
<li>
    <p>HAVING is applied after grouping and aggregation</p>
    <list type="bullet">
    <li>
        <p>Hence can contain anything that could go in the SELECT list
        </p>
    </li>
    <li>
        <p>i.e., aggs or GROUP BY columns</p>
    </li>
    </list>
</li>
<li>
    <p>HAVING can only be used in aggregate queries</p>
</li>
<li>
    <p>It's an optional clause</p>
</li>
</list>

<img src="../images_database/b1-2.png" alt="SQL Queries"/>

## 2 SQL Part Ⅱ

### 2.1 Join Queries

<p><format color="BlueViolet">Join:</format> Form cross product of the 
tables, output all tuples and select specific columns.</p>

<p><format color="BlueViolet">Example:</format> </p>

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
    <td>Popeye</td>
    <td>10</td>
    <td>22</td>
</tr>
<tr>
    <td>2</td>
    <td>OliveOyl</td>
    <td>11</td>
    <td>39</td>
</tr>
<tr>
    <td>3</td>
    <td>Garfield</td>
    <td>1</td>
    <td>27</td>
</tr>
<tr>
    <td>4</td>
    <td>Bob</td>
    <td>5</td>
    <td>19</td>
</tr>
</table>

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
<tr>
    <td>1</td>
    <td>101</td>
    <td>10/01</td>
</tr>
</table>

<compare type="left-right" first-title="No Alias" second-title="Use Alias">
<code-block lang="sql">
SELECT S.sid, S.sname, R.bid
FROM Sailors, Reserves
WHERE Sailors.sid=Reserves.sid;
</code-block>
<code-block lang="sql">
SELECT S.sid, S.sname, R.bid
FROM Sailors AS S, Reserves AS R
WHERE S.sid=R.sid;
</code-block>
</compare>

<img src="../images_database/b1-3.png" alt="Join Queries"/>

<table style="header-row">
<tr>
    <td>sid</td>
    <td>sname</td>
    <td>bid</td>
</tr>
<tr>
    <td>1</td>
    <td>Popeye</td>
    <td>102</td>
</tr>
<tr>
    <td>2</td>
    <td>OliveOyl</td>
    <td>102</td>
</tr>
</table>

<p><format color="BlueViolet">Self-Joins</format></p>

<code-block lang="sql" collapsible="true">
SELECT x.sname AS sname1,
    x.age AS age1,
    y.sname AS sname2,
    y.age AS age2
FROM Sailors AS x, Sailors AS y
WHERE x.age > y.age;
</code-block>

<table style="header-row">
<tr>
    <td>sname1</td>
    <td>age1</td>
    <td>sname2</td>
    <td>age2</td>
</tr>
<tr>
    <td>Popeye</td>
    <td>22</td>
    <td>Bob</td>
    <td>19</td>
</tr>
<tr>
    <td>OliveOyl</td>
    <td>39</td>
    <td>Popeye</td>
    <td>22</td>
</tr>
<tr>
    <td>OliveOyl</td>
    <td>39</td>
    <td>Garfield</td>
    <td>27</td>
</tr>
<tr>
    <td>OliveOyl</td>
    <td>39</td>
    <td>Bob</td>
    <td>19</td>
</tr>
<tr>
    <td>Garfield</td>
    <td>27</td>
    <td>Popeye</td>
    <td>22</td>
</tr>
<tr>
    <td>Garfield</td>
    <td>27</td>
    <td>Bob</td>
    <td>19</td>
</tr>
</table>

### 2.2 Select & Where Advanced

<p><format color="BlueViolet">Arithmetic Expressions</format></p>

<code-block lang="sql" collapsible="true">
SELECT S.age, S.age-5 AS age1, 2*S.age AS age2
FROM Sailors AS S
WHERE S.sname = 'Popeye';
</code-block>

<note>
<p>Comparison is "=" not "==" !!!</p>
<p><format color="OrangeRed">But SQLite allows this!</format></p>
</note>

<p><format color="IndianRed">SQL Calculator</format></p>

<code-block lang="sql" collapsible="true">
SELECT 
    log(1000) as three,
    exp(ln(2)) as two,
    cos(0) as one,
    ln(2*3) = ln(2) + ln(3) as sanity;
</code-block>

<table style="header-row">
<tr>
    <td>three</td>
    <td>two</td>
    <td>one</td>
    <td>sanity</td>
</tr>
<tr>
    <td>3.0</td>
    <td>2.0</td>
    <td>1.0</td>
    <td>1</td>
</tr>
</table>

<p><format color="BlueViolet">String Comparison</format></p>

<list type="bullet">
<li>
    <p>Old-School SQL</p>
    <code-block lang="sql" collapsible="true">
    SELECT S.sname
    FROM Sailors AS S
    WHERE S.sname LIKE 'B_%';
    </code-block>
</li>
<li>
    <p>Standard Regular Expressions</p>
    <code-block lang="sql" collapsible="true">
    SELECT S.sname
    FROM Sailors AS S
    WHERE S.sname ~ 'B.*';
    </code-block>
</li>
</list>