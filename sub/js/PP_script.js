document.addEventListener('DOMContentLoaded', () => {
  const mainProductImage = document.getElementById('mainProductImage');
  const selectedName = document.getElementById('selectedName');
  const thumbWindow = document.querySelector('.thumb-window');
  const thumbList = document.getElementById('thumbList');
  const thumbs = Array.from(document.querySelectorAll('.thumb-list li'));
  const prevThumbBtn = document.querySelector('.thumb-btn.prev');
  const nextThumbBtn = document.querySelector('.thumb-btn.next');
  const zodiacSelect = document.getElementById('zodiac');

  const minusBtn = document.querySelector('.minus');
  const plusBtn = document.querySelector('.plus');
  const qtyInput = document.querySelector('.qty-control input');
  const totalPrice = document.getElementById('totalPrice');
  const price = 28900;

  let currentIndex = 0;

  function formatPrice(value) {
    return value.toLocaleString('ko-KR') + '원';
  }

  function updateTotal() {
    let qty = Number(qtyInput.value);

    if (!Number.isFinite(qty) || qty < 1) {
      qty = 1;
      qtyInput.value = 1;
    }

    totalPrice.textContent = formatPrice(price * qty);
  }

  function centerActiveThumb() {
    const activeThumb = thumbs[currentIndex];
    if (!activeThumb || !thumbWindow || !thumbList) return;

    const windowWidth = thumbWindow.clientWidth;
    const listWidth = thumbList.scrollWidth;
    const activeCenter = activeThumb.offsetLeft + activeThumb.offsetWidth / 2;
    let moveX = activeCenter - windowWidth / 2;
    const maxMove = Math.max(0, listWidth - windowWidth);

    moveX = Math.max(0, Math.min(moveX, maxMove));
    thumbList.style.transform = `translateX(${-moveX}px)`;
  }

  function changeMainImage(index, syncSelect = true) {
    currentIndex = (index + thumbs.length) % thumbs.length;
    const selectedThumb = thumbs[currentIndex];
    const imgSrc = selectedThumb.dataset.img;
    const imgName = selectedThumb.dataset.name;

    mainProductImage.classList.add('is-changing');

    window.setTimeout(() => {
      mainProductImage.src = imgSrc;
      mainProductImage.alt = imgName;
      selectedName.textContent = imgName;
      mainProductImage.classList.remove('is-changing');
    }, 160);

    thumbs.forEach((thumb) => thumb.classList.remove('active'));
    selectedThumb.classList.add('active');

    if (syncSelect && zodiacSelect) {
      zodiacSelect.value = String(currentIndex);
    }

    centerActiveThumb();
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      changeMainImage(index);
    });
  });

  nextThumbBtn.addEventListener('click', () => {
    changeMainImage(currentIndex + 1);
  });

  prevThumbBtn.addEventListener('click', () => {
    changeMainImage(currentIndex - 1);
  });

  zodiacSelect.addEventListener('change', () => {
    if (zodiacSelect.value === '') return;
    changeMainImage(Number(zodiacSelect.value), false);
  });

  minusBtn.addEventListener('click', () => {
    const currentQty = Math.max(1, Number(qtyInput.value) || 1);
    qtyInput.value = Math.max(1, currentQty - 1);
    updateTotal();
  });

  plusBtn.addEventListener('click', () => {
    const currentQty = Math.max(1, Number(qtyInput.value) || 1);
    qtyInput.value = currentQty + 1;
    updateTotal();
  });

  qtyInput.addEventListener('input', updateTotal);
  window.addEventListener('resize', centerActiveThumb);

  updateTotal();
  centerActiveThumb();
});

// TOP 버튼: 스크롤 시 나타나고 클릭하면 페이지 최상단으로 이동
document.addEventListener('DOMContentLoaded', () => {
  const topButton = document.getElementById('topButton');

  if (!topButton) return;

  function toggleTopButton() {
    if (window.scrollY > 420) {
      topButton.classList.add('is-visible');
    } else {
      topButton.classList.remove('is-visible');
    }
  }

  topButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', toggleTopButton, { passive: true });
  toggleTopButton();
});
