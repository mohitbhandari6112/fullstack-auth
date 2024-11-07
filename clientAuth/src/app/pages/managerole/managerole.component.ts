import { Component, inject } from '@angular/core';
import { ManageroleformComponent } from '../../components/manageroleform/manageroleform.component';
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleListComponent } from "../../components/role-list/role-list.component";

@Component({
  selector: 'app-managerole',
  standalone: true,
  imports: [ManageroleformComponent, RoleListComponent],
  templateUrl: './managerole.component.html',
  styleUrl: './managerole.component.css',
})
export class ManageroleComponent {
  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);
  errorMessage = '';
  role = {} as RoleCreateRequest;

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (res) => {
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
}
