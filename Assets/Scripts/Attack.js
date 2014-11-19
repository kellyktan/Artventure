#pragma strict

var counter : int = 0;
var myName : String;

function Start() {
	name = gameObject.name;
}

function Update() {
	if (counter >= 200 && myName != "Attack")
		Destroy(gameObject);
	counter++;
}