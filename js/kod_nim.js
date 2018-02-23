window.onload=getJS;
var y = getElementByClassName("aktivni");
function bgon(x){
	x.style.backgroundColor = "#333";
}

function bgoff(x){
	x.style.backgroundColor = "#3882a0";
}

function getJS(){
	document.getElementById("js").style.backgroundColor = "#3882a0";
	document.getElementById("html").style.backgroundColor = "#3882a0";
	document.getElementById("css").style.backgroundColor = "#3882a0";
	document.getElementById("main-kod").innerHTML = `
	<p style="text-align: center;">JavaScript</p>
<pre>
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
	
	sirky.pocet = Math.floor(Math.random()* 16) + 15;  // nastave
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
		hromada += "&lt;img src='sirka.svg' class='sirka'&gt;";
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
		hromada += "&lt;img src='sirka.svg' class='sirka'&gt;";
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
		hromada += "&lt;img src='sirka.svg' class='sirka'&gt;";
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
				</pre>`;
		}
		
		function getHTML(){
			document.getElementById("main-kod").innerHTML = `
			<p style="text-align: center;">HTML</p>
			<pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
	&lt;head&gt;
		&lt;link rel="stylesheet" href="nim.css" type="text/css"&gt;
		&lt;link href="https://fonts.googleapis.com/css?family=Roboto|Ubuntu" rel="stylesheet"&gt;
		&lt;meta charset="utf-8"&gt;
	&lt;/head&gt;
	&lt;body&gt;
		&lt;div id="window"&gt;
			
			&lt;div id="game"&gt;
				&lt;button onclick="menu()" class="button menubutton"&gt;MENU&lt;/button&gt;
				&lt;div id="obtiznost"&gt;&lt;/div&gt;
				&lt;div class="header"&gt;HRA NIM&lt;/div&gt;
				&lt;div class="wipe"&gt;&lt;/div&gt;
				&lt;table class="odebrat" id="tabulka"&gt;
					&lt;tr&gt;
						&lt;td width="150"&gt;&lt;/td&gt;
						&lt;td type="button" onclick="zvysit();"&gt;&lt;img src="arrow_up.svg"&gt;&lt;/td&gt;
					&lt;/tr&gt;
					&lt;tr&gt;
						&lt;td width="150"&gt;ODEBRAT&lt;/td&gt;
						&lt;td id="odebrat"&gt;&lt;/td&gt;
					&lt;/tr&gt;
					&lt;tr&gt;
						&lt;td width="150"&gt;&lt;/td&gt;
						&lt;td type="button" onclick="snizit();"&gt;&lt;img src="arrow_down.svg"&lt;/td&gt;
					&lt;/tr&gt;
				&lt;/table&gt;
				&lt;div id="counter"&gt;SIREK CELKEM:&lt;/div&gt;
				&lt;div class="wipe"&gt;&lt;/div&gt;
				&lt;div id="hromada"&gt;&lt;/div&gt;
				&lt;button onclick="konecTahu();" id="konectahu"&gt;UKONČIT TAH&lt;/button&gt;
				&lt;div id="tahpocitace"&gt;HRAJE POČÍTAČ&lt;/div&gt;
				&lt;div id="odebrane_sirky"&gt;&lt;/div&gt;
			&lt;/div&gt;
			
			&lt;div id="main"&gt;
				&lt;div class="header"&gt;HRA NIM&lt;/div&gt;
				&lt;ul&gt;
					&lt;li&gt;&lt;button onclick="novaHra();" class="button"&gt;Nová hra&lt;/button&gt;&lt;/li&gt;
					&lt;li&gt;&lt;button onclick="this.innerHTML= obtiznostHry();" class="button"&gt;Obtížnost: lehká&lt;/button&gt;&lt;/li&gt;
					&lt;li&gt;&lt;button onclick="pravidla();" class="button"&gt;Pravidla&lt;/button&gt;&lt;/li&gt;
				&lt;/ul&gt;
				
				&lt;div id="pravidla"&gt;
					PRAVIDLA HRY NIM:&lt;br&gt; HRA:&lt;br&gt;-když jsi na tahu můžeš odebrat 1-3 sirky&lt;br&gt;-po ukončení tahu odebírá sirky protivník&lt;br&gt; KONEC HRY:&lt;br&gt;-ten kdo sebere poslední sirku vyhrál
				&lt;/div&gt;
			&lt;/div&gt;
		
		&lt;/div&gt;
		&lt;script src="nim.js"&gt;&lt;/script&gt;
	&lt;/body&gt;
&lt;/html&gt;
		</pre>
			`;
		}
		
function getCSS(){
	document.getElementById("main-kod").innerHTML = `
	<p style="text-align: center;">CSS</p>
<pre>
body, html{
	text-align: center;
	margin: 0 auto;
	padding: 0;
	color: white;
	font-family:'Roboto', sans-serif;
}

ul{
	margin: 50px auto;
	padding: 0;
	list-style-type: none;
}

ul li{
	margin: 0px auto;
}

.button{
	width: 160px;
	font-size: 18px;
	background-color: #008CBA;
	border-width: 2px;
	color: white;
	padding: 4px 30px;
	text-decoration: none;
}

.header{
	width: 200px;
	margin: 0 auto;
	padding: 30px;
	color: white;
	font-size: 24px;
}

#pravidla{
	background-color: #008CBA;
	width: 600px;
	margin: 40px auto;
	padding: 15px;
	color: white;
	border-width: 2px;
}

#main{
	width: 1200px;
	height: 600px;
	border-radius: 50px;
	background-color: #555555;
}

#window{
	margin: 50px auto;
	width: 1200px;
	height: 600px;
	border-radius: 50px;
	background-color: #555555;
}

#game{
	display: none;
}
.menubutton{
	margin: 10px 30px;
	float: left;
}

#obtiznost{
	margin: 10px 30px;
	width: 100px;
	color: white;
	float: right;
	padding: 5px 20px;
	background-color: #008CBA;
}

#counter{
	float: right;
	margin-right: 200px;
	margin-top: 80px;
	font-size: 20px;
}

.odebrat{
	float: left;
	margin-top: 20px;
	margin-left: 100px;
	width: 200px;
	font-size: 20px;
}

.wipe{
	clear: both;
}

#hromada{
	text-align: center;
	font-size: 35px;
	width: 1000px;
	height: 140px;
	margin: 20px auto;
}

.sirka{
	float: left;
	margin: 10px;
}

#konectahu{
	color: white;
	margin: 40px auto;
	font-size: 25px;
	background-color: #008CBA;
}

#tahpocitace{
	width: 160px;
	padding: 4px 30px;
	color: white;
	margin: 40px auto;
	font-size: 25px;
	background-color: #008CBA;
	display: none;
}

#odebrane_sirky{
	font-size: 16px;
	text-align: center;
}
</pre>
			`;
		}