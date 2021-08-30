/// <reference path='../Vendor/babylon.d.ts'/>
const { gsap } = require("gsap/dist/gsap");
const stemPanelCtrl = require('./stemPanel');


const startSTEMPanel = function () {
  gsap.to("#babylon-canvas", {
    opacity: 0,
    onComplete: function () {
      document.getElementById('babylon-canvas').style.display = "none";
    }
  });

  stemPanelCtrl.init();
}

const homeIntroCtrl = (function () {
  const particleBoxColors = [
    {
      r: 233,
      g: 29,
      b: 58
    },
    {
      r: 69,
      g: 186,
      b: 235
    },
    {
      r: 127,
      g: 88,
      b: 165
    },
    {
      r: 251,
      g: 170,
      b: 25
    },
    {
      r: 186,
      g: 58,
      b: 150
    },
    {
      r: 176,
      g: 209,
      b: 44
    }
  ]


  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  //Set variables
  const speed = 1.5;
  const gravity = -0.01;
  let clickedExplosion;
  let explodeMesh = [];
  let explodePos = 0;
  let spsMesh;

  const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.0000000000000001);

    //BABYLON.MeshBuilder.CreateBox("box", {})
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 10, -100));
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    let SPS = new BABYLON.SolidParticleSystem("SPS", scene);
    let particleBox = BABYLON.MeshBuilder.CreateBox("b", {});

    SPS.addShape(particleBox, 2000);
    particleBox.dispose();

    SPS.initParticles = function () {
      for (let p = 0; p < SPS.nbParticles; p++) {
        SPS.recycleParticle(SPS.particles[p])
      }
    }

    SPS.recycleParticle = function (particle) {

      const particleColorNum = Math.ceil(BABYLON.Scalar.RandomRange(0, particleBoxColors.length - 1));
      const particleScale = BABYLON.Scalar.RandomRange(.5, 1.5);
      particle.position.x = 0;
      particle.position.y = 0;
      particle.position.z = 0;

      particle.rotation.x = BABYLON.Scalar.RandomRange(-Math.PI, Math.PI);
      particle.rotation.y = BABYLON.Scalar.RandomRange(-Math.PI, Math.PI);
      particle.rotation.z = BABYLON.Scalar.RandomRange(-Math.PI, Math.PI);

      particle.scaling = new BABYLON.Vector3(particleScale, particleScale, particleScale);
      particle.color = new BABYLON.Color3(particleBoxColors[particleColorNum].r / 255, particleBoxColors[particleColorNum].g / 255, particleBoxColors[particleColorNum].b / 255);

      particle.velocity.x = BABYLON.Scalar.RandomRange(-0.5 * speed, 0.5 * speed);
      particle.velocity.y = BABYLON.Scalar.RandomRange(0.25 * speed, speed);
      particle.velocity.z = BABYLON.Scalar.RandomRange(-0.5 * speed, 0.5 * speed);
    }

    SPS.updateParticle = function (particle) {

      particle.velocity.y += gravity;                  // apply gravity to y
      particle.position.addInPlace(particle.velocity); // update particle new position

      const direction = Math.sign(particle.idx % 2 - 0.5); //rotation direction +/- 1 depends on particle index in particles array           // rotation sign and new value
      particle.rotation.z += 0.1 * direction;
      particle.rotation.x += 0.05 * direction;
      particle.rotation.y += 0.008 * direction;
    }

    BABYLON.SceneLoader.ImportMesh("", "https://dl.dropbox.com/s/bx5nspfwii4t9iy/", "allstem-obj.gltf", scene, function (meshes) {
      explodeMesh = meshes[0].getChildren()[0];
      //camera.target = explodeMesh;
      explodeMesh.scaling = new BABYLON.Vector3(.015, .015, .015);
      explodeMesh.rotation = new BABYLON.Vector3(Math.PI / 4, Math.PI / 2, 0);
      explodeMesh.y = -5;

    });

    scene.onPointerUp = function (evt, pickedResult) {
      let toExplodeArray = [];
      if (pickedResult.pickedMesh) {
        console.log("Obj picked", pickedResult.pickedMesh.parent);
        let explodingMeshes = pickedResult.pickedMesh.parent.getChildMeshes();
        for (let i = 0; i < explodingMeshes.length; i++) {
          explodingMeshes[i].isPickable = false;
          toExplodeArray.push(explodingMeshes[i]);
          console.log(explodingMeshes[i].name)
        }

        console.dir(toExplodeArray);
        clickedExplosion = new BABYLON.MeshExploder(toExplodeArray);
        console.log(clickedExplosion);

        spsMesh = SPS.buildMesh();
        //spsMesh.rotation.x = Math.Pi/2;
        //spsMesh.rotation(0,0, Math.PI /2)
        SPS.initParticles();
        SPS.setParticles();
        explodeMesh.getChildren()[0].visibility = 0;

        setTimeout(startSTEMPanel, 5000);

        scene.onAfterRenderObservable.add(() => {
          explodePos += speed * .125;
          SPS.setParticles();

          clickedExplosion.explode(explodePos);
        });
      }
      else {
        console.log("No Obj Picked");
      }

    }


    return scene;
  }

  const scene = createScene();

  const buildScene = function () {
    gsap.to(".hero__exploding-obj-title", {
      opacity: 1,
      duration: 2,
      ease: 'power1'
    })
    engine.runRenderLoop(function () {
      scene.render();
    });
    window.addEventListener('resize', function () {
      engine.resize();
    });
  }


  return {
    init: function () {
      buildScene();
    }
  }

})();

module.exports = homeIntroCtrl;