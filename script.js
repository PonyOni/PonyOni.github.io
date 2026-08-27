
document.addEventListener('DOMContentLoaded', () => {
  // Плавный скролл для всех внутренних ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// Функция фильтрации работ из кнопок персонажей
function setFilter(authorKey) {
  const filterBtn = document.querySelector(`.filter[data-f="${authorKey}"]`);
  if (filterBtn) {
    filterBtn.click();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  let currentFilter = 'all';

  // 1. Фильтрация
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      currentFilter = btn.getAttribute('data-filter');
      
      items.forEach(item => {
        const matchesFilter = currentFilter === 'all' || item.classList.contains(currentFilter);
        
        if (matchesFilter) {
          item.classList.remove('hide-by-filter');
        } else {
          item.classList.add('hide-by-filter');
        }
      });
      
      // Сбрасываем показ скрытых при переключении фильтра
      checkLoadMoreVisibility();
    });
  });

  // 2. Кнопка "Показать ещё" (открывает скрытые карточки)
  loadMoreBtn.addEventListener('click', () => {
    const hiddenItems = document.querySelectorAll('.portfolio-item.hidden-item:not(.hide-by-filter)');
    
    // Открываем до 6 элементов (2 ряда)
    let count = 0;
    hiddenItems.forEach(item => {
      if (count < 6) {
        item.classList.remove('hidden-item');
        count++;
      }
    });

    checkLoadMoreVisibility();
  });

  function checkLoadMoreVisibility() {
    const remainingHidden = document.querySelectorAll('.portfolio-item.hidden-item:not(.hide-by-filter)');
    if (remainingHidden.length === 0) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }
  }

  // 3. Увеличение по клику (Lightbox)
  items.forEach(item => {
    item.addEventListener('click', () => {
      const fullImgSrc = item.getAttribute('data-full') || item.querySelector('img').src;
      lightboxImg.src = fullImgSrc;
      lightbox.style.display = 'flex';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
});
