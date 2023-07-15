/* export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}  */

export interface Lawyer {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  idProofType: string;
  idProof: string;
  address: string;
  city: string;
  state: string;
  country: string;
  mobileno: string;
  skills: string;
  languagesKnow: string;
  barCouncilCode: string;
}

export enum ActionType {
  // login
  LOGIN_USER = "action/LOGIN_USER",
  LOGIN_USER_SUCCESS = "action/LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR = "action/LOGIN_USER_ERROR",
  LOGOUT_USER = "action/LOGOUT_USER",

  FORGOT_PASSWORD = "action/FORGOT_PASSWORD",
  FORGOT_PASSWORD_SUCCESS = "action/FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_ERROR = "action/FORGOT_PASSWORD_ERROR",

  RESET_PASSWORD = "action/RESET_PASSWORD",
  RESET_PASSWORD_SUCCESS = "action/RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_ERROR = "action/RESET_PASSWORD_ERROR",

  FIND_A_LAWYER = "action/FIND_A_LAWYER",
  FIND_A_LAWYER_SUCCESS = "action/FIND_A_LAWYER_SUCCESS",
  FIND_A_LAWYER_ERROR = "action/FIND_A_LAWYER_ERROR",
  UPDATE_FIND_A_LAWYER_LOADED = "action/UPDATE_FIND_A_LAWYER_LOADED",

  FIND_MORE_LAWYER = "action/FIND_MORE_LAWYER",
  FIND_MORE_LAWYER_SUCCESS = "action/FIND_MORE_LAWYER_SUCCESS",
  FIND_MORE_LAWYER_ERROR = "action/FIND_MORE_LAWYER_ERROR",

  UPDATE_SELECT_LAWYER = "action/UPDATE_SELECT_LAWYER",
  UPDATE_LOGIN_FROM_CONNECT = "action/UPDATE_LOGIN_FROM_CONNECT",

  FIND_JUDGEMENT = "action/FIND_JUDGEMENT",
  FIND_JUDGEMENT_SUCCESS = "action/FIND_JUDGEMENT_SUCCESS",
  FIND_JUDGEMENT_ERROR = "action/FIND_JUDGEMENT_ERROR",
  UPDATE_FIND_JUDGEMENT_LOADED = "action/UPDATE_FIND_JUDGEMENT_LOADED",

  GET_JUDGEMENT_URL = "action/GET_JUDGEMENT_URL",
  GET_JUDGEMENT_URL_SUCCESS = "action/GET_JUDGEMENT_URL_SUCCESS",
  GET_JUDGEMENT_URL_ERROR = "action/GET_JUDGEMENT_URL_ERROR",

  
  GET_JUDGEMENT_URL_DOWNLOAD = "action/GET_JUDGEMENT_URL_DOWNLOAD",
  GET_JUDGEMENT_URL_DOWNLOAD_SUCCESS = "action/GET_JUDGEMENT_URL_DOWNLOAD_SUCCESS",
  GET_JUDGEMENT_URL_DOWNLOAD_ERROR = "action/GET_JUDGEMENT_URL_DOWNLOAD_ERROR",

  SNACKBAR_SUCCESS = "action/SNACKBAR_SUCCESS",
  SNACKBAR_ERROR = "action/SNACKBAR_ERROR",
  SNACKBAR_INFO = "action/SNACKBAR_INFO",
  SNACKBAR_CLEAR = "action/SNACKBAR_CLEAR",
  CLEAR_JUDGMENT_URL="action/CLEAR_JUDGMENT_URL",
  CLEAR_DOWNLOAD_JUDGMENT_URL="action/CLEAR_DOWNLOAD_JUDGMENT_URL",
  SIGNUP_USER = "action/SIGNUP_USER",
  SIGNUP_USER_SUCCESS = "action/SIGNUP_USER_SUCCESS",
  SIGNUP_USER_ERROR = "action/SIGNUP_USER_ERROR",
  SIGNUP_RESET = "action/SIGNUP_RESET",

  SIGNUP_USER_COMPANY_LAWYER = "action/SIGNUP_USER_COMPANY_LAWYER",
  SIGNUP_USER_COMPANY_LAWYER_SUCCESS = "action/SIGNUP_USER_COMPANY_LAWYER_SUCCESS",
  SIGNUP_USER_COMPANY_LAWYER_ERROR = "action/SIGNUP_USER_COMPANY_LAWYER_ERROR",

  SAVE_CASE_INQUIRY = "action/SAVE_CASE_INQUIRY",
  SAVE_CASE_INQUIRY_SUCCESS = "action/SAVE_CASE_INQUIRY_SUCCESS",
  SAVE_CASE_INQUIRY_ERROR = "action/SAVE_CASE_INQUIRY_ERROR",
  RESET_SAVE_CASE_INQUIRY = "action/RESET_SAVE_CASE_INQUIRY",

