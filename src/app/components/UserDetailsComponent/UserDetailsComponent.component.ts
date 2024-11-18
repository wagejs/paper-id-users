import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/types/users';

@Component({
  selector: 'user-details-component',
  standalone: true,
  imports: [],
  templateUrl: './UserDetailsComponent.component.html',
  host: {
    'class': 'contents'
  }
})
export class UserDetailsComponent implements OnInit {
  id: string = '';
  user: User | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${this.id}`).subscribe(user => {
      this.user = user;
    });
  }
}
