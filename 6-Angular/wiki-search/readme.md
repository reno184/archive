
wiki-search est mon site en ligne, le problème c'est que la dernière version ne contient plus de cloud-function avec algolia, d'éditeur markdown, bref il manque des choses...

- les features
  -  Subject formUrlSubmitted, est un évenement soumis manuellement, il permet a angular de faire communiquer un modal (enfant) à la page (parent), par exemple ajouter un element à une liste après enregistrement côté serveur (c'est plus simple avec vu car les modales on des emteurs)
  -  Il y a un exmemple de meta-data par le router
  -  AngularFire (guard, get, delete...) l  il n'y a quasiment pas de couche service, directement du composant à la de la base pour le coup on pas faire plus direct
  -  Algolia, il n'y a plus les cloud functions ??? (version précédente dans git en revanche, il reste la page avec le composant ais-instantsearch)
     

# features
- spa, web manifest
- css 
  - font-awesome-regular
  - quil (markdown tool)
  - algolia (search tool)
- AngularFire
  - AngularFireAuthGuard (routing module)
  - AngularFireStorageModule (app.module)
  - AngularFireAuth (src)
  - AngularFirestore (src)
  - AngularFireStorage(src)
  - AngularFireUploadTask (upload progress bar)
- Angular
  - router-outlet
  - FormGroup, Validators
- Quill-Editor
- cloud-functions
  - algolia
  - storage.bucket
