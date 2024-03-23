import { DocumentData } from '@angular/fire/firestore';
import { Role } from '../pages/auth/models/role.model';

export type Document = DocumentData & { id: string };

export enum Page {
  signIn = 'sign-in',
  signUp = 'sign-up',
  home = 'home',
  profile = 'profile',
  users = 'users',
  settings = 'settings',
}

export const pages: {
  title: string;
  url: string;
  icon: string;
  roles?: (keyof typeof Role)[];
}[] = [
  { title: 'Home', url: `/${Page.home}`, icon: 'home' },
  { title: 'Profile', url: `/${Page.profile}`, icon: 'person' },
  {
    title: 'Users',
    url: `/${Page.users}`,
    icon: 'people',
    roles: [Role.admin],
  },
  { title: 'Settings', url: `/${Page.settings}`, icon: 'settings' },
];
