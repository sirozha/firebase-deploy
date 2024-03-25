import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserCredential } from '@angular/fire/auth';
import { LoadingService } from 'src/app/services/loading.service';
import { Page } from 'src/app/models/page.model';
import { FirebaseError } from '@angular/fire/app';
import { getFirebaseErrorMessage } from 'src/app/models/firebase-error.model';
import { AuthTeaserComponent } from '../../components/auth-teaser/auth-teaser.component';
import { AuthSliderComponent } from '../../components/auth-slider/auth-slider.component';
import { RouterLink } from '@angular/router';
import { AuthSocialsComponent } from '../../components/auth-socials/auth-socials.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthSocialsComponent,
    AuthTeaserComponent,
    AuthSliderComponent,
  ],
})
export class SignUpPage {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  signInUrl = `/${Page.signIn}`;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  get email(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

  get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  async signUp() {
    if (this.form.invalid) {
      return;
    }

    const loading = await this.loadingService.present({
      message: 'Please wait...',
    });

    const { email, password } = this.form.value;

    this.authService
      .signUp(email as string, password as string)
      .then((data: UserCredential) => {
        console.log('signUp => data', data);
        this.navController.navigateForward(Page.home);
        loading.dismiss();
      })
      .catch((error: FirebaseError) => {
        console.log('signUp => error', error);
        loading.dismiss();
        this.toastService.present({
          message: getFirebaseErrorMessage(error),
          color: 'danger',
        });
      });
  }
}
