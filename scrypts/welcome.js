



const welcomeText = document.querySelector(".welcomeVisitor__text");

if(typeof Cookies.get("name")=="undefined") {
	welcomeText.textContent = `Welcome back to MuxiTravel, ${Cookies.get("name")}!`;
	
}

else {
	let name = prompt("Please enter your name for customization purposes:");
	
	if(name !== null && name !== "") {
		Cookies.set("name", name, {expires: 7});
		welcomeText.textContent= `Welcome to MuxiTravel, ${name}`;
	}
	
	else {
		welcomeText.textContent = "Welcome to our website";
	}
}


