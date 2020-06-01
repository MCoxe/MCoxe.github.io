

var tabContent	= document.getElementsByClassName("tabcontent");

 function tabs(index){
   
   var i;

   for(i = 0; i < tabContent.length; i++) {

   	  tabContent[i].style.display = "none";
      }

    tabContent[index].style.display	= "block";
}

tabs(0);



