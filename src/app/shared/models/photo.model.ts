export class Photo {
  id: number;
  imageType: string;
  createDate: any;
  content?: string;
  storyNumber: number;

  static deserialize(data: any): Photo {
    const photo = new Photo();
    Object.keys(data).forEach(key => {
      photo[key] = data[key];
    });
    return photo;
  }
}
