import {Component, OnDestroy, OnInit} from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import {UserService} from '../_services/user.service'
import {User} from '../_models/user'
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
    selector: 'crowd-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnDestroy, OnInit {
    private user : User;
    private subscription : Subscription;

    constructor(
        private userService : UserService,
        private fb : FacebookService
        ) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.user = currentUser && currentUser.user;
        this.subscription = this.userService.getUser().subscribe(user => {
            this.user = user;
        });

    }

    ngOnInit() {
        let fbParams : InitParams = {
            appId: '1799451990311050',
            xfbml: true,
            version: 'v2.7'
        }
        this.fb.init(fbParams)
    }

    ngOnDestroy() {}
}