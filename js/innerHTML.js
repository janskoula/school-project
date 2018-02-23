window.onload=getJS;
document.getElementById("js").style.backgroundColor = "#3882a0";
document.getElementById("html").style.backgroundColor = "#3882a0";
function bgon(x){
	x.style.backgroundColor = "#333";
}

function bgoff(x){
	x.style.backgroundColor = "#3882a0";
}

function getJS(){
	document.getElementById("main-kod").innerHTML = `
	<p style="text-align: center;">JavaScript</p>
<pre>

// Po nacteni stranky se do odstavce s id 'externi-js' vypise: Tento odsta... .
document.getElementById('externi-js').innerHTML = 'Tento odstavec vypsal JavaScript, ktery byl pripojen externe';
</pre>`;
		}
		
		function getHTML(){
			document.getElementById("main-kod").innerHTML = `
			<p style="text-align: center;">HTML</p>
			<pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
	&lt;head&gt;
		&lt;meta charset="UTF-8"&gt;
	&lt/head&gt;
	&ltbody&gt;
		&lt;!-- Odstavec do ktereho so pri kliknuti na tlacitko vypise AHOJ.--&gt;
		&lt;p id="ahoj"&gt;&lt;/p&gt;
		&lt;button onclick="getElementById('ahoj').innerHTML='AHOJ!';"&gt;Klikni&lt;/button&gt;
		
		
		&lt;p id="externi-js"&gt;&lt;/p&gt;
		
		&lt;!-- Pripojeni JavaScript kodu externe. --&gt;
		&lt;script src="pokus.js"&gt;&lt;script&gt;
	&lt;/body&gt;
&lt;/html&gt;
		</pre>
			`;
		}
