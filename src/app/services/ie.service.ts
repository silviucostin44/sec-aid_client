import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IeService {

  private readonly urlPrefix = environment.baseUrl;

  private readonly routesApi = {
    exportProgram: this.urlPrefix + '/export/program',
    archiveProgram: this.urlPrefix + '/archive/program',
    importProgram: this.urlPrefix + '/import/program'
  };

  constructor() {
  }

  /**
   * Retrieves the server url link for downloading the export json of the current program.
   */
  getProgramJsonUrl() {
    return this.routesApi.exportProgram;
  }

  /**
   * Retrieves the server url link for downloading the zip archive of the current program.
   */
  getProgramZipUrl() {  // todo: add button for this
    return this.routesApi.exportProgram;
  }

  /**
   * Retrieves the server url link for uploading the json import file for a program.
   */
  getProgramImportUrl() {
    return this.routesApi.importProgram;
  }
}
