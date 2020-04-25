import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {

  clienteForm: FormGroup;
  id = '';
  nome = '';
  idade: number = null;
  email = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ClienteService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCLienteById(this.route.snapshot.params.id);
    this.clienteForm = this.formBuilder.group({
      nome : [null, Validators.required],
      idade : [null, Validators.required],
      email : [null, Validators.required]
    });
  }

  getCLienteById(id: any) {
    this.api.getClienteById(id).subscribe((data: any) => {
      this.id = data.id;
      this.clienteForm.setValue({
        name: data.nome,
        idade: data.idade,
        email: data.email
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCliente(this.id, this.clienteForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/cliente-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  clienteDetails() {
    this.router.navigate(['/cliente-details', this.id]);
  }

}
