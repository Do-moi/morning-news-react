import React from "react";
import "./App.css";
import { Button } from "antd";
import { HomeOutlined, ReadOutlined, LogoutOutlined } from "@ant-design/icons";

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

  return (
    <div
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "60px",
      }}
    >
      <Button
        type="link"
        style={{
          alignItems: "center",
          margin: "3px",
          color: "white",
          backgroundColor: "black",
          display: "flex",
        }}
        icon={<HomeOutlined />}
        onClick={() => navigate("/screensource")}
      >
        Sources
      </Button>
      <Button
        type="link"
        style={{
          alignItems: "center",
          margin: "3px",
          color: "white",
          backgroundColor: "black",
          display: "flex",
        }}
        icon={<ReadOutlined />}
        onClick={() => navigate("/screenmyarticles")}
      >
        My articles
      </Button>
      <Button
        type="link"
        style={{
          alignItems: "center",
          margin: "3px",
          color: "white",
          backgroundColor: "black",
          display: "flex",
        }}
        icon={<LogoutOutlined />}
        onClick={() => logoutClick()}
      >
        Logout
      </Button>
    </div>
  );
}

export default Nav;
