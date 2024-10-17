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
        canActivate: [AuthGuard],data: { roles: ['client'] }
      },
      {
        path: 'account-management',
        loadComponent: () => import('./presentations/pages/account-management/account-management.component').then(m => m.AccountManagementComponent),
        canActivate: [AuthGuard],data: { roles: ['client'] }
      },
      { path: 'new-offer',
        loadComponent: () => import('./presentations/pages/offre/new-offer/new-offer.component').then(m => m.NewOfferComponent),
        canActivate: [AuthGuard],data: { roles: ['client'] }
      },
      { path: 'offers-list',
        loadComponent: () => import('./presentations/pages/offre/offer-list/offer-list.component').then(m => m.OfferListComponent),
        canActivate: [AuthGuard],data: { roles: ['client'] }
      },
      {
        path: 'offer-edit',
        loadComponent: () => import('./presentations/pages/offre/offer-edit/offer-edit.component').then(m => m.OfferEditComponent),
        canActivate: [AuthGuard],data: { roles: ['client'] }
      },
      {
        path: 'offer-proposals/:id',
        loadComponent: () => import('./presentations/pages/offre/detail-offer/detail-offer.component').then(m => m.DetailOfferComponent),
        canActivate: [AuthGuard],data: { roles: ['client'] }
      },
      {
      path: 'freelancer-list',
      loadComponent: () => import('./presentations/pages/freelancer-list/freelancer-list.component').then(m => m.FreelancerListComponent),
      canActivate: [AuthGuard],data: { roles: ['client'] }
    },
    {
    path: 'my-profile',
      loadComponent: () => import('./presentations/pages/client-profile/client-profile.component').then(m => m.ClientProfileComponent),
      canActivate: [AuthGuard],data: { roles: ['client'] }
    },
    {
    path: 'freelancer-profile/:id',
      loadComponent: () => import('./presentations/pages/freelancer-profile/freelancer-profile.component').then(m => m.FreelancerProfileComponent),
      canActivate: [AuthGuard],data: { roles: ['client'] }
    },
    {
      path: 'dashboard-freelance',
        loadComponent: () => import('./presentations/pages/dashboard-freelance/dashboard-freelance.component').then(m => m.DashboardFreelanceComponent),
        canActivate: [AuthGuard],data: { roles: ['freelancer'] }
      },
      
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
        loadComponent: () => import ('./presentations/pages/role/role.component').then(m =>m.RoleComponent)
      },
      {
        path:'freemid',
        component: FreemidComponent,
        children: [
          { path: '', component: LandingPageComponent },
          { path: 'feature', component: FeatureComponent },
          { path: 'pricing', component: PricingComponent },
          { path: 'about', component: AboutUsComponent },
          { path: 'contact', component: ContactComponent },
          
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
