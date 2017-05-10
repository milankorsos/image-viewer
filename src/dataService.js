/* global fetch */
export default class DataService {
  /**
   * @private Build a flickr API request url
   */
  static getFlickrApiUrl(query) {
    let url = 'https://api.flickr.com/services/rest/';
    url += '?method=flickr.photos.search';
    url += `&text=${query}`;
    url += '&api_key=4e258a4396bf5ba0448b2e2fe574034e';
    url += '&sort=interestingness-desc';
    url += '&extras=url_sq,url_q,views';
    url += '&format=json&nojsoncallback=1';
    return url;
  }

  /**
   * Returns a promise with photos from flickr
   */
  static fetchFlickrPhotos(query) {
    const url = DataService.getFlickrApiUrl(query);
    return fetch(url)
      .then(json => json.json())
      .then(data => data.photos.photo.map((photo) => {
        const { title, url_sq, url_q, views } = photo;
        return {
          title,
          thumb: {
            small: url_sq,
            large: url_q,
          },
          views,
        };
      }));
  }
}
