import {Component} from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import {ProjectService} from '../_services/project.service'
import {Router} from '@angular/router'


@Component({
    selector: 'new-project',
    templateUrl: './newproject.component.html'
})
export class NewProjectComponent {

    private projectForm : FormGroup;
    private projectName : FormControl;

    constructor(
        private projectService: ProjectService,
        private formBuilder: FormBuilder,
        private router: Router
        ) {
            this.projectName = formBuilder.control('', Validators.required)

            this.projectForm = formBuilder.group({
                projectName: this.projectName
            })
        }

    createProject() {
        this.projectService.createProyect(this.projectForm.value).subscribe(
            project => {
                console.log(project)
            }
        )
    }
}