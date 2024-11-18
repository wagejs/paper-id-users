import { Component } from '@angular/core';
import { UserListRowComponent } from '../UserListRowComponent/UserListRowComponent.component'
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/types/users';

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

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
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
