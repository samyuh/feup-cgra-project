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
        this.initTextures();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Criar uma nova appearance
        this.earth = new CGFappearance(this);
        this.earth.setAmbient(0.1, 0.1, 0.1, 1);
        this.earth.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earth.setSpecular(0.1, 0.1, 0.1, 1);
        this.earth.setShininess(10.0);
        this.earth.loadTexture('images/earth.jpg');
        this.earth.setTextureWrap('REPEAT', 'REPEAT');


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cylinder = new MyCylinder(this, 8);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cube = new MyCubeMap(this);
        this.diamond = new MyDiamond(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = true;
        this.displayNormal = false;
        this.selectedTexture = -1;
    }


    // Function that initialize the scene textures
    initTextures() {
      this.worldTexture = [ new CGFtexture(this,'images/world_texture/back.png'),
                            new CGFtexture(this,'images/world_texture/bottom.png'),
                            new CGFtexture(this,'images/world_texture/front.png'),
                            new CGFtexture(this,'images/world_texture/left.png'),
                            new CGFtexture(this,'images/world_texture/right.png'),
                            new CGFtexture(this,'images/world_texture/top.png')
                          ];

      this.aridTexture = [ new CGFtexture(this,'images/arid/back.jpg'),
                            new CGFtexture(this,'images/arid/bottom.jpg'),
                            new CGFtexture(this,'images/arid/front.jpg'),
                            new CGFtexture(this,'images/arid/left.jpg'),
                            new CGFtexture(this,'images/arid/right.jpg'),
                            new CGFtexture(this,'images/arid/top.jpg')
                          ];

      this.divineTexture = [ new CGFtexture(this,'images/divine/back.jpg'),
                            new CGFtexture(this,'images/divine/bottom.jpg'),
                            new CGFtexture(this,'images/divine/front.jpg'),
                            new CGFtexture(this,'images/divine/left.jpg'),
                            new CGFtexture(this,'images/divine/right.jpg'),
                            new CGFtexture(this,'images/divine/top.jpg')
                          ];

      this.lakeTexture = [ new CGFtexture(this,'images/lake/back.jpg'),
                            new CGFtexture(this,'images/lake/bottom.jpg'),
                            new CGFtexture(this,'images/lake/front.jpg'),
                            new CGFtexture(this,'images/lake/left.jpg'),
                            new CGFtexture(this,'images/lake/right.jpg'),
                            new CGFtexture(this,'images/lake/top.jpg')
                          ];

      this.testeTexture = [ new CGFtexture(this,'images/teste/back.png'),
                            new CGFtexture(this,'images/teste/bottom.png'),
                            new CGFtexture(this,'images/teste/front.png'),
                            new CGFtexture(this,'images/teste/left.png'),
                            new CGFtexture(this,'images/teste/right.png'),
                            new CGFtexture(this,'images/teste/top.png')
                          ];


      this.textures = [this.worldTexture, this.aridTexture, this.divineTexture, this.lakeTexture, this.testeTexture];
      this.textureIds = { 'World': 0, 'Arid' : 1, 'Divine' : 2, 'Lake' : 3, 'Teste': 4};
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
    //Function that applies a new texture selected in interface
    updateAppliedTexture() {
        this.cube.setNewTextures(this.textures[this.selectedTexture]);
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
        if (this.displayAxis) {
            this.axis.display();
        }

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.earth.apply();

        if(this.displayCylinder)
            this.cylinder.display();

        //This sphere does not have defined texture coordinates
        if(this.displaySphere)
            this.incompleteSphere.display();

        if (this.displayNormal)
            this.cylinder.enableNormalViz();

        if (1) {
            this.pushMatrix();
            this.scale(50, 50, 50);
            this.cube.display();
            this.popMatrix();
        }


        // ---- END Primitive drawing section
    }
}
