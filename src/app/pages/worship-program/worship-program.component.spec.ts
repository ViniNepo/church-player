import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorshipProgramComponent } from './worship-program.component';

describe('WorshipProgramComponent', () => {
  let component: WorshipProgramComponent;
  let fixture: ComponentFixture<WorshipProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorshipProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorshipProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
