/* global document */
import Template from './template';

export default class View {
  constructor(template) {
    this.$images = document.querySelector('.images');
    this.$searchBar = document.getElementById('search-bar');
  }

  /**
   * Render thumbnails
   */
  showThumbs(items) {
    this.$images.innerHTML = Template.thumbnails(items);
  }

  showLoading() {
    this.$images.innerHTML = Template.message('Loading');
  }

  showNoResults() {
    const query = this.$searchBar.value;
    this.$images.innerHTML = Template.message(`No results for ${query}.`);
  }

  bindSearchImage(action) {
    View.bindActionToKeyEvent(this.$searchBar, action);
  }

  /**
   * @private Bind an action to a keyboard event
   */
  static bindActionToKeyEvent(element, action) {
    const eventListener = (e) => {
      action(element.value);
    };
    element.addEventListener('keyup', eventListener, true);
  }
}
