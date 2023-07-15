import { GetCaseListParam, ActionType, ReAssignLawyerParam } from "../../model/model";

export const getFirmCaseList = (payload: any) => {
  return {
    type: ActionType.GET_FIRM_CASE_LIST,
    payload,
  };
};

export const getFirmLawyers = (payload: GetCaseListParam) => {
  return {
    type: ActionType.GET_FIRM_LAWYERS,
    payload,
  };
};

export const reAssignLawyer = (payload: ReAssignLawyerParam) => {
  return {
    type: ActionType.RE_ASSIGN_LAWYER,
    payload,
  };
};

export const getMoreFirmCaseList = (payload: GetCaseListParam) => {
  return {
    type: ActionType.GET_MORE_FIRM_CASE_LIST,
    payload,
  };
};

export const updateRole = (payload: {userId:number,roleId:number}) => {
  return {
    type: ActionType.UPDATE_ROLE,
    payload,
  };
};

export const addCompanyLawyer = (payload: any) => {
  return {
    type: ActionType.ADD_COMPANY_LAWYER,
    payload,
  };
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