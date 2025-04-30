export enum EAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
}

export enum ESubject {
  System_Users = 'system.users',
  System_Roles = 'system.roles',
  System_Permissions = 'system.permissions',
  System_Configuration = 'system.configuration',
  System_CronManagement = 'system.cronManagement',
  System_DriveApis = 'system.driveApis',

  Classes = 'classes',
  Students = 'students',

  Thesis_OtherDocuments = 'thesis.otherDocuments',
  Thesis_AssignmentSheets = 'thesis.assignmentSheets',
  Thesis_GuidanceReviews = 'thesis.guidanceReviews',
  Thesis_SupervisoryComments = 'thesis.supervisoryComments',
  Thesis_GoogleDrive = 'thesis.googleDrive',
  Thesis_OneDrive = 'thesis.oneDrive',

  Progress = 'progress',

  PythonScript_DBGenSpec = 'pythonScript.dbGenSpec',

  Storage = 'storage',

  Onedrive = 'onedrive',
}

export interface IPermission {
  action: EAction;
  subject: ESubject;
}
