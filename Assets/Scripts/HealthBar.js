#pragma strict

var size : Transform;
var counter : int = 0;
var max : int = 1500;
var original : float;

function Start () {
	size = transform;
	original = size.localScale.x;
}

function Update () {
	if (size.localScale.x > 0)
		size.localScale.x = original * (max - counter) / max;
		
	if (size.localScale.x < 0)
		size.localScale.x = 0;
	
	counter++;
}