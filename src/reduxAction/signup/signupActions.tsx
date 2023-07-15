import { ActionType } from '../../model/model';

export const signupUserAction = (payload:any) => {
  return {
    type: ActionType.SIGNUP_USER,
    payload
  }
};

export const resetSignUpFormAction = () => {
  return {
    type: ActionType.SIGNUP_RESET
  }
};

export const signupComanyLawyerUserAction = (payload: any) => {
  return {
    type: ActionType.SIGNUP_USER_COMPANY_LAWYER,
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

export const aadhaarVerification = (payload:any) => {
  return {
    type: ActionType.AADHAAR_VERIFICATION,
    payload
  }
};

export const aadhaarOTPVerification = (payload:any) => {
  return {
    type: ActionType.AADHAAR_OTP_SUBMIT,
    payload
  }
};
export const resetAadhaarVerification = () => {
  return {
    type: ActionType.AAHDAAR_VERIFICATION_RESET
  }
};

export const resetOtp = () => {
  return {
    type: ActionType.AAHDAAR_OTP_RESET
  }
};
