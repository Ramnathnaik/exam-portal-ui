import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = [];

  constructor(private _quizService: QuizService) { }

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes() {
    this._quizService.quizzes().subscribe({
      next: (resp) => {
        this.quizzes = resp;
        console.log(resp);
      },
      error: (e) => {
        Swal.fire('Error!', 'Error in loading data', 'error');
        console.log(e);
      }
    });
  }

  deleteQuiz(qId: number) {
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
        this._quizService.deleteQuiz(qId).subscribe({
          next: (resp) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
            Swal.fire('Success!', 'Quiz got deleted successfully!', 'success');
          },
          error: (e) => {
            Swal.fire('Error!', 'Error occured while deleting the quiz!', 'error');
            console.log(e);
          }
        });
      }
    });
  }

}
