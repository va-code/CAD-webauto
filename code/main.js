import './style.css';
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
scene.add(light);
light.position.y = 100;
light.position.z = 40;

let mesh;

const loader = new GLTFLoader();
class glbfile {
	constructor(filepath, Xpos, Ypos, scaling){
		this.mesh;
		this.filepath = filepath;
		this.Xpos = Xpos;
		this.Ypos = Ypos;
		this.scaling = scaling;
		loader.load(this.filepath, function ( gltf ){
			mesh = gltf.scene.children[0];
			scene.add(mesh);
			mesh.scale.set(scaling,scaling,scaling);
			mesh.position.x = Xpos;
			mesh.position.y = Ypos;
		});
	};
};
let letter_A = new glbfile('/gitclone-glb/Project1/A.glb', -50, 0, 3 );
let letter_B = new glbfile('/gitclone-glb/Project1/B.glb', -25, 0, 3);
let letter_C = new glbfile('/gitclone-glb/Project1/C.glb', 0, 0, 3);
let dragon = new glbfile('/Dragon.glb', 50, 0, 0.5 );
//testing zone, careful where you step...

//testing zone, careful where you step...
function animate() {
	requestAnimationFrame( animate );
	//letter.mesh.rotation.x += 0.01;
	//letter.mesh.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();

// threejs end here

