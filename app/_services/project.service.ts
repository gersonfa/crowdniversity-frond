import {Injectable} from '@angular/core'
import {Http, Headers, Response, RequestOptions} from '@angular/http'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import {Project} from '../_models/project'
import { ToolsService } from './tools.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ProjectService {

    private token : string;

    constructor(
        private http: AuthHttp,
        private toolsService: ToolsService
    ) {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token
    }

    createProyect(project : any) : Observable<Project> {
        return this.http.post('/api/project', JSON.stringify(project))
            .map(this.toolsService.extractData);
    }

    getProjectsByUser() : Observable<Project[]> {
        return this.http.get('/api/project/user')
            .map(this.toolsService.extractData)
    }

    updateProject(project: Project): Observable<any> {
        return this.http.put(`/api/project/main/${project._id}`, JSON.stringify(project))
            .map(this.toolsService.extractData);
    }
}