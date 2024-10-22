
import {NavigationItem} from "../navigation";

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
        url: '/dashboard-freelance',
        icon: 'feather icon-home'
      },
      {
        id: 'account-management',
        title: 'Gestion du compte',
        type: 'item',
        url: '/account-management',
        icon: 'feather icon-user'
      },
      {
        id: 'offer',
        title: 'Voir les offres',
        type: 'item',
        url: '/offer',
        icon: 'feather icon-tag'
      },
      {
      id: 'proposal',
      title: 'Projet',
      type: 'collapse',
      icon: 'feather icon-tag',
      children: [
        {
          id: 'proposal-list',
          title: 'Propositions',
          type: 'item',
          url: '/new-offer',
          icon: 'feather icon-plus'
        },
        {
          id: 'project',
          title: 'Liste des project',
          type: 'item',
          url: '/offers-list',
          icon: 'feather icon-list'
        }
      ]
      },
      // {
      // id: 'offer',
      // title: 'Offres',
      // type: 'collapse',
      // icon: 'feather icon-tag',
      // children: [
      //   {
      //     id: 'new-offer',
      //     title: 'Nouvelle Offre',
      //     type: 'item',
      //     url: '/new-offer',
      //     icon: 'feather icon-plus'
      //   },
      //   {
      //     id: 'list-offer',
      //     title: 'Liste des Offres',
      //     type: 'item',
      //     url: '/offers-list',
      //     icon: 'feather icon-list'
      //   }
      // ]
      // },
      // {
      //   id: 'freelancer',
      //   title: 'Freelancers',
      //   type: 'collapse',
      //   icon: 'feather icon-user',
      //   children: [
      //     {
      //       id: 'collabateurs',
      //       title: 'Mes collabateurs',
      //       type: 'item',
      //       url: '/user-collaborator',
      //       icon: 'feather icon-user'
      //     },
      //     {
      //       id: 'freelancer-list',
      //       title: 'Liste des freelancers',
      //       type: 'item',
      //       url: '/freelancer-list',
      //       icon: 'feather icon-user-plus'
      //     }
      //   ]
      // },
    ]
  },

];

