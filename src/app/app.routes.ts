import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NegocioComponent } from './components/negocio/negocio.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PaymentComponent } from './components/shopping/payment/payment.component';
import { ConfirmComponent } from './components/shopping/confirm/confirm.component';
import { RegisterempComponent } from './components/registeremp/registeremp.component';
import { ContactoComponent } from './components/contacto/contacto.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'usuario/edit/:id', component: UsuarioComponent },
  { path: 'empresa', component: NegocioComponent },
  { path: 'negocio/edit/:id', component: NegocioComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'empresa/detalles/:id', component: ProductoComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'confirm', component: ConfirmComponent },
  {path:'registeremp',component:RegisterempComponent},
  {path:'contacto',component:ContactoComponent}
];
