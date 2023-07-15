import { ResetPasswordData, ActionType } from '../../model/model';

export const resetPasswordAction = (payload: ResetPasswordData) => {
  return {
    type: ActionType.RESET_PASSWORD,
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