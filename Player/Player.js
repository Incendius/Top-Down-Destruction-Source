#pragma strict

public class Player extends Entity {
	private var bodyScript : Body;
	private var stockScript : Stock;
	private var sightsScript : Sights;
	private var barrelScript : Barrel;


	var level : int;
	private var currentXP : float;
	private var experienceForLevel: float;
	var gui : GameGui;
	
	public function Start(){
		gui = GameObject.FindGameObjectWithTag("GUI").GetComponent(GameGui);
		LevelUp();
		experienceForLevel = 30;
		level = 1;
	}
		
	public function AddExperience(exp : float){
		currentXP += exp;
		if(currentXP >= experienceForLevel){
			experienceForLevel = experienceForLevel*3+level*2;
			LevelUp();				
		}
		gui.SetPlayerExp(currentXP/experienceForLevel, level);
	}
	
	public function LevelUp(){
		level += 1;
	}	
}