  UPLOAD_CASE_INQUIRY_FILE = "action/UPLOAD_CASE_INQUIRY_FILE",
  UPLOAD_CASE_INQUIRY_FILE_SUCCESS = "action/UPLOAD_CASE_INQUIRY_FILE_SUCCESS",
  UPLOAD_CASE_INQUIRY_FILE_ERROR = "action/UPLOAD_CASE_INQUIRY_FILE_ERROR",

  GET_CASE_LIST = "action/GET_CASE_LIST",
  GET_CASE_LIST_SUCCESS = "action/GET_CASE_LIST_SUCCESS",
  GET_CASE_LIST_ERROR = "action/GET_CASE_LIST_ERROR",

  GET_JUNIOR_LIST = "action/GET_JUNIOR_LIST",
  GET_JUNIOR_LIST_SUCCESS = "action/GET_JUNIOR_LIST_SUCCESS",
  GET_JUNIOR_LIST_ERROR = "action/GET_JUNIOR_LIST_ERROR",

  GET_NOTI_BY_CASEID = "action/GET_NOTI_BY_CASEID",
  GET_NOTI_BY_CASEID_SUCCESS = "action/GET_NOTI_BY_CASEID_SUCCESS",
  GET_NOTI_BY_CASEID_ERROR = "action/GET_NOTI_BY_CASEID_ERROR",

  GET_LAWYER_CASE_LIST = "action/GET_LAWYER_CASE_LIST",
  GET_LAWYER_CASE_LIST_SUCCESS = "action/GET_LAWYER_CASE_LIST_SUCCESS",
  GET_LAWYER_CASE_LIST_ERROR = "action/GET_LAWYER_CASE_LIST_ERROR",

  SAVE_CASE_NOTES = "action/SAVE_CASE_NOTES",
  SAVE_CASE_NOTES_SUCCESS = "action/SAVE_CASE_NOTES_SUCCESS",
  SAVE_CASE_NOTES_ERROR = "action/SAVE_CASE_NOTES_ERROR",

  GET_CASE_NOTES = "action/GET_CASE_NOTES",
  GET_CASE_NOTES_SUCCESS = "action/GET_CASE_NOTES_SUCCESS",
  GET_CASE_NOTES_ERROR = "action/GET_CASE_NOTES_ERROR",

  SET_SELECTED_CASE = "action/SET_SELECTED_CASE",

  GET_CASE_STAGE = "action/GET_CASE_STAGE",
  GET_CASE_STAGE_SUCCESS = "action/GET_CASE_STAGE_SUCCESS",
  GET_CASE_STAGE_ERROR = "action/GET_CASE_STAGE_ERROR",

  DELETE_CASE_NOTES = "action/DELETE_CASE_NOTES",
  DELETE_CASE_NOTES_SUCCESS = "action/DELETE_CASE_NOTES_SUCCESS",
  DELETE_CASE_NOTES_ERROR = "action/DELETE_CASE_NOTES_ERROR",

  SAVE_CASE_CONTACT = "action/SAVE_CASE_CONTACT",
  SAVE_CASE_CONTACT_SUCCESS = "action/SAVE_CASE_CONTACT_SUCCESS",
  SAVE_CASE_CONTACT_ERROR = "action/SAVE_CASE_CONTACT_ERROR",

  DELETE_CASE_CONTACT = "action/DELETE_CASE_CONTACT",
  DELETE_CASE_CONTACT_SUCCESS = "action/DELETE_CASE_CONTACT_SUCCESS",
  DELETE_CASE_CONTACT_ERROR = "action/DELETE_CASE_CONTACT_ERROR",

  UPDATE_CASE_NOTES = "action/UPDATE_CASE_NOTES",
  UPDATE_CASE_NOTES_SUCCESS = "action/UPDATE_CASE_NOTES_SUCCESS",
  UPDATE_CASE_NOTES_ERROR = "action/UPDATE_CASE_NOTES_ERROR",

  GET_CASE_HEARINGS = "action/GET_CASE_HEARINGS",
  GET_CASE_HEARINGS_SUCCESS = "action/GET_CASE_HEARINGS_SUCCESS",
  GET_CASE_HEARINGS_ERROR = "action/GET_CASE_HEARINGS_ERROR",

  ACCEPT_CASE = "action/ACCEPT_CASE",
  ACCEPT_CASE_SUCCESS = "action/ACCEPT_CASE_SUCCESS",
  ACCEPT_CASE_ERROR = "action/ACCEPT_CASE_ERROR",

