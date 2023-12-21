import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorshipDialogComponent } from './add-worship-dialog.component';

describe('AddWorshipDialogComponent', () => {
  let component: AddWorshipDialogComponent;
  let fixture: ComponentFixture<AddWorshipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorshipDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorshipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
