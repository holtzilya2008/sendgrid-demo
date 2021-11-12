import { Pipe, PipeTransform } from '@angular/core';
import { UserDTO } from '../dto/user-dto';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(user: UserDTO): string {
    return `assets/${user.avatarUrl}`;
  }

}
