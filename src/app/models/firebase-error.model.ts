import { FirebaseError } from '@angular/fire/app';

export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return 'Incorrect login or password';
    default:
      return 'Something went wrong. Please try again later.';
  }
};
