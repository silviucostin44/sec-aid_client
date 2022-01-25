import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TemplateFileEnum} from '../models/enums/template-file.enum';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UploadedFileEnum} from '../models/enums/uploaded-file.enum';
import {File} from '../models/server-api/file';

@Injectable({
  providedIn: 'root'
})  // todo finally: remove unused endpoints
export class FileService {

  private readonly urlPrefix = environment.baseUrl + '/files';

  private readonly routesApi = {
    template: (type) => this.urlPrefix + `/template/${type}`,
    file: (type) => this.urlPrefix + `/${type}`,
    files: this.urlPrefix + '/many',
    filesByType: (type) => this.urlPrefix + `/many/${type}`,
    uploadFile: (type) => this.urlPrefix + `/upload/${type}`,
    uploadFiles: this.urlPrefix + '/upload-many',
    resetSessionDb: this.urlPrefix + '/reset',
    deleteFile: (id) => this.urlPrefix + `/${id}`
  };

  private readonly options = {
    responseType: 'arraybuffer' as const
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves the server url link for downloading specific template.
   * @param templateType the template type
   */
  getTemplateUrl(templateType: TemplateFileEnum): string {
    return this.routesApi.template(templateType);
  }

  /**
   * Retrieves the server url link for downloading specific uploaded file.
   * @param fileType the uploaded file type
   */
  getFileUrl(fileType: UploadedFileEnum): string {
    return this.routesApi.file(fileType);
  }

  /**
   * Retrieves the server url link for uploading specific file.
   * @param fileType the file type
   */
  getUploadFileUrl(fileType: UploadedFileEnum): string {
    return this.routesApi.uploadFile(fileType);
  }

  /**
   * Retrieves the server url link for uploading files for step 7 of the program.
   */
  getUploadFilesUrl(): string {
    return this.routesApi.uploadFiles;
  }

  /**
   * Makes HTTP get request for template file's array buffer to server.
   * @param templateType the template type
   */
  downloadTemplate(templateType: TemplateFileEnum): Observable<ArrayBuffer> {
    return this.http.get(this.routesApi.template(templateType), this.options);
  }

  /**
   * Makes HTTP get request for uploaded file's array buffer to server.
   * @param fileType the file type
   */
  downloadFile(fileType: UploadedFileEnum): Observable<File> {
    return this.http.get<File>(this.routesApi.file(fileType));
  }

  /**
   * Makes HTTP get request for uploaded files on 7 step of the program on server.
   */
  downloadFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.routesApi.files);
  }

  /**
   * Makes HTTP get request for uploaded files on 7 step of the program on server.
   */
  downloadFilesByType(fileType: UploadedFileEnum): Observable<File[]> {
    return this.http.get<File[]>(this.routesApi.filesByType(fileType));
  }

  /**
   * Makes an HTTP request for deleting a file by its id.
   */
  deleteFile(id: string): Observable<any> {
    return this.http.delete(this.routesApi.deleteFile(id));
  }

  /**
   * Makes an HTTP request for resetting the session db by deleting all files from previous session.
   */
  resetSessionDb(): void {  // todo finish: use it
    this.http.delete(this.routesApi.resetSessionDb).subscribe(
      () => console.log('Session reset successfully'),
      () => console.error('Session reset failed'));
  }

}
