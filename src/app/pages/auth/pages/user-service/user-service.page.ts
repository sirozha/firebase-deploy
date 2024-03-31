import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { Page } from 'src/app/models/page.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PasswordResetComponent } from '../../components/password-reset/password-reset.component';
import { UserServiceMode } from '../../models/user-service.model';
import { PasswordRecoverComponent } from '../../components/password-recover/password-recover.component';

@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.page.html',
  styleUrls: ['./user-service.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonButton,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    PasswordRecoverComponent,
    PasswordResetComponent,
  ],
})
export class UserServicePage {
  @Input() mode!: UserServiceMode;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'oobCode' }) code!: string;

  signInUrl = `/${Page.signIn}`;

  get modeType() {
    return UserServiceMode;
  }

  constructor() {}
}
