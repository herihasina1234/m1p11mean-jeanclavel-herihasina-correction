import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [  
  {
    name: 'Services disponibles',
    url: '/clients/services',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'prise de rendez-vous',
    url: '/clients/prendre-rv',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Historque des rendez-vous',
    url: '/clients/appointment',
    iconComponent: { name: 'cil-drop' }
  }
  
];
