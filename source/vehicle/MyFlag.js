/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.flag = new MyPlane(scene, 50);
        this.flagFrontShader = new CGFshader(this.scene.gl, "shaders/flagFront.vert", "shaders/flag.frag");
        this.flagBackShader = new CGFshader(this.scene.gl, "shaders/flagBack.vert", "shaders/flag.frag");
        
		this.initBuffers();
    }

    /**
     * Set Method for changing current textures
     * @param {Array<Object>} texture Array with 2 textures which is applied to the vflag
     */
    updateTextures(texture) {
        this.flagTex = texture[0];
        // To do : Cordas

        this.flagFrontShader.setUniformsValues({ flagTex: 0 });
        this.flagBackShader.setUniformsValues({ flagTex: 0 });
    }

    /**
     * Set uniform value for time
     * @param {number} time
     */
    setTime(time) {
        this.flagFrontShader.setUniformsValues({ timeFactor: time });
        this.flagBackShader.setUniformsValues({ timeFactor: time });  
    }

    /**
     * Set uniform value for time
     * @param {number} pos
     */
    setPos(pos) {
        this.flagFrontShader.setUniformsValues({ position : pos });
        this.flagBackShader.setUniformsValues({ position : pos });
    }
    
    /**
     * Displays the flag
     */
	display() {
        this.scene.setActiveShader(this.flagFrontShader);
        this.flagTex.bind(0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(3, 0, 0);
        this.scene.scale(3, 0.8, 1);
        this.flag.display();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.setActiveShader(this.flagBackShader);
        this.flagTex.bind(0);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        
		this.initGLBuffers();
	}
}