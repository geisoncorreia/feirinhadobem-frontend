import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'idade', 'email'];
  data: Cliente[] = [];
  isLoadingResults = true;

  constructor(private api: ClienteService) { }

  ngOnInit(): void {
    this.api.getAllClientes()
    .subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
