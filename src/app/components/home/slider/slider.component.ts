import { Component, OnInit } from '@angular/core';
import { Favorito } from '../../../models/favorito';
import { FavoritosService } from '../../../services/favoritos.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnInit {
  sliderFavoritos: Favorito[] = [];

  constructor(private favoritoService: FavoritosService) {}

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
    this.sliderFavoritos = this.favoritoService.favoritos;
  }

  deleteFavProduct(id: string) {
    this.sliderFavoritos = this.sliderFavoritos.filter((item) => item.id != id);
    this.favoritoService.updateFavoritos(this.sliderFavoritos);

    Swal.fire({
      title: 'Producto Eliminado',
      text: 'Producto eliminado con éxito',
      icon: 'success',
    });
  }
}
