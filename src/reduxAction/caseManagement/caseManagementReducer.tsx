import { Action, ActionType, SaveCaseNotesData, GetCaseNotesData, AcceptCaseData, GetCaseFileData, GetCaseListData } from "../../model/model";
import { AppointmentData, CaseResultData, DeleteCaseContactData, DeleteCaseNotesData, FileUploadData, GetHearingsByCaseId, GetHighCourtData, HideNotificationData, InviteMailData, MailData, NotificationData, RemainderData, SaveCaseContactData, TaskData, UpdateCaseNotesData, UpdateNotificationData } from "../../model/model";
import createReducer from "../createReducer";


export interface caseManagementReducerType {
  loading: boolean;
  error?: string;
  notes: any;
  stage: any;
  selectedCaseInfo: any;
  caseFiles: any;
  caesFile: any;
  casehearingslist: any;
  caseFolderResponse: any;
  caseFileResponse: any;
  caseDocuments: any;
  connectedMattersResponse: any;
  connectedMatters: any;
  updateCaseDetails: any;
  relatedJudgements: any;
  invoiceRes: any;
  invoices: any;
  updateRes: any;
  saveContactResponse: any;
  uploadFileResponse: any;
  deleteFileRes: any;
  highCourt: any;
  success: string;
  currentState: string;
  cases: any;
  notifysend: any;
  transferLawyerSuccess: boolean;

}
const defaultState: caseManagementReducerType = {
  notes: [],
  stage: [],
  loading: false,
  error: undefined,
  selectedCaseInfo: undefined,
  caseFiles: undefined,
  caesFile: undefined,
  casehearingslist: null,
  caseFolderResponse: null,
  caseFileResponse: null,
  caseDocuments: null,
  connectedMattersResponse: null,
  connectedMatters: null,
  updateCaseDetails: null,
  relatedJudgements: null,
  invoiceRes: null,
  invoices: null,
  updateRes: null,
  saveContactResponse: null,
  uploadFileResponse: null,
  deleteFileRes: null,
  highCourt: null,
  success: null,
  currentState: null,
  cases: null,
  notifysend: null,
  transferLawyerSuccess: false,
}

