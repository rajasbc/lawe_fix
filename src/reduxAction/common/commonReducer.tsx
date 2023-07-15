import { Action, ActionType, CreateOrderParam } from "../../model/model";
import createReducer from "../createReducer";


export interface CommonReducerType {
  loading: boolean;
  error?: string;
  lawCategory: any;
  subCategory: any;
  caseTypes: any,
  courts: any,
  roles: any,
  basicInfo:any,
}
const defaultState: CommonReducerType = {
  loading: false,
  error: undefined,
  lawCategory: null,
  subCategory: null,
  caseTypes: null,
  courts: null,
  roles: null,
  basicInfo:null,
}



export const commonReducer = createReducer<CommonReducerType>(defaultState, {

  [ActionType.GET_LAW_CATEGORY](state: CommonReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
    };
  },

  [ActionType.GET_LAW_CATEGORY_ERROR](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_LAW_CATEGORY_SUCCESS](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      lawCategory: action.payload,
    };
  },

  [ActionType.GET_LAW_CATEGORY_BY_ID](state: CommonReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
    };
  },

  [ActionType.GET_LAW_CATEGORY_BY_ID_ERROR](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_LAW_CATEGORY_BY_ID_SUCCESS](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      subCategory: action.payload,
    };
  },
  [ActionType.GET_CASE_TYPE](state: CommonReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      caseTypes: null,
    };
  },

  [ActionType.GET_CASE_TYPE_ERROR](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CASE_TYPE_SUCCESS](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      caseTypes: action.payload,
    };
  },
  [ActionType.GET_COURTS](state: CommonReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      courts: null,
    };
  },

  [ActionType.GET_COURTS_ERROR](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_COURTS_SUCCESS](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      courts: action.payload,
    };
  },
  [ActionType.GET_DETAILS](state: CommonReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      basicInfo: null,
    };
  },

  [ActionType.GET_DETAILS_ERROR](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_DETAILS_SUCCESS](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      basicInfo: action.payload,
    };
  },
  [ActionType.GET_ROLES](state: CommonReducerType, action: Action<any>) {
    return {
      ...state,
      loading: true,
      roles: null,
    };
  },

  [ActionType.GET_ROLES_ERROR](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_ROLES_SUCCESS](state: CommonReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      roles: action.payload,
    };
  },

});
