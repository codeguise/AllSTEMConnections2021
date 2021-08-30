const HomeCtrl = require('./Home/homeController');

HomeCtrl.init();

const App = (function () {

  const init = function () {
    console.log("Initialize App");
  }

  return {
    init
  };
})();

const onDomLoaded = function (evt) {
  console.log('DOM Loaded');
  App.init();
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
