import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { ClienteDetailsComponent } from './cliente/cliente-details/cliente-details.component';
import { AddClienteComponent } from './cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './cliente/edit-cliente/edit-cliente.component';


const routes: Routes = [
  {
    path: 'cliente',
    component: ClienteComponent,
    data: { title: 'Lista de Clientes' }
  },
  {
    path: 'cliente-details/:id',
    component: ClienteDetailsComponent,
    data: { title: 'Detalhes do Cliente' }
  },
  {
    path: 'add-cliente',
    component: AddClienteComponent,
    data: { title: 'Adicionar Cliente' }
  },
  {
    path: 'edit-cliente/:id',
    component: EditClienteComponent,
    data: { title: 'Editar Cliente' }
  },
  { path: '',
    redirectTo: '/cliente',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
