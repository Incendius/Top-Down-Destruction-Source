#pragma strict

function Start () {

}

function Update () {

}


function OnCollisionEnter (collision : Collision) {

	if(transform.rotation.y < 359 && transform.rotation.y >1){
		if(collision.impactForceSum.magnitude > 2){
			for(var child : Transform in transform){
				child.gameObject.AddComponent(Rigidbody);
				child.GetComponent(DestructionBelow).DestroyRigidBody();;
			}
		}
	}
	
	Debug.Log(collision.impactForceSum.magnitude, gameObject);
	if(collision.impactForceSum.magnitude > 6){
		for(var child : Transform in transform){
			child.gameObject.AddComponent(Rigidbody);
			child.GetComponent(DestructionBelow).DestroyRigidBody();;
		}
	}
	
}