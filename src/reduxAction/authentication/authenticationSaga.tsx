import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, individualLoginRoute, companyLoginRoute, MethodType } from '../../services/Api';
import { LoginData, ActionType } from '../../model/model';
import { ChangePasswordData, CityData, GetAppointmentData, GetNotificationData, GetRemainderData } from '../../model/model';
import { changePasswordRoute, getAllAppointmentsRoute, getAllFromAppointmentRoute, getAllNotificationsRoute, getAllRemaindersRoute, getCityRoute, getCourtRoute, getStatesRoute, updateProfileRoute } from '../../services/Api';

// login
function* loginSaga({ payload }: { payload: LoginData }) {
  try {
    const loginUrl = (payload.userType === 'individual') ? individualLoginRoute: companyLoginRoute;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: loginUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.LOGIN_USER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.LOGIN_USER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.LOGIN_USER_ERROR, payload: error })
  }
}

function* getAllNotificationsSaga({ payload }: { payload: GetNotificationData}) {
  try {
    const getAllNotification = `${getAllNotificationsRoute}?id=${payload.id}&type=${payload.type}`;
        const response = yield call(
      createApiCall, { method: MethodType.GET, url: getAllNotification, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_ALL_NOTIFICATIONS_SUCCESS, payload:response });
    } else {
      yield put({ type: ActionType.GET_ALL_NOTIFICATIONS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_ALL_NOTIFICATIONS_ERROR, payload: error })
  }
}

function* getAllRemaindersSaga({ payload }: { payload: GetRemainderData}) {
  try {
    const getAllRemainder = `${getAllRemaindersRoute}?id=${payload.id}&type=${payload.type}`;
        const response = yield call(
      createApiCall, { method: MethodType.GET, url: getAllRemainder, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_ALL_REMAINDERS_SUCCESS, payload:response.getAllRemainders });
    } else {
      yield put({ type: ActionType.GET_ALL_REMAINDERS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_ALL_REMAINDERS_ERROR, payload: error})
  }
}
function* getAllAppointmentsSaga({ payload }: { payload: GetAppointmentData}) {
  try {
    const getAllAppointment = `${getAllAppointmentsRoute}?id=${payload.id}&type=${payload.type}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getAllAppointment, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_ALL_APPOINTMENTS_SUCCESS, payload:response.getAllAppointments });
    } else {
      yield put({ type: ActionType.GET_ALL_APPOINTMENTS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_ALL_APPOINTMENTS_ERROR, payload: error })
  }
}
function* getAllFromAppointmentsSaga({ payload }: { payload: GetAppointmentData}) {
  try {
    const getAllFromAppointments = `${getAllFromAppointmentRoute}?id=${payload.id}&type=${payload.type}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getAllFromAppointments, data: payload }
    );
    console.log("Resp 000000000000", response);
    if (response) {
      yield put({ type: ActionType.GET_ALL_FROM_APPOINTMENTS_SUCCESS, payload:response.getAllFromAppointments });
    } else {
      yield put({ type: ActionType.GET_ALL_FROM_APPOINTMENTS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_ALL_FROM_APPOINTMENTS_ERROR, payload: error })
  }
}
function* changePasswordSaga({ payload }: { payload: ChangePasswordData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: changePasswordRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.CHANGE_PASSWORD_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.CHANGE_PASSWORD_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.CHANGE_PASSWORD_ERROR, payload: error })
  }
}

function* updateProfileSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: updateProfileRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_PROFILE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.UPDATE_PROFILE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_PROFILE_ERROR, payload: error })
  }
}
function* getStatesSaga() {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getStatesRoute}
    );
    if (response) {
      yield put({ type: ActionType.GET_STATES_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_STATES_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_STATES_ERROR, payload: error })
  }
}
function* getCitySaga({ payload }: { payload: CityData }) {
  try {
    let getCityRoutes = `${getCityRoute}?id=${payload.id}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCityRoutes, data: payload}
    );
    if (response) {
      yield put({ type: ActionType.GET_CITY_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CITY_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CITY_ERROR, payload: error })
  }
}
function* getCourtSaga() {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCourtRoute}
    );
    if (response) {
      yield put({ type: ActionType.GET_COURT_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_COURT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_COURT_ERROR, payload: error })
  }
}
function* onLoginSubmitWatcher() {
  yield takeLatest(ActionType.LOGIN_USER as any, loginSaga);
  yield takeLatest(ActionType.GET_ALL_NOTIFICATIONS as any,getAllNotificationsSaga)
  yield takeLatest(ActionType.GET_ALL_REMAINDERS as any,getAllRemaindersSaga)
  yield takeLatest(ActionType.GET_ALL_APPOINTMENTS as any,getAllAppointmentsSaga)
  yield takeLatest(ActionType.GET_ALL_FROM_APPOINTMENTS as any,getAllFromAppointmentsSaga)
  yield takeLatest(ActionType.CHANGE_PASSWORD as any, changePasswordSaga);
  yield takeLatest(ActionType.UPDATE_PROFILE as any, updateProfileSaga);
  yield takeLatest(ActionType.GET_STATES as any, getStatesSaga);
  yield takeLatest(ActionType.GET_CITY as any, getCitySaga);
  yield takeLatest(ActionType.GET_COURT as any, getCourtSaga);
}

export default [
  fork(onLoginSubmitWatcher),
];