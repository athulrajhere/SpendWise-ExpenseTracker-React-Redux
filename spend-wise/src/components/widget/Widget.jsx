// import { FaChartSimple } from "react-icons/fa";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineAccountBalance } from "react-icons/md";
import { BiSolidCartAdd } from "react-icons/bi";
import "./widgets.scss";

export const Widget = ({ type, className, className2 }) => {
  let data;

  switch (type) {
    case "spent":
      data = {
        title: "Spent this month",
        icon: <BiSolidBarChartAlt2 className="icon" />,
        amount: 682.5,
      };
      break;
    case "balance":
      data = {
        title: "Balance",
        icon: <MdOutlineAccountBalance className="icon" />,
        amount: 1000,
      };
      break;
    case "earnings":
      data = {
        title: "Earnings",
        icon: <FaRupeeSign className="icon" />,
        amount: 350.4,
      };
      break;
    case "add-expense":
      data = {
        title: "Add Expense",
        icon: <BiSolidCartAdd className="icon" />,
        amount: 682.5,
      };
      break;
  }

  return (
    <div
      className={`widget ${
        className === "transaction" ? className2?.transactionBoxShadow : className === "add-expense" ? "add-expense-background" : ""
      }`}
    >
      <div className="left">
        <div
          className={`icon-container ${
            className !== undefined ? className2?.transactionWidgetIcon : ""
          }`}
        >
          {data.icon}
        </div>
      </div>
      <div className="right">
        <h3 className={`title ${className === "add-expense" ? "font-white" : "title"}`}>{data.title}</h3>
        <h4 className={`amount ${className === "add-expense" ? "font-white" : ""}`}>$ {data.amount}</h4>
      </div>
    </div>
  );
};
