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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  roleService = inject(RoleService);
  confirmPwHide: boolean = true;
  passwordHide: boolean = true;
  $roles!: Observable<Role[]>;

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
  register() {}
}
