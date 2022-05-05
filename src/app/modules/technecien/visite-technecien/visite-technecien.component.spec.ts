import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteTechnecienComponent } from './visite-technecien.component';

describe('VisiteTechnecienComponent', () => {
  let component: VisiteTechnecienComponent;
  let fixture: ComponentFixture<VisiteTechnecienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteTechnecienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteTechnecienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