  GET_CASE_FILE = "action/GET_CASE_FILE",
  GET_CASE_FILE_SUCCESS = "action/GET_CASE_FILE_SUCCESS",
  GET_CASE_FILE_ERROR = "action/GET_CASE_FILE_ERROR",

  UPLOAD_CASE_FILE = "action/UPLOAD_CASE_FILE",
  UPLOAD_CASE_FILE_SUCCESS = "action/UPLOAD_CASE_FILE_SUCCESS",
  UPLOAD_CASE_FILE_ERROR = "action/UPLOAD_CASE_FILE_ERROR",

  CREATE_ORDER = "action/CREATE_ORDER",
  CREATE_ORDER_SUCCESS = "action/CREATE_ORDER_SUCCESS",
  CREATE_ORDER_ERROR = "action/CREATE_ORDER_ERROR",

  GET_FIRM_CASE_LIST = "action/GET_FIRM_CASE_LIST",
  GET_FIRM_CASE_LIST_SUCCESS = "action/GET_FIRM_CASE_LISTM_SUCCESS",
  GET_FIRM_CASE_LIST_ERROR = "action/GET_FIRM_CASE_LIST_ERROR",

  GET_FIRM_LAWYERS = "action/GET_FIRM_LAWYERS",
  GET_FIRM_LAWYERS_SUCCESS = "action/GET_FIRM_LAWYERS_SUCCESS",
  GET_FIRM_LAWYERS_ERROR = "action/GET_FIRM_LAWYERS_ERROR",

  RE_ASSIGN_LAWYER = "action/RE_ASSIGN_LAWYER",
  RE_ASSIGN_LAWYER_SUCCESS = "action/RE_ASSIGN_LAWYER_SUCCESS",
  RE_ASSIGN_LAWYER_ERROR = "action/RE_ASSIGN_LAWYER_ERROR",

  GET_MORE_FIRM_CASE_LIST = "action/GET_MORE_FIRM_CASE_LIST",
  GET_MORE_FIRM_CASE_LIST_SUCCESS = "action/GET_MORE_FIRM_CASE_LIST_SUCCESS",
  GET_MORE_FIRM_CASE_LIST_ERROR = "action/GET_MORE_FIRM_CASE_LIST_ERROR",

  GET_LAW_CATEGORY = "action/GET_LAW_CATEGORY",
  GET_LAW_CATEGORY_SUCCESS = "action/GET_LAW_CATEGORY_SUCCESS",
  GET_LAW_CATEGORY_ERROR = "action/GET_LAW_CATEGORY_ERROR",

  GET_LAW_CATEGORY_BY_ID = "action/GET_LAW_CATEGORY_BY_ID",
  GET_LAW_CATEGORY_BY_ID_SUCCESS = "action/GET_LAW_CATEGORY_BY_ID_SUCCESS",
  GET_LAW_CATEGORY_BY_ID_ERROR = "action/GET_LAW_CATEGORY_BY_ID_ERROR",

  GET_DASHBOARD_DETAILS = "action/GET_DASHBOARD_DETAILS",
  GET_DASHBOARD_DETAILS_SUCCESS = "action/GET_DASHBOARD_DETAILS_SUCCESS",
  GET_DASHBOARD_DETAILS_ERROR = "action/GET_DASHBOARD_DETAILS_ERROR",

  SAVE_HEARING = "action/SAVE_HEARING",
  SAVE_HEARING_SUCCESS = "action/SAVE_HEARING_SUCCESS",
  SAVE_HEARING_ERROR = "action/SAVE_HEARING_ERROR",

  GET_CASE_HEARINGS_BY_DATE = "action/GET_CASE_HEARINGS_BY_DATE",
  GET_CASE_HEARINGS_BY_DATE_SUCCESS = "action/GET_CASE_HEARINGS_BY_DATE_SUCCESS",
  GET_CASE_HEARINGS_BY_DATE_ERROR = "action/GET_CASE_HEARINGS_BY_DATE_ERROR",

  SAVE_CASE_FOLDER = "action/SAVE_CASE_FOLDER",
  SAVE_CASE_FOLDER_SUCCESS = "action/SAVE_CASE_FOLDER_SUCCESS",
  SAVE_CASE_FOLDER_ERROR = "action/SAVE_CASE_FOLDER_ERROR",

  SAVE_CASE_FILE = "action/SAVE_CASE_FILE",
  SAVE_CASE_FILE_SUCCESS = "action/SAVE_CASE_FILE_SUCCESS",
  SAVE_CASE_FILE_ERROR = "action/SAVE_CASE_FILE_ERROR",

