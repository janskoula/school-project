
var obtiznosti  = ["lehká", "střední", "těžká"];
var obtiznost=0;
var odebrat=0;
var sirky = {};

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
	odebrat=0;
	sirky.pocet = Math.floor(Math.random()* 16) + 15;
	var x = document.getElementById("main");
	var y = document.getElementById("game");
	var hromada = [];
	x.style.display = "none";
	y.style.display = "block";
	document.getElementById("odebrat").innerHTML = odebrat;
	document.getElementById("obtiznost").innerHTML = "Obtížnost: " + obtiznosti[obtiznost];
	document.getElementById("counter").innerHTML = "SIREK CELKEM: " + sirky.pocet;
	document.getElementById("konectahu").style.display = "block";
	document.getElementById("odebrane_sirky").style.display = "none";
	
	// ZACATEK HRY
	for (i = 0; i < sirky.pocet; i++){
		hromada += "<img src='sirka.svg' class='sirka'>";
	}
	document.getElementById("hromada").innerHTML = hromada;
}

function konecTahu(){
	
	if (odebrat == 0){
		return;
	}
	sirky.pocet -= odebrat;
	hromada = "";
	for (i = 0; i < sirky.pocet; i++){
		hromada += "<img src='sirka.svg' class='sirka'>";
	}
	document.getElementById("hromada").innerHTML = hromada;
	if (sirky.pocet <= 0){
		document.getElementById("hromada").innerHTML = "VYHRÁL/A JSTE";
		document.getElementById("konectahu").style.display = "none";
		sirky.pocet = 0;
		document.getElementById("counter").innerHTML = "SIREK CELKEM: " + sirky.pocet;
		document.getElementById("odebrat").innerHTML = odebrat;
		return;
	}
	document.getElementById("counter").innerHTML = "SIREK CELKEM: " + sirky.pocet;
	document.getElementById("odebrat").innerHTML = odebrat;
	document.getElementById("konectahu").style.display = "none";
	document.getElementById("tahpocitace").style.display = "block";
	
	// TAH POCITACE - s prestavkou 2 sekund
	setTimeout(tahPocitace, 2000);
}
function tahPocitace(){
	// LEHKA OBTIZNOST
	if (obtiznost == 0){
		
		if (sirky.pocet < 4){
			odebrat = sirky.pocet;
		}
		else{
			odebrat = Math.floor(Math.random() * 3) + 1;
		}
	}
	
	// STREDNI OBTIZNOST
	else if (obtiznost == 1){
		if (sirky.pocet < 10){
			if (sirky.pocet % 4 != 0){
				odebrat = sirky.pocet % 4;
			}
			else{
				odebrat = Math.floor(Math.random() * 3) + 1;
			}
		}
		else{
			odebrat = Math.floor(Math.random() * 3) + 1;
		}
	}
	
	// TEZKA OBTIZNOST
	else if (obtiznost == 2){
		if (sirky.pocet % 4 != 0){
			odebrat = sirky.pocet % 4;
		}
		else{
			odebrat = Math.floor(Math.random() * 3) + 1;
		}
	}
	
	// ZBYTEK AKCI (PREPISOVANI OKNA)
	sirky.pocet -= odebrat; 
	hromada = "";
	for (i = 0; i < sirky.pocet; i++){	// pridavani sirek do hromady
		hromada += "<img src='sirka.svg' class='sirka'>";
	}
	// ZPRAVA KOLIK POCITAC ODEBRAL SIREK
	if (odebrat == 1){
		document.getElementById("odebrane_sirky").innerHTML = "Počítač odebral 1 sirku.";
	}
	else{
		document.getElementById("odebrane_sirky").innerHTML = "Počítač odebral " + odebrat + " sirky.";
	}
	document.getElementById("odebrane_sirky").style.display = "block";
	odebrat = 0;
	document.getElementById("hromada").innerHTML = hromada; // vzskladani hromady do okna
	document.getElementById("counter").innerHTML = "SIREK CELKEM: " + sirky.pocet; // prepsani celkoveho poctu sirek
	// KONTROLA JESTLI HRAC NEPROHRAL
	if (sirky.pocet <= 0){
		document.getElementById("hromada").innerHTML = "PROHRÁL/A JSTE";
		document.getElementById("konectahu").style.display = "none";
		document.getElementById("tahpocitace").style.display = "none";
		return;
	}
	
	document.getElementById("konectahu").style.display = "block"; // objeveni buttonu "konectahu"
	document.getElementById("tahpocitace").style.display = "none"; // schovani divu "tahpocitace"
	document.getElementById("odebrat").innerHTML = odebrat; // prepsani cisla na 0 
	
}
function menu(){
	var x = document.getElementById("main");
	x.style.display = "block";
	document.getElementById("game").style.display = "none";
}

function zvysit(){
	odebrat += 1;
	if (odebrat > 3){
		odebrat = 3;
	}
	document.getElementById("odebrat").innerHTML = odebrat;
}

function snizit(){
	odebrat -= 1;
	if (odebrat < 0){
		odebrat = 0;
	}
	document.getElementById("odebrat").innerHTML = odebrat;
}