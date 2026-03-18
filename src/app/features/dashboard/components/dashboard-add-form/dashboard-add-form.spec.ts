import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddForm } from './dashboard-add-form';

describe('DashboardAddForm', () => {
  let component: DashboardAddForm;
  let fixture: ComponentFixture<DashboardAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
