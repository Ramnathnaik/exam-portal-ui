import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qusId: number = -1;
  questions: any = [];
  singleQuestionMarks: number = 0;
  isSubmit: boolean = false;
  timer: number = 0;

  marksGot: number = 0;
  attempted: number = 0;
  correctAnswers: number = 0;

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qusId = this._route.snapshot.params['qId'];
    this.getAllQuestionsForTest();
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '');
    })
  }

  getAllQuestionsForTest() {
    this._questionService.getAllQuestionsForTest(this.qusId).subscribe({
      next: (resp) => {
        this.questions = [];
        this.questions = resp;
        this.singleQuestionMarks = this.questions[0].quiz.maxMarks/this.questions.length;
        this.timer = (this.questions.length * 2) * 60;
        this.startTimer();
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error', 'Error in fetching the questions', 'error');
      }
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be submitting the quiz once confirmed!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = setInterval(() => {
      if (this.timer <= 0) {
        this.isSubmit = true;
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  formattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this._questionService.evalQuiz(this.questions).subscribe({
      next: (resp: any) => {
        this.marksGot = resp.marksGot;
        this.attempted = resp.attempted;
        this.correctAnswers = resp.correctAnswers;
        this.isSubmit = true;
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error in submitting quiz', 'error');
      }
    })
  }

  printPDF() {
    const documentDefinition = { content: [
      'Test summary',
      `Number of Questions Attempted: ${this.attempted}`,
      `Number of Questions Answered correctly: ${this.correctAnswers}`,
      `Marks Acheived: ${this.marksGot}`
    ] };
    pdfMake.createPdf(documentDefinition).open();
  }

}
