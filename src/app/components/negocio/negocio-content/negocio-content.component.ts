import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import * as Aos from 'aos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-negocio-content',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './negocio-content.component.html',
  styleUrl: './negocio-content.component.css'
})
export class NegocioContentComponent implements OnInit{
  ngOnInit(): void {
    Aos.init();
  }

  constructor(
    private servicio: AuthService
  ) {}

  getRol(): string | null {
    return this.servicio.getRol();
  }

}
