import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
document.querySelector('#app').innerHTML = `
  <div>
    <h1>Finally!</h1>
    <a href="http://www.nuex.tech" target="_blank">old site</a>
  </div>

    <canvas id='my_canvas'></canvas>
`


// threejs stuff after this point

var renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
renderer.setPixelRatio( window.devicePixelRatio );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set(0 , 0, 200);
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202124);

var light = new THREE.PointLight(0xffffff,0.5);
scene.add(light);
light.position.y = 100;
light.position.z = 40;


let mesh;
let cube;

function loadtestbox() {
	const geometry = new THREE.BoxGeometry(40,40,40);
	const material = new THREE.MeshLambertMaterial();

	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cube.position.x = -50;
};
function loadglb() {
	const loader = new GLTFLoader();
	loader.load('/Dragon.glb', function ( gltf ){
	
		mesh = gltf.scene.children[0];
		
		scene.add(mesh);
		mesh.scale.set(1,1,1)
		mesh.position.x = 50;
	});
};

loadglb();
loadtestbox();

function animate() {
	requestAnimationFrame( animate );
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;
	cube.rotation.x += -0.01;
	cube.rotation.y += -0.01;
	renderer.render( scene, camera );
}
animate();



