import { ActionType } from "../../model/model";

export const getLawCategory = (payload: any) => {
 
  return {
    type: ActionType.GET_LAW_CATEGORY,
    payload,
  };
};

export const getLawCategoryById = (payload: any) => {
  return {
    type: ActionType.GET_LAW_CATEGORY_BY_ID,
    payload,
  };
};

export const getCaseType = (payload: any) => {
  return {
    type: ActionType.GET_CASE_TYPE,
    payload,
  };
};

export const getCourts = (payload: any) => {
  return {
    type: ActionType.GET_COURTS,
    payload,
  };
};

export const getRoles = (payload: any) => {
  return {
    type: ActionType.GET_ROLES,
    payload,
  };
};

export const getDetails = (payload: any) => {
  return {
    type: ActionType.GET_DETAILS,
    payload,
  };
};
