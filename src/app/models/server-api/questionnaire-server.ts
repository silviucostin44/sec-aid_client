import {QuestSection} from '../quest-section.model';

export interface QuestionnaireServer {
  id?: String;
  sections: QuestSection[];
  name?: String;
}
