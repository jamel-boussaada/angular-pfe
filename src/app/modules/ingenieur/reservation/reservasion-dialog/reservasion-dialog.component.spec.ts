import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasionDialogComponent } from './reservasion-dialog.component';

describe('ReservasionDialogComponent', () => {
  let component: ReservasionDialogComponent;
  let fixture: ComponentFixture<ReservasionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
