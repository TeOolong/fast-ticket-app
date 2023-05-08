import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/components/toaster/components/toast/services/toast.service';
import { EventTypes } from 'src/app/core/models/event-types';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-catalog-detail',
  templateUrl: './ticket-catalog-detail.component.html',
  styleUrls: ['./ticket-catalog-detail.component.scss']
})
export class TicketCatalogDetailComponent implements OnInit {
  @Input() protectedArea: any;
  @Output() detailPurchased = new EventEmitter();
  @Output() returnHome = new EventEmitter();

  quantity = new FormControl(0, [Validators.required, Validators.min(0)]);

  constructor(private toastService: ToastService,
    private ticketService: TicketService,
    protected route: ActivatedRoute,
    ){ 

  }
  ngOnInit(): void {
    
    this.quantity.valueChanges.subscribe( x => {
      if(!x || Number(x) < 0) {
        this.quantity.setValue(0, {emitEvent: false});
      }
    })
  }

  changeQuantity(type: string) {
    const value = Number(this.quantity.value);
    if(type === 'add') {
      this.quantity.setValue(value + 1);
      console.log(this.quantity.value)
    } else if( type === 'substract' && value > 1 ) {
      this.quantity.setValue(value - 1);
    }
  }

  calculateCurrentImport() {
    return Number(this.quantity.value) * this.protectedArea.price;
  }

  pay(){
    const userId = this.route.snapshot.data['user'];
    let item = {
      protectedAreaId: this.protectedArea.id,
      payment: {
        total: this.calculateCurrentImport(),
        ticketQuantity: this.quantity.value,
        userId: userId
      }
    }
    this.ticketService.generateTickets(item).subscribe( {
      next: res => {
        console.log(res)
        if(res) {
          this.toastService.showMessage("","Compra ha sido realizada con éxito!", EventTypes.success)
          this.detailPurchased.emit();
        } else {
          this.toastService.showMessage("","Hubo un problema con su compra!", EventTypes.error)
        }
      }, 
      error: () => { this.toastService.showMessage("","Hubo un problema con su compra!", EventTypes.error) }
    })

  }

}
