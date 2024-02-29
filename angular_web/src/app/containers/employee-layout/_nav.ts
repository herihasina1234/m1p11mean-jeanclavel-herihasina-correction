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
  }
  
];
