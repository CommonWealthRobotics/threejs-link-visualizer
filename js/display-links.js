

// setup threejs
var objexample = "# Group\ng v3d.csg\n\n# Vertices\nv 0.0 2.5 15.5\nv 0.0 -2.4999999999999996 15.5\nv 0.0 -2.5 10.5\nv 0.0 2.5 10.5\nv -32.0 2.5000000000000036 15.5\nv -32.0 2.500000000000004 10.5\nv -32.0 -2.4999999999999964 10.5\nv -32.0 -2.499999999999996 15.5\n\n# Faces\n\n# End Group v3d.csg\n";
var scene = new THREE.Scene();
var loader = new THREE.OBJLoader2();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 20;

// robot object
class robotLink {
	constructor(uri, index) {
		console.log("New Link '"+ uri +"': "+index+"");
		loader.load(uri, this.addToScene);
		this.index = index;
	}
	index = null;
	object = null;
	addToScene(event) {
		var myobj = event.detail.loaderRootNode;
		var material = new THREE.MeshBasicMaterial({
				color: 0x00ff00
			});
		myobj.children[0].material = material;
		renderer.append(myobj);
		this.object = object;
	}
}

class robot {
	linkObjects = [];
	constructor(uri) {
		console.log("New Robot '"+uri+"'");
		$.getJSON(uri, this.loadCad);
	};
	loadCad(json) {
		var cad = json.robots[0].cad
			for (var i =  - ; i < cad.arrayLength; i++) {
				console.log("Adding Link "+i);
				var robotlink = new robotLink(cad[i]);
				linkObjects.append(robotlink);
			}
	}
	objectLoaded(event) {}
};


var myRobot = new robot("/robots");

var updateLoop = function () {
	requestAnimationFrame(updateLoop);
	renderer.render(scene, camera);
};

var loadCad(robot) {}

// We do the async request to get the robots file.

animate();
