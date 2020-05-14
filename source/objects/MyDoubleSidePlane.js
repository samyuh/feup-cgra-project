
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class MyDoubleSidePlane extends CGFobject{
	constructor(scene,number) {
		super(scene);
		this.plane = new MyPlane(scene,number);
	}

	display(){
		this.scene.pushMatrix();
		this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0);	
		this.plane.display();
		this.scene.popMatrix();
	}

}


