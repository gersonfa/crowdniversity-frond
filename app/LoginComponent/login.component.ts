import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from '../_services/authentication.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import {UserService} from '../_services/user.service'

@Component({
    selector: 'crowd-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    private userForm : FormGroup;
    private email : FormControl;
    private password : FormControl;

    errorMessage : string = '';
    isLoading : boolean = false;

    constructor(
        private authenticationService : AuthenticationService,
        private formBuilder : FormBuilder,
        private router : Router,
        private userService : UserService
    ) {}

    ngOnInit() {
        this.email = this.formBuilder.control('', Validators.required);
        this.password = this.formBuilder.control('', Validators.required);

        this.userForm = this.formBuilder.group({
            email: this.email,
            password: this.password
        })
    }

    fbLogin() {
        this.authenticationService.fbGetUser()
    }

    localLogin() {
        this.errorMessage = '';
        this.isLoading = true;
        this.authenticationService.localLogin(this.userForm.value).subscribe(
            user => {
                this.userService.sendUser(user);
                this.errorMessage = '';
                this.router.navigate(['/']);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                console.log(error)
                if(error._body === 'Unauthorized') {
                    this.errorMessage = 'Email o contraseña incorrectos por favor vuelve a intentarlo.'
                    
                } else if (!JSON.parse(error._body).status) {
                    this.errorMessage = 'Parece que tu estas registrado con Facebook'
                }
            }
        )
    }
}