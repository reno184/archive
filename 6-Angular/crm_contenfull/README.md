# CRM

CRM est site d'entrainement

# technical architecture
- fontawesome *regular*
- bootstrap 5
- PWA web-manifest
- firebase Storage (upload)
- angular
- ngrx
- editor markdown


## Technique utile

- store & immutability
- size-detector component
- animation
- resize img
- guard

## layout css
- modal layout, media query
- there is a menu component responsive `xs-menu-component`

## cloud function
> language used is javascript
- `test.js` is a trigger on function <ins>storage</ins>
- `routerFeature.js` firestore collection, timestamp, update, delete, batch, orderby, and npm slugify, sanitize...
- `resizeImg.js` and `copyImage` are same
- `index.js` middleware, auth, role...
- `deleteImg.js` cloud function trigger delete thumb images nested to origin image
- `auth.js` add, update, remove, claims

## npm
- there is a proxy/conf.json, it's seem not used anymore
- npm underscore.string
- npm sanitize-html



### authentification

- Afficher le nom de l'utilisateur
- Limiter les routes (guard)
- token http header authorization

**Afficher le nom de l'utilisateur**
Ce fait uniquement via l'intermédiaire de Observable authStateChange, sachant qu'on a besoin uniquement de l'email, si
besoin de plus d'infos il est possible de lire le token du localstorage.

**Limiter les routes (guard)**
La fonction canActivate peut être asynchrone donc du coup il faut faire un refreshToken à chaque changement de route

**Todo**
todo sanitize et slug

## Voir pour les images

Il y 3 dossiers placeholder : image minifiée d'une lesson suite enregistrement une base d'un nouveau cour images : image
200* 200 d'une lesson stock: image original

image original, il n'y a pas de trigger à sa création, tout ce gère côté client, au niveau de la suppression il n'y a
pas de trigger car il n'y a pas de lien avec une lesson car quand on importe une image à la création d'une lesson, on
réalise une copie.

lorsqu'une nouvelle lesson est créer alors, on va chercher le path de l'image original, on créer deux nouvelles
images... lorsqu'on supprime un lesson alors on va chercher le path est on supprime l'images. lorsqu'on appelle un
lesson on va chercher les deux images.



