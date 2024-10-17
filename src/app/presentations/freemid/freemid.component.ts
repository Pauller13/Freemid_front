import { Component } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderFreemidComponent } from './header-freemid/header-freemid.component';
import { FooterFreemidComponent } from './footer-freemid/footer-freemid.component';

@Component({
  selector: 'app-freemid',
  standalone: true,
  imports: [SharedModule, RouterModule, HeaderFreemidComponent, FooterFreemidComponent],
  templateUrl: './freemid.component.html',
  styleUrl: './freemid.component.scss'
})
export class FreemidComponent {

}
