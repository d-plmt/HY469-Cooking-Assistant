import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingBacksplashComponent } from './cooking-backsplash.component';

describe('CookingBacksplashComponent', () => {
  let component: CookingBacksplashComponent;
  let fixture: ComponentFixture<CookingBacksplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookingBacksplashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookingBacksplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
