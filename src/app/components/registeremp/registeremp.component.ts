import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa.service';
import {  Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import * as Aos from 'aos';

@Component({
  selector: 'app-registeremp',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registeremp.component.html',
  styleUrl: './registeremp.component.css'
})
export class RegisterempComponent implements OnInit {

  empresa: Empresa = {
    nombre: '',
    direccion: '',
    horario: '',
    username: '',
    password:'',
    telefono: '',
    tipo: '',
    logo: '',
  };

  constructor(
    private service: EmpresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    Aos.init();}

  onCreate() {
    this.service.create(this.empresa).subscribe(
      (item) => {
        Swal.fire({
          title: 'Empresa registrada',
          text: 'Empresa ' + this.empresa.nombre + ' registrada con éxito',
          icon: 'success',
        });
        this.empresa = {
          nombre: '',
          direccion: '',
          horario: '',
          username: '',
          password:'',
          telefono: '',
          tipo: '',
          logo: '',
        };
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

}
