import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { z } from 'zod';

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
    title: 'Phiếu giao nhiệm vụ',
    formSchema: z.object({
      mssv: z.string().min(1, { message: 'MSSV là bắt buộc' }),
      fullName: z.string().min(1, { message: 'Họ tên là bắt buộc' }),
      studentClassName: z.string().min(1, { message: 'Lớp học sinh viên là không bắt buộc' }).optional(),
      projectTitle: z.string().min(1, { message: 'Tên đề tài là không bắt buộc' }).optional(),
      supervisor: z.string().min(1, { message: 'Giảng viên hướng dẫn là không bắt buộc' }).optional(),
      phone: z.string().min(1, { message: 'Số điện thoại là không bắt buộc' }).optional(),
      email: z.string().email({ message: 'Email không hợp lệ' }).optional(),
      classCode: z.string().min(1, { message: 'Mã lớp là không bắt buộc' }).optional(),
      semester: z.string().min(1, { message: 'Học kỳ là không bắt buộc' }).optional(),
      school: z.string().min(1, { message: 'Trường là không bắt buộc' }).optional(),
      thesisStartDate: z.string().min(1, { message: 'Ngày bắt đầu là không bắt buộc' }).optional(),
      thesisEndDate: z.string().min(1, { message: 'Ngày kết thúc là không bắt buộc' }).optional(),
      studentKnowledgeGained: z
        .string()
        .min(1, { message: 'Kiến thức học sinh viên đạt được là không bắt buộc' })
        .optional(),
      technologyGained: z.string().min(1, { message: 'Công nghệ học sinh viên đạt được là không bắt buộc' }).optional(),
      acquiredSkills: z.string().min(1, { message: 'Kỹ năng học sinh viên đạt được là không bắt buộc' }).optional(),
      expectedProducts: z.string().min(1, { message: 'Sản phẩm dự kiến là không bắt buộc' }).optional(),
      realWorldProblemSolved: z.string().min(1, { message: 'Vấn đề thực tế giải quyết là không bắt buộc' }).optional(),
      student_sign_date: z.string().min(1, { message: 'Ngày ký của sinh viên là không bắt buộc' }).optional(),
      supervisor_sign_date: z.string().min(1, { message: 'Ngày ký của giảng viên là không bắt buộc' }).optional(),
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
      { header: 'MSSV', accessorKey: 'mssv' },
      { header: 'Họ tên', accessorKey: 'fullName' },
      { header: 'Lớp', accessorKey: 'studentClassName', hidden: true },
      { header: 'Tên đề tài', accessorKey: 'projectTitle', hidden: true },
      { header: 'Giảng viên hướng dẫn', accessorKey: 'supervisor' },
      { header: 'Số điện thoại', accessorKey: 'phone', hidden: true },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Mã lớp', accessorKey: 'classCode', hidden: true },
      { header: 'Học kỳ', accessorKey: 'semester', hidden: true },
      { header: 'Trường', accessorKey: 'school', hidden: true },
      { header: 'Ngày bắt đầu', accessorKey: 'thesisStartDate', type: 'date', hidden: true },
      { header: 'Ngày kết thúc', accessorKey: 'thesisEndDate', type: 'date', hidden: true },
      {
        header: 'Kiến thức học sinh viên đạt được',
        accessorKey: 'studentKnowledgeGained',
        type: 'textarea',
        hidden: true,
      },
      { header: 'Công nghệ học sinh viên đạt được', accessorKey: 'technologyGained', type: 'textarea', hidden: true },
      { header: 'Kỹ năng học sinh viên đạt được', accessorKey: 'acquiredSkills', type: 'textarea', hidden: true },
      { header: 'Sản phẩm dự kiến', accessorKey: 'expectedProducts', type: 'textarea', hidden: true },
      { header: 'Vấn đề thực tế giải quyết', accessorKey: 'realWorldProblemSolved', type: 'textarea', hidden: true },
      { header: 'Ngày ký của sinh viên', accessorKey: 'student_sign_date', type: 'date', hidden: true },
      { header: 'Ngày ký của giảng viên', accessorKey: 'supervisor_sign_date', type: 'date', hidden: true },
      { header: 'Thời gian tạo', accessorKey: 'createdAt' },
    ],
    downloadEnabled: true,
  },
  [EThesisDocumentType.GUIDANCE_REVIEW]: {
    fileListName: 'guidance-review.zip',
    title: 'Phiếu nhận xét hướng dẫn',
    formSchema: z.object({
      mssv: z.string().min(1, { message: 'MSSV là bắt buộc' }),
      fullName: z.string().min(1, { message: 'Họ tên là bắt buộc' }),
      supervisor: z.string().min(1, { message: 'Giảng viên hướng dẫn là không bắt buộc' }).optional(),
      projectTitle: z.string().min(1, { message: 'Tên đề tài là không bắt buộc' }).optional(),
      typeOfThesis: z.string().min(1, { message: 'Loại đề tài là không bắt buộc' }).optional(),
      topicUniquenessPoint: z.number().min(1, { message: 'Điểm đề tài là không bắt buộc' }).optional(),
      workloadPoint: z.number().min(1, { message: 'Điểm công việc là không bắt buộc' }).optional(),
      problemDifficultyPoint: z.number().min(1, { message: 'Điểm khó khăn là không bắt buộc' }).optional(),
      solutionImpactPoint: z.number().min(1, { message: 'Điểm ảnh hưởng là không bắt buộc' }).optional(),
      productFinalizationPoint: z.number().min(1, { message: 'Điểm hoàn thành sản phẩm là không bắt buộc' }).optional(),
      layoutCoherencePoint: z.number().min(1, { message: 'Điểm trật tự là không bắt buộc' }).optional(),
      contentValidityPoint: z.number().min(1, { message: 'Điểm nội dung là không bắt buộc' }).optional(),
      presentationQualityPoint: z.number().min(1, { message: 'Điểm trình bày là không bắt buộc' }).optional(),
      reliabilityAndReferencesPoint: z
        .number()
        .min(1, { message: 'Điểm đáng tin cậy và tài liệu tham khảo là không bắt buộc' })
        .optional(),
      responseAccuracyPoint: z.number().min(1, { message: 'Điểm độ chính xác là không bắt buộc' }).optional(),
      presentationSkillsPoint: z.number().min(1, { message: 'Điểm kỹ năng trình bày là không bắt buộc' }).optional(),
      rewardPoint: z.number().min(1, { message: 'Điểm thưởng là không bắt buộc' }).optional(),
      generalFeedback: z.string().min(1, { message: 'Phản hồi chung là không bắt buộc' }).optional(),
      conclusion: z.string().min(1, { message: 'Kết luận là không bắt buộc' }).optional(),
      teacherSignDate: z.string().min(1, { message: 'Ngày ký của giảng viên là không bắt buộc' }).optional(),
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
      { header: 'MSSV', accessorKey: 'mssv' },
      { header: 'Họ tên', accessorKey: 'fullName' },
      { header: 'Giảng viên hướng dẫn', accessorKey: 'supervisor' },
      { header: 'Tên đề tài', accessorKey: 'projectTitle' },
      { header: 'Loại đề tài', accessorKey: 'typeOfThesis', hidden: true },
      { header: 'Điểm đề tài', accessorKey: 'topicUniquenessPoint', hidden: true, type: 'number' },
      { header: 'Điểm công việc', accessorKey: 'workloadPoint', hidden: true, type: 'number' },
      { header: 'Điểm khó khăn', accessorKey: 'problemDifficultyPoint', hidden: true, type: 'number' },
      { header: 'Điểm ảnh hưởng', accessorKey: 'solutionImpactPoint', hidden: true, type: 'number' },
      { header: 'Điểm hoàn thành sản phẩm', accessorKey: 'productFinalizationPoint', hidden: true, type: 'number' },
      { header: 'Điểm trật tự', accessorKey: 'layoutCoherencePoint', hidden: true, type: 'number' },
      { header: 'Điểm nội dung', accessorKey: 'contentValidityPoint', hidden: true, type: 'number' },
      { header: 'Điểm trình bày', accessorKey: 'presentationQualityPoint', hidden: true, type: 'number' },
      {
        header: 'Điểm đáng tin cậy và tài liệu tham khảo',
        accessorKey: 'reliabilityAndReferencesPoint',
        hidden: true,
        type: 'number',
      },
      { header: 'Điểm độ chính xác', accessorKey: 'responseAccuracyPoint', hidden: true, type: 'number' },
      { header: 'Điểm kỹ năng trình bày', accessorKey: 'presentationSkillsPoint', hidden: true, type: 'number' },
      { header: 'Điểm thưởng', accessorKey: 'rewardPoint', hidden: true, type: 'number' },
      { header: 'Phản hồi chung', accessorKey: 'generalFeedback', hidden: true, type: 'textarea' },
      { header: 'Kết luận', accessorKey: 'conclusion', hidden: true, type: 'textarea' },
      { header: 'Ngày ký của giảng viên', accessorKey: 'teacherSignDate', type: 'date', hidden: true },
      { header: 'Thời gian tạo', accessorKey: 'createdAt' },
    ],
    downloadEnabled: true,
  },
  [EThesisDocumentType.SUPERVISORY_COMMENTS]: {
    fileListName: 'supervisory-comments.zip',
    title: 'Phiếu nhận xét phản biện',
    formSchema: z.object({
      supervisor: z.string().min(1, { message: 'Giảng viên hướng dẫn là không bắt buộc' }).optional(),
      mssv: z.string().min(1, { message: 'MSSV là bắt buộc' }),
      fullName: z.string().min(1, { message: 'Họ tên là bắt buộc' }),
      projectTitle: z.string().min(1, { message: 'Tên đề tài là không bắt buộc' }).optional(),
    }),
    defaultValues: {
      fullName: '',
      mssv: '',
      projectTitle: '',
      supervisor: '',
    },
    columns: [
      { header: 'MSSV', accessorKey: 'mssv' },
      { header: 'Họ tên', accessorKey: 'fullName' },
      { header: 'Tên đề tài', accessorKey: 'projectTitle' },
      { header: 'Giảng viên hướng dẫn', accessorKey: 'supervisor' },
      { header: 'Thời gian tạo', accessorKey: 'createdAt' },
    ],
    downloadEnabled: true,
  },
};