  GET_CASE_DOCUMENTS = "action/GET_CASE_DOCUMENTS",
  GET_CASE_DOCUMENTS_SUCCESS = "action/GET_CASE_DOCUMENTS_SUCCESS",
  GET_CASE_DOCUMENTS_ERROR = "action/GET_CASE_DOCUMENTS_ERROR",

  GET_CASE_TYPE = "action/GET_CASE_TYPE",
  GET_CASE_TYPE_SUCCESS = "action/GET_CASE_TYPE_SUCCESS",
  GET_CASE_TYPE_ERROR = "action/GET_CASE_TYPE_ERROR",

  GET_COURTS = "action/GET_COURTS",
  GET_COURTS_SUCCESS = "action/GET_COURTS_SUCCESS",
  GET_COURTS_ERROR = "action/GET_COURTS_ERROR",

  SAVE_CONNECTED_MATTERS = "action/SAVE_CONNECTED_MATTERS",
  SAVE_CONNECTED_MATTERS_SUCCESS = "action/SAVE_CONNECTED_MATTERS_SUCCESS",
  SAVE_CONNECTED_MATTERS_ERROR = "action/SAVE_CONNECTED_MATTERS_ERROR",

  GET_CONNECTED_MATTERS = "action/GET_CONNECTED_MATTERS",
  GET_CONNECTED_MATTERS_SUCCESS = "action/GET_CONNECTED_MATTERS_SUCCESS",
  GET_CONNECTED_MATTERS_ERROR = "action/GET_CONNECTED_MATTERS_ERROR",

  UPDATE_CASE_DETAILS = "action/UPDATE_CASE_DETAILS",
  UPDATE_CASE_DETAILS_SUCCESS = "action/UPDATE_CASE_DETAILS_SUCCESS",
  UPDATE_CASE_DETAILS_ERROR = "action/UPDATE_CASE_DETAILS_ERROR",

  GET_RELATED_JUDGEMENTS = "action/GET_RELATED_JUDGEMENTS",
  GET_RELATED_JUDGEMENTS_SUCCESS = "action/GET_RELATED_JUDGEMENTS_SUCCESS",
  GET_RELATED_JUDGEMENTS_ERROR = "action/GET_RELATED_JUDGEMENTS_ERROR",

  SEND_NOTIFICATION = "action/SEND_NOTIFICATION",
  SEND_NOTIFICATION_SUCCESS = "action/SEND_NOTIFICATION_SUCCESS",
  SEND_NOTIFICATION_ERROR = "action/SEND_NOTIFICATION_ERROR",

  SEND_NOTIFICATION_BACK = "action/SEND_NOTIFICATION_BACK",
  SEND_NOTIFICATION_BACK_SUCCESS = "action/SEND_NOTIFICATION_BACK_SUCCESS",
  SEND_NOTIFICATION_BACK_ERROR = "action/SEND_NOTIFICATION_BACK_ERROR",

  GET_ALL_NOTIFICATIONS = "action/GET_ALL_NOTIFICATIONS",
  GET_ALL_NOTIFICATIONS_SUCCESS = "action/GET_ALL_NOTIFICATIONS_SUCCESS",
  GET_ALL_NOTIFICATIONS_ERROR = "action/GET_ALL_NOTIFICATIONS_ERROR",

  CREATE_INVOICE = "action/CREATE_INVOICE",
  CREATE_INVOICE_SUCCESS = "action/CREATE_INVOICE_SUCCESS",
  CREATE_INVOICE_ERROR = "action/CREATE_INVOICE_ERROR",

  GET_INVOICE_BY_CASE_ID = "action/GET_INVOICE_BY_CASE_ID",
  GET_INVOICE_BY_CASE_ID_SUCCESS = "action/GET_INVOICE_BY_CASE_ID_SUCCESS",
  GET_INVOICE_BY_CASE_ID_ERROR = "action/GET_INVOICE_BY_CASE_ID_ERROR",

  UPDATE_INVOICE = "action/UPDATE_INVOICE",
  UPDATE_INVOICE_SUCCESS = "action/UPDATE_INVOICE_SUCCESS",
  UPDATE_INVOICE_ERROR = "action/UPDATE_INVOICE_ERROR",

  SAVE_CASE_TASKS = "action/SAVE_CASE_TASKS",
  SAVE_CASE_TASKS_SUCCESS = "action/SAVE_CASE_TASKS_SUCCESS",
  SAVE_CASE_TASKS_ERROR = "action/SAVE_CASE_TASKS_ERROR",

  SAVE_CASE_REMAINDERS = "action/SAVE_CASE_REMAINDERS",
  SAVE_CASE_REMAINDERS_SUCCESS = "action/SAVE_CASE_REMAINDERS_SUCCESS",
  SAVE_CASE_REMAINDERS_ERROR = "action/SAVE_CASE_REMAINDERS_ERROR",

