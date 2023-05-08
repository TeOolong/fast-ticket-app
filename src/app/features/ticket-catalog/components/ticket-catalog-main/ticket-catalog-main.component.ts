import { Component, OnInit, Output } from '@angular/core';
import { ProtectedArea } from '../../models/protected-area.model';
import { Observable, Subject } from 'rxjs';
import { ProtectedAreaService } from '../../services/protected-area.service';

@Component({
  selector: 'app-ticket-catalog-main',
  templateUrl: './ticket-catalog-main.component.html',
  styleUrls: ['./ticket-catalog-main.component.scss']
})
export class TicketCatalogMainComponent implements OnInit {
  protectedAreas$: Observable<ProtectedArea[]>
  @Output() detailPrePurchase = new Subject();

  constructor(private service: ProtectedAreaService,) {
    this.protectedAreas$ = this.service.getAllProtectedAreas();
  }
  ngOnInit(): void {
  }

  buy(protectedArea: ProtectedArea) {
    this.detailPrePurchase.next(protectedArea);
  }

}
