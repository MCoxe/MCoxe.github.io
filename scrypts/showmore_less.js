



document.getElementById("btn-read").addEventListener("click", function() {

   let showText = document.getElementById("btn-read");
   let text = document.getElementById("more");

	if(text.style.display === "none") {
		showText.innerHTML = "Show less...";
		text.style.display = "block";
    	

	}
	else {
       text.style.display = "none";
       showText.innerHTML = "Show more...";
	}
});


/*let showText = document.getElementById("btn-read");
let text = document.getElementById("more");

showText.addEventListener("click", function() {
	if(text.style.display === "none") {
		showText.innerHTML = "Show less...";
		text.style.display = "block";
    	

	}
	else {
       text.style.display = "none";
       showText.innerHTML = "Show more...";
	}
});*/

/*function showMore(){
	if(text.style.display === "none") {
		showText.innerHTML = "Show less...";
		text.style.display = "block";
    	

	}
	else {
       text.style.display = "none";
       showText.innerHTML = "Show more...";
	}

}*/