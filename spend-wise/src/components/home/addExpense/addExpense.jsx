import { useEffect, useState } from "react";
import Modal from "../../common/modal/Modal";
import { Widget } from "../../common/widget/Widget";
import "./addExpense.scss";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createIncome } from "../../../features/income/incomeSlice";

function AddExpense() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const dispatch = useDispatch();

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setAccount("");
    setDate(new Date());
    setNotes("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createIncome({
        title: title,
        amount: amount,
        account: account,
        date: date.toISOString(),
        category: category,
        description: notes,
      })
    );
    setShow(false);
    toast.success("Expense added successfully");
    resetForm();
  };
  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);

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
        <form onSubmit={onSubmit}>
          <Modal.Body>
            <div className="category-amount-container">
              <div className="input-container">
                <label htmlFor="amount">Title</label>
                <input
                  type="text"
                  className="input-primary"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div className="input-container">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  className="input-primary"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                ></input>
              </div>
            </div>
            <div
              className="category-amount-container"
              style={{ marginTop: "0.5rem" }}
            >
              <SelectDropdown
                className="input-primary"
                value={category}
                onChange={(newValue) => setCategory(newValue)}
                placeholder="Select Item"
                options={["Item1", "Item2", "Item3", "Item4", "Item5"]}
                label="Category"
              ></SelectDropdown>
              <SelectDropdown
                lassName="input-primary"
                value={account}
                onChange={(newValue) => setAccount(newValue)}
                placeholder="Select Item"
                options={["Item1", "Item2", "Item3", "Item4", "Item5"]}
                label="Account"
              ></SelectDropdown>
            </div>
            <div className="input-container">
              <label htmlFor="amount">Date</label>
              <ReactDatePicker
                // showIcon
                dateFormat="yyyy/MM/dd"
                selected={date}
                onChange={(date) => setDate(date)}
                className="date-picker"
              />
            </div>
            <div className="input-container">
              <label htmlFor="notes">Notes</label>
              <textarea
                className="input-primary"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="form-group">
              <Modal.DismissButton className="btn btn-secondary">
                Close
              </Modal.DismissButton>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddExpense;
