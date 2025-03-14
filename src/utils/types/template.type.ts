import { EProgressAction } from '../enums/progress.enum';

export type TTemplate = {
  id: string;
  name: string;
  action: EProgressAction;
  templateFile?: string;
  jsonFile: string;
};
