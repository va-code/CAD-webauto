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
	//if (route =="gitclone-glb/Project1/") {for glb in glbs import file.glb as filename};
	document.querySelector('#swappable').innerHTML = html;
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
camera.position.set(0 , 0, 200);
camera.lookAt( 0, 0, 0 );
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202124);
var light = new THREE.PointLight(0xffffff,0.5);
light.position.y = 100;
light.position.z = 40;
scene.add(light);

class glbfile {
	constructor(filepath, scene, Xpos, Ypos, scaling){
		this.Xpos = Xpos;
		this.Ypos = Ypos;
		this.scaling = scaling;
		this.object = new THREE.Group();
		(new GLTFLoader()).load(filepath, gltf => {
				this.object.add(gltf.scene);
			});
		this.object.scale.set(scaling,scaling,scaling);
		this.object.position.x = Xpos;
		this.object.position.y = Ypos;
	};
	
	draw(rotationX, rotationY) {
		this.object.rotation.x = rotationX;
		this.object.rotation.y = rotationY;
	};
};
var test = 0;
let letter_A = new glbfile('/gitclone-glb/Project1/A.glb', scene, -50, 0, 3);
let letter_B = new glbfile('/gitclone-glb/Project1/B.glb', scene, -25, 0, 3);
let letter_C = new glbfile('/gitclone-glb/Project1/C.glb', scene, 0, 0, 3);
//testing zone, careful where you step...

scene.add(letter_A.object);
scene.add(letter_B.object);
scene.add(letter_C.object);
//testing zone, careful where you step...
function animate() {
	requestAnimationFrame( animate );
	test += 0.01;
	
	letter_A.draw(test, test);
	letter_B.draw(test, test);
	letter_C.draw(test, test);
	renderer.render( scene, camera );
}
animate();

// threejs end here

