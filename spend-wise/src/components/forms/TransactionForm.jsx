import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Widget } from "../common/widget/Widget";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import "./transactionForm.scss";
import SelectDropdown from "../common/selectDropdown/SelectDropdown";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TransactionForm({setItem, item,  setStartDate, startDate}) {
  const [show, setShow] = useState(false);
//   const [item, setItem] = useState("");
//   const [startDate, setStartDate] = useState(new Date());

  //   $(document).on("click", ".chip.chip-checkbox", function(){
  //     let $this = $(this);
  //     let $option = $this.find("input");
  //     if($option.is(":radio")){
  //       let $others = $("input[name=" + $option.attr("name") + "]").not($option);
  //       $others.prop("checked", false);
  //       $others.change();
  //     }
  //     $option.prop("checked", !$this.hasClass("active"));
  //     $option.change();
  //   });

  return (
    <div>
      {/* <div>
        <div className="chip-group" tabIndex="-1" role="radiogroup">
          <div
            className="chip chip-checkbox"
            aria-labelledby="radioOneLabel"
            tabIndex="0"
            role="radio"
            aria-checked="false"
          >
            <input type="radio" name="radioEx" />
            <span id="radioOneLabel">Expense</span>
          </div>
          <div
            className="chip chip-checkbox"
            aria-labelledby="radioTwoLabel"
            tabIndex="0"
            role="radio"
            aria-checked="false"
          >
            <input type="radio" name="radioEx" />
            <span id="radioTwoLabel">Income</span>
          </div>
        </div>
      </div> */}
      <div className="form-group category-amount-container">
        <SelectDropdown
          value={item}
          onChange={(newValue) => setItem(newValue)}
          placeholder="Select Item"
          options={["Item1", "Item2", "Item3", "Item4", "Item5"]}
          label="Category"
        ></SelectDropdown>
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="number" className="input-primary" name="amount"></input>
        </div>
      </div>
      <div className="form-group margin-top">
        <SelectDropdown
          value={item}
          onChange={(newValue) => setItem(newValue)}
          placeholder="Select Item"
          options={["Item1", "Item2", "Item3", "Item4", "Item5"]}
          label="Account"
        ></SelectDropdown>
      </div>
      <div className="form-group flex-w-direction margin-top">
        <label htmlFor="amount">Date</label>
        <ReactDatePicker
          // showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="date-picker"
        />
      </div>
      <div className="form-group flex-w-direction margin-top">
        <label htmlFor="notes">Notes</label>
        <textarea className="input-primary"></textarea>
      </div>
    </div>
  );
}

export default TransactionForm;
