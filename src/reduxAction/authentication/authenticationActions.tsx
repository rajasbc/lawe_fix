import { LoginData, ActionType } from '../../model/model';
import { ChangePasswordData, CityData, FindALawyerData, GetAppointmentData, GetNotificationData, GetRemainderData } from '../../model/model';

export const loginUserAction = (payload: LoginData) => {
  return {
    type: ActionType.LOGIN_USER,
    payload
  }
};

export const logoutUserAction = () => {
  return {
    type: ActionType.LOGOUT_USER,
  }
};

export const getAllNotifications = (payload:GetNotificationData) => {
  return {
    type: ActionType.GET_ALL_NOTIFICATIONS,
    payload
  }
};

export const getAllRemainders = (payload:GetRemainderData) => {
  return {
    type: ActionType.GET_ALL_REMAINDERS,
    payload
  }
};

export const getAllAppointments = (payload:GetAppointmentData) => {
  return {
    type: ActionType.GET_ALL_APPOINTMENTS,
    payload
  }
};

export const getAllFromAppointments = (payload:GetAppointmentData) => {
  return {
    type: ActionType.GET_ALL_FROM_APPOINTMENTS,
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
export const updateSelectLawyerAction = (payload: FindALawyerData) => {
  return {
    type: ActionType.UPDATE_SELECT_LAWYER,
    payload
  }
};
export const changePassword = (payload: ChangePasswordData) => {
  return {
    type: ActionType.CHANGE_PASSWORD,
    payload
  }
};
export const updateProfile = (payload: any) => {
  return {
    type: ActionType.UPDATE_PROFILE,
    payload
  }
};
export const getStates = () => {
  return {
    type: ActionType.GET_STATES
  }
};
export const getCity = (payload:CityData) => {
  return {
    type: ActionType.GET_CITY,
    payload
  }
};
export const getCourt = () => {
  return {
    type: ActionType.GET_COURT,
  }
};