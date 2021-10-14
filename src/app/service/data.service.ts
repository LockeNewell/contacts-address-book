import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../environments/environment' 
import { Contact, StateView, UNSET_CONTACT } from '../shared/contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  private options = {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  };
  private _stateViewSource = new Subject<StateView>();
  public stateView$ = this._stateViewSource.asObservable();
  public setStateView(newStateView: StateView){
    this._stateViewSource.next(newStateView)
  }
  private _contactIdSource = new Subject<number>();
  public contactId$ = this._contactIdSource.asObservable();
  public setContactId(newContactId: number){
    this._contactIdSource.next(newContactId)
  }
  
  constructor(private http: HttpClient) {
    this.setContactId(UNSET_CONTACT);
  }

  getContacts(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(`${environment.api}/contacts`)
      .pipe(catchError(this.handleError<Contact[]>('putContact', [])));
  }
  getContact(in_id): Observable<Contact> {
    return this.http
      .get<Contact>(`${environment.api}/contacts/${in_id}`)
      .pipe(catchError(this.handleError<Contact>(`getContact id=${in_id}`)));
  }
  postContact(contactForm: any) { 
    this.http.post(`${environment.api}/contacts`, contactForm, this.options)
    .pipe(catchError(this.handleError<any>(`postContact contactForm=${JSON.stringify(contactForm)}`)));
  }
  putContact(contactId, contactForm) { 
    return this.http
      .put(`${environment.api}/contacts/`+contactId, contactForm, this.options)
      .pipe(catchError(this.handleError<any>(`putContact id=${contactId} contactForm=${JSON.stringify(contactForm)}`)));
  }
  deleteContact(contactId): Observable<any> {
    return this.http
      .delete<any>(`${environment.api}/contacts/`+contactId)
      .pipe(catchError(this.handleError<any>(`putContact id=${contactId}`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
