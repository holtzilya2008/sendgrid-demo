import { Pipe, PipeTransform } from '@angular/core';
import { UserDTO } from '../dto/user-dto';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(user: UserDTO): string {
    return user.nickName;
  }

}
