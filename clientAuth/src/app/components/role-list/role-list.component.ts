import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RoleService } from '../../services/role.service';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../interfaces/role';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatIcon, AsyncPipe],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css',
})
export class RoleListComponent {
  @Input({ required: true }) roles!: Role[] | null;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);

  deleteRole(id: string) {
    this.delete.emit(id);
  }
}
