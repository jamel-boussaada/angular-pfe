import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartVisiteComponent } from './start-visite.component';

describe('StartVisiteComponent', () => {
  let component: StartVisiteComponent;
  let fixture: ComponentFixture<StartVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartVisiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
