import DataService from './dataService';
import { debounce } from './helpers';

export default class Controller {
  constructor(view) {
    this.view = view;
    this.store = [];
    this.query = '';

    // Bind actions to UI elements & keyboard events
    const debouncedSearchImage = debounce(this.searchImage.bind(this), 200);
    view.bindSearchImage(debouncedSearchImage);
  }

  /**
   * Fetch list of photos from flickr
   */
  searchImage(query = '') {
    if (query !== this.query) {
      this.query = query;

      if (query === '') {
        this.store = [];
        this.view.showThumbs(this.store);
      } else {
        this.fetchPhotos(query);
      }
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
