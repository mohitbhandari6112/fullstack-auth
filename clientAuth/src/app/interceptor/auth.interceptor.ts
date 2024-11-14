import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.getToken()) {
    return next(req);
  }

  const cloned = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + authService.getToken()
    ),
  });

  return next(cloned).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return authService
          .refreshToken({
            email: authService.getUserDetail()?.email,
            token: authService.getToken() || '',
            refreshToken: authService.getRefreshToken() || '',
          })
          .pipe(
            switchMap((res) => {
              if (res.success) {
                localStorage.setItem('user', JSON.stringify(res));
                const clonedRetry = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.token}`,
                  },
                });
                return next(clonedRetry);
              } else {
                authService.logout();
                router.navigate(['/login']);
                return EMPTY;
              }
            }),
            catchError((error) => {
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => error);
            })
          );
      }

      return throwError(() => err);
    })
  );
};
