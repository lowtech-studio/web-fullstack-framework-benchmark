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

Pour executer un scénario de CRUD standard : 
* lister 10000 todos
* créer une todo
* supprimer une todo

| Technologie utilisée | Estimation Empreinte carbone | Consommation électrique |
| :---------------: |:---------------:| :-----:|
| VanillaJS Client Side Rendering | 9.5 mg eq. co2 ± 7% |  21 mWh |
| VanillaJS Server Side Rendering | 18.9 mg eq. co2 ± 10% | 42 mWh |

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

```greenframe analyze http://172.17.0.1:3000 ./greenframe/vanillajs.js```

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
