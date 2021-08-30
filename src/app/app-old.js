var curHeadingSelected;
var stemHeadingCollection;
function onHeadingClicked(ele) {
  var modalTargetId = ele.href.split('#')[1];

  if (curHeadingSelected !== undefined) {
    curHeadingSelected.classList.remove('stem__heading--selected');
    curHeadingSelected.classList.remove('.stem__heading--dim');
    document
      .querySelector('.stem__modal--open')
      .classList.remove('stem__modal--open');
  }
  ele.parentElement.classList.remove('stem__heading--dim');
  ele.parentElement.classList.add('stem__heading--selected');
  curHeadingSelected = ele.parentElement;
  document.getElementById(modalTargetId).classList.add('stem__modal--open');
  stemHeadingCollection.forEach(function (item) {
    if (!item.classList.contains('stem__heading--selected')) {
      item.classList.add('stem__heading--dim');
    }
  });
}
function onDomLoaded(evt) {
  console.log('DOM Loaded');
  var particleJSConfigURL =
    window.location.hash === '#lightMode'
      ? 'js/particlesjs-config-light.json'
      : 'js/particles-config.json';
  if (window.location.hash === '#lightMode') {
    console.log('Enable Light Mode');
    document.body.classList.add('lightUI');
    document.querySelector('.logo__img').src = 'imgs/allstem-logo-dark.svg';
  }
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', particleJSConfigURL, function () {
    console.log('callback - particles.js config loaded');
  });

  stemHeadingCollection = document.querySelectorAll('.stem__heading');
  stemHeadingCollection.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.classList.contains('heading__link')) {
        e.preventDefault();
        onHeadingClicked(e.target);
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', onDomLoaded);
