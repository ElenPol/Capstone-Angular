import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplDevicesComponent } from './empl-devices.component';

describe('EmplDevicesComponent', () => {
  let component: EmplDevicesComponent;
  let fixture: ComponentFixture<EmplDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
