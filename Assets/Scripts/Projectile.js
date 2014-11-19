#pragma strict

var facingRight : boolean;
var speed : float = 10;

function Start () {
	if (facingRight) {
		rigidbody2D.velocity.x = speed;
	} else {
		Flip();
		rigidbody2D.velocity.x = speed * -1;
	}
}

function Update () {
	rigidbody2D.velocity.x = speed;
}

function Flip() {
	facingRight = !facingRight;
	var theScale : Vector3 = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}