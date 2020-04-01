/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		this.normals = [];
		for (var i = 0; i <= 3; i++) {
        this.normals.push(0, 0, 1);
    }

		this.texCoords = [
			0, 0,
			0, 1,
			1, 0,
			1, 1
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
