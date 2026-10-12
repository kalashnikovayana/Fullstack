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
  pauseOnHover: true, 
};

// ---------- Базовий слайдер ----------

class Slider {
  constructor(config) {
    this.config = config;
    this.slider = document.querySelector(config.selector);
    this.currentSlide = 0;
    this.intervalID = null;
    this.isPaused = !config.autoplay;
    this.isHovered = false;
  }

  init() {
    this.createSlides();

    if (this.config.showDots) {
      this.createDots();
    }

    if (this.config.showButtons) {
      this.createButtons();
    }

    this.showSlide(this.currentSlide);

    document.addEventListener('keydown', (event) => this.handleKeyDown(event));

    if (this.config.pauseOnHover) {
      this.addHoverPause();
    }

    if (this.config.autoplay) {
      this.startAutoplay();
    }
  }

  createSlides() {
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
  }

  createDots() {
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
  }

  createButtons() {
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
  }

  showSlide(index) {
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
  }

  handleNextClick() {
    this.currentSlide++;
    if (this.currentSlide >= this.slideElements.length) {
      this.currentSlide = 0;
    }
    this.showSlide(this.currentSlide);
  }

  handlePrevClick() {
    this.currentSlide--;
    if (this.currentSlide < 0) {
      this.currentSlide = this.slideElements.length - 1;
    }
    this.showSlide(this.currentSlide);
  }

  startAutoplay() {
    clearInterval(this.intervalID); 
    this.intervalID = setInterval(() => {
      this.handleNextClick();
    }, this.config.interval);
  }

  handlePauseClick() {
    if (this.isPaused) {
      this.pauseButton.textContent = 'Пауза';
      this.isPaused = false;

      if (!this.isHovered) {
        this.startAutoplay();
      }
    } else {
      clearInterval(this.intervalID);
      this.pauseButton.textContent = 'Старт';
      this.isPaused = true;
    }
  }

  handleKeyDown(event) {
    if (event.key === 'ArrowRight') {
      this.handleNextClick();
    } else if (event.key === 'ArrowLeft') {
      this.handlePrevClick();
    }
  }

  addHoverPause() {
    const canHover = window.matchMedia('(hover: hover)').matches;

    if (!canHover) return;

    this.slider.addEventListener('mouseenter', () => {
      this.isHovered = true;
      clearInterval(this.intervalID);
    });

    this.slider.addEventListener('mouseleave', () => {
      this.isHovered = false;

      if (!this.isPaused) {
        this.startAutoplay();
      }
    });
  }
}

// ---------- Слайдер зі свайпом (наслідує Slider) ----------

class SwipeSlider extends Slider {
  constructor(config) {
    super(config); 

    this.touchStartX = 0;
    this.mouseStartX = 0;
    this.isMouseDown = false;
  }

  init() {
    super.init();

    this.slidesContainer.addEventListener('touchstart', (event) => this.handleTouchStart(event));
    this.slidesContainer.addEventListener('touchend', (event) => this.handleTouchEnd(event));

    this.slidesContainer.addEventListener('mousedown', (event) => this.handleMouseDown(event));
    document.addEventListener('mouseup', (event) => this.handleMouseUp(event));
  }

  swipe(startX, endX) {
    if (endX < startX - this.config.swipeDistance) {
      this.handleNextClick();
    } else if (endX > startX + this.config.swipeDistance) {
      this.handlePrevClick();
    }
  }

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
  }

  handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;

    this.swipe(this.touchStartX, touchEndX);
  }

  handleMouseDown(event) {
    event.preventDefault(); 
    this.isMouseDown = true;
    this.mouseStartX = event.clientX;
  }

  handleMouseUp(event) {
    if (!this.isMouseDown) return;

    this.isMouseDown = false;
    this.swipe(this.mouseStartX, event.clientX);
  }
}

// ---------- Запуск ----------

const slider = new SwipeSlider(config);
slider.init();
