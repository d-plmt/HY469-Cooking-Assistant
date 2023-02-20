import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacksplashComponent } from './backsplash.component';

describe('BacksplashComponent', () => {
  let component: BacksplashComponent;
  let fixture: ComponentFixture<BacksplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacksplashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacksplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
