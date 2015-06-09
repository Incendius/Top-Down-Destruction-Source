#pragma strict

public var expBar : Transform;
public var levelText : TextMesh;

function SetPlayerExp (percentToLevel:float, playerLevel : int) {
	levelText.text = "level : " + playerLevel;
	expBar.localScale = Vector3(percentToLevel, 1, 1);
}

function Update () {

}