import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Listes des rendez-vous',
    url: '/employees/appointments',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Details commission',
    url: '/employees/commissions',
    iconComponent: { name: 'cil-drop' }
  },
  {
    title: true,
    name: 'Manager'
  },
  {
    name: 'Parametrages',
    url: '/setting',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Service',
        url: '/setting/service'
      },
      {
        name: 'gestion Personnel',
        url: '/setting/employee'
      }
    ]
  },
  {
    name: 'Statistiques',
    url: '/Temps moyen de travail',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Temps moyen de travail',
        url: '/statistic/average-time-employee'
      },
      {
        name: 'Nombre de réservation',
        url: '/statistic/appointment-count'
      },
      {
        name: 'Chiffre d\'affaires',
        url: '/statistic/revenue'
      },
      {
        name: 'Bénéfice',
        url: '/statistique/benefice'
      }
    ]
  },
];
