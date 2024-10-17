import { Component } from '@angular/core';
import { SharedModule } from '../../theme/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-freemid',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './footer-freemid.component.html',
  styleUrl: './footer-freemid.component.scss'
})
export class FooterFreemidComponent {

}
