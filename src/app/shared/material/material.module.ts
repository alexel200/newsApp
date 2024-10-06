import {NgModule} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [
  ],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  exports:[
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButton,
    MatIcon,
  ]
})
export class MaterialModule { }
