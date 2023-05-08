import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProtectedArea } from '../models/protected-area.model';

@Injectable({
  providedIn: 'root',
})
export class ProtectedAreaService {
  constructor(private http: HttpClient) {}

  serviceURL = './service/anp';

  public getAllProtectedAreas() {
    return this.http.get<ProtectedArea[]>(this.serviceURL+ '/all');
  }
}