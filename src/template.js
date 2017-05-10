export default class Template {
  /**
   * HTML template for a single thumbnail
   */
  static thumb(item, index) {
    const { thumb, image, title } = item;

    return `
      <li class="thumb">
        <img
          srcset="
            ${thumb.small} 75w,
            ${thumb.large} 150w"
          sizes="
            (max-width: 32.1rem) 75px,
            150px"
          src="${thumb.large}"
          alt="${title}"
        />
     </li>
    `;
  }

  /**
   * HTML template for the thumbnails
   */
  static thumbnails(items) {
    let index = 0;
    const thumbs = items.reduce((tmpl, item) => {
      const newTmpl = tmpl + Template.thumb(item, index);
      index += 1;
      return newTmpl;
    }, '');

    return `
      <ul class="thumbs-list">
        ${thumbs}
      </ul>
    `;
  }

  /**
   * HTML template for loading message
   */
  static message(message = '') {
    return `
      <div class="message">
        ${message}
      </div>
    `;
  }
}
