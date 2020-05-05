/**
 * Struct for current state of the supply box
 */
const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
    constructor(scene) {
    super(scene);
    this.state=SupplyStates.INACTIVE;

    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.initialPosY = 0;
    this.accelaration = 9.8; //Constant for accelaration (Not used on drop but set != 0 because physics xD)
    this.velocityX = 0;
    this.velocityZ = 0;
    this.time = 0;
    this.initialTime = 0;
    this.rot = 0;

    this.quad = new MyUnitCubeQuad(scene);
    this.side = new MyQuad(scene);
    

    this.TexBox = new CGFtexture(scene, 'textures/box.png');

    //Textures

     //No need for inactive textures because there will be nothing drawn
     this.fallingTextures = [
        new CGFtexture(scene, 'textures/box.png'),
        new CGFtexture(scene, 'textures/box.png'),
        new CGFtexture(scene, 'textures/box.png'),
    ];

    this.quad.setNewTextures(this.fallingTextures);


    this.material = new CGFappearance(scene);
    this.material.setAmbient(1, 1, 1, 1);
    this.material.setDiffuse(0, 0, 0, 1);
    this.material.setSpecular(0, 0, 0, 1);
    this.material.setShininess(5.0);
    this.material.setTextureWrap('REPEAT', 'REPEAT');
    this.material.setTexture(this.TexBox);

    // Boxes will always fall on a pentagon like form with:
    // Random rotations
    this.rotations = [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]

    // Random distance from centre of fall
    this.distances = [Math.random() % 1 + 1/2,Math.random() % 1 + 1/2,Math.random() % 1 + 1/2,Math.random() % 1 + 1/2,Math.random() % 1 + 1/2]
     
    }
    /**
     * Calculates a random position for the box indicated by index
     * @param index index of this.distances 
     * @return array with the parametres of scene.translate CGF function
     */
    breakBox(index){
        return [
            this.posX + this.distances[index]*Math.cos(2*(index + 1)*Math.PI/5 + this.distances[index] / 5.0),
            this.posY,
            this.posZ + this.distances[index]*Math.sin(2*(index + 1)*Math.PI/5 + this.distances[index] / 5.0)
        ];
        
    }

    /**
     * Drops the supply crate with a certain position, velocity and angle.
     * Also changes the supply state to FALLING
     * @param {*} posX vehicle position in the x axis
     * @param {*} posY vehicle position in the y axis (default value should be 10)
     * @param {*} posZ vehicle position in the z axis
     * @param {*} scale vehicle scale factor
     * @param {*} velocity vehicle velocity
     * @param {*} angle  vehicle angle with the y axis
     */
    drop(posX,posY,posZ,scale,velocity,angle){
        this.state = SupplyStates.FALLING;
        this.posX = posX;
        this.posY = posY - 0.7 * scale;
        this.initialPosY = this.posY;
        this.posZ = posZ;
        this.accelaration = 2*this.initialPosY/9;
        this.velocityX = velocity * Math.sin(angle) * 0.4;
        this.velocityZ = velocity * Math.cos(angle) * 0.4;
        this.rot = angle;
    }
    /**
     * Changes the SupplyBox state if it hits the ground
     */
    land(){
        if(this.posY <= 0.125){
            this.posY = 0.125;
            this.state=SupplyStates.LANDED;
        }
    }

    /**
     * Updates the box position and state, if needed
     * @param {*} t current time of the program, in ms
     */
    update(t){
        if(this.state == SupplyStates.INACTIVE){
            this.initialTime = t;
        }
        // Fazer a caixa cair a uma certa velocidade
        if(this.state == SupplyStates.FALLING){
            this.time = (t-this.initialTime)/1000;
            this.posX += this.velocityX;
            this.posY = -1/2*this.accelaration * this.time * this.time + this.initialPosY;
            this.posZ += this.velocityZ;
            this.land();
        }
    }
    /**
     * Resets the obejcts's atrributes to its default state
     */
    reset(){
        this.state = SupplyStates.INACTIVE;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.time = 0;
    }
    /**
     * Displays the box when its state equals SupplyStates.FALLING
     */
    displayFalling(){
        this.scene.pushMatrix();
        this.scene.translate(this.posX,this.posY,this.posZ);
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rot,0,1,0);
        this.quad.display();
        this.scene.popMatrix();
    }
    /**
     * Displays the box when its state equals SupplyStates.LANDED
     */
    displayOnLanded(){

        this.material.apply(this.TexBox);

        this.scene.pushMatrix();
        this.scene.translate(this.posX,this.posY,this.posZ);
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotations[0],0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(0));
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotations[1],0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(1));
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotations[2],0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(2));
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotations[3],0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(3));
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotations[4],0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(4));
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotations[5],0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();
    }
    /**
     * Evaluates the currunt SupplyState and calls a display function accordingly
     */
    display() {
        switch (this.state) {
            case SupplyStates.INACTIVE:
                return;
            case SupplyStates.FALLING:
                this.displayFalling();
                break;
            case SupplyStates.LANDED:
                this.displayOnLanded();
                break;
            default:
                break;
        }
	}
}
