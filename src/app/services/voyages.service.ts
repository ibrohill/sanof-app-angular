import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { Voyage } from '../models/voyage.model';

@Injectable({
  providedIn: 'root'
})
export class VoyagesService {
  private apiUrl = 'http://localhost:8000/api/voyages';
  private baseUrl = 'http://localhost:8000/api/rechercher';

  constructor(private http: HttpClient) {}

  rechercherVoyages(params: { depart: string; arrivee: string; date: string; nombre_de_personnes: number }): Observable<Voyage[]> {
    let httpParams = new HttpParams()
      .set('depart', params.depart || '')
      .set('arrivee', params.arrivee || '')
      .set('date', params.date || '')
      .set('nombre_de_personnes', params.nombre_de_personnes ? params.nombre_de_personnes.toString() : '0');

    return this.http.get<Voyage[]>(this.baseUrl, { params: httpParams });
  }




  getVoyageById(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(`${this.apiUrl}/${id}`);
  }

  reserverVoyage(voyageId: number, nombre_de_personnes: number): Observable<void> {
    return this.http.post<void>(`http://localhost:8000/api/reserver`, {
      voyageId,
      nombre_de_personnes
    });
  }


  ajouterVoyage(voyage: Voyage): Observable<Voyage> {
    return this.http.post<Voyage>(this.apiUrl, voyage).pipe(catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }


}
