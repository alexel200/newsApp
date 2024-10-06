import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsInsightComponent } from './news-insight.component';

describe('NewsInsightComponent', () => {
  let component: NewsInsightComponent;
  let fixture: ComponentFixture<NewsInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsInsightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
