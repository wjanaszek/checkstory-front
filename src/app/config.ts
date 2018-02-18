import { environment } from '../environments/environment';

export const config = {
  endpoints: {
    checkEmail: environment.apiUrl + '/api/users/checkEmail',
    checkLogin: environment.apiUrl + '/api/users/checkLogin',
    createUser: environment.apiUrl + '/api/users',

    createStory: environment.apiUrl + '/api/stories',
    loadStoryList: environment.apiUrl + '/api/stories',
    loadPhotoList: environment.apiUrl + '/api/stories/:storyNumber/photos',

    login: environment.apiUrl + '/login',
  },

  WarsawLatitude: 52.2297700,
  WarsawLongitude: 21.0117800
};
