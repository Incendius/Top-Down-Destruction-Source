#pragma strict
var gunScript : Gun;
var movementScript : Movement;
var player : GameObject;

var speed : float;
private var stability : float;

function Start () {
	gunScript = gameObject.transform.parent.gameObject.GetComponent(Gun);
	player = GameObject.FindGameObjectWithTag("Player");
	movementScript = player.GetComponent(Movement);
	stability = Random.Range(0.5, 1.5);
	speed = Random.Range(0.7, 3);
	movementScript.ImportValuesSpeed(speed);
	gunScript.ImportValuesStock(stability);
	gameObject.GetComponent(Stock).enabled = false;
}
