// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDlhfQfO5ExjTvXIxD-YF98DB8qbqblQts',
    authDomain: 'firbase-demo-hacktm2018.firebaseapp.com',
    databaseURL: 'https://firbase-demo-hacktm2018.firebaseio.com',
    projectId: 'firbase-demo-hacktm2018',
    storageBucket: 'firbase-demo-hacktm2018.appspot.com',
    messagingSenderId: '485849786549',
    timestampsInSnapshots: true
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
