export function toggleForm() {
  const searchBtn = document.getElementById('search-form');
  const toggleBtn = document.getElementById('search-btn');

  toggleBtn.addEventListener('click', () => {
    searchBtn.classList.add('search-form-active');
  });
}
toggleForm();
