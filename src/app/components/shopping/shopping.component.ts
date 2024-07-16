import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../models/compra';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { TotalPriceService } from '../../services/total-price.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, RouterModule, PaymentComponent],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css',
})
export class ShoppingComponent implements OnInit {
  constructor(
    private compraService: CompraService,
    private router: Router,
    private totalPriceService: TotalPriceService,
    private route: ActivatedRoute,  ) {}

  compras: Compra[] = [];
  totalPrice: number = 0;
  empresaId: number | null = null;

  getImagenProducto(tipoProducto: string): string {
    switch (tipoProducto.toUpperCase()) {
      case 'CAFE':
        return 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'SANGUCHES':
        return 'https://images.unsplash.com/photo-1592415499556-74fcb9f18667?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'ENSALADAS':
        return 'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'PASTAS':
        return 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'POSTRES':
        return 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'PIZZAS':
        return 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'SUSHI':
        return 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      default:
        return 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
  }

  ngOnInit(): void {
    //* Load the cart from local storage
    const storedCompras = localStorage.getItem('compras');
    if (storedCompras) {
      this.compraService.compras = JSON.parse(storedCompras);
    }

    this.compras = this.compraService.compras;
    this.compras.map((compra) => (this.totalPrice += compra.precio));

    this.route.paramMap.subscribe((params) => {
      this.empresaId = +(params.get('empresaId') || '0');
    });
  }

  removeCompraFromCart(id: string) {
    const removedCompra = this.compras.find((item) => item.id === id);
    if (removedCompra) {
      this.compras = this.compras.filter((item) => item.id !== id);
      this.totalPrice -= this.calculateTotalPrice(removedCompra);
    }

    //* Save the updated cart to local storage
    localStorage.setItem('compras', JSON.stringify(this.compras));

    if (this.compras.length == 0) {
      this.clearCart();
      this.router.navigate(['/empresa']);
    }
  }

  addQuantity(compraId: string) {
    const index = this.compras.findIndex((compra) => compra.id === compraId);
    if (index !== -1) {
      this.compras[index].cantidad++;
      this.totalPrice += this.compras[index].precio;

      //* Save the updated cart to local storage
      localStorage.setItem('compras', JSON.stringify(this.compras));
    }
  }

  reduceQuantity(compraId: string) {
    const index = this.compras.findIndex((compra) => compra.id === compraId);
    const quantity = this.compras[index].cantidad;
    if (index !== -1 && this.compras[index].cantidad > 0) {
      this.compras[index].cantidad--;
      this.totalPrice -= this.compras[index].precio;
      //* Save the updated cart to local storage
      localStorage.setItem('compras', JSON.stringify(this.compras));
    }
    if (quantity == 1) {
      this.removeCompraFromCart(compraId);
    }
    if (this.compras.length == 0) {
      this.clearCart();
    }
  }

  calculateTotalPrice(compra: Compra): number {
    return compra.cantidad * compra.precio;
  }

  clearCart() {
    this.compraService.clearCart();
    this.compras = [];
    this.totalPrice = 0;
    localStorage.removeItem('compras');
    this.router.navigate(['/empresa']);
  }

  proceedToPayment() {
    this.totalPriceService.setTotalPrice(this.totalPrice);
    this.router.navigate(['payment']);
  }
}
