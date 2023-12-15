import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWorshipComponent } from './change-worship.component';

describe('ChangeWorshipComponent', () => {
  let component: ChangeWorshipComponent;
  let fixture: ComponentFixture<ChangeWorshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeWorshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeWorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
