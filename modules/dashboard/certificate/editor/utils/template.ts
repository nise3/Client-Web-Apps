import {Template} from '../interfaces/StageConfig';

export function toTemplateJSON(template: Template) {
  return JSON.stringify(template);
}
