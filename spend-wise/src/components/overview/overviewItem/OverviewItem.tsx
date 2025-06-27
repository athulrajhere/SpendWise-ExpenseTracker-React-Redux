import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HighchartsWrapper from "../../common/chart/HighChartsWrapper";
import "./overViewItem.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CategoryTransactions from "../../home/categoryTransaction.jsx/CategoryTransactions";
import moment from "moment";
import { useEffect, useState } from "react";
import { ICONS } from "../../../constants/constants";
import Card from "../../common/card/Card";
import Icon from "../../common/icon/Icon";

interface CategoryData {
  _id: string;
  categoryName?: string;
  title?: string;
  transactions?: TransactionData[];
  color?: string;
  icon?: string;
}

interface TransactionData {
  date: string;
  amount: number;
  title: string;
  [key: string]: any;
}

interface DashboardState {
  dashboard: {
    categoriesData?: CategoryData[];
    [key: string]: any;
  };
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const OverviewItem: React.FC = () => {
  const { dashboard, isLoading, isError, isSuccess, message } = useSelector(
    (state: DashboardState) => state.dashboard
  );

  const routeParams = useParams<{ userId: string }>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const date = {
      startDate:
        searchParams.get("startDate") === "null"
          ? undefined
          : searchParams.get("startDate"),
      endDate:
        searchParams.get("endDate") === "null"
          ? undefined
          : searchParams.get("endDate"),
    };
  }, [dispatch, location.search]);

  const categoryDetails = dashboard?.categoriesData?.filter(
    (category: CategoryData) => {
      return (
        category?.categoryName === routeParams.userId ||
        category?.title === routeParams.userId
      );
    }
  );

  const transactions =
    categoryDetails?.flatMap(
      (item) =>
        item?.transactions?.map((transaction: TransactionData) => ({
          ...transaction,
          date: transaction?.date,
          amount: transaction?.amount,
          title: transaction?.title,
        })) || []
    ) || [];

  const hasValidData =
    transactions.length > 0 && transactions[0]?.date && transactions[0]?.amount;

  return (
    <div className="overview-container">
      <div className="overview-category-top">
        <button
          className="btn"
          style={{ background: "none", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <div className="overview-items-title">
            <Icon
              icon={ICONS.LEFT}
              color={"var(--purple-100)"}
              size={32}
            ></Icon>
            <h2 style={{ color: "var(--purple-100)" }}>Back</h2>
          </div>
        </button>
      </div>
      <div className="overview-category-bottom">
        <Card>
          <div className="card-padding">
            <div className="overview-category-bottom">
              <div>
                {hasValidData ? (
                  <HighchartsWrapper
                    chartType="overview-item"
                    data={transactions}
                  />
                ) : (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    {transactions.length === 0
                      ? "No transaction data available"
                      : "Invalid transaction data format"}
                    <br />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
        <div className="overview-category-cards">
          {categoryDetails !== undefined &&
            categoryDetails?.map((item, index) => {
              return item?.transactions?.map((transaction, ind) => {
                return (
                  <Card key={ind}>
                    <div className="card-padding">
                      <CategoryTransactions
                        title={transaction?.title}
                        color={item?.color}
                        icon={item?.icon}
                        amount={transaction?.amount}
                        subTitle={moment(transaction?.date).format("MMM-YYYY")}
                        key={ind}
                      ></CategoryTransactions>
                    </div>
                  </Card>
                );
              });
            })}
        </div>
      </div>
    </div>
  );
};

export default OverviewItem;
