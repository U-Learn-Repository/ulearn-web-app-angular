import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GraphQLModule } from './graphql.module';
import { CursoComponent } from './components/curso/curso.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    GraphQLModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CursoComponent,
    DashboardComponent,
    UserProfileComponent,
    CursosComponent,  
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    QuizzesComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
