# Web Development

## 1 HTML

<p><format color="DarkOrange">HTML (HyperText Markup Language):</format> A 
declarative language that include directives with content.</p>

<p><format color="BlueViolet">Approach</format></p>

<list type="bullet">
<li>
    <p>Start with content to be displayed.</p>
</li>
<li>
    <p>Annotate it with tags.</p>
</li>
</list>

<p><format color="BlueViolet">Types of tags</format></p>

<list>
<li>
    <p><format color="Fuchsia">&lt;p&gt;:</format> paragraph.</p>
</li>
<li>
    <p><format color="Fuchsia">&lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;, 
    &lt;h4&gt;, &lt;h5&gt;, &lt;h6&gt;:</format> heading.</p>
</li>
<li>
    <p><format color="Fuchsia">&lt;ul&gt;, &lt;ol&gt;:</format> 
    unordered &amp; ordered list.</p>
</li>
<li>
    <p><format color="Fuchsia">&lt;li&gt;:</format> list item.</p>
</li>
<li>
    <p><format color="Fuchsia">&lt;a&gt;:</format> link to a local 
    object or a website.</p>
</li>
<li>
    <p><format color="Fuchsia">&lt;img&gt;:</format> image.</p>
</li>
</list>

<p><format color="IndianRed">Example</format></p>

<code-block lang="html" collapsible="true">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;title&gt;Sample Document&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;Heading 1&lt;/h1&gt;
        &lt;p&gt;Paragraph 1&lt;/p&gt;
        &lt;ul&gt;
            &lt;li&gt;Item 1&lt;/li&gt;
            &lt;li&gt;Item 2&lt;/li&gt;
        &lt;/ul&gt;
        &lt;ol&gt;
            &lt;li&gt;Item 1&lt;/li&gt;
            &lt;li&gt;Item 2&lt;/li&gt;
        &lt;/ol&gt;
        &lt;a href="https://www.google.com"&gt;Google&lt;/a&gt;
        &lt;img src="image.jpg" alt="Image"&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code-block>