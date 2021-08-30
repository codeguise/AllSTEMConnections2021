const tsParticles = require("tsparticles");


const ParticleCtrl = (function (tsParticles) {
  const particleConfigURL = './js/config/particles-config-color-v2.json';
  //const particleConfigURL = './js/config/particlesjs-config.json';

  return {
    init: function (particleDOMEle) {
      console.log("URL to CONFIG file:", particleConfigURL);
      console.log(particleDOMEle.id);
      tsParticles.particlesJS.load(particleDOMEle.id, particleConfigURL, function () {
        console.log("Particles Loaded");
      });

    }
  };
})(tsParticles);

module.exports = ParticleCtrl;