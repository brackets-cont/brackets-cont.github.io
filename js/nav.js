var menuButton = document.getElementById("hamburger");
var menu_left = document.getElementById("nav-lmenu");
var menu_right = document.getElementById("nav-rmenu");
menuButton.addEventListener("click", () => {
    menu_left.classList.toggle("show-menu");
    
});        
