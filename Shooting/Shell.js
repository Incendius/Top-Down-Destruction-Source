#pragma strict


var lifeTime: float = 5;
var deathTime : float;

var fading : boolean;
var mat : Material;
var originalColour : Color;
var fadePercent : float;

function Start () {
	mat = GetComponent.<Renderer>().material;
	originalColour = mat.color;
	deathTime = Time.time + lifeTime;
	Fade();
}

function Fade() {
	while (true){
		yield WaitForSeconds(0.2f);
		if (fading){
			fadePercent +=Time.deltaTime;
			mat.color = Color.Lerp(originalColour, Color.clear, fadePercent);
			
			if(fadePercent >= 1){
				Destroy(gameObject);
			}
		}
		else{
			if(Time.time > deathTime){
				fading = true;
			}
		}
	}
}


function OnCollisionEnter(c : Collision){
	if (c.collider.gameObject.CompareTag("Terrain")){
		Destroy(GetComponent.<Rigidbody>());
	}
}