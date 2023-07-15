import { FindALawyerData, ActionType } from '../../model/model';

export const findLawyerAction = (payload: FindALawyerData) => {
  return {
    type: ActionType.FIND_A_LAWYER,
    payload
  }
};

export const findMoreLawyerAction = (payload: FindALawyerData) => {
  return {
    type: ActionType.FIND_MORE_LAWYER,
    payload
  }
};

export const updateFindLawyerLoadedAction = () => {
  return {
    type: ActionType.UPDATE_FIND_A_LAWYER_LOADED,
  }
};

export const updateSelectLawyerAction = (payload: FindALawyerData) => {
  return {
    type: ActionType.UPDATE_SELECT_LAWYER,
    payload
  }
};

export const updateLoginFromConnectAction = () => {
  return {
    type: ActionType.UPDATE_LOGIN_FROM_CONNECT,
  }
};