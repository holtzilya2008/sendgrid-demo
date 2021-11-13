import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../dto/user-dto';
import { UsersMock } from '../mocks/users-mock';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private path = 'users';

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<UserDTO[]> {
    const url = `${environment.backendUrl}/${this.path}`;
    return this.http.get<UserDTO[]>(url);
  };
}

