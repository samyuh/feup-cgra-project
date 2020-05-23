/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);
		this.texture = new CGFappearance(this.scene);
		this.texture.setAmbient(0.1, 0.1, 0.1, 1);
		this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
		this.texture.setSpecular(0.1, 0.1, 0.1, 1);
		this.texture.setShininess(10.0);
		this.texture.setTextureWrap('REPEAT', 'REPEAT');

	}

	/**
	 * Sets the texture to the top of the cubeMap
	 */
	textureTop() {
		this.texture.setTexture(this.top);
	}

	/**
	 * Sets the texture to the side of the cubeMap
	 */
	textureSide() {
		this.texture.setTexture(this.side);
	}

	/**
	 * Sets the texture to the bottom of the cubeMap
	 */
	textureBottom() {
		this.texture.setTexture(this.bottom);
	}

	/**
	 * Sets all textures from an array
	 * @param {*} texture array with top, bottom and side textures
	 */
	setNewTextures(texture) {
		this.top = texture[0];
		this.bottom = texture[1];
		this.side = texture[2];
	}

	/**
	 * Displays the Object in a certain position
	 */
	display() {
		// Side
		this.textureSide();
		this.texture.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		// -- Side 1 -- //
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
		// -- Side 2 -- //
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
		// -- Side 3 -- //
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
		// -- Side 4 -- //
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// -- Bottom -- //
		this.textureBottom();
		this.texture.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// -- Top -- //
		this.textureTop();
		this.texture.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	}
	/**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.quad.enableNormalViz();
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.quad.disableNormalViz();
    }
}