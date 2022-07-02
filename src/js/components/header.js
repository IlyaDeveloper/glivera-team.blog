import {RefElements} from "../root/ref-elements";
import {StorageWindow} from "../root/sorage-window";

export class HeaderComponent {
  menu = document.querySelector('.header__menu');
  menuBtn = document.querySelector('.header__btn-menu');
  menuLink = document.querySelectorAll('.header__link');

  isActive = false;

  constructor() {
    this.ref = new RefElements()
    this.store = new StorageWindow()
  }

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
    this.menuBtn.addEventListener('click', () => {
      (this.isActive = !this.isActive)
        ? this.activeMenu()
        : this.unActiveMenu()
    });

    this.menuLink.forEach(btn => btn.addEventListener('click', this.unActiveMenu));
  }
}
