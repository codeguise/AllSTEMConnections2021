const ParticleCtrl = require('../Particles/particleController.js');
const { gsap } = require("gsap/dist/gsap");
const HomeIntroCtrl = require('./homeIntro');

const HomeCtrl = (function () {

  const homeDOMEles = {
    particlesDOMContainer: document.getElementById('particles-js'),
    heroHeadingBtn: document.getElementById('startIntroBtn'),
    explodingObjDOMContainer: document.getElementById('babylon-canvas'),
    stemDOMContainer: document.getElementById('stem-container'),
    mainNavBar: document.querySelector('.main-nav'),
    secondaryNavBar: document.querySelector('.secondary-nav')
  }

  const onStartIntroClicked = function (e) {
    homeDOMEles.mainNavBar.classList.toggle('main-nav--hidden');
    homeDOMEles.secondaryNavBar.classList.toggle('secondary-nav--hidden');
    console.info("Start Intro Button clicked");
    e.preventDefault();

    gsap.to(homeDOMEles.heroHeadingBtn, {
      opacity: 0,
      x: 200,
      duration: 1.25,
      ease: "power2.out",
      callbackScope: this,
      onComplete: function () {
        homeDOMEles.heroHeadingBtn.parentElement.style.display = "none";
        HomeIntroCtrl.init();
      }
    })
  }

  return {
    init: function () {

      homeDOMEles.heroHeadingBtn.addEventListener('click', onStartIntroClicked);
      ParticleCtrl.init(homeDOMEles.particlesDOMContainer);
    }
  }
})();

module.exports = HomeCtrl;