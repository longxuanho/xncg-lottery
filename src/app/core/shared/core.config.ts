import { AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyDKVO54kaYyydaZVCgd9Enpl6fhueufVn0',
  authDomain: 'xncg-lottery.firebaseapp.com',
  databaseURL: 'https://xncg-lottery.firebaseio.com',
  storageBucket: 'xncg-lottery.appspot.com'
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}