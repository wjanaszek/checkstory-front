export class Photo {
  id: number;
  imageType: string;
  createDate: any;
  content?: string;
  storyNumber: number;
  originalPhoto: string;

  // @TODO remove this column in API?
  constructor() {
    this.originalPhoto = 'f';
  }

  static deserialize(data: any): Photo {
    const photo = new Photo();
    Object.keys(data).forEach(key => {
      photo[key] = data[key];
    });
    return photo;
  }
}
