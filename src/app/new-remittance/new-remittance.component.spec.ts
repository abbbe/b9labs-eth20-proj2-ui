import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRemittanceComponent } from './new-remittance.component';

describe('NewRemittanceComponent', () => {
  let component: NewRemittanceComponent;
  let fixture: ComponentFixture<NewRemittanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRemittanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
