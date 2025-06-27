import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import Pagination from "../pagination/Pagination";
import "./basicTable.scss";
import { RiExpandUpDownLine, RiSortAsc, RiSortDesc } from "react-icons/ri";
import { useSelector } from "react-redux";

interface BasicTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowSelect: (selectedIds: string[]) => void;
}

interface DashboardState {
  startDate: string;
  endDate: string;
  [key: string]: any;
}

const BasicTable = <T extends { _id: string; category: { title: string } }>({ 
  data, 
  columns, 
  onRowSelect 
}: BasicTableProps<T>) => {
  const { startDate: globalStartDate, endDate: globalEndDate } = useSelector(
    (state: DashboardState) => state.dashboard
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [field, setField] = useState<string>();
  const [searchValue, setSearchValue] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [category, setCategory] = useState("");
  const [numberOfOptionsSelected, setNumberOfOptionsSelected] = useState<Record<string, boolean>>();
  const [startDate, setStartDate] = useState(globalStartDate);
  const [endDate, setEndDate] = useState(globalEndDate);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(45000);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    columns,
    data,
    enableFilters: true,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnFilters,
      rowSelection: rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    autoResetPage: false,
  });

  const handlePageChange = (number: number) => {
    table.setPageIndex(number - 1);
  };

  const filteringColumn = useMemo(() => {
    return table.getAllColumns().filter((col) => col.id === "title")[0];
  }, [field, table]);

  const newFilter = table
    .getAllColumns()
    .filter((col) => col.id === "category_title")[0];

  const amountFilter = table
    .getAllColumns()
    .filter((col) => col.id === "amount")[0];

  useEffect(() => {
    if (filteringColumn) {
      filteringColumn.setFilterValue(searchValue);
    }
    if (newFilter && numberOfOptionsSelected !== undefined) {
      newFilter.setFilterValue(Object.keys(numberOfOptionsSelected));

      if (amountFilter) {
        amountFilter.setFilterValue([minVal, maxVal]);
      }
    }
  }, [
    filteringColumn,
    searchValue,
    numberOfOptionsSelected,
    minVal,
    maxVal,
    startDate,
    endDate,
  ]);
  
  useEffect(() => {
    let selectedIds: string[] = [];
    if (Object.keys(rowSelection).length > 0) {
      selectedIds = table.getSelectedRowModel().flatRows.map((row) => {
        return row.original._id;
      });
    }
    onRowSelect(selectedIds);
  }, [rowSelection, table, onRowSelect]);

  data
    .map((value) => {
      return { value: value.category.title, label: value.category.title };
    })
    .reduce(
      (acc, curr) => {
        if (acc[1].indexOf(curr.label) === -1) {
          acc[1].push(curr.label);
          acc[0].push(curr);
        }
        return acc;
      },
      [[], []]
    )[0]
    .sort();

  return (
    <>
      <div className="responsive-table-wrapper">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={header.column.columnDef.className}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="theader-container"
                        style={{ cursor: "pointer" }}
                      >
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                        {header.column.columnDef.header !== "Actions" && (
                          <div className="theader-icon">
                            {
                              {
                                asc: <RiSortAsc />,
                                desc: <RiSortDesc />,
                                default: <RiExpandUpDownLine />,
                              }[header.column.getIsSorted() || "default"]
                            }
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td 
                    key={cell.id}
                    className={cell.column.columnDef.className}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          itemsPerPage={table.getState().pagination.pageSize}
          totalItems={data.length}
          currentPage={table.getState().pagination.pageIndex + 1}
          onPageChange={handlePageChange}
          pageCount={table.getPageCount()}
          pageSize={table.setPageSize}
          setPageIndex={table.setPageIndex}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
        ></Pagination>
      </div>
    </>
  );
};

export default BasicTable; 