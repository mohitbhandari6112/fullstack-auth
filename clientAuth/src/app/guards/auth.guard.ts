import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const matSnackbar = inject(MatSnackBar);

  if (authService.isLoggedIn()) {
    return true;
  }
  matSnackbar.open('you must be logged in to view this page', 'Ok', {
    duration: 5000,
    horizontalPosition: 'center',
  });
  inject(Router).navigate(['/']);
  return false;
};
