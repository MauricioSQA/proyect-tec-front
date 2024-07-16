import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterempComponent } from './registeremp.component';

describe('RegisterempComponent', () => {
  let component: RegisterempComponent;
  let fixture: ComponentFixture<RegisterempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
