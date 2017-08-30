import {Component, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import {AuthenticationService} from '../_services/authentication.service'
import { Router } from '@angular/router'
import {UserService} from '../_services/user.service'

@Component({
    selector: 'crowd-register',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

    private userForm : FormGroup;
    private firstName : FormControl;
    private lastName : FormControl;
    private email : FormControl;
    private password : FormControl;
    
    constructor(
        private authenticationService : AuthenticationService,
        private formBuilder : FormBuilder,
        private router : Router,
        private userService : UserService
    ) {}

    ngOnInit() {
        this.firstName = this.formBuilder.control('', Validators.required);
        this.lastName = this.formBuilder.control('', Validators.required);
        this.email = this.formBuilder.control('', Validators.required);
        this.password = this.formBuilder.control('', Validators.required);

        this.userForm = this.formBuilder.group({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        })
    }

    fbLogin() {
        this.authenticationService.fbGetUser();
    }

    register() {
        this.authenticationService.localRegister(this.userForm.value).subscribe(
            user => {
                this.userService.sendUser(user);
                this.router.navigate(['/']);
            },
            error => {
                console.log(error)
            }
        )
    }

    
}