import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  _catId: number = 0;

  // @Input('childToMaster')
  // set catId(catId: number) {
  //   this._catId = catId;
  //   if (this._catId == -1 || this._catId == 0) {
  //     this.allQuizzes();
  //   } else {
  //     this.getQuizzesByCategory();
  //   }
  // }
  // get catId() { return this._catId; }

  quizzes: any = [];

  constructor(private _quizService: QuizService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (resp: any) => {
        this._catId = resp.cId;
        if (this._catId == 0) {
          this.allQuizzes();
        } else {
          this.getQuizzesByCategory();
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  allQuizzes() {
    this._quizService.quizzes().subscribe({
      next: (resp) => {
        this.quizzes = [];
        this.quizzes = resp;
        this.quizzes = this.quizzes.filter((quiz: any) => quiz.active);
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error', 'Error in fetching quizzes', 'error');
      }
    })
  }

  getQuizzesByCategory() {
    this._quizService.getQuizzesByCategory(this._catId).subscribe({
      next: (resp) => {
        this.quizzes = [];
        this.quizzes = resp;
        this.quizzes = this.quizzes.filter((quiz: any) => quiz.active);
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error in getting quizzes', 'error');
      }
    })
  }

}
