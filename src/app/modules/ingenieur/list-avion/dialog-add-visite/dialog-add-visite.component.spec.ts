import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddVisiteComponent } from './dialog-add-visite.component';

describe('DialogAddVisiteComponent', () => {
  let component: DialogAddVisiteComponent;
  let fixture: ComponentFixture<DialogAddVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddVisiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
