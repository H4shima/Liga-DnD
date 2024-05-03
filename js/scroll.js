$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 100) {
    $("#toTop").fadeIn();
  } else {
    $("#toTop").fadeOut();
  }
});

$(document).on("click", "#toTop", function () {
  $("html, body").animate({ scrollTop: 0 }, 50);
});

(function ($) {
  $.fn.pandappSlider = function (options) {
    return this.each(function () {
      const slider = new PandappSlider(this, options);
      slider.init();
    });
  };

  class PandappSlider {
    constructor(element, options) {
      this.sliderContainer = $(element);
      this.slidesWrapper = this.sliderContainer.find(".pandapp-wrapper");
      this.slides = this.slidesWrapper.find(".pandapp-slide");
      this.totalSlides = this.slides.length;
      this.currentSlide = 0;
      this.autoPlayInterval = null;
      this.pagination = null;
      this.prevButton = null;
      this.nextButton = null;

      this.options = $.extend(
        {
          autoPlay: true,
          autoPlayInterval: 1500,
          resolutions: [{ width: 0, slidesToShow: 1 }],
          transitionEffect: "slide",
          paginationEnabled: true,
          navigationEnabled: true,
          paginationCustomHTML: null,
          navigationCustomHTML: null
        },
        options
      );
    }

    init() {
      if (
        this.options.paginationEnabled &&
        !this.sliderContainer.find(".pandapp-pagination").length
      ) {
        this.addPagination();
      }

      if (
        this.options.navigationEnabled &&
        !this.sliderContainer.find(".pandapp-button-prev").length &&
        !this.sliderContainer.find(".pandapp-button-next").length
      ) {
        this.addNavigation();
      }

      if (this.options.autoPlay) {
        this.startAutoPlay();
        this.sliderContainer.on("mouseenter", this.pauseAutoPlay.bind(this));
        this.sliderContainer.on("mouseleave", this.startAutoPlay.bind(this));
      }

      this.handleResponsive();
      $(window).on("resize", this.handleResponsive.bind(this));
    }

    addNavigation() {
      if (this.options.navigationCustomHTML) {
        this.sliderContainer.append(this.options.navigationCustomHTML);
      } else {
        this.prevButton = $("<div class='pandapp-button-prev'>&#10094;</div>");
        this.prevButton.on("click", () => this.prevSlide());
        this.sliderContainer.append(this.prevButton);

        this.nextButton = $("<div class='pandapp-button-next'>&#10095;</div>");
        this.nextButton.on("click", () => this.nextSlide());
        this.sliderContainer.append(this.nextButton);
      }
    }

    addPagination() {
      if (this.options.paginationCustomHTML) {
        this.sliderContainer.append(this.options.paginationCustomHTML);
      } else {
        this.pagination = $("<div class='pandapp-pagination'></div>");
        for (let i = 0; i < this.totalSlides; i++) {
          const bullet = $("<div class='pandapp-pagination-bullet'></div>");
          bullet.on("click", () => this.goToSlide(i));
          this.pagination.append(bullet);
        }
        this.sliderContainer.append(this.pagination);
        this.updatePagination();
      }
    }

    updatePagination() {
      if (this.pagination) {
        const bullets = this.pagination.find(".pandapp-pagination-bullet");
        bullets.each((index, bullet) => {
          if (index === this.currentSlide) {
            $(bullet).addClass("pandapp-pagination-bullet-active");
          } else {
            $(bullet).removeClass("pandapp-pagination-bullet-active");
          }
        });
      }
    }

    goToSlide(slideIndex) {
      this.currentSlide = slideIndex;
      this.showSlide();
    }

    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.showSlide();
    }

    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      this.showSlide();
    }

    showSlide() {
      switch (this.options.transitionEffect) {
        case "fade":
          this.slides
            .removeClass("pandapp-slide-active")
            .eq(this.currentSlide)
            .addClass("pandapp-slide-active");
          break;
        case "slide":
          this.slidesWrapper.css(
            "transform",
            `translateX(-${this.currentSlide * 100}%)`
          );
          break;
      }
      this.updatePagination();
    }

    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, this.options.autoPlayInterval);
    }

    pauseAutoPlay() {
      clearInterval(this.autoPlayInterval);
    }

    handleResponsive() {
      const screenWidth = $(window).width();
      let slidesToShow = 1;
    
      for (const resolution of this.options.resolutions) {
        if (screenWidth >= resolution.width) {
          slidesToShow = resolution.slidesToShow;
    
          // Обновление пагинации и навигации при изменении размеров окна
          if (this.pagination) {
            this.pagination.empty();
            for (let i = 0; i < this.totalSlides; i++) {
              const bullet = $("<div class='pandapp-pagination-bullet'></div>");
              bullet.on("click", () => this.goToSlide(i));
              this.pagination.append(bullet);
            }
            this.updatePagination();
          }
    
          if (this.options.navigationEnabled) {
            this.addNavigation();
          }
        } else {
          break;
        }
      }
    
      this.slidesWrapper.css(
        "grid-template-columns",
        `repeat(${slidesToShow}, 1fr)`
      );
    }
  }
})(jQuery);

$(document).ready(function () {
  $("#mySlider").pandappSlider({
    autoPlay: true,
    autoPlayInterval: 5000,
    resolutions: [{ width: 0, slidesToShow: 1 }],
    paginationEnabled: true,
    navigationEnabled: true
  });
});
