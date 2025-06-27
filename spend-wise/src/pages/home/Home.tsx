import "./home.scss";
import avatar from "../../assets/avatars/Avatar.png";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../features/dashboard/dashboardSlice";
import "swiper/css";
import "swiper/css/pagination";
import { MdAdd } from "react-icons/md";
import WidgetsRenderer from "../../components/home/widgetRenderer/widgetRenderer";
import PeriodChangeChart from "../../components/home/periodChangeChart/periodChangeChart";
import ProfileCard from "../../components/home/profileCard/profileCard";
import AccountSpendingCard from "../../components/home/accountSpendingCard/accountSpendingCard";
import { AppDispatch, RootState } from "../../app/store";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import TransactionCard from "../../components/home/periodTransactionCard/transactionCard";
import { getProfile } from "../../features/settings/settingsSlice";
import { DashboardData } from "../../features/dashboard/types";

const Home: React.FC = () => {
  const {
    dashboard,
    startDate: globalStartDate,
    endDate: globalEndDate,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state: RootState) => state.dashboard);
  const [show, setShow] = useState<boolean>(false);
  const [chartData, setChartData] = useState<DashboardData | null>(null);
  const [startDate] = useState<Date | null>(globalStartDate);
  const [endDate] = useState<Date | null>(globalEndDate);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { showBoundary } = useErrorBoundary();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const date = {
      startDate: startDate,
      endDate: endDate,
    };
    if (user) {
      dispatch(getDashboard(date));
      dispatch(getProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    setChartData(dashboard);
  }, [dashboard]);

  if (isError) showBoundary(message);
  const handleShow = () => {
    setShow(true);
  };

  const handleSetShowModal = useCallback(
    (value: boolean) => {
      setShow(value);
      if (!value) {
        const date = {
          startDate: startDate,
          endDate: endDate,
        };

        dispatch(getDashboard(date));
      }
    },
    [dispatch, startDate, endDate]
  );

  const handleSlideChange = (swiper: { activeIndex: number }) => {
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <div className="home">
      <div className="home__grid">
        <div className="home__top">
          <WidgetsRenderer
            dashboard={dashboard}
            show={show}
            handleShow={handleShow}
            setShow={handleSetShowModal}
            isLoading={isLoading}
          />
        </div>
        <div className="home__center">
          <PeriodChangeChart
            periodChange={dashboard?.periodChange || 0}
            chartData={chartData}
            isLoading={isLoading}
          />
          <div className="profile">
            <ProfileCard
              avatar={avatar}
              userProfile={dashboard}
              user={user}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="home__bottom">
          <div className="spend-container">
            <AccountSpendingCard
              dashboard={dashboard}
              currentSlide={currentSlide}
              handleSlideChange={handleSlideChange}
              navigate={navigate}
              isLoading={isLoading}
            />
          </div>
          <div className="transactions-container">
            <TransactionCard
              dashboard={dashboard}
              navigate={navigate}
              type="period"
              isLoading={isLoading}
            />
          </div>
          <div className="todo-container">
            <TransactionCard
              dashboard={dashboard}
              navigate={navigate}
              type="recent"
              isLoading={isLoading}
            />
          </div>
        </div>
        <button className="home__add-button" onClick={handleShow}>
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default Home;
