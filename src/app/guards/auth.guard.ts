import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.verifyToken().pipe(
    map((resp) => {
      if (resp.message) {
        return true;
      }
      router.navigateByUrl('');
      return resp.message;
    })
  );
};
