import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[highlightInput]',
  standalone: true
})
export class HighlightInputFormDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('focus') onFocus() {
    this.highlight()
  }
  @HostListener('blur') onBlur() {
    this.restoreInput()
  }

  private highlight(){
    this.paintInput('highlight')

  }

  private restoreInput(){
    this.paintInput('restore')
  }

  private paintInput(style: string){
    let borderSize:string = "1px";
    let borderStyle: string = "solid";
    let borderColor:string = "#dee2e6";
    let generalColor: string = "#f8f9fa";
    let textColor:string = "black";

    if( style == 'highlight'){
      borderSize = "5px";
      borderStyle = "double";
      borderColor = "black";
      generalColor = "black";
      textColor = "white  ";
    }

    this.renderer.setStyle(this.el.nativeElement, 'border', `${borderSize} ${borderStyle} ${borderColor}`);

    // Change label color
    const label = this.el.nativeElement.previousElementSibling;
    if (label && label.tagName === 'LABEL') {
      this.renderer.setStyle(label, 'color', `${textColor}`);
      this.renderer.setStyle(label, 'backgroundColor', `${generalColor}`);
      this.renderer.setStyle(label, 'border', `${borderSize} ${borderStyle} ${borderColor}`);
    }
  }
}
