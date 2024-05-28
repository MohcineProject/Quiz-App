import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzAddQuestionComponent } from './quizz-add-question.component';

describe('QuizzAddQuestionComponent', () => {
  let component: QuizzAddQuestionComponent;
  let fixture: ComponentFixture<QuizzAddQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzAddQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizzAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
