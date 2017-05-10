/* global fetch */
export default class DataService {
  /**
   * @private Build a flickr API request url
   */
  static getFlickrApiUrl(tags) {
    let url = 'https://api.flickr.com/services/rest/';
    url += '?method=flickr.photos.search';
    url += `&tags=${tags}`;
    url += '&api_key=1c65326b7011ff7bd6e5df2cb2611b4e';
    url += '&sort=interestingness-desc';
    url += '&extras=url_sq,url_q,url_l';
    url += '&format=json&nojsoncallback=1';
    return url;
  }

  /**
   * Returns a promise with photos from flickr
   */
  static fetchFlickrPhotos(tags) {
    const url = DataService.getFlickrApiUrl(tags);
    return fetch(url)
      .then(json => json.json())
      .then(data => data.photos.photo.map((photo) => {
        const { title, url_sq, url_q, url_l } = photo;
        return {
          title,
          thumb: {
            small: url_sq,
            large: url_q,
          }
        };
      }));
  }
}
