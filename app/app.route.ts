import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './HomeComponent/home.component'
import { ExploreComponent } from './ExploreComponent/explore.component'
import { ProjectComponent } from './ProjectComponent/project.component'
import { RegisterComponent } from './RegisterComponent/register.component'
import { LoginComponent } from './LoginComponent/login.component'
import { NewProjectComponent } from './NewProjectComponent/newproject.component'
import { EditProjectComponent, MainInfoComponent, BankComponent, GuideComponent, ResumeComponent, RewardsComponent, StagesComponent, TeamComponent } from './EditProjectComponent/index'
import { DashboardComponent, ProfileComponent } from './DashboardComponent/index'
import { ProjectsDashboardComponent } from './ProjectsDashboardComponent/projectsdashboard.component'


// Guards
import { AuthGuard } from './_guards/auth.guard'

const ROUTES: Routes = [
  { path: '', component: ExploreComponent },
  {
    path: 'project', component: ProjectComponent, children: [
      { path: 'new', component: NewProjectComponent, canActivate: [AuthGuard] },
      {
        path: 'edit/:projectid', component: EditProjectComponent, children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: MainInfoComponent },
          { path: 'bank', component: BankComponent },
          { path: 'guide', component: GuideComponent },
          { path: 'resume', component: ResumeComponent },
          { path: 'rewards', component: RewardsComponent },
          { path: 'stages', component: StagesComponent },
          { path: 'team', component: TeamComponent }
        ]
      }
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'projects', component: ProjectsDashboardComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(ROUTES, { useHash: true });