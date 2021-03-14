
var info = [];
function print()
{
	document.getElementById("loading").style.display = "block";
	$("P").remove();
	document.getElementById( "copyable" ).style.display = "none";
	for( var i = 0; i < info.length; i++ )
	{
			var p = document.createElement("P");
			p.innerHTML = i+1 + ". <b>Email: </b>" + info[i].email + " <b>Name: </b>" + info[i].name ;
			p.setAttribute("id", info[i].email);
			document.body.appendChild(p);
	}
	document.getElementById("loading").style.display = "none";
	document.getElementById("num").innerHTML = info.length + " Members";
	document.getElementById("filter").innerHTML = "Filter";
}

function checkLogin()
{
	var email = document.getElementById("email").value;
	var pwd = document.getElementById("password").value;
	var p = document.getElementById("message");
	
	if( email.length > 0 && pwd.length > 0 )
	{
		var ref = db.collection("emails").doc( email.toLowerCase() );
		ref.get().then( function ( snapshot ){
			if( snapshot.exists )
			{

				if( pwd == snapshot.data().password )
				{
					p.innerHTML = "Success!";
					localStorage.setItem( "email", email );
					localStorage.setItem( "pwd", pwd );
				}
				else
					p.innerHTML = "Incorrect Password!";
			}
			else
			{
				p.innerHTML = "Email does not exist";
			}
		});
	};
	
//	db.collection('email').get().then( (snapshot) => {
//		snapshot.docs.forEach(doc => {
//			
//		}
//	}
	
}

function getData()
{
	db.collection('people').get().then( (snapshot) => {
		snapshot.docs.forEach(doc => {
			var data = doc.data();
			info.push( {"name": doc.data().name, "email": doc.data().email } );
		});
		info.sort( function( a, b ) 
		{
			return ((a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : ((a.name.toLowerCase() == b.name.toLowerCase()) ? 0 : 1));
		});
		print();
	});
}

var open = false;
function openMenu()
{ 
	open = !open;
	
	document.getElementById("menuwrapper").style.display = open ? "block" : "none";
	document.getElementById("menuwrapper").style.right = open ? "0px": "-140px";
	document.getElementsByClassName("topnav")[0].style.right = open ? "180px": "40px";
	//document.getElementById("menubutton").innerHTML = open ? "&vellip;": "&middot;&middot;&middot;";
	document.getElementById("menubutton").style.transform =  open ? "rotate(-450deg)" : "rotate(0deg)";	
}

var openPop = false;
function togglePopup()
{
	openPop = !openPop;
	fadeIn( "popupwrapper", openPop );
}

function fadeIn( id, openPop )
{
	
	if( openPop )
	{
		document.getElementById(id).style.display = openPop ? "block" : "none";
		setTimeout( function() { 
			document.getElementById(id).style.opacity = openPop ? "1" : "0";
			document.getElementById("popup").style.display = openPop ? "block" : "none";
		}, 10 ); 
		setTimeout( function() { slideDown( "popup", openPop ) }, 100 );
	}
	else
	{
		slideDown( "popup", openPop );
		setTimeout( function() { 
			document.getElementById("popup").style.display = "none";
			document.getElementById(id).style.opacity = "0";
			setTimeout( function() { 
				document.getElementById(id).style.display = "none";
			} , 300 );
		}, 300 ); 
	} 
}
function slideDown( id, openPop )
{
	document.getElementById(id).style.top = openPop ? "calc(30vh - 20px)" : "-50vh";
}


function copy ( id )
{
	var text = document.getElementById( id );
	text.select();
	text.setSelectionRange(0, 99999);
	document.execCommand("copy");
	
	//document.getElementById( "copied" ).style.display = "block";
	//document.getElementById( "copied" ).style.opacity = "1";
	document.getElementById( "copied" ).style.top = "0";
	setTimeout( function(){
		document.getElementById( "copied" ).style.top = "-80";
	}, 3500 );
	
}

var state = 0;
function printEmails()
{
	state = 1;
	document.getElementById("loading").style.display = "block";
	document.getElementById( "copyable" ).style.display = "none";
	$("P").remove();
	for( var i = 0; i < info.length; i++ )
	{
			var p = document.createElement("P");
			p.innerHTML = i+1 + ". "+ info[i].email;
			p.setAttribute("id", info[i].email);
			document.body.appendChild(p);
	}
	document.getElementById("filter").innerHTML = "Email";
	document.getElementById("loading").style.display = "none";
	toggleFilter();
}

function printList()
{
	console.log( "hello");
	var emails = ""
	document.getElementById("loading").style.display = "block";
	document.getElementById( "copyable" ).style.display = "none";
	$("P").remove();
	for( var i = 0; i < info.length; i++ )
	{
		emails += info[i].email + " ";
	}
	document.getElementById("loading").style.display = "none";
	document.getElementById("copyable").style.display = "block";
	var p = document.getElementById( "emails" );
	p.setAttribute( "value", emails );
	document.getElementById("filter").innerHTML = "Copyable Email List";
	toggleFilter();
	
}
function printNames()
{
	document.getElementById( "copyable" ).style.display = "none";
	document.getElementById("loading").style.display = "block";
	state = 2;
	$("P").remove();
	var count = 0;
	for( var i = 0; i < info.length; i++ )
	{
			var p = document.createElement("P");
			p.innerHTML = i+1 + ". "+ info[i].name;
			p.setAttribute("id", info[i].email);
			document.body.appendChild(p);
	}
	document.getElementById("filter").innerHTML = "Name";
	document.getElementById("loading").style.display = "none";
	toggleFilter();
}
function printFirstNames()
{
	document.getElementById( "copyable" ).style.display = "none";
	document.getElementById("loading").style.display = "block";
	state = 2;
	$("P").remove();
	var count = 0;
	for( var i = 0; i < info.length; i++ )
	{
			var p = document.createElement("P");
			var fname = info[i].name.split(" ")[0];
			p.innerHTML = i + 1 + ". "+ fname;
			p.setAttribute("id", info[i].email);
			document.body.appendChild(p);
	}
	document.getElementById("filter").innerHTML = "First Name";
	document.getElementById("loading").style.display = "none";
	toggleFilter();
}
function printLastNames()
{
	document.getElementById( "copyable" ).style.display = "none";
	document.getElementById("loading").style.display = "block";
	state = 2;
	$("P").remove();
	var count = 0;
	for( var i = 0; i < info.length; i++ )
	{
			var p = document.createElement("P");
			var lname = info[i].name.split(" ")[1];
			p.innerHTML = i + 1 + ". "+ ( lname == undefined ? "" : lname );
			p.setAttribute("id", info[i].email);
			document.body.appendChild(p);
	}
	document.getElementById("filter").innerHTML = "Name";
	document.getElementById("loading").style.display = "none";
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
	if( linesE == 0 || linesN == 0 )
	{
		p.style.color = "red";
		p.innerHTML = "Please enter some data";
	}
	else if( linesE != linesN )
	{
		p.style.color = "red";
		p.innerHTML = "The number of emails and names do not match. Please try again";
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