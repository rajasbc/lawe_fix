import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, MethodType } from '../../services/Api';
import { ActionType } from '../../model/model';
import { aadhaarOtpSubmit, aadhaarVerification } from '../../services/Api';

// signUp
function* signUpCompanyLawyerSaga({ payload }: { payload: any }) {
  try {
    const signUpUrl = '/signUpCompany';
    
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: signUpUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SIGNUP_USER_COMPANY_LAWYER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SIGNUP_USER_COMPANY_LAWYER_ERROR, payload:'error'  })
    }
  } catch (error) {
    yield put({ type: ActionType.SIGNUP_USER_COMPANY_LAWYER_ERROR, payload: error })
  }
}

function* aadhaarVerificationSaga({ payload }: { payload:any }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: aadhaarVerification, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.AADHAAR_VERIFICATION_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.AADHAAR_VERIFICATION_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.AADHAAR_VERIFICATION_ERROR, payload: error })
  }
}

function* aadhaarOtpSubmitSaga({ payload }: { payload:any }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: aadhaarOtpSubmit, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.AADHAAR_OTP_SUBMIT_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.AADHAAR_OTP_SUBMIT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.AADHAAR_OTP_SUBMIT_ERROR, payload: error })
  }
}

function* onSignUpCompanyLawyerSubmitWatcher() {
  yield takeLatest(ActionType.SIGNUP_USER_COMPANY_LAWYER as any, signUpCompanyLawyerSaga);
  yield takeLatest(ActionType.AADHAAR_VERIFICATION as any, aadhaarVerificationSaga);
  yield takeLatest(ActionType.AADHAAR_OTP_SUBMIT as any, aadhaarOtpSubmitSaga);
}

export default [
  fork(onSignUpCompanyLawyerSubmitWatcher),
];