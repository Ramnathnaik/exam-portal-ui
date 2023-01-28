import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Editor } from 'ngx-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  qusId: number = -1;
  question: any = {};
  editor: Editor = new Editor();

  constructor(private _route: ActivatedRoute, private _questionService: QuestionService, private snack: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.qusId = this._route.snapshot.params['qusId'];
    this.getQuestion();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getQuestion() {
    this._questionService.getQuestion(this.qusId).subscribe({
      next: (resp) => {
        this.question = resp;
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error in fetching question data', 'error');
        
      }
    })
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null)
    {
      this.snack.open("Question content is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null)
    {
      this.snack.open("Option 1 is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null)
    {
      this.snack.open("Option 2 is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null)
    {
      this.snack.open("Option 3 is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null)
    {
      this.snack.open("Option 4 is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null)
    {
      this.snack.open("Answer is required!", "OK", {
        duration: 3000
      });
      return;
    }

    this._questionService.updateQuestion(this.question).subscribe({
      next: (resp: any) => {
        Swal.fire('Success!', 'Question updated successfully!', 'success').then(
          (result) => {
            this._router.navigate(['/admin/view-questions/' + resp.quiz.qId + '/' + resp.quiz.title]);
          }
        );
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error in updating the question!', 'error');
        
      }
    })
  }

}
