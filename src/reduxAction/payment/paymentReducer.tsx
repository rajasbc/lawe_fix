import { Action, ActionType, CreateOrderParam } from "../../model/model";
import createReducer from "../createReducer";


export interface CreateOrderReducerType {
  loading: boolean;
  error?: string;
  orderDetail: any;
}
const defaultState: CreateOrderReducerType = {
  loading: false,
  error: undefined,
  orderDetail: null
}



export const paymentReducer = createReducer<CreateOrderReducerType>(defaultState, {

  [ActionType.CREATE_ORDER](state: CreateOrderReducerType, action: Action<CreateOrderParam>) {
    return {
      ...state,
      loading: true,
    };
  },

  [ActionType.CREATE_ORDER_ERROR](state: CreateOrderReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.CREATE_ORDER_SUCCESS](state: CreateOrderReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      orderDetail: action.payload,
    };
  },
  [ActionType.CLEAR_ORDER](state: CreateOrderReducerType, action: Action<number>) {

    return {
      ...state,
      loading: false,
      error: null,
      orderDetail: null,
    };
  },

});
