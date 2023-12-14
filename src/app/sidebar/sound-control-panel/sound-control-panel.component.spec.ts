import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundControlPanelComponent } from './sound-control-panel.component';

describe('SoundControlPanelComponent', () => {
  let component: SoundControlPanelComponent;
  let fixture: ComponentFixture<SoundControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundControlPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
