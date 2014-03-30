#pragma strict

var offset : Vector2;
var object : GameObject[];
var player : Transform;

function Start () {
	object = GameObject.FindGameObjectsWithTag("Player");
	player = object[0].transform;
}

function Update () {
	transform.position = player.position + offset;
}