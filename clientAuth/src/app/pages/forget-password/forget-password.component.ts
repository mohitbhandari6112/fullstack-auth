import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, MatIcon],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  email!: string;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  showEmailSent = false;

  forgetPassword() {
    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        if (res.success) {
          this.matSnackBar.open(res.message, 'Close', {
            duration: 5000,
          });
          this.showEmailSent = true;
        } else {
          this.matSnackBar.open(res.message, 'Close', {
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
