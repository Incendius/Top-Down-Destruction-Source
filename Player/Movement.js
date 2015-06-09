#pragma strict

//Movement
var motion : Vector3;
public var originalWalkSpeed : float;
public var originalRunSpeed : float;
var walkSpeed : float;
var runSpeed : float;
public var rotationSpeed : float = 450;

//Weapons
private var CurrentGun : Gun;
public var guns : Gun[];
public var HandHold : Transform;

//System
private var targetRotation : Quaternion;
private var moveDirection : Vector3 = Vector3.zero;
private var animator : Animator;

function Start(){
	Cursor.visible = true;
	animator = GetComponent(Animator);
	EquipGun(0);
	originalRunSpeed = 30.0;
	originalWalkSpeed = 20.0;
}


function Update () {
	ControlMouse();
	if(CurrentGun){
		if(Input.GetButtonDown("Fire1")){
			CurrentGun.Shoot();
		}
		else if(Input.GetButton("Fire1")){
			CurrentGun.ShootContinuous();
		}
	}
	
	for(var i :int = 0; i < guns.Length; i++){
		if(Input.GetKeyDown((i+1) + "")){
			EquipGun(i);
			break;
		}
	}
}

function EquipGun(i){
	if(CurrentGun){
		Destroy(CurrentGun.gameObject);
	}
	
	CurrentGun = Instantiate(guns[i],HandHold.position,HandHold.rotation) as Gun;
	CurrentGun.transform.parent = HandHold;
	animator.SetFloat("Weapon ID", CurrentGun.gunID);
}

function ImportValuesSpeed(speedMultiplier : float){
	//Debug.Log(speedMultiplier, gameObject);
	walkSpeed = originalWalkSpeed * speedMultiplier;
	runSpeed = originalRunSpeed * speedMultiplier;
}


function ControlMouse() {
	var controller : CharacterController = GetComponent(CharacterController);
	var mousePos : Vector3 = Input.mousePosition;
	
	mousePos = Camera.main.ScreenToWorldPoint(Vector3(mousePos.x,mousePos.y,Camera.main.transform.position.y - transform.position.y));
	targetRotation = Quaternion.LookRotation(mousePos - new Vector3(transform.position.x,0,transform.position.z));
	transform.eulerAngles = Vector3.up * Mathf.MoveTowardsAngle(transform.eulerAngles.y,targetRotation.eulerAngles.y,rotationSpeed * Time.deltaTime);

	var input : Vector3  = Vector3(Input.GetAxisRaw("Horizontal"),0,Input.GetAxisRaw("Vertical"));
	var motion : Vector3 = input;
	
	motion *= (Mathf.Abs(input.x) == 1 && Mathf.Abs(input.z) == 1)?.7f:1;
	motion *= (Input.GetButton("Run"))?runSpeed:walkSpeed;
	motion += Vector3.down * 8;
		
	controller.Move(motion * Time.deltaTime);
	
	animator.SetFloat("Speed",Mathf.Sqrt(motion.x*motion.x + motion.z*motion.z));
	
}