  UPDATE_TASK_STATUS = "action/UPDATE_TASK_STATUS",
  UPDATE_TASK_STATUS_SUCCESS = "action/UPDATE_TASK_STATUS_SUCCESS",
  UPDATE_TASK_STATUS_ERROR = "action/UPDATE_TASK_STATUS_ERROR",

  DELETE_CASE_TASKS = "action/DELETE_CASE_TASKS",
  DELETE_CASE_TASKS_SUCCESS = "action/DELETE_CASE_TASKS_SUCCESS",
  DELETE_CASE_TASKS_ERROR = "action/DELETE_CASE_TASKS_ERROR",

  SEND_REMAINDER = "action/SEND_REMAINDER",
  SEND_REMAINDER_SUCCESS = "action/SEND_REMAINDER_SUCCESS",
  SEND_REMAINDER_ERROR = "action/SEND_REMAINDER_ERROR",

  GET_ALL_REMAINDERS = "action/GET_ALL_REMAINDERS",
  GET_ALL_REMAINDERS_SUCCESS = "action/GET_ALL_REMAINDERS_SUCCESS",
  GET_ALL_REMAINDERS_ERROR = "action/GET_ALL_REMAINDERS_ERROR",

  SEND_MAIL = "action/SEND_MAIL",
  SEND_MAIL_SUCCESS = "action/SEND_MAIL_SUCCESS",
  SEND_MAIL_ERROR = "action/SEND_MAIL_ERROR",
  
  SEND_INVITE_MAIL = "action/SEND_INVITE_MAIL",
  SEND_INVITE_MAIL_SUCCESS = "action/SEND_INVITE_MAIL_SUCCESS",
  SEND_INVITE_MAIL_ERROR = "action/SEND_INVITE_MAIL_ERROR",

  SEND_APPOINTMENT = "action/SEND_APPOINTMENT",
  SEND_APPOINTMENT_SUCCESS = "action/SEND_APPOINTMENT_SUCCESS",
  SEND_APPOINTMENT_ERROR = "action/SEND_APPOINTMENT_ERROR",

  GET_ALL_APPOINTMENTS = "action/GET_ALL_APPOINTMENTS",
  GET_ALL_APPOINTMENTS_SUCCESS = "action/GET_ALL_APPOINTMENTS_SUCCESS",
  GET_ALL_APPOINTMENTS_ERROR = "action/GET_ALL_APPOINTMENTS_ERROR",

  GET_ALL_FROM_APPOINTMENTS = "action/GET_ALL_FROM_APPOINTMENTS",
  GET_ALL_FROM_APPOINTMENTS_SUCCESS = "action/GET_ALL_FROM_APPOINTMENTS_SUCCESS",
  GET_ALL_FROM_APPOINTMENTS_ERROR = "action/GET_ALL_FROM_APPOINTMENTS_ERROR",

  UPDATE_APPOINTMENT = "action/UPDATE_APPOINTMENT",
  UPDATE_APPOINTMENT_SUCCESS = "action/UPDATE_APPOINTMENT_SUCCESS",
  UPDATE_APPOINTMENT_ERROR = "action/UPDATE_APPOINTMENT_ERROR",

  DELETE_CASE_FILE = "action/DELETE_CASE_FILE",
  DELETE_CASE_FILE_SUCCESS = "action/DELETE_CASE_FILE_SUCCESS",
  DELETE_CASE_FILE_ERROR = "action/DELETE_CASE_FILE_ERROR",

  GET_ROLES = "action/GET_ROLES",
  GET_ROLES_SUCCESS = "action/GET_ROLES_SUCCESS",
  GET_ROLES_ERROR = "action/GET_ROLES_ERROR",

  UPDATE_ROLE = "action/UPDATE_ROLE",
  UPDATE_ROLE_SUCCESS = "action/UPDATE_ROLE_SUCCESS",
  UPDATE_ROLE_ERROR = "action/UPDATE_ROLE_ERROR",

  ADD_COMPANY_LAWYER = "action/ADD_COMPANY_LAWYER",
  ADD_COMPANY_LAWYER_SUCCESS = "action/ADD_COMPANY_LAWYER_SUCCESS",
  ADD_COMPANY_LAWYER_ERROR = "action/ADD_COMPANY_LAWYER_ERROR",

  CLEAR_ERROR = "action/CLEAR_ERROR",
  CLEAR_SUCCESS_MESSAGE = "action/CLEAR_SUCCESS_MESSAGE",

