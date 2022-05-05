import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  //isLoggedin: Boolean;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  checkLogin() {
    if (this.loginService.isLoggedIn)
      return true;
    else
      return false;
  }

  LogOut() {
    this.loginService.logout();
    this.router.navigate(['home']);
  }
}
