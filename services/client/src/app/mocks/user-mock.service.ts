import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from '../dto/user-dto';
import { UsersMock } from './users-mock';

export class UsersMockService {

  private users: UserDTO[];
  private currentUser = new BehaviorSubject<UserDTO>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor() { }

  async initUsers(): Promise<void> {
    this.users = UsersMock;
    return Promise.resolve();
  }

  getUsers(): UserDTO[] {
    return this.users;
  }

  getUserById(userId: string): UserDTO {
      return this.users.find(u => u._id === userId);
  }

  private getUserByEmail(email: string): UserDTO {
    return this.users.find(u => u.email === email);
  }

  tryLogin(email: string): boolean {
    if (!email) {
      return false;
    }
    const user = this.getUserByEmail(email);
    if (!user) {
      return false;
    }
    this.currentUser.next(user);
    return true;
  }

  getCurrentUser(): UserDTO {
    return this.currentUser.value;
  }

}
