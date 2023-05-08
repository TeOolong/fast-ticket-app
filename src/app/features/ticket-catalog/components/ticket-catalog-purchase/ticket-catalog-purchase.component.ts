import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-catalog-purchase',
  templateUrl: './ticket-catalog-purchase.component.html',
  styleUrls: ['./ticket-catalog-purchase.component.scss']
})
export class TicketCatalogPurchaseComponent {
  @Output() returnHome = new EventEmitter()
}
