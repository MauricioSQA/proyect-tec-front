import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import * as Aos from 'aos';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NegocioContentComponent } from './negocio-content/negocio-content.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NegocioContentComponent],
  templateUrl: './negocio.component.html',
  styleUrl: './negocio.component.css',
})
export class NegocioComponent implements OnInit {
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

  empresas: Empresa[] = [];

  id: number = 0;

  adminPermission: boolean = false;
  userPermission: boolean = false;

  constructor(
    private service: EmpresaService,
    private route: ActivatedRoute,
    private servicio: AuthService
  ) {}

  ngOnInit(): void {
    Aos.init();
    //*  Load id from localStorage if it exists
    this.service.findAll().subscribe((AllEmpresas) => {
      this.empresas = AllEmpresas;
    });

    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.service.findById(id).subscribe((res) => {
          this.empresa = res;
          this.id = res.id!;
        });
      }
      if (id > 0) {
        this.fetchEmpresaById(id);
      }
    });

  }
  getRol(): string | null {
    return this.servicio.getRol();
  }

  fetchEmpresaById(id: number): void {
    this.service.findById(id).subscribe((res) => {
      this.empresa = res;
      this.id = res.id!;
    });
  }

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
        this.service.findAll().subscribe((empresas) => {
          this.empresas = empresas;
        });
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  onDelete(id: number) {
    this.service.eliminar(id).subscribe(
      (response) => {
        console.log('Empresa was deleted', response);
      },
      (error) => {
        console.log('On Delete Error: ', error);
        Swal.fire({
          title: 'Empresa eliminada',
          text: 'Empresa ' + this.empresa.nombre + ' eliminada con éxito',
          icon: 'success',
        });
        this.service.findAll().subscribe((empresas) => {
          this.empresas = empresas;
        });
      }
    );
  }

  update(id: number, empresa: Empresa) {
    this.service.update(id, empresa).subscribe(
      (res) => {
        this.empresa = res;
        Swal.fire({
          title: 'Empresa Actualizada',
          text: 'Empresa ' + this.empresa.nombre + ' actualizada con éxito',
          icon: 'success',
        });
        this.service.findAll().subscribe((empresas) => {
          this.empresas = empresas;
        });
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  resetEmpresa() {
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
    this.id = 0;
  }
}
