import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-teaser',
  templateUrl: `./auth-teaser.component.html`,
  styleUrl: './auth-teaser.component.scss',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthTeaserComponent {}
