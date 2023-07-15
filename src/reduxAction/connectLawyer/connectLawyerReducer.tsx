import { Action, ActionType, SaveCaseInquiryData, FileUploadData } from "../../model/model";
import { NotificationData } from "../../model/model";
import createReducer from "../createReducer";


export interface SaveCaseInquiryReducerType {
  saveCaseInquiry: any;
  loading: boolean;
  error?: string;
  uploadFileResponse: any;
  success: any;
}
const defaultState: SaveCaseInquiryReducerType = {
  saveCaseInquiry: undefined,
  loading: false,
  error: undefined,
  uploadFileResponse: undefined,
  success: null,
}



export const saveCaseInquiryReducer = createReducer<SaveCaseInquiryReducerType>(defaultState, {

  [ActionType.SAVE_CASE_INQUIRY](state:SaveCaseInquiryReducerType, action: Action<SaveCaseInquiryData>) {
    return {
      ...state,
      error: null,
      loading: true,
      uploadFileResponse: undefined,
      success: null,
    };
  },

  [ActionType.SAVE_CASE_INQUIRY_ERROR](state: SaveCaseInquiryReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_CASE_INQUIRY_SUCCESS](state: SaveCaseInquiryReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      saveCaseInquiry: action.payload,
      success: "Inquiry Submitted Successfully",
    };
  },

  [ActionType.RESET_SAVE_CASE_INQUIRY](state: SaveCaseInquiryReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      saveCaseInquiry: undefined,
      uploadFileResponse: undefined,
      success: null,
    };
  },

  [ActionType.UPLOAD_CASE_INQUIRY_FILE](state:SaveCaseInquiryReducerType, action: Action<FileUploadData>) {
    return {
      ...state,
      error: null,
      loading: true,
      uploadFileResponse: undefined,
      success: null,
    };
  },

  [ActionType.UPLOAD_CASE_INQUIRY_FILE_ERROR](state: SaveCaseInquiryReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPLOAD_CASE_INQUIRY_FILE_SUCCESS](state: SaveCaseInquiryReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      uploadFileResponse: action.payload,
      success: "File Uploaded Successfully",
    };
  },

  [ActionType.CLEAR_ERROR](state:SaveCaseInquiryReducerType, action: Action<number>) {
    return {
      ...state,
      error: null,
    };
  },
  
  [ActionType.CLEAR_SUCCESS_MESSAGE](state:SaveCaseInquiryReducerType, action: Action<number>) {
    return {
      ...state,
      success: null,
    };
  },

  [ActionType.SEND_NOTIFICATION_BACK](state:SaveCaseInquiryReducerType, action: Action<NotificationData>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.SEND_NOTIFICATION_BACK_ERROR](state: SaveCaseInquiryReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SEND_NOTIFICATION_BACK_SUCCESS](state: SaveCaseInquiryReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },
});
