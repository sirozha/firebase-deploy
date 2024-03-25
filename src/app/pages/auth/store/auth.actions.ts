import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/pages/profile/models/profile.model';
import { User } from '../models/auth.model';

export const getUser = createAction('[AUTH] Get User');
export const setUser = createAction(
  '[AUTH] Set User',
  props<{ user: User | null }>()
);

export const getProfile = createAction('[AUTH] Get Profile');
export const setProfile = createAction(
  '[AUTH] Set Profile',
  props<{ profile: Profile | null }>()
);

export const getLoaded = createAction('[AUTH] Get Loaded');
export const setLoaded = createAction(
  '[AUTH] Set Loaded',
  props<{ isLoaded: boolean }>()
);

export const signOut = createAction('[AUTH] Sign Out');
