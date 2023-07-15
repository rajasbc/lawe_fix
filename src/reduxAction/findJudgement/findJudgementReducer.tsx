import { Action, ActionType, FindJudgementData } from "../../model/model";
import createReducer from "../createReducer";
import { GetJudgementTextData } from "./findJudgementActions";


export interface FindJudgementReducerType {
  judgementList: any[];
  loading: boolean;
  error?: string;
  loaded: boolean;
  judgementUrl: string;
  downloadJudgementUrl: string;
  judgementDataList: any[];
  textLoaded: boolean;
  referenceJudgements:any[];
}

const defaultState: FindJudgementReducerType = {
  judgementList: [],
  loading: false,
  error: undefined,
  loaded: false,
  judgementUrl: null,
  downloadJudgementUrl: null,
  judgementDataList: [],
  textLoaded:false,
  referenceJudgements:[],
}



export const findJudgementReducer = createReducer<FindJudgementReducerType>(defaultState, {

  [ActionType.FIND_JUDGEMENT](state:FindJudgementReducerType, action: Action<FindJudgementData>) {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  },

  [ActionType.FIND_JUDGEMENT_ERROR](state: FindJudgementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.payload,
    };
  },

  [ActionType.FIND_JUDGEMENT_SUCCESS](state: FindJudgementReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      loaded: true,
      judgementList: action.payload,
    };
  },

  [ActionType.UPDATE_FIND_JUDGEMENT_LOADED](state:FindJudgementReducerType, action: Action<FindJudgementData>) {
    return {
      ...state,
      loading:false,
      loaded: false,
    };
  },

  [ActionType.GET_JUDGEMENT_URL](state:FindJudgementReducerType, action: Action<FindJudgementData>) {
    return {
      ...state,
      loading: true,
      judgementUrl: null,
    };
  },

  [ActionType.GET_JUDGEMENT_URL_ERROR](state: FindJudgementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      judgementUrl: null,
      error: action.payload,
    };
  },

  [ActionType.GET_JUDGEMENT_URL_SUCCESS](state: FindJudgementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      judgementUrl: action.payload,
    };
  },

  [ActionType.GET_JUDGEMENT_URL_DOWNLOAD](state:FindJudgementReducerType, action: Action<FindJudgementData>) {
    return {
      ...state,
      loading: true,
      downloadJudgementUrl: null,
    };
  },

  [ActionType.GET_JUDGEMENT_URL_DOWNLOAD_ERROR](state: FindJudgementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      downloadJudgementUrl: null,
      error: action.payload,
    };
  },

  [ActionType.GET_JUDGEMENT_URL_DOWNLOAD_SUCCESS](state: FindJudgementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      downloadJudgementUrl: action.payload,
    };
  },

  [ActionType.CLEAR_DOWNLOAD_JUDGMENT_URL](state: FindJudgementReducerType, action: Action<number>) {
    return {
      ...state,
      downloadJudgementUrl: null,
    };
  },

  [ActionType.CLEAR_JUDGMENT_URL](state: FindJudgementReducerType, action: Action<number>) {
    return {
      ...state,
      judgementUrl: null,
    };
  },

  [ActionType.GET_JUDGEMENT_TEXT](state:FindJudgementReducerType, action: Action<GetJudgementTextData>) {
    return {
      ...state,
      loading: true,
      judgementDataList: undefined,
      textLoaded:false,
    };
  },

  [ActionType.GET_JUDGEMENT_TEXT_ERROR](state: FindJudgementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      judgementDataList: undefined,
      error: action.payload,
      textLoaded:false,
    };
  },

  [ActionType.GET_JUDGEMENT_TEXT_SUCCESS](state: FindJudgementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      judgementDataList: action.payload,
      textLoaded:true,
    };
  },
  [ActionType.GET_REFERENCE_JUDGEMENT](state:FindJudgementReducerType, action: Action<{id:number}>) {
    console.log("called",state);
    return {
      ...state,
      loading: true,
      referenceJudgements: [],
      textLoaded:false,
    };
  },

  [ActionType.GET_REFERENCE_JUDGEMENT_ERROR](state: FindJudgementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      referenceJudgements: undefined,
      error: action.payload,
      textLoaded:false,
    };
  },

  [ActionType.GET_REFERENCE_JUDGEMENT_SUCCESS](state: FindJudgementReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      referenceJudgements: action.payload,
      textLoaded:true,
    };
  },
  [ActionType.UPDATE_JUDGEMENT_TEXT_LOADED](state:FindJudgementReducerType, action: Action<any>) {
    return {
      ...state,
      loading:false,
      textLoaded:false,
    };
  },

});
