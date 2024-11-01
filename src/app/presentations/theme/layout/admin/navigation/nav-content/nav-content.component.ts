import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';
import { NavigationItem } from '../navigation';
import {NavigationItems2} from "../items/navigation.freelancer";
import {NavigationItems} from "../items/navigation.client";
import { SharedModule } from 'src/app/presentations/theme/shared/shared.module';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { NavModule } from 'src/app/presentations/theme/shared/nav.module';

@Component({
  // standalone: true,
  // imports: [NavModule],
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {


  // Public props
  navigations: NavigationItem[] = []; // Initialiser comme un tableau vide
  wrapperWidth!: number;
  windowWidth: number;

  @Output() NavMobCollapse = new EventEmitter();

  // Constructor
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    this.windowWidth = window.innerWidth;
  }

  // Lifecycle event
  ngOnInit() {
    this.setNavigationItems();
    if (this.windowWidth < 992) {
      document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
    }
  }

  // Public method
  navMob() {
    if (this.windowWidth < 992 && document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
      this.NavMobCollapse.emit();
    }
  }

  private setNavigationItems(): void {
    const userDetailsString = localStorage.getItem('user_details');
    const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
    const role = userDetails ? userDetails.role : null;
    console.log(role);

    // Faire varier la liste de navigation en fonction du rôle de l'utilisateur
    if (role === 'freelancer') {
      this.navigations = NavigationItems2; // Navigation pour les freelances
    } else {
      this.navigations = NavigationItems; // Navigation par défaut pour les clients/administrateurs
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;

      if (parent?.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('pcoded-trigger', 'active');
      } else if (up_parent?.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('pcoded-trigger', 'active');
      } else if (last_parent?.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('pcoded-trigger', 'active');
      }
    }
  }
}
