import { Action, ActionType, GetCaseListData } from "../../model/model";
import {FavoriteData } from "../../model/model";
import createReducer from "../createReducer";


export interface DashboardReducerType {
  loading: boolean;
  error?: string;
  dashboardDetails: any;
  caseHearings: any;
  saveHearingResponse: any;
  caseList: any;
  juniorList: any;
  success: any;
  favoriteList:any;
  datagrid:any[];
  platformUsers:any;
  caseLawyers:any[];
  reassignSuccess:boolean;
 
}
const defaultState: DashboardReducerType = {
  loading: false,
  error: undefined,
  dashboardDetails: null,
  saveHearingResponse: null,
  caseHearings: null,
  caseList: null,
  juniorList: null,
  success: null,
  favoriteList:null,
  datagrid:null,
  platformUsers:null,
  caseLawyers:null,
  reassignSuccess:false,

}

export const dashboardReducer = createReducer<DashboardReducerType>(defaultState, {

  [ActionType.GET_DASHBOARD_DETAILS](state:DashboardReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      dashboardDetails: null,
    };
  },

  [ActionType.GET_DASHBOARD_DETAILS_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_DASHBOARD_DETAILS_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      dashboardDetails: action.payload,
    };
  },

  [ActionType.GET_CASE_HEARINGS_BY_DATE](state:DashboardReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      caseHearings: null,
    };
  },

  [ActionType.GET_CASE_HEARINGS_BY_DATE_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CASE_HEARINGS_BY_DATE_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      caseHearings: action.payload,
    };
  },

  [ActionType.SAVE_HEARING](state:DashboardReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      saveHearingResponse: null,
      success: null,
    };
  },

  [ActionType.SAVE_HEARING_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.SAVE_HEARING_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      saveHearingResponse: action.payload,
      success: "Case Hearings Saved SuccessFully",
    };
  },
  [ActionType.GET_CASE_LIST](state:DashboardReducerType, action: Action<GetCaseListData>) {
    return {
      ...state,
      error: null,
      loading: true,
      
    };
  },

  [ActionType.GET_CASE_LIST_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CASE_LIST_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      caseList: action.payload,
    };
  },

  [ActionType.GET_JUNIOR_LIST](state:DashboardReducerType, action: Action<GetCaseListData>) {
    return {
      ...state,
      error: null,
      loading: true,
      
    };
  },

  [ActionType.GET_JUNIOR_LIST_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_JUNIOR_LIST_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      juniorList: action.payload,
    };
  },


  [ActionType.CLEAR_ERROR](state:DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      error: null,
    };
  },
  
  [ActionType.CLEAR_SUCCESS_MESSAGE](state:DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      success: null,
    };
  },

  [ActionType.GET_FAVORITE_CASES](state:DashboardReducerType, action: Action<FavoriteData>) {
    return {
      ...state,
      error: null,
      loading: true,
      favoriteList:null,
    };
  },

  [ActionType.GET_FAVORITE_CASES_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_FAVORITE_CASES_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      favoriteList: action.payload,
    };
  },

  [ActionType.ADD_FAVORITE_CASES](state:DashboardReducerType, action: Action<FavoriteData>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.ADD_FAVORITE_CASES_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.ADD_FAVORITE_CASES_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },
  
  [ActionType.DATAGRID](state:DashboardReducerType, action: Action<any>) {
    return {
      ...state,
      datagrid: action.payload,
    };
  },
  
  [ActionType.UPDATE_CASE_STATUS](state:DashboardReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.UPDATE_CASE_STATUS_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPDATE_CASE_STATUS_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Case Reassign Process Initiated Successfully",
    };
  },
  [ActionType.REASSIGN_INDIVIDUAL_LAWYER](state:DashboardReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      reassignSuccess:false,
    };
  },

  [ActionType.REASSIGN_INDIVIDUAL_LAWYER_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.REASSIGN_INDIVIDUAL_LAWYER_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success: "Case Reassign Process Successfully Completed",
      reassignSuccess:true,
    };
  },

  [ActionType.GET_ALL_CASES](state:DashboardReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.GET_ALL_CASES_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_ALL_CASES_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      caseList: action.payload,
    };
  },

  [ActionType.GET_ALL_USERS](state:DashboardReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },

  [ActionType.GET_ALL_USERS_ERROR](state: DashboardReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_ALL_USERS_SUCCESS](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      platformUsers: action.payload,
    };
  },

  [ActionType.SET_ROLE_TYPE](state: DashboardReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      roleType: action.payload,
    };
  },
});
