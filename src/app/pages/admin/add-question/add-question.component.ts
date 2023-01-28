import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Editor } from 'ngx-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId: number = -1;
  qTitle: string = '';
  question: any = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qId: -1
    }
  }

  editor: Editor = new Editor();

  constructor(private _route: ActivatedRoute, private snack: MatSnackBar, private _questionService: QuestionService, private _router: Router, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz.qId = this.qId;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      this.snack.open("Question content is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this.snack.open("Option 1 is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this.snack.open("Option 2 is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      this.snack.open("Option 3 is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      this.snack.open("Option 4 is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this.snack.open("Answer is required!", "OK", {
        duration: 3000
      });
      return;
    }

    this._questionService.addQuestion(this.question).subscribe({
      next: (resp) => {
        Swal.fire('Success!', 'Question added successfully!', 'success').then(
          (result) => {
            this._router.navigate(['/admin/view-questions/' + this.qId + '/' + this.qTitle]);
          }
        );
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error while adding question!', 'error');
      }
    })
  }

}
