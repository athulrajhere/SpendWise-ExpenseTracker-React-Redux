import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "../pagination/Pagination";
import "./basicTable.scss";
import { RiExpandUpDownLine, RiSortAsc, RiSortDesc } from "react-icons/ri";
import Select from "../select/select";
import SelectDropdown from "../selectDropdown/SelectDropdown";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { isWithinRange } from "../../../pages/transactions/Transactions";

const BasicTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [field, setField] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [columnFilters, setColumnFilters] = useState();
  const [category, setCategory] = useState("");
  const [numberOfOptionsSelected, setNumberOfOptionsSelected] = useState();
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(45000);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    columns,
    data,
    enableFilters: true,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    // onRowSelectionChange: setRowSelection,
    // getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // filterFns: {
    //   isWithinRange: isWithinRange, //filter function added
    // },
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnFilters,
      rowSelection: rowSelection,
      //   rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  console.log(data);

  const handlePageChange = (number) => {
    console.log(number);
    table.setPageIndex(number - 1);
  };

  const filteringColumn = useMemo(() => {
    return table.getAllColumns().filter((col) => col.id === "title")[0];
  }, [field, table]);

  const newFilter = table
    .getAllColumns()
    .filter((col) => col.id === "category")[0];

  const amountFilter = table
    .getAllColumns()
    .filter((col) => col.id === "amount")[0];

  const dateFilter = table
    .getAllColumns()
    .filter((col) => col.id === "date")[0];

  console.log(newFilter);

  console.log(table.getAllColumns());

  const handleMultiSelectChange = (newValue) => {
    setCategory(newValue);

    setNumberOfOptionsSelected(
      Object.fromEntries(
        Object.entries(newValue).filter(([, val]) => val === true)
      )
    );

    // newFilter.setFilterValue(Object.keys(numberOfOptionsSelected)[0]);

    // Object.values(newValue).filter(Boolean);
    // console.log(Object.keys(numberOfOptionsSelected)[0]);
    // Perform filtering based on selected values.
    // const filteredData = data.filter((item) =>
    //   selectedValues.includes(item.field)
    // );
    // Update the displayed results with the filtered data.
    // (e.g., setData(filteredData);)
  };

  useEffect(() => {
    console.log("I am outside");
    console.log(numberOfOptionsSelected);
    if (filteringColumn) {
      filteringColumn.setFilterValue(searchValue);
    }
    if (newFilter && numberOfOptionsSelected !== undefined) {
      console.log("I am inside");
      console.log(numberOfOptionsSelected);
      console.log(Object.keys(numberOfOptionsSelected));
      newFilter.setFilterValue(
        Object.keys(numberOfOptionsSelected)
        //    [
        //     ...Object.keys(numberOfOptionsSelected)
        //       .filter((existingFilter) => existingFilter.id === columnId)
        //       .flatMap((existingFilter) => existingFilter.value),
        //     newFilterValue,
        //   ]
      );

      if (amountFilter) {
        amountFilter.setFilterValue(
          [minVal, maxVal]
          //    [
          //     ...Object.keys(numberOfOptionsSelected)
          //       .filter((existingFilter) => existingFilter.id === columnId)
          //       .flatMap((existingFilter) => existingFilter.value),
          //     newFilterValue,
          //   ]
        );
      }

      if (dateFilter && startDate !== undefined && endDate !== undefined) {
        console.log(dateFilter);
        dateFilter.setFilterValue([startDate, endDate]);
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

  //   useEffect(() => {
  //     if (filteringColumn) {
  //       filteringColumn.setFilterValue(searchValue);
  //     }
  //   }, [filteringColumn, searchValue]);

  const handleSelectChange = (e) => {
    setColumnFilters([]);
    setSearchValue("");
    setField(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDateClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const options = [
    ...new Set(
      data.map((value, index) => {
        return value.category;
      })
    ),
  ].sort();

  const maxAmount = Math.max(
    ...data.map((value, index) => {
      return value.amount;
    })
  );

  const minAmount = Math.min(
    ...data.map((value, index) => {
      return value.amount;
    })
  );

  // [
  //   ...new Set(
  //     data.map((value, index) => {
  //       return value.category;
  //     })
  //   ),
  // ].sort();

  //   const options = [
  //     ...new Set(
  //       Object.entries(table.getRowModel().rowsById).map(
  //         ([key, value], index) => {
  //           return value.original.category;
  //         }
  //       )
  //     ),
  //   ].sort();

  // console.log(startDate.toISOString());
  // console.log(endDate.toISOString());

  console.log(dateFilter.getFilterValue());
  console.log(minVal);
  console.log(maxVal);

  return (
    <>
      <div className="table-filters">
        <div className="table-select-container">
          <SelectDropdown
            className="input-primary"
            value={category}
            onChange={
              (newValue) => handleMultiSelectChange(newValue)
              // (newValue) => setCategory(newValue)
            }
            placeholder="Select Item"
            options={options}
            label="Category"
            isMulti
            size={"fw"}
          ></SelectDropdown>
        </div>
        <div className="table-input-container">
          <label htmlFor="amount">Title</label>
          <input
            type="text"
            className="input-primary"
            name="title"
            value={searchValue}
            onChange={handleInputChange}
            placeholder={"Search title"}
          ></input>
        </div>
        <div className="table-date-container">
          <label htmlFor="amount">Date</label>
          <ReactDatePicker
            // showIcon
            dateFormat="yyyy/MM/dd"
            selected={new Date()}
            onChange={(date) => handleDateChange(date)}
            className="date-picker"
            selectsRange
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select date range"
            disabledKeyboardNavigation
          >
            <button className="btn btn-primary" onClick={handleDateClear}>
              Clear
            </button>
          </ReactDatePicker>
        </div>
        {/* <SelectDropdown
          className="input-primary"
          value={field}
          onChange={(newValue) => handleSelectChange(newValue)}
          placeholder="Select Item"
          // options={["Item1", "Item2", "Item3", "Item4", "Item5"]}
          options={table
            .getAllLeafColumns()
            .slice(1)
            .map((column, index) => column.columnDef.header)}
          label="Advanced"
          isMulti={false}
          size={"sm"}
        ></SelectDropdown> */}
        <div>
          <MultiRangeSlider
            min={minAmount}
            max={maxAmount}
            onChange={({ min, max }) => {
              setMinVal(min);
              setMaxVal(max);
              // console.log(`min = ${min}, max = ${max}`);
            }}
            label={"Amount"}
          />
        </div>
      </div>
      <select value={field} onChange={handleSelectChange}>
        <option value="">Select Field</option>
        {table
          .getAllLeafColumns()
          .slice(1)
          .map((column, index) => {
            return (
              <option value={column.id} key={index}>
                {column.columnDef.header}
              </option>
            );
          })}
      </select>{" "}
      <input
        value={searchValue}
        onChange={handleInputChange}
        className="p-2 font-lg shadow border border-block"
        placeholder={
          field ? `Search ${field} column...` : "Please select a field"
        }
      />
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
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
                        {/* {header.column.getIsSorted() != "asc" ||
                        header.column.getIsSorted() != "desc" ? (
                          <RiExpandUpDownLine />
                        ) : null} */}
                      </div>
                      <div className="theader-icon">
                        {
                          {
                            asc: <RiSortAsc />,
                            desc: <RiSortDesc />,
                            default: <RiExpandUpDownLine />,
                          }[header.column.getIsSorted() || "default"]
                        }
                      </div>
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
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
