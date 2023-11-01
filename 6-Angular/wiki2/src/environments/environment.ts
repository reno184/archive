// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  useEmulators : true,
  firebase: {
    projectId: 'protopapyrus',
    appId: '1:314566735424:web:9c532de2aa7351328491a5',
    databaseURL: 'https://protopapyrus.firebaseio.com',
    storageBucket: 'protopapyrus.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAHdu92o69ZIebJZmgyZhVyWK2f3QM-ucw',
    authDomain: 'protopapyrus.firebaseapp.com',
    messagingSenderId: '314566735424',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
