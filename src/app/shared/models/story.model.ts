import { Photo } from './photo.model';

export class Story {
  id: number;
  title: string;
  notes: string;
  latitude: number;
  longitude: number;
  createDate: any;
  photos: Photo[];

  static deserialize(data: any): Story {
    const story = new Story();
    Object.keys(data).forEach(key => {
      console.log('key = ' + key + ', ' + data[key]);
      story[key] = data[key];
    });
    return story;
  }
}
