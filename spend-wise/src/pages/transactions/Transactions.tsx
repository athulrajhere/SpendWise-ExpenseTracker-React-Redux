import React, { useCallback, useEffect, useState } from "react";
import "./Transactions.scss";
import { useSelector, useDispatch } from "react-redux";
import { MdAdd } from "react-icons/md";
import {
  deleteTransaction,
  getTransactions,
  transactionReset,
} from "../../features/transaction/transactionSlice";
import NoTransactionsView from "./NoTransactionsView";
import TransactionsTable from "./TransactionsTable";
import TransactionActions from "./TransactionActions";
import { Transaction } from "./types";
import { AppDispatch } from "../../app/store";
import { ACTIONS } from "../../constants/constants";
import { TransactionData } from "../../features/transaction/types";
import Spinner from "../../components/common/spinner/Spinner";
import AddExpense from "../../components/home/addExpense/addExpense";

const Transactions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<TransactionData | undefined>(
    undefined
  );

  const { transaction, isFetching } = useSelector(
    (state: any) => state.transaction
  );
  const { startDate, endDate } = useSelector((state: any) => state.dashboard);

  useEffect(() => {
    dispatch(getTransactions({ startDate, endDate }));
    return () => {
      dispatch(transactionReset());
    };
  }, [dispatch, startDate, endDate]);

  const handleSetShowModal = useCallback(
    (value: boolean) => {
      setShowModal(value);
      if (!value) {
        dispatch(getTransactions({ startDate, endDate }));
      }
    },
    [dispatch, startDate, endDate]
  );

  const handleEdit = (data: Transaction) => {
    setEditData(data as TransactionData);
    setShowModal(true);
  };

  const handleDelete = (transactionId: string) => {
    dispatch(deleteTransaction({ id: transactionId }));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteTransaction({ ids: selectedRows }));
  };

  const handleAddTransaction = () => {
    setShowModal(true);
    setEditData(undefined);
  };

  if (isFetching) return <Spinner />;

  return (
    <div className="container">
      <TransactionActions
        selectedRows={selectedRows}
        onDeleteSelected={handleDeleteSelected}
      />
      {transaction && transaction.length > 0 ? (
        <TransactionsTable
          data={transaction}
          onEdit={handleEdit}
          onDelete={handleDelete}
          setSelectedRows={setSelectedRows}
        />
      ) : (
        <NoTransactionsView onAddTransaction={handleAddTransaction} />
      )}
      <button className="category-add-icon" onClick={handleAddTransaction}>
        <MdAdd />
      </button>
      {showModal && (
        <AddExpense
          show={showModal}
          setShow={handleSetShowModal}
          updateData={editData}
          action={editData ? ACTIONS.UPDATE : ACTIONS.CREATE}
        />
      )}
    </div>
  );
};

export default Transactions;
