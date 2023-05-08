import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCatalogMainComponent } from './ticket-catalog-main.component';

describe('TicketCatalogMainComponent', () => {
  let component: TicketCatalogMainComponent;
  let fixture: ComponentFixture<TicketCatalogMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCatalogMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCatalogMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
