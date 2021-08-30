const { gsap } = require("gsap/dist/gsap");

const stemPanelCtrl = (function () {
  const stemTitleEles = document.querySelectorAll(".stem__title > span");
  const stemHeadingEles = document.querySelectorAll(".stem__heading");
  const stemContainerEle = document.querySelector("#stem-container");
  let curHeadingSelected;

  const onHeadingClicked = function (ele) {
    var modalTargetId = ele.href.split('#')[1];
    console.log(modalTargetId);

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
    stemHeadingEles.forEach(function (item) {
      if (!item.classList.contains('stem__heading--selected')) {
        item.classList.add('stem__heading--dim');
      }
    });
  }

  const showHeadingModalInit = function () {
    console.info('Show Heading Modal initalized');
    stemHeadingEles.forEach(function (item) {
      item.addEventListener('click', function (e) {
        if (e.target.classList.contains('stem__heading-link')) {
          e.preventDefault();
          onHeadingClicked(e.target);
        }
      });
    })
  }
  const onStemAnimationComplete = function () {

    const stemHeadingAnimation = gsap.timeline({
      delay: .5,
      onComplete: function () {
        document.querySelector('.stem__title').style.display = 'none';
        showHeadingModalInit();
      }
    });

    stemHeadingAnimation.to(
      stemTitleEles[0],
      {
        x:
          stemHeadingEles[0].getBoundingClientRect().x -
          stemTitleEles[0].getBoundingClientRect().x -
          stemTitleEles[0].offsetWidth -
          stemTitleEles[0].offsetWidth / 2,
        y:
          stemHeadingEles[0].getBoundingClientRect().y -
          stemTitleEles[0].getBoundingClientRect().y -
          stemTitleEles[0].offsetHeight / 2 -
          200,
        opacity: 0,
        scale: stemHeadingEles[0].offsetHeight / stemTitleEles[0].offsetHeight,
        ease: "power1"
      },
      "<"
    ).to(
      stemTitleEles[1],
      {
        x:
          stemHeadingEles[1].getBoundingClientRect().x -
          stemTitleEles[1].getBoundingClientRect().x -
          stemTitleEles[1].offsetWidth,
        y:
          stemHeadingEles[1].getBoundingClientRect().y -
          stemTitleEles[1].getBoundingClientRect().y -
          stemTitleEles[1].offsetHeight / 2 -
          200,
        opacity: 0,
        scale: stemHeadingEles[1].offsetHeight / stemTitleEles[1].offsetHeight,
        ease: "power1"
      },
      "<"
    ).to(
      stemTitleEles[2],
      {
        x:
          stemHeadingEles[2].getBoundingClientRect().x -
          stemTitleEles[2].getBoundingClientRect().x +
          stemTitleEles[2].offsetWidth / 2 -
          stemTitleEles[2].offsetWidth / 2,
        y:
          stemHeadingEles[2].getBoundingClientRect().y -
          stemTitleEles[2].getBoundingClientRect().y -
          stemTitleEles[2].offsetHeight / 2 -
          200,
        opacity: 0,
        scale: stemHeadingEles[2].offsetHeight / stemTitleEles[2].offsetHeight,
        ease: "power1"
      },
      "<"
    ).to(
      stemTitleEles[3],
      {
        x:
          stemHeadingEles[3].getBoundingClientRect().x -
          stemTitleEles[3].getBoundingClientRect().x +
          stemTitleEles[3].offsetWidth,
        y:
          stemHeadingEles[3].getBoundingClientRect().y -
          stemTitleEles[3].getBoundingClientRect().y -
          stemTitleEles[3].offsetHeight / 2 -
          200,
        opacity: 0,
        scale: stemHeadingEles[3].offsetHeight / stemTitleEles[3].offsetHeight,
        ease: "power1"
      },
      "<"
    ).to(".stem__heading", { opacity: 1, duration: 2.5, ease: 'power1' }, "-=3.0");
  };

  const revealSTEMAnimation = function () {
    let stemAnimation = gsap.timeline({ onComplete: onStemAnimationComplete });
    stemAnimation
      .from(".stem__title", { ease: "linear", autoAlpha: 0, duration: 0 })
      .from(
        ".stem__title > span",
        {
          duration: 2.5,
          opacity: 0,
          stagger: { amount: 0.25, from: "center" }
        },
        "<"
      )
      .to(
        stemTitleEles[0],
        { scale: 1.8, y: -200, x: -stemTitleEles[0].getBoundingClientRect().width }
      )
      .to(
        stemTitleEles[1],
        {
          scale: 1.8,
          y: -200,
          x: -stemTitleEles[1].getBoundingClientRect().width / 2
        }
      )
      .to(
        stemTitleEles[2],
        {
          scale: 1.8,
          y: -200,
          x: stemTitleEles[2].getBoundingClientRect().width / 2
        }
      )
      .to(
        stemTitleEles[3],
        { scale: 1.8, y: -200, x: stemTitleEles[3].getBoundingClientRect().width }
      );
  };

  return {
    init: function () {
      stemContainerEle.style.visibility = "inherit";
      document.querySelector('.secondary-nav').classList.toggle('secondary-nav--hidden');
      revealSTEMAnimation();
    }
  }
})()

module.exports = stemPanelCtrl;