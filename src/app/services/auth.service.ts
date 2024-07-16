import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://artistic-courage-production.up.railway.app/api/auth';

  authChanged = new EventEmitter<Boolean>();

  constructor(private http?: HttpClient, private router?: Router) {}

  login(username: string, password: string): Observable<any> {
    this.clearLocalStorage();
    if (!this.http) {
      throw new Error('Http client no inicializado');
    }
    return this.http
      ?.post<any>(`${this.baseUrl}/login`, { username, password })
      ?.pipe(
        tap((response) => {
          console.log('Respuesta del servidor : ', response);
        }),
        map((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('rol', response.rol);
            localStorage.setItem('nombre', response.nombre);
            localStorage.setItem('id', response.id);    

             this.authChanged.emit(true);
            return response;
          } else {
            throw new Error(
              'No se recibió un token de acceso válido en la respuesta del servidor'
            );
          }
        }),
        catchError((error) => {
          console.log('Error en la solicitud', error);
          return throwError(() => error);
        })
      );
  }

  register(username: string, password: string,nombre: string): Observable<any> {
    if (!this.http) {
      throw new Error('Http client no inicializado');
    }
    return this.http
      ?.post<any>(`${this.baseUrl}/registro`, { username, password ,nombre})
      ?.pipe(catchError(this.handleError));
  }

  logout() {
    this.clearLocalStorage();
    this.authChanged.emit(false);
    this.router?.navigate(['/login']);
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    localStorage.removeItem('id');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  getId(): string | null {
    return localStorage.getItem('id');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  handleError(error: any) {
    console.error('Error en la solicitud : ', error);
    return throwError(() => error);
  }
}
