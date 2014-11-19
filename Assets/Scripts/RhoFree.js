#pragma strict

var up : KeyCode;
var left : KeyCode;
var down : KeyCode;
var right : KeyCode;
var shoot : KeyCode;

var facingRight : boolean = true;
var health : float = 100;
var healthTimer : int = 50;
var healthBar : Transform;
var healthLength : float;

var anim : Animator;

var speed : float = 10;

var attack : Rigidbody2D;
var offsetRight : Vector2;
var offsetLeft : Vector2;
var attackCounter : int = 50;

var counter : int = 0;

function Start () {
	anim = GetComponent(Animator);
	healthBar = GameObject.FindGameObjectsWithTag("Health")[0].transform;
	healthLength = healthBar.localScale.x;
}

function Update () {
	if (counter >= 1500)
		Application.LoadLevel("Pixel");

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
			pixelInst.gameObject.AddComponent("Attack");
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
	
	if (Input.GetKey(right))
		facingRight = true;
	else if (Input.GetKey(left))
		facingRight = false;
		
	anim.SetBool("FacingRight", facingRight);
	
	if (Input.GetKey(shoot))
		anim.SetBool("Shooting", true);
	else
		anim.SetBool("Shooting", false);
		
	anim.SetFloat("Speed", Mathf.Abs(rigidbody2D.velocity.x) + Mathf.Abs(rigidbody2D.velocity.y));
	
	attackCounter++;
	healthTimer++;
	counter++;
}

function OnCollisionEnter(collision : Collision) {
	if (collision.gameObject.tag === "Wall") {
		Hurt();
		UpdateHealthBar();
		healthTimer = 0;
	}
}

function Hurt() {
	if (healthTimer >= 50) {
		health -= 5;
		UpdateHealthBar();
		healthTimer = 0;
	}
}

function UpdateHealthBar() {
	healthBar.localScale.x = healthLength * health / 100;
	if (healthBar.localScale.x < 0)
		healthBar.localScale.x = 0;
}