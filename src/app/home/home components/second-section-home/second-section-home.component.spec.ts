import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondSectionHomeComponent } from './second-section-home.component';

describe('SecondSectionHomeComponent', () => {
  let component: SecondSectionHomeComponent;
  let fixture: ComponentFixture<SecondSectionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondSectionHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondSectionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
