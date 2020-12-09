import { get, put, post, del } from '../utils';

export const getList = (resource, filter) => {  
  return get(`/${resource}`, filter);
};

export const getOneRecord = (resource, id, params) => {
  return get(`/${resource}/${id}`, params);
};

export const callFunctionCloudCode = (functions, params) => {
  return post(`/functions/${functions}`, params);
};

export const deleteRecord = (resource, id) => {
  return del(`/${resource}` , id);
};

export const postRecord = (resource, data) => {
  return post(resource === 'Users' ? '/users' : `/${resource}`, data);
};

export const putRecord = (resource, id, data) => {
  return put(`/${resource}/${id}`, data);
};

export const cancelRecord = (resource, id) => {
  return put(`/${resource}/${id}/cancel`);
};

export const batch = data => {
  return post('/batch', data);
};

export const customQuery = (resource, id, queryUrl, data) => {
  return put(`/${resource}/${id}/${queryUrl}`, data);
};

export const exportExcel = (resource, params) => {
  return get(`/${resource}/exportExcel`, params);
};
