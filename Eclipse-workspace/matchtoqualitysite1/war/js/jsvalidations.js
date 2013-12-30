
//**************************************************************************
// To chk which explorer client has

var isNS4 = (navigator.appName=="Netscape")?1:0;

function chkKeypress(evt)	//chk for 0 - 9, A-Z and @_.-:/\()&#58,47,92
{
	if(!isNS4)
	{

		if ((event.keyCode == 13 || event.keyCode == 44  || event.keyCode == 58 || event.keyCode == 35 || event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 41 || event.keyCode == 43 || event.keyCode == 47 || event.keyCode == 92 || event.keyCode == 95 || event.keyCode == 64 || event.keyCode == 46 || event.keyCode == 45 || event.keyCode == 32) || (event.keyCode <= 57 && event.keyCode >= 48) || (event.keyCode <= 90 && event.keyCode >= 65) || (event.keyCode <= 122 && event.keyCode >= 97))
		{
		}
		else
		{
			event.returnValue = false;
		}
	}
	else
	{
		var key = (window.Event) ? evt.which : evt.keyCode;
    
	var result;
	
		if ((key == 13 || key == 44 || key == 58 || key == 35 || key == 38 || key == 40 || key == 41 || key == 43 || key == 47 || key == 92 || key == 95 || key == 64 || key == 46 || key == 45  || key == 32) || (key <= 57 && key >= 48) || (key <= 90 && key >= 65) || (key <= 122 && key >= 97) || key == 0 || key == 8)
		{
		return true;
		}
		
		else
		{
	       
	        evt.preventDefault();
		    
        } 
	}
}
//************************************************************************************************************************

function allowdigitsandDecimal()	//allows only digits i.e. 0 - 9 and decimal
{

	if(!isNS4)
	{
		if ((event.keyCode <= 57 && event.keyCode >= 48) || event.keycode == 46)
		{
		}
		else
		{
			event.returnValue = false;
		}
	}
	else
	{
		if ((event.which <= 57 && event.which >= 48) || event.which == 46)
		{
		}
		else
		{
			return false;
		}
	}
}


function allowdigits(evt)	//allows only digits i.e. 0 - 9
{
	var key = (window.Event) ? evt.which : evt.keyCode;

	if(!isNS4)
	{
		if ((event.keyCode <= 57 && event.keyCode >= 48) || event.which == 46 ||  event.which == 8 ||  event.which == 13 || event.which == 9 || event.which==189)
		{
		}
		else
		{
			event.returnValue = false;
		}
	}
	else
	{
		if ((key <= 57 && key>= 48) || key == 46 || key == 8 ||  key == 13 || key==9 || key==0 || key==189)
		{
		}
		else
		{
			evt.preventDefault();
		}
	}
}


//************************************************************************************************************************

function StrTrim(StrVar)
{
// ***** Function to trim a string sent and return the resultant string ***
        for (I = 0 ; I < StrVar.length ; I++)
        {
                if ((StrVar.substring(0,1)) == " ")
                {
                        StrVar = StrVar.substring(1,StrVar.length)
                        I = I - 1
                }
        }

        for (I = 0 ; I < StrVar.length ; I++)
        {
                if ((StrVar.substring(StrVar.length - 1,StrVar.length - 0)) == " ")
                {
                        StrVar = StrVar.substring(0,StrVar.length - 1)
                        I = I - 1
                }
        }
        return StrVar
}

//**************************************************************************************************************


	function checknumbers(strarg)    //For names etc that should not contain numbers
	{
			var inti;
			var strcharat;
			var intcount
			
			intcount = 0
			for(inti=0;inti<strarg.length;inti++)
			{
				strcharat=strarg.charAt(inti).toUpperCase();
				if(!((strcharat>="A" && strcharat<="Z") || (strcharat>="a" && strcharat<="z") || (strcharat==" " || strcharat==".")))
				break;
				else
				{
					if(strcharat>="A" && strcharat<="Z")				
					intcount ++;
				}
			}
		if(inti==strarg.length && intcount > 0)
			return true;
		else
			return false;
	}
	


//**************************************************************************************************************


	function checkcharacters(strarg)   //telephone number can contain -
	{
			var inti;
			var strcharat;
			for(inti=0;inti<strarg.length;inti++)
			{
				strcharat=strarg.charAt(inti).toUpperCase();
				if(!((strcharat>="0" && strcharat<="9") || (strcharat=="-")|| (strcharat>="A" && strcharat<="Z")))
				break;
			}
		if(inti==strarg.length)
			return true;
		else
			return false;
	}

//**************************************************************************************************************	

	function checkspecialcharacters(strarg)   //User name and password
	{
			var strcharat;
			var inti;
			for(inti=0;inti<strarg.length;inti++)
			{
				strcharat=strarg.charAt(inti);
				if(!((strcharat>="A" && strcharat<="Z") ||(strcharat>="a" && strcharat<="z") ||(strcharat>="0" && strcharat<="9") ||(strcharat=="."||strcharat=="_")))
				break;
			}
		if(inti==strarg.length)
			return true;
		else
			return false;
	}
	
