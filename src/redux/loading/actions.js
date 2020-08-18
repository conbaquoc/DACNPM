import { makeConstantCreator, makeActionCreator } from '../../utils/reduxUtils';

export const MainLoadingTypes = makeConstantCreator('CHANGE_MAIN_LOADING_STATUS');

export const changeMainLoadingStatus = data =>
  makeActionCreator(MainLoadingTypes.CHANGE_MAIN_LOADING_STATUS, { data });
