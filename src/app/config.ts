import { environment } from '../environments/environment';

export const config = {
  endpoints: {
    checkEmail: environment.apiUrl + '/api/users/checkEmail',
    checkLogin: environment.apiUrl + '/api/users/checkLogin',

    // User
    createUser: environment.apiUrl + '/api/users',

    // Story
    createStory: environment.apiUrl + '/api/stories',
    deleteStory: environment.apiUrl + '/api/stories/:storyNumber',
    loadStoryList: environment.apiUrl + '/api/stories',
    loadSelectedStory: environment.apiUrl + '/api/stories/:storyNumber',
    updateStory: environment.apiUrl + '/api/stories/:storyNumber',

    // Photo
    comparePhotos: environment.apiUrl + '/api/images-compare',
    createPhoto: environment.apiUrl + '/api/stories/:storyNumber/photos',
    deletePhoto: environment.apiUrl + '/api/stories/:storyNumber/photos/:photoNumber',
    loadPhotoList: environment.apiUrl + '/api/stories/:storyNumber/photos',
    updatePhoto: environment.apiUrl + '/api/stories/:storyNumber/photos/:photoNumber',

    login: environment.apiUrl + '/login',
  },

  WarsawLatitude: 52.2297700,
  WarsawLongitude: 21.0117800
};
