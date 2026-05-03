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

On execute un scénario de CRUD standard todo-basic : 
* lister sur une page 10000 todos
* créer une todo
* supprimer une todo

| Technologie utilisée | Estimation Empreinte carbone todo-basic | Consommation électrique todo-basic | Commentaires                                          |
|:--------------------:|:---------------------------------------:|:----------------------------------:|:-----------------------------------------------------:|
| Fresh                | 4-8 mg eq co2                           | 10-17 mWh                          | Javascript https://github.com/denoland/fresh 13k stars |
| Dioxus               | 4-18 mg eq co2                          | 9-41 mWh                           | Rust https://github.com/DioxusLabs/dioxus 35k stars   |
| Meteor               | 9-10 mg eq co2                          | 21-22 mWh                          | Javascript https://github.com/meteor/meteor 44k stars |
| Laravel Vue          | 10 mg eq co2                            | 22 mWh                             | PHP    https://github.com/laravel/laravel    80k stars |
| Laravel React        | 10,4 mg eq co2                          | 23 mWh                             | PHP    https://github.com/laravel/laravel    80k stars |
| Laravel Svelte       | 10,5 mg eq co2                          | 23 mWh                             | PHP    https://github.com/laravel/laravel    80k stars |
| Nuxt                 | 11-15 mg eq co2                         | 24 mWh                             | Javascript https://github.com/nuxt/nuxt 59k stars |
| NextJS               | 13-14 mg eq co2                         | 30 mWh                             | Javascript https://github.com/vercel/next.js 138k stars |
| SvelteKit            | 12,8 mg eq co2                          | 29 mWh                             | Javascript https://github.com/sveltejs/kit 20k stars |
| Qwik                 | 16 mg eq co2                            | 36 mWh                             | Javascript https://github.com/QwikDev/qwik 21k stars |
| Adonis               | 17-20 mg eq co2                         | 39-46 mWh                          | Javascript https://github.com/adonisjs/core 18k stars |
| TanStack             | 18 mg eq co2                            | 42 mWh                             | Javascript https://github.com/TanStack/router 13k stars |
| Django               | 22 mg eq co2                            | 50 mWh                             | Python https://github.com/django/django 87k stars |
| Solid Start          | 25 mg eq co2                            | 56 mWh                             | Javascript https://github.com/solidjs/solid-start 6k stars |
| Wasp                 | 30 mg eq co2                            | 68 mWh                             | Javascript https://github.com/wasp-lang/wasp 18k stars |
| Remix                | 220 mg eq co2                           | 498 mWh                            | Javascript https://github.com/remix-run/remix 32k stars |
| VanillaJS Server Side Rendering | 18.9 mg eq. co2              | 42 mWh                             |
| VanillaJS Client Side Rendering | 9.5 mg eq. co2               | 21 mWh                             |


On execute un scénario de CRUD standard todo-advanced :
* lister sur une page 10000 todos
* créer et supprimer 10 todos

| Technologie utilisée | Estimation Empreinte carbone todo-advanced | Consommation électrique todo-advanced | Commentaires                                          |
|:--------------------:|:---------------------------------------:|:----------------------------------:|:-----------------------------------------------------:|
| Fresh                | 29 mg eq co2 | 67 mWh | Javascript https://github.com/denoland/fresh 13k stars |
| Laravel Svelte       | 54 mg eq co2 | 122 mWh | PHP    https://github.com/laravel/laravel    80k stars |
| Nuxt                 | 55 mg eq co2    | 126 mWh | Javascript https://github.com/nuxt/nuxt 59k stars |
| Dioxus               | 55-58 mg eq co2 | 132 mWh | Rust https://github.com/DioxusLabs/dioxus 35k stars   |
| NextJS               | 62 mg eq co2 | 141 mWh | Javascript https://github.com/vercel/next.js 138k stars |
| Laravel Vue          | 70 mg eq co2 | 158 mWh | PHP    https://github.com/laravel/laravel    80k stars |
| Laravel React        | 71 mg eq co2 | 161 mWh | PHP    https://github.com/laravel/laravel    80k stars |
| Qwik                 | 74 mg eq co2 | 167 mWh | Javascript https://github.com/QwikDev/qwik 21k stars |
| Meteor               | 87 mg eq co2 | 196 mWh | Javascript https://github.com/meteor/meteor 44k stars |
| TanStack             | 113-117 mg eq co2 | 257 mWh | Javascript https://github.com/TanStack/router 13k stars |
| Wasp                 | 143 mg eq co2 | 325 mWh | Javascript https://github.com/wasp-lang/wasp 18k stars |
| Adonis               | 179-181 mg eq co2 | 411 mWh | Javascript https://github.com/adonisjs/core 18k stars |
| Django               | 219 mg eq co2 | 497 mWh | Python https://github.com/django/django 87k stars |
| Remix                | Timeout | Timeout | Javascript https://github.com/remix-run/remix 32k stars |
| SvelteKit            | Timeout | Timeout | Javascript https://github.com/sveltejs/kit 20k stars |

## Analyse du résultat

### Fresh est le framework web le moins émetteur de CO2

* Zero JS par défaut : Fresh n'envoie du JavaScript au client que pour les "islands" interactives. La page HTML est rendue côté serveur, sans bundle React/Vue complet.
* Pas de Virtual DOM : utilise Preact (3 KB) au lieu de React (45 KB). Les signaux Preact (useSignal) évitent les re-renders inutiles.

### Dioxus 

* Rust = efficacité mémoire maximale : le binaire compilé consomme une fraction de la RAM d'un runtime Node.js/Python. Pas de GC (garbage collector), pas de JIT overhead.
* Server Functions typées : #[server] compile les appels client→serveur en RPC optimisés, sans couche HTTP superflue.
* WASM côté client : le frontend compilé en WebAssembly est plus efficace que du JS interprété pour les opérations répétitives mais le WASM initial peut être pénalisant et le cold start explique la grande variance

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

```greenframe analyze http://172.17.0.1:3000 ./_Greenframe/todo-basic.js```

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

```/home/fernando/.local/bin/greenframe analyze http://192.168.0.107:3333 ./_Greenframe/todo-basic.js```

## Lancer les applications

* Adonis : 
npm run build
cd build
mkdir -p tmp
cp ../tmp/db.sqlite3 tmp/
npm ci --omit="dev"
NODE_ENV=production PORT=3000 HOST=0.0.0.0 LOG_LEVEL=info APP_KEY=PQMgcKUcNlWjOUPMBuVHRu_b5bC8FzEb node bin/server.js
* Dioxus : 
dx build --release --web --fullstack
cp -r target/dx/dioxus-app/release/web/public target/x86_64-unknown-linux-gnu/server-release/public
IP=0.0.0.0 PORT=3000 ./target/x86_64-unknown-linux-gnu/server-release/dioxus-app
* Django : python3 manage.py runserver 0.0.0.0:3000
* Fresh : deno run build && deno run start
* Laravel : php artisan serve --host=0.0.0.0 --port=3000
* Meteor : meteor run
* NextJS : npm run build && npm start
npm run build* Nuxt : npm run build && npm start
* Qwik : npm run build && npm start
* Remix : npm run build && npm start
* Solid : npm run build && npm start
* Sveltekit : npm run build && npm start
* Tanstack : npm run build && npm start
* Wasp : wasp start
