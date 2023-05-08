import { Component } from '@angular/core';
import { State } from './models/state.type';
import { ProtectedArea } from './models/protected-area.model';

@Component({
  selector: 'app-ticket-catalog',
  templateUrl: './ticket-catalog.component.html',
  styleUrls: ['./ticket-catalog.component.scss']
})
export class TicketCatalogComponent {
  state : State = "catalog";

  protectedArea : ProtectedArea | undefined;

  setProtectedArea(protectedArea: any) {
    this.protectedArea = protectedArea;
    this.state = 'purchase';
  }

  setDismiss() {
    this.state = 'dismiss';
  }
}
