# les projets
fusionner proto_admin avec full carte management pour la gestion de la carte

# Avantage des websockets versus store redux
 - Beaucoup moins de code car pas besoin de state management
 - Evite de coder une application express
 - Permet de gérér toute l'habilitation avec les rules

# Les compteurs sont efficaces
il faut juste éviter de supprimer plusieurs prices en même temps car les trigger lance l'update en async
cale peut générer des erreurs de compteurs, ou utiliser operateur concatMap pour éviter ce type d'erreur

Aussi à chaque connexion les compteurs peuvent être mise à recompter

# Emulator
il n'y a pas d'emulator, car il est trop difficile pour l'instant de gérer l'authentification et les triggers,
les emulators peuvent servir que pour de petits projets

# readme
```
npm install
cd functions
npm install
firebase projects:list
firebase use dev-mamba
Vérifier que les variables d'environnements d'angular correspondent bien à celle du projet firebase
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase emulators:start (pour debugger un cloud function uniquement)
sinon
npm run dev (compatibl angularFire)
Ne pas oublier de sauvegarder de temps en temps
```
## connexion
- Le login et mot de passe sont stockés en dur dans les variables d'environnement.
- Pas de rôle être connecté uniquement (firebase rules)
- une base de donnée par test, pas de guard, aucun control sur le resto-id passé en paramètre

## Cloud function
La majeure partie des functions sont des triggers.
Il y a quelques fonctions en HTTP

## Ré-initialisation
- Supprimer les cloud functions
  ```
  firebase functions:delete onCreateAnswer onDeleteAnswer onCreateArticle onDeleteArticle onUpdateArticle onCreateFormule onCreateGroup onCreatePrice getCarte getRestoList onCreatePrice onDeletePrice onCreateQuestion onDeleteQuestion onUpdateQuestion
  ```
- Remettre les anciennes rules
```json
service cloud.firestore {
  match /databases/{database}/documents {
    // Secure by default
    match /{document=**} {
      allow read: if false;
      allow write: if false;
    }
  }
}
```
## state and counter
L'idée est de mettre à jour tous les compteurs au lancement de l'application avec un bouton spécial

1. compteur reponse dans question 
- aller dans dans chaque question
- parcourir la sous collection reponse et compter les reponses
- mettre à jour la prop de la question "counter"

2. compteur question dans article
- propriété articles (tableau)
- mettre à jour "article", et incrémenter la prop "counter"

3. compteur article dans un block (price)
- aller dans price
- pour chaque article incrementer la prop counterBlock (permet d'éviter de supprimer un article utilisé dans un block)

4. compteur block dans formule
- aller dans formule/composition et group parcourir chaque block
- aller dans price filtrer sur le block id, comptez
- mettre à jour l'obj block dans formule composition et group

5. compteur block dans group
- parcourir l'obj blocks et comptez
- mettre à jour la prop counter

6. stat
- parcourir les articles, comptez
- parcourir les groups, comptez
- parcourir les formules, comptez
- parcourir les questions, comptez
