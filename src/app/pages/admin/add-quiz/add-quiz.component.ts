import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quiz: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cId: -1
    }
  };

  categories: any = [];

  constructor(private _categoryService: CategoryService, private _quizService: QuizService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
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

    this._quizService.addQuiz(this.quiz).subscribe({
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
        Swal.fire('Success!', 'Quiz added successfully!', 'success');
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error while adding quiz', 'error');
      }
    });
  }

}
