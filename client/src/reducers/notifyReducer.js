import * as actions from '../actions/noitifyActions';

const initialState = { message: null, type: '' };

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_NOTIFICATION:
      return action.payload;
    case actions.CLEAR_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default notifyReducer;
