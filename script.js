let selectColorsRightImg = document.querySelector('.select_colors_right img');

let selectColors = new Swiper(".select_colors_swiper .swiper", {
    autoplay: {
      delay: 2000,
    },
    pagination: {
      el: ".select_colors_tabs",
      clickable: true,
      renderBullet: function (index, className) {
        return `
          <div class="select_colors_tabs_item ${className} index-${index + 1}">
              <div class="select_colors_tabs_item_body">
                  <img src="images/color_ball-2.png" alt="color ball">
              </div>
          </div>
        `;
      },
    },
    on: {
      slideChange: (swiper) => {
        let activeSlide = swiper.slides[swiper.activeIndex];

        document.querySelectorAll('.select_colors_right_item').forEach((item) => {
          item.classList.remove('active');
        })

        document.getElementById(activeSlide.dataset.right_img).classList.add('active');

        //selectColorsRightImg.src = activeSlide.dataset.right_img;
      }
    }
});

let selectColorsPauseButton = document.querySelector('.pause_selec_colors_swiper');

selectColorsPauseButton.addEventListener('click', function() {
  if(this.classList.contains('pause')) {
    this.classList.remove('pause');
    this.classList.add('play');
    this.querySelector('.play').style.display = 'none';
    this.querySelector('.pause').style.display = 'inline';
    selectColors.autoplay.start();
  } else {
    this.querySelector('.pause').style.display = 'none';
    this.querySelector('.play').style.display = 'inline';
    this.classList.remove('play');
    this.classList.add('pause');
    selectColors.autoplay.stop();
  }
})