// NASTAVENI PROMENYCH
var obtiznosti  = ["lehká", "střední", "těžká"];
var obtiznost=0;
var odebrat=0;
var sirky = {};

// nastaveni buttonu na prepinani obtiznosti
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

// button Nova hra
function novaHra(){
	odebrat=0;
	
	sirky.pocet = Math.floor(Math.random()* 8) + 16;  // nastave
	var hromada = []; // list se sirkama
	document.getElementById("main").style.display = "none"; 	// vypnuti viditelnosti menu
	document.getElementById("game").style.display = "block";	 // zapnuti viditelnosti samotne hry
	document.getElementById("odebrat").innerHTML = odebrat; 	// vypsani cisla sirek ktere se odeberou
	document.getElementById("obtiznost").innerHTML = "Obtížnost: " + obtiznosti[obtiznost]; 	// vypsani na jakou obtiznost je hra spustena
	document.getElementById("counter").innerHTML = "SIREK CELKEM: " + sirky.pocet; 	// vypsani celkoveho poctu sirek
	document.getElementById("konectahu").style.display = "block"; 	// zapnuta viditelnost buttonu pro ukonceni tahu
	document.getElementById("odebrane_sirky").style.display = "none"; 	// vypnuta viditelnost zpravy o odebranych sirkach pocitacem (kvuli odchodu do menu)
	
	// ZACATEK HRY
	for (i = 0; i < sirky.pocet; i++){  // pridani sirek(obrazku) do promene "hromada"
		hromada += "<img src='../images/sirka.svg' class='sirka'>";
	}
	document.getElementById("hromada").innerHTML = hromada; // zobrazeni vsech sirek ve hre
}
// KONEC TAHU
function konecTahu(){
	if (odebrat == 0){
		return;
	}
	sirky.pocet -= odebrat; // odebrani sirek hracem
	hromada = ""; // nulovani listu se sirkami
	for (i = 0; i < sirky.pocet; i++){  // znovu naplneni hromady bez odectenych sirek
		hromada += "<img src='../images/sirka.svg' class='sirka'>";
	}
	document.getElementById("hromada").innerHTML = hromada; // znovu vsech zbyvajicich sirek
	
	// KONTROLA JESTLI HRAC NEVYHRAL
	if (sirky.pocet <= 0){  	// pokud je sirek mensi nebo roven 0 tak:
		document.getElementById("hromada").innerHTML = "VYHRÁL/A JSTE"; 	// zobrazeni napisu s vytezstvim
		document.getElementById("konectahu").style.display = "none"; 	// vypnuta viditelnost buttonu s koncem tahu
		sirky.pocet = 0; 	// nastaveni poctu sirek na 0 (aby se neslo do minusu)
		document.getElementById("counter").innerHTML = "SIREK CELKEM: " + sirky.pocet; 	// vypsani celkoveho poctu sirek (tedy 0)
		document.getElementById("odebrat").innerHTML = odebrat;
		document.getElementById("odebrane_sirky").style.display = "none";
		return; 	// konec funkce/hry
	}
	
	document.getElementById("counter").innerHTML = "SIREK CELKEM: " + sirky.pocet; 	// vypsani zbyvajicich sirek
	document.getElementById("odebrat").innerHTML = odebrat; 	// prepsani poctu sirek ktere se odeberou
	document.getElementById("konectahu").style.display = "none";	 // vypnuti viditelnosti buttonu na ukonceni tahu
	document.getElementById("tahpocitace").style.display = "block"; 	// zapnuti viditelnosti bloku oznamujici tah pocitace
	
	// TAH POCITACE - s prestavkou 2 sekund
	setTimeout(tahPocitace, 2000);
}

// FUNKCE PRO TAH POCITACE
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
	for (i = 0; i < sirky.pocet; i++){		// pridavani sirek do hromady
		hromada += "<img src='../images/sirka.svg' class='sirka'>";
	}
	// ZPRAVA KOLIK POCITAC ODEBRAL SIREK
	if (odebrat == 1){
		document.getElementById("odebrane_sirky").innerHTML = "Počítač odebral 1 sirku.";
	}
	else{
		document.getElementById("odebrane_sirky").innerHTML = "Počítač odebral " + odebrat + " sirky.";
	}
	
	// KONTROLA JESTLI HRAC NEPROHRAL
	if (sirky.pocet <= 0){
		document.getElementById("hromada").innerHTML = "PROHRÁL/A JSTE";
		document.getElementById("konectahu").style.display = "none";
		document.getElementById("tahpocitace").style.display = "none";
		document.getElementById("counter").innerHTML = "SIREK CELKEM: 0";
		return;
	}

	document.getElementById("odebrane_sirky").style.display = "block"; 	// zobrazeni zpravy o poctu odebranych sirek pocitacem
	odebrat = 0;
	document.getElementById("hromada").innerHTML = hromada; 	// vzskladani hromady do okna
	document.getElementById("counter").innerHTML = "SIREK CELKEM: " + sirky.pocet; 	// prepsani celkoveho poctu sirek
	document.getElementById("konectahu").style.display = "block"; 	// objeveni buttonu "konectahu"
	document.getElementById("tahpocitace").style.display = "none"; 	// schovani divu "tahpocitace"
	document.getElementById("odebrat").innerHTML = odebrat; 	// prepsani cisla na 0 
	
}

// BUTTON MENU
function menu(){
	var x = document.getElementById("main");
	x.style.display = "block"; 	// zapnuti viditelnosti menu
	document.getElementById("game").style.display = "none"; 	// vypnuti viditelnosti hry
}
// button pro zvyseni poctu sirek, ktere se odeberou
function zvysit(){
	odebrat += 1;
	if (odebrat > 3){
		odebrat = 3;
	}
	document.getElementById("odebrat").innerHTML = odebrat;
}
// button pro snizeni poctu sirek, ktere se odeberou
function snizit(){
	odebrat -= 1;
	if (odebrat < 0){
		odebrat = 0;
	}
	document.getElementById("odebrat").innerHTML = odebrat;
}