<div class="row team-row">
{% for person in site.data.team %}

<figure class="figure col-6 col-md-3">

{% if person.page != null %}

[![{{ person.name }}]({{ person.image | relative_url }}){:.mw-100}]({{person.page}})
{% else %}
![{{ person.name }}]({{ person.image | relative_url }}){:.mw-100}
{% endif %}

<figcaption class="figure-caption">
**{{ person.name }}**

{{ person.job_title }}
</figcaption>

</figure>



{% endfor %}
</div>
