import { ManageroleComponent } from './pages/managerole/managerole.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './register/register/register.component';
import { UserdetailComponent } from './pages/userdetail/userdetail.component';
import { authGuard } from './guards/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { roleGuard } from './guards/role.guard';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:'forget-password',
    component:ForgetPasswordComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  }

  {
    path: 'userdetail/:id',
    component: UserdetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin'],
    },
  },
  {
    path: 'roles',
    component: ManageroleComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin'],
    },
  },
];
