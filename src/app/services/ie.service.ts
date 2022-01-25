import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Questionnaire} from '../models/questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class IeService {

  private readonly urlPrefix = environment.baseUrl;

  private readonly routesApi = {
    exportProgram: this.urlPrefix + '/export/program',
    archiveProgram: this.urlPrefix + '/archive/program',
    importProgram: this.urlPrefix + '/import/program',
    exportQuestionnaire: this.urlPrefix + '/export/questionnaire',
    importQuestionnaire: this.urlPrefix + '/import/questionnaire'
  };

  private readonly options = {
    responseType: 'arraybuffer' as const
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves the server url link for downloading the export json of the current program.
   */
  getProgramJsonUrl(): string {
    return this.routesApi.exportProgram;
  }

  /**
   * Retrieves the server url link for downloading the zip archive of the current program.
   */
  getProgramZipUrl(): string {
    return this.routesApi.archiveProgram;
  }

  /**
   * Retrieves the server url link for uploading the json import file for a program.
   */
  getProgramImportUrl(): string {
    return this.routesApi.importProgram;
  }

  /**
   * Makes an HTTP request for retrieving the questionnaire export json file.
   */
  getQuestionnaireExport(questionnaire: Questionnaire): Observable<ArrayBuffer> {
    return this.http.put(this.routesApi.exportQuestionnaire, questionnaire.sections, this.options);
  }

  /**
   * Retrieves the server url link for uploading the json import file for a questionnaire.
   */
  getQuestionnaireImportUrl(): string {
    return this.routesApi.importQuestionnaire;
  }
}
