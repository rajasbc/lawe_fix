import { CreateOrderParam, ActionType } from "../../model/model";

export const createOrder = (payload: CreateOrderParam) => {
  return {
    type: ActionType.CREATE_ORDER,
    payload,
  };
};
export const clearOrder = (payload: any) => {
  return {
    type: ActionType.CLEAR_ORDER,
    payload,
  };
};
