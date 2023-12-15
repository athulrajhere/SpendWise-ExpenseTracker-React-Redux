import { Widget } from "../../components/common/widget/Widget";
import "./home.scss";
import { options } from "../../components/common/chart/Chart";
import Card from "../../components/common/card/card";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { userData, states } from "../../data/account-profile";
import avatar from "../../assets/avatars/Avatar.png";
import { CiLocationOn } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import AddExpense from "../../components/home/addExpense/addExpense";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const userProfile = userData;
  const transactionWidgetClassNames = {
    transactionWidget: "transaction-widget",
    transactionWidgetIcon: "transaction-widget-icon",
    transactionBoxShadow: "transaction-box-shadow",
  };

  const addExpense = () => {
    console.log("clicked");
  };
  return (
    <div className="home-container-grid">
      <div className="top-container">
        <div className="widget-container gap">
          <Widget type="spent" />
        </div>
        <div className="widget-container gap">
          <Widget type="balance" />
        </div>
        <div className="widget-container gap">
          <Widget type="earnings" />
        </div>
        <AddExpense></AddExpense>
      </div>
      <div className="center-container">
        <div className="chart-container">
          <Card>
            <div className="card-padding">
              <div className="top">
                <h3>Total Spent</h3>
                <h1>$ 682.5</h1>
              </div>
              <div className="bottom">
                {/* <Chart title="" aspect={3} /> */}
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </div>
          </Card>
        </div>
        <div className="profile-container grid-col-span-2">
          <Card>
            <div className="card-padding">
              <div className="profile-pic">
                <div className="avatar">
                  <img className="profile-avatar" src={avatar} alt="image" />
                </div>
              </div>
              <div className="profile-name-loc">
                <h2>{user ? user?.name : userProfile?.firstName}</h2>
                <div className="profile-location">
                  {<CiLocationOn />}
                  <h3>
                    {userProfile.location.city}, {userProfile.location.country}
                  </h3>
                </div>
              </div>
              <div className="profile-info">
                <label className="profile-projects">
                  <h3>Projects</h3>
                  <h2>{userProfile.projects}</h2>
                </label>
                <label className="profile-followers">
                  <h3>Followers</h3>
                  <h2>{userProfile.followers}</h2>
                </label>
                <label className="profile-following">
                  <h3>Following</h3>
                  <h2>{userProfile.following}</h2>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="bottom-container">
        <div className="spend-this-month-container grid-col-span-2">
          <Card>
            <div className="card-padding">
              <div className="account-spending-container">
                <div className="account-container">
                  <Card className="box-shadow card-background">
                    <div className="card-padding">
                      <div className="account">
                        <div className="account-top">
                          <div className="top flex-grow">
                            <h3 className="font-white">Account Type</h3>
                            <h2 className="font-white">Main</h2>
                          </div>
                          <div className="top account-amount">
                            <h1 className="font-white">$ 12, 234</h1>
                          </div>
                        </div>
                        <div className="account-bottom"></div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="earning-spending-container">
                  <div className="earning">
                    <Card className="box-shadow">
                      <div className="card-padding">
                        <div className="top">
                          <h3>Earnings</h3>
                        </div>
                        <div className="top margin-top">
                          <h2>$ 12, 234</h2>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="spending">
                    <Card className="box-shadow">
                      <div className="card-padding">
                        <div className="top">
                          <h3>Spendings</h3>
                        </div>
                        <div className="top margin-top">
                          <h2>$ 12, 234</h2>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="your-transactions-container grid-col-span-2">
          <Card>
            <div className="card-padding">
              <div className="transaction">
                <div className="top">
                  <h2>Your transactions</h2>
                </div>
                <label className="transaction-widget-container">
                  <Widget
                    type="spent"
                    className="transaction"
                    className2={transactionWidgetClassNames}
                  />
                  <Widget
                    type="balance"
                    className="transaction"
                    className2={transactionWidgetClassNames}
                  />
                  <Widget
                    type="earnings"
                    className="transaction"
                    className2={transactionWidgetClassNames}
                  />
                </label>
                <div className="transaction-bottom">
                  <h4>View all</h4>
                  <BsArrowRight />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="to-do-container grid-col-span-2">
          <Card>
            <div className="card-padding">
              <div className="transaction">
                <div className="top">
                  <h2>Tasks</h2>
                </div>
                <label className="transaction-widget-container">
                  <Widget
                    type="spent"
                    className="transaction"
                    className2={transactionWidgetClassNames}
                  />
                  <Widget
                    type="balance"
                    className="transaction"
                    className2={transactionWidgetClassNames}
                  />
                  <Widget
                    type="earnings"
                    className="transaction"
                    className2={transactionWidgetClassNames}
                  />
                </label>
                <div className="transaction-bottom">
                  <h4>View all</h4>
                  <BsArrowRight />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
