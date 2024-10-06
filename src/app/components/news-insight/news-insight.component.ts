import {animate, state, style, transition, trigger} from "@angular/animations";
import {JsonPipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {Component, Input, input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {Article} from "../../interfaces/news-interface";
import {UserInterface} from "../../interfaces/user-interface";
import {TextLengthPipe} from "../../pipes/text-length.pipe";
import {NewsService} from "../../services/news.service";
import {UiElementsService} from "../../services/ui-elements.service";
import {ArticleTypes} from "../../shared/ArticleTypes";
import {MaterialModule} from "../../shared/material/material.module";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-news-insight',
  standalone: true,
  imports: [MaterialModule, NgForOf, NgbCarousel, NgbSlide, TextLengthPipe, TitleCasePipe, JsonPipe, RouterLink, NgIf],
  templateUrl: './news-insight.component.html',
  styleUrl: './news-insight.component.css',
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
export class NewsInsightComponent implements OnInit{
  @Input({required: true}) user!: UserInterface|null;
  news = input<any>();
  categories:string[]= ArticleTypes;
  articles: Article[] = [];

  constructor(private newsService: NewsService , private uiElement: UiElementsService) {
  }

  ngOnInit(): void {
    let newsArticle: Article[] = [];
    if(this.news()){
      for(let category of this.categories){
        if(this.news()[category])
        this.articles.push(...this.news()[category].articles.filter( (article:Article) => !article.title.includes('[Removed]') && article.urlToImage).slice(0,2));
      }
    }
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
