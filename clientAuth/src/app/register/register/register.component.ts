import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Observable } from 'rxjs';
import { Role } from '../../interfaces/role';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../interfaces/validation-error';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  roleService = inject(RoleService);
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  confirmPwHide: boolean = true;
  passwordHide: boolean = true;
  $roles!: Observable<Role[]>;
  error!: ValidationError[];

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        roles: [''],
      },
      { validator: this.passwordMatchValidator }
    );
    this.$roles = this.roleService.getRoles();
  }

  private passwordMatchValidator(control: AbstractControl): {
    [key: string]: boolean;
  } | null {
    const password = control.get('password')?.value;
    const confirmPw = control.get('confirmPassword')?.value;
    if (password !== confirmPw) {
      return { passwordMismatch: true };
    }
    return null;
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.matSnackBar.open(res.message, 'CLose', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/login']);
      },

      error: (error: HttpErrorResponse) => {
        this.error = error.error;
        if (error.status === 400) {
          this.matSnackBar.open('validations failed', 'CLose', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
      complete() {
        console.log('registered succesfully');
      },
    });
  }
}
