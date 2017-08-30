import {Injectable} from '@angular/core'
import {Http, Headers, Response, RequestOptions} from '@angular/http'
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import { Router } from '@angular/router'
import {UserService} from './user.service'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import {User} from '../_models/user'

@Injectable()
export class AuthenticationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({headers: this.headers});

    private fbOptions: LoginOptions = {
        scope: 'public_profile,email',
        enable_profile_selector: true
    }

    constructor(
        private http: Http,
        private fb : FacebookService,
        private userService : UserService,
        private router : Router
        ){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    localRegister(user : any) : Observable<User> {
        let newUser = this.http.post('/api/auth/register', JSON.stringify(user), this.options)
            .map(this.mapUser);
        return newUser;
    }

    fbGetUser() {
        this.fb.login(this.fbOptions).then(
            (response : LoginResponse) => {
                this.fb.api('/me', "get", {fields: 'first_name,last_name,email,id'}).then( response => {
                    let user = {
                        firstName: response.first_name,
                        lastName: response.last_name,
                        email: response.email,
                        facebookId: response.id
                    }
                    this.fbLogin(user).subscribe(
                        user => {
                            this.userService.sendUser(user);
                            this.router.navigate(['/']);
                        }, 
                        error => {
                            
                        }
                    )
                })
            },
            (error : any) => console.log(error) 
        )
    }

    fbLogin(user : any) : Observable<User> {
        return this.http.post('/api/auth/facebook', JSON.stringify(user), this.options)
            .map(this.mapUser);
    }

    localLogin(credentials : any) : Observable<User>{
        return this.http.post('/api/auth/login', JSON.stringify(credentials), this.options)
            .map(this.mapUser);
    }
    
    logOut() {
        localStorage.clear()
    }

    mapUser(response : Response) : User {
        let data = response.json();
        let user = <User>(data.user);

        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify({user: user}));
        return user;
    }
}

