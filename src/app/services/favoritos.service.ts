import { Injectable } from '@angular/core';
import { Favorito } from '../models/favorito';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  constructor() {}

  favoritos: Favorito[] = [];

  agregarFavorito(favorito: Favorito) {
    this.favoritos.push(favorito);
  }

  updateFavoritos(favoritos: Favorito[]) {
    this.favoritos = favoritos;
  }
}
