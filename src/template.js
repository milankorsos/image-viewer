export default class Template {
  /**
   * HTML template for a single thumbnail
   */
  static thumb(item) {
    const { thumb, title, views } = item;

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
        <div>${views}</div>
     </li>
    `;
  }

  /**
   * HTML template for the thumbnails
   */
  static thumbnails(items) {
    const thumbs = items.reduce((tmpl, item) => tmpl + Template.thumb(item), '');

    return `
      <ul class="thumbs-list">
        ${thumbs}
      </ul>
    `;
  }

  /**
   * HTML template for messages
   */
  static message(message = '') {
    return `
      <div class="message">
        ${message}
      </div>
    `;
  }
}
