import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCatalogComponent } from './ticket-catalog.component';

describe('TicketCatalogComponent', () => {
  let component: TicketCatalogComponent;
  let fixture: ComponentFixture<TicketCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
