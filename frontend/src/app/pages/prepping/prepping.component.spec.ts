import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreppingComponent } from './prepping.component';

describe('PreppingComponent', () => {
  let component: PreppingComponent;
  let fixture: ComponentFixture<PreppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
