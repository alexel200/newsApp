import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFormPageComponent } from './news-form-page.component';

describe('NewsFormComponent', () => {
  let component: NewsFormPageComponent;
  let fixture: ComponentFixture<NewsFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
