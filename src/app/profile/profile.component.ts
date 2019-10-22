import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo : User;
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userInfo = this.userService.getUserObj();
  }

}
