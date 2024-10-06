import {JsonPipe, Location, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticlesSkeletonComponent} from "../../components/articles-skeleton/articles-skeleton.component";
import {ArticlesComponent} from "../../components/articles/articles.component";
import {CategoriesComponent} from "../../components/categories/categories.component";
import {NewsInsightComponent} from "../../components/news-insight/news-insight.component";
import {NewsSliderComponent} from "../../components/news-slider/news-slider.component";
import {HighlightInputFormDirective} from "../../directives/highlight-input-form.directive";
import {Article} from "../../interfaces/news-interface";
import {NavigationService} from "../../services/navigation.service";
import {NewsService} from "../../services/news.service";
import {ArticleTypes} from "../../shared/ArticleTypes";
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-news-form-page',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf,
    ArticlesComponent,
    ArticlesSkeletonComponent,
    CategoriesComponent,
    NavbarComponent,
    NewsInsightComponent,
    NewsSliderComponent,
    HighlightInputFormDirective,
    FormsModule,
    NgClass,
    JsonPipe
  ],
  templateUrl: './news-form-page.component.html',
  styleUrl: './news-form-page.component.css'
})
export class NewsFormPageComponent implements OnInit{
  category: string = '';
  id: string = '';
  categories:string[] = ArticleTypes;
  article!: Article

  @ViewChild('articleForm') articleForm!: NgForm;

  constructor(private newsService: NewsService,
                    private route:ActivatedRoute, private router: Router, private navigationService: NavigationService) {
    this.category = this.route.snapshot.params['category'];
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    //this.newsService.getNewsAllCategories();
    if(!this.article){

    }
    this.article = this.newsService.getArticle(this.category, this.id);
  }

  back() {
    this.navigationService.back();
  }

  updateArticle() {
    if(!this.articleForm.valid) return;

    this.newsService.updateArticle(this.category, this.article);
    console.log(this.article);
    this.navigationService.back();
  }


}
