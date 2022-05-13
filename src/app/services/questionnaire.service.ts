import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestSection} from '../models/quest-section.model';
import {Questionnaire} from '../models/questionnaire.model';
import {QuestionnaireServer} from '../models/server-api/questionnaire-server';
import {SelectableElement, SelectingOutput} from '../view/modals/select-modal/select-modal.component';
import {map} from 'rxjs/operators';
import QuestionnaireHelper from '../helpers/questionnaire.helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private readonly urlPrefix = environment.baseUrl + '/questionnaire';

  private readonly routesApi = {
    defaultQuestionnaire: this.urlPrefix + '/default',
    loadQuestionnaire: (id) => this.urlPrefix + `/${id}`,
    updateRating: this.urlPrefix + '/update-rating',
    saveQuestionnaire: this.urlPrefix + '/save',
    allQuestionnaires: this.urlPrefix + '/all',
    manageQuestionnaires: this.urlPrefix + '/manage'
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Makes HTTP get request for retrieving the entire DEFAULT questionnaire.
   */
  getDefaultQuestionnaire(): Observable<QuestSection[]> {
    return this.http.get<QuestSection[]>(this.routesApi.defaultQuestionnaire);
  }

  /**
   * Makes HTTP put request for updating the scores on the questionnaire.
   * @param questionnaire the questionnaire.
   */
  computeScores(questionnaire: Questionnaire): Observable<QuestSection[]> {
    return this.http.put<any[]>(this.routesApi.updateRating, questionnaire.sections);
  }

  /**
   * Males HTTP get request for retrieving a questionnaire from DB by its id.
   */
  getQuestionnaire(id: string): Observable<QuestionnaireServer> {
    return this.http.get<QuestionnaireServer>(this.routesApi.loadQuestionnaire(id));
  }

  /**
   * Makes HTTP post request for saving a questionnaire on DB.
   */
  saveQuestionnaire(id: string, questionnaire: Questionnaire, name: String): Observable<QuestionnaireServer> {
    const body = {
      id: id,
      sections: questionnaire.sections,
      name: name
    } as QuestionnaireServer;
    return this.http.post<QuestionnaireServer>(this.routesApi.saveQuestionnaire, body);
  }

  /**
   * Makes HTTP get request for retrieving all the questionnaires from db.
   */
  getAllQuestionnaires(): Observable<QuestionnaireServer[]> {
    return this.http.get<QuestionnaireServer[]>(this.routesApi.allQuestionnaires);
  }

  /**
   * Makes HTTP POST request for performing a general management on questionnaires (addition, deletion, editing),
   * @param output the elements to perform actions on.
   */
  manageQuestionnaires(output: SelectingOutput): Observable<SelectableElement[]> {
    return this.http.post<QuestionnaireServer[]>(this.routesApi.manageQuestionnaires, output)
      .pipe(map(QuestionnaireHelper.buildSelectableElemsFromQuestionnaireServerList));
  }
}
