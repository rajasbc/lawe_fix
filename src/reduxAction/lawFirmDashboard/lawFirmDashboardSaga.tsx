import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { createApiCall, MethodType,getFirmCaseListRoute, getFirmLawyersRoute, reAssignLawyerRoute } from '../../services/Api';
import {  ActionType,ReAssignLawyerParam } from '../../model/model';
import { addCompanyLawyer,updateRole } from '../../services/Api';

// lawfirm dashboard
function* getFirmCaseListSaga({ payload }: { payload: any }) {
  try {
    const url = getFirmCaseListRoute;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_FIRM_CASE_LIST_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_FIRM_CASE_LIST_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_FIRM_CASE_LIST_ERROR, payload: error })
  }
}
function* getFirmLawyersSaga({ payload }: { payload: any }) {
  try {
    let url = `${getFirmLawyersRoute}?id=${payload.id}&roleId=${payload.roleId}`;
    if(payload.userId){
      url = url+`&userId=${payload.userId}`;
    }
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_FIRM_LAWYERS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_FIRM_LAWYERS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_FIRM_LAWYERS_ERROR, payload: error })
  }
}

function* reAssignLawyerSaga({ payload }: { payload: ReAssignLawyerParam }) {
  try {
    const url = reAssignLawyerRoute;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.RE_ASSIGN_LAWYER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.RE_ASSIGN_LAWYER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.RE_ASSIGN_LAWYER_ERROR, payload: error })
  }
}

function* getMoreFirmCaseListSaga({ payload }: { payload: any }) {
  try {
    const url = getFirmCaseListRoute;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_MORE_FIRM_CASE_LIST_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_MORE_FIRM_CASE_LIST_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_MORE_FIRM_CASE_LIST_ERROR, payload: error })
  }
}
function* updateRoleSaga({ payload }: { payload: any }) {
  try {
    const url = updateRole;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_ROLE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.UPDATE_ROLE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_ROLE_ERROR, payload: error })
  }
}
function* addCompanyLawyerSaga({ payload }: { payload: any }) {
  try {
    const url = addCompanyLawyer;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: url, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.ADD_COMPANY_LAWYER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.ADD_COMPANY_LAWYER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.ADD_COMPANY_LAWYER_ERROR, payload: error })
  }
}

function* onGetLawyerListByFirmWatcher() {
  yield takeLatest(ActionType.GET_FIRM_CASE_LIST as any, getFirmCaseListSaga);
  yield takeLatest(ActionType.GET_FIRM_LAWYERS as any, getFirmLawyersSaga);
  yield takeLatest(ActionType.RE_ASSIGN_LAWYER as any, reAssignLawyerSaga);
  yield takeLatest(ActionType.GET_MORE_FIRM_CASE_LIST as any, getMoreFirmCaseListSaga);
  yield takeLatest(ActionType.UPDATE_ROLE as any, updateRoleSaga);
  yield takeLatest(ActionType.ADD_COMPANY_LAWYER as any, addCompanyLawyerSaga);
  
}

export default [
  fork(onGetLawyerListByFirmWatcher),
];