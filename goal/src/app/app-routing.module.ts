import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListGoalsComponent } from './list-goals/list-goals.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { GoalComponent } from './goal/goal.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'welcome/:name',
    component: WelcomeComponent,
    canActivate: [RouteGuardService] 
  },
  {
    path: 'goals',
    component: ListGoalsComponent, 
    canActivate: [RouteGuardService] 
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService] 
  },
  {
    path: 'goals/:id',
    component: GoalComponent,
    canActivate: [RouteGuardService] 
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
