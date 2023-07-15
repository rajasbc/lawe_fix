import { Action, ActionType, LoginData } from "../../model/model";
import createReducer from "../createReducer";


export interface PasswordEmailLinkReducerType {
  loading: boolean;
  error?: string;
  status: boolean;
  response: any;
  success: any;
}
const defaultState: PasswordEmailLinkReducerType = {
  loading: false,
  error: undefined,
  status: false,
  response: null,
  success: null,
}



export const passwordEmailLinkReducer = createReducer<PasswordEmailLinkReducerType>(defaultState, {

  [ActionType.FORGOT_PASSWORD](state:PasswordEmailLinkReducerType, action: Action<LoginData>) {
    return {
      ...state,
      loading: true,
      success: null,
      error: null,
    };
  },

  [ActionType.FORGOT_PASSWORD_ERROR](state: PasswordEmailLinkReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.FORGOT_PASSWORD_SUCCESS](state: PasswordEmailLinkReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      status: true,
      response: action.payload,
      success: "Your password reset email has been sent",
    };
  },
  [ActionType.CLEAR_ERROR](state:PasswordEmailLinkReducerType, action: Action<number>) {
    return {
      ...state,
      error: null,
    };
  },

  [ActionType.CLEAR_SUCCESS_MESSAGE](state:PasswordEmailLinkReducerType, action: Action<number>) {
    return {
      ...state,
      success: null,
    };
  },
});
