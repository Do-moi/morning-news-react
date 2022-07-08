import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Modal, Button } from "antd";
import Nav from "./Nav";
import { ReadOutlined, LikeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addArticle } from "./appRedux/reducers/articleSlice";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

function ScreenArticlesBySource() {
  let navigate = useNavigate();
  const stateRedux = useSelector((state) => state.article.value);
  const reduxToken = useSelector((state) => state.token.value);

  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [article, setArticle] = useState({});
  const [error, setError] = useState(false);
  let { sourceid } = useParams();
  const dispatch = useDispatch();
  let urlApi = `/selectSource?sourceid=${sourceid}`;
  //=============================security user loged with token================================
  useEffect(() => {
    if (!reduxToken) {
      navigate("/");
    }
  }, [navigate, reduxToken]);
  //=======================================================================
  useEffect(() => {
    const loadArticles = async () => {
      let responseAPI = await fetch(urlApi);
      let responseJson = await responseAPI.json();

      setArticleList(responseJson.articles);
    };
    loadArticles();
  }, [urlApi]);

  //=====================modal function=====================
  const showModal = (article) => {
    setArticle(article);
    setVisible(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  //========================function add wishList========================
  const addWishList = async (article) => {
    if (stateRedux.length > 4) {
      setError(true);
    } else {
      setError(false);
      const responseFilter = stateRedux.filter(
        (articleRedux) => articleRedux.title === article.title
      );

      if (responseFilter.length < 1) {
        let responseBackend = await fetch("/saveWishList", {
          method: "post",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: `token=${reduxToken}&articletitle=${article.title}&articlecontent=${article.content}&articledesc=${article.description}&articleimg=${article.urlToImage}&articleurl=${article.url}`,
        });
        const responseJson = await responseBackend.json();

        if (responseJson.result) {
          dispatch(addArticle(article));
        }
      }
    }
  };
  let messageError;
  if (error) {
    messageError = (
      <p style={{ color: "red", fontSize: 22, textAlign: "center" }}>
        Five articles recorded maximum{" "}
      </p>
    );
  }

  return (
    <div>
      <Modal
        visible={visible}
        title={article.title}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="link"
            href={article.url}
            type="primary"
            loading={loading}
            onClick={handleOk}
            target="blank"
          >
            Article
          </Button>,
        ]}
      >
        <p>{article.content}</p>
      </Modal>
      <Nav />
      <div className="Banner" />
      {messageError}
      <div className="Card">
        {articleList.map((article, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: 300,
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={<img alt="example" src={article.urlToImage} />}
              actions={[
                <ReadOutlined onClick={() => showModal(article)} />,
                <LikeOutlined onClick={() => addWishList(article)} />,
              ]}
            >
              <Meta title={article.title} description={article.description} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScreenArticlesBySource;
