import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent, ClientLayoutComponent, EmployeeLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';

const routes: Routes = [     
  { 
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full' 
  }, 

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },    

  {
    path: 'pages_module',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'pages_module',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      }
    ]
  },

  {
    path: 'setting',
    component: DefaultLayoutComponent,
    data: {
      title: 'Parametrages'
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/general-setting/general-setting.module').then((m) => m.GeneralSettingModule)
      }
    ]
  },
  
  {
    path: 'statistic',
    component: DefaultLayoutComponent,
    data: {
      title: 'Statistiques'
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/statistic/statistic.module').then((m) => m.StatisticModule)
      }
    ]
  },
  
  {
    path: '',
    component: ClientLayoutComponent,
    data: {
      title: 'Clients'
    },
    children: [
      {        
        path: 'clients',
        loadChildren: () =>
        import('./views/client/client.module').then((m) => m.ClientModule)
      }
    ]
  },
  {
    path: '',
    component: EmployeeLayoutComponent,
    data: {
      title: 'Employees'
    },
    children: [
      {        
        path: 'employees',
        loadChildren: () =>
        import('./views/employee/employee.module').then((m) => m.EmployeeModule)
      }
    ]
  },

  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },

  {
    path: '**',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
