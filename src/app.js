/* global window */
import 'normalize.css';
import Controller from './controller';
import Template from './template';
import View from './view';
import '../assets/index.scss';

const template = new Template();
const view = new View(template);
const controller = new Controller(view);

const fetchPhotos = () => controller.fetchPhotos('sunrays');
window.addEventListener('load', fetchPhotos, true);
