import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';
import { Observable } from 'rxjs';

const BASIC_URL = 'https://artistic-courage-production.up.railway.app';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) {}

  create(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${BASIC_URL}/api/auth/registroe`, empresa);
  }

  

  eliminar(id: number): Observable<Empresa> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Empresa>(`${BASIC_URL}/api/empresas/${id}`, {
      headers,
    });
  }

  findById(id: number): Observable<Empresa> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Empresa>(`${BASIC_URL}/api/empresas/${id}`, {
      headers,
    });
  }

  update(id: number, empresa: Empresa): Observable<Empresa> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Empresa>(`${BASIC_URL}/api/empresas/${id}`, empresa, {
      headers,
    });
  }

  findAll(): Observable<Empresa[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Empresa[]>(`${BASIC_URL}/api/empresas`, { headers });
  }
}
