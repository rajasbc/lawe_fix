import { GetCaseListData, ActionType, SaveHearing } from '../../model/model';
import { ChangePasswordData, CityData, FavoriteData, GetAllUserData } from '../../model/model';

export const getCaseHearingsByDate = (payload: any) => {
  return {
    type: ActionType.GET_CASE_HEARINGS_BY_DATE,
    payload
  }
};

export const getDashboardDetails = (payload: any) => {
  return {
    type: ActionType.GET_DASHBOARD_DETAILS,
    payload
  }
};

export const saveHearing = (payload: SaveHearing) => {
  return {
    type: ActionType.SAVE_HEARING,
    payload
  }
};

export const getCaseListAction = (payload: GetCaseListData) => {
  return {
    type: ActionType.GET_CASE_LIST,
    payload
  }
};

export const getJuniorListAction = (payload: GetCaseListData) => {
  return {
    type: ActionType.GET_JUNIOR_LIST,
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
export const getFavoriteCases = (payload: FavoriteData) => {
  return {
    type: ActionType.GET_FAVORITE_CASES,
    payload
  }
};
export const addToFavorite = (payload: FavoriteData) => {
  return {
    type: ActionType.ADD_FAVORITE_CASES,
    payload
  }
};
export const dataGrid = (payload:any) => {
  return {
    type: ActionType.DATAGRID,
    payload
  }
};
export const getAllCasesAction = (payload: any) => {
  return {
    type: ActionType.GET_ALL_CASES,
    payload
  }
};
export const getAllUserAction = (payload: any) => {
  return {
    type: ActionType.GET_ALL_USERS,
    payload
  }
};
export const setRoleType = (payload: any) => {
  return {
    type: ActionType.SET_ROLE_TYPE,
    payload
  }
};
export const updateCaseStatus = (payload:any) => {
  return {
    type: ActionType.UPDATE_CASE_STATUS,
    payload
  }
};
export const reassignIndividualLawyer = (payload:any) => {
  return {
    type: ActionType.REASSIGN_INDIVIDUAL_LAWYER,
    payload
  }
};
