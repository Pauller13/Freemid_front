// Angular Import
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Project import
import { NavigationItem } from 'src/app/presentations/theme/layout/admin/navigation/navigation';
import { NavigationItems } from "../../../layout/admin/navigation/items/navigation.client";
import { NavigationItems2 } from "../../../layout/admin/navigation/items/navigation.freelancer";

interface TitleType {
  url: any;
  title: string;
  breadcrumbs: unknown;
  type: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  // Public props
  @Input() type!: string;

  navigations: NavigationItem[] = []; // Initialiser comme un tableau vide
  breadcrumbList: Array<string> = [];
  navigationList!: TitleType[];

  // Constructor
  constructor(
    private route: Router,
    private titleService: Title
  ) {
    this.setNavigationItems(); // Appeler pour initialiser les éléments de navigation
    this.setBreadcrumb(); // Appeler pour établir le fil d'Ariane
  }

  // Public method
  setBreadcrumb() {
    this.route.events.subscribe((router: Event) => {
      if (router instanceof NavigationEnd) {
        const activeLink = router.url;
        const breadcrumbList = this.filterNavigation(this.navigations, activeLink);
        this.navigationList = breadcrumbList;
        const title = breadcrumbList[breadcrumbList.length - 1]?.title || 'Welcome';
        this.titleService.setTitle(title + ' | Gradient Able Angular free Admin Template');
      }
    });
  }

  filterNavigation(navItems: NavigationItem[], activeLink: string): TitleType[] {
    for (const navItem of navItems) {
      if (navItem.type === 'item' && 'url' in navItem && navItem.url === activeLink) {
        return [
          {
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          }
        ];
      }
      if ((navItem.type === 'group' || navItem.type === 'collapse') && 'children' in navItem) {
        const breadcrumbList = this.filterNavigation(navItem.children!, activeLink);
        if (breadcrumbList.length > 0) {
          breadcrumbList.unshift({
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          });
          return breadcrumbList;
        }
      }
    }
    return [];
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
}
