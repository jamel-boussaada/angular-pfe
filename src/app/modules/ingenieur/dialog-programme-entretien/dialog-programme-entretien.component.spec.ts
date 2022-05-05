import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProgrammeEntretienComponent } from './dialog-programme-entretien.component';

describe('DialogProgrammeEntretienComponent', () => {
  let component: DialogProgrammeEntretienComponent;
  let fixture: ComponentFixture<DialogProgrammeEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProgrammeEntretienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProgrammeEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
