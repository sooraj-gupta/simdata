function print()
{
	document.getElementById("loading").style.display = "block";
	$("P").remove();
	db.collection('people').get().then( (snapshot) => {
		snapshot.docs.forEach(doc => {
			var data = doc.data();

			var p = document.createElement("P");
			p.innerHTML = "<b>Email: </b>" + doc.data().email + " <b>Name: </b>" + doc.data().name ;
			p.setAttribute("id", doc.id);
			p.setAttribute("class", "data-title");
			document.body.appendChild(p);


		});
		document.getElementById("loading").style.display = "none";
	});
	document.getElementById("filter").innerHTML = "Filter";
}

var open = false;
function openMenu()
{
	open = !open;
	document.getElementById("menuwrapper").style.right = open ? "0px": "-140px";
	document.getElementById("menubutton").style.right = open ? "180px": "40px";
	//document.getElementById("menubutton").innerHTML = open ? "&vellip;": "&middot;&middot;&middot;";
	document.getElementById("menubutton").style.transform =  open ? "rotate(-450deg)" : "rotate(0deg)";	
}

var state = 0;
function printEmails()
{
	state = 1;
	document.getElementById("loading").style.display = "block";
	$("P").remove();
	db.collection('people').get().then( (snapshot) => {
		snapshot.docs.forEach(doc => {
			var data = doc.data();

			var p = document.createElement("P");
			p.innerHTML = doc.data().email;
			p.setAttribute("id", doc.id);
			p.setAttribute("class", "data-title");
			document.body.appendChild(p);


		});
		document.getElementById("loading").style.display = "none";
	});
	document.getElementById("filter").innerHTML = "Email";
	toggleFilter();
}
function printNames()
{
	document.getElementById("loading").style.display = "block";
	state = 2;
	$("P").remove();
	db.collection('people').get().then( (snapshot) => {
		snapshot.docs.forEach(doc => {
			var data = doc.data();

			var p = document.createElement("P");
			p.innerHTML = doc.data().name;
			p.setAttribute("id", doc.id);
			p.setAttribute("class", "data-title");
			document.body.appendChild(p);

		});
		document.getElementById("loading").style.display = "none";
	});
	document.getElementById("filter").innerHTML = "Name";
	toggleFilter();
}


function goto(name)
{
	window.location = name;
}

function getInput()
{
	const query = window.location.search;
	const urlParams = new URLSearchParams(query);
	//console.log( data );
	
	var val = $("form").serializeArray();
	var names = val[1].value;
	var emails = val[0].value;
	
	var linesE = 0;
	for( var i = 0; i < emails.length; i++ )
	{
		if( emails.charAt(i) == '\n' )
		{
			linesE++;	
		}
	}
	var linesN = 0;
	for( var i = 0; i < names.length; i++ )
	{
		if( names.charAt(i) == '\n' )
		{
			linesN++;	
		}
	}
	console.log( linesE );
	console.log( linesN );
	
	var p = document.getElementById("message");
	if( linesE != linesN )
	{
		p.innerHTML = "Error: The number of emails and names do not match. Please try again";
	}
	else
	{
		p.style.color = "white";
		var i = 0;
		var j = 0;

		for( var l = 0; l < linesE; l++ )
		{

			var buffer = "";
			var email = "";
			var name = "";
			do
			{
				//console.log( buffer );
				if( emails.charAt(i) == '\n' )
				{
					//console.log( buffer );
					email = buffer;
					buffer = "";
					i++;
				}
				else
				{
					buffer += emails.charAt(i);	
					i++;
				}

			}while ( emails.charAt( i-1 ) != '\n' );
			buffer = "";
			do
			{
				if( names.charAt(j) == '\n' )
				{
					//console.log( buffer );
					name = buffer;
					buffer = "";
					j++;
				}
				else
				{
					buffer += names.charAt(j);	
					j++;
				}

			}while ( names.charAt( j-1 ) != '\n' );
			if( name && email)
			{
				console.log( "name: " + name + "; email: " + email);
				set(email,name, l, linesE, p );
				name = "";
				email = "";
			}
			if( l == linesE-1)
			{
				break;
			}
		}
		//print();
	}
}

var filter = false;
function toggleFilter()
{
	filter = !filter
	if( !filter )
		document.getElementById("myDropdown").style.display = "none";
	else
		document.getElementById("myDropdown").style.display = "block";
}

function set( email, name, line, lines, p ){
	var lower = email.toLowerCase();
	db.collection("people").doc(lower).set({
		email: email,
    	name: name
	})
	.then(function() {
		var per = Math.ceil(((line+1)/lines) * 100);
		p.innerHTML = per + "% Uploaded"
		if (per == 100)
		{
			p.innerHTML = "Done Uploading";		
		}
	})
	.catch(function(error) {
		console.error("Error writing document: ", error);
	});
}