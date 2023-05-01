const CLIENT_ID = '633902444937-9h2et3s8rtkd014plld9fueg3lu669qk.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCPqwgKe14x0uvlRjB3kYPXEEIrdMh0iKg';
const SCOPES = 'https://www.googleapis.com/auth/drive';

export function loadGoogleApi() {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(() => {
          resolve(gapi);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

export function signIn() {
  return gapi.auth2.getAuthInstance().signIn();
}

export function signOut() {
  return gapi.auth2.getAuthInstance().signOut();
}
