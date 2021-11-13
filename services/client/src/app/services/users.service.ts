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
  private currentUser = new BehaviorSubject<UserDTO>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private api: UsersApiService) { }

  async initUsers(): Promise<void> {
    this.users = await this.api.getUsers().toPromise();
    const loginAs = this.users.find(u => u.email === 'holtzilya2008@gmail.com');
    this.currentUser.next(loginAs);
  }

  getUsers(): UserDTO[] {
    return this.users;
  }

  getUserById(userId: string): UserDTO {
      return this.users.find(u => u._id === userId);
  }

  getCurrentUser(): UserDTO {
    return this.currentUser.value;
  }


}
