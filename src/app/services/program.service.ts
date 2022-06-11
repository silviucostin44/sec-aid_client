import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Program} from '../models/program.model';
import {SelectableElement, SelectingOutput} from '../view/modals/select-modal/select-modal.component';
import ProgramHelper from '../helpers/program.helper';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private readonly urlPrefix = environment.baseUrl + '/program';
  private readonly routesApi = {
    id: (id) => this.urlPrefix + `/${id}`,
    save: this.urlPrefix + '/save',
    getAll: this.urlPrefix + '/all',
    manage: this.urlPrefix + '/manage',
    lastProgramStep: (id) => this.urlPrefix + `/${id}/last-step`
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Makes HTTP get request for a program, saved in the db, by its id.
   * @param id the program id.
   */
  getProgram(id: number): Observable<Program> {
    return this.http.get<Program>(this.routesApi.id(id));
  }

  /**
   * Makes HTTP post request for saving/updating a program that is stored in db.
   * @param program the program to save/update.
   */
  saveProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(this.routesApi.save, program);
  }

  /**
   * Makes HTTP get request for retrieving all the programs from db.
   */
  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.routesApi.getAll);
  }

  /**
   * Makes HTTP POST request for performing a general management on programs (addition, deletion, editing).
   * @param output the elements to perform actions on.
   */
  manageProgram(output: SelectingOutput): Observable<SelectableElement[]> {
    return this.http.post<Program[]>(this.routesApi.manage, output)
      .pipe(map(ProgramHelper.buildSelectableElemsFromProgramList));
  }

  /**
   * Makes HTTP get request to find out the latest step on current program.
   */
  lastProgramStep(id: number): Observable<number> {
    return this.http.get<number>(this.routesApi.lastProgramStep(id));
  }
}
