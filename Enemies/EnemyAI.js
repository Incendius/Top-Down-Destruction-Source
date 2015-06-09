#pragma strict
var Player: GameObject;
var range : float;



function Update () {
	range = Vector3.Distance(Player.transform.position, transform.position);
	if(range < 75){
		transform.LookAt(Player.transform.position);
	}
	transform.rotation.x = 0;
	transform.rotation.z = 0;
	
	
}
