/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.flag = new MyPlane(scene, 50);
        this.flagTex = new CGFtexture(scene, "textures/zeppellin/flag.png");
        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.flagBackShader = new CGFshader(this.scene.gl, "shaders/flagBack.vert", "shaders/flag.frag");

        // No sure if this is needed
        this.flagShader.setUniformsValues({flagTex: 0});
        this.flagBackShader.setUniformsValues({flagTex: 0});

		this.initBuffers();
	}
    setTime(pos) {
        this.flagShader.setUniformsValues({ timeFactor: pos });
        this.flagBackShader.setUniformsValues({ timeFactor: pos });  
    }
    setPos(pos) {
        this.flagShader.setUniformsValues({ position : pos });
        this.flagBackShader.setUniformsValues({ position : pos });
    }
	display() {
        this.scene.setActiveShader(this.flagShader);
        this.flagTex.bind(0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(3, 0, 0);
        this.scene.scale(3, 0.8, 1);
        this.flag.display();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.setActiveShader(this.flagBackShader);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}