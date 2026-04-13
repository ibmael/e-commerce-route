import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('freshToken')) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('freshToken')!,
        },
      });
    }
  }
  return next(req);
};
