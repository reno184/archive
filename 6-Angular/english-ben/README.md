# EnglishBen-App

## todo
- algolia

## Subject 
English-ben is not podcast's specific app, it's actually a cross English application, vocabulary is collected from multiple media (podcast, netFlix)...

## Technologies
- This project use npm --global [node](https://nodejs.org/en) version 18.14.2.
- This project use npm --global [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.
- This project use npm --global [npm Firebase-tools](https://www.npmjs.com/package/firebase-tools) version 11.24.
- The frontEnd use [Angular Fire](https://github.com/angular/angularfire) version 7.5.
- The frontEnd use [firebase](https://www.npmjs.com/package/firebase) version 9.17.2.
- The backEnd use [express](http://expressjs.com/) version 4.18.2.
- The backend use [firebase-functions](https://www.npmjs.com/package/firebase-functions) version 4.2.0.
- The backend use [firebase-admin](https://www.npmjs.com/package/firebase-admin) version 11.5.0.
- The frontEnd and backEnd use both [typescript](https://www.typescriptlang.org/) version 4.9.4.

## deploy
- backend package Run `eslint --ext .ts .` before build.
- backend Run `tsc` to build the project. The build artifacts will be stored in the `lib/` directory.
- backend deploy `firebase deploy --only functions:mambaBlog`
- frontend package Run `eslint "**/*.{ts,tsx}" ` before build.
- frontend Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- backend deploy `firebase deploy --only hosting:englishBen`

## Use cases

### Store
This project use store cause form (into modal) can not emitter value to parent page, so the store is a way answer to this limitation  

## tips
read documentation on AngularFire to best some goods practices

## Emulator and auth
that seems that it's not possible to verifyToken with Google connection with emulator, two fix methods can be applied:
- Comment verifyToken middleWare
- Connect with user/password and declare user into emulator UI Auth




---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
