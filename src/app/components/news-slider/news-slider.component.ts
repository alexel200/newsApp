import {NgForOf, NgIf} from "@angular/common";
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgbCarouselConfig, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import {Article} from "../../interfaces/news-interface";
import {UserInterface} from "../../interfaces/user-interface";
import {TextLengthPipe} from "../../pipes/text-length.pipe";
import {NewsService} from "../../services/news.service";
import {UiElementsService} from "../../services/ui-elements.service";

@Component({
  selector: 'app-news-slider',
  standalone: true,
  imports: [NgbCarouselModule, NgIf, NgForOf, TextLengthPipe, RouterLink],
  templateUrl: './news-slider.component.html',
  styleUrl: './news-slider.component.css',
  providers: [NgbCarouselConfig],
})
export class NewsSliderComponent implements OnInit{
  @Input({required: true}) articles!: Article[];
  @Input({required: true}) user!: UserInterface | null;
  @Output() deleteArticleEmitter = new EventEmitter<any>();
  topArticles: Article[] = [];

  constructor(config: NgbCarouselConfig, private uiElement: UiElementsService) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.topArticles = this.articles.filter(article => !article.title.includes('[Removed]') && article.urlToImage).slice(0,5);
  }

  deleteArticle(category: string, id: string) {
    this.uiElement.showConfirmAlert().then( (result) => {
      if (result.isConfirmed) {
        let index = this.topArticles.findIndex(article => article.id === id);
        if(index >= 0){
          this.topArticles.splice(index, 1);
        }

        this.deleteArticleEmitter.emit({category, id});
      }
      })
  }
}
