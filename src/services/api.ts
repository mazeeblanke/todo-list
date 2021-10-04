import axios from 'axios';
import { API_HOST, TODOS_PATH } from 'utils/constants';

axios.defaults.baseURL = API_HOST;

const api = {
  getTodos() {
    return axios.get(TODOS_PATH);
  },
};

export default api;
