import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../auth/interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public get user(): User {
    return this.authService.user;
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  signOut() {
    this.router.navigateByUrl('/auth');
    this.authService.singOut();
  }
}
