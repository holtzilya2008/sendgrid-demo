import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from '../dto/user-dto';
import { UsersMock } from '../mocks/users-mock';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: UserDTO[];
  private currentUser = new BehaviorSubject<UserDTO>(UsersMock[0]);
  currentUser$ = this.currentUser.asObservable();

  constructor(private api: UsersApiService) { }

  async initUsers(): Promise<void> {
    this.users = await this.api.getUsers().toPromise();
  }

  getUsers(): UserDTO[] {
    return this.users;
  }

  getCurrentUser(): UserDTO {
    return this.currentUser.value;
  }


}
