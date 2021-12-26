let scene,
    camera,
    renderer,
    orbitControls,
    particles,
    planeMesh;

const noise = new SimplexNoise();
const particleNum = 10000;
const maxRange = 1000;
const minRange = maxRange / 2;
const textureSize = 64.0;

let clock = new THREE.Clock();
let mixers = [];
let sound;

let animations = [
    "Idle.fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance footwork 1.fbx",
    "breakdance footwork 2.fbx",
    "breakdance footwork 3.fbx",
    "breakdance footwork to idle.fbx",
    // "breakdance ready (3).fbx",
    // // "breakdance 1990.fbx",
    // // "breakdance 1990 (2).fbx",
    // // "breakdance 1990 (3).fbx",
    // "breakdance swipes.fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance freeze var 1.fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance freeze var 2.fbx",
    // "breakdance ready (3).fbx",
    // "breakdance freeze var 3.fbx",
    // "breakdance freeze var 4.fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    // // "breakdance freezes.fbx",
    "breakdance uprock var 1 start.fbx",
    "breakdance uprock.fbx",
    "breakdance uprock (2).fbx",
    "breakdance uprock.fbx",
    "breakdance uprock (2).fbx",
    "breakdance uprock.fbx",
    "breakdance uprock to ground.fbx",
    "breakdance footwork 1.fbx",
    "breakdance footwork 2.fbx",
    "breakdance footwork 3.fbx",
    // "breakdance freezes.fbx",
    // "crossleg freeze.fbx",
    "breakdance uprock.fbx",
    "breakdance uprock.fbx",
    "breakdance uprock.fbx",
    "breakdance uprock var 1 end.fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    // "breakdance swipes.fbx",
    // "breakdance uprock (2).fbx",

    // "breakdance uprock to ground (2).fbx",


    // // "breakdance uprock (2).fbx",

    // "breakdance uprock var 1.fbx",

    // // "breakdance uprock var 2.fbx",
    "flair (3).fbx",
    "flair (2).fbx",
    "flair (2).fbx",
    "flair (2).fbx",
    "flair (2).fbx",
    "flair (2).fbx",
    "flair (2).fbx",
    "flair (2).fbx",
    "flair.fbx",
    "breakdance ready (3).fbx",
    "breakdance ready (3).fbx",
    "breakdance ending 1.fbx"

    // "breakdance uprock var 2.fbx",

];

let modelAnimations = {};


