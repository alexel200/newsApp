import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLength',
  standalone: true
})
export class TextLengthPipe implements PipeTransform {

  transform(text: string|null, length:number): string|null {
    let newText = text;
    if(text && text.length > length){
      newText = text.substring(0, length).concat('...');
    }
    return newText;
  }

}
