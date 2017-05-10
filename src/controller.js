import DataService from './dataService';

export default class Controller {
  constructor(view) {
    this.view = view;
    this.store = [];
    this.query = '';

    // Bind actions to UI elements & keyboard events
    view.bindSearchImage(this.searchImage.bind(this));
  }


  /**
   * Fetch list of photos from flickr
   */
  searchImage(query = '') {
    this.query = query;

    // Clear results if empty query
    if (query === '') {
      this.store = [];
      this.view.showThumbs(this.store);
    } else {
      this.fetchPhotos(query);
    }
  }

  /**
   * Fetch list of photos from flickr
   */
  fetchPhotos(query) {
    this.view.showLoading();

    DataService.fetchFlickrPhotos(query)
      .then((images) => {
        if (query === this.query) {
          this.store = images;

          if (images.length) {
            this.view.showThumbs(this.store);
          } else {
            this.view.showNoResults();
          }
        }
      });
  }
}
