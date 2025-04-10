export const ENGLISH_MESSAGES = {
  HEADER: {
    LOGIN: 'Login',
    MY_ACCOUNT: 'My Account',
    MANAGE_USER: 'Manage User',
    MANAGE_ROLE: 'Manage Role',
    SETTINGS: 'Settings',
    LOGOUT: 'Logout',
    TOGGLE_THEME: 'Toggle theme',
  },
  NAVBAR: {
    HOME: 'Home',
    CLASSES: 'Classes',
    ABOUT_US: 'About Us',
    CONTACT_US: 'Contact Us',
  },
  HERO: {
    BADGE: 'Smart Thesis Management System',
    TITLE: 'Efficient Thesis Management',
    DESCRIPTION:
      'A comprehensive platform that helps aggregate, generate data, and manage graduation theses, eliminating complex manual processes and optimizing work efficiency.',
    CTA: {
      START: 'Get Started',
      DEMO: 'View Demo',
    },
    FEATURES: {
      DATA_COLLECTION: {
        TITLE: 'Data Collection',
        DESCRIPTION:
          'Automatically collect and analyze data from various sources, helping to efficiently manage thesis information.',
      },
      SMART_DATA: {
        TITLE: 'Smart Data Generation',
        DESCRIPTION: 'Automated data generation tools for reports, statistics, and thesis progress analysis.',
      },
      COLLABORATION: {
        TITLE: 'Multi-user Collaboration',
        DESCRIPTION:
          'Connect students, lecturers, and administrators on a unified platform, making exchange and coordination easy.',
      },
    },
    TRUSTED_BY: 'TRUSTED BY',
  },
  FOOTER: {
    CONTACT: {
      TITLE: 'Contact',
      ADDRESS: '1 Dai Co Viet St., Hai Ba Trung, Hanoi',
      PHONE: '(+84) 123 456 789',
      EMAIL: 'contact@thesismanager.vn',
    },
    COPYRIGHT: {
      RIGHTS: '© {year} ThesisManager. All rights reserved by Do Duc Long Company.',
      CREATED_BY: 'Designed & Developed by',
    },
  },
  CLASSES: {
    TITLE: 'Classes',
    SUBTITLE: 'Manage your classes',
    ADD: 'Add Class',
    EDIT: 'Edit Class',
    DELETE: 'Delete Class',
    SEARCH: 'Search classes...',
    NAME: 'Class Name',
    DESCRIPTION: 'Description',
    TEACHER: 'Teacher',
    STUDENTS: 'Students',
    EMPTY: 'No classes found',
    CONFIRM_DELETE: 'Are you sure you want to delete this class?',
    SUCCESS_CREATE: 'Class created successfully',
    SUCCESS_UPDATE: 'Class updated successfully',
    SUCCESS_DELETE: 'Class deleted successfully',
    ERROR_CREATE: 'Failed to create class',
    ERROR_UPDATE: 'Failed to update class',
    ERROR_DELETE: 'Failed to delete class',
    CARD: {
      COURSE: 'Course',
      INPUT_FILES: 'Input files',
      SEMESTER: 'Semester',
      VIEW: 'View',
      EDIT: 'Edit',
      DELETE: 'Delete',
      DELETE_CONFIRM_TITLE: 'Are you sure?',
      DELETE_CONFIRM_DESC:
        'This action cannot be undone. This will permanently delete the class {name} and all associated data.',
      DELETE_CONFIRM_CANCEL: 'Cancel',
      DELETE_CONFIRM_ACTION: 'Delete',
    },
    DIALOG: {
      CREATE_TITLE: 'Add New Class',
      EDIT_TITLE: 'Edit Class',
    },
    FORM: {
      NAME: {
        LABEL: 'Class Name',
        PLACEHOLDER: 'Enter class name',
      },
      CLASS_CODE: {
        LABEL: 'Class Code',
        PLACEHOLDER: 'e.g. CS101-A',
      },
      COURSE_CODE: {
        LABEL: 'Course Code',
        PLACEHOLDER: 'e.g. CS101',
      },
      SEMESTER: {
        LABEL: 'Semester',
        PLACEHOLDER: 'e.g. Fall 2025',
      },
      DRIVE_ID: {
        LABEL: 'Drive ID',
        PLACEHOLDER: 'e.g. 1A2B3C4D5E6F7G8H9I0J',
        DESCRIPTION: 'Enter the Google Drive folder ID to store class materials. This field is optional.',
        IMPORTANT: 'Important',
        ACCESS_NOTE: 'Before using this feature, please share editing access to your folder with our service account:',
        SERVICE_ACCOUNT: 'data-gen-hub@oauth2-402816.iam.gserviceaccount.com',
      },
      BUTTONS: {
        CANCEL: 'Cancel',
        CREATE: 'Create Class',
        SAVE: 'Save Changes',
      },
    },
    LIST: {
      LOADING: 'Loading classes...',
      EMPTY: {
        NO_RESULTS: {
          TITLE: 'No classes found',
          DESCRIPTION: 'No classes matching "{query}" were found.',
          ACTION: 'Clear Search',
        },
        NO_CLASSES: {
          TITLE: 'No classes yet',
          DESCRIPTION: 'Create your first class to get started.',
          ACTION: 'Add Class',
        },
      },
    },
    PAGE: {
      TITLE: 'Classes Management',
      DESCRIPTION: 'Manage all your classes in one place.',
      ADD_BUTTON: 'Add Class',
      SEARCH_PLACEHOLDER: 'Search classes by name or code...',
    },
  },
  GENERATE_THESIS: {
    TEMPLATE_UPLOADED: 'Template uploaded successfully',
    TEMPLATE_UPLOAD_FAILED: 'Upload failed: {message}',
    TEMPLATE_DOWNLOADED: 'Default {type} template downloaded',
    TEMPLATE_DOWNLOAD_FAILED: 'Download failed',
    REQUEST_SENT: 'Generation request sent successfully',
    GENERATION_FAILED: 'Generation failed: {message}',
    SHEET_DELETED: 'Sheet deleted successfully',
    SHEET_DELETE_FAILED: 'Failed to delete sheet: {message}',
    ALL_SHEETS_DELETED: 'All sheets deleted successfully',
    ALL_SHEETS_DELETE_FAILED: 'Failed to delete all sheets: {message}',
    DOWNLOAD_FAILED: 'Download failed',
  },
  IMPORT_THESIS: {
    IMPORT_FAILED: 'Import failed: {message}',
    THESIS_CREATED: 'Thesis created successfully',
    THESIS_CREATE_FAILED: 'Create thesis failed: {message}',
    THESIS_UPDATED: 'Thesis updated successfully',
    THESIS_UPDATE_FAILED: 'Update thesis failed: {message}',
    THESIS_DELETED: 'Thesis deleted successfully',
    THESIS_DELETE_FAILED: 'Delete thesis failed: {message}',
  },
  REGISTERS: {
    APPROVE_SUCCESS: 'Registration approved successfully',
    APPROVE_ERROR: 'An error occurred while approving the registration',
    REJECT_SUCCESS: 'Registration rejected successfully',
    REJECT_ERROR: 'An error occurred while rejecting the registration',
  },
  SYSTEM_CONFIG: {
    CREATE_SUCCESS: 'System config created successfully',
    UPDATE_SUCCESS: 'System config updated successfully',
    DELETE_SUCCESS: 'System config deleted successfully',
  },
  ABOUT_US: {
    HERO: {
      TITLE: 'About Us',
      DESCRIPTION: 'We are passionate about helping students and lecturers manage graduation theses effectively',
      CONTACT_NOW: 'Contact Now',
    },
    MISSION: {
      TITLE: 'Our Mission',
      DESCRIPTION:
        'We were born with the mission of simplifying the graduation thesis management process, helping students focus on research instead of worrying about complex manual processes, while supporting lecturers in monitoring and evaluating effectively.',
      FEATURES: {
        TIME_SAVING: {
          TITLE: 'Time Saving',
          DESCRIPTION: 'Automate manual processes, reduce document processing and management time.',
        },
        HIGH_EFFICIENCY: {
          TITLE: 'High Efficiency',
          DESCRIPTION: 'Comprehensive data aggregation and analysis, helping make better decisions.',
        },
        COMPREHENSIVE: {
          TITLE: 'Comprehensive Integration',
          DESCRIPTION: 'A single platform for all thesis management needs from storage to evaluation.',
        },
      },
    },
    TEAM: {
      TITLE: 'Our Team',
      DESCRIPTION:
        'We are experts in technology and education, always putting user experience and efficiency at the center of development.',
      MEMBERS: {
        CEO: {
          NAME: 'Nguyen Van A',
          ROLE: 'Chief Executive Officer',
        },
        CTO: {
          NAME: 'Tran Thi B',
          ROLE: 'Chief Technology Officer',
        },
        HEAD_DEV: {
          NAME: 'Le Van C',
          ROLE: 'Development Manager',
        },
      },
    },
    CTA: {
      TITLE: 'Ready to optimize the thesis process?',
      DESCRIPTION: 'Let us help you manage graduation theses more efficiently, saving time and effort.',
      CONTACT_NOW: 'Contact Now',
      LEARN_MORE: 'Learn More',
    },
  },
  CONTACT_US: {
    HERO: {
      TITLE: 'Contact Us',
      DESCRIPTION:
        'We are always ready to listen and support you with any issues related to our graduation thesis management platform.',
    },
    CONTACT_INFO: {
      TITLE: 'Contact Information',
      EMAIL: {
        LABEL: 'Email',
        VALUE: 'info@gradproject.vn',
      },
      PHONE: {
        LABEL: 'Phone',
        VALUE: '+84 912 345 678',
      },
      ADDRESS: {
        LABEL: 'Address',
        VALUE: 'Innovation Building, 123 Nguyen Van Linh\nDistrict 7, Ho Chi Minh City',
      },
      WORKING_HOURS: {
        TITLE: 'Working Hours',
        SCHEDULE: 'Monday - Friday: 8:00 - 17:30\nSaturday: 8:00 - 12:00\nSunday: Closed',
      },
    },
    FORM: {
      TITLE: 'Send Message',
      NAME: {
        LABEL: 'Full Name',
        PLACEHOLDER: 'Enter your full name',
      },
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'example@domain.com',
      },
      SUBJECT: {
        LABEL: 'Subject',
        PLACEHOLDER: 'Enter your message subject',
      },
      MESSAGE: {
        LABEL: 'Message',
        PLACEHOLDER: 'Enter your message content',
      },
      SUBMIT: 'Send Message',
      SUCCESS: {
        TITLE: 'Sent successfully!',
        MESSAGE: 'Thank you for contacting us. We will respond as soon as possible.',
        NEW_MESSAGE: 'Send another message',
      },
    },
    FAQ: {
      TITLE: 'Frequently Asked Questions',
      DESCRIPTION: 'Below are the questions we frequently receive. If you cannot find your answer, please contact us.',
      ITEMS: [
        {
          QUESTION: 'Does the system support integration with existing school training management software?',
          ANSWER:
            'Yes, our platform is designed to flexibly integrate with existing training management systems through APIs and data synchronization solutions.',
        },
        {
          QUESTION: 'How can lecturers track student progress?',
          ANSWER:
            'Lecturers can track student progress through an intuitive dashboard, receive notifications about important milestones, and create custom reports on the progress of individual students or groups.',
        },
        {
          QUESTION: 'Does the system support version control for project documents?',
          ANSWER:
            'Yes, our system provides comprehensive version control features, allowing students and lecturers to track change history, compare versions, and restore previous versions when needed.',
        },
        {
          QUESTION: 'Does the platform provide plagiarism checking features?',
          ANSWER:
            'Yes, we integrate plagiarism checking tools to ensure the originality of theses and help students comply with academic standards.',
        },
      ],
    },
    CTA: {
      TITLE: 'Start managing theses effectively today',
      DESCRIPTION: 'Sign up for a 30-day free trial and discover the difference our platform makes.',
      SIGNUP: 'Sign up for trial',
    },
  },
  LOGIN: {
    TITLE: 'Login',
    DESCRIPTION: 'Enter your login credentials to continue',
    FORM: {
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'you@example.com',
      },
      PASSWORD: {
        LABEL: 'Password',
        PLACEHOLDER: '••••••••',
      },
      REMEMBER_ME: 'Remember me',
      SUBMIT: 'Login',
      PROCESSING: 'Processing...',
    },
    ERROR: {
      DEFAULT: 'Login failed. Please check your credentials.',
    },
    REGISTER_PROMPT: {
      TEXT: "Don't have an account?",
      LINK: 'Sign up now',
    },
  },
  REGISTER: {
    TITLE: 'Register Account',
    DESCRIPTION: 'Fill in your information to send a request to the administrator',
    BACK_TO_LOGIN: 'Back to login',
    FORM: {
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'you@example.com',
        REQUIRED: 'Valid email is required',
      },
      NAME: {
        LABEL: 'Full Name',
        PLACEHOLDER: 'John Doe',
      },
      PHONE: {
        LABEL: 'Phone Number',
        PLACEHOLDER: '0912345678',
      },
      SCHOOL: {
        LABEL: 'School',
        PLACEHOLDER: 'ABC University',
      },
      DEPARTMENT: {
        LABEL: 'Department',
        PLACEHOLDER: 'Information Technology Department',
      },
      POSITION: {
        LABEL: 'Position',
        PLACEHOLDER: 'Lecturer/Student/...',
      },
      SUBMIT: 'Send Registration Request',
      PROCESSING: 'Processing...',
    },
    ERROR: {
      DEFAULT: 'An error occurred while sending the registration request',
    },
    SUCCESS: {
      MESSAGE:
        'Registration request has been sent successfully! The administrator will review and approve your account. You will be redirected to the login page in a few seconds...',
    },
    TERMS: 'By registering, you agree to our Terms of Service and Privacy Policy.',
  },
  METADATA: {
    TITLE: 'Data Gen Hub',
    DESCRIPTION:
      'A comprehensive platform for managing graduation theses, automating data generation and collaboration.',
  },
  PERMISSION_FORM: {
    TITLE: {
      ADD: 'Add New Permission',
      EDIT: 'Edit Permission',
    },
    DESCRIPTION: {
      ADD: 'Enter information to create a new permission.',
      EDIT: 'Update permission information.',
    },
    FORM: {
      ACTION: {
        LABEL: 'Action',
        PLACEHOLDER: 'Select or enter an action',
        VALIDATION: 'Action must be at least 2 characters',
      },
      SUBJECT: {
        LABEL: 'Subject',
        PLACEHOLDER: 'Select or enter a subject',
        VALIDATION: 'Subject must be at least 2 characters',
      },
      DESCRIPTION: {
        LABEL: 'Description',
        PLACEHOLDER: 'Enter description for this permission',
      },
    },
    BUTTON: {
      CANCEL: 'Cancel',
      ADD: 'Add Permission',
      SAVE: 'Save Changes',
    },
    TOAST: {
      SUCCESS: {
        ADD: 'Permission added successfully',
        UPDATE: 'Permission updated successfully',
      },
      ERROR: {
        ADD: 'Could not add permission. Please try again.',
        UPDATE: 'Could not update permission. Please try again.',
      },
    },
  },
  PERMISSION_LIST: {
    TITLE: 'Permissions List',
    ADD_BUTTON: 'Add New Permission',
    REFRESH_BUTTON: 'Refresh',
    SEARCH: {
      PLACEHOLDER: 'Search permissions...',
    },
    FILTER: {
      PLACEHOLDER: 'Filter by subject',
      ALL_SUBJECTS: 'All subjects',
    },
    TABLE: {
      NO: 'No.',
      ACTION: 'Action',
      SUBJECT: 'Subject',
      DESCRIPTION: 'Description',
      OPERATIONS: 'Operations',
      NO_DESCRIPTION: 'No description',
      EMPTY: {
        MESSAGE: 'No matching permissions found.',
        CLEAR_FILTER: 'Clear filters',
      },
    },
    DROPDOWN: {
      LABEL: 'Actions',
      EDIT: 'Edit',
      DELETE: 'Delete',
    },
    DELETE_DIALOG: {
      TITLE: 'Confirm Delete Permission',
      DESCRIPTION:
        'Are you sure you want to delete this permission? This action cannot be undone and may affect roles using this permission.',
      CANCEL: 'Cancel',
      CONFIRM: 'Delete',
    },
    TOAST: {
      REFRESH_SUCCESS: 'Permissions list updated',
      REFRESH_ERROR: 'Could not refresh data',
      DELETE_SUCCESS: 'Permission deleted successfully.',
      DELETE_ERROR: 'An error occurred while deleting the permission.',
    },
  },
  ROLE_FORM: {
    TITLE: {
      ADD: 'Add New Role',
      EDIT: 'Edit Role',
    },
    DESCRIPTION: {
      ADD: 'Enter information to create a new role.',
      EDIT: 'Update role information.',
    },
    FORM: {
      NAME: {
        LABEL: 'Name',
        PLACEHOLDER: 'Enter role name',
        VALIDATION: 'Name must be at least 2 characters',
      },
      DESCRIPTION: {
        LABEL: 'Description',
        PLACEHOLDER: 'Enter role description',
        VALIDATION: 'Description must be at least 2 characters',
      },
      PERMISSIONS: {
        LABEL: 'Permissions',
        SELECT_ALL: 'Select All',
        DESELECT_ALL: 'Deselect All',
      },
    },
    BUTTON: {
      CANCEL: 'Cancel',
      ADD: 'Add Role',
      SAVE: 'Save Changes',
    },
    LOADING: 'Loading data...',
    TOAST: {
      SUCCESS: {
        ADD: 'Role added successfully',
        UPDATE: 'Role updated successfully',
      },
      ERROR: {
        ADD: 'Could not add role. Please try again.',
        UPDATE: 'Could not update role. Please try again.',
      },
    },
  },
  ROLE_LIST: {
    TABLE: {
      HEADER: {
        ROLE: 'Role',
        DESCRIPTION: 'Description',
        USER_COUNT: 'Users',
        PERMISSION_COUNT: 'Permissions',
        LAST_UPDATED: 'Last Updated',
        STATUS: 'Status',
        ACTIONS: 'Actions',
      },
      NO_DESCRIPTION: 'No description',
      EMPTY: {
        MESSAGE: 'No roles in the system yet.',
        ADD_BUTTON: 'Add New Role',
      },
      STATUS: {
        ACTIVE: 'Active',
        INACTIVE: 'Inactive',
      },
    },
    DROPDOWN: {
      LABEL: 'Actions',
      EDIT: 'Edit',
      DELETE: 'Delete',
    },
    DELETE_DIALOG: {
      TITLE: 'Confirm Delete Role',
      DESCRIPTION: 'Are you sure you want to delete this role? This action cannot be undone.',
      CANCEL: 'Cancel',
      CONFIRM: 'Delete',
    },
    TOAST: {
      DELETE_SUCCESS: 'Role deleted successfully.',
      DELETE_ERROR: 'An error occurred while deleting the role.',
    },
  },
  ROLES_PAGE: {
    TABS: {
      ROLES: 'Role List',
      PERMISSIONS: 'Permission Management',
    },
    ACTIONS: {
      ADD_ROLE: 'Add Role',
    },
    TOAST: {
      REFRESH_SUCCESS: 'Role list updated',
      REFRESH_ERROR: 'Could not refresh data',
      LOAD_ERROR: 'An error occurred while loading role data.',
    },
    LOADING: 'Loading...',
  },
  SYSTEM_CONFIG_PAGE: {
    TITLE: 'System Configuration',
    ACTIONS: {
      ADD: 'Add New',
      REFRESH: 'Refresh',
    },
    LIST: {
      HEADERS: {
        KEY: 'Key',
        TYPE: 'Type',
        VALUE: 'Value',
        ACTIONS: 'Actions',
      },
      EMPTY: {
        LOADING: 'Loading...',
        NO_DATA: 'No configurations found',
      },
      DROPDOWN: {
        EDIT: 'Edit',
        DELETE: 'Delete',
      },
      VALUE_TYPES: {
        STRING: 'String',
        NUMBER: 'Number',
        BOOLEAN: 'Boolean',
        JSON: 'JSON',
        EMPTY: 'empty',
        NOT_SET: 'Not set',
        TRUE: 'True',
        FALSE: 'False',
      },
    },
    FORM: {
      TITLE: {
        ADD: 'Add New Configuration',
        EDIT: 'Edit Configuration',
      },
      DESCRIPTION: {
        ADD: 'Add a new system configuration.',
        EDIT: 'Editing configuration with key: {key}',
      },
      FIELDS: {
        KEY: {
          LABEL: 'Key',
          PLACEHOLDER: 'Enter configuration key',
        },
        TYPE: {
          LABEL: 'Value Type',
          PLACEHOLDER: 'Select a value type',
        },
        VALUE: {
          LABEL: 'Value',
        },
      },
      BUTTONS: {
        SAVE: 'Save',
        SAVING: 'Saving...',
      },
    },
    DELETE_DIALOG: {
      TITLE: 'Are you sure?',
      DESCRIPTION: 'This will permanently delete the configuration with key: {key}. This action cannot be undone.',
      CANCEL: 'Cancel',
      CONFIRM: 'Delete',
      DELETING: 'Deleting...',
    },
  },
  USER_DETAIL: {
    TITLE: 'User Information',
    DESCRIPTION: 'Details about this user.',
    ROLES: {
      ADMIN: 'Admin',
      TEACHER: 'Teacher',
    },
    NO_DATA: 'No data',
    INFO_ITEMS: {
      EMAIL: 'Email',
      PHONE: 'Phone',
      SCHOOL: 'School',
      DEPARTMENT: 'Department',
      POSITION: 'Position',
      CREATED_AT: 'Created Date',
      UPDATED_AT: 'Last Updated',
    },
    ACCOUNT_STATUS: {
      TITLE: 'Account Status',
      ACTIVE: 'Active',
    },
    ERROR: {
      TITLE: 'Could not load user information',
      MESSAGE: 'Please try again later',
    },
    CLOSE_BUTTON: 'Close',
  },
  USER_FORM: {
    TITLE: {
      ADD: 'Add New User',
      EDIT: 'Edit User',
    },
    DESCRIPTION: {
      ADD: 'Enter information to create a new user.',
      EDIT: 'Update user information.',
    },
    LOADING: 'Loading user data...',
    FORM: {
      NAME: {
        LABEL: 'Name',
        PLACEHOLDER: 'Enter user name',
        VALIDATION: 'Name must be at least 2 characters',
      },
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'email@example.com',
        VALIDATION: 'Invalid email',
      },
      ROLE: {
        LABEL: 'Role',
        PLACEHOLDER: 'Select role',
      },
      PHONE: {
        LABEL: 'Phone Number',
        PLACEHOLDER: 'Enter phone number',
        VALIDATION: 'Invalid phone number',
      },
      SCHOOL: {
        LABEL: 'School',
        PLACEHOLDER: 'Enter school name',
        VALIDATION: 'Invalid school name',
      },
      DEPARTMENT: {
        LABEL: 'Department',
        PLACEHOLDER: 'Enter department name',
        VALIDATION: 'Invalid department name',
      },
      POSITION: {
        LABEL: 'Position',
        PLACEHOLDER: 'Enter position',
        VALIDATION: 'Invalid position',
      },
    },
    BUTTON: {
      CANCEL: 'Cancel',
      ADD: 'Add User',
      SAVE: 'Save Changes',
    },
    TOAST: {
      SUCCESS: {
        ADD: 'User added successfully',
        UPDATE: 'User updated successfully',
      },
      ERROR: {
        ADD: 'Could not add user. Please try again.',
        UPDATE: 'Could not update user. Please try again.',
      },
    },
  },
  USERS_LIST: {
    LOADING: 'Loading...',
    TABLE: {
      HEADERS: {
        ID: 'ID',
        NAME: 'Name',
        EMAIL: 'Email',
        ROLE: 'Role',
        CREATED_AT: 'Created At',
        STATUS: 'Status',
        ACTIONS: 'Actions',
      },
      EMPTY: 'No users found.',
      STATUS: {
        ACTIVE: 'Active',
        DELETED: 'Deleted',
      },
      ROLES: {
        ADMIN: 'Admin',
        TEACHER: 'Teacher',
      },
    },
    DROPDOWN: {
      LABEL: 'Actions',
      VIEW: 'View',
      EDIT: 'Edit',
      DELETE: 'Delete',
    },
    DELETE_DIALOG: {
      TITLE: 'Confirm Delete User',
      DESCRIPTION: 'Are you sure you want to delete this user? This action cannot be undone.',
      CANCEL: 'Cancel',
      CONFIRM: 'Delete',
    },
    TOAST: {
      DELETE_SUCCESS: 'User deleted successfully.',
      DELETE_ERROR: 'An error occurred while deleting the user.',
    },
  },
  USERS_PAGE: {
    TABS: {
      USERS: 'User List',
      REGISTERS: 'Pending Registrations',
    },
    ACTIONS: {
      ADD_USER: 'Add User',
      REFRESH: 'Refresh',
    },
    TOAST: {
      REFRESH_SUCCESS: 'User list updated',
      REFRESH_ERROR: 'Could not refresh data',
      LOAD_ERROR: 'An error occurred while loading user data.',
    },
    LOADING: 'Loading...',
  },
  REGISTER_APPROVE_DIALOG: {
    TITLE: 'Approve Registration',
    DESCRIPTION: "Approve {name}'s registration and assign a role.",
    FORM: {
      ROLE: {
        LABEL: 'Role',
        PLACEHOLDER: 'Select a role',
      },
    },
    BUTTONS: {
      CANCEL: 'Cancel',
      APPROVE: 'Approve',
      APPROVING: 'Approving...',
    },
  },
  REGISTER_LIST: {
    TABLE: {
      HEADERS: {
        NO: 'No.',
        NAME: 'Name',
        EMAIL: 'Email',
        PHONE: 'Phone',
        SCHOOL: 'School',
        DEPARTMENT: 'Department',
        POSITION: 'Position',
        REGISTERED: 'Registered',
        ACTIONS: 'Actions',
      },
      NO_DATA: 'N/A',
    },
  },
  REGISTER_ACTIONS: {
    BUTTONS: {
      APPROVE: {
        LABEL: 'Approve',
        TOOLTIP: 'Approve registration',
      },
      REJECT: {
        LABEL: 'Reject',
        TOOLTIP: 'Reject registration',
      },
    },
  },
  REGISTER_REJECT_DIALOG: {
    TITLE: 'Are you sure?',
    DESCRIPTION: "This will reject {name}'s registration request. This action cannot be undone.",
    BUTTONS: {
      CANCEL: 'Cancel',
      REJECT: 'Reject',
      REJECTING: 'Rejecting...',
    },
  },
  PROFILE_FORM: {
    TITLE: 'Edit Profile',
    DESCRIPTION: 'Update your personal information',
    FORM: {
      NAME: {
        LABEL: 'Full Name',
        PLACEHOLDER: 'John Doe',
        VALIDATION: 'Name must be at least 2 characters.',
      },
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'example@email.com',
        VALIDATION: 'Please enter a valid email address.',
      },
      PHONE: {
        LABEL: 'Phone Number',
        PLACEHOLDER: '0123456789',
        VALIDATION: 'Phone number must be at least 10 digits.',
      },
      SCHOOL: {
        LABEL: 'School',
        PLACEHOLDER: 'Your school',
      },
      DEPARTMENT: {
        LABEL: 'Department',
        PLACEHOLDER: 'Your department',
      },
      POSITION: {
        LABEL: 'Position',
        PLACEHOLDER: 'Your position',
      },
    },
    BUTTONS: {
      CANCEL: 'Cancel',
      SAVE: 'Save Changes',
      SAVING: 'Saving...',
    },
    TOAST: {
      SUCCESS: {
        TITLE: 'Profile updated successfully!',
        DESCRIPTION: 'Your personal information has been updated.',
      },
      ERROR: {
        TITLE: 'Failed to update profile!',
        DESCRIPTION: 'An error occurred. Please try again later.',
      },
    },
  },
  PROFILE_VIEW: {
    TITLE: 'Personal Information',
    DESCRIPTION: 'Manage your personal information',
    EDIT_BUTTON: 'Edit Profile',
    FIELDS: {
      NAME: {
        LABEL: 'Full Name',
      },
      EMAIL: {
        LABEL: 'Email',
      },
      PHONE: {
        LABEL: 'Phone Number',
      },
      SCHOOL: {
        LABEL: 'School',
      },
      DEPARTMENT: {
        LABEL: 'Department',
      },
      POSITION: {
        LABEL: 'Position',
      },
    },
    NO_DATA: '-',
  },
  USER_SIDEBAR: {
    NAME_NOT_SET: 'Not updated',
    AVATAR: {
      ALT: 'User',
      FALLBACK: 'U',
      UPLOAD_BUTTON: 'Upload avatar',
    },
    INFO: {
      ID: {
        LABEL: 'ID',
      },
      EMAIL: {
        LABEL: 'Email',
      },
      ROLE: {
        LABEL: 'Role',
      },
    },
  },
  ACCOUNT_PAGE: {
    TITLE: 'My Account',
    LOADING: {
      MESSAGE: 'Loading information...',
    },
    NOT_FOUND: {
      TITLE: 'User information not found',
      DESCRIPTION: 'Please login to view your account information.',
      LOGIN_BUTTON: 'Login',
    },
    TABS: {
      PROFILE: 'Profile',
    },
  },
};
