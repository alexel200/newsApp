import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {forkJoin, map, Observable, of, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {Article, News, NewsResponse} from "../interfaces/news-interface";
import {ArticleTypes} from "../shared/ArticleTypes";
import * as newsJson from "../shared/news.json";
import { v4 as uuidv4 } from 'uuid';

const API_URL = environment.NEWS_HTTP;
const API_KEY: string = environment.API_KEY;
const PERFORM_REQUESTS: boolean = environment.PERFORM_REQUESTS;
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  pageSize: number = 10;
  news: News = {};

  constructor(private http: HttpClient) { }

  getNewsAllCategories(): Observable<News> {
    if (PERFORM_REQUESTS) {
      const requests = ArticleTypes.map(category =>
        this.getNews(category, '').pipe(
          map(articles => ({ category, articles }))
        )
      );

      return forkJoin(requests).pipe(
        map(results => {
          results.forEach(result => {
            this.news[result.category].articles = result.articles;
            this.news[result.category].page = 1;
          });
          return this.getNewsObject();
        })
      );
    } else {
      this.news = newsJson;
      return of(this.getNewsObject());
    }
  }

  getNewsObject(){
    return this.news;
  }

  getNews(category: string, searchText: string, loadMore:boolean = false ) :Observable<Article[]> {
      if(loadMore){
       return this.getArticlesByCategory(category, searchText);
      }

      if(this.news[category]){
        if(searchText !== ''){
          return of(this.news[category].articles.filter(article => {
            if(article.content?.toLowerCase().includes(searchText.toLowerCase())){
              return article;
            }
            if(article.title.toLowerCase().includes(searchText.toLowerCase())){
              return article;
            }
            return false;
          }));
        }
        return of(this.news[category].articles);
      }

      return this.getArticlesByCategory(category, searchText);

  }

  private getArticlesByCategory(category: string, searchText: string): Observable<Article[]> {
    if(!Object.keys(this.news).includes(category)){
      this.news[category] = {
        page: 0,
        articles: []
      };
    }

    const page:number = this.news[category].page + 1;


    let params = {
      apiKey: API_KEY,
      country: "us",
      category: category,
      page: page,
      pageSize: this.pageSize,
    };
    if(searchText.trim().length > 0 ){
      params = {...params, ...{q: searchText}};
    }
    return this.http.get<NewsResponse>(`${API_URL}/top-headlines`, {
      params: params
    }).pipe(map( ({ articles }) => {

      if(articles && articles.length === 0) return [];
      articles.map(article => {
                article.category = category;
                article.id = uuidv4();
      });
      this.news[category] = {
        page: page,
        articles: [...this.news[category].articles, ...articles],
      }
      return this.news[category].articles;
    }));
  }

  getArticle(category:string,  id: string): Article {
    let article = {
      author: '',
      content: '',
      description: '',
      title: "",
      url: "",
      urlToImage: ''
    };

     if(this.news[category]){
      return this.news[category].articles.find(article => article.id === id) || article;
     }

    return article;
  }

  deleteArticle(category:string,  id: string): void {
    if(this.news[category]){
      let index = this.news[category].articles.findIndex(article => article.id === id);
      this.news[category].articles.splice(index, 1);
    }
  }

  updateArticle(category: string, article: Article) {
    if(category !== article.category){
      this.deleteArticle(category, article.id!);
      this.news[article.category!].articles.unshift(article);
    }else if(this.news[category]){
        let index = this.news[category].articles.findIndex(ar => ar.id === article.id);
        this.news[category].articles[index] = article;
    }
  }
}
