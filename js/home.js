$(function () {
  const $slides = $(".slide");
  const $prevBtn = $(".prev");
  const $nextBtn = $(".next");
  const $track = $("#sliderTrack");
  const $currentName = $("#currentName");
  const $dotsWrap = $("#sliderDots");

  const $popup = $("#diaryPopup");
  const $popupMainImg = $("#popupMainImg");
  const $popupTitle = $("#popupTitle");
  const $popupDesc = $("#popupDesc");
  const $popupThumbs = $("#popupThumbs");

  const diaryData = [
    {
      title: "Aries Diary",
      desc: "양자리 캐릭터와 함께하는 용감하고 활기찬 만년 다이어리입니다.",
      cover: "./images/Diary_1.png",
      img: "./images/inner_page_1.png"
    },
    {
      title: "Taurus Diary",
      desc: "황소자리 캐릭터와 함께하는 차분하고 따뜻한 만년 다이어리입니다.",
      cover: "./images/Diary_2.png",
      img: "./images/inner_page_2.png"
    },
    {
      title: "Gemini Diary",
      desc: "쌍둥이자리 캐릭터와 함께하는 발랄하고 재치 있는 만년 다이어리입니다.",
      cover: "./images/Diary_3.png",
      img: "./images/inner_page_3.png"
    },
    {
      title: "Cancer Diary",
      desc: "게자리 캐릭터와 함께하는 다정하고 포근한 만년 다이어리입니다.",
      cover: "./images/Diary_4.png",
      img: "./images/inner_page_4.png"
    },
    {
      title: "Leo Diary",
      desc: "사자자리 캐릭터와 함께하는 자신감 넘치는 만년 다이어리입니다.",
      cover: "./images/Diary_5.png",
      img: "./images/inner_page_5.png"
    },
    {
      title: "Virgo Diary",
      desc: "처녀자리 캐릭터와 함께하는 섬세하고 깔끔한 만년 다이어리입니다.",
      cover: "./images/Diary_6.png",
      img: "./images/inner_page_6.png"
    },
    {
      title: "Libra Diary",
      desc: "천칭자리 캐릭터와 함께하는 균형 있고 사랑스러운 만년 다이어리입니다.",
      cover: "./images/Diary_7.png",
      img: "./images/inner_page_7.png"
    },
    {
      title: "Scorpio Diary",
      desc: "전갈자리 캐릭터와 함께하는 신비롭고 매력적인 만년 다이어리입니다.",
      cover: "./images/Diary_8.png",
      img: "./images/inner_page_8.png"
    },
    {
      title: "Sagittarius Diary",
      desc: "사수자리 캐릭터와 함께하는 자유롭고 모험적인 만년 다이어리입니다.",
      cover: "./images/Diary_9.png",
      img: "./images/inner_page_9.png"
    },
    {
      title: "Capricorn Diary",
      desc: "염소자리 캐릭터와 함께하는 성실하고 단단한 만년 다이어리입니다.",
      cover: "./images/Diary_10.png",
      img: "./images/inner_page_10.png"
    },
    {
      title: "Aquarius Diary",
      desc: "물병자리 캐릭터와 함께하는 독창적이고 특별한 만년 다이어리입니다.",
      cover: "./images/Diary_11.png",
      img: "./images/inner_page_11.png"
    },
    {
      title: "Pisces Diary",
      desc: "물고기자리 캐릭터와 함께하는 감성적이고 몽환적인 만년 다이어리입니다.",
      cover: "./images/Diary_12.png",
      img: "./images/inner_page_12.png"
    }
  ];

  let currentIndex = 0;

  // 프리뷰 슬라이드 자동 스와이프 설정
  let autoSwipeTimer = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;
  const autoSwipeDelay = 3000;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % diaryData.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + diaryData.length) % diaryData.length;
    updateSlider();
  }

  function startAutoSwipe() {
    if (!$slides.length || autoSwipeTimer || $popup.hasClass("active")) return;
    autoSwipeTimer = setInterval(nextSlide, autoSwipeDelay);
  }

  function stopAutoSwipe() {
    if (!autoSwipeTimer) return;
    clearInterval(autoSwipeTimer);
    autoSwipeTimer = null;
  }

  function restartAutoSwipe() {
    stopAutoSwipe();
    startAutoSwipe();
  }

  function closePopup() {
    $popup.removeClass("active");
    startAutoSwipe();
  }

  if ($slides.length) {
    // 도트 초기화 후 생성
    $dotsWrap.empty();

    $.each(diaryData, function (index) {
      const $dot = $("<button type='button'></button>");

      $dot.on("click", function () {
        currentIndex = index;
        updateSlider();
        restartAutoSwipe();
      });

      $dotsWrap.append($dot);
    });
  }

  // 팝업 썸네일 12개 생성
  $popupThumbs.empty();

  $.each(diaryData, function (index, item) {
    $popupThumbs.append(`
      <li data-index="${index}">
        <img src="${item.cover}" alt="${item.title}">
      </li>
    `);
  });

  function getSlideIndex($slide) {
    const dataIndex = Number($slide.attr("data-index"));
    return Number.isNaN(dataIndex) ? $slide.index() : dataIndex;
  }

  function updateSlider() {
    if (!$slides.length) return;

    const $wrap = $(".slider-track-wrap");
    const slideWidth = $slides.eq(0).outerWidth();
    const wrapWidth = $wrap.outerWidth();

    $slides.removeClass("active");
    $dotsWrap.find("button").removeClass("active");

    $slides.eq(currentIndex).addClass("active");
    $dotsWrap.find("button").eq(currentIndex).addClass("active");
    $currentName.text(diaryData[currentIndex].title.replace(" Diary", ""));

    const offset = currentIndex * slideWidth - wrapWidth / 2 + slideWidth / 2;
    $track.css("transform", `translateX(${-offset}px)`);
  }

  function openPopup(index) {
    const item = diaryData[index];
    if (!item) return;

    stopAutoSwipe();

    $popupMainImg.attr("src", item.img);
    $popupTitle.text(item.title);
    $popupDesc.text(item.desc);

    $popupThumbs.find("li").removeClass("active");
    $popupThumbs.find("li").eq(index).addClass("active");

    $popup.addClass("active");
  }

  $prevBtn.on("click", function () {
    prevSlide();
    restartAutoSwipe();
  });

  $nextBtn.on("click", function () {
    nextSlide();
    restartAutoSwipe();
  });

  $slides.on("click", function () {
    if (isSwiping) return;

    currentIndex = getSlideIndex($(this));
    updateSlider();
    openPopup(currentIndex);
  });

  $popupThumbs.on("click", "li", function () {
    const index = Number($(this).attr("data-index"));
    openPopup(index);
  });

  $("#popupClose").on("click", function () {
    closePopup();
  });

  $popup.on("click", function (e) {
    if ($(e.target).is($popup)) {
      closePopup();
    }
  });

  $(window).on("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup();
    }
  });

  // 마우스를 올리면 자동 전환을 잠시 멈추고, 벗어나면 다시 자동 재생
  $(".diary-slider").on("mouseenter focusin", function () {
    stopAutoSwipe();
  });

  $(".diary-slider").on("mouseleave focusout", function () {
    startAutoSwipe();
  });

  // 모바일에서 손가락으로 좌우 스와이프 가능
  $(".slider-track-wrap").on("touchstart", function (e) {
    const touch = e.originalEvent.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    stopAutoSwipe();
  });

  $(".slider-track-wrap").on("touchend", function (e) {
    const touch = e.originalEvent.changedTouches[0];
    const moveX = touch.clientX - touchStartX;
    const moveY = touch.clientY - touchStartY;

    if (Math.abs(moveX) > 50 && Math.abs(moveX) > Math.abs(moveY)) {
      isSwiping = true;

      if (moveX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      setTimeout(function () {
        isSwiping = false;
      }, 250);
    }

    restartAutoSwipe();
  });

  // 다른 탭을 보고 있을 때는 자동 전환 정지
  $(document).on("visibilitychange", function () {
    if (document.hidden) {
      stopAutoSwipe();
    } else {
      startAutoSwipe();
    }
  });

  $(window).on("load resize", function () {
    updateSlider();
  });

  updateSlider();
  startAutoSwipe();
});

