import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RoleService } from '../../services/role.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatIcon, AsyncPipe],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css',
})
export class RoleListComponent {
  roleService = inject(RoleService);
  roles = this.roleService.getRoles();

  deleteRole(id: string) {
    console.log(id);
  }
}
