/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);

		this.skybox = new CGFappearance(this.scene);
		this.skybox.setAmbient(1, 1, 1, 1);
		this.skybox.setDiffuse(0, 0, 0, 1);
		this.skybox.setSpecular(0, 0, 0, 1);
		this.skybox.setShininess(5.0);
		this.skybox.setTextureWrap('REPEAT', 'REPEAT');
	}
	setNewTextures(texture) {
		this.back = texture[0];
		this.bottom = texture[1];
		this.front = texture[2];
		this.left = texture[3];
		this.right = texture[4];
		this.top = texture[5];
	}
	textureBack() {
		this.skybox.setTexture(this.back);
	}
	textureBottom() {
		this.skybox.setTexture(this.bottom);
	}
	textureFront() {
		this.skybox.setTexture(this.front);
	}
	textureLeft() {
		this.skybox.setTexture(this.left);
	}
	textureRight() {
		this.skybox.setTexture(this.right);
	}
	textureTop() {
		this.skybox.setTexture(this.top);
	}
	display() {
		this.scene.pushMatrix();
		this.textureLeft();
		this.skybox.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.textureFront();
		this.skybox.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.textureRight();
		this.skybox.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.textureBack();
		this.skybox.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.textureTop();
		this.skybox.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.textureBottom();
		this.skybox.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();
	}
	enableNormalViz() {
		this.quad.enableNormalViz();
	}
	disableNormalViz() {
		this.quad.disableNormalViz();
	}
}