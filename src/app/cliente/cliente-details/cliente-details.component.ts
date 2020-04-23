import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-details',
  templateUrl: './cliente-details.component.html',
  styleUrls: ['./cliente-details.component.scss']
})
export class ClienteDetailsComponent implements OnInit {

  cliente: Cliente = { id: '', nome: '', idade: null, email: '' };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.getClienteDetails(this.route.snapshot.params.id)
  }

  getClienteDetails(id: string) {
    this.api.getClienteById(id)
      .subscribe((data: any) => {
        this.cliente = data;
        console.log(this.cliente);
        this.isLoadingResults = false;
      });
  }

  deleteCliente(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCliente(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/cliente']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
