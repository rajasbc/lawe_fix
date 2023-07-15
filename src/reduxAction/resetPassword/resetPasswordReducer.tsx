import { Action, ActionType, ResetPasswordData } from "../../model/model";
import createReducer from "../createReducer";


export interface ResetPasswordReducerType {
  resetPassword: boolean;
  respone: any;
  loading: boolean;
  error?: string;
  success?: string;
}
const defaultState: ResetPasswordReducerType = {
  resetPassword: false,
  loading: false,
  error: undefined,
  respone: null,
  success: undefined,
}



export const resetPasswordReducer = createReducer<ResetPasswordReducerType>(defaultState, {

  [ActionType.RESET_PASSWORD](state:ResetPasswordReducerType, action: Action<ResetPasswordData>) {
    return {
      ...state,
      loading: true,
      success: null,
      error: null,
    };
  },

  [ActionType.RESET_PASSWORD_ERROR](state: ResetPasswordReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.RESET_PASSWORD_SUCCESS](state: ResetPasswordReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      resetPassword: true,
      respone: action.payload,
      success: "Reset Password Completed Successfully",
    };
  },
  [ActionType.CLEAR_ERROR](state:ResetPasswordReducerType, action: Action<number>) {
    return {
      ...state,
      error: null,
    };
  },

  [ActionType.CLEAR_SUCCESS_MESSAGE](state:ResetPasswordReducerType, action: Action<number>) {
    return {
      ...state,
      success: null,
    };
  },
});
