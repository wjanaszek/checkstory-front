import { environment } from '../environments/environment';

export const config = {
  endpoints: {
    checkEmail: environment.apiUrl + '/api/users/checkEmail',
    checkLogin: environment.apiUrl + '/api/users/checkLogin',
    createUser: environment.apiUrl + '/api/users',

    loadStoryList: environment.apiUrl + '/api/stories',
    loadPhotoList: environment.apiUrl + '/api/stories/:storyNumber/photos',

    login: environment.apiUrl + '/login',
  }
};
