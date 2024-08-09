import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoralRegistrationComponent } from './moral-registration.component';

describe('MoralRegistrationComponent', () => {
  let component: MoralRegistrationComponent;
  let fixture: ComponentFixture<MoralRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoralRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoralRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
