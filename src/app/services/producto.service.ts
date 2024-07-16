import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

const BASIC_URL = 'https://artistic-courage-production.up.railway.app';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  createProduct(producto: Producto): Observable<Producto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Producto>(`${BASIC_URL}/api/productos`, producto, {
      headers,
    });
  }

  /* http://localhost:8080/api/productos/empresa/id */
  findAll(id: number): Observable<Producto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto[]>(
      `${BASIC_URL}/api/productos/empresa/${id}`,
      {
        headers,
      }
    );
  }

  /* http://localhost:8080/api/productos/id */
  deleteProduct(id: number): Observable<Producto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Producto>(`${BASIC_URL}/api/productos/${id}`, {
      headers,
    });
  }

  /* http://localhost:8080/api/productos/id */
  updateProduct(id: number, producto: Producto): Observable<Producto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Producto>(
      `${BASIC_URL}/api/productos/${id}`,
      producto,
      {
        headers,
      }
    );
  }

  /* http://localhost:8080/api/productos/id */
  findProductById(id: number): Observable<Producto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto>(`${BASIC_URL}/api/productos/${id}`, {
      headers,
    });
  }

  /*http://localhost:8080/api/productos/empresa/id*/
  getProductosByEmpresa(id: number): Observable<Producto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto[]>(
      `${BASIC_URL}/api/productos/empresa/${id}`,
      {
        headers,
      }
    );
  }
}
