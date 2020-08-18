import {
  post,
  get
} from '../../utils';

export async function staffLoginApi(data) {
  return post('/realtors/login', data);
}

export async function getListStaff(params) {
  return get('/staffs', params);
}

export async function getOne(id) {
  return get(`/staffs/${id}`);
}

export async function createOne(payload) {
  return post(`/staffs`, payload);
}
