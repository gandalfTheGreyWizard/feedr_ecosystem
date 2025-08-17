import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhbmRhbGYiLCJ0eXBlIjoid2l6YXJkIiwiZXhwIjoxNzUxNjQ5OTA2Ljc5MTk2NH0.KDZ7kQl6pWSzVYALkGN30wYZaDr6iGRh17rWkkfgepI"
  const reqWithJwtHeaders = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${bearerToken}`)
  });
  return next(reqWithJwtHeaders);
};
