import { environment } from '../environments/environment';

export const config = {
  endpoints: {
    checkEmail: environment.apiUrl + '/api/users/checkEmail',
    checkLogin: environment.apiUrl + '/api/users/checkLogin',
    createUser: environment.apiUrl + '/api/users',
    login: environment.apiUrl + '/login',
  }
};
