import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCardListComponent } from './secondary-card-list.component';

describe('SecondaryCardListComponent', () => {
  let component: SecondaryCardListComponent;
  let fixture: ComponentFixture<SecondaryCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
