import React from "react";
import { Transaction } from "./types";
import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";
import IndeterminateCheckbox from "../../components/common/indeterminateCheckBox/IndterminateCheckBox";
import { ICONS } from "../../constants/constants";
import Icon from "../../components/common/icon/Icon";
import TableFilters from "./TableFilters";
import withTableFilters from "./withTableFilters";
import { useMediaQuery } from "react-responsive";
import BasicTable from "../../components/common/table/BasicTable";

interface TransactionsTableProps {
  data: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
  setSelectedRows: (rows: string[]) => void;
}

const TransactionsTableWithFilters = withTableFilters(BasicTable);

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  data,
  onEdit,
  onDelete,
  setSelectedRows,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 576 });
  const isTablet = useMediaQuery({ maxWidth: 992, minWidth: 577 });

  const isWithinRange = (row, columnId, value) => {
    const tableDate = row.getValue(columnId);
    const [startDate, endDate] = value;
    const date = new Date(tableDate);
    const start = startDate === null ? null : new Date(startDate);
    const end = endDate === null ? null : new Date(endDate);
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
        className: isTablet
          ? "hide-on-tablet"
          : isMobile
          ? "hide-on-mobile"
          : "",
      },
      {
        header: "Title",
        accessorKey: "title",
        accessorFn: (row) =>
          `${row.title.charAt(0).toUpperCase()}${row.title.slice(1)}`,
        cell: (value) => {
          return (
            <h4 className={isMobile ? "mobile-small-text" : ""}>
              <div className="cell-title">
                <span>
                  <Icon
                    icon={ICONS[value.row.original.category.icon]}
                    color={value.row.original.category.color}
                    size={isMobile ? 16 : 24}
                  ></Icon>
                </span>
                {value.getValue()}
              </div>
            </h4>
          );
        },
      },
      {
        header: "Notes",
        accessorKey: "description",
        accessorFn: (row) =>
          `${row.description.charAt(0).toUpperCase()}${row.description.slice(
            1
          )}`,
        className: isMobile ? "hide-on-mobile" : "",
      },
      {
        header: "Category",
        accessorKey: "category.title",
        filterFn: "arrIncludesSome",
        className: isMobile ? "hide-on-mobile" : "",
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: (d) => {
          return (
            <span className={isMobile ? "mobile-small-text" : ""}>
              {moment(d.getValue()).format(
                isMobile ? "DD/MM/YY" : "DD MMM,YYYY"
              )}
            </span>
          );
        },
        filterFn: isWithinRange,
      },
      {
        header: "Account",
        accessorKey: "account.title",
        className: isTablet || isMobile ? "hide-on-tablet" : "",
      },
      {
        header: "Amount",
        accessorKey: "amount",
        filterFn: "inNumberRange",
        cell: (props) => {
          return (
            <h4
              className={`responsive-amount ${
                isMobile ? "mobile-small-text" : ""
              }`}
              style={{
                color: props.row.original.isIncome === true ? "green" : "red",
              }}
            >
              {props.getValue()}
            </h4>
          );
        },
      },
      {
        header: "Actions",
        id: "delete",
        cell: (props) => (
          <div
            className={isMobile ? "mobile-actions" : ""}
            style={{
              display: "flex",
              gap: isMobile ? "5px" : "10px",
              fontSize: isMobile ? "16px" : "20px",
              color: "var(--purple-100)",
            }}
          >
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => onDelete(props.row.original._id)}
            >
              <MdDelete />
            </span>
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                onEdit(props.row.original);
              }}
            >
              <MdEdit />
            </span>
          </div>
        ),
      },
    ],
    [isMobile, isTablet]
  );

  const filterConfig = {
    search: { key: "title" },
    category: { key: "category.title" },
    date: { key: "date" },
    amount: { key: "amount" },
    FilterComponent: TableFilters,
  };

  return (
    <div className="responsive-table-container">
      <TransactionsTableWithFilters
        data={data}
        columns={columns}
        filterConfig={filterConfig}
        onRowSelect={setSelectedRows}
      />
    </div>
  );
};

export default TransactionsTable;
