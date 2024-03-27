import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-auth-slider',
  templateUrl: `./auth-slider.component.html`,
  styleUrl: './auth-slider.component.scss',
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthSliderComponent {
  constructor() {
    addIcons({ arrowForwardOutline });
  }
}
