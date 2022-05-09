import {StorageWindow} from "./modules/sorage-window"
import {RefElements} from './modules/ref-elements';

const LOAD_STATUS_NAME = '_document_loaded_status';
const LOAD_STATUS = {process: 'loading', done: ' loaded'};
const CONSENT_STATUS = '_document_consent_status';
let ref = new RefElements();
let store = new StorageWindow()

const mobileMenuInit = () => {
  const btnMenu = document.querySelector('.header__menu');
  const menuLink = document.querySelectorAll('.mobile-menu__link');
  const menuBtn = document.querySelector('.mobile-menu__btn');

  const bodyScrollToggle = (flag) => {
    if (flag) {
      ref.html.classList.add('gm-scroll-hide');
      ref.body.classList.add('gm-scroll-hide');
      ref.layout.classList.add('gm-blur');
      ref.layout.classList.add('gm-blur');
    } else {
      ref.html.classList.remove('gm-scroll-hide');
      ref.body.classList.remove('gm-scroll-hide');
      ref.layout.classList.remove('gm-blur');
      ref.layout.classList.remove('gm-blur');
    }
  }

  menuBtn.addEventListener('click', () => {
    bodyScrollToggle(false);
    ref.mobMenu.classList.remove('--is-open');
    btnMenu.classList.remove('--is-active');
  })

  btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('--is-active');

    ref.mobMenu.classList.toggle('--is-open');

    (btnMenu.classList.contains('--is-active'))
      ? bodyScrollToggle(true)
      : bodyScrollToggle(false);
  });

  menuLink.forEach(btn => {
    btn.addEventListener('click', () => {
      btnMenu.classList.remove('--is-active');
      ref.mobMenu.classList.remove('--is-open');

      bodyScrollToggle(false);
    });
  });
}

const headerScrollInit = () => {
  document.addEventListener('scroll', () => {
    let
      elmNext = document.querySelector('.in-ukraine'),
      elmFirst = window.getComputedStyle(document.querySelector('.welcome')),
      elmFirstSize = elmFirst.paddingBottom,
      posScroll = window.scrollY,
      posElm = elmNext.offsetTop;

    (posScroll >= (posElm - parseInt(elmFirstSize)))
      ? ref.header.classList.add('--on-scroll')
      : ref.header.classList.remove('--on-scroll')
  })
};

const loaderInit = () => {
  let loaderDelay;
  let loadStatus = store.getStorageItem(LOAD_STATUS_NAME)

  if (loadStatus === LOAD_STATUS.process || loadStatus === null) {
    loaderDelay = 1800
  } else if (loadStatus === LOAD_STATUS.done) {
    loaderDelay = 100;
    ref.html.setAttribute('style', '--transition-start-duration: 100ms')
  }

  const loader = ref.html;

  setTimeout(() => {
    loader.setAttribute('loading', false);
    store.setStorageItem(LOAD_STATUS_NAME, LOAD_STATUS.done)
  }, loaderDelay);
}

const consentInit = () => {
  const block = document.querySelector('.consent');
  const btn = document.querySelector('.consent__btn');
  const isCookie = store.getCookieItem(CONSENT_STATUS);

  if (isCookie === false || isCookie === null || isCookie === undefined) {
    block.classList.remove('--hide');
  } else if (isCookie === true) {
    block.classList.add('--hide');
  }

  btn.addEventListener('click', () => {
    store.setCookieItem(CONSENT_STATUS, true);
    block.classList.add('--hide');
  })
}

const alertInit = () => {
  const alert = document.querySelector('.alert');
  const btn = document.querySelector('.alert__close');

  const topSpacer = (val) => {
    ref.html.setAttribute('style', `--header-top:${val}px;`)
  }

  const openAlert = () => {
    (alert.classList.contains('--is-show'))
      ? topSpacer(alert.clientHeight)
      : topSpacer(0);

    alert.classList.add('--is-show');
  }

  const hideAlert = () => {
    alert.classList.remove('--is-show');
    topSpacer(0);
  }

  openAlert();

  btn.addEventListener('click', () => {
    hideAlert();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loaderInit()
  // consentInit()
  // mobileMenuInit();
  headerScrollInit();
  alertInit()
});
