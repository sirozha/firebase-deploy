import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavController, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { logoGoogle, logoTwitter } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserCredential } from '@angular/fire/auth';
import { Page } from 'src/app/models/page.model';
import { FirebaseError } from '@angular/fire/app';
import { getFirebaseErrorMessage } from 'src/app/models/firebase-error.model';

@Component({
  selector: 'app-auth-socials',
  templateUrl: `./auth-socials.component.html`,
  styleUrl: './auth-socials.component.scss',
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSocialsComponent {
  constructor(
    private authService: AuthService,
    private navController: NavController,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    addIcons({ logoGoogle, logoTwitter });
  }

  async signInWithGoogle() {
    const loading = await this.loadingService.present({
      message: 'Please wait...',
    });

    this.authService
      .signInWithGoogle()
      .then((data: UserCredential) => {
        console.log('signInWithGoogle => data', data);
        this.navController.navigateForward(Page.home);
        loading.dismiss();
      })
      .catch((error: FirebaseError) => {
        console.log('signInWithGoogle => error', error);
        loading.dismiss();
        this.toastService.present({
          message: getFirebaseErrorMessage(error),
          color: 'danger',
        });
      });
  }

  async signInWithTwitter() {
    const loading = await this.loadingService.present({
      message: 'Please wait...',
    });

    this.authService
      .signInWithTwitter()
      .then((data: UserCredential) => {
        console.log('signInWithTwitter => data', data);
        this.navController.navigateForward(Page.home);
        loading.dismiss();
      })
      .catch((error: FirebaseError) => {
        console.log('signInWithTwitter => error', error);
        loading.dismiss();
        this.toastService.present({
          message: getFirebaseErrorMessage(error),
          color: 'danger',
        });
      });
  }
}