export const caseManagementReducer = createReducer<caseManagementReducerType>(defaultState, {

  [ActionType.SAVE_CASE_NOTES](state: caseManagementReducerType, action: Action<SaveCaseNotesData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
    };
  },

  [ActionType.SAVE_CASE_NOTES_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CASE_NOTES_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Case Note Saved Successfully",
    };
  },

  [ActionType.DELETE_CASE_NOTES](state: caseManagementReducerType, action: Action<DeleteCaseNotesData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
    };
  },

  [ActionType.DELETE_CASE_NOTES_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.DELETE_CASE_NOTES_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Case Note Deleted Successfully",
    };
  },

  [ActionType.UPDATE_CASE_NOTES](state: caseManagementReducerType, action: Action<UpdateCaseNotesData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
    };
  },

  [ActionType.UPDATE_CASE_NOTES_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPDATE_CASE_NOTES_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Case Note Updated Successfully",
    };
  },


  [ActionType.GET_CASE_NOTES](state: caseManagementReducerType, action: Action<GetCaseNotesData>) {
    return {
      ...state,
      error: null,
      loading: true,
      notes: null,
    };
  },

  [ActionType.GET_CASE_NOTES_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CASE_NOTES_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      notes: action.payload,
    };
  },

  
  [ActionType.GET_CASE_LIST](state:caseManagementReducerType, action: Action<GetCaseListData>) {
    return {
      ...state,
      error: null,
      loading: true,
      
    };
  },

  [ActionType.GET_CASE_LIST_ERROR](state: caseManagementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CASE_LIST_SUCCESS](state: caseManagementReducerType, action: any) {
    return {
      ...state,
      loading: false,
      error: null,
      caseFiles: (action?.payload?.cases && action?.payload?.cases?.length>0) ? action?.payload?.cases : state?.caseFiles,
    };
  },

  [ActionType.SET_SELECTED_CASE](state: caseManagementReducerType, action: Action<GetCaseNotesData>) {
    return {
      ...state,
      loading: false,
      error: null,
      selectedCaseInfo: action.payload,
    };
  },

  [ActionType.GET_CASE_STAGE](state: caseManagementReducerType, action: Action<GetCaseNotesData>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.GET_CASE_STAGE_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CASE_STAGE_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      stage: action.payload,
    };
  },

  [ActionType.ACCEPT_CASE](state: caseManagementReducerType, action: Action<AcceptCaseData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
    };
  },

  [ActionType.ACCEPT_CASE_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.ACCEPT_CASE_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      stage: [action.payload],
      success: "Case Detail Updated Successfully",
    };
  },

  [ActionType.GET_CASE_FILE](state: caseManagementReducerType, action: Action<GetCaseFileData>) {
    return {
      ...state,
      error: null,
      caesFile: undefined,
      loading: true,
    };
  },

  [ActionType.GET_CASE_FILE_SUCCESS](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      caesFile: action.payload,
    };
  },

  [ActionType.GET_CASE_FILE_ERROR](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      caesFile: action.payload,
    };
  },
  [ActionType.UPLOAD_CASE_FILE](state: caseManagementReducerType, action: Action<FileUploadData>) {
    return {
      ...state,
      error: null,
      loading: true,
      uploadFileResponse: undefined,
      success: null,
    };
  },

  [ActionType.UPLOAD_CASE_FILE_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPLOAD_CASE_FILE_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      uploadFileResponse: action.payload,
      success: "File Uploaded Successfully",
    };
  },

  [ActionType.GET_CASE_HEARINGS](state: caseManagementReducerType, action: Action<GetHearingsByCaseId>) {
    return {
      ...state,
      error: null,
      loading: true,
      casehearinglist: null,
    };
  },

  [ActionType.GET_CASE_HEARINGS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CASE_HEARINGS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      casehearingslist: action.payload
    };
  },

  [ActionType.GET_CASE_DOCUMENTS](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      caseDocuments: null,
    };
  },

  [ActionType.GET_CASE_DOCUMENTS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CASE_DOCUMENTS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      caseDocuments: action.payload
    };
  },
  [ActionType.SAVE_CONNECTED_MATTERS](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      connectedMattersResponse: null,
    };
  },

  [ActionType.SAVE_CONNECTED_MATTERS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CONNECTED_MATTERS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      connectedMattersResponse: action.payload,
    };
  },
  [ActionType.GET_CONNECTED_MATTERS](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      connectedMatters: null,
    };
  },

  [ActionType.GET_CONNECTED_MATTERS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CONNECTED_MATTERS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      connectedMatters: action.payload
    };
  },
  [ActionType.UPDATE_CASE_DETAILS](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      updateCaseDetails: null,
      success: null,
    };
  },

  [ActionType.UPDATE_CASE_DETAILS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPDATE_CASE_DETAILS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      updateCaseDetails: action.payload,
      success: "Case Details Updated Successfully",
    };
  },
  [ActionType.GET_RELATED_JUDGEMENTS](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      relatedJudgements: null,
    };
  },

  [ActionType.GET_RELATED_JUDGEMENTS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_RELATED_JUDGEMENTS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      relatedJudgements: action.payload
    };
  },

  [ActionType.SAVE_CASE_CONTACT](state: caseManagementReducerType, action: Action<SaveCaseContactData>) {
    return {
      ...state,
      error: null,
      loading: true,
      saveContactResponse: null,
      success: null,
    };
  },

  [ActionType.SAVE_CASE_CONTACT_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CASE_CONTACT_SUCCESS](state: caseManagementReducerType, action: any) {
    let message = "";
    let message1 = "";
    if (action.payload.response === "User Not Exists") {
      message1 = "User Not Exists"
    } else {
      message = "Contact Saved Successfully"
    }
    return {
      ...state,
      loading: false,
      error: message1,
      saveContactResponse: action.payload,
      success: message,
    };
  },

  [ActionType.SAVE_CASE_TASKS](state: caseManagementReducerType, action: Action<TaskData>) {
    return {
      ...state,
      error: null,
      loading: true,
      saveContactResponse: null,
      success: null,
    };
  },

  [ActionType.SAVE_CASE_TASKS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CASE_TASKS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Task Saved Successfully",
    };
  },

  [ActionType.SAVE_CASE_REMAINDERS](state: caseManagementReducerType, action: Action<RemainderData>) {
    return {
      ...state,
      error: null,
      loading: true,
      saveContactResponse: null,
    };
  },

  [ActionType.SAVE_CASE_REMAINDERS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CASE_REMAINDERS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },



  [ActionType.DELETE_CASE_CONTACT](state: caseManagementReducerType, action: Action<DeleteCaseContactData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
    };
  },

  [ActionType.DELETE_CASE_CONTACT_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.DELETE_CASE_CONTACT_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Contact Deleted Successfully",
    };
  },

  [ActionType.SEND_NOTIFICATION](state: caseManagementReducerType, action: Action<NotificationData>) {
    return {
      ...state,
      error: null,
      loading: true,
      notifysend: null,
    };
  },

  [ActionType.SEND_NOTIFICATION_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SEND_NOTIFICATION_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success : "Notification sent Successfully",
      notifysend: action.payload
    };
  },

  [ActionType.CREATE_INVOICE](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      invoiceRes: null,
    };
  },

  [ActionType.CREATE_INVOICE_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.CREATE_INVOICE_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      invoiceRes: action.payload
    };
  },
  [ActionType.GET_INVOICE_BY_CASE_ID](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      invoices: null,
    };
  },

  [ActionType.GET_INVOICE_BY_CASE_ID_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_INVOICE_BY_CASE_ID_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      invoices: action.payload
    };
  },
  [ActionType.UPDATE_INVOICE](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      updateRes: null,
      success: null,
    };
  },

  [ActionType.UPDATE_INVOICE_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPDATE_INVOICE_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      updateRes: action.payload,
      success: "Invoice Send Successfully",
    };
  },

  [ActionType.UPDATE_TASK_STATUS](state: caseManagementReducerType, action: Action<TaskData>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.UPDATE_TASK_STATUS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPDATE_TASK_STATUS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [ActionType.DELETE_CASE_TASKS](state: caseManagementReducerType, action: Action<TaskData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
    };
  },

  [ActionType.DELETE_CASE_TASKS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.DELETE_CASE_TASKS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Task Deleted Successfully",
    };
  },

  [ActionType.SEND_REMAINDER](state: caseManagementReducerType, action: Action<RemainderData>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.SEND_REMAINDER_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SEND_REMAINDER_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null
    };
  },

  [ActionType.SEND_MAIL](state: caseManagementReducerType, action: Action<MailData>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.SEND_MAIL_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SEND_MAIL_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null
    };
  },
  
  [ActionType.SEND_INVITE_MAIL](state: caseManagementReducerType, action: Action<InviteMailData>) {

    return {
      ...state,
      error: null,
      loading: true,
    };
  }, 
  
  
  [ActionType.SEND_INVITE_MAIL_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SEND_INVITE_MAIL_SUCCESS](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      success: "Invitation Mail sended Successfully"
    };
  },

  [ActionType.SEND_APPOINTMENT](state: caseManagementReducerType, action: Action<AppointmentData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
    };
  },

  [ActionType.SEND_APPOINTMENT_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SEND_APPOINTMENT_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Appoinment Created Successfully"
    };
  },

  [ActionType.UPDATE_APPOINTMENT](state: caseManagementReducerType, action: Action<AppointmentData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: "Appointment updated Successfully"
    };
  },

  [ActionType.UPDATE_APPOINTMENT_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPDATE_APPOINTMENT_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null
    };
  },
  [ActionType.DELETE_CASE_FILE](state: caseManagementReducerType, action: Action<{ s3Key: string, caseId: number, id: number }>) {
    return {
      ...state,
      error: null,
      loading: true,
      deleteFileRes: null,
      success: null,
    };
  },

  [ActionType.DELETE_CASE_FILE_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.DELETE_CASE_FILE_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      deleteFileRes: action.payload,
      success: "File Deleted Successfully",
    };
  },
  [ActionType.SAVE_CASE_FOLDER](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      caseFolderResponse: null,
    };
  },

  [ActionType.SAVE_CASE_FOLDER_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CASE_FOLDER_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      caseFolderResponse: action.payload
    };
  },
  [ActionType.SAVE_CASE_FILE](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      caseFileResponse: null,
      success: null,
    };
  },

  [ActionType.SAVE_CASE_FILE_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CASE_FILE_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      caseFileResponse: action.payload,
      success: "File Saved Successfully",
    };
  },

  [ActionType.CLEAR_ERROR](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      error: null,
    };
  },

  [ActionType.CLEAR_SUCCESS_MESSAGE](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      success: null,
    };
  },

  [ActionType.SAVE_CASE_RESULT](state: caseManagementReducerType, action: Action<CaseResultData>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.SAVE_CASE_RESULT_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CASE_RESULT_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [ActionType.GET_HIGHCOURT](state: caseManagementReducerType, action: Action<GetHighCourtData>) {
    return {
      ...state,
      error: null,
      loading: true,
      highCourt: null,
    };
  },

  [ActionType.GET_HIGHCOURT_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_HIGHCOURT_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      highCourt: action.payload
    };
  },

  [ActionType.CLEAR_SAVERESPONSE](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      saveContactResponse: null,
    };
  },
  [ActionType.SET_CURRENT_STATE](state:caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      currentState: action.payload,
    };
  },
  [ActionType.CLEAR_CURRENT_STATE](state:caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      currentState: null,
    };
  },

  [ActionType.HIDE_CASE_NOTIFICATION](state: caseManagementReducerType, action: Action<HideNotificationData>) {
    return {
      ...state,
      loading: true,
    };
  },

  [ActionType.HIDE_CASE_NOTIFICATION_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
    };
  },

  [ActionType.HIDE_CASE_NOTIFICATION_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
    };
  },

  [ActionType.GET_CASE_BY_LAWYERID](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      error:null,
      success: null,
    };
  },

  [ActionType.GET_CASE_BY_LAWYERID_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error:action.payload,
    };
  },

  [ActionType.GET_CASE_BY_LAWYERID_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      cases: action.payload,
    };
  },
 
  [ActionType.UPDATE_NOTIFICATION_STATUS](state: caseManagementReducerType, action: Action<UpdateNotificationData>) {
    return {
      ...state,
      loading: true,
      error:null,
      success: null,
    };
  },

  [ActionType.UPDATE_NOTIFICATION_STATUS_ERROR](state: caseManagementReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error:action.payload,
    };
  },

  [ActionType.UPDATE_NOTIFICATION_STATUS_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
    };
  },

  [ActionType.GET_NOTI_BY_CASEID](state:caseManagementReducerType, action: Action<GetCaseListData>) {
    return {
      ...state,
      error: null,
      loading: true,
      
    };
  },

  [ActionType.GET_NOTI_BY_CASEID_ERROR](state: caseManagementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_NOTI_BY_CASEID_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      notiBycaseId: action.payload,
    };
  },

  [ActionType.TRANSFER_INDIVIDUAL_LAWYER](state: caseManagementReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
      transferLawyerSuccess: false,
    };
  },

  [ActionType.TRANSFER_INDIVIDUAL_LAWYER_ERROR](state: caseManagementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.TRANSFER_INDIVIDUAL_LAWYER_SUCCESS](state: caseManagementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Case Successfully Transferred",
      transferLawyerSuccess: true,
    };
  },



});
