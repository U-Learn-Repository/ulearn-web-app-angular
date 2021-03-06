import { Routes } from '@angular/router';

// import { DashboardComponent } from '../../dashboard/dashboard.component';
// import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
// import { CursosComponent } from '../../components/cursos/cursos.component';
// import { RegisterComponent} from '../../components/register/register.component';
// import {LoginComponent} from '../../components/login/login.component';
// import { ProfileComponent } from '../../profile/profile.component';
// import { CursoComponent } from '../../components/curso/curso.component';
// import { QuizzesComponent } from '../../components/quizzes/quizzes.component'

export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard',      component: DashboardComponent },
   // { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent},
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
   // { path: 'cursos',         component: CursosComponent},
   // { path: 'registro',       component: RegisterComponent},
   // { path: 'login',          component: LoginComponent},
  //  { path: 'profile',        component: ProfileComponent},
  //  { path: 'create-quiz',        component: QuizzesComponent},
    // { path: 'curso/:idCurso',          component: CursoComponent},
];
