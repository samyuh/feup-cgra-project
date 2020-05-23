/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class MyDoubleSidePlane extends CGFobject {
	constructor(scene, number) {
		super(scene);
		this.plane = new MyPlane(scene, number);
	}
	/**
	 * Displays the DoubleSidePLane
	 */
	display() {
		// -- Front Plane -- //
		this.scene.pushMatrix();
		this.plane.display();
		this.scene.popMatrix();
		// -- Back Plane -- //
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.plane.display();
		this.scene.popMatrix();
	}
	/**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.plane.enableNormalViz();
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.plane.disableNormalViz();
    }
}