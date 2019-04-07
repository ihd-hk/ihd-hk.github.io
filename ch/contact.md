---
layout: page
title: 联系方式
permalink: /ch/contact.html
page_id: 'contact_page'
language: ch
---

# 联系方式

<div class="row"><div class="col-md-12">
你可以通过下面的邮箱联系我们或者联系下列的分公司

**电邮:** [ihd@ihd-hk.com](mailto:ihd@ihd-hk.com)
</div></div>

<div class="row">
{% for location in site.data.contact_ch %}
<div class="col-md-6 my-4">
{:#{{ location.id }}}
## {{ location.name }}

{% if location.address %}

地址
: {:.address} {{ location.address }}
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

{:.d-block.d-sm-none.float-right}
[回到顶端](#page)
</div>
{% endfor %}

</div>
