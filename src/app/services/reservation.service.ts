import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8000/api/reservations'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  createReservation(voyageId: number, reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {
      ...reservationData,
      voyageId
    });
  }
}
