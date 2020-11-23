import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [

  { path: '', redirectTo: '/create-user', pathMatch: 'full' },

  {
    path: 'list-users',
    component: ListUsersComponent
  },
  {
    path: 'create-user',
    component:CreateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
