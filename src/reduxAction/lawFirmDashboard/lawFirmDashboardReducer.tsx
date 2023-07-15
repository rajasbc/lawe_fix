import { Action, ActionType, GetCaseListParam } from "../../model/model";
import { ReAssignLawyerParam } from "../../model/model";
import createReducer from "../createReducer";


export interface LawFirmDashboardReducerType {
  loading: boolean;
  error?: string;
  caseList: any[];
  lawyers: any[];
  reAssignStatus: any;
  updateRoleRes: any;
  success: any;
  moreListEnded: boolean;
  limit: number;
}
const defaultState: LawFirmDashboardReducerType = {
  loading: false,
  error: undefined,
  caseList: [],
  lawyers: [],
  reAssignStatus: null,
  updateRoleRes: null,
  success: null,
  moreListEnded: false,
  limit: 0,
}



export const lawFirmDashboardReducer = createReducer<LawFirmDashboardReducerType>(defaultState, {

  [ActionType.GET_FIRM_CASE_LIST](state: LawFirmDashboardReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      moreListEnded: false,
      limit: action.payload["limit"],
    };
  },

  [ActionType.GET_FIRM_CASE_LIST_ERROR](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_FIRM_CASE_LIST_SUCCESS](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      caseList: action.payload,
    };
  },
  [ActionType.GET_FIRM_LAWYERS](state: LawFirmDashboardReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
    };
  },

  [ActionType.GET_FIRM_LAWYERS_ERROR](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_FIRM_LAWYERS_SUCCESS](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      lawyers: action.payload,
    };
  },
  [ActionType.RE_ASSIGN_LAWYER](state: LawFirmDashboardReducerType, action: Action<ReAssignLawyerParam>) {
    return {
      ...state,
      loading: true,
      reAssignStatus: null,
      success: null,
    };
  },

  [ActionType.RE_ASSIGN_LAWYER_ERROR](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.RE_ASSIGN_LAWYER_SUCCESS](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      reAssignStatus: action.payload,
      success: "Lawyer Reassign Request Completed Successfully",
    };
  },
  [ActionType.GET_MORE_FIRM_CASE_LIST](state: LawFirmDashboardReducerType, action: Action<any>) {
    if (!state.moreListEnded) {
      return {
        ...state,
        loading: true,
      };
    }else{
      return {...state};
    }
  },

  [ActionType.GET_MORE_FIRM_CASE_LIST_ERROR](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_MORE_FIRM_CASE_LIST_SUCCESS](state: LawFirmDashboardReducerType, action: Action<number>) {
    
    const { caseList } = state;
    const newData:any = action.payload;
    if (newData?.length == 0 || newData.length < state.limit) {
      state.moreListEnded = true;
    }

    return {
      ...state,
      loading: false,
      error: null,
      caseList: [...caseList, ...newData],
    };
  },
  [ActionType.UPDATE_ROLE](state: LawFirmDashboardReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      updateRoleRes: null,
      success: null,
    };
  },

  [ActionType.UPDATE_ROLE_ERROR](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPDATE_ROLE_SUCCESS](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      updateRoleRes: action.payload,
      success: "Role Updated Successfully",
    };
  },
  [ActionType.ADD_COMPANY_LAWYER](state: LawFirmDashboardReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      success: null,
    };
  },

  [ActionType.ADD_COMPANY_LAWYER_ERROR](state: LawFirmDashboardReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.ADD_COMPANY_LAWYER_SUCCESS](state: LawFirmDashboardReducerType, action: Action<number>) {
    const {lawyers} = state;
    const newData:any = action.payload;
    return {
      ...state,
      loading: false,
      error: null,
      lawyers: [...lawyers, ...newData],
      success: "Lawyer Added Successfully",
    };
  },

  [ActionType.CLEAR_ERROR](state: LawFirmDashboardReducerType, action: Action<number>) {
    return {
      ...state,
      error: null,
    };
  },

  [ActionType.CLEAR_SUCCESS_MESSAGE](state: LawFirmDashboardReducerType, action: Action<number>) {
    return {
      ...state,
      success: null,
    };
  },
});
