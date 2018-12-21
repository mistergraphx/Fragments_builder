---
title: "Acceuil"
description: "Acceuil du site"
layout: index
assets:
 styles: ['./assets/css/page_styles.css',
'./assets/css/page_styles2.css' ]
---


## Bonjour

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, aut! Adipisci omnis maiores corporis vel labore nemo illo nam tempore ullam fugit sapiente consectetur quis, minus dolore, sit itaque vero?


<div>
  <h3>html inside markdown</h3>
</div>

### Nunjuks datas in contents

Front matter datas : layout {{layout}}


{% import "macros/icons.njk" as icons %}

{{ icons.symbol('check') }}

{% for style in assets.styles %}
  {{style|safe}} <br>
{% endfor %}
