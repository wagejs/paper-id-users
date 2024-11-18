import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

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
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.userService.getUserById(parseInt(this.id)).subscribe(user => {
      this.user = user;
      this.isLoading = false;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
