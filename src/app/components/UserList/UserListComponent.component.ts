import { Component } from '@angular/core';
import { UserListRowComponent } from '../UserListRowComponent/UserListRowComponent.component'
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'user-list-component',
  standalone: true,
  imports: [
    UserListRowComponent
  ],
  templateUrl: './UserListComponent.component.html',
})
export class UserListComponent {
  headers: string[] = [
    'ID',
    'Name',
    'Email',
    'Website',
    'Actions'
  ]
  users: User[] = [];

  constructor(private userService: UserService) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }

  trackByUserId(index: number, user: any): number {
    return user.id; // Use a unique identifier for each user
  }
}
