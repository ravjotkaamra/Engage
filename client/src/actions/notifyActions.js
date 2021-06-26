export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

// for removing the old noitification message if any
let prevTimerId = null;

export const setNotification = (notification) => {
  return async (dispatch) => {
    // before displaying a new notification on to the screen,
    // first remove the timer set by the old notification
    clearTimeout(prevTimerId);

    dispatch({
      type: SET_NOTIFICATION,
      payload: notification,
    });

    prevTimerId = setTimeout(() => {
      dispatch(clearNotification());
    }, notification.timeout);
  };
};

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION,
  };
};
