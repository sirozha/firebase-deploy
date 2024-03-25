import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import * as fromApp from './store/reducers';
import * as AuthActions from './pages/auth/store/auth.actions';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  personOutline,
  peopleOutline,
  settingsOutline,
  logOutOutline,
} from 'ionicons/icons';
import { Page, pages } from './models/page.model';
import { Store } from '@ngrx/store';
import { User } from './pages/auth/models/auth.model';
import { AuthService } from './pages/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    JsonPipe,
  ],
})
export class AppComponent {
  user: Signal<User | null>;

  pages = pages;

  constructor(
    private store: Store<fromApp.State>,
    private authService: AuthService,
    private navController: NavController
  ) {
    this.store.dispatch(AuthActions.getUser());
    this.user = this.store.selectSignal(fromApp.getAuthUser);

    addIcons({
      homeOutline,
      personOutline,
      peopleOutline,
      settingsOutline,
      logOutOutline,
    });
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => this.navController.navigateRoot(Page.signIn));
  }
}
