import { Pipe, PipeTransform } from '@angular/core';
import { UserDTO } from '../dto/user-dto';
import { UsersService } from '../services/users.service';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(private usersService: UsersService) {

  }

  transform(userId: string): UserDTO {
    console.log(userId);
    return this.usersService.getUserById(userId);
  }

}
