// Angular Import
import { Component, EventEmitter, Output } from '@angular/core';
import { NavContentComponent } from './nav-content/nav-content.component';
import { NavModule } from '../../../shared/nav.module';

@Component({
  standalone: true,
  imports: [NavModule],
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // public props
  windowWidth: number;
  @Output() NavMobCollapse = new EventEmitter();

  // constructor
  constructor() {
    this.windowWidth = window.innerWidth;
  }

  // public method
  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.NavMobCollapse.emit();
    }
  }
}
