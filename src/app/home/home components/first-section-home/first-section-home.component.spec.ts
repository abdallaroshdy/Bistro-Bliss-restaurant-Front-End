import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSectionHomeComponent } from './first-section-home.component';

describe('FirstSectionHomeComponent', () => {
  let component: FirstSectionHomeComponent;
  let fixture: ComponentFixture<FirstSectionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstSectionHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstSectionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
