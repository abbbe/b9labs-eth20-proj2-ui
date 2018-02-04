import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthDashboardComponent } from './eth-dashboard.component';

describe('EthDashboardComponent', () => {
  let component: EthDashboardComponent;
  let fixture: ComponentFixture<EthDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
