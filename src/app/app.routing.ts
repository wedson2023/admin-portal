import { ListarContatoComponent } from './views/listar-contato/listar-contato.component';
import { ListarBannerComponent } from './views/listar-banner/listar-banner.component';
import { BannerComponent } from './views/banner/banner.component';
import { ListarSegmentosComponent } from './views/listar-segmentos/listar-segmentos.component';
import { SegmentosComponent } from './views/segmentos/segmentos.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { EditarEventosComponent } from './views/editar-eventos/editar-eventos.component';
import { ListarEventosComponent } from './views/listar-eventos/listar-eventos.component';
import { AgendaDeEventosComponent } from './views/agenda-de-eventos/agenda-de-eventos.component';
import { ListarBotoesComponent } from './views/listar-botoes/listar-botoes.component';
import { BotoesComponent } from './views/botoes/botoes.component';
import { EditarNoticiasComponent } from './views/editar-noticias/editar-noticias.component';
import { ListarNoticiasComponent } from './views/listar-noticias/listar-noticias.component';
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
import { ListarCategoriasComponent } from './views/listar-categorias/listar-categorias.component';

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
      {
        path: 'botoes',
        component: BotoesComponent
      },
      {
        path: 'agenda-de-eventos',
        component: AgendaDeEventosComponent
      },
      {
        path: 'categorias',
        component: CategoriasComponent
      },
      {
        path: 'segmentos',
        component: SegmentosComponent
      },
      {
        path: 'banner',
        component: BannerComponent
      },

      // listas

      {
        path: 'listar-guia-comercial',
        component: ListarGuiaComercialComponent
      },
      {
        path: 'listar-noticias',
        component: ListarNoticiasComponent
      },
      {
        path: 'listar-botoes',
        component: ListarBotoesComponent
      },
      {
        path: 'listar-eventos',
        component: ListarEventosComponent
      },
      {
        path: 'listar-categorias',
        component: ListarCategoriasComponent
      },
      {
        path: 'listar-segmentos',
        component: ListarSegmentosComponent
      },
      {
        path: 'listar-banner',
        component: ListarBannerComponent
      },
      {
        path: 'listar-contato',
        component: ListarContatoComponent
      },

      // editar

      {
        path: 'editar-guia-comercial/:id',
        component: EditarGuiaComercialComponent
      },
      {
        path: 'editar-noticias/:id',
        component: EditarNoticiasComponent
      },
      {
        path: 'editar-eventos/:id',
        component: EditarEventosComponent
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
