import {NgClass, NgForOf, NgIf, NgStyle, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import Swal from "sweetalert2";
import {MenuInterface} from "../../interfaces/menu-interface";
import {UserInterface} from "../../interfaces/user-interface";
import {UserService} from "../../services/user.service";
import {MaterialModule} from "../material/material.module";
import {SearchboxComponent} from "../searchbox/searchbox.component";

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [MaterialModule, NgStyle, NgClass, NgForOf, UpperCasePipe, TitleCasePipe, RouterLinkActive, SearchboxComponent, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() searchEmitText: EventEmitter<string> = new EventEmitter();
  user: UserInterface|null = null;
  routerUrl!: string;

  constructor(private router: Router, private userService: UserService) {
    this.routerUrl = router.url;
    this.user = this.userService.getUser();
  }

  toggleNavbar = false;
  menu: MenuInterface[] = [
    {
      name: 'home',
      icon: 'pi-home',
      route: '',
    }
  ]

  search(searchText: string) {
    this.searchEmitText.emit(searchText);
  }

  logout() {
    this.user = null;
    this.userService.logout();
    Swal.fire({
      title: 'Info',
      icon: 'success',
      text: 'Session closed successfully'
    });
  }
}
