import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  @Output() childToParent = new EventEmitter<number>();

  categories: any = [];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.categories().subscribe({
      next: (resp) => {
        this.categories = resp;
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error!', 'Error in fetching categories', 'error');
      }
    });
  }

  sendToParent(cId: number) {
    this.childToParent.emit(cId);
  }

}
