import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { createApiCall, MethodType,getLawCategory, getLawCategoryById, getCaseType } from '../../services/Api';
import { ActionType } from '../../model/model';
import { getCourts, getDetails, getRoles } from '../../services/Api';

// 
function* getLawCategorySaga({ payload }: { payload: any }) {
  try {
    const url = getLawCategory;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_LAW_CATEGORY_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_LAW_CATEGORY_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_LAW_CATEGORY_ERROR, payload: error })
  }
}
function* getLawCategoryByIdSaga({ payload }: { payload: any }) {
  try {
    const url = `${getLawCategoryById}?id=${payload.id}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_LAW_CATEGORY_BY_ID_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_LAW_CATEGORY_BY_ID_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_LAW_CATEGORY_BY_ID_ERROR, payload: error })
  }
}
function* getCaseTypeSaga({ payload }: { payload: any }) {
  try {
    const url = `${getCaseType}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_CASE_TYPE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CASE_TYPE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_TYPE_ERROR, payload: error })
  }
}
function* getCourtsSaga({ payload }: { payload: any }) {
  try {
    const url = `${getCourts}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_COURTS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_COURTS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_COURTS_ERROR, payload: error })
  }
}
function* getRolesSaga({ payload }: { payload: any }) {
  try {
    const url = `${getRoles}?roleId=${payload.roleId}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_ROLES_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_ROLES_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_ROLES_ERROR, payload: error })
  }
}
function* getDetailsSaga({ payload }: { payload: any }) {
  try {
    const url = `${getDetails}?clientId=${payload.clientId}&lawyerId=${payload.lawyerId}&type=${payload.type}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_DETAILS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_DETAILS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_DETAILS_ERROR, payload: error })
  }
}

function* oncreateOrderWatcher() {
  yield takeLatest(ActionType.GET_LAW_CATEGORY as any, getLawCategorySaga);
  yield takeLatest(ActionType.GET_LAW_CATEGORY_BY_ID as any, getLawCategoryByIdSaga);
  yield takeLatest(ActionType.GET_CASE_TYPE as any, getCaseTypeSaga);
  yield takeLatest(ActionType.GET_COURTS as any, getCourtsSaga);
  yield takeLatest(ActionType.GET_ROLES as any, getRolesSaga);
  yield takeLatest(ActionType.GET_DETAILS as any, getDetailsSaga);
}

export default [
  fork(oncreateOrderWatcher),
];