import React, { useState } from "react";
import "./App.css";
import { Input, Button, Col, Row, Form } from "antd";
import { useDispatch } from "react-redux";
import { addToken } from "./appRedux/reducers/tokenSlice";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
function ScreenHome() {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState([]);
  const [errorSignUp, setErrorSignUp] = useState([]);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 576px)" });
  //============================function sign-in=====================================================================

  const handleSignInDemo = async () => {
    const passwordDemo = "moi";
    const emailDemo = "moi@moi.fr";
    let responseBackend = await fetch("users/sign-in", {
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: `email=${emailDemo}&password=${passwordDemo}`,
    });
    let responseJson = await responseBackend.json();

    if (responseJson.userFind === true) {
      setErrorSignIn([]);

      dispatch(addToken(responseJson.token));
      navigate("/screensource");
    } else {
      setErrorSignIn(responseJson.error);
    }
  };

  //============================function sign-in=====================================================================
  // eslint-disable-next-line
  const handleSignIn = async () => {
    let responseBackend = await fetch("users/sign-in", {
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: `email=${emailSignIn}&password=${passwordSignIn}`,
    });
    let responseJson = await responseBackend.json();

    if (responseJson.userFind === true) {
      setErrorSignIn([]);

      dispatch(addToken(responseJson.token));
      navigate("/screensource");
    } else {
      setErrorSignIn(responseJson.error);
    }
  };
  //=================================function sign-up===============================================================
  // eslint-disable-next-line
  const handleSubmitSignUp = async () => {
    let recordUser = await fetch(`/users/sign-up`, {
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: `name=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`,
    });
    let recordUserJson = await recordUser.json();

    let response = recordUserJson.result;

    if (response === true) {
      setErrorSignUp([]);
      dispatch(addToken(recordUserJson.token));
      navigate("/screensource");
    } else {
      setErrorSignUp(recordUserJson.error);
    }
  };
  //=============================== error ===============================================================================
  let errorSignIn1 = errorSignIn.map((error, i) => (
    <p key={i} style={{ textAlign: "center", color: "red", marginTop: 20 }}>
      {error}
    </p>
  ));
  let errorSignUp1 = errorSignUp.map((error, i) => (
    <p key={i} style={{ textAlign: "center", color: "red", marginTop: 20 }}>
      {error}
    </p>
  ));

  return (
    <div className={isTabletOrMobile ? "Login-page-mobile" : "Login-page"}>
      <Row style={{ justifyContent: "center" }}>
        <Col style={{ margin: "38px" }}>
          <div className="Sign">
            <h1 style={{ color: "white" }}>MorningNews</h1>
            <Button
              style={{
                width: "80px",
                backgroundColor: "green ",
                color: "white",
              }}
              onClick={() => handleSignInDemo()}
            >
              Click me!
            </Button>
          </div>
        </Col>
      </Row>
      {/* SIGN-IN */}
      <Row style={{ justifyContent: "center", alignItems: "center" }}>
        <Col>
          <Form>
            <div className="Sign">
              {errorSignIn1}

              <Input
                className="Login-input"
                placeholder="email"
                value={emailSignIn}
                onChange={(e) => setEmailSignIn(e.target.value)}
                required
              />

              <Input.Password
                className="Login-input"
                placeholder="password"
                value={passwordSignIn}
                onChange={(e) => setPasswordSignIn(e.target.value)}
                autoComplete="on"
                required
              />

              <Button
                style={{ width: "80px" }}
                type="primary"
                // onClick={handleSignIn}
              >
                Sign-in
              </Button>
            </div>
          </Form>
        </Col>
        {/* SIGN-UP */}
        <Col style={{ margin: "45px" }}>
          <Form>
            <div className="Sign">
              {errorSignUp1}
              <Input
                className="Login-input"
                placeholder="Name"
                onChange={(e) => setSignUpUsername(e.target.value)}
                value={signUpUsername}
              />
              <Input
                className="Login-input"
                placeholder="email"
                onChange={(e) => setSignUpEmail(e.target.value)}
                value={signUpEmail}
              />

              <Input.Password
                className="Login-input"
                placeholder="password"
                onChange={(e) => setSignUpPassword(e.target.value)}
                value={signUpPassword}
                autoComplete="on"
              />

              <Button
                style={{ width: "80px" }}
                type="primary"
                // onClick={handleSubmitSignUp}
              >
                Sign-up
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ScreenHome;
