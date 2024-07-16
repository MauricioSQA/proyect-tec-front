import { Injectable } from '@angular/core';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  compras: Compra[] = [];

  constructor() {}

  clearCart() {
    this.compras = [];
  }

  getComprasLength(): number {
    return this.compras.length;
  }
}
