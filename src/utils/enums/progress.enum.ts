export enum EProgressType {
  ASSIGNMENT_SHEETS = 'assignment_sheets',
  GUIDANCE_REVIEWS = 'guidance_reviews',
  SUPERVISORY_COMMENTS = 'supervisory_comments',
  STUDENT_LIST = 'student_list',
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