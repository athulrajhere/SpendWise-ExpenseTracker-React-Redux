import { Outlet, NavLink } from "react-router-dom";
import "../layout.scss";
import Header from "../header/Header";
import { SidebarData } from "../../data/sidebar";
import SidebarOption from "./SidebarOption";
import { AiFillHome } from "react-icons/ai";
import { useState } from "react";

export default function RootLayout() {
  const [isActive, setIsActive] = useState();
  const topOptions = SidebarData;
  // const bottomOptions = SidebarBottom;
  return (
    <div className="root-layout">
      <div className="root-layout-nav">
        <div className="sidebar-top">
          <span className="logo spend">Spend</span>
          <span className="logo wise">Wise</span>
        </div>
        {/* <hr></hr> */}

        <nav>
          {/* style={({isActive})=>{return{backgroundColor: isActive?'skyblue':''}}} */}
          {topOptions.map((option) => {
            return (
              <NavLink
                key={option.id}
                to={option.to}
                className="sidebar-center"
                // style={activeTab(history, option.to)}
              >
                {({ isActive }) => (
                  <>
                    <SidebarOption
                      key={option.id}
                      option={option}
                      isActive={isActive}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        {/* <div className="sidebar-bottom">
          {bottomOptions.map((option) => {
            return <SidebarOption key={option.id} option={option} />;
          })}
        </div> */}
      </div>
      <main>
        <Header></Header>
        <Outlet />
      </main>
    </div>
  );
}
