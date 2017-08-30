import {Injectable} from "@angular/core";
import {Project} from "../_models/project";

@Injectable()
export class ProjectShared {
    private project : Project;

    setProject(project : Project): void {
        this.project = project;
    }

    getProject(): Project {
        return this.project;
    }

    clearProject(): void {
        this.project = null;
    }
}