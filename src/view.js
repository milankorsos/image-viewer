/* global document */
import Template from './template';

export default class View {
  constructor(template) {
    this.template = template;

    this.$images = document.querySelector('.images');
    this.$container = document.getElementById('container');
    this.$body = document.getElementsByTagName('body')[0];
  }

  /**
   * Render thumbnails
   */
  showThumbs(items) {
    this.$images.innerHTML = Template.thumbnails(items);
  }
}
