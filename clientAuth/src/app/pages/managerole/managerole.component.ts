import { Component, inject } from '@angular/core';
import { ManageroleformComponent } from '../../components/manageroleform/manageroleform.component';
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleListComponent } from '../../components/role-list/role-list.component';
import { Role } from '../../interfaces/role';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-managerole',
  standalone: true,
  imports: [
    ManageroleformComponent,
    RoleListComponent,
    AsyncPipe,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './managerole.component.html',
  styleUrl: './managerole.component.css',
})
export class ManageroleComponent {
  roleService = inject(RoleService);
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  errorMessage = '';
  roles$ = this.roleService.getRoles();
  role = {} as RoleCreateRequest;
  users$ = this.authService.getAll();
  selectedUser!: string;
  selectedRole!: string;

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (res) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('role created successfully', 'Close', {
          duration: 5000,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 400) {
          this.errorMessage = err.message;
        }
      },
    });
  }
  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe({
      next: () => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('Role deleted successfully', 'Ok', {
          duration: 5000,
        });
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(err.message, 'Ok');
      },
    });
  }

  assignRole() {
    this.roleService
      .assignRole(this.selectedUser, this.selectedRole)
      .subscribe({
        next: () => {
          this.roles$ = this.roleService.getRoles();
          this.matSnackBar.open('Role assigned successfully', 'Ok', {
            duration: 5000,
          });
        },
        error: (err: HttpErrorResponse) => {
          this.matSnackBar.open(err.message, 'Ok');
        },
      });
  }
}
