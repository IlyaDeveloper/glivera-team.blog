import {RefElements} from "../root/ref-elements";

export class AlertComponent {
  host = document.querySelector('.alert');
  btn = document.querySelector('.alert__close');

  ref = new RefElements();

  constructor() {
  }

  topSpacer(val) {
    this.ref.html.setAttribute('style', `--header-top:${val}px;`)
  }

  openAlert() {
    (this.host.classList.contains('--is-show'))
      ? this.topSpacer(this.host.clientHeight)
      : this.topSpacer(0);

    this.host.classList.add('--is-show');
  }

  hideAlert() {
    this.host.classList.remove('--is-show');
    this.topSpacer(0);
  }


  init() {
    this.openAlert();

    this.btn.addEventListener('click', () => {
      this.hideAlert();
    });
  }
}
