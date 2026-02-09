document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.getElementById("burger-menu");
    const menu = document.getElementById("menu");
    
    if (burgerMenu && menu) {
        burgerMenu.addEventListener("click", function () {
            console.log("Burger menu clicked");
            menu.classList.toggle("active");
        });
    }
});
