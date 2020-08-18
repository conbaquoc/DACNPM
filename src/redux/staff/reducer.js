import { makeReducerCreator } from '../../utils/reduxUtils';
import { StaffTypes } from './actions';

// Setup inintial state for app
export const initialState = {
  isAuthenticated: !!localStorage.getItem('sessionToken'),
  data: {
    fullName: localStorage.getItem('fullName') || '',
    id: localStorage.getItem('id') || '',
    avatar: localStorage.getItem('avatar') || '',
  },
  roles: '',
  isShowLoading: false,
  loginError: false,
  loginSuccess: false,
};
// End setup

const loginSuccess = (state, {respone}) => {
  const {data} = state;
  data.fullName = respone.fullName;
  data.id = respone.id;
  data.avatar = respone.avatar;
  return {
    ...state,
    data,
    roles: respone.role.name,
    isShowLoading: false,
    isAuthenticated: true,
    loginError: false,
    loginSuccess: true,
}};

const loginFail = (state, {error}) => ({
  ...state,
  isShowLoading: false,
  isAuthenticated: false,
  loginError: error,
  loginSuccess: false,
});

const logout = () => ({
  ...initialState,
  data: {},
  isAuthenticated: false,
});

const loginLoading = (state) => ({
  ...state,
  isShowLoading: true,
})
export const staff = makeReducerCreator(initialState, {
  [StaffTypes.LOGIN_STAFF_SUCCESS]: loginSuccess,
  [StaffTypes.LOGIN_STAFF_FAIL]: loginFail,
  [StaffTypes.LOGOUT]: logout,
  [StaffTypes.LOGIN]: loginLoading,
});
