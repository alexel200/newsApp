import {NgIf} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticlesSkeletonComponent} from "../../components/articles-skeleton/articles-skeleton.component";
import {ArticlesComponent} from "../../components/articles/articles.component";
import {CategoriesComponent} from "../../components/categories/categories.component";
import {NewsInsightComponent} from "../../components/news-insight/news-insight.component";
import {NewsSliderComponent} from "../../components/news-slider/news-slider.component";
import {Article} from "../../interfaces/news-interface";
import {NewsService} from "../../services/news.service";
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-news-view-article-page',
  standalone: true,
    imports: [
        ArticlesComponent,
        ArticlesSkeletonComponent,
        CategoriesComponent,
        NavbarComponent,
        NewsInsightComponent,
        NewsSliderComponent,
        NgIf
    ],
  templateUrl: './news-view-article-page.component.html',
  styleUrl: './news-view-article-page.component.css'
})
export class NewsViewArticlePageComponent implements OnInit{
  article: Article = {
    author: '',
    content: '',
    description: '',
    title: "",
    url: "",
    urlToImage: ''
  };

  category: string = "";
  id: string = "";

  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) {
    this.category = this.route.snapshot.params['category'];
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    console.log(this.id, this.category);
    this.article = this.newsService.getArticle(this.category, this.id);
    if(this.article.title.length == 0){
      this.router.navigate(["/"]);
    }

  }
}
