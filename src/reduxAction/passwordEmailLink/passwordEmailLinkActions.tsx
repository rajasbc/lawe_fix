import { ForgotPasswordData, ActionType } from '../../model/model';

export const passwordEmailLinkAction = (payload: ForgotPasswordData) => {
  return {
    type: ActionType.FORGOT_PASSWORD,
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