// Top button
$(function () {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $(".top-btn").addClass("show");
    } else {
      $(".top-btn").removeClass("show");
    }
  });

  $(".top-btn").on("click", function () {
    $("html, body").stop().animate({ scrollTop: 0 }, 700, "swing");
  });
});

// GNB 이동 효과
$(function () {
  $(".gnb a, .logo a, .banner_bt a, .footer-logo, .footer-menu a").on("click", function (e) {
    const target = $(this).attr("href") || $(this).parent("a").attr("href");

    if (!target || target === "#" || !target.startsWith("#") || $(target).length === 0) {
      return;
    }

    e.preventDefault();

    const targetPos = $(target).offset().top;

    $("html, body").stop().animate({ scrollTop: targetPos }, 1000, "swing");
  });
});


// Mobile menu
$(function () {
  const $menuBtn = $(".mobile-menu-btn");
  const $gnbWrap = $("#gnb_wrap");

  $menuBtn.on("click", function () {
    $(this).toggleClass("active");
    $gnbWrap.toggleClass("open");
  });

  $(".gnb a, .logo a, .banner_bt a").on("click", function () {
    $menuBtn.removeClass("active");
    $gnbWrap.removeClass("open");
  });

  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      $menuBtn.removeClass("active");
      $gnbWrap.removeClass("open");
    }
  });
});


if (window.AOS) {
  AOS.init({
    duration: 1100,
    easing: "ease-in-out",
    once: true,
    offset: 100
  });
}