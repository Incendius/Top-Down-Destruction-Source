#pragma strict
private var gunScript : Gun;

private var elementalEffect = ["Fire", "Air", "Vortex", "Lightning"];
private var specialAbility = ["FireRate", "DamageUp", "LightWeight"];

private var selectedElemental;
private var selectedAbility;
private var hasElemental : int;
private var hasAbility : int;
//Air
private var radiusAir : float;
private var strengthAir : float;
//Lightning
private var radiusLightning : float;
private var damageLightning : float;
var val1;
var val2;



function Start () {
	gunScript = gameObject.transform.parent.gameObject.GetComponent(Gun);
	hasElemental = Random.Range(0, 100);
	if(hasElemental == 1){
		var elementChoice = Random.Range(0, elementalEffect.Length);
		selectedElemental = elementalEffect[elementChoice];
	}
	else{
		selectedElemental = "nill";
	}
	hasAbility = Random.Range(0, 60);
	
	if(selectedElemental == "nill" || hasAbility == 1){
		var abilityChoice = Random.Range(0, specialAbility.Length);
		selectedAbility = specialAbility[abilityChoice];
	}
	else{
		selectedAbility = "nill";
	}
	radiusAir = Random.Range(7.0, 20.0);
	strengthAir = Random.Range(400.0, 700.0);
	radiusLightning = Random.Range(3.0, 5.0);
	damageLightning = Random.Range(1.0, 2.0);
	
	
	if(selectedElemental == "Air"){
		val1=radiusAir;
		val2 = strengthAir;
	}
	else if(selectedElemental == "Lightning"){
		val1 = radiusLightning;
		val2 = damageLightning;
	}
	else{
		val1 =0;
		val2 = 0;
	}
	
	//Debug.Log(selectedElemental+", "+selectedAbility+", "+val1+", " +val2+", "+gunScript, gameObject);
	gunScript.ImportValuesBody(selectedElemental, selectedAbility, val1, val2);
	
	gameObject.GetComponent(Body).enabled = false;
}

