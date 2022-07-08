import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Modal, Button } from "antd";
import Nav from "./Nav";
import { ReadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteArticle } from "./appRedux/reducers/articleSlice";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

function ScreenMyArticles() {
  let navigate = useNavigate();
  const articlesState = useSelector((state) => state.article.value);
  const reduxToken = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);

  //=============================security user loged with token================================
  useEffect(() => {
    if (!reduxToken) {
      navigate("/");
    }
  }, [navigate, reduxToken]);
  //================modal==============================
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

  //=======================function delete=====================
  const handleDeleteArticle = async (article) => {
    let deleteArticleDB = await fetch("/deletearticle", {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${reduxToken}&articletitle=${article.title}`,
    });
    let responseJson = await deleteArticleDB.json();

    if (responseJson.result) {
      dispatch(deleteArticle(article.title));
    }
  };

  let articleSaved;
  if (articlesState.length < 1) {
    articleSaved = (
      <p style={{ color: "red", fontSize: 22, textAlign: "center" }}>
        no article
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
      {articleSaved}
      <div className="Card">
        {articlesState.map((article, i) => {
          return (
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
                  <DeleteOutlined
                    onClick={() => handleDeleteArticle(article)}
                  />,
                ]}
              >
                <Meta title={article.title} description={article.description} />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScreenMyArticles;
