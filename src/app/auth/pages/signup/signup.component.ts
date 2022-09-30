import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = this.formBuilder.group({
    name: ['Test One', [Validators.required]],
    email: ['test1@mail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  signUp() {
    const { name, email, password } = this.signUpForm.value;
    this.authService.signUp(name, email, password).subscribe((response) => {
      if (response === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('Error', response, 'error');
      }
    });
  }
}
