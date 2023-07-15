import { ActionType } from '../../model/model';

export const showSuccessSnackbarAction  = (payload: string) => {
  return {
    type: ActionType.SNACKBAR_SUCCESS,
    payload
  }
};

export const showErrorSnackbarAction  = (payload: string) => {
  return {
    type: ActionType.SNACKBAR_ERROR,
    payload
  }
};

export const showInfoSnackbarAction  = (payload: string) => {
  return {
    type: ActionType.SNACKBAR_INFO,
    payload
  }
};

export const clearSnackbarAction  = () => {
    return {
      type: ActionType.SNACKBAR_CLEAR
    }
  };