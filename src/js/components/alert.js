import {RefElements} from "../root/ref-elements";

export class AlertComponent {
  host;
  btn;

  constructor() {
    this.ref = new RefElements();
  }

  topSpacer(val) {
    this.ref.html.setAttribute('style', `--header-top:${val}px;`)
  }

  openAlert() {
    this.host.classList.add('--is-show');
    this.topSpacer(this.host.clientHeight);
  }

  hideAlert() {
    this.host.classList.remove('--is-show');
    this.topSpacer(0);
  }

  appendTemplate() {
    const template = `
       <article class="alert">
        <div class="alert__wrap">
          <string class="alert__warn">
            <svg width="22" height="19" viewbox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22 19L11 0L0 19H22ZM10 16V14H12V16H10ZM10 12H12V8H10V12Z"
                    fill="currentColor"></path>
            </svg>
            You are not protected
          </string>
          <div class="alert__item">Your IP Address: 107.3.176.194</div>
          <div class="alert__item">Your ISP: Comcast Cable</div>
          <a class="alert__link" href="/">Learn More ›</a></div>
        <div class="alert__close gli-close"></div>
      </article>
    `;

    this.ref.body.querySelector('.footer').insertAdjacentHTML('afterend', template);
    this.host = document.querySelector('.alert');
    this.btn = document.querySelector('.alert__close');
  }

  init() {
    this.appendTemplate();
    this.openAlert();

    this.btn.addEventListener('click', () => {
      this.hideAlert();
    });
  }
}
