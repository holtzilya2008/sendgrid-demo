import { Controller, Get } from '@nestjs/common';
import { UserDTO } from 'src/dto/user-dto';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UserService) {

    }

    @Get()
    async getUsers(): Promise<UserDTO[]> {
        return await this.userService.getUsers();
    }

}
