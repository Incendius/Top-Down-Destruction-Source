#pragma strict
var world : GameObject;

var lifeTime: float = 10;
var deathTime : float;

var mat : Material;
var originalColour : Color;
var fadePercent : float;
var fade : boolean = false;
var destroyed : boolean = false;

function Start(){
	world = GameObject.FindGameObjectWithTag("WorldEmpty");
	mat = GetComponent.<Renderer>().material;
	originalColour = mat.color;
	gameObject.GetComponent(ParticleSystem).enableEmission=false;
	gameObject.GetComponent(ParticleSystem).startColor = mat.color;
}

function OnCollisionEnter (collision : Collision) {

	if(!collision.transform.parent==transform.parent){
		DestroyRigidBody();
	}
}

function DestroyRigidBody(){
	transform.parent = world.transform;
	FadeDestroy();
}

function FixedUpdate(){
	if (gameObject.GetComponent(ParticleSystem).enableEmission == true){
		StopEmission();
	}
}

function StopEmission(){
	yield WaitForSeconds(2);
	gameObject.GetComponent(ParticleSystem).enableEmission=false;
}

function FadeDestroy(){
	while(true){
		yield WaitForSeconds(0.5f);
		mat.color=Color.Lerp(originalColour, Color.clear, fadePercent);
		if(fadePercent>=1){
			Destroy(gameObject);
		}
	}
}

function GetHit(dmg: float){
	fadePercent+=dmg/100;
}
