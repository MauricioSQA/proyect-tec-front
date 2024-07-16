import { Injectable } from '@angular/core';
import { PedidoResumen } from '../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  pedidos: PedidoResumen[] = [];

  constructor() {}
}
