import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, forgotPasswordRoute, MethodType } from '../../services/Api';
import { LoginData, ActionType } from '../../model/model';

// Forgot password
function* passwordEmailLinkSaga({ payload }: { payload: LoginData }) {
  try {

    const response = yield call(
      createApiCall, { method: MethodType.POST, url: forgotPasswordRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.FORGOT_PASSWORD_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.FORGOT_PASSWORD_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.FORGOT_PASSWORD_ERROR, payload: error })
  }
}
function* onPasswordEmailLinkSubmitWatcher() {
  yield takeLatest(ActionType.FORGOT_PASSWORD as any, passwordEmailLinkSaga);;
}

export default [
  fork(onPasswordEmailLinkSubmitWatcher),
];