import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup ;
  error : string;
  submitted : boolean  = false;
  constructor(private userService : UserService, private router: Router) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  submit() {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.valid) {
      if(this.userService.checkLogin(this.loginForm.value.username, this.loginForm.value.password ))
        this.router.navigateByUrl('/profile');
      else
        this.error = 'Invalid Username or Password';
    }
  }

}
