

// setup threejs
var objexample = "# Group\ng v3d.csg\n\n# Vertices\nv 0.0 2.5 15.5\nv 0.0 -2.4999999999999996 15.5\nv 0.0 -2.5 10.5\nv 0.0 2.5 10.5\nv -32.0 2.5000000000000036 15.5\nv -32.0 2.500000000000004 10.5\nv -32.0 -2.4999999999999964 10.5\nv -32.0 -2.499999999999996 15.5\n\n# Faces\n\n# End Group v3d.csg\n";
var scene = new THREE.Scene();
//var loader = new THREE.STLLoader();
var loader = new THREE.OBJLoader();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 20;

// robot object
class robotLink {
	constructor(uri, index) {

		var obj = this;
		console.log("display-links: New Link '" + uri + "': " + index + "");
		loader.load(uri, function (j) {
			obj.addToScene(j);
		});

		this.index = index;
	}
	index = null;
	sceneobject = null;
	addToScene(mesh) {
		console.log("display-links: Object " + this.index + " loaded");

		//debugger;
		//debugger;
		mesh.children[0].material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.sceneobject = mesh;
		//debugger;
		scene.add(mesh);
	}
}

class robot {
	linkObjects = [];
	constructor(uri) {
		var obj = this;
		console.log("display-links: New Robot '" + uri + "'");
		$.getJSON(uri, function (j) {
			obj.loadCad(j);
		});
		this.linkObjects = [];
	};
	loadCad(json) {
		var cad = json.robots[0].cad;
		console.log("display-links: Loading " + cad.length + " CAD objects");

		for (var i = 0; i < cad.length; i++) {
			console.log("display-links: Adding Link " + i);
			var robotlink = new robotLink(cad[i], i);
			this.linkObjects.push(robotlink);

		}
	}
	objectLoaded(event) {}
};

var myRobot = new robot("/robots");

var updateLoop = function () {
	requestAnimationFrame(updateLoop);
	renderer.render(scene, camera);
};

// We do the async request to get the robots file.

updateLoop();
