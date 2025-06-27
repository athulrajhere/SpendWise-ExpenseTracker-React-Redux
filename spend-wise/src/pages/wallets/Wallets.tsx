import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./wallets.scss";
import { MdAdd } from "react-icons/md";
import AlertModal from "../../components/common/modal/alertModal/AlertModal";
import { getAccounts } from "../../features/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../constants/constants";
import { RootState } from "../../app/store";
import { AppDispatch } from "../../app/store";
import { Account } from "../../features/account/types";
import AccountModal from "../../components/accounts/accountModal/AccountModal";
import AccountCard from "../../components/accounts/accountCard/AccountCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AccountWithUI extends Account {
  icon: string;
  amount: number;
  initialAmount: number;
  numberOfTransactions: number;
}

interface AccountModalData {
  _id: string;
  title: string;
  initialAmount: number;
  amount: number;
  icon: string;
  isIncome?: boolean;
  numberOfTransactions?: number;
  [key: string]: any;
}

const Wallets: React.FC = () => {
  const { account, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.account
  );
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [editData, setEditData] = useState<AccountWithUI | null>(null);
  const [deleteData, setDeleteData] = useState<AccountWithUI | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    dispatch(getAccounts()).unwrap();
  }, [dispatch]);

  const handleCreate = (): void => {
    setShowCreateModal(true);
  };

  const handleShow = (item: AccountWithUI): void => {
    setEditData(item);
    setShow(true);
  };

  const handleDelete = (item: AccountWithUI): void => {
    setDeleteData(item);
    setShowDeleteAlert(true);
  };

  const transformAccountForUI = (account: Account): AccountWithUI => ({
    ...account,
    icon: "WALLET",
    amount: account.amount || 0,
    initialAmount: account.initialAmount || account.amount || 0,
    numberOfTransactions: account.numberOfTransactions || 0,
  });

  const transformForModal = (account: AccountWithUI): AccountModalData => ({
    _id: account._id,
    title: account.title,
    initialAmount: account.initialAmount || account.amount || 0,
    amount: account.amount || 0,
    icon: account.icon,
    isIncome: false,
    numberOfTransactions: account.numberOfTransactions || 0,
  });

  if (isLoading) {
    return (
      <div className="accounts-container">
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <Skeleton height={120} borderRadius={20} />
          </div>
        ))}
        <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Skeleton width={60} height={60} borderRadius={30} />
        </div>
      </div>
    );
  }

  return (
    <div className="accounts-container">
      {account.length === 0 ? (
        <div>No accounts found. Create your first account!</div>
      ) : (
        account.map((item, index) => {
          const uiItem = transformAccountForUI(item);
          return (
            <AccountCard
              key={index}
              index={index}
              item={uiItem}
              itemsRef={itemsRef}
              handleShow={handleShow}
              handleDelete={handleDelete}
              isBGImage={false}
            />
          );
        })
      )}
      <button className="accounts-add-icon" onClick={handleCreate}>
        <MdAdd />
      </button>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showCreateModal ? (
          <AccountModal
            show={showCreateModal}
            setShow={setShowCreateModal}
            type={"account"}
            action={ACTIONS.CREATE}
            updateData={undefined}
          />
        ) : show ? (
          <AccountModal
            show={show}
            setShow={setShow}
            action={ACTIONS.UPDATE}
            updateData={editData ? transformForModal(editData) : undefined}
            type={"account"}
          />
        ) : (
          showDeleteAlert &&
          deleteData && (
            <AlertModal
              show={showDeleteAlert}
              setShow={setShowDeleteAlert}
              type={"account"}
              deleteData={deleteData}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wallets;
