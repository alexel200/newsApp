import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";

@Component({
  selector: 'shared-searchbox',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './searchbox.component.html',
  styleUrl: './searchbox.component.css'
})
export class SearchboxComponent {
  @Output() emitSearchText: EventEmitter<string> = new EventEmitter();
  searchText: string = "";

  clean(){
    this.searchText = '';
    this.search();
  }

  search() {
    this.emitSearchText.emit(this.searchText);
  }
}
