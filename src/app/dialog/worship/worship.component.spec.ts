import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorshipComponent } from './worship.component';

describe('WorshipComponent', () => {
  let component: WorshipComponent;
  let fixture: ComponentFixture<WorshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
