var menuButton = document.getElementById("hamburger");
var menu_left = document.querySelector(".nav-left-menu");
var menu_right = document.querySelector(".nav-right-menu");
menuButton.addEventListener("click", () => {
    console.log(menu_left.classList);
    menu_left.classList.toggle("show-menu");
    
});        
