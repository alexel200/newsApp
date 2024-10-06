export interface NewsResponse{
  status:       string;
  totalResults: number;
  articles:     Article[];
}

export interface Article {
  id?: string;
  source?:      Source;
  author:      null | string;
  title:       string;
  description: null | string;
  url:         string;
  urlToImage:  null | string;
  publishedAt?: Date | string;
  content:     null | string;
  category?: null | string;
}

export interface Source {
  id:   null | string;
  name: string;
}

export interface News{
  [key: string]:{
    page: number;
    articles: Article[];
  }
}
