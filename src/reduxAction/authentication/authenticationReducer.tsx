import { Action, ActionType, LoginData } from "../../model/model";
import { ChangePasswordData, CityData, FindALawyerData, GetAppointmentData, GetNotificationData, GetRemainderData, NotificationData } from "../../model/model";
import createReducer from "../createReducer";


export interface AuthenticationReducerType {
  email: string;
  password: string;
  loading: boolean;
  error?: string;
  success?: string;
  token: string;
  userName: string;
  userInfo: any;
  status:string;
  role:any;
  notifications:any;
  remainders:any;
  appointments:any;
  states:any;
  city:any;
  courts:any;
}
const defaultState: AuthenticationReducerType = {
  email: '',
  password: '',
  loading: false,
  error: undefined,
  token: '',
  userName: '',
  userInfo: undefined,
  status: null,
  role:null,
  notifications:null,
  remainders:null,
  appointments:null,
  courts:null,
  states:null,
  city:null,

}



export const authenticationReducer = createReducer<AuthenticationReducerType>(defaultState, {

  [ActionType.LOGIN_USER](state:AuthenticationReducerType, action: Action<LoginData>) {
    return {
      ...state,
      loading: true,
      status:null,
      role:null,
      userName:null,
      userInfo:null,
      success:null,
    };
  },

  [ActionType.LOGIN_USER_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.LOGIN_USER_SUCCESS](state: AuthenticationReducerType, action: any) {
  
    return {
      ...state,
      loading: false,
      error: null,
      status:action.payload?.userjson ? action.payload.userjson.status : action.payload.companyjson.status,
      role:action.payload.role,
      userName: action.payload?.userjson? action.payload.userName: action.payload.companyName,
      userInfo: action.payload,
      success:"Logged User Successfully",
    };
  },

  [ActionType.LOGOUT_USER](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: null,
      status:'',
      userName: '',
      userInfo: undefined,
      role:null,
      success:null,
    };
  },
  [ActionType.GET_ALL_NOTIFICATIONS](state:AuthenticationReducerType, action: Action<GetNotificationData>) {
    return {
      ...state,
      error: null,
      loading: true,
      notifications:null,
    };
  },

  [ActionType.GET_ALL_NOTIFICATIONS_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_ALL_NOTIFICATIONS_SUCCESS](state: AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      notifications:action.payload,
    };
  },

  [ActionType.GET_ALL_REMAINDERS](state:AuthenticationReducerType, action: Action<GetRemainderData>) {
    return {
      ...state,
      error: null,
      loading: true,
      remainders:null,
    };
  },

  [ActionType.GET_ALL_REMAINDERS_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_ALL_REMAINDERS_SUCCESS](state: AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      remainders:action.payload,
    };
  },

  [ActionType.GET_ALL_APPOINTMENTS](state:AuthenticationReducerType, action: Action<GetAppointmentData>) {
    return {
      ...state,
      error: null,
      loading: true,
      appointments:null,
    };
  },

  [ActionType.GET_ALL_APPOINTMENTS_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_ALL_APPOINTMENTS_SUCCESS](state: AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      appointments:action.payload,
    };
  },

  [ActionType.GET_ALL_FROM_APPOINTMENTS](state:AuthenticationReducerType, action: Action<GetAppointmentData>) {
    return {
      ...state,
      error: null,
      loading: true,
      fromAppointments:null,
    };
  },

  [ActionType.GET_ALL_FROM_APPOINTMENTS_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_ALL_FROM_APPOINTMENTS_SUCCESS](state: AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      fromAppointments:action.payload,
    };
  },

  [ActionType.CLEAR_ERROR](state:AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      error: null,
    };
  },
  [ActionType.CLEAR_SUCCESS_MESSAGE](state:AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      success: null,
    };
  },
  [ActionType.UPDATE_SELECT_LAWYER](state:AuthenticationReducerType, action: Action<FindALawyerData>) {
    return {
      ...state,
      selectedLawyer: action.payload,
    };
  },

  [ActionType.CHANGE_PASSWORD](state:AuthenticationReducerType, action: Action<ChangePasswordData>) {
    return {
      ...state,
      error: null,
      loading: true,
      success:null,
    };
  },

  [ActionType.CHANGE_PASSWORD_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.CHANGE_PASSWORD_SUCCESS](state: AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      success:"Your Password has been changed successfully"
    };
  },

  [ActionType.UPDATE_PROFILE](state:AuthenticationReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      loading: true,
      success:null,
    };
  },

  [ActionType.UPDATE_PROFILE_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.UPDATE_PROFILE_SUCCESS](state: AuthenticationReducerType, action: any) {
    return {
      ...state,
      loading: false,
      error: null,
      userName: action.payload?.userjson? action.payload.userName: action.payload.companyName,
      userInfo: action.payload,
      success:"Details Updated Successfully"
    };
  },

  [ActionType.GET_STATES](state:AuthenticationReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      states:null,
      loading: true,
      success:null,
    };
  },

  [ActionType.GET_STATES_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_STATES_SUCCESS](state: AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      states:action.payload,
    };
  },

  [ActionType.GET_CITY](state:AuthenticationReducerType, action: Action<CityData>) {
    return {
      ...state,
      error: null,
      city:null,
      loading: true,
      success:null,
    };
  },

  [ActionType.GET_CITY_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CITY_SUCCESS](state: AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      city:action.payload
    };
  },

  [ActionType.GET_COURT](state:AuthenticationReducerType, action: Action<any>) {
    return {
      ...state,
      error: null,
      courts:null,
      loading: true,
      success:null,
    };
  },

  [ActionType.GET_COURT_ERROR](state: AuthenticationReducerType, action: Action<number>) {
  
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_COURT_SUCCESS](state: AuthenticationReducerType, action: Action<number>) {
    return {
      ...state,
      loading: false,
      error: null,
      courts:action.payload,
    };
  },
});
