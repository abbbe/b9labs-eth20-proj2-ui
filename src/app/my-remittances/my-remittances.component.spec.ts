import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRemittancesComponent } from './my-remittances.component';

describe('MyRemittancesComponent', () => {
  let component: MyRemittancesComponent;
  let fixture: ComponentFixture<MyRemittancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRemittancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRemittancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
