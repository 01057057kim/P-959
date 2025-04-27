document.addEventListener('DOMContentLoaded', function () {
   
    const fadeInUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => {
        fadeInUpObserver.observe(el);
    });

    const slideInLeftObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.slide-in-left').forEach(el => {
        slideInLeftObserver.observe(el);
    });

    const slideInRightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.slide-in-right').forEach(el => {
        slideInRightObserver.observe(el);
    });

    const techSpecObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-tech-spec');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.tech-spec-item').forEach(el => {
        techSpecObserver.observe(el);
    });

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-timeline');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(el => {
        timelineObserver.observe(el);
    });

    document.querySelector('button').addEventListener('click', function () {
        document.querySelector('section:nth-of-type(2)').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.getElementById('porsche-model-container');
const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    13.5,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
renderer.setSize(container.clientWidth, container.clientHeight);

renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.autoRotate = false;

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(10, 15, 10);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 1024;
keyLight.shadow.mapSize.height = 1024;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
fillLight.position.set(-10, 10, 10);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
rimLight.position.set(0, 10, -15);
scene.add(rimLight);

const modelGroup = new THREE.Group();
scene.add(modelGroup);

// Load the model
const loader = new GLTFLoader();
loader.load(

    'src/models/porsche_959.glb',

    function (gltf) {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        
        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;
        
        gltf.scene.rotation.y = Math.PI / -2;
        
        gltf.scene.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                
                if (node.material) {
                    node.material.metalness = 0.6;
                    node.material.roughness = 0.3;
                }
            }
        });
        
        modelGroup.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

camera.position.z = 14;
camera.position.y = 9;
camera.position.x = -10;
camera.lookAt(0, 0, 0);

const rotationSpeed = 0.0004;

function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;

    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
}

window.addEventListener('resize', onWindowResize);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const pixelRatio = window.devicePixelRatio;
    
    const needResize = canvas.width !== width * pixelRatio ||
                      canvas.height !== height * pixelRatio;
    
    if (needResize) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        
        camera.updateProjectionMatrix();
    }
    
    return needResize;
}

function animate() {
    resizeRendererToDisplaySize(renderer);
    
    modelGroup.rotation.y += rotationSpeed;
    
    controls.update();
    renderer.render(scene, camera);
}

onWindowResize();