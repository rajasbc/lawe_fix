import { SaveCaseInquiryData, FileUploadData, ActionType } from '../../model/model';
import { NotificationData } from '../../model/model';

export const saveCaseInquiryAction = (payload: SaveCaseInquiryData) => {
  return {
    type: ActionType.SAVE_CASE_INQUIRY,
    payload:{data:payload}
  }
};

export const uploadFileAction = (payload: FileUploadData) => {
  return {
    type: ActionType.UPLOAD_CASE_INQUIRY_FILE,
    payload
  }
};

export const resetCaseInquiryAction = () => {
  return {
    type: ActionType.RESET_SAVE_CASE_INQUIRY,
  }
};

export const sendNotification = (payload: NotificationData) => {
  return {
    type: ActionType.SEND_NOTIFICATION_BACK,
    payload
  }
};
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

