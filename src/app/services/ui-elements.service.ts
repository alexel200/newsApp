import { Injectable } from '@angular/core';
import Swal, {SweetAlertIcon, SweetAlertResult} from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UiElementsService {

  constructor() { }

  showConfirmAlert(title: string = "Are you sure?", text: string = "You won't be able to revert this!", icon: SweetAlertIcon= "warning", confirmButtonText: string = "Yes, delete it!"):Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      cancelButtonColor: "#d33"
    });
  }


}
