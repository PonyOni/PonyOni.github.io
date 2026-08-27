
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
