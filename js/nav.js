var menuButton = document.getElementById("hamburger");
var menu_left = document.querySelector(".nav-left-menu");
var menu_right = document.querySelector(".nav-right-menu");
var menu = menu_left.cloneNode(true);
click = false;
// menu_left.innerHTML += menu_right.innerHTML;
menuButton.addEventListener("click", () => {
    click = !click;
    console.log(menu_left.classList);
    if(click){
        menu_left.innerHTML += menu_right.innerHTML;
    }
    else{
        menu_left.innerHTML = menu.innerHTML;
    }
    menu_left.classList.toggle("show-menu");
});       
