import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProtectedArea } from '../models/protected-area.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  serviceURL = './service/ticket';

  public generateTickets(item: any) {
    return this.http.post(this.serviceURL+ '/create', item);
  }
}