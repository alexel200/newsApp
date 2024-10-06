import {NgForOf, NgIf} from "@angular/common";
import { Component } from '@angular/core';
import {TextLengthPipe} from "../../pipes/text-length.pipe";

@Component({
  selector: 'shared-articles-skeleton',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TextLengthPipe
  ],
  templateUrl: './articles-skeleton.component.html',
  styleUrl: './articles-skeleton.component.css'
})
export class ArticlesSkeletonComponent {

}
