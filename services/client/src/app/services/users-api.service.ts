import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDTO } from '../dto/user-dto';
import { UsersMock } from '../mocks/users-mock';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor() {

  }

  getUsers(): Observable<UserDTO[]> {
    return of(UsersMock);
  };
}

