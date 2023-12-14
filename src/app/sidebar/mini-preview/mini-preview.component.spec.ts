import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPreviewComponent } from './mini-preview.component';

describe('MiniPreviewComponent', () => {
  let component: MiniPreviewComponent;
  let fixture: ComponentFixture<MiniPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
