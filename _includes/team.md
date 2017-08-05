<div class="row team-row">
{% for person in site.data.team %}

<figure class="figure col-md-3">
![{{ person.name }}]({{ person.image | relative_url }}){:.mw-100}

<figcaption class="figure-caption">
**{{ person.name }}**

{{ person.job_title }}
</figcaption>

</figure>

{% endfor %}
</div>
