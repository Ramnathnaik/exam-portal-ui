import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId: number = 0;
  quiz: any = {
    category: {
      cId: -1
    }
  };
  categories: any = [];

  constructor(private _route: ActivatedRoute, private _quizService: QuizService, private _categoryService: CategoryService, private snack: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.getCategories();
    this.getQuiz();
  }

  getQuiz() {
    this._quizService.getQuiz(this.qId).subscribe({
      next: (resp) => {
        this.quiz = resp;
        console.log(this.quiz);
        
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error in fetching the quiz data!', 'error');
      }
    })
  }

  getCategories() {
    this._categoryService.categories().subscribe({
      next: (resp) => {
        this.categories = resp;
        console.log(resp);
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error in loading all categories', 'error');
      }
    })
  }

  submitForm() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null)
    {
      this.snack.open("Title is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.quiz.description.trim() == '' || this.quiz.description == null)
    {
      this.snack.open("Description is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null)
    {
      this.snack.open("Maximum number is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null)
    {
      this.snack.open("Number of questions is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.quiz.category.cId == -1)
    {
      this.snack.open("Category is required!", "OK", {
        duration: 3000
      });
      return;
    }

    this._quizService.updateQuiz(this.quiz).subscribe({
      next: (resp) => {
        this.quiz = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: false,
          category: {
            cId: -1
          }
        };
        Swal.fire('Success!', 'Quiz updated successfully!', 'success').then(
          (result) => {
            this._router.navigate(['admin/view-quizzes']);
          }
        );
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error while updating quiz', 'error');
      }
    });
  }

}
