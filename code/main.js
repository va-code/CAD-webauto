import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
document.querySelector('#app').innerHTML = `
  <h1>Getting Closer!</h1> 
  <a href="/" onclick="route()">Home</a>
  <a href="/Project1" onclick="route()">Project1</a>
  <a href="/Project2" onclick="route()">Project2</a>
  <a href="/Project3" onclick="route()">Project3</a>
  <canvas id='my_canvas'></canvas>
`


// routing start stuff after this point, needs to be in front of threejs because of animation



const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	window.history.pushState({}, "", event.target.href);
	handleLocation();
};

const routes = {
	404: "/gitclone-glb/Home/404.html",
	"/": "/gitclone-glb/Home/ProjTxt.txt",
	"/Project1": "/gitclone-glb/Project1/ProjTxt.txt",
	"/Project2": "/gitclone-glb/Project2/ProjTxt.txt",
	"/Project3": "/gitclone-glb/Project3/ProjTxt.txt",


};

const handleLocation = async () => {
	const path = window.location.pathname;
	const route = routes[path] || routes[404];
	const html = await fetch(route).then((data) => data.text());
	document.querySelector('#swappable').innerHTML = html;

};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();


// routing end here

// threejs start stuff after this point

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

// threejs end here

