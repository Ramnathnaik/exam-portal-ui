import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any = [];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.categories().subscribe({
      next: (resp) => {
        this.categories = resp;
        console.log(resp);
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!!', 'Error in fetching data', 'error');
      }
    });
  }

}
