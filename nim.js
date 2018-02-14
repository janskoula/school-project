sirky = Math.random(20,30);
var obtiznosti  = ["lehká", "střední", "těžká"];
var obtiznost=0;

function obtiznostHry(){
	obtiznost += 1;
	if (obtiznost > 2){
	obtiznost = 0;
	}
	return "Obtížnost: " + obtiznosti[obtiznost];
}
document.getElementById("pravidla").style.display = "none";
function pravidla(){
	var x = document.getElementById("pravidla");
	if (x.style.display== "none") {
		x.style.display = "block";
	}
	else{
		x.style.display = "none";
	}
}

function novaHra(){
	var x = document.getElementById("main");
	x.style.display = "none";
	var y = document.getElementById("game");
	y.style.display = "block";
	document.getElementById("obtiznost").innerHTML = "Obtížnost: " + obtiznosti[obtiznost];	
}

function menu(){
	var x = document.getElementById("main");
	x.style.display = "block";
	document.getElementById("game").style.display = "none";
}
