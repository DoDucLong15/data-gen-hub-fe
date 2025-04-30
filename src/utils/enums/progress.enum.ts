export enum EProgressType {
  ASSIGNMENT_SHEETS = 'assignment_sheets',
  GUIDANCE_REVIEWS = 'guidance_reviews',
  SUPERVISORY_COMMENTS = 'supervisory_comments',
  STUDENT_LIST = 'student_list',
  OTHER_DOCUMENT = 'other_document',
  DRIVE_DATA = 'drive_data',
  ONE_DRIVE_DATA = 'onedrive_data',
}

export enum EProgressStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum EProgressAction {
  EXPORT = 'export',
  IMPORT = 'import',
}
