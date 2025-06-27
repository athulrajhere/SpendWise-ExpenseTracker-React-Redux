import React from "react";
import { BsArrowRight } from "react-icons/bs";
import "./transactionCard.scss";
import Card from "../../common/card/Card";
import CategoryTransactions from "../categoryTransaction.jsx/CategoryTransactions";
import moment from "moment";
import { TransactionCardProps } from "./types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TransactionCard: React.FC<TransactionCardProps> = ({
  dashboard,
  navigate,
  type,
  isLoading,
}) => {
  const isPeriod = type === "period";
  const data = isPeriod
    ? dashboard?.categoriesData
    : dashboard?.recentTransactions;

  if (isLoading) {
    return (
      <Card className="transaction-card">
        <div className="transaction-card__content">
          <div className="transaction-card__header">
            <Skeleton width={160} height={24} />
          </div>
          <label className="transaction-card__body">
            {[...Array(4)].map((_, i) => (
              <div style={{ marginBottom: 16 }} key={i}>
                <Skeleton height={48} borderRadius={12} />
              </div>
            ))}
          </label>
          <div className="transaction-card__footer">
            <Skeleton width={80} height={20} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="transaction-card">
      <div className="transaction-card__content">
        <div className="transaction-card__header">
          <h2>{isPeriod ? "Period Expenses" : "Recent Transactions"}</h2>
        </div>
        <label className="transaction-card__body">
          {data && data.length > 0 ? (
            data.slice(0, 4).map((item, index) => {
              const transactionLength = `${item?.transactions?.length} ${
                item?.transactions?.length > 1 ? "transactions" : "transaction"
              }`;
              return (
                <CategoryTransactions
                  title={item.title}
                  color={isPeriod ? item.color : item.category.color}
                  icon={isPeriod ? item.icon : item.category.icon}
                  amount={isPeriod ? item.totalAmount : item.amount}
                  subTitle={
                    isPeriod ? transactionLength : moment(item.date).fromNow()
                  }
                  key={index}
                />
              );
            })
          ) : (
            <div className="transaction-card__empty">
              {/* <img src="/assets/no-expenses.svg" alt="No expenses" /> */}
              <h3 className="transaction-card__body-title">
                Nothing spent yet!
              </h3>
              <p>Your wallet is still in hibernation mode. 🐻💤</p>
            </div>
          )}
        </label>
        <div
          className="transaction-card__footer"
          onClick={() =>
            isPeriod ? navigate("/overview") : navigate("/transactions")
          }
        >
          <h4>View all</h4>
          <BsArrowRight />
        </div>
      </div>
    </Card>
  );
};

export default TransactionCard;
