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
      email: z.string().email({ message: 'Email không hợp lệ' }),
      phone: z.string().optional(),
      majorId: z.string().min(1, { message: 'Ngành học là bắt buộc' }),
    }),
    defaultValues: {
      mssv: '',
      fullName: '',
      email: '',
      phone: '',
      majorId: '',
    },
    columns: [
      { header: 'MSSV', accessorKey: 'mssv' },
      { header: 'Họ tên', accessorKey: 'fullName' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Điện thoại', accessorKey: 'phone' },
      { header: 'Ngành học', accessorKey: 'majorId', hidden: true },
    ],
    downloadEnabled: true,
  },
  [EThesisDocumentType.SUPERVISORY_COMMENTS]: {
    fileListName: 'supervisory-comments.zip',
    title: 'Phiếu nhận xét phản biện',
    formSchema: z.object({
      code: z.string().min(1, { message: 'Mã giảng viên là bắt buộc' }),
      fullName: z.string().min(1, { message: 'Họ tên là bắt buộc' }),
      email: z.string().email({ message: 'Email không hợp lệ' }),
      phone: z.string().optional(),
      department: z.string().min(1, { message: 'Khoa là bắt buộc' }),
    }),
    defaultValues: {
      code: '',
      fullName: '',
      email: '',
      phone: '',
      department: '',
    },
    columns: [
      { header: 'Mã GV', accessorKey: 'code' },
      { header: 'Họ tên', accessorKey: 'fullName' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Điện thoại', accessorKey: 'phone' },
      { header: 'Khoa', accessorKey: 'department' },
    ],
    downloadEnabled: true,
  },
};
