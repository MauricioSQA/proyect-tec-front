import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    username: '',
    apellido:'',
    telefono:'',
    direccion:''
  };

  usuarios: Usuario[] = [];
  id: number = 0;

  constructor(private service: UserService, private servicio: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    Aos.init();
    this.service.findAll().subscribe((AllEmpresas) => {
      console.log('ALl Empresas: ', AllEmpresas);
      this.usuarios = AllEmpresas;
    });

    //Get Empresa ID
    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.service.findById(id).subscribe((res) => {
          this.usuario = res;
          this.id = res.id!;
          console.log('Final ID :', this.id);
        });
      }
    });
  }

  getRol(): string | null {
    return this.servicio.getRol();
  }

  onDelete(id: number) {
    this.service.eliminar(id).subscribe(
      (response) => {
        console.log('Usuario was deleted', response);
      },
      (error) => {
        console.log('On Delete Error: ', error);
        Swal.fire({
          title: 'Usuario eliminado',
          text: 'Usuario ' + this.usuario.nombre + ' eliminado con éxito',
          icon: 'success',
        });
        this.service.findAll().subscribe((usuarios) => {
          this.usuarios = usuarios;
        });
      }
    );
  }

  update(id: number, usuario: Usuario) {
    if (this.usuario.password === '') {
      delete this.usuario.password;
    }
    this.service.update(id, usuario).subscribe(
      (res) => {
        this.usuario = res;
        Swal.fire({
          title: 'Usuario Actualizado',
          text: 'Usuario ' + this.usuario.nombre + ' actualizado con éxito',
          icon: 'success',
        });
        this.service.findAll().subscribe((usuarios) => {
          this.usuarios = usuarios;
        });
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }
}

