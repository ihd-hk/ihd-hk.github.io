---
layout: page
title: Contact Us
permalink: /contact.html
page_id: 'contact_page'
language: en
jumbo_include: 'contact_map.html'
---

# Contact

<div class="row">
{% for location in site.data.contact_en %}
<div class="col-md-6 my-4">
## {{ location.name }}

{% if location.address %}
Adddress
: {{ location.address }}
{% endif %}


{% if location.tel %}
Tel
: [{{ location.tel.text }}](tel:{{ location.tel.href }})
{% endif %}


{% if location.fax %}
Fax
: [{{ location.fax.text }}](tel:{{ location.fax.href }})
{% endif %}


{% if location.contact %}
Contact
{% for contact in location.contact %}
: **{{ contact.name }}** {% if contact.tel %}([{{ contact.tel.text }}](tel:{{ contact.tel.href }})){% endif %}
{% endfor %}
{% endif %}


{% if location.email %}
Email
: [{{ location.email }}](mailto:{{ location.email }})
{% endif %}

</div>
{% endfor %}

</div>