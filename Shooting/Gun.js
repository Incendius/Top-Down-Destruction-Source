#pragma strict
enum GunType {Semi,Auto};
public var gunType : GunType;
public var rpm : float;
public var rangeV3 : Vector3;
public var range : float;
public var gunID : float;
public var damage : float;
public var stability : float;

public var collisionMask : LayerMask;
public var spawn : Transform;
private var tracer: LineRenderer;
public var shellEjectionPoint: Transform;
public var shell : Rigidbody;


//shooting Body Elements
public var elementalEffect : String;
public var abililityEffect : String;
public var airRadius : float;
public var airStrength : float;
public var lightningRadius : float;
public var lightningDamage : float;

//System
var secondsBetweenShots : float;
var nextPossibleShootTime : float;

function Start(){
	secondsBetweenShots = 60/rpm;
	tracer = GetComponent(LineRenderer);
	range = 1;
}

public function ImportValuesBarrel(barrelRange : float, barrelRPM : float){
	range = (range*barrelRange);
	rpm = barrelRPM;
}

public function ImportValuesSight(sightStability : float, sightRange : float){
	stability = sightStability;
	range *= sightRange;
}

public function ImportValuesStock(stockStability : float){
	stability *= stockStability;
}

public function ImportValuesBody(elemental : String, ability : String, valueOne : float, valueTwo : float){
	elementalEffect = elemental;
	abililityEffect = ability;
	
	if(elementalEffect == "Air"){
	airRadius = valueOne;
	airStrength = valueTwo;
	}
	if(elementalEffect == "Lightning"){
	lightningRadius = valueOne;
	lightningDamage = valueTwo;
	}
	
	
}


function Shoot(){
	if(CanShoot()){
	
		var shotDistance : float = range;
		var hit : RaycastHit;
		var currentShotStability : float = Random.Range(0-stability, stability);
		rangeV3 = transform.TransformDirection(currentShotStability,0,shotDistance);
		var rayshot : Ray = Ray(spawn.position, rangeV3);
		var originalShotDistance = shotDistance;
		if (Physics.Raycast(rayshot, hit, shotDistance, collisionMask)){
			shotDistance = hit.distance;
			rangeV3 = transform.TransformDirection(shotDistance*currentShotStability/originalShotDistance,0,shotDistance);			
			if(hit.collider.GetComponent(Entity)){
				hit.collider.GetComponent(Entity).ImportValues(elementalEffect);
				if(elementalEffect == "Lightning"){
					hit.collider.GetComponent(Entity).LightningImportValues(lightningRadius, lightningDamage, "shot");
				}
				if(elementalEffect == "Air"){
					hit.collider.GetComponent(Entity).AirImportValues(airRadius, airStrength);
				}
				hit.collider.GetComponent(Entity).TakeDamage(damage);
				
			}
			if(hit.collider.tag == "Building"){
				var colliders : Collider[] = Physics.OverlapSphere(hit.collider.transform.position, 2);
				for(var hitBuilding : Collider in colliders){
					if(hitBuilding.tag == "Building"){
						hitBuilding.gameObject.GetComponent(DestructionBelow).GetHit(damage);
						hitBuilding.gameObject.GetComponent(ParticleSystem).enableEmission = true;
						if(!hitBuilding.gameObject.GetComponent.<Rigidbody>()){
							hitBuilding.gameObject.AddComponent (Rigidbody);
							hitBuilding.gameObject.GetComponent(DestructionBelow).DestroyRigidBody();
						}
						else if(hitBuilding.gameObject.GetComponent.<Rigidbody>()){
							hitBuilding.GetComponent.<Rigidbody>().AddExplosionForce(20, hit.transform.position, 2, 0.1);
						}
					}
				}
			}
		}
		
		
		nextPossibleShootTime =Time.time + secondsBetweenShots;
		RenderTracer(rangeV3);		
		var newShell : Rigidbody = Instantiate(shell,shellEjectionPoint.position,shellEjectionPoint.rotation) as Rigidbody;
		newShell.AddForce(shellEjectionPoint.forward * Random.Range(1.50f, 2.00f) + spawn.forward*Random.Range(-0.10f,0.10f));
	}
	
}

function ShootContinuous(){
	if (gunType == GunType.Auto) {
		Shoot ();
	}
}
	
function CanShoot(){		
	var canShoot : boolean = true;
		
	if(Time.time < nextPossibleShootTime){
		canShoot = false;
	}
	return canShoot;
}

function RenderTracer(hitPoint : Vector3){
	tracer.enabled = true;
	tracer.SetPosition(0, spawn.position);
	tracer.SetPosition(1, spawn.position+hitPoint);
	yield WaitForSeconds(0.001);
	tracer.enabled = false;
}	