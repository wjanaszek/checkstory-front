import { environment } from '../environments/environment';

export const config = {
  endpoints: {

    // User
    createUser: environment.apiUrl + '/api/auth/sign-up',
    login: environment.apiUrl + '/api/auth/login',
    checkEmail: environment.apiUrl + '/api/auth/check/email',
    checkLogin: environment.apiUrl + '/api/auth/check/username',

    // Story
    createStory: environment.apiUrl + '/api/stories',
    deleteStory: environment.apiUrl + '/api/stories/:id',
    loadStoryList: environment.apiUrl + '/api/stories',
    loadStory: environment.apiUrl + '/api/stories/:id',
    updateStory: environment.apiUrl + '/api/stories/:id',

    // Photo
    comparePhotos: environment.apiUrl + '/api/photos/compare/:firsId/with/:secondId',
    createPhoto: environment.apiUrl + '/api/stories/:storyId',
    deletePhoto: environment.apiUrl + '/api/stories/:storyId/photos/:photoId',
    loadPhotoList: environment.apiUrl + '/api/stories/:storyId/photos',
    updatePhoto: environment.apiUrl + '/api/stories/:storyId/photos/:photoId',
  },

  WarsawLatitude: 52.2297700,
  WarsawLongitude: 21.0117800
};
