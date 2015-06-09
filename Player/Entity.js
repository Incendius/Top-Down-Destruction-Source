#pragma strict

public var Health : float;
var airRadius : float;
var airPower : float;
var lightningRadius : float;
var lightningDamage : float;
var lightningTracer : LineRenderer;
var destroyedBy : String;
var spreadLightning : boolean;
function Start(){
	lightningTracer = GetComponent(LineRenderer);
}

public function TakeDamage(dmg : float){
	Health -= dmg;
	if(Health<=0){
		DestroyEnemy();
	}
}

public function ImportValues(elemental : String){
	destroyedBy = elemental;
}
//Air Values
public function AirImportValues(radius : float, power : float){
	airRadius = radius;
	airPower = power;
}
//lightningValues
public function LightningImportValues(radius : float, damage : float, shot : String){
	lightningDamage = damage;
	lightningRadius = radius;
	if (shot == "shot"){
		spreadLightning = true;
	}
}

public function DestroyEnemy () {
	if(destroyedBy == "Lightning"){
		LightningEffect(lightningRadius, lightningDamage);
	}
	if(destroyedBy == "Air"){
		AirEffect(airRadius, airPower);
	}
	Destroy(gameObject);
}

function AirEffect(radius : float, power : float){
		airRadius = radius;
		airPower = power;
		var grenadeOrigin : Vector3 = transform.position;
		var colliders : Collider[] = Physics.OverlapSphere (grenadeOrigin, radius); //this is saying that if any collider within the radius of our object will feel the explosion
		for(var hit : Collider in colliders){  
			if (hit.GetComponent.<Rigidbody>()){
				hit.GetComponent.<Rigidbody>().AddExplosionForce(power, grenadeOrigin, radius, 0.1); //if we hit any rigidbodies then add force based off our power, the position of the explosion object
			}
		}
}

function LightningEffect(lightningRange: float, lightningDamage : int){
	if(spreadLightning == true){
		spreadLightning = false;
		var colliders : Collider[] = Physics.OverlapSphere(transform.position, lightningRange);
		for(var hit : Collider in colliders){
			if(hit.GetComponent(Entity)){
				hit.GetComponent(Entity).TakeDamage(lightningDamage);
				RenderLightning(hit.gameObject.transform.position - transform.position);
			}
		}
	}
}

function RenderLightning(hitPoint : Vector3){
	lightningTracer.enabled = true;
	lightningTracer.SetPosition(0, Vector3(0,0,0));
	lightningTracer.SetPosition(1, Vector3(0,0,0)+hitPoint);
	yield WaitForSeconds(5);
	lightningTracer.enabled = false;
}