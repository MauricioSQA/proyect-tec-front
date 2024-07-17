import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {


  firstName: string = '';
  correo: string = '';
  asunto: string = '';
  mensaje: string = '';

constructor(){}

onInput(event: any) {

  const value = event.target.value; 
  const name = event.target.name;   
  switch (name) {
    case 'nombre':
      this.firstName = event.target.value;
      break;
    case 'correo':
      this.correo=event.target.value;
      break;
    case 'asunto':
    this.asunto=event.target.value;
    break;
    case 'mensaje':
    this.mensaje=event.target.value;
      break;
    default:
      break;
  }
}
preview(e:Event) {
  e.preventDefault();
   if(this.firstName.length<=0 || this.correo.length<=0 || this.asunto.length<=0 || this.mensaje.length<=0  )
  {

    alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
  }
  const form={
                nombre:this.firstName,
                correo:this.correo,
                tema:this.asunto,
                mensaje:this.mensaje
              }

   fetch("https://formsubmit.co/ajax/contactodesperdiciocero@gmail.com", {

    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },

    body: JSON.stringify( form )

    })
    .then(response => {return response.json();})
    .then(data => {
    //SI EL EMAIL FUE ENVIADO CORRECTAMENTE
    if(data.success=="true"){
      Swal.fire({
        title: 'Mensaje Enviado Exitósamente',
        icon: 'success',
      });
    }
    })
    .catch(error => (error));
 }
}
