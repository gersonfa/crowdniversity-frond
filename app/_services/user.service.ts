import {Injectable} from '@angular/core'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {User} from '../_models/user'

@Injectable()
export class UserService {
    private user = new Subject<User>();
    constructor() {}

    sendUser(user : User) {
        this.user.next(user);
    }

    getUser() : Observable<User> {
        return this.user.asObservable();
    }

    clearUser() {
        this.user.next()
    }
}