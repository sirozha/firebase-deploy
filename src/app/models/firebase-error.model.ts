import { FirebaseError } from '@angular/fire/app';

export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/invalid-credential':
      return 'Invalid login or password';
    case 'auth/invalid-action-code':
      return 'Invalid confirmation code';
    default:
      return 'Something went wrong. Please try again later.';
  }
};
