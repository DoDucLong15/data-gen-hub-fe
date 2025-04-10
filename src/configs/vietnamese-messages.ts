export const VIETNAMESE_MESSAGES = {
  HEADER: {
    LOGIN: 'Đăng nhập',
    MY_ACCOUNT: 'Tài khoản của tôi',
    MANAGE_USER: 'Quản lý người dùng',
    MANAGE_ROLE: 'Quản lý vai trò',
    SETTINGS: 'Cài đặt',
    LOGOUT: 'Đăng xuất',
    TOGGLE_THEME: 'Chuyển đổi giao diện',
  },
  NAVBAR: {
    HOME: 'Trang chủ',
    CLASSES: 'Lớp học',
    ABOUT_US: 'Về chúng tôi',
    CONTACT_US: 'Liên hệ',
  },
  HERO: {
    BADGE: 'Hệ thống quản lý đồ án tốt nghiệp thông minh',
    TITLE: 'Quản lý đồ án tốt nghiệp hiệu quả',
    DESCRIPTION:
      'Nền tảng toàn diện giúp tổng hợp, sinh dữ liệu và quản lý đồ án tốt nghiệp, loại bỏ quy trình thủ công phức tạp và tối ưu hóa hiệu quả làm việc.',
    CTA: {
      START: 'Bắt đầu ngay',
      DEMO: 'Xem demo',
    },
    FEATURES: {
      DATA_COLLECTION: {
        TITLE: 'Tổng hợp dữ liệu',
        DESCRIPTION:
          'Tự động tổng hợp và phân tích dữ liệu từ nhiều nguồn khác nhau, giúp quản lý thông tin đồ án hiệu quả.',
      },
      SMART_DATA: {
        TITLE: 'Sinh dữ liệu thông minh',
        DESCRIPTION: 'Công cụ sinh dữ liệu tự động cho báo cáo, thống kê và phân tích tiến độ đồ án.',
      },
      COLLABORATION: {
        TITLE: 'Hợp tác đa người dùng',
        DESCRIPTION:
          'Kết nối sinh viên, giảng viên và quản lý trên một nền tảng thống nhất, dễ dàng trao đổi và phối hợp.',
      },
    },
    TRUSTED_BY: 'ĐƯỢC TIN DÙNG BỞI',
  },
  FOOTER: {
    CONTACT: {
      TITLE: 'Liên hệ',
      ADDRESS: 'Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
      PHONE: '(+84) 123 456 789',
      EMAIL: 'contact@thesismanager.vn',
    },
    COPYRIGHT: {
      RIGHTS: '© {year} ThesisManager. Bản quyền thuộc về công ty Do Duc Long.',
      CREATED_BY: 'Thiết kế & Phát triển bởi',
    },
  },
  CLASSES: {
    TITLE: 'Lớp học',
    SUBTITLE: 'Quản lý lớp học của bạn',
    ADD: 'Thêm lớp học',
    EDIT: 'Chỉnh sửa lớp học',
    DELETE: 'Xóa lớp học',
    SEARCH: 'Tìm kiếm lớp học...',
    NAME: 'Tên lớp học',
    DESCRIPTION: 'Mô tả',
    TEACHER: 'Giảng viên',
    STUDENTS: 'Sinh viên',
    EMPTY: 'Không tìm thấy lớp học nào',
    CONFIRM_DELETE: 'Bạn có chắc chắn muốn xóa lớp học này không?',
    SUCCESS_CREATE: 'Tạo lớp học thành công',
    SUCCESS_UPDATE: 'Cập nhật lớp học thành công',
    SUCCESS_DELETE: 'Xóa lớp học thành công',
    ERROR_CREATE: 'Không thể tạo lớp học',
    ERROR_UPDATE: 'Không thể cập nhật lớp học',
    ERROR_DELETE: 'Không thể xóa lớp học',
    CARD: {
      COURSE: 'Khóa học',
      INPUT_FILES: 'Tệp đầu vào',
      SEMESTER: 'Học kỳ',
      VIEW: 'Xem',
      EDIT: 'Chỉnh sửa',
      DELETE: 'Xóa',
      DELETE_CONFIRM_TITLE: 'Bạn có chắc chắn?',
      DELETE_CONFIRM_DESC:
        'Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn lớp học {name} và tất cả dữ liệu liên quan.',
      DELETE_CONFIRM_CANCEL: 'Hủy',
      DELETE_CONFIRM_ACTION: 'Xóa',
    },
    DIALOG: {
      CREATE_TITLE: 'Thêm lớp học mới',
      EDIT_TITLE: 'Chỉnh sửa lớp học',
    },
    FORM: {
      NAME: {
        LABEL: 'Tên lớp học',
        PLACEHOLDER: 'Nhập tên lớp học',
      },
      CLASS_CODE: {
        LABEL: 'Mã lớp',
        PLACEHOLDER: 'VD: CS101-A',
      },
      COURSE_CODE: {
        LABEL: 'Mã học phần',
        PLACEHOLDER: 'VD: CS101',
      },
      SEMESTER: {
        LABEL: 'Học kỳ',
        PLACEHOLDER: 'VD: HK1 2025',
      },
      DRIVE_ID: {
        LABEL: 'ID Drive',
        PLACEHOLDER: 'VD: 1A2B3C4D5E6F7G8H9I0J',
        DESCRIPTION: 'Nhập ID thư mục Google Drive để lưu trữ tài liệu lớp học. Trường này là tùy chọn.',
        IMPORTANT: 'Quan trọng',
        ACCESS_NOTE:
          'Trước khi sử dụng tính năng này, vui lòng chia sẻ quyền chỉnh sửa thư mục của bạn với tài khoản dịch vụ của chúng tôi:',
        SERVICE_ACCOUNT: 'data-gen-hub@oauth2-402816.iam.gserviceaccount.com',
      },
      BUTTONS: {
        CANCEL: 'Hủy',
        CREATE: 'Tạo lớp học',
        SAVE: 'Lưu thay đổi',
      },
    },
    LIST: {
      LOADING: 'Đang tải lớp học...',
      EMPTY: {
        NO_RESULTS: {
          TITLE: 'Không tìm thấy lớp học',
          DESCRIPTION: 'Không tìm thấy lớp học nào khớp với "{query}".',
          ACTION: 'Xóa tìm kiếm',
        },
        NO_CLASSES: {
          TITLE: 'Chưa có lớp học nào',
          DESCRIPTION: 'Tạo lớp học đầu tiên của bạn để bắt đầu.',
          ACTION: 'Thêm lớp học',
        },
      },
    },
    PAGE: {
      TITLE: 'Quản lý lớp học',
      DESCRIPTION: 'Quản lý tất cả lớp học của bạn tại một nơi.',
      ADD_BUTTON: 'Thêm lớp học',
      SEARCH_PLACEHOLDER: 'Tìm kiếm lớp học theo tên hoặc mã...',
    },
  },
  GENERATE_THESIS: {
    TEMPLATE_UPLOADED: 'Đã tải lên mẫu thành công',
    TEMPLATE_UPLOAD_FAILED: 'Tải lên thất bại: {message}',
    TEMPLATE_DOWNLOADED: 'Đã tải xuống mẫu {type} mặc định',
    TEMPLATE_DOWNLOAD_FAILED: 'Tải xuống thất bại',
    REQUEST_SENT: 'Đã gửi yêu cầu tạo phiếu',
    GENERATION_FAILED: 'Tạo phiếu thất bại: {message}',
    SHEET_DELETED: 'Đã xóa phiếu',
    SHEET_DELETE_FAILED: 'Xóa phiếu thất bại: {message}',
    ALL_SHEETS_DELETED: 'Đã xóa tất cả phiếu',
    ALL_SHEETS_DELETE_FAILED: 'Xóa phiếu thất bại: {message}',
    DOWNLOAD_FAILED: 'Tải xuống thất bại',
  },
  IMPORT_THESIS: {
    IMPORT_FAILED: 'Nhập dữ liệu thất bại: {message}',
    THESIS_CREATED: 'Đã tạo luận văn thành công',
    THESIS_CREATE_FAILED: 'Tạo luận văn thất bại: {message}',
    THESIS_UPDATED: 'Đã cập nhật luận văn thành công',
    THESIS_UPDATE_FAILED: 'Cập nhật luận văn thất bại: {message}',
    THESIS_DELETED: 'Đã xóa luận văn thành công',
    THESIS_DELETE_FAILED: 'Xóa luận văn thất bại: {message}',
  },
  REGISTERS: {
    APPROVE_SUCCESS: 'Đã phê duyệt đăng ký thành công',
    APPROVE_ERROR: 'Đã xảy ra lỗi khi phê duyệt đăng ký',
    REJECT_SUCCESS: 'Đã từ chối đăng ký thành công',
    REJECT_ERROR: 'Đã xảy ra lỗi khi từ chối đăng ký',
  },
  SYSTEM_CONFIG: {
    CREATE_SUCCESS: 'Đã tạo cấu hình hệ thống thành công',
    UPDATE_SUCCESS: 'Đã cập nhật cấu hình hệ thống thành công',
    DELETE_SUCCESS: 'Đã xóa cấu hình hệ thống thành công',
  },
  ABOUT_US: {
    HERO: {
      TITLE: 'Về Chúng Tôi',
      DESCRIPTION: 'Chúng tôi đam mê giúp sinh viên và giảng viên quản lý đồ án tốt nghiệp một cách hiệu quả',
      CONTACT_NOW: 'Liên hệ ngay',
    },
    MISSION: {
      TITLE: 'Sứ Mệnh Của Chúng Tôi',
      DESCRIPTION:
        'Chúng tôi ra đời với sứ mệnh đơn giản hóa quy trình quản lý đồ án tốt nghiệp, giúp sinh viên tập trung vào nghiên cứu thay vì lo lắng về quy trình thủ công phức tạp, đồng thời hỗ trợ giảng viên theo dõi và đánh giá hiệu quả.',
      FEATURES: {
        TIME_SAVING: {
          TITLE: 'Tiết Kiệm Thời Gian',
          DESCRIPTION: 'Tự động hóa các quy trình thủ công, giảm thời gian xử lý và quản lý tài liệu.',
        },
        HIGH_EFFICIENCY: {
          TITLE: 'Hiệu Quả Cao',
          DESCRIPTION: 'Tổng hợp và phân tích dữ liệu một cách toàn diện, giúp ra quyết định tốt hơn.',
        },
        COMPREHENSIVE: {
          TITLE: 'Tích Hợp Toàn Diện',
          DESCRIPTION: 'Một nền tảng duy nhất cho mọi nhu cầu quản lý đồ án từ lưu trữ đến đánh giá.',
        },
      },
    },
    TEAM: {
      TITLE: 'Đội Ngũ Chúng Tôi',
      DESCRIPTION:
        'Chúng tôi là những chuyên gia trong lĩnh vực công nghệ và giáo dục, luôn đặt trải nghiệm người dùng và hiệu quả làm trọng tâm phát triển.',
      MEMBERS: {
        CEO: {
          NAME: 'Nguyễn Văn A',
          ROLE: 'Giám đốc điều hành',
        },
        CTO: {
          NAME: 'Trần Thị B',
          ROLE: 'Giám đốc công nghệ',
        },
        HEAD_DEV: {
          NAME: 'Lê Văn C',
          ROLE: 'Trưởng phòng phát triển',
        },
      },
    },
    CTA: {
      TITLE: 'Sẵn sàng tối ưu hóa quy trình đồ án?',
      DESCRIPTION: 'Hãy để chúng tôi giúp bạn quản lý đồ án tốt nghiệp hiệu quả hơn, tiết kiệm thời gian và công sức.',
      CONTACT_NOW: 'Liên hệ ngay',
      LEARN_MORE: 'Tìm hiểu thêm',
    },
  },
  CONTACT_US: {
    HERO: {
      TITLE: 'Liên Hệ Với Chúng Tôi',
      DESCRIPTION:
        'Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn về mọi vấn đề liên quan đến nền tảng quản lý đồ án tốt nghiệp của chúng tôi.',
    },
    CONTACT_INFO: {
      TITLE: 'Thông Tin Liên Hệ',
      EMAIL: {
        LABEL: 'Email',
        VALUE: 'info@gradproject.vn',
      },
      PHONE: {
        LABEL: 'Điện Thoại',
        VALUE: '+84 912 345 678',
      },
      ADDRESS: {
        LABEL: 'Địa Chỉ',
        VALUE: 'Tòa nhà Innovation, 123 Nguyễn Văn Linh\nQuận 7, TP. Hồ Chí Minh',
      },
      WORKING_HOURS: {
        TITLE: 'Giờ Làm Việc',
        SCHEDULE: 'Thứ 2 - Thứ 6: 8:00 - 17:30\nThứ 7: 8:00 - 12:00\nChủ nhật: Nghỉ',
      },
    },
    FORM: {
      TITLE: 'Gửi Tin Nhắn',
      NAME: {
        LABEL: 'Họ và tên',
        PLACEHOLDER: 'Nhập họ và tên của bạn',
      },
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'example@domain.com',
      },
      SUBJECT: {
        LABEL: 'Tiêu đề',
        PLACEHOLDER: 'Tiêu đề tin nhắn của bạn',
      },
      MESSAGE: {
        LABEL: 'Nội dung',
        PLACEHOLDER: 'Nhập nội dung tin nhắn của bạn',
      },
      SUBMIT: 'Gửi Tin Nhắn',
      SUCCESS: {
        TITLE: 'Gửi thành công!',
        MESSAGE: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
        NEW_MESSAGE: 'Gửi tin nhắn khác',
      },
    },
    FAQ: {
      TITLE: 'Câu Hỏi Thường Gặp',
      DESCRIPTION:
        'Dưới đây là những câu hỏi mà chúng tôi thường xuyên nhận được. Nếu bạn không tìm thấy câu trả lời, hãy liên hệ với chúng tôi.',
      ITEMS: [
        {
          QUESTION: 'Hệ thống có hỗ trợ tích hợp với phần mềm quản lý đào tạo hiện có của trường không?',
          ANSWER:
            'Có, nền tảng của chúng tôi được thiết kế để tích hợp linh hoạt với các hệ thống quản lý đào tạo hiện có thông qua API và các giải pháp đồng bộ dữ liệu.',
        },
        {
          QUESTION: 'Làm thế nào để giảng viên theo dõi tiến độ của sinh viên?',
          ANSWER:
            'Giảng viên có thể theo dõi tiến độ của sinh viên thông qua bảng điều khiển trực quan, nhận thông báo về các mốc quan trọng và tạo báo cáo tùy chỉnh về tiến độ của từng sinh viên hoặc nhóm sinh viên.',
        },
        {
          QUESTION: 'Hệ thống có hỗ trợ quản lý phiên bản cho tài liệu đồ án không?',
          ANSWER:
            'Có, hệ thống của chúng tôi cung cấp tính năng quản lý phiên bản toàn diện, cho phép sinh viên và giảng viên theo dõi lịch sử thay đổi, so sánh các phiên bản và khôi phục phiên bản trước đó khi cần thiết.',
        },
        {
          QUESTION: 'Nền tảng có cung cấp tính năng kiểm tra đạo văn không?',
          ANSWER:
            'Có, chúng tôi tích hợp công cụ kiểm tra đạo văn để đảm bảo tính nguyên bản của đồ án và hỗ trợ sinh viên tuân thủ các tiêu chuẩn học thuật.',
        },
      ],
    },
    CTA: {
      TITLE: 'Bắt đầu quản lý đồ án hiệu quả ngay hôm nay',
      DESCRIPTION: 'Đăng ký dùng thử miễn phí 30 ngày và khám phá sự khác biệt mà nền tảng của chúng tôi mang lại.',
      SIGNUP: 'Đăng ký dùng thử',
    },
  },
  LOGIN: {
    TITLE: 'Đăng nhập',
    DESCRIPTION: 'Nhập thông tin đăng nhập của bạn để tiếp tục',
    FORM: {
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'you@example.com',
      },
      PASSWORD: {
        LABEL: 'Mật khẩu',
        PLACEHOLDER: '••••••••',
      },
      REMEMBER_ME: 'Ghi nhớ đăng nhập',
      SUBMIT: 'Đăng nhập',
      PROCESSING: 'Đang xử lý...',
    },
    ERROR: {
      DEFAULT: 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.',
    },
    REGISTER_PROMPT: {
      TEXT: 'Chưa có tài khoản?',
      LINK: 'Đăng ký ngay',
    },
  },
  REGISTER: {
    TITLE: 'Đăng ký tài khoản',
    DESCRIPTION: 'Điền thông tin của bạn để gửi yêu cầu tới quản trị viên',
    BACK_TO_LOGIN: 'Quay lại đăng nhập',
    FORM: {
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'you@example.com',
        REQUIRED: 'Email hợp lệ là bắt buộc',
      },
      NAME: {
        LABEL: 'Họ và tên',
        PLACEHOLDER: 'Nguyễn Văn A',
      },
      PHONE: {
        LABEL: 'Số điện thoại',
        PLACEHOLDER: '0912345678',
      },
      SCHOOL: {
        LABEL: 'Trường học',
        PLACEHOLDER: 'Đại học ABC',
      },
      DEPARTMENT: {
        LABEL: 'Khoa/Phòng ban',
        PLACEHOLDER: 'Khoa Công nghệ thông tin',
      },
      POSITION: {
        LABEL: 'Chức vụ',
        PLACEHOLDER: 'Giảng viên/Sinh viên/...',
      },
      SUBMIT: 'Gửi yêu cầu đăng ký',
      PROCESSING: 'Đang xử lý...',
    },
    ERROR: {
      DEFAULT: 'Đã xảy ra lỗi khi gửi yêu cầu đăng ký',
    },
    SUCCESS: {
      MESSAGE:
        'Yêu cầu đăng ký đã được gửi thành công! Quản trị viên sẽ xem xét và phê duyệt tài khoản của bạn. Bạn sẽ được chuyển hướng đến trang đăng nhập trong vài giây...',
    },
    TERMS: 'Bằng việc đăng ký, bạn đồng ý với các điều khoản sử dụng và chính sách bảo mật của chúng tôi.',
  },
  METADATA: {
    TITLE: 'Data Gen Hub',
    DESCRIPTION: 'Nền tảng toàn diện để quản lý đồ án tốt nghiệp, tự động hóa sinh dữ liệu và hợp tác.',
  },
  PERMISSION_FORM: {
    TITLE: {
      ADD: 'Thêm quyền mới',
      EDIT: 'Chỉnh sửa quyền',
    },
    DESCRIPTION: {
      ADD: 'Nhập thông tin để tạo quyền mới.',
      EDIT: 'Cập nhật thông tin quyền.',
    },
    FORM: {
      ACTION: {
        LABEL: 'Hành động',
        PLACEHOLDER: 'Chọn hoặc nhập hành động',
        VALIDATION: 'Hành động phải có ít nhất 2 ký tự',
      },
      SUBJECT: {
        LABEL: 'Đối tượng',
        PLACEHOLDER: 'Chọn hoặc nhập đối tượng',
        VALIDATION: 'Đối tượng phải có ít nhất 2 ký tự',
      },
      DESCRIPTION: {
        LABEL: 'Mô tả',
        PLACEHOLDER: 'Nhập mô tả cho quyền này',
      },
    },
    BUTTON: {
      CANCEL: 'Hủy',
      ADD: 'Thêm quyền',
      SAVE: 'Lưu thay đổi',
    },
    TOAST: {
      SUCCESS: {
        ADD: 'Thêm quyền thành công',
        UPDATE: 'Cập nhật quyền thành công',
      },
      ERROR: {
        ADD: 'Không thể thêm quyền. Vui lòng thử lại.',
        UPDATE: 'Không thể cập nhật quyền. Vui lòng thử lại.',
      },
    },
  },
  PERMISSION_LIST: {
    TITLE: 'Danh sách quyền',
    ADD_BUTTON: 'Thêm quyền mới',
    REFRESH_BUTTON: 'Làm mới',
    SEARCH: {
      PLACEHOLDER: 'Tìm kiếm quyền...',
    },
    FILTER: {
      PLACEHOLDER: 'Lọc theo đối tượng',
      ALL_SUBJECTS: 'Tất cả đối tượng',
    },
    TABLE: {
      NO: 'STT',
      ACTION: 'Hành động',
      SUBJECT: 'Đối tượng',
      DESCRIPTION: 'Mô tả',
      OPERATIONS: 'Thao tác',
      NO_DESCRIPTION: 'Không có mô tả',
      EMPTY: {
        MESSAGE: 'Không tìm thấy quyền nào phù hợp.',
        CLEAR_FILTER: 'Xóa bộ lọc',
      },
    },
    DROPDOWN: {
      LABEL: 'Thao tác',
      EDIT: 'Chỉnh sửa',
      DELETE: 'Xóa',
    },
    DELETE_DIALOG: {
      TITLE: 'Xác nhận xóa quyền',
      DESCRIPTION:
        'Bạn có chắc chắn muốn xóa quyền này? Hành động này không thể hoàn tác và có thể ảnh hưởng đến vai trò đang sử dụng quyền này.',
      CANCEL: 'Hủy',
      CONFIRM: 'Xóa',
    },
    TOAST: {
      REFRESH_SUCCESS: 'Đã cập nhật danh sách quyền',
      REFRESH_ERROR: 'Không thể làm mới dữ liệu',
      DELETE_SUCCESS: 'Quyền đã được xóa thành công.',
      DELETE_ERROR: 'Có lỗi xảy ra khi xóa quyền.',
    },
  },
  ROLE_FORM: {
    TITLE: {
      ADD: 'Thêm vai trò mới',
      EDIT: 'Chỉnh sửa vai trò',
    },
    DESCRIPTION: {
      ADD: 'Nhập thông tin để tạo vai trò mới.',
      EDIT: 'Cập nhật thông tin vai trò.',
    },
    FORM: {
      NAME: {
        LABEL: 'Tên',
        PLACEHOLDER: 'Nhập tên vai trò',
        VALIDATION: 'Tên phải có ít nhất 2 ký tự',
      },
      DESCRIPTION: {
        LABEL: 'Mô tả',
        PLACEHOLDER: 'Nhập mô tả vai trò',
        VALIDATION: 'Mô tả phải có ít nhất 2 ký tự',
      },
      PERMISSIONS: {
        LABEL: 'Quyền',
        SELECT_ALL: 'Chọn tất cả',
        DESELECT_ALL: 'Bỏ chọn tất cả',
      },
    },
    BUTTON: {
      CANCEL: 'Hủy',
      ADD: 'Thêm vai trò',
      SAVE: 'Lưu thay đổi',
    },
    LOADING: 'Đang tải dữ liệu...',
    TOAST: {
      SUCCESS: {
        ADD: 'Thêm vai trò thành công',
        UPDATE: 'Cập nhật vai trò thành công',
      },
      ERROR: {
        ADD: 'Không thể thêm vai trò. Vui lòng thử lại.',
        UPDATE: 'Không thể cập nhật vai trò. Vui lòng thử lại.',
      },
    },
  },
  ROLE_LIST: {
    TABLE: {
      HEADER: {
        ROLE: 'Vai trò',
        DESCRIPTION: 'Mô tả',
        USER_COUNT: 'Số người dùng',
        PERMISSION_COUNT: 'Số quyền',
        LAST_UPDATED: 'Cập nhật lần cuối',
        STATUS: 'Trạng thái',
        ACTIONS: 'Thao tác',
      },
      NO_DESCRIPTION: 'Không có mô tả',
      EMPTY: {
        MESSAGE: 'Chưa có vai trò nào trong hệ thống.',
        ADD_BUTTON: 'Thêm vai trò mới',
      },
      STATUS: {
        ACTIVE: 'Đang hoạt động',
        INACTIVE: 'Không hoạt động',
      },
    },
    DROPDOWN: {
      LABEL: 'Thao tác',
      EDIT: 'Chỉnh sửa',
      DELETE: 'Xóa',
    },
    DELETE_DIALOG: {
      TITLE: 'Xác nhận xóa vai trò',
      DESCRIPTION: 'Bạn có chắc chắn muốn xóa vai trò này? Hành động này không thể hoàn tác.',
      CANCEL: 'Hủy',
      CONFIRM: 'Xóa',
    },
    TOAST: {
      DELETE_SUCCESS: 'Vai trò đã được xóa thành công.',
      DELETE_ERROR: 'Có lỗi xảy ra khi xóa vai trò.',
    },
  },
  ROLES_PAGE: {
    TABS: {
      ROLES: 'Danh sách vai trò',
      PERMISSIONS: 'Quản lý quyền hạn',
    },
    ACTIONS: {
      ADD_ROLE: 'Thêm vai trò',
    },
    TOAST: {
      REFRESH_SUCCESS: 'Đã cập nhật danh sách vai trò',
      REFRESH_ERROR: 'Không thể làm mới dữ liệu',
      LOAD_ERROR: 'Có lỗi xảy ra khi tải dữ liệu vai trò.',
    },
    LOADING: 'Đang tải...',
  },
  SYSTEM_CONFIG_PAGE: {
    TITLE: 'Cấu hình hệ thống',
    ACTIONS: {
      ADD: 'Thêm mới',
      REFRESH: 'Làm mới',
    },
    LIST: {
      HEADERS: {
        KEY: 'Khóa',
        TYPE: 'Kiểu dữ liệu',
        VALUE: 'Giá trị',
        ACTIONS: 'Thao tác',
      },
      EMPTY: {
        LOADING: 'Đang tải...',
        NO_DATA: 'Không tìm thấy cấu hình nào',
      },
      DROPDOWN: {
        EDIT: 'Chỉnh sửa',
        DELETE: 'Xóa',
      },
      VALUE_TYPES: {
        STRING: 'Văn bản',
        NUMBER: 'Số',
        BOOLEAN: 'Logic',
        JSON: 'JSON',
        EMPTY: 'trống',
        NOT_SET: 'Chưa đặt',
        TRUE: 'Đúng',
        FALSE: 'Sai',
      },
    },
    FORM: {
      TITLE: {
        ADD: 'Thêm cấu hình mới',
        EDIT: 'Chỉnh sửa cấu hình',
      },
      DESCRIPTION: {
        ADD: 'Thêm một cấu hình hệ thống mới.',
        EDIT: 'Đang chỉnh sửa cấu hình có khóa: {key}',
      },
      FIELDS: {
        KEY: {
          LABEL: 'Khóa',
          PLACEHOLDER: 'Nhập khóa cấu hình',
        },
        TYPE: {
          LABEL: 'Kiểu dữ liệu',
          PLACEHOLDER: 'Chọn kiểu dữ liệu',
        },
        VALUE: {
          LABEL: 'Giá trị',
        },
      },
      BUTTONS: {
        SAVE: 'Lưu',
        SAVING: 'Đang lưu...',
      },
    },
    DELETE_DIALOG: {
      TITLE: 'Bạn có chắc chắn?',
      DESCRIPTION: 'Hành động này sẽ xóa vĩnh viễn cấu hình có khóa: {key}. Không thể hoàn tác sau khi xóa.',
      CANCEL: 'Hủy',
      CONFIRM: 'Xóa',
      DELETING: 'Đang xóa...',
    },
  },
  USER_DETAIL: {
    TITLE: 'Thông tin người dùng',
    DESCRIPTION: 'Chi tiết về người dùng này.',
    ROLES: {
      ADMIN: 'Quản trị viên',
      TEACHER: 'Giảng viên',
    },
    NO_DATA: 'Không có dữ liệu',
    INFO_ITEMS: {
      EMAIL: 'Email',
      PHONE: 'Số điện thoại',
      SCHOOL: 'Trường học',
      DEPARTMENT: 'Khoa',
      POSITION: 'Chức vụ',
      CREATED_AT: 'Ngày tạo',
      UPDATED_AT: 'Cập nhật',
    },
    ACCOUNT_STATUS: {
      TITLE: 'Trạng thái tài khoản',
      ACTIVE: 'Đang hoạt động',
    },
    ERROR: {
      TITLE: 'Không thể tải thông tin người dùng',
      MESSAGE: 'Vui lòng thử lại sau',
    },
    CLOSE_BUTTON: 'Đóng',
  },
  USER_FORM: {
    TITLE: {
      ADD: 'Thêm người dùng mới',
      EDIT: 'Chỉnh sửa người dùng',
    },
    DESCRIPTION: {
      ADD: 'Nhập thông tin để tạo người dùng mới.',
      EDIT: 'Cập nhật thông tin người dùng.',
    },
    LOADING: 'Đang tải dữ liệu người dùng...',
    FORM: {
      NAME: {
        LABEL: 'Tên',
        PLACEHOLDER: 'Nhập tên người dùng',
        VALIDATION: 'Tên phải có ít nhất 2 ký tự',
      },
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'email@example.com',
        VALIDATION: 'Email không hợp lệ',
      },
      ROLE: {
        LABEL: 'Vai trò',
        PLACEHOLDER: 'Chọn vai trò',
      },
      PHONE: {
        LABEL: 'Số điện thoại',
        PLACEHOLDER: 'Nhập số điện thoại',
        VALIDATION: 'Số điện thoại không hợp lệ',
      },
      SCHOOL: {
        LABEL: 'Trường',
        PLACEHOLDER: 'Nhập tên trường',
        VALIDATION: 'Tên trường không hợp lệ',
      },
      DEPARTMENT: {
        LABEL: 'Khoa',
        PLACEHOLDER: 'Nhập tên khoa',
        VALIDATION: 'Tên khoa không hợp lệ',
      },
      POSITION: {
        LABEL: 'Chức vụ',
        PLACEHOLDER: 'Nhập chức vụ',
        VALIDATION: 'Chức vụ không hợp lệ',
      },
    },
    BUTTON: {
      CANCEL: 'Hủy',
      ADD: 'Thêm người dùng',
      SAVE: 'Lưu thay đổi',
    },
    TOAST: {
      SUCCESS: {
        ADD: 'Thêm người dùng thành công',
        UPDATE: 'Cập nhật người dùng thành công',
      },
      ERROR: {
        ADD: 'Không thể thêm người dùng. Vui lòng thử lại.',
        UPDATE: 'Không thể cập nhật người dùng. Vui lòng thử lại.',
      },
    },
  },
  USERS_LIST: {
    LOADING: 'Đang tải...',
    TABLE: {
      HEADERS: {
        ID: 'ID',
        NAME: 'Tên',
        EMAIL: 'Email',
        ROLE: 'Vai trò',
        CREATED_AT: 'Ngày tạo',
        STATUS: 'Trạng thái',
        ACTIONS: 'Thao tác',
      },
      EMPTY: 'Không tìm thấy người dùng nào.',
      STATUS: {
        ACTIVE: 'Đang hoạt động',
        DELETED: 'Đã xóa',
      },
      ROLES: {
        ADMIN: 'Quản trị viên',
        TEACHER: 'Giảng viên',
      },
    },
    DROPDOWN: {
      LABEL: 'Thao tác',
      VIEW: 'Xem',
      EDIT: 'Chỉnh sửa',
      DELETE: 'Xóa',
    },
    DELETE_DIALOG: {
      TITLE: 'Xác nhận xóa người dùng',
      DESCRIPTION: 'Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.',
      CANCEL: 'Hủy',
      CONFIRM: 'Xóa',
    },
    TOAST: {
      DELETE_SUCCESS: 'Người dùng đã được xóa thành công.',
      DELETE_ERROR: 'Có lỗi xảy ra khi xóa người dùng.',
    },
  },
  USERS_PAGE: {
    TABS: {
      USERS: 'Danh sách người dùng',
      REGISTERS: 'Đăng ký chờ duyệt',
    },
    ACTIONS: {
      ADD_USER: 'Thêm người dùng',
      REFRESH: 'Làm mới',
    },
    TOAST: {
      REFRESH_SUCCESS: 'Đã cập nhật danh sách người dùng',
      REFRESH_ERROR: 'Không thể làm mới dữ liệu',
      LOAD_ERROR: 'Có lỗi xảy ra khi tải dữ liệu người dùng.',
    },
    LOADING: 'Đang tải...',
  },
  REGISTER_APPROVE_DIALOG: {
    TITLE: 'Phê duyệt đăng ký',
    DESCRIPTION: 'Phê duyệt đăng ký của {name} và gán vai trò.',
    FORM: {
      ROLE: {
        LABEL: 'Vai trò',
        PLACEHOLDER: 'Chọn vai trò',
      },
    },
    BUTTONS: {
      CANCEL: 'Hủy',
      APPROVE: 'Phê duyệt',
      APPROVING: 'Đang phê duyệt...',
    },
  },
  REGISTER_LIST: {
    TABLE: {
      HEADERS: {
        NO: 'STT',
        NAME: 'Họ và tên',
        EMAIL: 'Email',
        PHONE: 'Số điện thoại',
        SCHOOL: 'Trường học',
        DEPARTMENT: 'Khoa/Phòng ban',
        POSITION: 'Chức vụ',
        REGISTERED: 'Ngày đăng ký',
        ACTIONS: 'Thao tác',
      },
      NO_DATA: 'Không có',
    },
  },
  REGISTER_ACTIONS: {
    BUTTONS: {
      APPROVE: {
        LABEL: 'Phê duyệt',
        TOOLTIP: 'Phê duyệt đăng ký',
      },
      REJECT: {
        LABEL: 'Từ chối',
        TOOLTIP: 'Từ chối đăng ký',
      },
    },
  },
  REGISTER_REJECT_DIALOG: {
    TITLE: 'Bạn có chắc chắn?',
    DESCRIPTION: 'Hành động này sẽ từ chối yêu cầu đăng ký của {name}. Hành động này không thể hoàn tác.',
    BUTTONS: {
      CANCEL: 'Hủy',
      REJECT: 'Từ chối',
      REJECTING: 'Đang từ chối...',
    },
  },
  PROFILE_FORM: {
    TITLE: 'Chỉnh sửa thông tin',
    DESCRIPTION: 'Cập nhật thông tin cá nhân của bạn',
    FORM: {
      NAME: {
        LABEL: 'Họ và tên',
        PLACEHOLDER: 'Nguyễn Văn A',
        VALIDATION: 'Tên phải có ít nhất 2 ký tự.',
      },
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'example@email.com',
        VALIDATION: 'Vui lòng nhập địa chỉ email hợp lệ.',
      },
      PHONE: {
        LABEL: 'Số điện thoại',
        PLACEHOLDER: '0123456789',
        VALIDATION: 'Số điện thoại phải có ít nhất 10 chữ số.',
      },
      SCHOOL: {
        LABEL: 'Trường học',
        PLACEHOLDER: 'Trường của bạn',
      },
      DEPARTMENT: {
        LABEL: 'Khoa/Phòng ban',
        PLACEHOLDER: 'Khoa/Phòng ban của bạn',
      },
      POSITION: {
        LABEL: 'Chức vụ',
        PLACEHOLDER: 'Chức vụ của bạn',
      },
    },
    BUTTONS: {
      CANCEL: 'Hủy',
      SAVE: 'Lưu thay đổi',
      SAVING: 'Đang lưu...',
    },
    TOAST: {
      SUCCESS: {
        TITLE: 'Cập nhật thông tin thành công!',
        DESCRIPTION: 'Thông tin cá nhân của bạn đã được cập nhật.',
      },
      ERROR: {
        TITLE: 'Cập nhật thông tin thất bại!',
        DESCRIPTION: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
      },
    },
  },
  PROFILE_VIEW: {
    TITLE: 'Thông tin cá nhân',
    DESCRIPTION: 'Quản lý thông tin cá nhân của bạn',
    EDIT_BUTTON: 'Chỉnh sửa hồ sơ',
    FIELDS: {
      NAME: {
        LABEL: 'Họ và tên',
      },
      EMAIL: {
        LABEL: 'Email',
      },
      PHONE: {
        LABEL: 'Số điện thoại',
      },
      SCHOOL: {
        LABEL: 'Trường học',
      },
      DEPARTMENT: {
        LABEL: 'Khoa/Phòng ban',
      },
      POSITION: {
        LABEL: 'Chức vụ',
      },
    },
    NO_DATA: '-',
  },
  USER_SIDEBAR: {
    NAME_NOT_SET: 'Chưa cập nhật',
    AVATAR: {
      ALT: 'Người dùng',
      FALLBACK: 'U',
      UPLOAD_BUTTON: 'Tải lên ảnh đại diện',
    },
    INFO: {
      ID: {
        LABEL: 'ID',
      },
      EMAIL: {
        LABEL: 'Email',
      },
      ROLE: {
        LABEL: 'Vai trò',
      },
    },
  },
  ACCOUNT_PAGE: {
    TITLE: 'Tài khoản của tôi',
    LOADING: {
      MESSAGE: 'Đang tải thông tin...',
    },
    NOT_FOUND: {
      TITLE: 'Không tìm thấy thông tin người dùng',
      DESCRIPTION: 'Vui lòng đăng nhập để xem thông tin tài khoản của bạn.',
      LOGIN_BUTTON: 'Đăng nhập',
    },
    TABS: {
      PROFILE: 'Hồ sơ',
    },
  },
};
