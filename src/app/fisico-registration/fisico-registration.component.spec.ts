import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisicoRegistrationComponent } from './fisico-registration.component';

describe('FisicoRegistrationComponent', () => {
  let component: FisicoRegistrationComponent;
  let fixture: ComponentFixture<FisicoRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FisicoRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FisicoRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
