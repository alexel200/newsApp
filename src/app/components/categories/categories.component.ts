import {NgClass, NgForOf, TitleCasePipe} from "@angular/common";
import {Component, EventEmitter, Output} from '@angular/core';
import {ArticleTypes} from "../../shared/ArticleTypes";


@Component({
  selector: 'shared-categories',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Output() emitCategory: EventEmitter<string>  = new EventEmitter<string>();
  categories: string[] = ArticleTypes;
  selectedCategory: string = this.categories[2];

  updateCategory(category: string) {
    this.selectedCategory = category;
    this.emitCategory.emit(this.selectedCategory);
  }
}
