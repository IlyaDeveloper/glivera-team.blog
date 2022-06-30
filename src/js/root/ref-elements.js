export class RefElements {

  constructor() {
    this.html = document.querySelector('html');
    this.body = document.querySelector('body');
    this.layout = document.querySelector('.layout');
  }

  disableScroll() {
    this.html.classList.add('gm-scroll-hide');
    this.body.classList.add('gm-scroll-hide');
  }

  enableScroll() {
    this.html.classList.remove('gm-scroll-hide');
    this.body.classList.remove('gm-scroll-hide');
  }

  enableBlurLayout() {
    this.layout.classList.add('gm-blur');
    this.layout.classList.add('gm-blur');
  }

  disableBlurLayout() {
    this.layout.classList.remove('gm-blur');
    this.layout.classList.remove('gm-blur');
  }

  checkElementInDOM(elm, func) {
    if (typeof (elm) != 'undefined' && elm != null) {
      return func()
    }
  }
}

