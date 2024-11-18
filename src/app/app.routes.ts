import { Routes } from '@angular/router';
import { UserListComponent } from './components/UserList/UserListComponent.component';
import { UserDetailsComponent } from './components/UserDetailsComponent/UserDetailsComponent.component';

export const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent
  }
];
