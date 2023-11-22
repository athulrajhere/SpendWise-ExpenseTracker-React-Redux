import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "../modal/Modal";
import { Widget } from "../widget/Widget";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import "./addExpense.scss";
import SelectDropdown from "../selectDropdown/SelectDropdown";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddExpense() {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(startDate)

  return (
    <>
      <button style={{ border: "none" }} onClick={handleShow}>
        <div className="widget-container gap">
          <Widget type="add-expense" className="add-expense" />
        </div>
      </button>

      <Modal isOpen={show} onClose={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
          Add Expense
        </Modal.Header>
        <Modal.Body>
          <div className="category-amount-container">
            <SelectDropdown
              value={item}
              onChange={(newValue) => setItem(newValue)}
              placeholder="Select Item"
              options={["Item1", "Item2", "Item3", "Item4", "Item5"]}
              label="Category"
            ></SelectDropdown>
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                className="input-primary"
                name="amount"
              ></input>
            </div>
          </div>
          <div className="margin-top">
            <SelectDropdown
              value={item}
              onChange={(newValue) => setItem(newValue)}
              placeholder="Select Item"
              options={["Item1", "Item2", "Item3", "Item4", "Item5"]}
              label="Account"
            ></SelectDropdown>
          </div>
          <div className="flex-w-direction margin-top">
            <label htmlFor="amount">Date</label>
            <ReactDatePicker
              // showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="date-picker"
            />
          </div>
          <div className="flex-w-direction margin-top">
            <label htmlFor="notes">Notes</label>
            <textarea className="input-primary"></textarea>
          </div>
          {/* <button className="btn btn-primary">
            <AiOutlineMinusCircle />
          </button>
          <button className="btn btn-primary">
            <AiOutlinePlusCircle />
          </button> */}
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">
            Close
          </Modal.DismissButton>
          <button className="btn btn-primary">Save Changes</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddExpense;
