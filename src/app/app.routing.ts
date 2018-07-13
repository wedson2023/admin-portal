import { EditarGuiaComercialComponent } from './views/editar-guia-comercial/editar-guia-comercial.component';
import { ListarGuiaComercialComponent } from './views/listar-guia-comercial/listar-guia-comercial.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DashboardResolver } from './views/dashboard/dashboard.resolver';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { GuiaComercialComponent } from './views/guia-comercial/guia-comercial.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [  
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ],
        resolve: { data: DashboardResolver }
      },
      {
        path: 'guia-comercial',
        component: GuiaComercialComponent
      },
      {
        path: 'noticias',
        component: NoticiasComponent
      },

      // listas

      {
        path: 'listar-guia-comercial',
        component: ListarGuiaComercialComponent
      },

      // editar

      {
        path: 'editar-guia-comercial/:id',
        component: EditarGuiaComercialComponent
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
