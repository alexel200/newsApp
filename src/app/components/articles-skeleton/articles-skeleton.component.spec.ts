import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSkeletonComponent } from './articles-skeleton.component';

describe('CategoriesSkeletonComponent', () => {
  let component: ArticlesSkeletonComponent;
  let fixture: ComponentFixture<ArticlesSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
