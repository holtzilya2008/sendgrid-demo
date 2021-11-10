import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { DB_ACCESSOR_URL } from 'src/constants';
import { UserDTO } from 'src/dto/user-dto';

@Injectable()
export class UserService {

    private readonly path = 'users';

    constructor(private http: HttpService) {

    }

    async getUserByEmail(email: string): Promise<UserDTO> {
        const users = await this.getUsers();
        return users.find(u => u.email === email);
    }

    async getUsers(): Promise<UserDTO[]> {
        const observable = this.http.get(`${DB_ACCESSOR_URL}/${this.path}`).pipe(
            tap(response => console.log(response)),
            map((response: AxiosResponse<UserDTO[]>) => response.data)
        );
        return firstValueFrom(observable);
    }

}
