import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/home/Home";
import Balances from "./pages/balances/Balances";
import Profile from "./pages/profile/Profile";
import Transactions from "./pages/transactions/Transactions";
import Settings from "./pages/settings/Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from './layouts/rootLayout/RootLayout'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <a href="" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <h1>Spend Wise</h1>
        </a> */}
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* <Route path="/"> */}
              <Route index element={<Home />}></Route>
              <Route path="balances">
                <Route index element={<Balances />}></Route>
              </Route>
              <Route path="transactions">
                <Route index element={<Transactions />}></Route>
              </Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="settings" element={<Settings />}></Route>
            {/* </Route> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
