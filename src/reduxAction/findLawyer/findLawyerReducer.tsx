import { Action, ActionType, FindALawyerData, Lawyer } from "../../model/model";
import createReducer from "../createReducer";


export interface FindALawyerReducerType {
  lawyerList: Lawyer[];
  loading: boolean;
  error?: string;
  loaded: boolean;
  searchData: any;
  selectedLawyer:[];
  isLoginFromConnect: boolean;
}
const defaultState: FindALawyerReducerType = {
  lawyerList: [],
  loading: false,
  error: undefined,
  loaded: false,
  searchData: null,
  selectedLawyer: [],
  isLoginFromConnect: false,
}



export const findLawyerReducer = createReducer<FindALawyerReducerType>(defaultState, {

  [ActionType.FIND_A_LAWYER](state:FindALawyerReducerType, action: Action<FindALawyerData>) {
    return {
      ...state,
      searchData: action.payload,
      loading: true,
    };
  },

  [ActionType.FIND_A_LAWYER_ERROR](state: FindALawyerReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.FIND_A_LAWYER_SUCCESS](state: FindALawyerReducerType, action: Action<number>) {
    const lawyerList = action.payload;
    return {
      ...state,
      loading: false,
      error: null,
      loaded: true,
      lawyerList: lawyerList,
    };
  },

  [ActionType.UPDATE_FIND_A_LAWYER_LOADED](state:FindALawyerReducerType, action: Action<FindALawyerData>) {
    return {
      ...state,
      loaded: false,
    };
  },

  [ActionType.FIND_MORE_LAWYER](state:FindALawyerReducerType, action: Action<FindALawyerData>) {
    return {
      ...state,
      loading: true,
    };
  },

  [ActionType.FIND_MORE_LAWYER_ERROR](state: FindALawyerReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.FIND_MORE_LAWYER_SUCCESS](state: FindALawyerReducerType, action: Action<number>) {
    const firstLawyerListArray:any = action.payload;
    const { lawyerList } = state;
    return {
      ...state,
      loading: false,
      error: null,
      lawyerList: [...lawyerList, ...firstLawyerListArray],
    };
  },

  [ActionType.UPDATE_SELECT_LAWYER](state:FindALawyerReducerType, action: Action<FindALawyerData>) {
    return {
      ...state,
      selectedLawyer: action.payload,
    };
  },

  [ActionType.UPDATE_LOGIN_FROM_CONNECT](state:FindALawyerReducerType, action: Action<FindALawyerData>) {
    return {
      ...state,
      isLoginFromConnect: true,
    };
  },

});
