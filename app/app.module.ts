import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//  Modules
import { NgSemanticModule } from 'ng-semantic';
import { QuillModule } from 'ngx-quill'
import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';

//  Components
import { HomeComponent } from './HomeComponent/home.component'
import { ExploreComponent } from './ExploreComponent/explore.component'
import { ProjectComponent } from './ProjectComponent/project.component'
import { RegisterComponent } from './RegisterComponent/register.component'
import { LoginComponent } from './LoginComponent/login.component'
import { DashboardComponent, ProfileComponent } from './DashboardComponent/index'
import { ProjectsDashboardComponent } from './ProjectsDashboardComponent/projectsdashboard.component'

import { NewProjectComponent } from './NewProjectComponent/newproject.component'
import { EditProjectComponent, MainInfoComponent, BankComponent, GuideComponent, ResumeComponent, RewardsComponent, StagesComponent, TeamComponent } from './EditProjectComponent/index'

//  Services
import { AuthenticationService } from './_services/authentication.service'
import { UserService } from './_services/user.service'
import { ProjectService } from './_services/project.service'
import { ToolsService } from './_services/tools.service'
import { FacebookService } from 'ngx-facebook';
// Guards
import { AuthGuard } from './_guards/auth.guard'

// Route
import { routing } from './app.route';

//  Shared
import { ProjectShared } from './_shared/project.shared'

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'JWT',
    globalHeaders: [{ 'Content-Type': 'application/json' }]
  }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    NgSemanticModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    QuillModule,
    FancyImageUploaderModule
  ],
  declarations: [
    HomeComponent,
    ExploreComponent,
    ProjectComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProjectsDashboardComponent,
    ProfileComponent,
    NewProjectComponent,
    EditProjectComponent,
    MainInfoComponent,
    BankComponent,
    ResumeComponent,
    RewardsComponent,
    StagesComponent,
    TeamComponent,
    GuideComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-mx" },
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthenticationService,
    UserService,
    FacebookService,
    AuthGuard,
    ProjectService,
    ToolsService,
    FacebookService,
    ProjectShared
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [HomeComponent]
})

export class AppModule {

}