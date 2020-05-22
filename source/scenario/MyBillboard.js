/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
    constructor(scene) {
    super(scene);

    this.plane = new MyPlane(scene, 10);
    this.suppliesDelivered = 0;

    // -- Materials -- //
    this.material = new CGFappearance(scene);
    this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.material.setDiffuse(0.6, 0.6, 0.6, 1.0);
    this.material.setSpecular(0.4, 0.4, 0.4, 1.0);
    this.material.setShininess(5.0);
    this.material.setTextureWrap('REPEAT', 'REPEAT');

    this.white = new CGFappearance(scene);
    this.white.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.white.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.white.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.white.setShininess(5.0);
    this.white.setTextureWrap('REPEAT', 'REPEAT');

    this.grey = new CGFappearance(scene);
    this.grey.setAmbient(0.5, 0.5, 0.5, 1.0);
    this.grey.setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.grey.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.grey.setShininess(5.0);
    this.grey.setTextureWrap('REPEAT', 'REPEAT');

    // -- Textures -- //
    this.message = new CGFtexture(scene,"textures/billboard/message.png");

    // -- Shaders -- //
    this.shader = new CGFshader(scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");

    this.shader.setUniformsValues({suppliesDelivered : this.suppliesDelivered/5.0});
    }
    
    /**
     * Updates the billboard's bar according to the current number of droped supplies
     * @param {number} supplies MyScene's nymber of supplies droped
     */
    update(supplies){
        this.suppliesDelivered = supplies;
        this.shader.setUniformsValues({suppliesDelivered : this.suppliesDelivered/5.0});
    }

    /**
     * Displays the billboard in a certain position
     */
    display() {
        // -- Planes -- //
        // -- Material -- //
        this.material.setTexture(this.message);
        this.material.apply();
        // -- Object Front -- //
        this.scene.pushMatrix();
        this.scene.translate(0,3/2,0);
        this.scene.scale(2,1,1);
        this.plane.display();
        this.scene.popMatrix();

        // -- Material -- //
        this.white.apply();
        this.scene.pushMatrix();
         // -- Object Back -- //
        this.scene.translate(0,3/2,0);
        this.scene.scale(2,1,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.plane.display();
        this.scene.popMatrix();

        // -- Posts (Height = 1) -- //
        // -- Material -- //
        this.grey.apply();
        // -- Objects Front -- //
        this.scene.pushMatrix();
        this.scene.translate(-15/16,1/2,0);
        this.scene.scale(1/8,1,1);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(15/16,1/2,0);
        this.scene.scale(1/8,1,1);
        this.plane.display();
        this.scene.popMatrix();
        // -- Objects Back -- //
        this.scene.pushMatrix();
        this.scene.translate(-15/16,1/2,0);
        this.scene.scale(1/8,1,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(15/16,1/2,0);
        this.scene.scale(1/8,1,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.plane.display();
        this.scene.popMatrix();

        // -- Progress Bar -- //
        // -- Material -- //
        this.material.apply();
        // -- Object -- //
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0,3/2,0.001);
        this.scene.scale(3/2,1/5,1);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.plane.enableNormalViz()
    }

    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.plane.disableNormalViz()
    }

}
