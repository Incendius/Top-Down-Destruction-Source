#pragma strict

public class Enemy extends Entity {

	private var CurrentGun : Gun;
	public var guns : Gun[];
	public var HandHold : Transform;
	public var expOnDeath : float;
	private var player : Player;
	public var CurrLevel : float;
	private var EnemyType : int;
	public var range : float;
	private var targetRotation : Quaternion;
	public var rotationSpeed : float = 450;
	private var grav : int;
	
	function Start(){
		player = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
		EnemyType = Random.Range(0,2);
		EquipGun(EnemyType);
	}
	
	function Update(){
		range = Vector3.Distance(player.transform.position, transform.position);
		if(range < 75){
			targetRotation = Quaternion.LookRotation(player.transform.position - new Vector3(transform.position.x,0,transform.position.z));
			transform.eulerAngles = Vector3.up * Mathf.MoveTowardsAngle(transform.eulerAngles.y,targetRotation.eulerAngles.y,rotationSpeed * Time.deltaTime);
		}
		if(EnemyType ==0){
			if(range <= 30){
				//CurrentGun.Shoot();
			}
		}
		transform.rotation.x = 0;
		transform.rotation.z = 0;
		transform.position += Vector3.down*grav;
	}
	
	function EquipGun(i){
		if(CurrentGun){
			Destroy(CurrentGun.gameObject);
		}
		CurrentGun = Instantiate(guns[i],HandHold.position,HandHold.rotation) as Gun;
		CurrentGun.transform.parent = HandHold;
		
	}
	
	function FixedUpdate(){
		CurrLevel = player.level;
	}
	
	
	public override function DestroyEnemy(){
		expOnDeath = 20*CurrLevel*CurrLevel;
		player.AddExperience(expOnDeath);
		super.DestroyEnemy();
	}
	
	
}