// Hide/show products based on selected filters
function filterProducts(selectedFilters) {
	const products = document.querySelectorAll('.catalog-item');

	products.forEach(function (product) {
		const filters = product.getAttribute('data-filter').split(' ');

		if (selectedFilters.length === 0) {
			// Show all products if no filters are selected
			product.style.display = 'block';
		} else {
			// Show the product only if all selected filters match
			let match = true;

			selectedFilters.forEach(function (filter) {
				const filterCount = filters.filter(function (f) {
					return f === filter;
				}).length;

				if (filterCount === 0) {
					match = false;
				}
			});

			if (match) {
				product.style.display = 'block';
			} else {
				product.style.display = 'none';
			}
		}
	});
}


$(document).ready(function () {
	$('.button_filter').click(function () {
		$('#filters').toggle();
	});
});