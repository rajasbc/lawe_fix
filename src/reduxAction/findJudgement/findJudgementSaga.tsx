import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, findJudgement, getJudgementUrlRoute, MethodType } from '../../services/Api';
import { FindJudgementData, GetJudgementUrlData, ActionType } from '../../model/model';
import { GetJudgementTextData } from './findJudgementActions';
import { getJudgementTextURL, getReferenceCases } from '../../services/Api';

// Find Judgement
function* findJudgementSaga({ payload }: { payload: FindJudgementData }) {
  try {
    const findJudgementUrl = `${findJudgement}${payload.description}`;
    const response:any = yield call(
      createApiCall, { method: MethodType.GET, url: findJudgementUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.FIND_JUDGEMENT_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.FIND_JUDGEMENT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.FIND_JUDGEMENT_ERROR, payload:error })
  }
}

function* getJudgementUrlSaga({ payload }: { payload: GetJudgementUrlData }) {
  try {
    const getJudgementUrl = `${getJudgementUrlRoute}${payload.s3key}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getJudgementUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_JUDGEMENT_URL_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_JUDGEMENT_URL_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_JUDGEMENT_URL_ERROR, payload: error })
  }
}


// function* getJudgementUrlDownloadSaga({ payload }: { payload: GetJudgementUrlData }) {
//   try {
//     const getJudgementUrl = `${getJudgementUrlRoute}${payload.s3key}`;
//     const response = yield call(
//       createApiCall, { method: MethodType.GET, url: getJudgementUrl, data: payload }
//     );
//     if (response) {
//       yield put({ type: ActionType.GET_JUDGEMENT_URL_DOWNLOAD_SUCCESS, payload: response });
//       window.open(response?.link, '_blank')
//     } else {
//       yield put({ type: ActionType.GET_JUDGEMENT_URL_DOWNLOAD_ERROR, payload: 'error' })
//     }
//   } catch (error) {
//     yield put({ type: ActionType.GET_JUDGEMENT_URL_DOWNLOAD_ERROR, payload: error })
//   }
// }



function* getJudgementUrlDownloadSaga({ payload }: { payload: GetJudgementUrlData }) {
  try {
    const getJudgementUrl = `${getJudgementUrlRoute}${payload.s3key}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getJudgementUrl, data: payload }
    );
    if (response) {
      console.log("resposne", response);
      yield put({ type: ActionType.GET_JUDGEMENT_URL_DOWNLOAD_SUCCESS, payload: response });
      // window.open(response?.link, '_blank')
    } else {
      yield put({ type: ActionType.GET_JUDGEMENT_URL_DOWNLOAD_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_JUDGEMENT_URL_DOWNLOAD_ERROR, payload: error })
  }
}

function* getJudgementTextSaga({ payload }: { payload: GetJudgementTextData }) {
  try {
    const ids = payload.ids.join();
    const getJudgementText = `${getJudgementTextURL}?ids=${ids}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getJudgementText, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_JUDGEMENT_TEXT_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_JUDGEMENT_TEXT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_JUDGEMENT_TEXT_ERROR, payload: error })
  }
}

function* getReferenceJudgementSaga({ payload }: { payload: {id:number} }) {
  try {
    console.log("called",payload);
    const id = payload.id;
    const referenceCases = `${getReferenceCases}?id=${id}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: referenceCases, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_REFERENCE_JUDGEMENT_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_REFERENCE_JUDGEMENT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_REFERENCE_JUDGEMENT_ERROR, payload: error })
  }
}

function* onFindJudgementSubmitWatcher() {
  yield takeLatest(ActionType.FIND_JUDGEMENT as any, findJudgementSaga);
  yield takeLatest(ActionType.GET_JUDGEMENT_URL as any, getJudgementUrlSaga);
  yield takeLatest(ActionType.GET_JUDGEMENT_URL_DOWNLOAD as any, getJudgementUrlDownloadSaga);
  yield takeLatest(ActionType.GET_JUDGEMENT_TEXT as any, getJudgementTextSaga);
  yield takeLatest(ActionType.GET_REFERENCE_JUDGEMENT as any, getReferenceJudgementSaga);
}

export default [
  fork(onFindJudgementSubmitWatcher),
];