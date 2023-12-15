import React, { useEffect, useState } from "react";
import "./Transactions.scss";
import fakeData from "./MOCK_DATA.json";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/common/spinner/Spinner";
import { toast } from "react-toastify";
import { getIncomes, reset } from "../../features/income/incomeSlice";
import moment from "moment";
import BasicTable from "../../components/common/table/BasicTable";
import IndeterminateCheckbox from "../../components/common/indeterminateCheckBox/IndterminateCheckBox";

const Transactions = () => {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();

  const { income, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.income
  );

  const data = React.useMemo(() => income, [income]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || income) {
      console.log("Successfully navigated");
      // console.log(income);
    }

    dispatch(getIncomes());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const categoryFilterFn = (row, columnId, filterValue) => {
    console.log("row is being called", row);

    // if (row.id === "0") {
    //   return true;
    // }
    // return false;

    if (columnId === "category") {
      let filterCategory = row.original.category.includes(filterValue);
      return filterCategory ? true : false;
    }

    // return filterValue.length === 0
    //   ? row
    //   : row.filter((item) =>
    //       filterValue.includes(String(item.original.category))
    //     );
  };

  const isWithinRange = (row, columnId, value) => {
    console.log("row is being called", row);
    const tableDate = row.getValue(columnId);
    const [startDate, endDate] = value; // value => two date input values
    //If one filter defined and date is null filter it
    const date = new Date(tableDate);
    const start = startDate === null ? null : new Date(startDate);
    const end = endDate === null ? null : new Date(endDate);
    console.log(date);
    console.log(start);
    console.log(end);
    if ((start || end) && !date) return false;
    if (start && end === null) {
      return date.getTime();
    } else if (start === null && end === null) {
      return date.getTime();
    } else if (!start && end) {
      return date.getTime() <= end.getTime();
    } else if (start && end) {
      return (
        date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
      );
    } else return true;
  };

  const columns = React.useMemo(
    () => [
      // {
      //   header: "ID",
      //   accessorKey: "id",
      // },
      // {
      //   header: "First Name",
      //   accessorKey: "first_name",
      // },
      // {
      //   header: "Last Name",
      //   accessorKey: "last_name",
      // },
      // {
      //   header: "Email",
      //   accessorKey: "email",
      // },
      // {
      //   header: "Gender",
      //   accessorKey: "gender",
      // },
      // {
      //   header: "University",
      //   accessorKey: "university",
      // },
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <input
      //       type="checkbox"
      //       checked={table.getIsAllRowsSelected()}
      //       // indeterminate={table.getIsSomeRowsSelected()}
      //       onChange={table.getToggleAllRowsSelectedHandler()}
      //       size="medium"
      //       // sx={sx}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <input
      //       checked={row.getIsSelected()}
      //       disabled={!row.getCanSelect()}
      //       onChange={row.getToggleSelectedHandler()}
      //       size="medium"
      //       // sx={sx}
      //     />
      //   ),
      // },
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        header: "#",
        accessorFn: (row, index) => index + 1,
      },
      {
        header: "Title",
        accessorKey: "title",
        accessorFn: (row) =>
          `${row.title.charAt(0).toUpperCase()}${row.title.slice(1)}`,
        cell: (value) => {
          return <h4>{value.getValue()}</h4>;
        },
      },
      {
        header: "Notes",
        accessorKey: "description",
        accessorFn: (row) =>
          `${row.description.charAt(0).toUpperCase()}${row.description.slice(
            1
          )}`,
      },
      {
        header: "Category",
        accessorKey: "category",
        filterFn: "arrIncludesSome",
        // (rows, _columnId, filterValue) => {
        //   console.log(rows);
        //   console.log(_columnId);
        //   console.log(filterValue);
        //   return filterValue.length === 0
        //     ? rows
        //     : rows.filter((row) =>
        //         filterValue.includes(String(row.original[_columnId]))
        //       );
        // },
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: (d) => {
          return moment(d.getValue()).format("DD MMM,YYYY");
        },
        filterFn: isWithinRange,
      },
      {
        header: "Account",
        accessorKey: "account",
      },
      {
        header: "Amount",
        accessorKey: "amount",
        filterFn: "inNumberRange",
        // filterFn: (row, _columnId, value) => {
        //   return row.original.amount === +value;
        // },
        cell: (props) => {
          // console.log(props);
          return (
            <h4
              style={{
                color:
                  props.row.original.category === "Item1" ? "red" : "green",
              }}
            >
              {props.getValue()}
            </h4>
          );
        },
      },
    ],
    []
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      {income.length > 0 ? (
        <BasicTable data={data} columns={columns}></BasicTable>
      ) : (
        <h2>You don't have any Transactions</h2>
      )}
    </div>
  );
};

export default Transactions;
