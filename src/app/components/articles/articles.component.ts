import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgForOf, NgIf} from "@angular/common";
import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {Article} from "../../interfaces/news-interface";
import {UserInterface} from "../../interfaces/user-interface";
import {TextLengthPipe} from "../../pipes/text-length.pipe";
import {NewsService} from "../../services/news.service";
import {UiElementsService} from "../../services/ui-elements.service";
import {MaterialModule} from "../../shared/material/material.module";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [MaterialModule, NgForOf, NgIf, TextLengthPipe, RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
  animations: [
    trigger('removeArticle', [
      state('in', style({opacity: 1})),

      transition(':enter', [
        style({opacity: 0}),
        animate(200)
      ]),

      transition(':leave',
        animate(400, style({opacity: 0})))
    ])
  ]
})
export class ArticlesComponent implements OnInit{
  @Input({required: true}) articles!: Article[];
  @Input({required: true}) user: UserInterface|null = null;
  constructor(private newsService: NewsService, private uiElement: UiElementsService) {
  }
  ngOnInit() {

  }

  deleteArticle(category: string, id: string) {
    this.uiElement.showConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        let index = this.articles.findIndex(article => article.id === id);
        if(index >= 0){
          this.articles.splice(index, 1);
        }
        this.newsService.deleteArticle(category, id);
      }
    });
  }
}
