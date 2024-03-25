import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../models/auth.model';
import { Profile } from '../../profile/models/profile.model';

export const featureKey = 'auth';

export interface State {
  user: User | null;
  profile: Profile | null;
  isLoaded: boolean;
}

export const initialState: State = {
  user: null,
  profile: null,
  isLoaded: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.setUser, (state, { user }) => ({ ...state, user })),
  on(AuthActions.setProfile, (state, { profile }) => ({ ...state, profile })),
  on(AuthActions.setLoaded, (state, { isLoaded }) => ({ ...state, isLoaded })),
  on(AuthActions.signOut, (state) => ({ ...state, user: null, profile: null }))
);

export const getUser = (state: State) => state.user;
export const getProfile = (state: State) => state.profile;
export const getLoaded = (state: State) => state.isLoaded;
