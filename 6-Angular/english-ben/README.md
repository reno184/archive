# EnglishBen-App

A récupérer, inspiration

- Quelques exemples de firebase-admin
- modal center layout
- Il une implementation d'un store avec un state observable très bien fait.
- sinon pourrait un bon exemple pour repartir de zero, car moins de code que crm-contentful, mais moins complet pas de guard par exemple


## Technologies
- The frontEnd use [Angular Fire](https://github.com/angular/angularfire) version 7.5.
- The backend use [firebase-functions](https://www.npmjs.com/package/firebase-functions) version 4.2.0.
- The frontEnd and backEnd use both [typescript](https://www.typescriptlang.org/) version 4.9.4.

> Utiliser dans le backend en typescript est contreproductif, il faut le compiler, alors que côté backend le code est toujours limiter le javascript convient très bien.

> Angular fire est une librarie qui finalement ne sert à rien au regard de se que j'ai fait avec gecko

## deploy
- backend package Run `eslint --ext .ts .` before build.
- backend Run `tsc` to build the project. The build artifacts will be stored in the `lib/` directory.
- backend deploy `firebase deploy --only functions:mambaBlog`
- frontend package Run `eslint "**/*.{ts,tsx}" ` before build.
- frontend Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- backend deploy `firebase deploy --only hosting:englishBen`

