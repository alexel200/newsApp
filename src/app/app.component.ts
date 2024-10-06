import {Component} from '@angular/core';
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {RouterOutlet} from '@angular/router';
import {CategoriesComponent} from "./components/categories/categories.component";

import {NavbarComponent} from "./shared/navbar/navbar.component";

@Component({
  imports: [RouterOutlet, MatMenu, MatMenuTrigger, NavbarComponent, CategoriesComponent],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.css',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'newsApp';
}
