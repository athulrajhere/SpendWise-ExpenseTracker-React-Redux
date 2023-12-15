import React, { useState } from "react";
import "./pagination.scss";

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
  pageCount,
  pageSize,
  setPageIndex,
  canPreviousPage,
  canNextPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log(itemsPerPage, totalItems, currentPage, onPageChange);

  const paginationButtons = [];
  for (let i = 0; i < pageCount; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={`btn btn-pagination ${
          currentPage - 1 == i ? "pagination-current" : ""
        }`}
        onClick={() => setPageIndex(i)}
      >
        <strong>{i + 1}</strong>
      </button>
    );
  }

  const renderPaginationDots = () => {
    return (
      <>
        <span key="start" style={{ padding: "0px 4px" }}>
          ...
        </span>
      </>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 5) {
      return paginationButtons.map((u) => <span key={u}>{u}</span>);
    }

    if (currentPage <= 3) {
      return (
        <>
          {paginationButtons.slice(0, 3).map((u, index) => (
            <span key={index}>{u}</span>
          ))}
          {renderPaginationDots()}
          <span>{paginationButtons.at(-1)}</span>
        </>
      );
    }

    if (currentPage >= totalPages - 2) {
      return (
        <>
          <button
            className="btn btn-pagination"
            onClick={() => onPageChange(1)}
          >
            <strong>1</strong>
          </button>
          {renderPaginationDots()}
          {paginationButtons.slice(-3).map((u, ind) => (
            <span key={ind}>{u}</span>
          ))}
        </>
      );
    }

    return (
      <>
        <button className="btn btn-pagination" onClick={() => onPageChange(1)}>
          <strong>1</strong>
        </button>
        {renderPaginationDots()}
        <span>{paginationButtons.at(currentPage - 1 - 1)}</span>
        <span className="pagination-current">
          {paginationButtons.at(currentPage - 1)}
        </span>
        <span>{paginationButtons.at(currentPage - 1 + 1)}</span>
        {renderPaginationDots()}
        <span>{paginationButtons.at(-1)}</span>
      </>
    );
  };

  const showAll = () => {
    return (
      <select
        // value={table.getState().pagination.pageSize}
        className="btn btn-show-all"
        onChange={(e) => {
          if (e.target.value === "All") {
            pageSize(Number(totalItems));
          } else {
            pageSize(Number(e.target.value));
          }
        }}
      >
        {[10, 20, 30, 40, 50, "All"].map((pageSize, ind) => (
          <option key={ind} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="pagination-container">
      <div className="pagination-left">{showAll()}</div>
      <div className="pagination-center">
        <button
          className="btn btn-pagination"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPreviousPage}
        >
          &lt;
        </button>
        {renderPagination()}
        <button
          className="btn btn-pagination"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNextPage}
        >
          &gt;
        </button>
      </div>
      <div className="pagination-right"></div>
    </div>
  );
};

export default Pagination;
