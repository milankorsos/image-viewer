/* eslint-disable no-unused-vars */
import 'normalize.css';
import Controller from './controller';
import View from './view';
import '../assets/index.scss';

const view = new View();
const controller = new Controller(view);
