/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.plane = new MyPlane(scene, 50);
        this.waterTex = new CGFtexture(scene, "textures/terrain/grassTex.jpg");
        this.waterMap = new CGFtexture(scene, "textures/terrain/grassMap.jpg");

        this.waterShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        
        this.waterShader.setUniformsValues({ terrainTex: 0 });
        this.waterShader.setUniformsValues({ terrainMap: 1 });
    }
    /**
     * Displays the terrain in a certain position
     */
	display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.waterShader);
        this.waterTex.bind(0);
        this.waterMap.bind(1);
        this.scene.scale(50, 50, 50);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
	}
}