import { AiFillHome } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdSwapHoriz } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { MdSettings } from "react-icons/md";
// const icon = (name) => (
//   <img
//     src={`/assets/icons/navbar/${name}.svg`}
//     sx={{ width: 32, height: 32 }}
//   />
// );

export const SidebarData = [
  { id: 1, name: "Home", to: "/", icon: <AiFillHome/> },
  { id: 2, name: "Balances", to: "balances", icon: <MdAccountBalanceWallet/> },
  { id: 3, name: "Transactions", to: "transactions", icon: <MdSwapHoriz/> },
  { id: 4, name: "Profile", to: "profile", icon: <BiSolidUser/> },
  { id: 5, name: "Settings", to: "settings", icon: <MdSettings/> },
];

export const NestedMenu = [
  {
    id: 1,
    to:"profile",
    name: "Profile",
  },
  {
    id: 2,
    to:"security",
    name: "Security",
  },
];

export const NestedMenuHome = [
  {
    id: 1,
    to:"/",
    name: "Home",
  },
  {
    id: 2,
    to:"home2",
    name: "Home 2",
  },
];

export const NestedMenuUser = [
  {
    id: 1,
    to:"user",
    name: "User",
  },
  {
    id: 2,
    to:"user2",
    name: "User 2",
  },
];

export const NestedMenuSettings = [
  {
    id: 1,
    to:"settings",
    name: "Settings",
  },
  {
    id: 2,
    to:"settings2",
    name: "Settings 2",
  },
];


export const SidebarBottom = [
  {
    id: 1,
    name: "Download",
    // icon: icon("ic_download"),
  },
];

