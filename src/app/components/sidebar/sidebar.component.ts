import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}



export const ROUTES: RouteInfo[] = [];


export const ROUTESUSER: RouteInfo[] = [
    { path: '/registro', title: 'Registro',  icon: 'business_badge', class: '' },
  //  { path: '/create-quiz', title: 'Crear Quiz',  icon: 'education_paper', class: '' },
  //  { path : '/cursos', title: 'Cursos', icon:'education_hat', class: ''},
  // { path: '/icons', title: 'Icons',  icon: 'education_atom', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon: 'ui-1_bell-53', class: '' },
  //  { path: '/user-profile', title: 'User Profile',  icon: 'users_single-02', class: '' },
  // { path: '/table-list', title: 'Table List',  icon: 'design_bullet-list-67', class: '' },
   // { path: '/typography', title: 'Typography',  icon: 'text_caps-small', class: '' },
   // { path: '/upgrade', title: 'Upgrade to PRO',  icon: 'objects_spaceship', class: 'active active-pro' }
];

export const ROUTESESTUDIANTE: RouteInfo[] = [
  { path : '/cursos', title: 'Cursos', icon:'education_hat', class: ''},
  { path: '/user-profile', title: 'User Profile',  icon: 'users_single-02', class: '' },
];

export const ROUTESPROFESOR: RouteInfo[] = [
  { path: '/create-quiz', title: 'Crear Quiz',  icon: 'education_paper', class: '' },
  { path : '/cursos', title: 'Cursos', icon:'education_hat', class: ''},
  { path: '/user-profile', title: 'User Profile',  icon: 'users_single-02', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRole
  menuItemsProfesor: any[];
  menuItemsEstudiante: any[];
  menuItemsUser: any[];

  constructor() { }

  ngOnInit() {
    this.userRole = localStorage.getItem('roleUser')
    this.menuItemsProfesor = ROUTESPROFESOR.filter(menuItem => menuItem);
    this.menuItemsEstudiante = ROUTESESTUDIANTE.filter(menuItem => menuItem);
    this.menuItemsUser = ROUTESUSER.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  }
}
