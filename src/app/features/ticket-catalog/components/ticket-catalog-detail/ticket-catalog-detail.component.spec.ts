import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCatalogDetailComponent } from './ticket-catalog-detail.component';

describe('TicketCatalogDetailComponent', () => {
  let component: TicketCatalogDetailComponent;
  let fixture: ComponentFixture<TicketCatalogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCatalogDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCatalogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
