import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, createFileUploadApiCall, saveCaseInquiryRoute, fileUploadRoute, MethodType } from '../../services/Api';
import { SaveCaseInquiryData, FileUploadData, ActionType } from '../../model/model';
import { sendNotificationRoute } from '../../services/Api';
import { NotificationData } from '../../model/model';

// save case inquiry
function* saveCaseInquirySaga({ payload }: { payload: SaveCaseInquiryData }) {
  try {

    const response = yield call(
      createApiCall, { method: MethodType.POST, url: saveCaseInquiryRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CASE_INQUIRY_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CASE_INQUIRY_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CASE_INQUIRY_ERROR, payload: error })
  }
}

function* uploadCaseInquiryFileSaga({ payload }: { payload: FileUploadData }) {
  try {

    const uploadURL = `${fileUploadRoute}?type=${payload.type}&contenttype=${payload.contenttype}&caseid=${payload.caseId}&uploadedBy=${payload.uploadedBy}`
    const response = yield call(
      createFileUploadApiCall, { method: MethodType.POST, url: uploadURL, data: payload.formData }
    );
    if (response) {
      yield put({ type: ActionType.UPLOAD_CASE_INQUIRY_FILE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.UPLOAD_CASE_INQUIRY_FILE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPLOAD_CASE_INQUIRY_FILE_ERROR, payload: error })
  }
}
function* sendNotificationBackendSaga({ payload }: { payload: NotificationData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: sendNotificationRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SEND_NOTIFICATION_BACK_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.SEND_NOTIFICATION_BACK_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SEND_NOTIFICATION_BACK_ERROR, payload: error })
  }
}

function* onSaveCaseSubmitWatcher() {
  yield takeLatest(ActionType.SAVE_CASE_INQUIRY as any, saveCaseInquirySaga);
  yield takeLatest(ActionType.UPLOAD_CASE_INQUIRY_FILE as any, uploadCaseInquiryFileSaga);  
  yield takeLatest(ActionType.SEND_NOTIFICATION_BACK as any,sendNotificationBackendSaga)
}

export default [
  fork(onSaveCaseSubmitWatcher),
];