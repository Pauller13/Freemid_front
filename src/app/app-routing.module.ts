// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './presentations/theme/layout/admin/admin.component';
import { GuestComponent } from './presentations/theme/layout/guest/guest.component';
import { AuthGuard } from './core/guards/auth.guard';
import path from 'path';
import { FreemidComponent } from './presentations/freemid/freemid.component';
import { LandingPageComponent } from './presentations/freemid/landing-page/landing-page.component';
import { FeatureComponent } from './presentations/freemid/feature/feature.component';
import { PricingComponent } from './presentations/freemid/pricing/pricing.component';
import { AboutUsComponent } from './presentations/freemid/about-us/about-us.component';
import { ContactComponent } from './presentations/freemid/contact/contact.component';
import { NotFoundComponent } from './presentations/freemid/not-found/not-found.component';
import { RoleComponent } from './presentations/pages/role/role.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/freemid',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./presentations/pages/dashboard/dash-analytics.component'),
        title: 'Tableau de Bord Client',
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'account-management',
        loadComponent: () =>
          import('./presentations/pages/account-management/account-management.component').then((m) => m.AccountManagementComponent),
        title: 'Gestion du  Compte Client',
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'new-offer',
        loadComponent: () => import('./presentations/pages/offre/new-offer/new-offer.component').then((m) => m.NewOfferComponent),
        title: "Création d'une Nouvelle Offre ",
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'offers-list',
        loadComponent: () => import('./presentations/pages/offre/offer-list/offer-list.component').then((m) => m.OfferListComponent),
        title: "Liste des Offres",
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'offer-edit',
        loadComponent: () => import('./presentations/pages/offre/offer-edit/offer-edit.component').then((m) => m.OfferEditComponent),
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'offer-proposals/:id',
        loadComponent: () => import('./presentations/pages/offre/detail-offer/detail-offer.component').then((m) => m.DetailOfferComponent),
        title: "Proposition d'Offre",
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'my-profile',
        loadComponent: () => import('./presentations/pages/client-profile/client-profile.component').then((m) => m.ClientProfileComponent),
        title: "Mon Profile",
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'user-collaborator',
        loadComponent: () =>
          import('./presentations/pages/client-collaborator/client-collaborator.component').then((m) => m.ClientCollaboratorComponent),
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'dashboard-freelance',
        loadComponent: () => import('./presentations/pages/dashboard/dash-analytics.component'),
        canActivate: [AuthGuard],
        data: { roles: ['freelancer'] }
      },
      {
        path: 'compte-freelance',
        loadComponent: () =>
          import('./presentations/pages/freelancer/account-management-freelancer/account-management-freelancer.component').then(
            (m) => m.AccountManagementFreelancerComponent
          ),
        title: 'compte freelance',
        canActivate: [AuthGuard],
        data: { roles: ['freelancer'] }
      },

      {
        path: 'liste-offres',
        loadComponent: () => import('./presentations/pages/freelancer/list-offer/list-offer.component').then((m) => m.ListOfferComponent),
        title: 'Liste des offres',
        canActivate: [AuthGuard],
        data: { roles: ['freelancer'] }
      },
      {
        path: 'details-offres',
        loadComponent: () =>
          import('./presentations/pages/freelancer/details-offer/details-offer.component').then((m) => m.DetailsOfferComponent),
        title: "Détails de l'Offre",
        canActivate: [AuthGuard],
        data: { roles: ['freelancer'] }
      },
      {
        path: 'propositions-offres',
        loadComponent: () =>
          import('./presentations/pages/freelancer/propositional-offer/propositional-offer.component').then(
            (m) => m.PropositionalOfferComponent
          ),
        title: "Propostions d'offres",
        canActivate: [AuthGuard],
        data: { roles: ['freelancer'] }
      },

      {
        path: 'liste-projets',
        loadComponent: () =>
          import('./presentations/pages/freelancer/list-projects/list-projects.component').then(
            (m) => m.ListProjectsComponent
          ),
        title: "Liste des projets",
        canActivate: [AuthGuard],
        data: { roles: ['freelancer'] }
      },
      {
        path: 'tableau de bord',
        loadComponent: () =>
          import('./presentations/pages/freelancer/dashboard-freelance/dashboard-freelance.component').then(
            (m) => m.DashboardFreelanceComponent
          ),
        title: 'Tableau de Bord Freelance',
        canActivate: [AuthGuard],
        data: { roles: ['freelancer'] }
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./presentations/pages/general/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./presentations/pages/general/authentication/sign-in/sign-in.component')
      },
      {
        path: 'role',
        loadComponent: () => import('./presentations/pages/role/role.component').then((m) => m.RoleComponent)
      },
      {
        path: 'freemid',
        component: FreemidComponent,
        children: [
          { path: '', component: LandingPageComponent },
          { path: 'feature', component: FeatureComponent },
          { path: 'pricing', component: PricingComponent },
          { path: 'about', component: AboutUsComponent },
          { path: 'contact', component: ContactComponent }
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
