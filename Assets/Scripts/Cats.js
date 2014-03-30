#pragma strict

var moveSpeed : float = 10f;
var HP : int = 2;
var dead : boolean;

var facingRight : boolean = true;
var count : int = 0;

function Start() {
	rigidbody2D.velocity.x = moveSpeed;
}

function FixedUpdate() {
	
	var newX : float;
	
	if (count >= 50) {
		var xSign : int;
		var ySign : int;
		
		if (Random.value >= 0.5)
			xSign = 1;
		else
			xSign = -1;
			
		if (Random.value >= 0.5)
			ySign = 1;
		else
			ySign = -1;
			
		newX = (Random.value * moveSpeed * xSign);
		
		rigidbody2D.velocity.x = newX;
		rigidbody2D.velocity.y = Random.value * moveSpeed * ySign;
		
		count = 0;
	}
	
	var temp : boolean = facingRight;
	if (newX > 0)
		facingRight = true;
	else if (newX < 0)
		facingRight = false;
	if (temp != facingRight)
		Flip();

	count++;
}

function Flip() {
	rigidbody2D.transform.localScale.x = -rigidbody2D.transform.localScale.x;
}