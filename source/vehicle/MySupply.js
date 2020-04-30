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
    this.accelaration = 9.8; //Constant for accelaration
    this.time = 0;
    this.initialTime = 0;

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

    // Random rotations
    this.rotation1 = Math.random();
    this.rotation2 = Math.random();
    this.rotation3 = Math.random();
    this.rotation4 = Math.random();
    this.rotation5 = Math.random();
    this.rotation6 = Math.random();

    this.translation1 = Math.random() % 1/2 + 1/2;
    this.translation2 = Math.random() % 1/2 + 1/2;
    this.translation3 = Math.random() % 1/2 + 1/2;
    this.translation4 = Math.random() % 1/2 + 1/2;
    this.translation5 = Math.random() % 1/2 + 1/2;
    this.translation6 = Math.random() % 1/2 + 1/2;
    
        
    
        
	}
    drop(posX,posY,posZ,scale){
        this.state = SupplyStates.FALLING;
        this.posX = posX;
        this.posY = posY - 0.7 * scale;
        this.initialPosY = this.posY;
        this.posZ = posZ;
        this.accelaration = 2*this.initialPosY/9;
        //Isto podia estar no construtor da caixa
    }
    land(){
        if(this.posY <= 0.125){
            this.posY = 0.125;
            this.state=SupplyStates.LANDED;
        }
    }

    update(t){
        if(this.state == SupplyStates.INACTIVE){
            this.initialTime = t;
        }
        // Fazer a caixa cair a uma certa velocidade
        if(this.state == SupplyStates.FALLING){
            this.time = (t-this.initialTime)/1000;
            this.posY = -1/2*this.accelaration * this.time * this.time + this.initialPosY;
            this.land();
        }
    }
    reset(){
        this.state = SupplyStates.INACTIVE;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.time = 0;
    }

    displayFalling(){
        this.scene.pushMatrix();
        this.scene.translate(this.posX,this.posY,this.posZ);
        this.scene.scale(1/4,1/4,1/4);
        this.quad.display();
        this.scene.popMatrix();
    }

    displayOnLanded(){

        // Remove the + 2 from the Y axis translations after terrain is fixed

        this.material.apply(this.TexBox);

        this.scene.pushMatrix();
        this.scene.translate(this.translation7,this.posY + 2,this.posZ);
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotation1,0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.posX + this.translation1,this.posY + 2,this.posZ);
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotation2,0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.posX - this.translation2,this.posY + 2,this.posZ);
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotation3,0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.posX,this.posY + 2,this.posZ + this.translation3);
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotation4,0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.posX,this.posY + 2,this.posZ - this.translation4);
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotation5,0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.posX-this.translation5,this.posY + 2,this.posZ ,this.translation6);
        this.scene.scale(1/4,1/4,1/4);
        this.scene.rotate(this.rotation6,0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.side.display();
        this.scene.popMatrix();
    }

    display() {
        switch (this.state) {
            case SupplyStates.INACTIVE:
                return;
                break;
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