//**************************************************************************************************************
	function checknumbersonly(strarg)   //check the string for numbers only.if contains number then ok else return false
	{
			var inti;
			var strcharat;
			for(inti=0;inti<strarg.length;inti++)
			{
				strcharat=strarg.charAt(inti).toUpperCase();
				if(!((strcharat>="0" && strcharat<="9") || (strcharat==",")))
				break;
			}
			
		if(inti==strarg.length)
			return true;
		else
			return false;
	}

//**************************************************************************************************************


	function chkmail_old(strmail)
	{
		var reg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/; // not valid
		var reg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/; // valid
		if (!reg1.test(strmail) && reg2.test(strmail)) 		
				return true;
		else
				return false;
	}


	function chkmail(emailStr) 
	{
		/* The following variable tells the rest of the function whether or not
		to verify that the address ends in a two-letter country or well-known
		TLD.  1 means check it, 0 means don't. */
		var checkTLD=1;
		
		/* The following is the list of known TLDs that an e-mail address must end with. */
		var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
		
		/* The following pattern is used to check if the entered e-mail address
		fits the user@domain format.  It also is used to separate the username
		from the domain. */
		var emailPat=/^(.+)@(.+)$/;

		/* The following string represents the pattern for matching all special
		characters.  We don't want to allow special characters in the address. 
		These characters include ( ) < > @ , ; : \ " . [ ] */
		var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";

		/* The following string represents the range of characters allowed in a 
		username or domainname.  It really states which chars aren't allowed.*/
		var validChars="\[^\\s" + specialChars + "\]";

		/* The following pattern applies if the "user" is a quoted string (in
		which case, there are no rules about which characters are allowed
		and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
		is a legal e-mail address. */
		var quotedUser="(\"[^\"]*\")";

		/* The following pattern applies for domains that are IP addresses,
		rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
		e-mail address. NOTE: The square brackets are required. */
		var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;

		/* The following string represents an atom (basically a series of non-special characters.) */
		var atom=validChars + '+';

		/* The following string represents one word in the typical username.
		For example, in john.doe@somewhere.com, john and doe are words.
		Basically, a word is either an atom or quoted string. */
		var word="(" + atom + "|" + quotedUser + ")";

		// The following pattern describes the structure of the user
		var userPat=new RegExp("^" + word + "(\\." + word + ")*$");

		/* The following pattern describes the structure of a normal symbolic
		domain, as opposed to ipDomainPat, shown above. */
		var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");

		/* Finally, let's start trying to figure out if the supplied address is valid. */

		/* Begin with the coarse pattern to simply break up user@domain into
		different pieces that are easy to analyze. */
		var matchArray=emailStr.match(emailPat);
		if (matchArray==null) 
		{
			/* Too many/few @'s or something; basically, this address doesn't
			even fit the general mould of a valid e-mail address. */
			//alert("Email address seems incorrect (check @ and .'s)");
			return false;
		}
		var user=matchArray[1];
		var domain=matchArray[2];
		// Start by checking that only basic ASCII characters are in the strings (0-127).
		for (i=0; i<user.length; i++) 
		{
			if (user.charCodeAt(i)>127)
			{
				//alert("Ths username contains invalid characters.");
				return false;
			}
		}
		for (i=0; i<domain.length; i++) 
		{
			if (domain.charCodeAt(i)>127) 
			{
				//alert("Ths domain name contains invalid characters.");
				return false;
			}
		}

		// See if "user" is valid 
		if (user.match(userPat)==null) 
		{
			// user is not valid
			//alert("The username doesn't seem to be valid.");
			return false;
		}
		/* if the e-mail address is at an IP address (as opposed to a symbolic
		host name) make sure the IP address is valid. */
		var IPArray=domain.match(ipDomainPat);
		if (IPArray!=null) 
		{
			// this is an IP address
			for (var i=1;i<=4;i++) 
			{
				if (IPArray[i]>255) 
				{
					//alert("Destination IP address is invalid!");
					return false;
				}
			}
			return true;
		}

		// Domain is symbolic name.  Check if it's valid.
		var atomPat=new RegExp("^" + atom + "$");
		var domArr=domain.split(".");
		var len=domArr.length;
		for (i=0;i<len;i++) 
		{
			if (domArr[i].search(atomPat)==-1) 
			{
				//alert("The domain name does not seem to be valid.");
				return false;
			}
		}

		/* domain name seems valid, but now make sure that it ends in a
		known top-level domain (like com, edu, gov) or a two-letter word,
		representing country (uk, nl), and that there's a hostname preceding 
		the domain or country. */
		if (checkTLD && domArr[domArr.length-1].length!=2 && domArr[domArr.length-1].search(knownDomsPat)==-1) 
		{
			//alert("The address must end in a well-known domain or two letter " + "country.");
			return false;
		}

		// Make sure there's a host name preceding the domain.
		if (len<2) 
		{
			//alert("This address is missing a hostname!");
			return false;
		}
		// If we've gotten this far, everything's valid!
		return true;
	}


//**************************************************************************************************************


	function openwindow()
	{
		var t;
		t = window.open("../help.htm","help","toolbar=no,menu=no,status=no,location=no,width=350,height=200,left=300,top=200,scroll=auto");
		t.focus();
	}

//**************************************************************************************************************