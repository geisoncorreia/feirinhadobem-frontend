import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { ClienteDetailsComponent } from './cliente/cliente-details/cliente-details.component';
import { AddClienteComponent } from './cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './cliente/edit-cliente/edit-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteDetailsComponent,
    AddClienteComponent,
    EditClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
