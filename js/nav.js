var menuButton = document.getElementById("hamburger");
var menu_left = document.querySelector(".nav-left-menu");
var menu_right = document.querySelector(".nav-right-menu");
// menu_left.innerHTML += menu_right.innerHTML;
menuButton.addEventListener("click", () => {
    
    console.log(menu_left.classList);
    menu_left.classList.toggle("show-menu");
});        
