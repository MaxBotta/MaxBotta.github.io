

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

scene.background = new THREE.Color(0x00a0f0);

const ambient = new THREE.AmbientLight(0xaaaaaa);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xaaaaaa);
light.position.set(30, 100, 40);
light.target.position.set(0, 0, 0);
light.castShadow = true;

const lightSize = 500;
light.shadow.camera.near = 1;
light.shadow.camera.far = 500;
light.shadow.camera.left = light.shadow.camera.bottom = -lightSize;
light.shadow.camera.right = light.shadow.camera.top = lightSize;

light.shadow.bias = 0.0039;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

scene.add(light);

scene.fog = new THREE.Fog('rgb(0,100,255)', 3000, 6000);


// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

const loader = new THREE.FBXLoader();

let mixers = [];


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 10, 10),
    new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
    }));
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

LoadAnimatedModelAndPlay("./max/", "max.fbx", "flair-2.fbx", 0);

let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();

    var delta = clock.getDelta();
    if (mixers.length > 0) {
        mixers.map(m => m.update(delta));
    }


    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // mixers.map(m => m.update(timeElapsedS));
}
animate();

let modelAnimations[key].mixer;

let animations = [
    { name: "breakdance footwork 1.fbx", playing: false, anim: null },
    { name: "breakdance footwork 2.fbx", playing: false, anim: null },
    { name: "breakdance footwork 3.fbx", playing: false, anim: null },
    { name: "breakdance 1990.fbx", playing: true, anim: null },
    { name: "breakdance 1990 (2).fbx", playing: false, anim: null },
    { name: "breakdance 1990 (3).fbx", playing: false, anim: null },
    { name: "flair-2.fbx", playing: false, anim: null },
    { name: "flair-1.fbx", playing: false, anim: null },
    { name: "flair-2.fbx", playing: false, anim: null },
    { name: "flair-1.fbx", playing: false, anim: null },
    { name: "flair-2.fbx", playing: false, anim: null },
    { name: "flair-1.fbx", playing: false, anim: null },
    { name: "flair-2.fbx", playing: false, anim: null },
];

function LoadAnimatedModelAndPlay(path, modelFile) {
    const loader = new THREE.FBXLoader();
    loader.load(path + modelFile, (fbx) => {
        fbx.position.set(0, 1, 0);
        fbx.scale.set(0.1, 0.1, 0.1);

        fbx.traverse(c => {
            c.castShadow = true;
            c.receiveShadow = true;
        });

        const mixer = new THREE.AnimationMixer(fbx);
        mixers.push(mixer);

        mixer.addEventListener('finished', function (e) {
            console.log("play next anim", e);
            for (let i = 0; i < modelAnimations[modelName].length; i++) {
                if (modelAnimations[modelName][i].playing) {
                    modelAnimations[modelName][i].playing = false;
                    if (i === modelAnimations[modelName].length - 1) {
                        modelAnimations[modelName][0].playing = true;
                        const action = mixer.clipAction(modelAnimations[modelName][i].anim);
                        action.play();
                    } else {
                        modelAnimations[modelName][i + 1].playing = true;
                        const action = mixer.clipAction(modelAnimations[modelName][i + 1].anim);
                        // action.time = 0;
                        mixer.stopAllAction();
                        action.fadeIn(0.5);
                        action.play();
                    }
                    break;
                }
            }
        });

        for (let a of modelAnimations[modelName]) {
            const anim = new THREE.FBXLoader();
            anim.load(path + a.name, (anim) => {
                a["anim"] = anim.animations[0];
                const action = mixer.clipAction(anim.animations[0]);
                // action.clampWhenFinished = true;
                action.setLoop(THREE.LoopOnce);

                if (a.playing) {
                    action.play();
                }
            });
        }


        scene.add(fbx);
    });
}


