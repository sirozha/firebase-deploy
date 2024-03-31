import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NavController,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { Page } from 'src/app/models/page.model';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { FirebaseError } from '@angular/fire/app';
import { getFirebaseErrorMessage } from 'src/app/models/firebase-error.model';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonButton, CommonModule, ReactiveFormsModule],
})
export class PasswordRecoverComponent {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private toastService: ToastService,
    private loadingService: LoadingService,
  ) {}

  async sendPasswordResetEmail() {
    if (this.form.invalid) {
      return;
    }

    const loading = await this.loadingService.present({
      message: 'Please wait...',
    });

    const { email } = this.form.value;

    this.authService
      .sendPasswordResetEmail(email as string)
      .then(() => {
        console.log('sendPasswordResetEmail => data');
        this.navController.navigateForward(Page.signIn);
        this.toastService.present({
          message: 'Email has been sent',
          color: 'success',
        });
        loading.dismiss();
      })
      .catch((error: FirebaseError) => {
        console.log('sendPasswordResetEmail => error', error);
        loading.dismiss();
        this.toastService.present({
          message: getFirebaseErrorMessage(error),
          color: 'danger',
        });
      });
  }
}
