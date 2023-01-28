import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: any = {
    title: '',
    description: ''
  }

  constructor(private _category: CategoryService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null)
    {
      this.snack.open("Title is required!", "OK", {
        duration: 3000
      });
      return;
    }
    if (this.category.description.trim() == '' || this.category.description == null)
    {
      this.snack.open("Description is required!", "OK", {
        duration: 3000
      });
      return;
    }

    this._category.addCategory(this.category).subscribe({
      next: (resp) => {
        Swal.fire('Success!', 'Category added succesfully', 'success').then(
          (result) => {
            if (result.isConfirmed) {
              this.category = {
                title: '',
                description: ''
              }
            }
          }
        );
        console.log(resp);
      },
      error: (e) => {
        Swal.fire('Failed!', 'Category not added! Please try after sometime', 'error');
        console.log(e);
      }
    });
  }

}
