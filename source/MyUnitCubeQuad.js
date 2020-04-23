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
		textureTop() {
			this.texture.setTexture(this.top);
		}
		textureSide() {
			this.texture.setTexture(this.side);
		}
		textureBottom() {
			this.texture.setTexture(this.bottom);
		}
		setNewTextures(texture) {
			this.top = texture[0];
			this.bottom = texture[1];
			this.side = texture[2];
		}
		display() {
			// Side
			this.textureSide();
			this.texture.apply();
	    	this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			//Side 1
			this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 0,1,0);
			this.scene.translate(0,0,0.5);
	    	this.quad.display();
	   	 	this.scene.popMatrix();
			//Side 2
	    	this.scene.pushMatrix();
			this.scene.translate(0,0,0.5);
	    	this.quad.display();
	    	this.scene.popMatrix();
			//Side 3
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0,1,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();
			//Side 4
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0,1,0);
			this.scene.translate(0, 0,0.5);
			this.quad.display();
			this.scene.popMatrix();

			// Bottom
			this.textureBottom();
			this.texture.apply();
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 1,0,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();

			// Top
			this.textureTop();
			this.texture.apply();
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 1,0,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();


		}
}
