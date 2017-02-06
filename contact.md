---
layout: page
title: Contact Us
permalink: /contact.html
page_id: 'contact_page'
---

# Contact

<div class="row">
{% for location in site.data.contact_en %}
<div class="col-md-6">
## {{ location.name }}

{% if location.address %}
Adddress
: {{ location.address }}
{% endif %}


{% if location.tel %}
Tel
: [{{ location.tel }}](tel:{{ location.tel }})
{% endif %}


{% if location.fax %}
Fax
: [{{ location.fax }}](tel:{{ location.fax }})
{% endif %}


{% if location.contact %}
Contact
{% for contact in location.contact %}
: **{{ contact.name }}** {% if contact.tel %}([{{ contact.tel }}](tel:{{ contact.tel }})){% endif %}
{% endfor %}
{% endif %}


{% if location.email %}
Email
: [{{ location.email }}](mailto:{{ location.email }})
{% endif %}

</div>
{% endfor %}

</div>