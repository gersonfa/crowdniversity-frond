import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../_services/project.service';
import { ProjectShared } from '../../_shared/project.shared';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Project } from '../../_models/project';
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';

@Component({
    selector: 'resume-component',
    templateUrl: './resume.component.html'
})

export class ResumeComponent implements OnInit {

    private project: Project;

    private videoUrl: string;
    private generalDescription: string

    private resume: any;

    constructor(
        private projectService: ProjectService,
        private projectShared: ProjectShared
    ) { }

    options: FancyImageUploaderOptions = {
        thumbnailHeight: 250,
        thumbnailWidth: 400,
        uploadUrl: 'http://some-server.com/upload',
        allowedImageTypes: ['image/png', 'image/jpeg'],
        maxImageSize: 1
    };

    onUpload(file: UploadedFile) {
        console.log(file.response);
    }

    ngOnInit() {
        this.project = this.projectShared.getProject();
    }

    updateProject() {
        console.log(this.resume);
    }

    saveAndContinue() {
        console.log(this.project);
        
    }
}