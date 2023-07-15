import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, findLawyerRoute, searchLawyer, MethodType } from '../../services/Api';
import { FindALawyerData, ActionType } from '../../model/model';

// Find A Lawyer
function* findLawyerSaga({ payload }: { payload: FindALawyerData }) {
  try {

    const response = yield call(
      createApiCall, { method: MethodType.POST, url: searchLawyer, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.FIND_A_LAWYER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.FIND_A_LAWYER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.FIND_A_LAWYER_ERROR, payload: error })
  }
}

function* findMoreLawyerSaga({ payload }: { payload: FindALawyerData }) {
  try {

    const response = yield call(
      createApiCall, { method: MethodType.POST, url: searchLawyer, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.FIND_MORE_LAWYER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.FIND_MORE_LAWYER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.FIND_MORE_LAWYER_ERROR, payload: error })
  }
}


function* onFindLawyerSubmitWatcher() {
  yield takeLatest(ActionType.FIND_A_LAWYER as any, findLawyerSaga);
  yield takeLatest(ActionType.FIND_MORE_LAWYER as any, findMoreLawyerSaga);
}

export default [
  fork(onFindLawyerSubmitWatcher),
];