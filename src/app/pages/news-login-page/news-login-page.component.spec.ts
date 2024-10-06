import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLoginPageComponent } from './news-login-page.component';

describe('NewsLoginPageComponent', () => {
  let component: NewsLoginPageComponent;
  let fixture: ComponentFixture<NewsLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsLoginPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
