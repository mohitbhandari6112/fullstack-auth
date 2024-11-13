import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-passoword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-passoword.component.html',
  styleUrl: './change-passoword.component.css',
})
export class ChangePassowordComponent {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  currentPassword!: string;
  newPassword!: string;

  changePassword() {
    this.authService
      .changePassword({
        email: this.authService.getUserDetail()?.email,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.matSnackBar.open(res.message, 'Close', {
              duration: 5000,
            });
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            this.matSnackBar.open(res.message, 'Ok', {
              duration: 5000,
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          this.matSnackBar.open(err.message, 'Ok', {
            duration: 5000,
          });
        },
      });
  }
}
