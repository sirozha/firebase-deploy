import { Component, Input } from '@angular/core';
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
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonButton, CommonModule, ReactiveFormsModule],
})
export class PasswordResetComponent {
  @Input() code!: string;

  form = this.formBuilder.group({
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private toastService: ToastService,
    private loadingService: LoadingService,
  ) {}

  async confirmPasswordReset() {
    if (this.form.invalid) {
      return;
    }

    const loading = await this.loadingService.present({
      message: 'Please wait...',
    });

    const { password } = this.form.value;

    this.authService
      .confirmPasswordReset(this.code as string, password as string)
      .then(() => {
        console.log('confirmPasswordReset => data');
        this.navController.navigateForward(Page.signIn);
        this.toastService.present({
          message: 'Your rassword has been updated',
          color: 'success',
        });
        loading.dismiss();
      })
      .catch((error: FirebaseError) => {
        console.log('confirmPasswordReset => error', error);
        loading.dismiss();
        this.toastService.present({
          message: getFirebaseErrorMessage(error),
          color: 'danger',
        });
      });
  }
}
