import {JsonPipe, NgClass} from "@angular/common";
import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {UserInterface} from "../../interfaces/user-interface";
import {UserService} from "../../services/user.service";
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-news-login-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    RouterLink,
    NgClass,
    JsonPipe
  ],
  templateUrl: './news-login-page.component.html',
  styleUrl: './news-login-page.component.css'
})
export class NewsLoginPageComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  user: UserInterface = {}
  constructor(private userService: UserService, private router: Router) {

  }
  login() {
    if(this.loginForm.invalid) return;
    if(this.user.username && this.user.password){
      this.userService.login(this.user.username, this.user.password).subscribe(
        (resp) =>{
          if(!resp){
            Swal.fire({
              title: "Access Denied",
              icon: "error",
              text: "Login invalid, access denied!"
            });
            return;
          }
          return this.router.navigate(['/'])
        }
      )
    }
  }
}
