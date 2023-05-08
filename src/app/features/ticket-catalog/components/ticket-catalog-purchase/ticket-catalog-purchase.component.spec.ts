import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCatalogPurchaseComponent } from './ticket-catalog-purchase.component';

describe('TicketCatalogPurchaseComponent', () => {
  let component: TicketCatalogPurchaseComponent;
  let fixture: ComponentFixture<TicketCatalogPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCatalogPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCatalogPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
