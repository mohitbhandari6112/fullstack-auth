import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Observable } from 'rxjs';
import { Role } from '../../interfaces/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule
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
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: [],
      password: [''],
      confirmPassword: [],
      roles: [''],
    });
  }
  register() {
    this.$roles = this.roleService.getRoles();
  }
}
