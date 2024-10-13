import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContcatsComponent } from './contcats.component';

describe('ContcatsComponent', () => {
  let component: ContcatsComponent;
  let fixture: ComponentFixture<ContcatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContcatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContcatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
