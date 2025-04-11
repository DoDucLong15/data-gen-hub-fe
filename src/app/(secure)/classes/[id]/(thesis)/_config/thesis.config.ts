import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { z } from 'zod';
import { THESIS_CONFIG } from '@/configs/messages.config';

export type ColumnConfig = {
  header: string;
  accessorKey: string;
  cell?: (row: any) => React.ReactNode;
  enableSort?: boolean;
  hidden?: boolean;
  maxWidth?: string;
  minWidth?: string;
  type?: string;
};

export type EntityConfig = {
  fileListName: string;
  title: string;
  formSchema: z.ZodObject<any>;
  defaultValues: any;
  columns: ColumnConfig[];
  downloadEnabled?: boolean;
};

export const entityConfigs: Record<EThesisDocumentType, EntityConfig> = {
  [EThesisDocumentType.ASSIGNMENT_SHEET]: {
    fileListName: 'assignment-sheet.zip',
    title: THESIS_CONFIG.ASSIGNMENT_SHEET.TITLE,
    formSchema: z.object({
      mssv: z.string().min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.MSSV.ERROR }),
      fullName: z.string().min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.FULL_NAME.ERROR }),
      studentClassName: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.STUDENT_CLASS_NAME.ERROR })
        .optional(),
      projectTitle: z.string().min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.PROJECT_TITLE.ERROR }).optional(),
      supervisor: z.string().min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.SUPERVISOR.ERROR }).optional(),
      phone: z.string().min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.PHONE.ERROR }).optional(),
      email: z.string().email({ message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.EMAIL.ERROR }).optional(),
      classCode: z.string().min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.CLASS_CODE.ERROR }).optional(),
      semester: z.string().min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.SEMESTER.ERROR }).optional(),
      school: z.string().min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.SCHOOL.ERROR }).optional(),
      thesisStartDate: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.THESIS_START_DATE.ERROR })
        .optional(),
      thesisEndDate: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.THESIS_END_DATE.ERROR })
        .optional(),
      studentKnowledgeGained: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.STUDENT_KNOWLEDGE_GAINED.ERROR })
        .optional(),
      technologyGained: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.TECHNOLOGY_GAINED.ERROR })
        .optional(),
      acquiredSkills: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.ACQUIRED_SKILLS.ERROR })
        .optional(),
      expectedProducts: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.EXPECTED_PRODUCTS.ERROR })
        .optional(),
      realWorldProblemSolved: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.REAL_WORLD_PROBLEM_SOLVED.ERROR })
        .optional(),
      student_sign_date: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.STUDENT_SIGN_DATE.ERROR })
        .optional(),
      supervisor_sign_date: z
        .string()
        .min(1, { message: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.SUPERVISOR_SIGN_DATE.ERROR })
        .optional(),
    }),
    defaultValues: {
      mssv: '',
      fullName: '',
      studentClassName: '',
      projectTitle: '',
      supervisor: '',
      // phone: '',
      // email: '',
      classCode: '',
      semester: '',
      school: '',
      // thesisStartDate: '',
      // thesisEndDate: '',
      studentKnowledgeGained: '',
      technologyGained: '',
      acquiredSkills: '',
      expectedProducts: '',
      realWorldProblemSolved: '',
      // student_sign_date: '',
      // supervisor_sign_date: '',
    },
    columns: [
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.MSSV.LABEL, accessorKey: 'mssv' },
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.FULL_NAME.LABEL, accessorKey: 'fullName' },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.STUDENT_CLASS_NAME.LABEL,
        accessorKey: 'studentClassName',
        hidden: true,
      },
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.PROJECT_TITLE.LABEL, accessorKey: 'projectTitle', hidden: true },
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.SUPERVISOR.LABEL, accessorKey: 'supervisor' },
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.PHONE.LABEL, accessorKey: 'phone', hidden: true },
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.EMAIL.LABEL, accessorKey: 'email' },
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.CLASS_CODE.LABEL, accessorKey: 'classCode', hidden: true },
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.SEMESTER.LABEL, accessorKey: 'semester', hidden: true },
      { header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.SCHOOL.LABEL, accessorKey: 'school', hidden: true },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.THESIS_START_DATE.LABEL,
        accessorKey: 'thesisStartDate',
        type: 'date',
        hidden: true,
      },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.THESIS_END_DATE.LABEL,
        accessorKey: 'thesisEndDate',
        type: 'date',
        hidden: true,
      },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.STUDENT_KNOWLEDGE_GAINED.LABEL,
        accessorKey: 'studentKnowledgeGained',
        type: 'textarea',
        hidden: true,
      },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.TECHNOLOGY_GAINED.LABEL,
        accessorKey: 'technologyGained',
        type: 'textarea',
        hidden: true,
      },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.ACQUIRED_SKILLS.LABEL,
        accessorKey: 'acquiredSkills',
        type: 'textarea',
        hidden: true,
      },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.EXPECTED_PRODUCTS.LABEL,
        accessorKey: 'expectedProducts',
        type: 'textarea',
        hidden: true,
      },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.REAL_WORLD_PROBLEM_SOLVED.LABEL,
        accessorKey: 'realWorldProblemSolved',
        type: 'textarea',
        hidden: true,
      },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.STUDENT_SIGN_DATE.LABEL,
        accessorKey: 'student_sign_date',
        type: 'date',
        hidden: true,
      },
      {
        header: THESIS_CONFIG.ASSIGNMENT_SHEET.FORM.SUPERVISOR_SIGN_DATE.LABEL,
        accessorKey: 'supervisor_sign_date',
        type: 'date',
        hidden: true,
      },
      { header: THESIS_CONFIG.COMMON.CREATED_AT, accessorKey: 'createdAt' },
    ],
    downloadEnabled: true,
  },
  [EThesisDocumentType.GUIDANCE_REVIEW]: {
    fileListName: 'guidance-review.zip',
    title: THESIS_CONFIG.GUIDANCE_REVIEW.TITLE,
    formSchema: z.object({
      mssv: z.string().min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.MSSV.ERROR }),
      fullName: z.string().min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.FULL_NAME.ERROR }),
      supervisor: z.string().min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.SUPERVISOR.ERROR }).optional(),
      projectTitle: z.string().min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PROJECT_TITLE.ERROR }).optional(),
      typeOfThesis: z.string().min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.TYPE_OF_THESIS.ERROR }).optional(),
      topicUniquenessPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.TOPIC_UNIQUENESS_POINT.ERROR })
        .optional(),
      workloadPoint: z.number().min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.WORKLOAD_POINT.ERROR }).optional(),
      problemDifficultyPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PROBLEM_DIFFICULTY_POINT.ERROR })
        .optional(),
      solutionImpactPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.SOLUTION_IMPACT_POINT.ERROR })
        .optional(),
      productFinalizationPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PRODUCT_FINALIZATION_POINT.ERROR })
        .optional(),
      layoutCoherencePoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.LAYOUT_COHERENCE_POINT.ERROR })
        .optional(),
      contentValidityPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.CONTENT_VALIDITY_POINT.ERROR })
        .optional(),
      presentationQualityPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PRESENTATION_QUALITY_POINT.ERROR })
        .optional(),
      reliabilityAndReferencesPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.RELIABILITY_AND_REFERENCES_POINT.ERROR })
        .optional(),
      responseAccuracyPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.RESPONSE_ACCURACY_POINT.ERROR })
        .optional(),
      presentationSkillsPoint: z
        .number()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PRESENTATION_SKILLS_POINT.ERROR })
        .optional(),
      rewardPoint: z.number().min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.REWARD_POINT.ERROR }).optional(),
      generalFeedback: z
        .string()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.GENERAL_FEEDBACK.ERROR })
        .optional(),
      conclusion: z.string().min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.CONCLUSION.ERROR }).optional(),
      teacherSignDate: z
        .string()
        .min(1, { message: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.TEACHER_SIGN_DATE.ERROR })
        .optional(),
    }),
    defaultValues: {
      mssv: '',
      fullName: '',
      supervisor: '',
      projectTitle: '',
      typeOfThesis: '',
      topicUniquenessPoint: 0,
      workloadPoint: 0,
      problemDifficultyPoint: 0,
      solutionImpactPoint: 0,
      productFinalizationPoint: 0,
      layoutCoherencePoint: 0,
      contentValidityPoint: 0,
      presentationQualityPoint: 0,
      reliabilityAndReferencesPoint: 0,
      responseAccuracyPoint: 0,
      presentationSkillsPoint: 0,
      rewardPoint: 0,
      generalFeedback: '',
      conclusion: '',
      // teacherSignDate: '',
    },
    columns: [
      { header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.MSSV.LABEL, accessorKey: 'mssv' },
      { header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.FULL_NAME.LABEL, accessorKey: 'fullName' },
      { header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.SUPERVISOR.LABEL, accessorKey: 'supervisor' },
      { header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PROJECT_TITLE.LABEL, accessorKey: 'projectTitle' },
      { header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.TYPE_OF_THESIS.LABEL, accessorKey: 'typeOfThesis', hidden: true },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.TOPIC_UNIQUENESS_POINT.LABEL,
        accessorKey: 'topicUniquenessPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.WORKLOAD_POINT.LABEL,
        accessorKey: 'workloadPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PROBLEM_DIFFICULTY_POINT.LABEL,
        accessorKey: 'problemDifficultyPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.SOLUTION_IMPACT_POINT.LABEL,
        accessorKey: 'solutionImpactPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PRODUCT_FINALIZATION_POINT.LABEL,
        accessorKey: 'productFinalizationPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.LAYOUT_COHERENCE_POINT.LABEL,
        accessorKey: 'layoutCoherencePoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.CONTENT_VALIDITY_POINT.LABEL,
        accessorKey: 'contentValidityPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PRESENTATION_QUALITY_POINT.LABEL,
        accessorKey: 'presentationQualityPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.RELIABILITY_AND_REFERENCES_POINT.LABEL,
        accessorKey: 'reliabilityAndReferencesPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.RESPONSE_ACCURACY_POINT.LABEL,
        accessorKey: 'responseAccuracyPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.PRESENTATION_SKILLS_POINT.LABEL,
        accessorKey: 'presentationSkillsPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.REWARD_POINT.LABEL,
        accessorKey: 'rewardPoint',
        hidden: true,
        type: 'number',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.GENERAL_FEEDBACK.LABEL,
        accessorKey: 'generalFeedback',
        hidden: true,
        type: 'textarea',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.CONCLUSION.LABEL,
        accessorKey: 'conclusion',
        hidden: true,
        type: 'textarea',
      },
      {
        header: THESIS_CONFIG.GUIDANCE_REVIEW.FORM.TEACHER_SIGN_DATE.LABEL,
        accessorKey: 'teacherSignDate',
        type: 'date',
        hidden: true,
      },
      { header: THESIS_CONFIG.COMMON.CREATED_AT, accessorKey: 'createdAt' },
    ],
    downloadEnabled: true,
  },
  [EThesisDocumentType.SUPERVISORY_COMMENTS]: {
    fileListName: 'supervisory-comments.zip',
    title: THESIS_CONFIG.SUPERVISORY_COMMENTS.TITLE,
    formSchema: z.object({
      supervisor: z.string().min(1, { message: THESIS_CONFIG.SUPERVISORY_COMMENTS.FORM.SUPERVISOR.ERROR }).optional(),
      mssv: z.string().min(1, { message: THESIS_CONFIG.SUPERVISORY_COMMENTS.FORM.MSSV.ERROR }),
      fullName: z.string().min(1, { message: THESIS_CONFIG.SUPERVISORY_COMMENTS.FORM.FULL_NAME.ERROR }),
      projectTitle: z
        .string()
        .min(1, { message: THESIS_CONFIG.SUPERVISORY_COMMENTS.FORM.PROJECT_TITLE.ERROR })
        .optional(),
    }),
    defaultValues: {
      fullName: '',
      mssv: '',
      projectTitle: '',
      supervisor: '',
    },
    columns: [
      { header: THESIS_CONFIG.SUPERVISORY_COMMENTS.FORM.MSSV.LABEL, accessorKey: 'mssv' },
      { header: THESIS_CONFIG.SUPERVISORY_COMMENTS.FORM.FULL_NAME.LABEL, accessorKey: 'fullName' },
      { header: THESIS_CONFIG.SUPERVISORY_COMMENTS.FORM.PROJECT_TITLE.LABEL, accessorKey: 'projectTitle' },
      { header: THESIS_CONFIG.SUPERVISORY_COMMENTS.FORM.SUPERVISOR.LABEL, accessorKey: 'supervisor' },
      { header: THESIS_CONFIG.COMMON.CREATED_AT, accessorKey: 'createdAt' },
    ],
    downloadEnabled: true,
  },
};
