export const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    const maxPages = 7;

    let startPage, endPage;

    if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const pagesToTheSide = Math.floor(maxPages / 2);
        startPage = Math.max(1, currentPage - pagesToTheSide);
        endPage = Math.min(totalPages, currentPage + pagesToTheSide);        
        if (endPage - startPage + 1 < maxPages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxPages - 1);
            }
        }        
        if (endPage - startPage + 1 < maxPages) {
            if (endPage === totalPages) {
                startPage = Math.max(1, endPage - maxPages + 1);
            }
        }
    }

    const pageNumbers = [...Array(endPage + 1).keys()].slice(startPage);
    
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination-container">
            <button
                onClick={() => handlePageClick(1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo; Anterior
            </button>
            <div className="page-numbers">
                {pageNumbers.map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`page-number-btn ${page === currentPage ? "active-page" : ""}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente &raquo;
            </button>
            <button
                onClick={() => handlePageClick(totalPages)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};