  SAVE_CASE_RESULT = "action/SAVE_CASE_RESULT",
  SAVE_CASE_RESULT_SUCCESS = "action/SAVE_CASE_RESULT_SUCCESS",
  SAVE_CASE_RESULT_ERROR = "action/SAVE_CASE_RESULT_ERROR",

  GET_HIGHCOURT = "action/GET_HIGHCOURT",
  GET_HIGHCOURT_SUCCESS = "action/GET_HIGHCOURT_SUCCESS",
  GET_HIGHCOURT_ERROR = "action/GET_HIGHCOURT_ERROR",

  CLEAR_SAVERESPONSE = "action/CLEAR_SAVERESPONSE",

  GET_DETAILS = "action/GET_DETAILS",
  GET_DETAILS_SUCCESS = "action/GET_DETAILS_SUCCESS",
  GET_DETAILS_ERROR = "action/GET_DETAILS_ERROR",

  SET_CURRENT_STATE = "action/SET_CURRENT_STATE",
  CLEAR_CURRENT_STATE = "action/CLEAR_CURRENT_STATE",
  CLEAR_ORDER = "action/CLEAR_ORDER",

  HIDE_CASE_NOTIFICATION = "action/ HIDE_CASE_NOTIFICATION",
  HIDE_CASE_NOTIFICATION_SUCCESS = "action/ HIDE_CASE_NOTIFICATION_SUCCESS",
  HIDE_CASE_NOTIFICATION_ERROR = "action/ HIDE_CASE_NOTIFICATION_ERROR",

  GET_FAVORITE_CASES = "action/GET_FAVORITE_CASES",
  GET_FAVORITE_CASES_SUCCESS = "action/GET_FAVORITE_CASES_SUCCESS",
  GET_FAVORITE_CASES_ERROR = "action/GET_FAVORITE_CASES_ERROR",

  ADD_FAVORITE_CASES = "action/ADD_FAVORITE_CASES",
  ADD_FAVORITE_CASES_SUCCESS = "action/ADD_FAVORITE_CASES_SUCCESS",
  ADD_FAVORITE_CASES_ERROR = "action/ADD_FAVORITE_CASES_ERROR",

  GET_CASE_BY_LAWYERID = "action/ GET_CASE_BY_LAWYERID",
  GET_CASE_BY_LAWYERID_SUCCESS = "action/ GET_CASE_BY_LAWYERID_SUCCESS",
  GET_CASE_BY_LAWYERID_ERROR = "action/ GET_CASE_BY_LAWYERID_ERROR",

  GET_JUDGEMENT_TEXT = "action/ GET_JUDGEMENT_TEXT",
  GET_JUDGEMENT_TEXT_SUCCESS = "action/ GET_JUDGEMENT_TEXT_SUCCESS",
  GET_JUDGEMENT_TEXT_ERROR = "action/ GET_JUDGEMENT_TEXT_ERROR",

  UPDATE_JUDGEMENT_TEXT_LOADED = "action/UPDATE_JUDGEMENT_TEXT_LOADED",

  UPDATE_NOTIFICATION_STATUS = "action/ UPDATE_NOTIFICATION_STATUS",
  UPDATE_NOTIFICATION_STATUS_SUCCESS = "action/ UPDATE_NOTIFICATION_STATUS_SUCCESS",
  UPDATE_NOTIFICATION_STATUS_ERROR = "action/ UPDATE_NOTIFICATION_STATUS_ERROR",

  CHANGE_PASSWORD = "action/CHANGE_PASSWORD",
  CHANGE_PASSWORD_SUCCESS = "action/CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_ERROR = "action/CHANGE_PASSWORD_ERROR",
  
  UPDATE_PROFILE = "action/UPDATE_PROFILE",
  UPDATE_PROFILE_SUCCESS = "action/UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_ERROR = "action/UPDATE_PROFILE_ERROR",

  GET_STATES = "action/GET_STATES",
  GET_STATES_SUCCESS = "action/GET_STATES_SUCCESS",
  GET_STATES_ERROR = "action/GET_STATES_ERROR",

  GET_CITY = "action/GET_CITY",
  GET_CITY_SUCCESS = "action/GET_CITY_SUCCESS",
  GET_CITY_ERROR = "action/GET_CITY_ERROR",

  GET_COURT = "action/GET_COURT",
  GET_COURT_SUCCESS = "action/GET_COURT_SUCCESS",
  GET_COURT_ERROR = "action/GET_COURT_ERROR",

  DATAGRID = "action/DATAGRID",

  GET_ALL_CASES = "action/GET_ALL_CASES",
  GET_ALL_CASES_SUCCESS = "action/GET_ALL_CASES_SUCCESS",
  GET_ALL_CASES_ERROR = "action/GET_ALL_CASES_ERROR",

