# web-fullstack-framework-benchmark

The purpose of this repository is to compare the different web frameworks for building saas platforms, websites ... with the lowest impact.

Digital technology currently accounts for 3 to 4% of global greenhouse gas (GHG) emissions. 
The environmental footprint of digital technology, which is already high, continues to grow exponentially, threatening the climate and biodiversity as well as efforts to achieve ecological transition. 
As IT professionals, it is our responsibility to move towards more responsible development.

During the development phase, it is important to implement best practices in eco-design: https://rweb.greenit.fr/fr/fiches (thanks to the Green-IT association).
But before this phase, there is the question of choosing the right technology (and often the right framework), so we will compare the different web frameworks by creating a to-do list and comparing the results using marmelab/greenframe-cli.

--

Le but de ce dépot git est de comparer les différents framework web permettant de construire un SaaS, un site web avec l'impact minimal.

Le numérique représente aujourd’hui 3 à 4 % des émissions de gaz à effet de serre (GES) dans le monde. 
L'empreinte environnementale du numérique, déjà élevée, continue de croître de façon exponentielle, menaçant autant le climat et la biodiversité que les efforts de transition écologique.
En tant que professionnel de l'informatique, il est de notre responsabilité d'aller vers un développement plus responsable.

Pendant la phase de développement, il faut mettre en place les bonnes pratiques d'éco-conception : https://rweb.greenit.fr/fr/fiches (merci l'association Green-IT).
Mais avant cette phase se pose la question du bon choix technologique (et souvent celle du bon framework), ainsi nous allons comparer les différents framework web en créant une todo et en comparant les résultats en utilisant marmelab/greenframe-cli

## Résultat du benchmark 

On execute un scénario de CRUD standard : 
* lister sur une page 10000 todos
* créer une todo
* supprimer une todo

et voir la consommation de ce scénario pour chaque technologie

| Technologie utilisée | Estimation Empreinte carbone | Consommation électrique | Commentaires |
| :-------------------:|:----------------------------:|:-----------------------:|:------------:|
| Adonis | | | Javascript https://github.com/adonisjs/core 18k stars |
| Dioxus | | | Rust https://github.com/DioxusLabs/dioxus 35k stars |
| Django | | | Python https://github.com/django/django 87k stars |
| Fresh | | | Javascript https://github.com/denoland/fresh 13k stars |
| Grails | | | Groovy https://github.com/grails/grails-core     2k stars |
| Laravel | | | PHP    https://github.com/laravel/laravel    80k stars |
| Leptos | | | Rust   https://github.com/leptos-rs/leptos      18k stars |
| Meteor | | | Javascript https://github.com/meteor/meteor 44k stars |
| NextJS | | | Javascript https://github.com/vercel/next.js 138k stars |
| Nuxt | | | Javascript https://github.com/nuxt/nuxt 59k stars |
| Phoenix        | | | Elixir https://github.com/phoenixframework/phoenix 22k stars |
| Qwik | | | Javascript https://github.com/QwikDev/qwik 21k stars |
| RedwoodJS      | | | Javascript https://github.com/redwoodjs/redwood 16k stars |
| Remix | | | Javascript https://github.com/remix-run/remix 32k stars |
| Ruby on Rails  | | | Ruby   https://github.com/rails/rails         55k stars |
| Solid Start | | | Javascript https://github.com/solidjs/solid-start 6k stars |
| SvelteKit | | | Javascript https://github.com/sveltejs/kit 20k stars |
| T3 Stack       | | | Javascript https://github.com/t3-oss/create-t3-app 27k stars |
| TanStack | | | Javascript https://github.com/TanStack/router 13k stars |
| VanillaJS Server Side Rendering | 18.9 mg eq. co2 | 42 mWh |  |
| VanillaJS Client Side Rendering | 9.5 mg eq. co2 ± 7% |  21 mWh |  |
| Wasp | | | Javascript https://github.com/wasp-lang/wasp 18k stars |


## Lancer le benchmark

### Installer Greenframe 

```curl https://assets.greenframe.io/install.sh | bash```

Je considère que vous vous trouvez dans le dossier : 'todo-app-framework-benchmark'

### Créer les jeux de données

```node initdb.js```

### Lancer et évaluer l'application en javascript Client Side Rendering

Sur le premier terminal : 

```
cd VanillaJS/CSR
node index.js
```

Sur le second terminal : 

```greenframe analyze http://172.17.0.1:3000 ./greenframe/todo-basic.js```

### Lancer et évaluer l'application en javascript Server Side Rendering

Sur le premier terminal : 

```
cd VanillaJS/SSR
node index.js
```

Sur le deuxième terminal : 

```
cd VanillaJS/SSR
node server.js
```

Sur le troisième terminal : 

```greenframe analyze http://172.17.0.1:3000 ./greenframe/vanillajs.js```