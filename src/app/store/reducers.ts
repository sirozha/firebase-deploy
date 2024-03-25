import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuth from '../pages/auth/store/auth.reducer';

export interface State {
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

// Auth
export const getAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.featureKey
);
export const getAuthUser = createSelector(getAuthState, fromAuth.getUser);
export const getProfile = createSelector(getAuthState, fromAuth.getProfile);
export const getAuthLoaded = createSelector(getAuthState, fromAuth.getLoaded);
