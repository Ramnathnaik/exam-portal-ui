import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId: number = 0;
  quiz: any = {};

  constructor(private _route: ActivatedRoute, private _quizService: QuizService, private _router: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.getQuiz();
  }

  getQuiz() {
    this._quizService.getQuiz(this.qId).subscribe({
      next: (resp) => {
        this.quiz = resp;
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error in getting quiz information', 'error');
      }
    })
  }

  startQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Your quiz will get started once you confirm",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Start Test'
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qId])
      }
    })
  }

}
