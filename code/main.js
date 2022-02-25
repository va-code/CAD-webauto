import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// routing start stuff after this point, needs to be in front of threejs because of animation
const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	window.history.pushState({}, "", event.target.href);
	handleLocation();
};  
const routes = await fetch("/gitclone-glb/Routes.json").then((data) => data.json());
const handleLocation = async () => {
	const path = window.location.pathname;
	const route = routes["Routes"][path] || routes["Routes"][404];
	const html = await fetch(route).then((data) => data.text());
	document.querySelector('#swappable').innerHTML = html;
	loadfiles();
};
window.onpopstate = handleLocation;
window.route = route;
handleLocation();
const hrefs = await fetch("/gitclone-glb/Routes.json").then((data) => data.json(["hrefs"]));
document.querySelector('#app').innerHTML = hrefs["hrefs"]
// routing end here

// threejs start stuff after this point
var renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
renderer.setPixelRatio( window.devicePixelRatio );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
const scene = new THREE.Scene();
function scenesetup(){
	camera.position.set(0 , 0, 200);
	camera.lookAt( 0, 0, 0 );
	scene.background = new THREE.Color(0x202124);
	var light = new THREE.PointLight(0xffffff,0.5);
	light.position.y = 100;
	light.position.z = 40;
	scene.add(light);
};
scenesetup();
function meshgen(filepath, scene, Xpos, Ypos, scaling){
	var object = new THREE.Group();
	(new GLTFLoader()).load(filepath, gltf => {
		object.add(gltf.scene);
		});
	object.position.x = Xpos;
	object.position.y = Ypos;
	object.scale.set(scaling,scaling,scaling);
	scene.add(object);
	return object;
};
var listed = [];
const loadfiles = async () =>{
	const path = window.location.pathname;
	const glbstr = routes["glb"][path] || routes["glb"][404];
	const glb = glbstr.split(" ")
	scene.clear();
	scenesetup();
	glb.map(function(meshpath){
		listed.push(meshgen(meshpath, scene, Math.random()*100 -50 , Math.random()*100 -50, 3));
		});
};
loadfiles(route);
var test = 0;
function animate() {
	requestAnimationFrame( animate );
	test += 0.01;
	listed.map(mesh => (mesh.rotation.x = test));
	listed.map(mesh => (mesh.rotation.y = -test));
	renderer.render( scene, camera );
}
animate();
// threejs end here