import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private dataService: LoginService) { }

  id: string;
  user: User= new User();

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  onUpdateUser(): void {
    this.router.navigate(['/update-user', this.id]);
  }

  onLogout(): void {
    this.router.navigate(['home']);
  }
}
