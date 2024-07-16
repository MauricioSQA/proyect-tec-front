import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

const BASIC_URL = 'https://artistic-courage-production.up.railway.app/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

   

  eliminar(id: number): Observable<Usuario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Usuario>(`${BASIC_URL}/usuarios/${id}`, {
      headers,
    });
  }

  findById(id: number): Observable<Usuario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${BASIC_URL}/usuarios/${id}`, {
      headers,
    });
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Usuario>(`${BASIC_URL}/usuarios/${id}`, usuario, {
      headers,
    });
  }

  findAll(): Observable<Usuario[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>(`${BASIC_URL}/usuarios`, { headers });
  }

}
