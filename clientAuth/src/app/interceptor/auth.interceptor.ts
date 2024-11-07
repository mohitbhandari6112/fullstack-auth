import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService);
  if (token.getToken()) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token.getToken()),
    });
    return next(cloned);
  }
  return next(req);
};
