import {
  post,
  get
} from '../../utils';

export async function staffLoginApi(data) {
  return post('/admins/login', data);
}

export async function getListStaff(params) {
  return get('/users', params);
}

export async function getOne(id) {
  return get(`/users/${id}`);
}

export async function createOne(payload) {
  return post(`/staffs`, payload);
}

export async function handleGetUser(params) {
  return get('/users' , params);
}
