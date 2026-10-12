const config = {
  selector: '.slider',
  slides: [
    'https://picsum.photos/id/10/2500/1667',
    'https://picsum.photos/id/11/2500/1667',
    'https://picsum.photos/id/12/2500/1667',
    'https://picsum.photos/id/13/2500/1667',
    'https://picsum.photos/id/10/2500/1667',
    'https://picsum.photos/id/11/2500/1667',
    'https://picsum.photos/id/12/2500/1667',
    'https://picsum.photos/id/13/2500/1667',
  ],
  interval: 3000,
  autoplay: true,
  showDots: true,
  showButtons: true,
  swipeDistance: 30, 
};

// ---------- Базовий слайдер ----------

function Slider(config) {
  this.config = config;
  this.slider = document.querySelector(config.selector);
  this.currentSlide = 0;
  this.intervalID = null;
  this.isPaused = !config.autoplay;
}

Slider.prototype.init = function () {
  this.createSlides();

  if (this.config.showDots) {
    this.createDots();
  }

  if (this.config.showButtons) {
    this.createButtons();
  }

  this.showSlide(this.currentSlide);

  document.addEventListener('keydown', (event) => this.handleKeyDown(event));

  if (this.config.autoplay) {
    this.startAutoplay();
  }
};

Slider.prototype.createSlides = function () {
  this.slidesContainer = document.createElement('div');
  this.slidesContainer.classList.add('slides');

  this.config.slides.forEach((src, index) => {
    const slide = document.createElement('img');

    slide.src = src;
    slide.alt = 'Слайд ' + (index + 1);
    slide.classList.add('slide');

    this.slidesContainer.appendChild(slide);
  });

  this.slider.appendChild(this.slidesContainer);
  this.slideElements = this.slider.querySelectorAll('.slide');
};

Slider.prototype.createDots = function () {
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots');

  this.slideElements.forEach((slide, index) => {
    const dot = document.createElement('button');

    dot.classList.add('dot');

    dot.addEventListener('click', () => {
      this.currentSlide = index;
      this.showSlide(this.currentSlide);
    });

    dotsContainer.appendChild(dot);
  });

  this.slider.appendChild(dotsContainer);
  this.dots = this.slider.querySelectorAll('.dot');
};

Slider.prototype.createButtons = function () {
  const prevButton = document.createElement('button');
  prevButton.classList.add('prev-btn');
  prevButton.textContent = 'Назад';
  prevButton.addEventListener('click', () => this.handlePrevClick());

  const nextButton = document.createElement('button');
  nextButton.classList.add('next-btn');
  nextButton.textContent = 'Вперед';
  nextButton.addEventListener('click', () => this.handleNextClick());

  this.pauseButton = document.createElement('button');
  this.pauseButton.classList.add('pause-btn');
  this.pauseButton.textContent = this.isPaused ? 'Старт' : 'Пауза';
  this.pauseButton.addEventListener('click', () => this.handlePauseClick());

  this.slider.appendChild(prevButton);
  this.slider.appendChild(nextButton);
  this.slider.appendChild(this.pauseButton);
};

Slider.prototype.showSlide = function (index) {
  this.slideElements.forEach((slide) => {
    slide.style.display = 'none';
  });
  this.slideElements[index].style.display = 'block';

  if (this.config.showDots) {
    this.dots.forEach((dot) => {
      dot.classList.remove('active');
    });

    this.dots[index].classList.add('active');
  }
};

Slider.prototype.handleNextClick = function () {
  this.currentSlide++;
  if (this.currentSlide >= this.slideElements.length) {
    this.currentSlide = 0;
  }
  this.showSlide(this.currentSlide);
};

Slider.prototype.handlePrevClick = function () {
  this.currentSlide--;
  if (this.currentSlide < 0) {
    this.currentSlide = this.slideElements.length - 1;
  }
  this.showSlide(this.currentSlide);
};

Slider.prototype.startAutoplay = function () {
  clearInterval(this.intervalID); 
  this.intervalID = setInterval(() => {
    this.handleNextClick();
  }, this.config.interval);
};

Slider.prototype.handlePauseClick = function () {
  if (this.isPaused) {
    this.startAutoplay();
    this.pauseButton.textContent = 'Пауза';
    this.isPaused = false;
  } else {
    clearInterval(this.intervalID);
    this.pauseButton.textContent = 'Старт';
    this.isPaused = true;
  }
};

Slider.prototype.handleKeyDown = function (event) {
  if (event.key === 'ArrowRight') {
    this.handleNextClick();
  } else if (event.key === 'ArrowLeft') {
    this.handlePrevClick();
  }
};

// ---------- Слайдер зі свайпом (наслідує Slider) ----------

function SwipeSlider(config) {
  Slider.call(this, config); // беремо всі властивості з Slider

  this.touchStartX = 0;
  this.mouseStartX = 0;
  this.isMouseDown = false;
}

// беремо всі методи з Slider.prototype
SwipeSlider.prototype = Object.create(Slider.prototype);
SwipeSlider.prototype.constructor = SwipeSlider;

SwipeSlider.prototype.init = function () {
  Slider.prototype.init.call(this); 

  this.slidesContainer.addEventListener('touchstart', (event) => this.handleTouchStart(event));
  this.slidesContainer.addEventListener('touchend', (event) => this.handleTouchEnd(event));

  this.slidesContainer.addEventListener('mousedown', (event) => this.handleMouseDown(event));
  document.addEventListener('mouseup', (event) => this.handleMouseUp(event));
};

SwipeSlider.prototype.swipe = function (startX, endX) {
  if (endX < startX - this.config.swipeDistance) {
    this.handleNextClick();
  } else if (endX > startX + this.config.swipeDistance) {
    this.handlePrevClick();
  }
};

SwipeSlider.prototype.handleTouchStart = function (event) {
  this.touchStartX = event.touches[0].clientX;
};

SwipeSlider.prototype.handleTouchEnd = function (event) {
  const touchEndX = event.changedTouches[0].clientX;

  this.swipe(this.touchStartX, touchEndX);
};

SwipeSlider.prototype.handleMouseDown = function (event) {
  event.preventDefault(); 
  this.isMouseDown = true;
  this.mouseStartX = event.clientX;
};

SwipeSlider.prototype.handleMouseUp = function (event) {
  if (!this.isMouseDown) return;

  this.isMouseDown = false;
  this.swipe(this.mouseStartX, event.clientX);
};

// ---------- Запуск ----------

const slider = new SwipeSlider(config);
slider.init();
