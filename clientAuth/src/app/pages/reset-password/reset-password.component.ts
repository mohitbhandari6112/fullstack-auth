import { Component, inject, OnInit } from '@angular/core';
import { PassswordResetRequest } from '../../interfaces/password-reset-request';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  matSnackBar = inject(MatSnackBar);

  resetPasswordObj = {} as PassswordResetRequest;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetPasswordObj.email = params['email'];
      this.resetPasswordObj.token = params['token'];
    });
  }
  resetPassword() {
    this.authService.resetPassword(this.resetPasswordObj).subscribe({
      next: (res) => {
        this.matSnackBar.open(res.message, 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(err.message, 'Ok', {
          duration: 5000,
        });
      },
    });
  }
}
