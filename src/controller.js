import DataService from './dataService';

export default class Controller {
  constructor(view) {
    this.view = view;
    this.store = [];
  }

  /**
   * Fetch list of photos from flickr
   */
  fetchPhotos(tags) {
    DataService.fetchFlickrPhotos(tags)
      .then((images) => {
        this.store = images;
        this.view.showThumbs(this.store);
      });
  }

}
