import { Action, ActionType } from "../../model/model";
import createReducer from "../createReducer";


export interface SnackbarReducerType {
    successSnackbarOpen: boolean;
    errorSnackbarOpen: boolean;
    infoSnackbarOpen: boolean;
    successSnackbarMessage?: string;
    errorSnackbarMessage?: string;
    infoSnackbarMessage?: string;
}
const defaultState: SnackbarReducerType = {
    successSnackbarOpen: false,
    errorSnackbarOpen: false,
    infoSnackbarOpen: false,
    successSnackbarMessage: undefined,
    errorSnackbarMessage: undefined,
    infoSnackbarMessage: undefined,
}



export const snackbarsReducer = createReducer<SnackbarReducerType>(defaultState, {

  [ActionType.SNACKBAR_SUCCESS](state: SnackbarReducerType, action: Action<number>) {
  
    return {
        ...state,
        successSnackbarOpen: true,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false,
        successSnackbarMessage: action.payload
    };
  },

  [ActionType.SNACKBAR_ERROR](state: SnackbarReducerType, action: Action<number>) {
  
    return {
        ...state,
        errorSnackbarOpen: true,
        successSnackbarOpen: false,
        infoSnackbarOpen: false,
        errorSnackbarMessage: action.payload
    };
  },

  [ActionType.SNACKBAR_INFO](state: SnackbarReducerType, action: Action<number>) {
  
    return {
        ...state,
        infoSnackbarOpen: true,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarMessage: action.payload
    };
  },

  [ActionType.SNACKBAR_CLEAR](state: SnackbarReducerType, action: Action<number>) {
  
    return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false,
    };
  },
});
