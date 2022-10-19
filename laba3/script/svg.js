function main() {
    let burger = document.querySelector(".burger");
    burger.addEventListener('click', hoverOn)
    
    function hoverOn() {
        let burgerLines = document.querySelectorAll(".burger__line");
        for (let burgerLine of burgerLines) {
            burgerLine.classList.toggle("hover-on");
        }
    }

    let button = document.querySelector(".light__button");
    button.addEventListener('click', light);

    function light() {
        let lamp = document.querySelector(".light__lamp");
        lamp.classList.toggle("light-on");
    }
}

main();