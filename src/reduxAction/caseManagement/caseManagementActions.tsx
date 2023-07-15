import { DeleteCaseContactData, DeleteCaseNotesData, GetHearingsByCaseId, NotificationData, SaveCaseContactData, UpdateCaseNotesData, ActionType, FileUploadData, RemainderData, TaskData, MailData, AppointmentData, UpdateAppointmentData, CaseResultData, GetHighCourtData, HideNotificationData, UpdateNotificationData } from '../../model/model';
import { SaveCaseNotesData, GetCaseNotesData, AcceptCaseData, GetCaseFileData, GetCaseListData } from '../../model/model';

export const saveCaseNotes = (payload: SaveCaseNotesData) => {
 
  return {
    type: ActionType.SAVE_CASE_NOTES,
    payload
  }
};
export const getCaseNotes = (payload: GetCaseNotesData) => {
  return {
    type: ActionType.GET_CASE_NOTES,
    payload
  }
};

export const getCaseListAction = (payload: GetCaseListData) => {
  return {
    type: ActionType.GET_CASE_LIST,
    payload
  }
};

export const setSelectedCase = (payload: any) => {
  return {
    type: ActionType.SET_SELECTED_CASE,
    payload
  }
};

export const getCaseStage = (payload: GetCaseNotesData) => {
  return {
    type: ActionType.GET_CASE_STAGE,
    payload
  }
};

export const acceptCase = (payload: AcceptCaseData) => {
  return {
    type: ActionType.ACCEPT_CASE,
    payload
  }
};

export const getCaseFile = (payload: GetCaseFileData) => {
  return {
    type: ActionType.GET_CASE_FILE,
    payload
  }
};
export const uploadCaseFileAction = (payload: FileUploadData) => {
    return {
      type: ActionType.UPLOAD_CASE_FILE,
      payload
    }
};

export const saveCaseContacts = (payload: SaveCaseContactData) => {
  return {
    type: ActionType.SAVE_CASE_CONTACT,
    payload
  }
};
export const deleteCaseNotes = (payload: DeleteCaseNotesData) => {
 
  return {
    type: ActionType.DELETE_CASE_NOTES,
    payload
  }
};
export const deleteCaseContacts = (payload: DeleteCaseContactData) => {
 
  return {
    type: ActionType.DELETE_CASE_CONTACT,
    payload
  }
};
export const updateCaseNotes = (payload: UpdateCaseNotesData) => {
 
  return {
    type: ActionType.UPDATE_CASE_NOTES,
    payload
  }
};
export const getHearingsByCaseId = (payload: GetHearingsByCaseId) => {
  return {
    type: ActionType.GET_CASE_HEARINGS,
    payload
  }
};
export const saveCaseFolder = (payload: any) => {
  return {
    type: ActionType.SAVE_CASE_FOLDER,
    payload
  }
};
export const saveCaseFile = (payload: any) => {
  return {
    type: ActionType.SAVE_CASE_FILE,
    payload
  }
};
export const getCaseDocuments = (payload: any) => {
  return {
    type: ActionType.GET_CASE_DOCUMENTS,
    payload
  }
};
export const saveConnectedMatters = (payload: any) => {
  return {
    type: ActionType.SAVE_CONNECTED_MATTERS,
    payload
  }
};
export const getConnectedMatters = (payload: any) => {
  return {
    type: ActionType.GET_CONNECTED_MATTERS,
    payload
  }
};
export const updateCaseDetails = (payload: any) => {
  return {
    type: ActionType.UPDATE_CASE_DETAILS,
    payload
  }
};
export const getRelatedJudgements = (payload: any) => {
  return {
    type: ActionType.GET_RELATED_JUDGEMENTS,
    payload
  }
};
export const sendNotification = (payload: NotificationData) => {
  return {
    type: ActionType.SEND_NOTIFICATION,
    payload
  }
};
export const createInvoice = (payload: any) => {
  return {
    type: ActionType.CREATE_INVOICE,
    payload
  }
};
export const getInvoiceByCaseId = (payload: any) => {
  return {
    type: ActionType.GET_INVOICE_BY_CASE_ID,
    payload
  }
};
export const updateInvoice = (payload: any) => {
  return {
    type: ActionType.UPDATE_INVOICE,
    payload
  }
};
export const saveCaseTasks = (payload: any) => {
  return {
    type: ActionType.SAVE_CASE_TASKS,
    payload
  }
};
export const saveCaseRemainders = (payload: any) => {
  return {
    type: ActionType.SAVE_CASE_REMAINDERS,
    payload
  }
};
export const updateTaskStatus = (payload: TaskData) => {
  return {
    type: ActionType.UPDATE_TASK_STATUS,
    payload
  }
};
export const deleteCaseTasks = (payload: TaskData) => {
  return {
    type: ActionType.DELETE_CASE_TASKS,
    payload
  }
};
export const sendRemainder = (payload: RemainderData) => {
  return {
    type: ActionType.SEND_REMAINDER,
    payload
  }
};
export const sendMail = (payload: MailData) => {
  return {
    type: ActionType.SEND_MAIL,
    payload
  }
};

export const sendInviteMail = (payload: MailData) => {
  return {
    type: ActionType.SEND_INVITE_MAIL,
    payload
  }
};

export const sendAppointment = (payload: AppointmentData) => {
  return {
    type: ActionType.SEND_APPOINTMENT,
    payload
  }
};
export const updateAppointment = (payload: UpdateAppointmentData) => {
  return {
    type: ActionType.UPDATE_APPOINTMENT,
    payload
  }
};
export const deleteCaseFile = (payload: {s3Key:string,caseId:number,id:number}) => {
  return {
    type: ActionType.DELETE_CASE_FILE,
    payload
  }
};
export const saveCaseResult = (payload: CaseResultData) => {
  return {
    type: ActionType.SAVE_CASE_RESULT,
    payload
  }
};
export const getHighCourt = (payload: GetHighCourtData) => {
  return {
    type: ActionType.GET_HIGHCOURT,
    payload
  }
};
export const clearResponse = (payload:any) => {
  return {
    type: ActionType.CLEAR_SAVERESPONSE,
  }};

export const clearError = (payload:any) => {
  return {
    type: ActionType.CLEAR_ERROR,
    payload
  }
};
export const clearSuccess = (payload:any) => {
  return {
    type: ActionType.CLEAR_SUCCESS_MESSAGE,
    payload
  }
};
export const setCurrentState = (payload:any) => {
  return {
    type: ActionType.SET_CURRENT_STATE,
    payload
  }
};
export const clearCurrentState = (payload:any) => {
  return {
    type: ActionType.CLEAR_CURRENT_STATE,
    payload
  }
};
export const hideNotification = (payload:HideNotificationData) => {
  return {
    type: ActionType.HIDE_CASE_NOTIFICATION,
    payload
  }
};
export const getCaseByLawyerId = (payload:any) => {
  return {
    type: ActionType.GET_CASE_BY_LAWYERID,
    payload
  }
};
export const updateNotificationStatus = (payload: UpdateNotificationData) => {
  return {
    type: ActionType.UPDATE_NOTIFICATION_STATUS,
    payload
  }
};
export const getNotiByCaseId = (payload: GetCaseListData) => {
  return {
    type: ActionType.GET_NOTI_BY_CASEID,
    payload
  }
};
export const transferIndividualLawyer = (payload:any) => {
  return {
    type: ActionType.TRANSFER_INDIVIDUAL_LAWYER,
    payload
  }
};
