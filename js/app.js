const elements = document.querySelectorAll('.fade-in-element');
const options = {
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, options);

// Add a 500ms delay before starting the observer
setTimeout(() => {
  elements.forEach(element => observer.observe(element));
}, 500);

const searchButton = document.querySelector('.search-bar button');
const searchInput = document.querySelector('.search-bar input');
const productItems = document.querySelectorAll('.product-item');

searchButton.addEventListener('click', function () {
  const filterCategory = searchInput.value.toLowerCase();

  productItems.forEach(function (item) {
    const category = item.querySelector('h4').textContent.toLowerCase();
    if (category.indexOf(filterCategory) > -1) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});
