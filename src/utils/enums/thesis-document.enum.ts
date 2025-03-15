export enum EThesisDocumentType {
  GUIDANCE_REVIEW = 'guidance_reviews',
  SUPERVISORY_COMMENTS = 'supervisory_comments',
  ASSIGNMENT_SHEET = 'assignment_sheets',
}

export const EThesisDocName = {
  [EThesisDocumentType.GUIDANCE_REVIEW]: 'NXHD',
  [EThesisDocumentType.SUPERVISORY_COMMENTS]: 'NXPB',
  [EThesisDocumentType.ASSIGNMENT_SHEET]: 'PGNV',
};
