import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import type { TPaginationAction } from 'ts/pagination';

import './Pagination.scss';

interface IPaginationProps {
    totalPosts: number;
    postsPerPage: number;
    currentPage: number;
    changePage: (type: TPaginationAction, pageNum?: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
    totalPosts,
    postsPerPage,
    changePage,
    currentPage
}) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <IoIosArrowBack
                    className="pagination__arrow"
                    onClick={() => changePage('dec')}
                />
            )}
            <ul className="pagination__pages-list">
                {pages.length
                    ? pages.map((pageNum) => (
                          <li
                              style={{
                                  borderColor:
                                      currentPage === pageNum
                                          ? '#1298d2'
                                          : 'transparent'
                              }}
                              key={pageNum}
                              className="pagination__pages-item"
                              onClick={() => changePage('exact', pageNum)}
                          >
                              {pageNum}
                          </li>
                      ))
                    : null}
            </ul>
            {totalPages > 1 && currentPage !== pages.length && (
                <IoIosArrowForward
                    className="pagination__arrow"
                    onClick={() => changePage('inc')}
                />
            )}
        </div>
    );
};

export default Pagination;
