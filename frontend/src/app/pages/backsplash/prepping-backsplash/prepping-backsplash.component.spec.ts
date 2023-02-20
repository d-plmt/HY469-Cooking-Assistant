import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreppingBacksplashComponent } from './prepping-backsplash.component';

describe('PreppingBacksplashComponent', () => {
  let component: PreppingBacksplashComponent;
  let fixture: ComponentFixture<PreppingBacksplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreppingBacksplashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreppingBacksplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
