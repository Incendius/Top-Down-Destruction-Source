#pragma strict

private var range : float;
public var player : GameObject;
public var enemy : GameObject;
private var CanSpawn : boolean = true;
private var Randomisation : Vector3;


function Spawn(){
	CanSpawn = false;
	Instantiate(enemy,transform.position+Randomisation, transform.rotation);
	yield WaitForSeconds(5);
	CanSpawn = true;
}

function Update () {
	range = Vector3.Distance(player.transform.position, transform.position);
	if(CanSpawn){
		if (range>40){
			Spawn();
		}
	}
	Randomisation = Vector3(Random.Range(-10,10), 0, Random.Range (-10, 10));
}