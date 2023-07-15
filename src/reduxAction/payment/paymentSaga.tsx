import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { createApiCall, MethodType,createOrderRoute } from '../../services/Api';
import { CreateOrderParam, ActionType } from '../../model/model';

// payment
function* createOrderSaga({ payload }: { payload: CreateOrderParam }) {
  try {
    const loginUrl = createOrderRoute;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: loginUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.CREATE_ORDER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.CREATE_ORDER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.CREATE_ORDER_ERROR, payload: error })
  }
}
function* oncreateOrderWatcher() {
  yield takeLatest(ActionType.CREATE_ORDER as any, createOrderSaga);;
}

export default [
  fork(oncreateOrderWatcher),
];