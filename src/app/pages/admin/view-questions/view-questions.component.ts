import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  qId: number = -1;
  qTitle: string = '';
  questions: any = [];

  constructor(private _route: ActivatedRoute, private _questionService: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['title'];
    this.getAllQuestions();
  }

  getAllQuestions() {
    this._questionService.getAllQuestions(this.qId).subscribe({
      next: (resp) => {
        this.questions = resp;
      },
      error: (e) => {
        Swal.fire('Error!', 'Error in fetching questions', 'error');
        console.log(e);
      }
    });
  }

  deleteQuestion(qusId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._questionService.deleteQuestion(qusId).subscribe({
          next: (resp) => {
            Swal.fire('Success!', 'Question deleted successfully!', 'success');
            this.questions = this.questions.filter((question: any) => question.qusId != qusId);
          },
          error: (e) => {
            console.log(e);
            Swal.fire('Error!', 'Error in deleting question!', 'error');
          }
        });
      }
    });
    
  }

}
