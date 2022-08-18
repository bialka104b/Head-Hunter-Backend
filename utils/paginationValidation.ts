export const paginationValidation = (currentPage: number, pages: number) => {
	if (!currentPage || currentPage < 1) {
		currentPage = 1;
	}

	if (currentPage > pages) {
		currentPage = pages;
	}

	return currentPage;
};
