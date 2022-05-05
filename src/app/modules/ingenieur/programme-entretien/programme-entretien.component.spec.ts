import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeEntretienComponent } from './programme-entretien.component';

describe('ProgrammeEntretienComponent', () => {
  let component: ProgrammeEntretienComponent;
  let fixture: ComponentFixture<ProgrammeEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammeEntretienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
