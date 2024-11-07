import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.css',
})
export class UserdetailComponent {
  authService = inject(AuthService);
  accountDetail$ = this.authService.getDetails();
}
