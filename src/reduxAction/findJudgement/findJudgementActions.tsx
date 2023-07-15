import {
  FindJudgementData,
  GetJudgementUrlData,
  ActionType,
} from "../../model/model";

export interface GetJudgementTextData {
  ids: number[];
}

export const findJudgementAction = (payload: FindJudgementData) => {
  return {
    type: ActionType.FIND_JUDGEMENT,
    payload,
  };
};

export const updateFindJudgementLoadedAction = () => {
  return {
    type: ActionType.UPDATE_FIND_JUDGEMENT_LOADED,
  };
};

export const getJudgementUrlAction = (payload: GetJudgementUrlData) => {
  return {
    type: ActionType.GET_JUDGEMENT_URL,
    payload,
  };
};


export const getJudgementUrlDownloadAction = (payload: GetJudgementUrlData) => {
  return {
    type: ActionType.GET_JUDGEMENT_URL_DOWNLOAD,
    payload,
  };
};

export const getJudgementTextAction = (payload: GetJudgementTextData) => {
  return {
    type: ActionType.GET_JUDGEMENT_TEXT,
    payload,
  };
};

export const getReferenceJudgementAction = (payload:any) => {
  return {
    type: ActionType.GET_REFERENCE_JUDGEMENT,
    payload,
  };
};

export const updateJudgementTextLoadedAction = () => {
  return {
    type: ActionType.UPDATE_JUDGEMENT_TEXT_LOADED,
  };
};

export const clearJudgmentUrl = () => {
  return {
    type: ActionType.CLEAR_JUDGMENT_URL,
  };
};


export const clearDownloadJudgmentUrl = () => {
  return {
    type: ActionType.CLEAR_DOWNLOAD_JUDGMENT_URL,
  };
};