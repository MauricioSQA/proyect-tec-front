import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioContentComponent } from './negocio-content.component';

describe('NegocioContentComponent', () => {
  let component: NegocioContentComponent;
  let fixture: ComponentFixture<NegocioContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegocioContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NegocioContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
