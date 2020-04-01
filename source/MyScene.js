/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cylinder = new MyCylinder(this, 8);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cube = new MyCubeMap(this);
        this.diamond = new MyDiamond(this);

        // Material
        this.skybox = new CGFappearance(this);
        this.skybox.setAmbient(1, 1, 1, 1);
        this.skybox.setDiffuse(0, 0, 0, 1);
        this.skybox.setSpecular(0, 0, 0, 1);
        this.skybox.setShininess(5.0);
        this.skybox.setTextureWrap('REPEAT', 'REPEAT');

        this.back = new CGFtexture(this,'images/split_cubemap/back.png');
        this.bottom = new CGFtexture(this,'images/split_cubemap/bottom.png');
        this.front = new CGFtexture(this,'images/split_cubemap/front.png');
        this.left = new CGFtexture(this,'images/split_cubemap/left.png');
        this.right = new CGFtexture(this,'images/split_cubemap/right.png');
        this.top = new CGFtexture(this,'images/split_cubemap/top.png');

        this.texture = [this.back, this.bottom, this.front, this.left, this.right, this.top];

        this.cube.setNewTextures(this.texture);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = true;
        this.displayNormal = false;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        if(this.displayCylinder)
            this.cylinder.display();

        //This sphere does not have defined texture coordinates
        if(this.displaySphere)
            this.incompleteSphere.display();

        if (this.displayNormal)
            this.cylinder.enableNormalViz();

        this.pushMatrix();
        this.scale(50, 50, 50);
        this.cube.display();
        this.popMatrix();


        // ---- END Primitive drawing section
    }
}
