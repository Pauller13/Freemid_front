import { Component } from '@angular/core';
import { SharedModule } from '../../theme/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-freemid',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './header-freemid.component.html',
  styleUrl: './header-freemid.component.scss'
})
export class HeaderFreemidComponent {

}
