import {useState} from "react";

const ITEMS_PER_PAGE = 8;

interface Params<T> {
    items: T[];
}
export function usePagination<T>({items}: Params<T> ) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentItems = items.slice(startIndex, endIndex);
    if (currentItems.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return {currentItems, totalPages, currentPage, handlePageChange}
}