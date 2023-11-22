import { Widget } from "../../components/widget/Widget";
import "./home.scss";
import { options } from "../../components/chart/Chart";
import Card from "../../components/card/card";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { user, states } from "../../data/account-profile";
import avatar from "../../assets/avatars/Avatar.png";
import { CiLocationOn } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import AddExpense from "../../components/addExpense/addExpense";

const Home = () => {
  const userProfile = user;
  const transactionWidgetClassNames = {
    transactionWidget: "transaction-widget",
    transactionWidgetIcon: "transaction-widget-icon",
    transactionBoxShadow: "transaction-box-shadow",
  };

  const addExpense = () => {
    console.log("clicked");
  };
  return (
    // <div className="home">
    //   <div className="widgets">
    //     <Widget type="spent" />
    //     <Widget type="balance" />
    //     <Widget type="earnings" />
    //     <Widget type="add-expense" />
    //   </div>
    //   <div className="center-container">
    //     <div className="left-container">
    //       <div className="card1">
    //         <Card>
    //           <div className="card-padding">
    //             <div className="top">
    //               <div className="title">Total Spent</div>
    //               <div className="h1">$ 682.5</div>
    //             </div>
    //             <div className="bottom">
    //               {/* <Chart title="" aspect={3} /> */}
    //               <HighchartsReact highcharts={Highcharts} options={options} />
    //             </div>
    //           </div>
    //         </Card>
    //       </div>
    //       <div className="bottom-container">
    //         <div className="card2">
    //           <Card>
    //             <div className="card-padding">
    //               <div className="profile-pic">
    //                 <div className="avatar">
    //                   <img
    //                     className="profile-avatar"
    //                     src={avatar}
    //                     alt="image"
    //                   />
    //                 </div>
    //               </div>
    //               <div className="profile-details">
    //                 <label >
    //                   {userProfile.firstName +
    //                     (userProfile.middleName
    //                       ? " " +
    //                         userProfile.middleName +
    //                         " " +
    //                         userProfile.lastName
    //                       : " " + userProfile.lastName)}
    //                 </label>
    //                 <div className="profile-location">
    //                   {<CiLocationOn />}
    //                   <label >
    //                     {userProfile.location.city},{" "}
    //                     {userProfile.location.country}
    //                   </label>
    //                 </div>
    //                 <div className="profile-info">
    //                   <label className="profile-projects">
    //                     <span >Projects</span>
    //                     <span >
    //                       {userProfile.projects}
    //                     </span>
    //                   </label>
    //                   <label className="profile-followers">
    //                     <span >Followers</span>
    //                     <span >
    //                       {userProfile.followers}
    //                     </span>
    //                   </label>
    //                   <label className="profile-following">
    //                     <span >Following</span>
    //                     <span >
    //                       {userProfile.following}
    //                     </span>
    //                   </label>
    //                 </div>
    //               </div>
    //             </div>
    //           </Card>
    //         </div>
    //         <div className="card2">
    //           <Card>
    //             <div className="card-padding">
    //               <div className="profile-pic">
    //                 <div className="avatar">
    //                   <img
    //                     className="profile-avatar"
    //                     src={avatar}
    //                     alt="image"
    //                   />
    //                 </div>
    //               </div>
    //               <div className="profile-details">
    //                 <label >
    //                   {userProfile.firstName +
    //                     (userProfile.middleName
    //                       ? " " +
    //                         userProfile.middleName +
    //                         " " +
    //                         userProfile.lastName
    //                       : " " + userProfile.lastName)}
    //                 </label>
    //                 <div className="profile-location">
    //                   {<CiLocationOn />}
    //                   <label >
    //                     {userProfile.location.city},{" "}
    //                     {userProfile.location.country}
    //                   </label>
    //                 </div>
    //                 <div className="profile-info">
    //                   <label className="profile-projects">
    //                     <span >Projects</span>
    //                     <span >
    //                       {userProfile.projects}
    //                     </span>
    //                   </label>
    //                   <label className="profile-followers">
    //                     <span >Followers</span>
    //                     <span >
    //                       {userProfile.followers}
    //                     </span>
    //                   </label>
    //                   <label className="profile-following">
    //                     <span >Following</span>
    //                     <span >
    //                       {userProfile.following}
    //                     </span>
    //                   </label>
    //                 </div>
    //               </div>
    //             </div>
    //           </Card>
    //         </div>
    //       </div>
    //     </div>
    //     {/* <div className="right-container">
    //         <div className="card2">
    //           <Card>
    //             <div className="card-padding">
    //               <div className="profile-pic">
    //                 <div className="avatar">
    //                   <img
    //                     className="profile-avatar"
    //                     src={avatar}
    //                     alt="image"
    //                   />
    //                 </div>
    //               </div>
    //               <div className="profile-details">
    //                 <label >
    //                   {userProfile.firstName +
    //                     (userProfile.middleName
    //                       ? " " +
    //                         userProfile.middleName +
    //                         " " +
    //                         userProfile.lastName
    //                       : " " + userProfile.lastName)}
    //                 </label>
    //                 <div className="profile-location">
    //                   {<CiLocationOn />}
    //                   <label >
    //                     {userProfile.location.city},{" "}
    //                     {userProfile.location.country}
    //                   </label>
    //                 </div>
    //                 <div className="profile-info">
    //                   <label className="profile-projects">
    //                     <span >Projects</span>
    //                     <span >
    //                       {userProfile.projects}
    //                     </span>
    //                   </label>
    //                   <label className="profile-followers">
    //                     <span >Followers</span>
    //                     <span >
    //                       {userProfile.followers}
    //                     </span>
    //                   </label>
    //                   <label className="profile-following">
    //                     <span >Following</span>
    //                     <span >
    //                       {userProfile.following}
    //                     </span>
    //                   </label>
    //                 </div>
    //               </div>
    //             </div>
    //           </Card>
    //         </div>
    //       <div className="bottom-container">
    //         <div className="card2">
    //           <Card>
    //             <div className="card-padding">
    //               <div className="profile-pic">
    //                 <div className="avatar">
    //                   <img
    //                     className="profile-avatar"
    //                     src={avatar}
    //                     alt="image"
    //                   />
    //                 </div>
    //               </div>
    //               <div className="profile-details">
    //                 <label >
    //                   {userProfile.firstName +
    //                     (userProfile.middleName
    //                       ? " " +
    //                         userProfile.middleName +
    //                         " " +
    //                         userProfile.lastName
    //                       : " " + userProfile.lastName)}
    //                 </label>
    //                 <div className="profile-location">
    //                   {<CiLocationOn />}
    //                   <label >
    //                     {userProfile.location.city},{" "}
    //                     {userProfile.location.country}
    //                   </label>
    //                 </div>
    //                 <div className="profile-info">
    //                   <label className="profile-projects">
    //                     <span >Projects</span>
    //                     <span >
    //                       {userProfile.projects}
    //                     </span>
    //                   </label>
    //                   <label className="profile-followers">
    //                     <span >Followers</span>
    //                     <span >
    //                       {userProfile.followers}
    //                     </span>
    //                   </label>
    //                   <label className="profile-following">
    //                     <span >Following</span>
    //                     <span >
    //                       {userProfile.following}
    //                     </span>
    //                   </label>
    //                 </div>
    //               </div>
    //             </div>
    //           </Card>
    //         </div>
    //       </div>
    //     </div> */}
    //   </div>
    //   {/* <div className="bottom-container">
    //     <div className="card2">
    //       <Card>
    //         <div className="card-padding">
    //           <div className="profile-pic">
    //             <div className="avatar">
    //               <img className="profile-avatar" src={avatar} alt="image" />
    //             </div>
    //           </div>
    //           <div className="profile-details">
    //             <label >
    //               {userProfile.firstName +
    //                 (userProfile.middleName
    //                   ? " " +
    //                     userProfile.middleName +
    //                     " " +
    //                     userProfile.lastName
    //                   : " " + userProfile.lastName)}
    //             </label>
    //             <div className="profile-location">
    //               {<CiLocationOn />}
    //               <label >
    //                 {userProfile.location.city}, {userProfile.location.country}
    //               </label>
    //             </div>
    //             <div className="profile-info">
    //               <label className="profile-projects">
    //                 <span >Projects</span>
    //                 <span >{userProfile.projects}</span>
    //               </label>
    //               <label className="profile-followers">
    //                 <span >Followers</span>
    //                 <span >{userProfile.followers}</span>
    //               </label>
    //               <label className="profile-following">
    //                 <span >Following</span>
    //                 <span >{userProfile.following}</span>
    //               </label>
    //             </div>
    //           </div>
    //         </div>
    //       </Card>
    //     </div>
    //   </div> */}
    // </div>
    // <div className="home">
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
              {/* <div className="profile-details"> */}
              <div className="profile-name-loc">
                <h2>
                  {userProfile.firstName +
                    (userProfile.middleName
                      ? " " +
                        userProfile.middleName +
                        " " +
                        userProfile.lastName
                      : " " + userProfile.lastName)}
                </h2>
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
              {/* </div> */}
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
                      {/* <div className="profile-pic">
                    <div className="avatar">
                      <img
                        className="profile-avatar"
                        src={avatar}
                        alt="image"
                      />
                    </div>
                  </div> */}
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
                        <div className="account-bottom">
                          {/* <div className="top">
                              <h3 className="font-white">Account Type</h3>
                              <h2 className="font-white">Main</h2>
                            </div> */}
                          {/* <div className="top account-amount">
                              <h1 className="font-white">$ 12, 234</h1>
                            </div> */}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="earning-spending-container">
                  <div className="earning">
                    <Card className="box-shadow">
                      <div className="card-padding">
                        {/* <div className="profile-pic">
                    <div className="avatar">
                      <img
                        className="profile-avatar"
                        src={avatar}
                        alt="image"
                      />
                    </div>
                  </div> */}

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
                        {/* <div className="profile-pic">
                    <div className="avatar">
                      <img
                        className="profile-avatar"
                        src={avatar}
                        alt="image"
                      />
                    </div>
                  </div> */}

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
              {/* </div> */}
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
              {/* </div> */}
            </div>
          </Card>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Home;
