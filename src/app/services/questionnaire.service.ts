import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Questionnaire} from '../models/questionnaire.model';
import {QuestSection} from '../models/quest-section.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private readonly urlPrefix = environment.baseUrl + '/questionnaire';

  private readonly routesApi = {
    questionnaire: this.urlPrefix,
    updateRating: this.urlPrefix + '/update-rating'
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Makes HTTP get request for retrieving the entire questionnaire.
   */
  getQuestionnaire(): Observable<QuestSection[]> {
    return this.http.get<QuestSection[]>(this.routesApi.questionnaire);
  }

  /**
   * Makes HTTP put request for updating the scores on the questionnaire.
   * @param questionnaire the questionnaire.
   */
  computeScores(questionnaire: Questionnaire): Observable<QuestSection[]> {
    return this.http.put<any[]>(this.routesApi.updateRating, questionnaire.sections);
  }
}
