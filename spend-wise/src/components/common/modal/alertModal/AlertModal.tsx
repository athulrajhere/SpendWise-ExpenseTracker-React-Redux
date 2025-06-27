import React from "react";
import "./alertModal.scss";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../../features/category/categorySlice";
import Icon from "../../icon/Icon";
import { ICONS } from "../../../../constants/constants";
import { deleteAccount } from "../../../../features/account/accountSlice";

interface AlertModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  type: "category" | "account";
  deleteData: {
    _id: string;
    title: string;
    color?: string;
    background?: string;
    icon?: string;
    [key: string]: any;
  };
}

const AlertModal: React.FC<AlertModalProps> = ({ show, setShow, type, deleteData }) => {
  const isAccount = type === "account";
  const isCategory = type === "category";
  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCategory) {
        dispatch(deleteCategory(deleteData?._id));
      } else {
        dispatch(deleteAccount(deleteData?._id));
      }
      setShow(false);
    } catch (error) {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteCategoryText = (
    <span>
      Delete{" "}
      <b
        style={
          isCategory
            ? { color: deleteData?.color }
            : { color: "var(--purple-100)" }
        }
      >
        {deleteData?.title}
      </b>
    </span>
  );

  const deleteCategoryInfo = (
    <span style={{ color: "var(--gray-100)" }}>
      Do you really want to delete{" "}
      <b
        style={
          isCategory
            ? { color: deleteData?.color }
            : { color: "var(--purple-100)" }
        }
      >
        {deleteData?.title}
      </b>{" "}
      {isCategory ? "category" : isAccount ? "account" : ""} ?
    </span>
  );

  return (
    <Modal isOpen={show} onClose={handleClose} animate="diffuse">
      <div
        className="alert-modal-left"
        style={{
          backgroundImage: `url("src/assets/backdrops/${
            isCategory ? deleteData?.background : "Saly-3"
          }.png")`,
          backgroundColor: isCategory ? deleteData?.color : "var(--purple-100)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
        }}
      >
        <Modal.Header>
          {isCategory && (
            <div
              className="icon-container"
              style={{
                color: `${deleteData?.color}`,
              }}
            >
              <Icon
                icon={ICONS[deleteData?.icon]}
                color={deleteData?.color}
                size={40}
              ></Icon>
            </div>
          )}
        </Modal.Header>
      </div>

      <form onSubmit={onSubmit} className="alert-modal-form">
        <div className="alert-modal-right">
          <Modal.Body closeButton isRight={true}>
            <div className="alert-modal-body">
              <div>{deleteCategoryText}</div>
              <div>{deleteCategoryInfo}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.DismissButton className="btn btn-secondary">
              Cancel
            </Modal.DismissButton>
            <button type="submit" className="btn btn-primary">
              Delete
            </button>
          </Modal.Footer>
        </div>
      </form>
    </Modal>
  );
};

export default AlertModal; 