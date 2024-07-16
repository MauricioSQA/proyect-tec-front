import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import * as Aos from 'aos';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';
  nombre:string='';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    Aos.init();
  }

  onSubmit(): void {
    this.authService.register(this.username, this.password,this.nombre).subscribe(
      () => {
        Swal.fire({
          title: 'Usuario registrado',
          text: 'Usuario ' + this.nombre + ' registrado con éxito',
          icon: 'success',
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.error = 'Error en el registro. Por favor, inténtelo de nuevo.';
      }
    );
  }
}
