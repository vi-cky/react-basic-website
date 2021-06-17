import { ActionType } from "../Constant/BooleanType";

const initialState = {
  auth: true,
};
export const booleanReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.SET_VALUE: {
      return { ...state, auth: payload };
    }
    default:
      return state;
  }
};
