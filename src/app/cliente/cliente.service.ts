import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cliente } from './cliente';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/v1/clientes/';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${apiUrl}`)
      .pipe(
        tap(cliente => console.log('fetch todos os clientes')),
        catchError(this.handleError('getAllClientes', []))
      );
  }

  getClienteById(id: string): Observable<Cliente> {
    const url = `${apiUrl}${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`fetch cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getClienteById id=${id}`))
    );
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(apiUrl, cliente, httpOptions).pipe(
      tap((c: Cliente) => console.log(`add cliente w/ id=${c.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  updateCliente(id: string, cliente: Cliente): Observable<any> {
    const url = `${apiUrl}${id}`;
    return this.http.put(url, cliente, httpOptions).pipe(
      tap(_ => console.log(`update cliente id=${id}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  deleteCliente(id: string): Observable<Cliente> {
    const url = `${apiUrl}${id}`;
    return this.http.delete<Cliente>(url, httpOptions).pipe(
      tap(_ => console.log(`delete cliente id=${id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

}
