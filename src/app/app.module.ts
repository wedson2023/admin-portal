import { DashboardResolver } from './views/dashboard/dashboard.resolver'
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgProgressModule } from 'ng2-progressbar';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { LoginComponent } from './views/login/login.component';
import { GuiaComercialComponent } from './views/guia-comercial/guia-comercial.component';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AuthService } from './guards/auth.service';
import { ListarGuiaComercialComponent } from './views/listar-guia-comercial/listar-guia-comercial.component';
import { EditarGuiaComercialComponent } from './views/editar-guia-comercial/editar-guia-comercial.component';
import { ListarNoticiasComponent } from './views/listar-noticias/listar-noticias.component';
import { EditarNoticiasComponent } from './views/editar-noticias/editar-noticias.component';
import { BotoesComponent } from './views/botoes/botoes.component';
import { ListarBotoesComponent } from './views/listar-botoes/listar-botoes.component';
import { AgendaDeEventosComponent } from './views/agenda-de-eventos/agenda-de-eventos.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    NgProgressModule,
    //AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    //BsDropdownModule.forRoot(),
    //TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpClientModule,
    EditorModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    GuiaComercialComponent,
    NoticiasComponent,
    DashboardComponent,
    ListarGuiaComercialComponent,
    EditarGuiaComercialComponent,
    ListarNoticiasComponent,
    EditarNoticiasComponent,
    BotoesComponent,
    ListarBotoesComponent,
    AgendaDeEventosComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    DashboardResolver,
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
