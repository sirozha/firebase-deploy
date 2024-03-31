import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  constructor() {}

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return signInWithPopup(this.auth, provider);
  }

  signInWithTwitter() {
    const provider = new TwitterAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return signInWithPopup(this.auth, provider);
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  confirmPasswordReset(code: string, password: string) {
    return confirmPasswordReset(this.auth, code, password);
  }

  signOut() {
    return signOut(this.auth);
  }
}
