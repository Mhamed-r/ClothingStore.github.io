let sliderImages = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let current = 0;

function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = "none";
        dots[i].classList.remove("active");
    }
}
function currentSlide(num) {
    reset();
    sliderImages[num].style.display = "block";
    dots[num].classList.add("active");
    current = num;
}

function slideLeft() {
    reset();
    current = (current == 0) ? sliderImages.length - 1 : current - 1;
    sliderImages[current].style.display = "block";
    dots[current].classList.add("active");
}

function slideRight() {
    reset();
    current = (current == sliderImages.length - 1) ? 0 : current + 1;
    sliderImages[current].style.display = "block";
    dots[current].classList.add("active");
}
setInterval(slideRight, 4000);

