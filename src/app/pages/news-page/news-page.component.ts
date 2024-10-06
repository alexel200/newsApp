import {NgIf} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {ArticlesSkeletonComponent} from "../../components/articles-skeleton/articles-skeleton.component";
import {ArticlesComponent} from "../../components/articles/articles.component";
import {CategoriesComponent} from "../../components/categories/categories.component";
import {NewsInsightComponent} from "../../components/news-insight/news-insight.component";
import {NewsSliderComponent} from "../../components/news-slider/news-slider.component";
import {Article, News} from "../../interfaces/news-interface";
import {UserInterface} from "../../interfaces/user-interface";
import {NewsService} from "../../services/news.service";
import {UserService} from "../../services/user.service";

import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [
    ArticlesComponent,
    ArticlesSkeletonComponent,
    CategoriesComponent,
    NavbarComponent,
    NewsSliderComponent,
    NgIf,
    NewsInsightComponent
  ],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css'
})
export class NewsPageComponent implements OnInit{
  articles: Article[] = [];
  category: string = "general";
  searchText: string = '';
  news: News = {};
  user: UserInterface| null = null;
  showSkeleton: boolean = true;

  constructor(private newsService: NewsService, private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.newsService.getNewsAllCategories().subscribe(
      (news) => {
        this.news = news;
        if(this.news[this.category])
          this.articles = this.news[this.category].articles;
      }

    );
  }

  loadArticlesByCategory(category: string) {
    this.articles = [];
    this.category = category;
    this.loadArticles(category);
  }

  search(searchText: string) {
    this.searchText = searchText;
    this.loadArticlesByCategory(this.category);
  }

  hideSkeleton():void {
    setTimeout( () => {
      this.showSkeleton =false;
    }, 3000);
  }

  deleteArticles(deleteObject: any){
    let {category, id} = deleteObject;

    if(category != null && id != null){
      this.newsService.deleteArticle(category, id);
      this.loadArticles(category);
    }
  }

  private loadArticles(category: string){
    this.newsService.getNews(category, this.searchText).subscribe( (articles: Article[]) => {
      this.articles.push(...articles);
    });
  }
}
