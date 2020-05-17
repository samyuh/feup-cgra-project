/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.plane = new MyPlane(scene, 50);
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
        this.ropeTex = texture[1];

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
        // -- Front-- //
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.flagFrontShader);
        
        // -- Flag -- //
        this.scene.pushMatrix();
        this.flagTex.bind(0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(3, 0, 0);
        this.scene.scale(3, 0.8, 1);
        this.plane.display();
        this.flagTex.unbind(0);
        this.scene.popMatrix();
        // -- Rope -- //
        this.scene.pushMatrix();
        this.ropeTex.bind(0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(0.75, 0, 0);
        this.scene.scale(1.5, 0.1, 1);
        this.plane.display();
        this.ropeTex.unbind(0);
        this.scene.popMatrix();
        this.scene.popMatrix();

        // -- Back -- //
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.flagBackShader);
        
        // -- Flag -- //
        this.scene.pushMatrix();
        this.flagTex.bind(0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(3, 0, 0);
        this.scene.scale(3, 0.8, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.plane.display();
        this.flagTex.unbind(0);
        this.scene.popMatrix();
        // -- Rope -- //
        this.scene.pushMatrix();
        this.ropeTex.bind(0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(0.75, 0, 0);
        this.scene.scale(1.5, 0.1, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.plane.display();
        this.ropeTex.unbind(0);
        this.scene.popMatrix();
        this.scene.popMatrix();
        
        this.scene.setActiveShader(this.scene.defaultShader);

		this.initGLBuffers();
	}
}