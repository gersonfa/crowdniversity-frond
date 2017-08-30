import {Component, OnInit} from '@angular/core'
import {Project} from '../_models/project'
import {ProjectService} from '../_services/project.service'
import { ProjectShared } from '../_shared/project.shared';

@Component({
    selector: 'projects-dashboard',
    templateUrl: './projectsdashboard.component.html'
})
export class ProjectsDashboardComponent implements OnInit {
    private projects : Project[];

    constructor(
        private projectService: ProjectService,
        private projectShared: ProjectShared
        ) {}

    ngOnInit() {
        this.projectService.getProjectsByUser().subscribe(projects => {
            this.projects = projects;
            console.log(projects)
        })
    }

    selectProject(project) {
        this.projectShared.setProject(project);
    }
}