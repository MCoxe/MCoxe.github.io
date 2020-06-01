

let slide = [];

    slide = ["images/slideshow/Calandula.jpg", "images/slideshow/pria.jpg", "images/slideshow/pungo.jpg",
            "images/slideshow/varios.jpg",];

let pictureCounter = 0;

let slideElement = document.querySelector(".slideshow-image");

function changePicture() {
	// if past the last image, start back at first  
	if(pictureCounter === slide.length) {
		pictureCounter = 0;
	}
	
	slideElement.src = slide[pictureCounter];
	pictureCounter++;
	
}

// if the banner image element exists
if(slideElement) {
	// call the changePicture function every 3 seconds
	window.setInterval(changePicture, 3000);
	
}