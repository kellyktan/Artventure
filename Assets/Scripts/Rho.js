#pragma strict

var jump : KeyCode;
var left : KeyCode;
var right : KeyCode;


var anim : Animator;

var grounded : boolean = true;
var groundCheck : Transform;
var groundRadius : float = 0.2;
var whatIsGround : LayerMask;

var speed : float = 10;

function Start () {
	anim = GetComponent(Animator);
}

function Update () {
	grounded = Physics2D.OverlapCircle(groundCheck.position, groundRadius, whatIsGround);
	
	if (grounded)
		rigidbody2D.velocity.y = 0;

	if (Input.GetKey(jump) && grounded) {
		rigidbody2D.velocity.y += 7;
	} else if (Input.GetKey(right) && grounded) {
		rigidbody2D.velocity.x = speed;
	} else if (Input.GetKey(left) && grounded) {
		rigidbody2D.velocity.x = speed * -1;
	} else if (grounded) {
		rigidbody2D.velocity.x = 0;
	}
	
	var newVel : float = rigidbody2D.velocity.x;
	anim.SetFloat("Speed", Mathf.Abs(newVel));
	if (newVel > 0)
		anim.SetBool("FacingRight", true);
	else if (newVel < 0)
		anim.SetBool("FacingRight", false);
}