import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list-row-component',
  standalone: true,
  imports: [],
  templateUrl: './UserListRowComponent.component.html',
  host: {
    'class': 'contents'
  }
})
export class UserListRowComponent {
  @Input() name = "";
  @Input() email = "";
  @Input() website = "";
  @Input() id = "";

  constructor(private router: Router) {}

  navigateToUserDetails() {
    this.router.navigate(['/user', this.id]);
  }
}
