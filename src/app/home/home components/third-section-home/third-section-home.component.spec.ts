import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdSectionHomeComponent } from './third-section-home.component';

describe('ThirdSectionHomeComponent', () => {
  let component: ThirdSectionHomeComponent;
  let fixture: ComponentFixture<ThirdSectionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdSectionHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdSectionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
