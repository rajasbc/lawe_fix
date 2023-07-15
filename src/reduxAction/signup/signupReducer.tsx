import { Action, ActionType } from "../../model/model";
import createReducer from "../createReducer";


export interface SignUpReducerType {
  loading: boolean;
  error?: string;
  status?: any;
  firmRes?:any;
  success?:any;
  aadhaarOtpGeneration?: any;  
  aadhaarOtpVerified?: any;
}
const defaultState: SignUpReducerType = {
  loading: false,
  error: undefined,
  status: undefined,
  firmRes: null,
  success: null,
  aadhaarOtpGeneration: null,
  aadhaarOtpVerified: null,
}



export const signUpReducer = createReducer<SignUpReducerType>(defaultState, {

  [ActionType.SIGNUP_USER](state:SignUpReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      error: null,
      status: null,
      success: null,
    };
  },

  [ActionType.SIGNUP_USER_ERROR](state: SignUpReducerType, action: Action<any>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SIGNUP_USER_SUCCESS](state: SignUpReducerType, action: Action<any>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      status: action.payload,
      success: "Signup Process Completed Successfully",
    };
  },
  [ActionType.SIGNUP_USER_COMPANY_LAWYER](state:SignUpReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      error: null,
      firmRes: null,
      success: null,
    };
  },

  [ActionType.SIGNUP_USER_COMPANY_LAWYER_ERROR](state: SignUpReducerType, action: Action<any>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SIGNUP_USER_COMPANY_LAWYER_SUCCESS](state: SignUpReducerType, action: Action<any>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      firmRes: action.payload,
      success: "Signup Firm Completed Successfully",
    };
  },

  [ActionType.SIGNUP_RESET](state: SignUpReducerType, action: Action<any>) {
  
    return {
      ...state,
      error: null,
      status: null,
      firmRes:null,
    };
  },

  [ActionType.CLEAR_ERROR](state:SignUpReducerType, action: Action<number>) {
    return {
      ...state,
      error: null,
    };
  },

  [ActionType.CLEAR_SUCCESS_MESSAGE](state:SignUpReducerType, action: Action<number>) {
    return {
      ...state,
      success: null,
    };
  },
  [ActionType.AADHAAR_VERIFICATION](state: SignUpReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,      
      aadhaarOtpGeneration: null,
      success: null,
    };
  },

  [ActionType.AADHAAR_VERIFICATION_ERROR](state: SignUpReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.AADHAAR_VERIFICATION_SUCCESS](state: SignUpReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,      
      aadhaarOtpGeneration: action.payload,
      success: "Aadhaar OTP Sent",
    };
  },

  [ActionType.AADHAAR_OTP_SUBMIT](state: SignUpReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      success: null,
      aadhaarOtpVerified: null,
    };
  },

  [ActionType.AADHAAR_OTP_SUBMIT_ERROR](state: SignUpReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.AADHAAR_OTP_SUBMIT_SUCCESS](state: SignUpReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Aadhaar Verified",
      aadhaarOtpVerified: action.payload,
    };
  },
  [ActionType.AAHDAAR_VERIFICATION_RESET](state: SignUpReducerType, action: Action<any>) {
  
    return {
      ...state,
      error: null,
      status: null,
      aadhaarOtpGeneration: null,
    };
  },
  [ActionType.AAHDAAR_OTP_RESET](state: SignUpReducerType, action: Action<any>) {
  
    return {
      ...state,
      error: null,
      status: null,
      aadhaarOtpVerified: null,
    };
  },  
});
