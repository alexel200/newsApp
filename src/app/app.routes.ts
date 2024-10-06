import { Routes } from '@angular/router';
import {NewsFormPageComponent} from "./pages/news-form-page/news-form-page.component";
import {NewsLoginPageComponent} from "./pages/news-login-page/news-login-page.component";

import {NewsPageComponent} from "./pages/news-page/news-page.component";
import {NewsViewArticlePageComponent} from "./pages/news-view-article-page/news-view-article-page.component";

export const routes: Routes = [
  {
    path: '',
    component: NewsPageComponent
  },
  {
    path: 'article/:category/:id/edit',
    component: NewsFormPageComponent
  },
  {
    path: 'article/:category/:id',
    component: NewsViewArticlePageComponent
  },
  {
    path: 'login',
    component: NewsLoginPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
