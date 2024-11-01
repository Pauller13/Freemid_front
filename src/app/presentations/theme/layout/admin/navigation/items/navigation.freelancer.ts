import { NavigationItem } from '../navigation';

export const NavigationItems2: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: 'tableau de bord',
        icon: 'feather icon-home' 
      },
      {
        id: 'account-management',
        title: 'Gestion du compte',
        type: 'item',
        url: '/compte-freelance',
        icon: 'feather icon-user' 
      },
      {
        id: 'offer',
        title: 'Voir les offres',
        type: 'item',
        url: '/liste-offres',
        icon: 'feather icon-briefcase' 
      },
      {
        id: 'proposal',
        title: 'Projet',
        type: 'collapse',
        icon: 'feather icon-folder', 
        children: [
          {
            id: 'proposal-list',
            title: 'Propositions',
            type: 'item',
            url: 'propositions-offres',
            icon: 'feather icon-file-plus' 
          },
          {
            id: 'project',
            title: 'Liste des projets',
            type: 'item',
            url: 'liste-projets',
            icon: 'feather icon-layers' 
          }
        ]
      }
    ]
  }
];
