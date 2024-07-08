# Operating System

## 1 Introduction to Operating System

<p><format color = "DodgerBlue">Definition:</format> Special layer of 
software that provides application software access to hardware resources.
</p>

<img src = "../images_system/1-1.png" alt = "Operating System"/>

<p><format color = "DodgerBlue">What is an Operating System?</format></p>

<list type = "bullet">
<li>
<p><format color = "BlanchedAlmond">Illusionist:</format> Provide 
clean, easy-to-use abstractions of physical resources.</p>
</li>
<li>
<p><format color = "BlanchedAlmond">Referee:</format> Manage 
protection, isolation, and sharing of resources.</p>
</li>
<li>
<p><format color = "BlanchedAlmond">Glue:</format> Common services.</p>
</li>
</list>

### 1.1 Operating System as Illusionist

<img src = "../images_system/1-2.png" alt = "Operating System as Illusionist"/>

<list type = "bullet">
<li>
<p>Application's "machine" <format style = "italic">is</format> the
process abstraction provided by OS.</p>
</li>
<li>
<p>Each running program runs in its own process.</p>
</li>
<li>
<p>Processes provide nicer interfaces than raw hardware.</p>
</li>
</list>

<p><format color = "Chartreuse">A process consists of: </format></p>

<list type = "bullet">
<li>
<p>Address Space</p>
</li>
<li>
<p>One or more threads of control executing in that address space</p>
</li>
<li>
<p>Additional system state associated with it, e.g., open files, 
open sockets, etc.</p>
</li>
</list>

<list type = "bullet">
<li>
<p>OS translates from hardware interface to application interface.</p>
</li>
<li>
<p>OS provides each running program with its own process.</p>
</li>
</list>