import React from "react";
import "./App.css";
import { Menu } from "antd";
import { HomeOutlined, ReadOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "./appRedux/reducers/tokenSlice";
import { resetArticle } from "./appRedux/reducers/articleSlice";
import { resetLanguage } from "./appRedux/reducers/languageSlice";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //======================function logout==================
  const logoutClick = () => {
    dispatch(resetArticle());
    dispatch(resetLanguage());
    dispatch(deleteToken());
    navigate("/");
  };
  const items = [
    {
      label: <Link to="/screensource">Source</Link>,
      key: "source",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/screenmyarticles">My articles</Link>,
      key: "myarticles",
      icon: <ReadOutlined />,
    },
    {
      label: <span onClick={() => logoutClick()}>Logout</span>,
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <nav>
      <Menu
        items={items}
        style={{ textAlign: "center" }}
        mode="horizontal"
        theme="dark"
      ></Menu>
    </nav>
  );
}

export default Nav;
