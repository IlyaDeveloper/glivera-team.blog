import {RefElements} from "../root/ref-elements";
import {StorageWindow} from "../root/sorage-window";

export class HeaderComponent {
  host = document.querySelector('.header');
  menu = document.querySelector('.header__menu');
  menuBtn = document.querySelector('.header__btn-menu');
  menuLink = document.querySelectorAll('.header__link');

  isActive = false;

  constructor() {
    this.ref = new RefElements()
    this.store = new StorageWindow()
  }

  headerSticky() {
    // document.addEventListener('scroll', () => {
    //   let
    //     elmNext = document.querySelector('.in-ukraine'),
    //     elmFirst = window.getComputedStyle(document.querySelector('.welcome')),
    //     elmFirstSize = elmFirst.paddingBottom,
    //     posScroll = window.scrollY,
    //     posElm = elmNext.offsetTop;
    //
    //   (posScroll >= (posElm - parseInt(elmFirstSize)))
    //     ? this.host.classList.add('--on-scroll')
    //     : this.host.classList.remove('--on-scroll')
    // })
  };

  activeMenu() {
    this.menu.classList.add('--is-active');
    this.menuBtn.classList.add('--is-active');

    this.ref.disableScroll();
    this.ref.enableBlurLayout();
  }

  unActiveMenu() {
    this.menu.classList.remove('--is-active');
    this.menuBtn.classList.remove('--is-active');

    this.ref.enableScroll();
    this.ref.disableBlurLayout();
  }

  init() {
    this.headerSticky();

    this.menuBtn.addEventListener('click', () => {
      (this.isActive = !this.isActive)
        ? this.activeMenu()
        : this.unActiveMenu()
    });

    this.menuLink.forEach(btn => btn.addEventListener('click', this.unActiveMenu));
  }
}
