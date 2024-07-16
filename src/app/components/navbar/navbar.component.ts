import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  sesionId: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.authChanged.subscribe((state: boolean) => {
      this.isLoggedIn = state;
      this.sesionId = this.authService.getId();
    });
  }

  navigateHome() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getRol(): string | null {
    return this.authService.getRol();
  }

  logout(): void {
    const nombre = this.authService.getNombre();
    Swal.fire({
      title: '¡Adiós!',
      text: `Gracias por visitarnos, ${nombre}`,
      icon: 'info',
    });
    this.authService.logout();
    this.isLoggedIn = false;
    this.sesionId = null; 
  }
}
