import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngrBtnComponent } from './ingr-btn.component';

describe('IngrBtnComponent', () => {
  let component: IngrBtnComponent;
  let fixture: ComponentFixture<IngrBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngrBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngrBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
