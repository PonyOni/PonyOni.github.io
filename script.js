
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
  const filterBtns = document.querySelectorAll('.filter-btn:not(#load-more-btn)');
  const items = document.querySelectorAll('.portfolio-item');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  // 1. Фильтрация категорий
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const matches = filter === 'all' || item.classList.contains(filter);
        if (matches) {
          item.classList.remove('hide-by-filter');
        } else {
          item.classList.add('hide-by-filter');
        }
      });
      updateLoadMore();
    });
  });

  // 2. Кнопка "Показать ещё" (раскрывает скрытые карточки по 3 штуки / 1 ряд)
  loadMoreBtn.addEventListener('click', () => {
    const hiddenItems = document.querySelectorAll('.portfolio-item.hidden-item:not(.hide-by-filter)');
    let opened = 0;
    hiddenItems.forEach(item => {
      if (opened < 6) { // Показывает 2 следующих ряда (6 карточек)
        item.classList.remove('hidden-item');
        opened++;
      }
    });
    updateLoadMore();
  });

  function updateLoadMore() {
    const remaining = document.querySelectorAll('.portfolio-item.hidden-item:not(.hide-by-filter)');
    loadMoreBtn.style.display = remaining.length === 0 ? 'none' : 'inline-block';
  }

  // 3. Увеличение картинки при клике
  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = item.getAttribute('data-full') || img.src;
      lightbox.style.display = 'flex';
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });

  updateLoadMore();
});
