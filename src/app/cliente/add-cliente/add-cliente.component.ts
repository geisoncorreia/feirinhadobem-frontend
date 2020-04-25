import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss']
})
export class AddClienteComponent implements OnInit {

  clienteForm: FormGroup;
  nome = '';
  idade: number = null;
  email = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();


  constructor(private router: Router, private api: ClienteService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nome : [null, Validators.required],
      idade : [null, Validators.required],
      email : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addCliente(this.clienteForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/cliente-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
