import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CursoComponent } from './components/curso/curso.component';
import { AuthGuardProfesor } from './guards/authProfesor.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { AuthLoginGuard } from './guards/auth-login.guard';
import { NoLoginGuard } from './guards/no-login.guard';
import {CertificadosComponent} from './components/certificados/certificados.component';
import {canActivate} from '@angular/fire/auth-guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'curso/:idCurso', component: CursoComponent, canActivate: [AuthGuardProfesor]},
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'user-profile',   component: UserProfileComponent, canActivate: [NoLoginGuard] },
  { path: 'cursos',         component: CursosComponent},
  { path: 'registro',       component: RegisterComponent, canActivate: [AuthLoginGuard]},
  { path: 'login',          component: LoginComponent, canActivate: [AuthLoginGuard]},
  { path: 'profile',        component: ProfileComponent, canActivate: [NoLoginGuard]},
  { path: 'create-quiz',    component: QuizzesComponent, canActivate: [AuthGuardProfesor]},
  { path: 'certificados',  component: CertificadosComponent},
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
