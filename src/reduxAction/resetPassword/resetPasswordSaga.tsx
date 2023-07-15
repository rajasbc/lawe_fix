import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, resetPasswordRoute, MethodType } from '../../services/Api';
import { ResetPasswordData, ActionType } from '../../model/model';

// Reset Password
function* resetPasswordSaga({ payload }: { payload: ResetPasswordData }) {
  try {

    const response = yield call(
      createApiCall, { method: MethodType.POST, url: resetPasswordRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.RESET_PASSWORD_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.RESET_PASSWORD_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.RESET_PASSWORD_ERROR, payload: error })
  }
}
function* onResetPasswordSubmitWatcher() {
  yield takeLatest(ActionType.RESET_PASSWORD as any, resetPasswordSaga);;
}

export default [
  fork(onResetPasswordSubmitWatcher),
];