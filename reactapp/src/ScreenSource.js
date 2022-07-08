import React, { useState, useEffect } from "react";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "./appRedux/reducers/languageSlice";
import { addUserArticles } from "./appRedux/reducers/articleSlice";
import { useNavigate } from "react-router-dom";
function ScreenSource() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxlanguage = useSelector((state) => state.language.value);
  const reduxToken = useSelector((state) => state.token.value);

  const [sourceList, setSourceList] = useState([]);
  const [language, setLanguage] = useState(reduxlanguage);
  //=============================security user loged with token================================
  useEffect(() => {
    if (!reduxToken) {
      navigate("/");
    }
  }, [navigate, reduxToken]);

  //==========================================================================================
  useEffect(() => {
    const loadSource = async () => {
      let country;
      if (language === "fr") {
        country = "fr";
      }
      if (language === "en") {
        country = "us";
      }

      let responseAPI = await fetch(
        `/loadApi?language=${language}&country=${country}`
      );
      let APIJson = await responseAPI.json();

      setSourceList(APIJson.sources);
    };
    loadSource();
    dispatch(changeLanguage(language));
  }, [language, dispatch]);
  //===============================================search articles user=========================================
  useEffect(() => {
    const search = async () => {
      const searcharticlesuser = await fetch(
        `/searcharticlesuser?token=${reduxToken}`
      );
      const responseJson = await searcharticlesuser.json();

      dispatch(addUserArticles(responseJson.articles));
    };
    search();
  }, [dispatch, reduxToken]);

  return (
    <div>
      <Nav />

      <div className="Banner">
        <img
          src="./images/imgFR.png"
          style={{ height: 50, marginRight: 10 }}
          alt="flag FR"
          onClick={() => setLanguage("fr")}
        />
        <img
          src="./images/imgGB.png"
          style={{ height: 50 }}
          alt="flag GB"
          onClick={() => setLanguage("en")}
        />
      </div>

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`./images/${item.category}.png`} />}
                title={
                  <Link to={`/screenarticlesbysource/${item.id}`}>
                    {item.name}
                  </Link>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ScreenSource;
