import { EProgressAction, EProgressStatus, EProgressType } from '../enums/progress.enum';

export type TProcess = {
  id: string;
  type: string;
  status: EProgressStatus;
  error: any;
  action: string;
  classId: string;
  createBy: string;
  createdAt: Date;
};

export type TProcessFilter = {
  type?: EProgressType;
  status?: EProgressStatus;
  classId: string;
  action?: EProgressAction;
};

export type TProgressFilter = {
  types?: EProgressType[];
  statuses?: EProgressStatus[];
  processIds?: string[];
  actions?: EProgressAction[];
  classIds: string[];
};
