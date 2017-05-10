/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Template {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Template;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dataService__ = __webpack_require__(6);


class Controller {
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

    __WEBPACK_IMPORTED_MODULE_0__dataService__["a" /* default */].fetchFlickrPhotos(query)
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Controller;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template__ = __webpack_require__(0);
/* global document */


class View {
  constructor(template) {
    this.$images = document.querySelector('.images');
    this.$searchBar = document.getElementById('search-bar');
  }

  /**
   * Render thumbnails
   */
  showThumbs(items) {
    this.$images.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template__["a" /* default */].thumbnails(items);
  }

  showLoading() {
    this.$images.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template__["a" /* default */].message('Loading');
  }

  showNoResults() {
    const query = this.$searchBar.value;
    this.$images.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template__["a" /* default */].message(`No results for ${query}.`);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = View;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_normalize_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_index_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_index_scss__);
/* global window */





const view = new __WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */]();
const controller = new __WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */](view);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* global fetch */
class DataService {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = DataService;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map