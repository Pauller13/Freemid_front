export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
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
        url: '/dashboard',
        icon: 'feather icon-home'
      },
      {
        id: 'account-management',
        title: 'Gestion du compte',
        type: 'item',
        url: '/account-management',
        icon: ''
      },
      {
      id: 'offer',
      title: 'Offres',
      type: 'collapse', 
      icon: 'feather icon-tag',
      children: [
        {
          id: 'new-offer',
          title: 'Nouvelle Offre',
          type: 'item',
          url: '/new-offer',
          icon: 'feather icon-plus'
        },
        {
          id: 'list-offer',
          title: 'Liste des Offres',
          type: 'item',
          url: '/offers-list',
          icon: 'feather icon-list'
        }
      ]
      },
      {
        id: 'freelancer',
        title: 'Freelancers',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'collabateurs',
            title: 'Mes collabateurs',
            type: 'item',
            url: '/collaborateurs',
            icon: 'feather icon-user'
          },
          {
            id: 'freelancer-list',
            title: 'Liste des freelancers',
            type: 'item',
            url: '/freelancer-list',
            icon: 'feather icon-user-plus'
          }
        ]
      },
    ]
  },

];
