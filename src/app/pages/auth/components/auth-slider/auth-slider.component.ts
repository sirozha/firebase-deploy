import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-slider',
  templateUrl: `./auth-slider.component.html`,
  styleUrl: './auth-slider.component.scss',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSliderComponent {}
