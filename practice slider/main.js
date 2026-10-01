const slides = [
  "https://picsum.photos/id/10/2500/1667",
  "https://picsum.photos/id/11/2500/1667",
  "https://picsum.photos/id/12/2500/1667",
  "https://picsum.photos/id/13/2500/1667",
  "https://picsum.photos/id/10/2500/1667",
  "https://picsum.photos/id/11/2500/1667",
  "https://picsum.photos/id/12/2500/1667",
  "https://picsum.photos/id/13/2500/1667",
];

const slidesContainer = document.querySelector('.slides');

slides.forEach((src) => {
    const slide = document.createElement('img');

    slide.src = src;
    slide.classList.add('slide');

    slidesContainer.appendChild(slide);
});

const slideElements = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');


let currentSlide = 0;

slideElements.forEach((slide, index) => {
    const dot = document.createElement('button');

    dot.classList.add('dot');

    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });

    dotsContainer.appendChild(dot);
}); 

function showSlide(index) {
    slideElements.forEach((slide) => {
        slide.style.display = 'none';
    });
    slideElements[index].style.display = 'block';

    const dots = document.querySelectorAll('.dot');

    dots.forEach((dot) => {
        dot.classList.remove('active');
    });

    dots[index].classList.add('active');
}

showSlide(currentSlide);

const handleNextClick = () => {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
};

nextButton.addEventListener('click', handleNextClick);

const handlePrevClick = () => {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
};

prevButton.addEventListener('click', handlePrevClick);

let intervalID = setInterval(() => {
    handleNextClick();
}, 3000);

// clearInterval(intervalID);

const pauseButton = document.getElementById('pauseBtn');

let isPaused = false;

const handlePauseClick = () => {
    if (isPaused) {
        intervalID = setInterval(handleNextClick, 3000);
        pauseButton.textContent = 'Pause';
        isPaused = false;
    } else {
        clearInterval(intervalID);
        pauseButton.textContent = 'Play';
        isPaused = true;
    }
};

pauseButton.addEventListener('click', handlePauseClick);

const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
        handleNextClick();
    } else if (event.key === 'ArrowLeft') {
        handlePrevClick();
    }
};

document.addEventListener('keydown', handleKeyDown);

let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
};

const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;

    if (touchEndX < touchStartX) {
        handleNextClick();
    } else if (touchEndX > touchStartX) {
        handlePrevClick();
    }
};

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);

let mouseStartX = 0;
let mouseEndX = 0;
let isMouseDown = false;

const handleMouseDown = (event) => {
    isMouseDown = true;
    mouseStartX = event.clientX;
};

const handleMouseUp = (event) => {
    if (!isMouseDown) return;

    mouseEndX = event.clientX;
    isMouseDown = false;

    if (mouseEndX < mouseStartX) {
        handleNextClick();
    } else if (mouseEndX > mouseStartX) {
        handlePrevClick();
    }
};

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);