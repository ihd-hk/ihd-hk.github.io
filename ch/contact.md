---
layout: page
title: Contact
permalink: /ch/contact.html
page_id: 'contact_page'
language: ch
jumbo_include: 'contact_map.html'
---

# Contact

<div class="row"><div class="col-md-12">
You can contact us on this email or at any of the local offices listed below.

**电邮:** [ihd@ihd-kh.com](mailto:ihd@ihd-kh.com)
</div></div>

<div class="row">
{% for location in site.data.contact_ch %}
<div class="col-md-6 my-4">
## {{ location.name }}

{% if location.address %}
地址
: {{ location.address }}
{% endif %}


{% if location.tel %}
电话
: [{{ location.tel.text }}](tel:{{ location.tel.href }})
{% endif %}


{% if location.fax %}
传真
: [{{ location.fax.text }}](tel:{{ location.fax.href }})
{% endif %}


{% if location.contact %}
联络人
{% for contact in location.contact %}
: **{{ contact.name }}** {% if contact.tel %}([{{ contact.tel.text }}](tel:{{ contact.tel.href }})){% endif %}
{% endfor %}
{% endif %}


</div>
{% endfor %}

</div>