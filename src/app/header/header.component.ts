import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginUserName : string = "Guest";
  constructor(private userService: UserService, private router : Router) { }

  ngOnInit() {
  }
  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/signin");
  }

}
