import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../_services/project.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../_models/project';
import { ProjectShared } from '../../_shared/project.shared';

@Component({
    selector: 'main-info',
    templateUrl: './main.info.component.html'
})

export class MainInfoComponent implements OnInit {

    private project: Project;

    private countries : String[] = ['México', 'Chile', 'Colombia', 'Perú', 'Argentina']
    private selectedCountry : String = 'México';

    private categories : String[] = ['Tecnología', 'Salud', 'Diseño y moda', 'Artes', 'Proyecto comunitario']
    private selectedCategory : String = 'Tecnología';

    private stages : String[] = ['Concepto', 'Prototipo', 'Producción']
    private selectedStage : String = 'Concepto'

    private projectForm: FormGroup;
    private projectName: FormControl;

    private principalInformation: FormGroup;
    private moneyReach: FormControl;
    private sloganProject: FormControl;
    private imageCard: FormControl;
    private country: FormControl;
    private city: FormControl;
    private university: FormControl;
    private projectStage: FormControl;
    private category: FormControl;
    private daysCollection: FormControl;

    constructor(
        private projectService: ProjectService,
        private fb: FormBuilder,
        private projectShared: ProjectShared
    ) {}

    ngOnInit() {

        this.project = this.projectShared.getProject();

        this.projectName = this.fb.control(this.project.projectName, Validators.required);
        this.moneyReach = this.fb.control(this.project.principalInformation.moneyReach, Validators.required);
        this.sloganProject = this.fb.control(this.project.principalInformation.sloganProject, Validators.required);
        this.imageCard = this.fb.control(this.project.principalInformation.imageCard);
        this.country = this.fb.control(this.project.principalInformation.country, Validators.required);
        this.city = this.fb.control(this.project.principalInformation.city, Validators.required);
        this.university = this.fb.control(this.project.principalInformation.university, Validators.required);
        this.projectStage = this.fb.control(this.project.principalInformation.projectStage, Validators.required);
        this.category = this.fb.control(this.project.principalInformation.category, Validators.required);
        this.daysCollection = this.fb.control(this.project.principalInformation.daysCollection, Validators.required);

        this.principalInformation = this.fb.group({
            moneyReach: this.moneyReach,
            sloganProject: this.sloganProject,
            imageCard: this.imageCard,
            country: this.country,
            city: this.city,
            university: this.university,
            projectStage: this.projectStage,
            category: this.category,
            daysCollection: this.daysCollection
        })
        this.projectForm = this.fb.group({
            projectName: this.projectName,
            principalInformation: this.principalInformation
        })
    }

    updateMainInformation() {
        console.log(this.project)
        this.project = Object.assign(this.project, this.projectForm.value)
        this.projectService.updateProject(this.project).subscribe(
            project => {
                this.project = project
                
            },
            error => {
                console.error(error)
            }
        )
    }
}