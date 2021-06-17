import { ActionType } from "../Constant/BooleanType";
export const setValue = (value) => {
  return {
    type: ActionType.SET_VALUE,
    payload: value,
  };
};
