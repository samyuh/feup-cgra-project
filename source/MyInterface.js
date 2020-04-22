/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayCylinder').name('Display Cylinder');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayNormal').name('Display Normal');
        this.gui.add(this.scene, 'selectedMaterial', this.scene.materialIDs).name('Selected Material');
        
        var fSkyBox = this.gui.addFolder('SkyBox Config');
        fSkyBox.add(this.scene, 'displaySkyBox').name('Display SkyBox');
        fSkyBox.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));

        var fVehicle = this.gui.addFolder('Vehicle Config');
        fVehicle.add(this.scene, 'displayVehicle').name('Display Vehicle');
        fVehicle.add(this.scene, 'speedFactor', 0.1, 3.0).name('Speed Factor');
        fVehicle.add(this.scene, 'scaleFactor', 0.5, 3.0).name('Scale Factor');

        // Init Keys
        this.initKeys();
        return true;
    }

    initKeys() {
      // Create reference from the scene to GUI
      this.scene.gui = this;

      // disable processKeyboard
      this.processKeyboard = function() {};

      // array to store which keys are being pressed
      this.activeKeys = {};
    }

    processKeyDown(event) {
      // called when a key is pressed down
      // mark it as active in the array
      this.activeKeys[event.code]=true;
    }

    processKeyUp(event) {
      // called when a key is released, mark it as inactive in the array
      this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
      // returns true if a key is marked as pressed, false otherwise
      return this.activeKeys[keyCode] || false;
    }
  }
