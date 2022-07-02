import {StorageWindow} from "./root/sorage-window"
import {RefElements} from './root/ref-elements';
import {HeaderComponent} from "./components/header";
import {AlertComponent} from "./components/alert";
import {AboutMeComponent} from "./components/about-me";

const loading = () => {
  const ref = new RefElements();
  const store = new StorageWindow();

  const LOAD_STATUS_NAME = '_document_loaded_status';
  const LOAD_STATUS = {process: 'loading', done: ' loaded'};

  let
    loaderDelay,
    loadStatus = store.getStorageItem(LOAD_STATUS_NAME);

  if (loadStatus === LOAD_STATUS.process || loadStatus === null) {
    loaderDelay = 1800
  } else if (loadStatus === LOAD_STATUS.done) {
    loaderDelay = 200;
    ref.html.setAttribute('style', '--transition-start-duration: 100ms')
  }

  const loadTimeout = setTimeout(() => {
    ref.html.setAttribute('loading', false);
    store.setStorageItem(LOAD_STATUS_NAME, LOAD_STATUS.done);

    clearTimeout(loadTimeout);
  }, loaderDelay);
}

const app = () => {
  const header = new HeaderComponent();
  const alert = new AlertComponent();
  const about = new AboutMeComponent();

  loading();

  alert.init();
  about.init();
  header.init();
}

window.addEventListener('DOMContentLoaded', () => {
  app()
  console.log('Loaded Page');
});
