import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoleCreateRequest } from '../../interfaces/role-create-request';

@Component({
  selector: 'app-manageroleform',
  standalone: true,
  imports: [MatInputModule, FormsModule],
  templateUrl: './manageroleform.component.html',
  styleUrl: './manageroleform.component.css',
})
export class ManageroleformComponent {
  @Input({ required: true }) role!: RoleCreateRequest;
  @Input() errorMessage!: string;
  @Output() addRole: EventEmitter<RoleCreateRequest> =
    new EventEmitter<RoleCreateRequest>();

  add() {
    this.addRole.emit(this.role);
  }
}
