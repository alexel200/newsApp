import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {UserInterface} from "../interfaces/user-interface";

const USERS: UserInterface[] = [
  {
    name: 'testing',
    lastname: 'user',
    username: 'tuser1',
    password: '1234567'
  },
  {
    name: 'another',
    lastname: 'user',
    username: 'anotheruser',
    password: 'anotherUser1'
  }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserInterface| undefined = undefined;

  constructor() { }

  getUser():UserInterface|null{
    if(this.user)
      return this.user;
    return null;
  }

  login(username: string, password: string): Observable<boolean> {
    this.user = USERS.find(user => user.username === username && user.password === password);

    if(!this.user){
      return of(false);
    }

    return of(true);
  }

  logout() {
    this.user = undefined;
  }
}