const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {

    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

function setAnimation(modelName, animationName) {
    console.log("Anim Name: ", animationName)
    for (let a of modelAnimations[modelName].animations) {
        if (a.name === animationName) {
            a.isPlaying = true;
            modelAnimations[modelName].mixer.stopAllAction();
            const action = modelAnimations[modelName].mixer.clipAction(a.anim);
            action.time = 0;
            action.clampWhenFinished = true;
            action.setLoop(THREE.LoopOnce);
            action.fadeIn(0.5);
            action.play();
            break;
        } else {
            a.isPlaying = false;
        }
    }
}

loadingManager.onLoad = function () {

    console.log('Loading complete!');


    let loading = document.getElementById("loading");
    loading.style.display = "none";
    let button = document.getElementById("start-button");
    button.style.display = "block";


    button.addEventListener("click", () => {

        let overlay = document.getElementById("overlay");
        overlay.style.display = "none";
        
        sound.play();
        orbitControls.autoRotate = true;
        clock.start();

        //Play all first animations
        for (let modelName in modelAnimations) {
            setAnimation(modelName, "Idle.fbx");

            //Start dance
            setTimeout(() => {

                setAnimation(modelName, animations[1]);

                modelAnimations[modelName].mixer.addEventListener('finished', function (e) {
                    console.log("play next anim", e);
                    modelAnimations[modelName].currentAnimation += 1;
                    console.log("current anim", modelAnimations[modelName].currentAnimation);
                    if (modelAnimations[modelName].currentAnimation === animations.length) {
                        console.log("last anim");
                        //modelAnimations[modelName].currentAnimation = 0;
                        //setAnimation(modelName, animations[0]);
                        showGreetings();
                    } else {
                        setAnimation(modelName, animations[modelAnimations[modelName].currentAnimation]);
                    }

                });
                // modelAnimations[modelName].mixer.addEventListener('finished', function (e) {
                //     console.log("play next anim", e);
                //     for (let i = 0; i < modelAnimations[modelName]["animations"].length; i++) {
                //         if (modelAnimations[modelName]["animations"][i].isPlaying) {
                //             if (i === modelAnimations[modelName]["animations"].length) {
                //                 setAnimation(modelName, animations[0]);
                //             } else {
                //                 setAnimation(modelName, animations[i + 1]);
                //             }
                //             break;
                //         }
                //     }
                // });
            }, 8000);
        }
    });



};


loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {

    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

loadingManager.onError = function (url) {

    console.log('There was an error loading ' + url);

};


const drawRadialGradation = (ctx, canvasRadius, canvasW, canvasH) => {
    ctx.save();
    const gradient = ctx.createRadialGradient(canvasRadius, canvasRadius, 0, canvasRadius, canvasRadius, canvasRadius);
    gradient.addColorStop(0, 'rgba(255,255,255,1.0)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.restore();
}

const getTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const diameter = textureSize;
    canvas.width = diameter;
    canvas.height = diameter;
    const canvasRadius = diameter / 2;

    /* gradation circle
    ------------------------ */
    drawRadialGradation(ctx, canvasRadius, canvas.width, canvas.height);

    /* snow crystal
    ------------------------ */
    // drawSnowCrystal(ctx, canvasRadius);

    const texture = new THREE.Texture(canvas);
    //texture.minFilter = THREE.NearestFilter;
    texture.type = THREE.FloatType;
    texture.needsUpdate = true;
    return texture;
}

const makeRoughGround = (mesh) => {
    // const time = Date.now();
    const time = 0.1;
    mesh.geometry.vertices.forEach(function (vertex, i) {
        // const noise1 = noise.noise2D(
        //     vertex.x * 0.01 + time * 0.0003,
        //     vertex.y * 0.01 + time * 0.0003,
        //     vertex.z * 0.01 + time * 0.0003,
        // ) * 5;
        // const noise2 = noise.noise2D(
        //     vertex.x * 0.02 + time * 0.00012,
        //     vertex.y * 0.02 + time * 0.00015,
        //     vertex.z * 0.02 + time * 0.00015,
        // ) * 4;
        // const noise3 = noise.noise2D(
        //     vertex.x * 0.009 + time * 0.00015,
        //     vertex.y * 0.012 + time * 0.00009,
        //     vertex.z * 0.015 + time * 0.00015,
        // ) * 4;
        const distance = noise.noise2D(vertex.x / 100, vertex.y / 100) * 5;
        // const distance = (noise1 + noise2 + noise3);
        vertex.z = distance;
    })
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
}

const render = (timeStamp) => {

    orbitControls.update();

    var delta = clock.getDelta();
    if (mixers.length > 0) {
        mixers.map(m => m.update(delta));
    }

    console.log(camera.position);
    if(camera.position.z < 620 && camera.position.z > 580 && clock.getElapsedTime() > 4) {
        // camera.position.set(0, 400, 600);
        orbitControls.autoRotate = false;
    }


    const posArr = particles.geometry.vertices;
    const velArr = particles.geometry.velocities;

    posArr.forEach((vertex, i) => {
        const velocity = velArr[i];

        const x = i * 3;
        const y = i * 3 + 1;
        const z = i * 3 + 2;

        const velX = Math.sin(timeStamp * 0.001 * velocity.x) * 0.1;
        const velZ = Math.cos(timeStamp * 0.0015 * velocity.z) * 0.1;

        vertex.x += velX;
        vertex.y += velocity.y;
        vertex.z += velZ;

        if (vertex.y < -minRange) {
            vertex.y = minRange;
        }

    })

    particles.geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

const onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}


const init = () => {

    /* scene
    -------------------------------------------------------------*/
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000036, 0, minRange * 3);

    /* camera
    -------------------------------------------------------------*/
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 400, 600);
    camera.rotation.set(40, 0, 0);
    camera.lookAt(scene.position);

    /* renderer
    -------------------------------------------------------------*/
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color(0x000036));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    //renderer.setClearAlpha(0);

    /* OrbitControls
    -------------------------------------------------------------*/
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.2;

    /* AmbientLight
    -------------------------------------------------------------*/
    const ambientLight = new THREE.AmbientLight(0x666666);
    scene.add(ambientLight);

    /* SpotLight
    -------------------------------------------------------------*/
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.distance = 10000;
    spotLight.position.set(0, 600, 100);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // const spotLight2 = new THREE.SpotLight(0xffffff);
    // spotLight2.distance = 10000;
    // spotLight2.position.set(200, 200, 0);
    // spotLight2.castShadow = true;
    // scene.add(spotLight2);

    // const spotLight3 = new THREE.SpotLight(0xffffff);
    // spotLight3.distance = 10000;
    // spotLight3.position.set(-200, 200, 0);
    // spotLight3.castShadow = true;
    // scene.add(spotLight3);

    /* Plane
    --------------------------------------*/
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000, 200, 200);
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });
    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.rotation.x = -0.5 * Math.PI;
    planeMesh.position.x = 0;
    planeMesh.position.y = 0;
    planeMesh.position.z = 0;
    scene.add(planeMesh);

    /* Snow Particles
    -------------------------------------------------------------*/
    const pointGeometry = new THREE.Geometry();
    for (let i = 0; i < particleNum; i++) {
        const x = Math.floor(Math.random() * maxRange - minRange);
        const y = Math.floor(Math.random() * maxRange - minRange);
        const z = Math.floor(Math.random() * maxRange - minRange);
        const particle = new THREE.Vector3(x, y, z);
        pointGeometry.vertices.push(particle);
        // const color = new THREE.Color(0xffffff);
        // pointGeometry.colors.push(color);
    }

    const pointMaterial = new THREE.PointsMaterial({
        size: 8,
        color: 0xffffff,
        vertexColors: false,
        map: getTexture(),
        // blending: THREE.AdditiveBlending,
        transparent: true,
        // opacity: 0.8,
        fog: true,
        depthWrite: false
    });

    const velocities = [];
    for (let i = 0; i < particleNum; i++) {
        const x = Math.floor(Math.random() * 6 - 3) * 0.1;
        const y = Math.floor(Math.random() * 10 + 3) * - 0.05;
        const z = Math.floor(Math.random() * 6 - 3) * 0.1;
        const particle = new THREE.Vector3(x, y, z);
        velocities.push(particle);
    }

    particles = new THREE.Points(pointGeometry, pointMaterial);
    particles.geometry.velocities = velocities;
    scene.add(particles);

    makeRoughGround(planeMesh);

    loadMusic();
    LoadModel("./snowman.fbx", { x: -300, y: 0, z: -300 }, { x: 0.2, y: 0.2, z: 0.2 }, { x: 0, y: 0, z: 0 });
    LoadModel("./house.fbx", { x: 300, y: 0, z: -400 }, { x: 0.5, y: 0.5, z: 0.5 }, { x: 0, y: 0, z: 0 });
    LoadAnimatedModelAndPlay("./max/", "max.fbx", "max", { x: -150, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
    LoadAnimatedModelAndPlay("./anna/", "anna.fbx", "anna", { x: 150, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
    LoadAnimatedModelAndPlay("./santa/", "santa.fbx", "santa", { x: 0, y: 0, z: 200 }, { x: 0.08, y: 0.08, z: 0.08 });


    /* resize
    -------------------------------------------------------------*/
    window.addEventListener('resize', onResize);

    /* rendering start
    -------------------------------------------------------------*/
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
    requestAnimationFrame(render);
}

const loadMusic = () => {
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/jingle-bells.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
    });
}



function LoadModel(path, pos, scale, rotation) {
    const loader = new THREE.FBXLoader(loadingManager);
    loader.load(path, (fbx) => {
        fbx.position.set(pos.x, pos.y, pos.z);
        fbx.scale.set(scale.x, scale.y, scale.z);
        fbx.rotation.set(rotation.x, rotation.y, rotation.z);

        fbx.traverse(c => {
            c.castShadow = true;
            c.receiveShadow = true;
            console.log(c.material);
        });

        scene.add(fbx);

    });
}


function LoadAnimatedModelAndPlay(path, modelFile, modelName, pos, scale) {
    const loader = new THREE.FBXLoader(loadingManager);
    loader.load(path + modelFile, (fbx) => {
        fbx.position.set(pos.x, pos.y, pos.z);
        fbx.scale.set(scale.x, scale.y, scale.z);

        fbx.traverse(c => {
            c.castShadow = true;
            c.receiveShadow = true;
        });

        const mixer = new THREE.AnimationMixer(fbx);
        mixers.push(mixer);

        modelAnimations[modelName] = {
            animations: [],
            mixer: mixer,
            currentAnimation: 0
        }

        for (let a of animations) {
            let name = a;
            const anim = new THREE.FBXLoader();
            anim.load(path + a, (anim) => {

                let newAnimation = {
                    name: name,
                    anim: anim.animations[0],
                    isPlaying: false
                }
                modelAnimations[modelName].animations.push(newAnimation);


            });
        }

        scene.add(fbx);
    });
}

function showGreetings() {
    let greetings = document.getElementById("greetings");
    greetings.style.display = "block";
}


document.addEventListener('DOMContentLoaded', () => {
    init();
});