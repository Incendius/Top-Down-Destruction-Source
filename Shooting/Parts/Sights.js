#pragma strict
var gunScript : Gun;
private var variance : float;
private var range : float;

function Start () {
	gunScript = gameObject.transform.parent.gameObject.GetComponent(Gun);
	variance = Random.Range(0.0, 10.0);
	range = Random.Range(0.6, 2.0);
	gunScript.ImportValuesSight(variance, range);
	gameObject.GetComponent(Sights).enabled = false;
}