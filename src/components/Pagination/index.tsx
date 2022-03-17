import React, { useState, useEffect, useCallback } from 'react';
import ReactPaginate from "react-paginate";

import "./Pagination.scss";

interface PaginateProps {
  /**
   * valor que muestra el input
   */
  itemsPerPage?: number
  /**
   * Permite establecer si se muestra o no el select de cuantas páginas mostrar, (default: true)
   */
  showSelect?: boolean
  /**
   * arreglo de los datos
   */
  data: Array<string>
  /**
  * call back cada vez que el usuario cambia de página
  */
  onChange?: (options: any) => void
}


export const Paginate = ({ data, itemsPerPage = 10, onChange }: PaginateProps) => {
  const [pageCount, setPageCount] = useState(3);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const onChangeHandler = useCallback(
    ({ selected }) => {
      if (selected + 1 < totalPages && selected + 1 === pageCount) {
        setPageCount(selected + 2);
      }
      onChange && onChange({ pagesVisited: selected * itemsPerPage });
    },
    [itemsPerPage, onChange, pageCount, totalPages]
  );

  useEffect(() => {
    if (totalPages > 1) {
      setPageCount(2);
    }
  }, [totalPages]);

  return (
    <>
      {pageCount > 0 && (
        <div style={{ display: 'flex' }}>
          <div className="flex-item flex-item--autoSize mr-0">
            <div className="commentBox">
              <ReactPaginate
                previousLabel={'←'}
                nextLabel={'→'}
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={onChangeHandler}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'elemento'}
                breakLabel={<span className="gap">...</span>}
              />
            </div>
          </div>

        </div>
      )}
    </>
  );
};
