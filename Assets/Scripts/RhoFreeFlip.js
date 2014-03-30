#pragma strict

var up : KeyCode;
var left : KeyCode;
var down : KeyCode;
var right : KeyCode;
var shoot : KeyCode;

var facingRight : boolean = true;

var anim : Animator;

var speed : float = 10;

var attack : Rigidbody2D;
var offsetRight : Vector2;
var offsetLeft : Vector2;
var attackCounter : int = 50;

function Start () {
	anim = GetComponent(Animator);
}

function Update () {

	if (Input.GetKey(shoot)) {
		rigidbody2D.velocity.x = 0;
		rigidbody2D.velocity.y = 0;
		if (attackCounter >= 50) {
			if (facingRight) {
				var pixelInst : Rigidbody2D = Instantiate(attack, transform.position + offsetRight, Quaternion.Euler(new Vector3(0,0,0)));
				pixelInst.velocity = new Vector2(speed, 0);
			} else {
				pixelInst = Instantiate(attack, transform.position + offsetLeft, Quaternion.Euler(new Vector3(0,0,180f)));
				pixelInst.velocity = new Vector2(-speed, 0);
			}
			attackCounter = 0;
		}
	} else if (Input.GetKey(up)) {
		rigidbody2D.velocity.y = speed;
	} else if (Input.GetKey(right)) {
		rigidbody2D.velocity.x = speed;
	} else if (Input.GetKey(down)) {
		rigidbody2D.velocity.y = -speed;
	}else if (Input.GetKey(left)) {
		rigidbody2D.velocity.x = -speed;
	} else {
		rigidbody2D.velocity.x = 0;
		rigidbody2D.velocity.y = 0;
	}
	
	var temp : boolean = facingRight;
	
	if (Input.GetKey(right))
		facingRight = true;
	else if (Input.GetKey(left))
		facingRight = false;
		
	if (temp != facingRight)
		Flip();
	
	if (Input.GetKey(shoot))
		anim.SetBool("Shooting", true);
	else
		anim.SetBool("Shooting", false);
		
	anim.SetFloat("Speed", Mathf.Abs(rigidbody2D.velocity.x) + Mathf.Abs(rigidbody2D.velocity.y));
	
	attackCounter++;
}

function Flip() {
	transform.localScale.x = -transform.localScale.x;
};