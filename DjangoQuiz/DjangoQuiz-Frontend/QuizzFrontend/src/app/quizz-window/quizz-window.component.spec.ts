import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzWindowComponent } from './quizz-window.component';

describe('QuizzWindowComponent', () => {
  let component: QuizzWindowComponent;
  let fixture: ComponentFixture<QuizzWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizzWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