  GET_ALL_USERS = "action/GET_ALL_USERS",
  GET_ALL_USERS_SUCCESS = "action/GET_ALL_USERS_SUCCESS",
  GET_ALL_USERS_ERROR = "action/GET_ALL_USERS_ERROR",

  SET_ROLE_TYPE = "action/SET_ROLE_TYPE",
  GET_REFERENCE_JUDGEMENT = "action/ GET_REFERENCE_JUDGEMENT",
  GET_REFERENCE_JUDGEMENT_SUCCESS = "action/ GET_REFERENCE_JUDGEMENT_SUCCESS",
  GET_REFERENCE_JUDGEMENT_ERROR = "action/ GET_REFERENCE_JUDGEMENT_ERROR",

  UPDATE_CASE_STATUS = "action/ UPDATE_CASE_STATUS",
  UPDATE_CASE_STATUS_SUCCESS = "action/ UPDATE_CASE_STATUS_SUCCESS",
  UPDATE_CASE_STATUS_ERROR = "action/ UPDATE_CASE_STATUS_ERROR",

  REASSIGN_INDIVIDUAL_LAWYER = "action/ REASSIGN_INDIVIDUAL_LAWYER",
  REASSIGN_INDIVIDUAL_LAWYER_SUCCESS = "action/ REASSIGN_INDIVIDUAL_LAWYER_SUCCESS",
  REASSIGN_INDIVIDUAL_LAWYER_ERROR = "action/ REASSIGN_INDIVIDUAL_LAWYER_ERROR",

  TRANSFER_INDIVIDUAL_LAWYER = "action/TRANSFER_INDIVIDUAL_LAWYER",
  TRANSFER_INDIVIDUAL_LAWYER_SUCCESS = "action/TRANSFER_INDIVIDUAL_LAWYER_SUCCESS",
  TRANSFER_INDIVIDUAL_LAWYER_ERROR = "action/TRANSFER_INDIVIDUAL_LAWYER_ERROR",

  AADHAAR_VERIFICATION = "action/AADHAAR_VERIFICATION",
  AADHAAR_VERIFICATION_SUCCESS = "action/AADHAAR_VERIFICATION_SUCCESS",
  AADHAAR_VERIFICATION_ERROR = "action/AADHAAR_VERIFICATION_ERROR",
  AADHAAR_OTP_SUBMIT = "action/AADHAAR_OTP_SUBMIT",
  AADHAAR_OTP_SUBMIT_SUCCESS = "action/AADHAAR_OTP_SUBMIT_SUCCESS",
  AADHAAR_OTP_SUBMIT_ERROR = "action/AADHAAR_OTP_SUBMIT_ERROR",  
  AAHDAAR_VERIFICATION_RESET = "action/AAHDAAR_VERIFICATION_RESET",
  AAHDAAR_OTP_RESET = "action/AAHDAAR_OTP_RESET",
  
}

export interface Action<T> {
  type: ActionType;
  payload: T;
}
export interface GetAllUserData {
  type: string | null;
}
export interface CityData {
  id: number | null;
}
export interface FavoriteData {
  favorites: string | null;
  caseId: number | null;
  lawyerId: number | null;
}

export interface LoginData {
  email: string | null;
  password: string | null;
  userType: string | null;
}

export interface TaskData {
  id: number;
  caseId: number;
  userId: number | null;
  taskName: string | null;
  userName: string | null;
  remainder: string | null;
  description: string | null;
  phaseName: string | null;
  created: Date | null;
  deadlineDate: Date | null;
  taskStatus: string | null;
}
export interface RemainderData {
  caseId: number;
  userId: number | null;
  userName: string | null;
  taskName: string | null;
  remainderDate: Date | null;
  created: Date | null;
  deadlineDate: Date | null;
}
export interface ForgotPasswordData {
  email: string | null;
  type: string | null;
}

export interface FindALawyerData {
  product?: string | null;
  subProduct?: string | null;
  practisingcourt?: string | null;
  location?: string | null;
  skip?: number | 0;
  limit?: number | 0;
  city?: string | null;
  languagesKnown?: string | null;
  selectedProfile?:any;
}

export interface FindJudgementData {
  description: string | null;
}

export interface ResetPasswordData {
  password: string | null;
  id: string | null;
  type: string | null;
}

export interface fileInfo {
  fileName: string | null;
  filePath: string | null;
}


interface CaseInquiry {
  caseTitle: string;
  description: string;
  product: string;
  court: string;
  area: string;
  city: string;
  subproduct: string;
  dueDate: Date;
  clientId: number;
  clientName: string;
  companyId: number;
  companyName: string;
}


