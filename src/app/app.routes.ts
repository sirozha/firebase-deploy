import { Routes } from '@angular/router';
import {
  canActivate,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { Page } from './models/page.model';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToSignIn = () =>
  redirectUnauthorizedTo([Page.signIn]);
const redirectLoggedInToHome = () => redirectLoggedInTo([Page.home]);

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
    ...canActivate(redirectUnauthorizedToSignIn),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/auth/pages/sign-in/sign-in.page').then(
        (m) => m.SignInPage
      ),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/auth/pages/sign-up/sign-up.page').then(
        (m) => m.SignUpPage
      ),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
    ...canActivate(redirectUnauthorizedToSignIn),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
    ...canActivate(redirectUnauthorizedToSignIn),
  },
  // {
  //   path: 'users',
  //   loadComponent: () =>
  //     import('./pages/users/users.page').then((m) => m.UsersPage),
  //   ...canActivate(adminOnly),
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
