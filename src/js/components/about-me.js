import {RefElements} from "../root/ref-elements";
import ABOUT_ME_IMAGE from "../../assets/images/about-img.jpg";
import p5 from "../../../node_modules/p5/lib/p5.js"

export class AboutMeComponent {
  host;
  btn;

  constructor() {
    this.ref = new RefElements();
  }

  triangleAnimation(canvas) {
    const CONFIG_TRIANGLE = {
      lines: 380,
      color: '#5DDF5A'
    };
    let w, h;
    let drawLines = (p5) => {
      let color = CONFIG_TRIANGLE.color;
      let count = CONFIG_TRIANGLE.lines;

      p5.setup = () => {
        w = canvas.clientWidth;
        h = canvas.clientHeight;

        p5.createCanvas(w, h);
      };

      p5.windowResized = () => {
        w = canvas.clientWidth;
        h = canvas.clientHeight;

        p5.resizeCanvas(w, h);
      }

      let
        t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0,

        dt1 = p5.random(0.01, 0.001),
        dt2 = p5.random(0.02, 0.002),
        dt3 = p5.random(0.03, 0.003),
        dt4 = p5.random(0.04, 0.004),

        rnd = p5.random(10, 800),
        wR = p5.random(0.05, 0.005) + (w / 2),
        hR = p5.random(0.05, 0.005) + (h / 2);

      p5.draw = () => {
        p5.clear();
        p5.noFill();
        p5.stroke(color);

        for (let i = 1; i < count; i++) {
          p5.triangle(
            p5.abs(p5.sin(t1 + i * rnd)) * w,
            p5.abs(p5.cos(t2 + i * rnd)) * h,
            p5.abs(p5.sin(t3 + i * rnd)) * w,
            p5.abs(p5.cos(t4 + i * rnd)) * h,
            p5.abs(p5.cos(t5 + i * rnd)) * h,
            p5.abs(p5.cos(t6 + i * rnd)) * h,
          );
        }
        t1 += dt1;
        t2 += dt2;
        t3 += dt3;
        t4 += dt4;
        t5 += wR;
        t6 += hR;
      }
    }
    let lineAnimationInit = new p5(drawLines, canvas);
  }

  appendTemplate() {
    const template = `
        <article class="about-me">
          <div class="about-me__wrap">
            <picture class="about-me__img"><img src=${ABOUT_ME_IMAGE}></picture>
            <div class="about-me__main">
              <h3 class="about-me__caption">Pashchuk Ilya</h3>
              <div class="about-me__links">
                <mark>About me: </mark>
                <a class="about-me__link" href="https://justtwic.art" target="_blank">Site</a>
                <a class="about-me__link" href="https://www.upwork.com/freelancers/~01a55c9104e7bb7210" target="_blank">Upwork</a>
                <a class="about-me__link" href="https://github.com/IlyaDeveloper" target="_blank">GitHab</a>
                <a class="about-me__link" href="https://gitlab.com/illyadeveloper " target="_blank">GitLab</a>
                <a class="about-me__link --btn" href="tel:+380933850675">Call Me</a>
              </div>
              <div class="about-me__links">
                <mark>Last project: </mark>
                <a class="about-me__link" href="https://kasi.justtwic.art" target="_blank">Ksi Money</a>
                <a class="about-me__link" href="https://www.loom.com/share/1c217f3ae09c4754ae5112f13ac4a01f" target="_blank">View Sources Ksi
                  Money</a>
              </div>
               <div class="about-me__links">
                 <mark>This project: </mark>
                 <a class="about-me__link --btn" href="https://github.com/IlyaDeveloper/glivera-team.blog" target="_blank">Source Code</a>
               </div>
            </div>
            <article class="about-me__canvas"></article>
          </div>
          <button class="about-me__close">
            <span>For a detailed view of this work, just click</span>
          </button>
        </article>
    `;

    this.ref.body.querySelector('.footer').insertAdjacentHTML('afterend', template);
    this.host = document.querySelector('.about-me');
    this.btn = document.querySelector('.about-me__close');
    this.ref.disableScroll();

    let canvas = document.querySelector('.about-me__canvas')

    this.triangleAnimation(canvas);
  }

  init() {
    setTimeout(() => {
        this.appendTemplate();

        this.btn.addEventListener('click', () => {
          this.host.remove();
          this.ref.enableScroll()
        });
      }, 2400
    )
  }
}
