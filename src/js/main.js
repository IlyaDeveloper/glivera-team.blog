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

const languageAsideInit = () => {
  const btn = document.querySelectorAll('.choose-language__btn');
  const btnToUp = document.querySelector('.choose-language__to-up');
  const lastElm = document.querySelector('.footer');
  const getLang = ref.html.getAttribute('lang');

  btn.forEach((event) => {
    if (getLang === 'en') {
      btn[0].classList.add('--is-active');
      btn[1].classList.remove('--is-active')
    } else if (getLang === 'ru') {
      btn[0].classList.remove('--is-active');
      btn[1].classList.add('--is-active')
    }

    event.addEventListener('click', () => {
      btn.classList.remove('--is-active');
      event.classList.add('--is-active')
    })
  })

  window.addEventListener('scroll', (e) => {
    (ref.html.scrollTop < ref.html.scrollHeight - (ref.html.clientHeight + lastElm.clientHeight))
      ? btnToUp.classList.add('gm-hide')
      : btnToUp.classList.remove('gm-hide')
  })

  btnToUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })
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

window.addEventListener('DOMContentLoaded', () => {
  loaderInit()
  mobileMenuInit();
  headerScrollInit();
  languageAsideInit();
  consentInit()
});
