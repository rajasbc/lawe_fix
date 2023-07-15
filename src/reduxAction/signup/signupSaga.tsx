import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, MethodType } from '../../services/Api';
import { ActionType } from '../../model/model';

// signUp
function* signUpSaga({ payload }: { payload: any }) {
  try {
    const signUpUrl = (payload.data.status === 'lawfirm' || payload.data.status === 'clientfirm') ? '/signUpCompany' : '/signUpIndividual';

    const response = yield call(
      createApiCall, { method: MethodType.POST, url: signUpUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SIGNUP_USER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SIGNUP_USER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SIGNUP_USER_ERROR, payload: error })
  }
}
function* onSignUpSubmitWatcher() {
  yield takeLatest(ActionType.SIGNUP_USER as any, signUpSaga);;
}

export default [
  fork(onSignUpSubmitWatcher),
];