export interface SaveCaseInquiryData {
  tempCaseID: number;
  caseinquiry: CaseInquiry;
  caselawyers: any[];
}


export interface FileUploadData {
  formData: any;
  type?: string | null;
  contenttype?: string | null;
  caseId: number | null;
  folder?: string | null;
  folderId?: number | null;
  uploadedBy?: number;
}

export interface GetCaseListData {
  id: number | null;
  type?: string | null;
  roleId?: string | null;
  userId?: string | null;
}
export interface GetHearingsByCaseId {
  caseId: number | null;
  userId: number | null

}
export interface GetJudgementUrlData {
  filename?: string | null;
  s3key?: string|null;
}

export interface SaveCaseNotesData {
  caseId: number;
  clientId: number | null;
  lawyerId: number | null;
  clientName: string | null;
  lawyerName: string | null;
  title: string | null;
  notes: string | null;
  phaseName: string | null;
  status: number | null;
  created: Date | null;
}
export interface SaveCaseContactData {
  caseId: number;
  lawyerId: number | null;
  lawyerName: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactMobileNo: number | null;
  created: Date | null;
}
export interface GetCaseNotesData {
  caseId: number;
  lawyerId: number | null;
  clientId: number | null;
}
export interface DeleteCaseNotesData {
  id: number;
}
export interface DeleteCaseContactData {
  id: number;
}
export interface UpdateCaseNotesData {
  id: number;
  notes: string | null;
  created: Date | null;

}

export interface AcceptCaseData {
  id: number;
  caseId: number;
  lawyerId: number;
  phaseName_1: string;
  phaseName_2: string;
  phaseName_3: string;
  phaseName_4: string;
  phaseName_5: string;
  phaseName_6: string;
  phaseName_7: string;
  phaseName_8: string;
  phaseStatus_1: number;
  phaseStatus_2: number;
  phaseStatus_3: number;
  phaseStatus_4: number;
  phaseStatus_5: number;
  phaseStatus_6: number;
  phaseStatus_7: number;
  phaseStatus_8: number;
  phasePayment_1: number;
  phasePayment_2: number;
  phasePayment_3: number;
  phasePayment_4: number;
  phasePayment_5: number;
  phasePayment_6: number;
  phasePayment_7: number;
  phasePayment_8: number;
  lawyerName: string;
  statusArray: string;
  status: string;
}

export interface GetCaseFileData {
  caseId: number;
  fileName: string;
  folderId?: number;
}

export interface CreateOrderParam {
  amount: number;
  currency: string;
  receipt: string;
  notes: string;
}

export interface GetCaseListParam {
  lawyerId: number;
}

export interface ReAssignLawyerParam {
  caseId: number;
  newLawyerId: number;
  oldLawyerId: number;
}

export interface SaveHearing {
  caseId: number;
  lawyerId: number;
  clientId: number;
  purpose: string;
  description: string;
  date: Date;
  created: Date;
  modified: Date;
}
export interface NotificationData {
  caseId: number;
  fromId: number | null;
  fromName: string | null;
  toId: number | null;
  toName: string | null;
  notification: string | null;
  created: Date | null;
  type: string | null;
  notificationStatus: number | null;
  readByUser: string | null;
}
export interface GetNotificationData {
  clientId: number | null;
  lawyerId: number | null;
  id: number;
  type: string | null;
}
export interface RemainderData {
  caseId: number;
  userId: number | null;
  userName: string | null;
  taskId: number | null;
  taskName: string | null;
  deadlineDate: Date | null;
  created: Date | null;
  remainderDate: Date | null;
  type: string | null;
}
export interface GetRemainderData {
  id: number;
  type: string
}

export interface MailData {
  from: string | null;
  to: string | null;
  subject: string | null;
  emailContent: string | null;
}
export interface InviteMailData {
  from: string | null;
  to: string | null;
  name: string | null;
}
export interface AppointmentData {
  caseId: number;
  fromId: number | null;
  fromName: string | null;
  toId: number | null;
  toName: string | null;
  message: string | null;
  created: Date | null;
  appointmentDate: Date | null;
  appointmentStatus: string | null;
  type: string | null;
}
export interface GetAppointmentData {
  id: number;
  type: string;
}
export interface UpdateAppointmentData {
  id: number;
  appointmentStatus: string | null;
}
export interface CaseResultData {
  caseId: number;
  caseResult: string | null;
}
export interface GetHighCourtData {
  courtType: string;
}
export interface HideNotificationData {
  caseId: number;
}
export interface UpdateNotificationData {
  id: number;
  readByUser: string;

}
export interface ChangePasswordData {
  id: number;
  oldPassword: string | null;
  password: string | null;
  type: string | null;
}