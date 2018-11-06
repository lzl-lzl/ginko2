"use strict";function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}var

PI = Math.PI,cos = Math.cos,sin = Math.sin,abs = Math.abs,random = Math.random;
var TAU = 2 * PI;
var TO_RAD = PI / 180;
var rand = function rand(n) {return n * random();};
var randRange = function randRange(n) {return n - rand(2 * n);};
var fadeInOut = function fadeInOut(t, m) {
	var hm = 0.5 * m;
	return abs((t + hm) % m - hm) / hm;
};

var MAX_SPRITES = 200;

var canvas = void 0;
var ctx = void 0;
var origin = void 0;
var sprite = void 0;
var carrots = void 0;
var spriteList = [];


function autoType(elementClass, typingSpeed){
	var thhis = $(elementClass);
	thhis.css({
	  "position": "relative",
	  "display": "inline-block"
	});
	thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
	thhis = thhis.find(".text-js");
	var text = thhis.text().trim().split('');
	var amntOfChars = text.length;
	var newString = "";
	thhis.text("|");
	setTimeout(function(){
	  thhis.css("opacity",1);
	  thhis.prev().removeAttr("style");
	  thhis.text("");
	  for(var i = 0; i < amntOfChars; i++){
		(function(i,char){
		  setTimeout(function() {        
			newString += char;
			thhis.text(newString);
		  },i*typingSpeed);
		})(i+1,text[i]);
	  }
	},1500);
  }
  
  $(document).ready(function(){
	// Now to start autoTyping just call the autoType function with the 
	// class of outer div
	// The second paramter is the speed between each letter is typed.   
	autoType(".type-js",200);
  });


function getCarrot(x, y) {
	var currentSprite=rand(1)<.98?(currentSprite=rand(1)<.7?spriteList[0]:spriteList[1]):spriteList[2];
	return {
		destroy: false,
		position: [x, y],
		direction: rand(TAU),
		rotation: rand(TAU),
		speed: rand(1) + 1,
		rotSpeed: randRange(10) * TO_RAD,
		scale: rand(0.025) + 0.01,
		life: 0,
		ttl: rand(100) + 100,
		
		init: function init() {
			//lzl add
			// var currentSprite=rand(1)<.5?spriteList[0]:spriteList[1];
			this.size = [
			// sprite.width * this.scale,
			currentSprite.width * this.scale,
			currentSprite.height * this.scale];

			return this;
		},
		update: function update() {
			this.destroy = this.life++ > this.ttl;
			this.rotation += this.rotSpeed;
			this.rotSpeed *= 0.99;
			this.size[0] *= 1.025;
			this.size[1] *= 1.025;
			this.speed *= 1.035;
			this.position[0] += cos(this.direction) * this.speed;
			this.position[1] += sin(this.direction) * this.speed;
			return this;
		},
		draw: function draw() {
			ctx.a.save();
			ctx.a.globalAlpha = fadeInOut(this.life, this.ttl);
			ctx.a.translate(this.position[0] - 0.5 * this.size[0], this.position[1] - 0.5 * this.size[1]);
			ctx.a.rotate(this.rotation);
			ctx.a.translate(-this.position[0] - 0.5 * this.size[0], -this.position[1] - 0.5 * this.size[1]);
			ctx.a.drawImage(currentSprite, this.position[0], this.position[1], this.size[0], this.size[1]);
			ctx.a.restore();
			return this;
		} };

}

function setup() {
	canvas = {
		a: document.createElement("canvas"),
		b: document.createElement("canvas") };

	canvas.b.style = "\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t";






	document.body.appendChild(canvas.b);
	ctx = {
		a: canvas.a.getContext("2d"),
		b: canvas.b.getContext("2d") };

	origin = [];
	carrots = [];

	resize();

	//lzl add
	
	var sprite1 = new Image();
	var sprite2 = new Image();
	var sprite3 = new Image();
	// rand(1)<.5?sprite.src = "file:///C:/Users/f/Desktop/tree1.png":sprite.src = "file:///C:/Users/f/Desktop/tree2.png"
	sprite1.src = "https://lzl-lzl.github.io/Ginkgo/png/tree.png";
	spriteList[0] = sprite1;
	sprite2.src = "https://lzl-lzl.github.io/Ginkgo/png/tree2.png"
	spriteList[1] = sprite2;
	sprite3.src = "https://lzl-lzl.github.io/Ginkgo/png/bird.png"
	spriteList[2] = sprite3;
	// sprite.src = "file:///C:/Users/f/Desktop/tree.png";
	// sprite.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/carrot.png";
	sprite2.onload = function () {
		draw();
	};
}

function resize() {var _window =
	window,innerWidth = _window.innerWidth,innerHeight = _window.innerHeight;

	canvas.a.width = canvas.b.width = innerWidth;
	canvas.a.height = canvas.b.height = innerHeight;

	origin[0] = 0.5 * innerWidth;
	origin[1] = 0.5 * innerHeight;
}

function draw() {
	carrots.length < MAX_SPRITES && carrots.push(getCarrot.apply(undefined, _toConsumableArray(origin)).init());

	ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
	ctx.b.clearRect(0, 0, canvas.a.width, canvas.a.height);

	var i = void 0,carrot = void 0;

	for (i = carrots.length - 1; i >= 0; i--) {
		carrots[i].update().draw().destroy && carrots.splice(i, 1);
	}

	ctx.b.save();
	ctx.b.filter = 'blur(8px) saturate(200%) brightness(200%)';
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();

	ctx.b.drawImage(canvas.a, 0, 0);

	window.requestAnimationFrame(draw);
}

// setTimeout(function(){window.addEventListener("load", setup);},2000);
// setTimeout(function(){window.addEventListener("resize", resize);},2000);
$(document).ready(
	setTimeout(function(){
		setup();
		// window.addEventListener("load", setup);
		window.addEventListener("resize", resize);
	},5000)

	

)
