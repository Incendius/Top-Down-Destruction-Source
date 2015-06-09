#pragma strict
var gunScript : Gun;
var gunType : int;

var range : float;
var fireRate : float;

function Start(){
	gunScript = gameObject.transform.parent.gameObject.GetComponent(Gun);
	range=Random.Range(30.0, 50.0);
	fireRate = Random.Range(400.0, 800.0);
	gunScript.ImportValuesBarrel(range, fireRate);
	gameObject.GetComponent(Barrel).enabled = false;
}