import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { createApiCall, MethodType, saveHearing, getDashboardDetailsRoute, getCaseHearingsByDateRoute, getJuniorListRoute, getCaseListRoute } from '../../services/Api';
import { ActionType, SaveHearing } from '../../model/model';
import { ChangePasswordData, CityData, FavoriteData} from '../../model/model';
import { addToFavoritesRoute, changePasswordRoute, getAllCasesRoute, getAllUserRoute, getCityRoute, getFavoriteCasesRoute, getStatesRoute, reassignIndividualLawyer, updateCaseStatus, updateProfileRoute } from '../../services/Api';

function* getDashboardDetailsSaga({ payload }: { payload: any }) {
  try {
    
    let dashboardUrl = `${getDashboardDetailsRoute}?type=${payload.type}&id=${payload.id}`;
    if(payload.roleId){
      dashboardUrl = dashboardUrl+`&roleId=${payload.roleId}`;
    }
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: dashboardUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_DASHBOARD_DETAILS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_DASHBOARD_DETAILS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_DASHBOARD_DETAILS_ERROR, payload: error })
  }
}

function* getCaseHearingsByDateSaga({ payload }: { payload: any }) {
  try {
    let query = '';
    const params = `?date=${payload.date}&type=${payload.type}&id=${payload.id}`;
    const getHearingsUrl = `${getCaseHearingsByDateRoute + params}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getHearingsUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_CASE_HEARINGS_BY_DATE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CASE_HEARINGS_BY_DATE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_HEARINGS_BY_DATE_ERROR, payload: error })
  }
}

function* saveHearingSaga({ payload }: { payload: SaveHearing}) {
  try {
    const saveHearingUrl = `${saveHearing}`;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: saveHearingUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_HEARING_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_HEARING_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_HEARING_ERROR, payload: error })
  }
}

function* getCaseListSaga({ payload }: { payload: any }) {
  try {

    let getCaseListUrl = `${getCaseListRoute}?id=${payload.id}&type=${payload.type}&roleId=${payload.roleId}`;
    if(payload.userId){
      getCaseListUrl+=`&userId=${payload.userId}`
    }
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCaseListUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_CASE_LIST_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CASE_LIST_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_LIST_ERROR, payload: error })
  }
}
function* getJuniorListSaga({ payload }: { payload: any }) {
  try {

    let getJuniorListUrl = `${getJuniorListRoute}?id=${payload.id}&companyId=${payload.companyId}`;
    
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getJuniorListUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_JUNIOR_LIST_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_JUNIOR_LIST_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_JUNIOR_LIST_ERROR, payload: error })
  }
}
function* addToFavoriteSaga({ payload }: { payload: FavoriteData}) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: addToFavoritesRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.ADD_FAVORITE_CASES_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.ADD_FAVORITE_CASES_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.ADD_FAVORITE_CASES_ERROR, payload: error })
  }
}

function* getCaseFavoritesSaga({ payload }: { payload: FavoriteData }) {
  try {

    let getCaseFavoriteUrl = `${getFavoriteCasesRoute}?lawyerId=${payload.lawyerId}`;
    
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCaseFavoriteUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_FAVORITE_CASES_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_FAVORITE_CASES_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_FAVORITE_CASES_ERROR, payload: error })
  }
}
function* getAllCasesSaga({ payload }: { payload: any }) {
  try {   
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getAllCasesRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_ALL_CASES_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_ALL_CASES_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_ALL_CASES_ERROR, payload: error })
  }
}
function* getAllUsersSaga({ payload }: { payload: any }) {
  try {   
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getAllUserRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_ALL_USERS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_ALL_USERS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_ALL_USERS_ERROR, payload: error })
  }
}

function* updateCaseStatusSaga({ payload }: { payload:any }) {
  try {

    const response = yield call(
      createApiCall, { method: MethodType.POST, url: updateCaseStatus, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_CASE_STATUS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.UPDATE_CASE_STATUS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_CASE_STATUS_ERROR, payload: error })
  }
}

function* reassignIndividualLawyerSaga({ payload }: { payload:any }) {
  try {

    const response = yield call(
      createApiCall, { method: MethodType.POST, url: reassignIndividualLawyer, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.REASSIGN_INDIVIDUAL_LAWYER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.REASSIGN_INDIVIDUAL_LAWYER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.REASSIGN_INDIVIDUAL_LAWYER_ERROR, payload: error })
  }
}


function* onSaveCaseSubmitWatcher() {
  yield takeLatest(ActionType.GET_DASHBOARD_DETAILS as any, getDashboardDetailsSaga);
  yield takeLatest(ActionType.GET_CASE_HEARINGS_BY_DATE as any, getCaseHearingsByDateSaga);
  yield takeLatest(ActionType.SAVE_HEARING as any, saveHearingSaga);
  yield takeLatest(ActionType.GET_CASE_LIST as any, getCaseListSaga);
  yield takeLatest(ActionType.GET_JUNIOR_LIST as any, getJuniorListSaga);
  yield takeLatest(ActionType.GET_FAVORITE_CASES as any, getCaseFavoritesSaga);
  yield takeLatest(ActionType.ADD_FAVORITE_CASES as any, addToFavoriteSaga);
  yield takeLatest(ActionType.GET_ALL_CASES as any, getAllCasesSaga);
  yield takeLatest(ActionType.GET_ALL_USERS as any, getAllUsersSaga);
  yield takeLatest(ActionType.UPDATE_CASE_STATUS as any, updateCaseStatusSaga);
  yield takeLatest(ActionType.REASSIGN_INDIVIDUAL_LAWYER as any, reassignIndividualLawyerSaga);

}

export default [
  fork(onSaveCaseSubmitWatcher),
];